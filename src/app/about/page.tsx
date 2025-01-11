'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StarField from '@/components/star-field'
import { Navbar } from '@/components/navbar'
import { Rocket, Target, Users, Zap } from 'lucide-react'

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

  const coreValues = [
    { icon: <Rocket className="w-8 h-8" />, title: "Innovation", description: "Pushing the boundaries of digital experiences" },
    { icon: <Target className="w-8 h-8" />, title: "Precision", description: "Crafting pixel-perfect, high-performance solutions" },
    { icon: <Users className="w-8 h-8" />, title: "Collaboration", description: "Working closely with clients to bring visions to life" },
    { icon: <Zap className="w-8 h-8" />, title: "Agility", description: "Adapting quickly to new technologies and market needs" }
  ]

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
          className="text-4xl md:text-6xl font-bold mb-8 text-center font-orbitron"
          variants={itemVariants}
        >
          Launching into the Digital Frontier
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 text-center max-w-3xl"
          variants={itemVariants}
        >
          At DevHouse, we&apos;re a startup with big dreams. Our mission is to revolutionize the digital landscape with innovative solutions and cutting-edge technologies.
        </motion.p>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl w-full"
          variants={itemVariants}
        >
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 font-orbitron">Our Vision</h2>
            <p>To be the catalyst for digital transformation, leading the way in creating seamless, intuitive, and impactful digital experiences that shape the future of technology.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 font-orbitron">Our Mission</h2>
            <p>To empower businesses and individuals with cutting-edge digital solutions that drive growth, foster innovation, and create meaningful connections in the digital realm.</p>
          </div>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold mb-8 text-center font-orbitron"
          variants={itemVariants}
        >
          Our Core Values
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full"
          variants={itemVariants}
        >
          {coreValues.map((value) => (
            <motion.div 
              key={value.title}
              className="bg-white/10 backdrop-blur-md p-6 rounded-lg text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-center mb-4 text-[#17b6a7]">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 font-orbitron">{value.title}</h3>
              <p className="text-sm">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.p 
          className="text-xl mt-16 text-center max-w-3xl"
          variants={itemVariants}
        >
          Join us as we embark on this exciting journey to explore new frontiers in the digital universe, creating solutions that are not just ahead of their time, but that define the future.
        </motion.p>
      </motion.div>
    </main>
  )
}

