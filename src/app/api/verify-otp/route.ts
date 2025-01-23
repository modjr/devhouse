import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI as string
const client = new MongoClient(uri)

export async function POST(req: Request) {
  try {
    await client.connect()
    const database = client.db("devhouse_db")
    const otpCollection = database.collection("otps")

    const { email, otp } = await req.json()

    console.log("Verifying OTP:", { email, otp }) // Log for debugging

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
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  } finally {
    await client.close()
  }
}

