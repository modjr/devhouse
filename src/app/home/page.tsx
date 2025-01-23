'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import StarField from '@/components/star-field'
import { Navbar } from '@/components/navbar'
import { ArrowRight, Rocket, Code, Users } from 'lucide-react'

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const features = [
    { icon: Rocket, title: 'Launch Your Ideas', description: 'Turn your concepts into reality with our cutting-edge web development solutions.' },
    { icon: Code, title: 'Expert Development', description: 'Our team of skilled developers brings your vision to life with clean, efficient code.' },
    { icon: Users, title: 'Collaborative Approach', description: 'We work closely with you to ensure your project meets and exceeds expectations.' },
  ]

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden">
      <StarField />
      <Navbar />
      <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-orbitron">
              Welcome to <span className="text-[#17b6a7]">DevHouse</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Embark on a cosmic journey through the digital universe. We craft stellar websites and applications that push the boundaries of innovation.
            </p>
            <Link href="/dashboard" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#17b6a7] hover:bg-[#149e92] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              Start Your Project
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 text-white"
              >
                <feature.icon className="h-12 w-12 text-[#17b6a7] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-8 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-3xl font-bold mb-4 font-orbitron">Our Latest Project</h2>
                <p className="text-gray-300 mb-4">
                  Explore our most recent cosmic creation, pushing the boundaries of web technology and design.
                </p>
                <Link href="/projects" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-[#17b6a7] bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
                  View All Projects
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
              <div className="w-full md:w-1/2">
                <Image
                  src="/static/Images/optima.png"
                  alt="Latest Project"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

