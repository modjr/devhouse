import { NextResponse } from "next/server"
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

    // Parse request body
    let body
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      )
    }

    const { email, otp } = body

    // Validate input
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      )
    }

    if (!otp || typeof otp !== "string") {
      return NextResponse.json(
        { success: false, error: "OTP is required" },
        { status: 400 }
      )
    }

    console.log("Verifying OTP:", { email, otp }) // Log for debugging

    // Connect to MongoDB
    client = new MongoClient(uri)
    await client.connect()
    const database = client.db("devhouse_db")
    const otpCollection = database.collection("otps")

    const storedOtpData = await otpCollection.findOne({ email })

    if (!storedOtpData || storedOtpData.otp !== otp) {
      return NextResponse.json({ success: false, error: "Invalid OTP" }, { status: 400 })
    }

    if (Date.now() > storedOtpData.expires) {
      return NextResponse.json({ success: false, error: "OTP has expired" }, { status: 400 })
    }

    // OTP is valid, delete it from the database
    await otpCollection.deleteOne({ email })

    return NextResponse.json({ success: true, message: "OTP verified successfully" })
  } catch (error) {
    console.error("Error in verifying OTP:", error)
    let errorMessage = "Failed to verify OTP"
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

