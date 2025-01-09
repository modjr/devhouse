'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import StarField from '@/components/star-field'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsNavigating(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 500) // Delay navigation to allow fade-out animation
  }

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      <StarField />
      <div className={`relative z-10 flex flex-col items-center gap-8 text-white transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isNavigating ? 'opacity-0' : ''}`}>
        <div className="flex items-center">
          <Image
            src="/images/logo1.png"
            alt="DevHouse Logo"
            width={400}
            height={400}
          />
        </div>
        <Link href="/dashboard" onClick={handleNavigation} className="relative group">
          <motion.div
            className="absolute -inset-0.5 bg-[#17b6a7] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 0
            }}
          ></motion.div>
          <motion.button
            className="relative px-8 py-4 bg-black rounded-full leading-none flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-5">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#17b6a7]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </motion.svg>
              <motion.span 
                className="text-[#17b6a7] text-xl font-extrabold"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
                animate={{ 
                  textShadow: ['0 0 5px #17b6a7', '0 0 20px #17b6a7', '0 0 5px #17b6a7']
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Get Started
              </motion.span>
            </span>
          </motion.button>
        </Link>
      </div>
    </main>
  )
}

