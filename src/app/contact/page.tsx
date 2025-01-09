'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StarField from '@/components/star-field'
import { Navbar } from '@/components/navbar'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Send, Phone, Mail, MapPin } from 'lucide-react'

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Here you would typically handle the actual form submission
    console.log('Form submitted')
  }

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      <StarField />
      <Navbar />
      <motion.div
        className="relative z-10 w-full max-w-6xl px-4 py-8 mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-center text-[#17b6a7] mb-8 font-orbitron">Contact Mission Control</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4 font-orbitron">Send a Transmission</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input type="text" id="name" placeholder="Your Name" required className="bg-white/20 text-white placeholder-gray-400" />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input type="email" id="email" placeholder="your@email.com" required className="bg-white/20 text-white placeholder-gray-400" />
              </div>
              <div>
                <Label htmlFor="subject" className="text-white">Subject</Label>
                <Input type="text" id="subject" placeholder="Message Subject" required className="bg-white/20 text-white placeholder-gray-400" />
              </div>
              <div>
                <Label htmlFor="message" className="text-white">Message</Label>
                <Textarea id="message" placeholder="Your message here..." required className="bg-white/20 text-white placeholder-gray-400 min-h-[150px]" />
              </div>
              <Button type="submit" className="w-full bg-[#17b6a7] hover:bg-[#14a090] text-white font-orbitron" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Launch Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
          <motion.div 
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg flex flex-col justify-between"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4 font-orbitron">Cosmic Coordinates</h2>
              <p className="text-gray-300 mb-6">Navigate through the digital cosmos to reach us:</p>
              <ul className="space-y-4 text-gray-300">
                <motion.li className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
                  <MapPin className="h-6 w-6 text-[#17b6a7]" />
                  <span>123 Nebula Avenue, Cosmic City, Universe 42</span>
                </motion.li>
                <motion.li className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
                  <Phone className="h-6 w-6 text-[#17b6a7]" />
                  <span>+1 (234) 567-8900</span>
                </motion.li>
                <motion.li className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
                  <Mail className="h-6 w-6 text-[#17b6a7]" />
                  <span>transmissions@devhouse.com</span>
                </motion.li>
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4 font-orbitron">Join Our Constellation</h3>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((platform) => (
                  <motion.a 
                    key={platform} 
                    href="#" 
                    className="text-[#17b6a7] hover:text-[#14a090] transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    {platform}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}

