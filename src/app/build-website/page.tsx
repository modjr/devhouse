'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StarField from '@/components/star-field'
import { Navbar } from '@/components/navbar'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from 'framer-motion'

export default function BuildWebsiteForm() {
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically handle form submission, e.g., send data to an API
    console.log('Form submitted')
    // For now, we'll just redirect to a thank you page
    router.push('/thank-you')
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
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input type="email" id="email" placeholder="your@email.com" required className="bg-white/20 text-white placeholder-gray-300" />
          </div>
          <div>
            <Label htmlFor="serviceType" className="text-white">Service Type</Label>
            <Input type="text" id="serviceType" value="Build Your Website" disabled className="bg-white/20 text-white" />
          </div>
          <div>
            <Label htmlFor="mobile" className="text-white">Mobile Number</Label>
            <Input type="tel" id="mobile" placeholder="+1234567890" required className="bg-white/20 text-white placeholder-gray-300" />
          </div>
          <div>
            <Label htmlFor="firstName" className="text-white">First Name</Label>
            <Input type="text" id="firstName" placeholder="John" required className="bg-white/20 text-white placeholder-gray-300" />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-white">Last Name</Label>
            <Input type="text" id="lastName" placeholder="Doe" required className="bg-white/20 text-white placeholder-gray-300" />
          </div>
          <Button type="submit" className="w-full bg-[#17b6a7] hover:bg-[#14a090] text-white">Submit</Button>
        </form>
      </motion.div>
    </main>
  )
}

