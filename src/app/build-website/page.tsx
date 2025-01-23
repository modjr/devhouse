"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import StarField from "@/components/star-field"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { isValidEmail } from "@/lib/utils"

export default function BuildWebsiteForm() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    serviceType: "Build Your Website",
    mobile: "",
    firstName: "",
    lastName: "",
  })
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState("")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const sendOtp = async () => {
    if (!isValidEmail(formData.email)) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }))
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      })

      if (response.ok) {
        setShowOtpInput(true)
        setErrorMessage("OTP sent successfully. Please check your email.")
      } else {
        const data = await response.json()
        setErrorMessage(data.error || "Failed to send OTP. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      setErrorMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const verifyOtp = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, otp }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsEmailVerified(true)
        setShowOtpInput(false)
        setErrorMessage("Email verified successfully.")
      } else {
        setErrorMessage(data.error || "Invalid OTP. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      setErrorMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isEmailVerified) {
      setErrorMessage("Please verify your email before submitting.")
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")
    setValidationErrors({})

    let hasErrors = false

    // Validate mobile number
    const mobileRegex = /^(010|011|012|015)\d{8}$/
    if (!mobileRegex.test(formData.mobile)) {
      setValidationErrors((prev) => ({
        ...prev,
        mobile: "Mobile number must be 11 digits and start with 010, 011, 012, or 015",
      }))
      hasErrors = true
    }

    if (hasErrors) {
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/build-website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/thank-you")
      } else {
        setErrorMessage("Failed to submit form. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      setErrorMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      <StarField />
      <Navbar />
      <motion.div
        className={`relative z-10 w-full max-w-md px-4 py-8 bg-white/10 backdrop-blur-md rounded-lg shadow-xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">Build Your Website</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <div className="flex space-x-2">
              <Input
                type="email"
                id="email"
                placeholder="your@email.com"
                required
                className="bg-white/20 text-white placeholder-gray-300 flex-grow"
                value={formData.email}
                onChange={handleChange}
                disabled={isEmailVerified}
              />
              {!isEmailVerified && (
                <Button
                  type="button"
                  onClick={sendOtp}
                  className="bg-[#17b6a7] hover:bg-[#14a090] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                </Button>
              )}
            </div>
            {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
          </div>
          {showOtpInput && (
            <div>
              <Label htmlFor="otp" className="text-white">
                OTP
              </Label>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP"
                  required
                  className="bg-white/20 text-white placeholder-gray-300 flex-grow"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={verifyOtp}
                  className="bg-[#17b6a7] hover:bg-[#14a090] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit OTP"}
                </Button>
              </div>
            </div>
          )}
          {isEmailVerified && (
            <>
              <div>
                <Label htmlFor="serviceType" className="text-white">
                  Service Type
                </Label>
                <Input
                  type="text"
                  id="serviceType"
                  value={formData.serviceType}
                  disabled
                  className="bg-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="mobile" className="text-white">
                  Mobile Number
                </Label>
                <Input
                  type="tel"
                  id="mobile"
                  placeholder="01xxxxxxxxx"
                  required
                  className="bg-white/20 text-white placeholder-gray-300"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                {validationErrors.mobile && <p className="text-red-500 text-sm mt-1">{validationErrors.mobile}</p>}
              </div>
              <div>
                <Label htmlFor="firstName" className="text-white">
                  First Name
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="John"
                  required
                  className="bg-white/20 text-white placeholder-gray-300"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white">
                  Last Name
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                  required
                  className="bg-white/20 text-white placeholder-gray-300"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#17b6a7] hover:bg-[#14a090] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </>
          )}
          {errorMessage && (
            <p
              className={`text-center mt-2 ${errorMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}
            >
              {errorMessage}
            </p>
          )}
        </form>
      </motion.div>
    </main>
  )
}

