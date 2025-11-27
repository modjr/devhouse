"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import StarField from "@/components/star-field"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Home, Mail } from "lucide-react"

interface SubmissionData {
  email: string
  serviceType: string
  mobile: string
  firstName: string
  lastName: string
}

export default function ThankYouPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null)

  useEffect(() => {
    setIsLoaded(true)
    // Retrieve submission data from sessionStorage
    const storedData = sessionStorage.getItem("submissionData")
    if (storedData) {
      setSubmissionData(JSON.parse(storedData))
      // Clear the stored data after reading
      sessionStorage.removeItem("submissionData")
    }
  }, [])

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      <StarField />
      <Navbar />
      <motion.div
        className={`relative z-10 w-full max-w-2xl px-4 py-8 bg-white/10 backdrop-blur-md rounded-lg shadow-xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <CheckCircle2 className="h-20 w-20 text-[#17b6a7]" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-4 font-orbitron">
            Thank You!
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-300 mb-2">
            <Mail className="h-5 w-5 text-[#17b6a7]" />
            <p className="text-lg">
              An email has been sent to your inbox. We&apos;ll contact you shortly!
            </p>
          </div>
        </div>

        {submissionData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-6 border border-white/10"
          >
            <h2 className="text-2xl font-semibold text-white mb-4 font-orbitron">
              Submission Details
            </h2>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-white/10">
                <span className="text-gray-400 text-sm mb-1 sm:mb-0">Name:</span>
                <span className="text-white font-medium">
                  {submissionData.firstName} {submissionData.lastName}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-white/10">
                <span className="text-gray-400 text-sm mb-1 sm:mb-0">Email:</span>
                <span className="text-white font-medium">{submissionData.email}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-white/10">
                <span className="text-gray-400 text-sm mb-1 sm:mb-0">Mobile:</span>
                <span className="text-white font-medium">{submissionData.mobile}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                <span className="text-gray-400 text-sm mb-1 sm:mb-0">Service Type:</span>
                <span className="text-white font-medium">{submissionData.serviceType}</span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleGoHome}
            className="bg-[#17b6a7] hover:bg-[#14a090] text-white px-8 py-6 text-lg flex items-center gap-2"
          >
            <Home className="h-5 w-5" />
            Return to Home
          </Button>
        </motion.div>
      </motion.div>
    </main>
  )
}

