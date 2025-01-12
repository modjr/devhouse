'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StarField from '@/components/star-field'
import { Navbar } from '@/components/navbar'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BuildWebsiteForm() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    serviceType: 'Build Your Website',
    mobile: '',
    firstName: '',
    lastName: ''
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted')
    setIsSubmitting(true)
    try {
      console.log('Sending request to /api/build-website')
      const response = await fetch('/api/build-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      console.log('Response received:', response)
      const data = await response.json()
      console.log('Response data:', data)
      if (data.success) {
        setShowSuccessMessage(true)
        setFormData({ email: '', serviceType: 'Build Your Website', mobile: '', firstName: '', lastName: '' })
      } else {
        alert('Failed to submit form. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
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
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input 
              type="email" 
              id="email" 
              placeholder="your@email.com" 
              required 
              className="bg-white/20 text-white placeholder-gray-300" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="serviceType" className="text-white">Service Type</Label>
            <Input 
              type="text" 
              id="serviceType" 
              value={formData.serviceType} 
              disabled 
              className="bg-white/20 text-white" 
            />
          </div>
          <div>
            <Label htmlFor="mobile" className="text-white">Mobile Number</Label>
            <Input 
              type="tel" 
              id="mobile" 
              placeholder="+1234567890" 
              required 
              className="bg-white/20 text-white placeholder-gray-300" 
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="firstName" className="text-white">First Name</Label>
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
            <Label htmlFor="lastName" className="text-white">Last Name</Label>
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
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </motion.div>
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 right-0 bg-[#17b6a7] text-white p-4 text-center"
          >
            <p className="font-orbitron">Thank you for your interest! We will contact you shortly to schedule an appointment.</p>
            <Button 
              onClick={() => setShowSuccessMessage(false)} 
              className="mt-2 bg-white text-[#17b6a7] hover:bg-gray-100"
            >
              Close
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

