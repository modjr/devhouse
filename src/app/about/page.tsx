'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StarField from '@/components/star-field'
import { Navbar } from '@/components/navbar'

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden">
      <StarField />
      <Navbar />
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 py-16"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-8 text-center"
          variants={itemVariants}
        >
          Pioneering the Digital Frontier
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 text-center max-w-3xl"
          variants={itemVariants}
        >
          At [Your Company Name], we're not just building websites and apps - we're crafting digital experiences that push the boundaries of what's possible.
        </motion.p>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl w-full"
          variants={itemVariants}
        >
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>To empower businesses and individuals with cutting-edge digital solutions that drive growth, foster innovation, and create meaningful connections in the digital realm.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p>To be the catalyst for digital transformation, leading the way in creating seamless, intuitive, and impactful digital experiences that shape the future of technology.</p>
          </div>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold mb-8 text-center"
          variants={itemVariants}
        >
          Our Journey Through the Digital Cosmos
        </motion.h2>
        
        <motion.div 
          className="relative max-w-4xl w-full"
          variants={itemVariants}
        >
          {/* Timeline */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>
          
          {[
            { year: '2018', event: 'Founded with a vision to revolutionize web development' },
            { year: '2020', event: 'Expanded into mobile app development' },
            { year: '2022', event: 'Launched our AI-powered design tools' },
            { year: '2024', event: 'Pioneering the next generation of immersive digital experiences' },
          ].map((item, index) => (
            <div key={item.year} className={`mb-8 flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className={`bg-white/10 backdrop-blur-md p-4 rounded-lg ${index % 2 === 0 ? 'mr-8' : 'ml-8'} max-w-xs`}>
                <h3 className="text-xl font-semibold mb-2">{item.year}</h3>
                <p>{item.event}</p>
              </div>
            </div>
          ))}
        </motion.div>
        
        <motion.p 
          className="text-xl mt-16 text-center max-w-3xl"
          variants={itemVariants}
        >
          Join us as we continue to explore new frontiers in the digital universe, creating solutions that are not just ahead of their time, but that define the future.
        </motion.p>
      </motion.div>
    </main>
  )
}

