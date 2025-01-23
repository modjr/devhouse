import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI as string
const client = new MongoClient(uri)

export async function POST(req: Request) {
  try {
    await client.connect()
    const database = client.db("devhouse_db")
    const otpCollection = database.collection("otps")

    const { email } = await req.json()

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP with 5-minute expiration
    await otpCollection.updateOne({ email }, { $set: { otp, expires: Date.now() + 5 * 60 * 1000 } }, { upsert: true })

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

    // Verify transporter configuration
    await transporter.verify()

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
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  } finally {
    await client.close()
  }
}

