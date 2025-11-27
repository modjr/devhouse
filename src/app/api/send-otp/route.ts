import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { MongoClient } from "mongodb"

export async function POST(req: Request) {
  let client: MongoClient | null = null
  
  try {
    // Validate environment variables
    const uri = process.env.MONGODB_URI
    if (!uri) {
      return NextResponse.json(
        { success: false, error: "Server configuration error: MongoDB URI not found" },
        { status: 500 }
      )
    }

    // Validate email configuration
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.EMAIL_FROM) {
      return NextResponse.json(
        { success: false, error: "Server configuration error: Email settings not configured" },
        { status: 500 }
      )
    }

    // Parse request body
    let body
    try {
      body = await req.json()
    } catch (parseError) {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      )
    }

    const { email } = body

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    client = new MongoClient(uri)
    await client.connect()
    const database = client.db("devhouse_db")
    const otpCollection = database.collection("otps")

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP with 5-minute expiration
    await otpCollection.updateOne(
      { email },
      { $set: { otp, expires: Date.now() + 5 * 60 * 1000 } },
      { upsert: true }
    )

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number.parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Verify transporter configuration (with timeout)
    try {
      await Promise.race([
        transporter.verify(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Email verification timeout")), 10000)
        )
      ])
    } catch (verifyError) {
      console.error("Email transporter verification failed:", verifyError)
      // Continue anyway - some email providers don't support verify()
    }

    // Send email
    await transporter.sendMail({
      from: `"DevHouse" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Your OTP for DevHouse",
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
      html: `<p>Your OTP is: <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    })

    return NextResponse.json({ success: true, message: "OTP sent successfully" })
  } catch (error) {
    console.error("Error in sending OTP:", error)
    let errorMessage = "Failed to send OTP"
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
    }
    // Always return JSON, never HTML
    return NextResponse.json(
      { success: false, error: errorMessage },
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
  } finally {
    // Close MongoDB connection if it was opened
    if (client) {
      try {
        await client.close()
      } catch (closeError) {
        console.error("Error closing MongoDB connection:", closeError)
      }
    }
  }
}

