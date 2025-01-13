'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StarField from '@/components/star-field'
import { Navbar } from '@/components/navbar'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Rocket, Code } from 'lucide-react'

const services = [
  { title: 'Build Your Website', href: '/build-website', icon: <Rocket className="w-8 h-8" />, disabled: false },
  { title: 'Build Your App', href: '/build-app', icon: <Code className="w-8 h-8" />, disabled: true }, // Disabled
];


export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center">
      <StarField />
      <Navbar />
      <motion.div
        className="relative z-10 w-full max-w-4xl px-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center text-white mb-8 font-orbitron"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        >
          Select service needed
        </motion.h1>
        <motion.p
          className="text-xl text-center text-[#17b6a7] mb-12"
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
        >
          {/* Select your cosmic journey */}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {services.map((service, index) => (
    <motion.div
      key={service.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.2 }}
    >
      {service.disabled ? (
        <div
          className="block w-full opacity-50 cursor-not-allowed"
          aria-disabled="true"
        >
          <Button
            variant="outline"
            className="w-full h-40 text-lg py-8 bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center gap-4"
            disabled
          >
            <motion.div
              className="text-[#17b6a7]"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              {service.icon}
            </motion.div>
            <span className="font-orbitron">{service.title}</span>
            <span className="text-sm text-gray-400">Coming Soon</span>
          </Button>
        </div>
      ) : (
        <Link href={service.href} className="block w-full">
          <Button
            variant="outline"
            className="w-full h-40 text-lg py-8 bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center gap-4"
          >
            <motion.div
              className="text-[#17b6a7]"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              {service.icon}
            </motion.div>
            <span className="font-orbitron">{service.title}</span>
          </Button>
        </Link>
      )}
    </motion.div>
  ))}
</div>

      </motion.div>
    </main>
  )
}

