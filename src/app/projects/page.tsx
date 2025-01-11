'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import StarField from '@/components/star-field'
import { Navbar } from '@/components/navbar'
import { ExternalLink, Rocket, Stethoscope, ShoppingBag, Home } from 'lucide-react'

export default function Projects() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const projects = [
    {
      title: "Kalb Wotta Clinic",
      description: "A modern veterinary clinic website providing comprehensive pet healthcare services. Features appointment booking, medical records, and preventive care information.",
      image: "/placeholder.svg?height=338&width=600",
      liveUrl: "https://kalbwotta.clinic",
      icon: <Stethoscope className="w-6 h-6" />,
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      title: "Kalb Wotta Store",
      description: "A full-featured pet store e-commerce platform offering a wide range of pet supplies, medications, and accessories. Complete with shopping cart and category management.",
      image: "/images/kalbstore.png",
      liveUrl: "https://kalbwotta.store",
      icon: <ShoppingBag className="w-6 h-6" />,
      color: "from-green-500/20 to-green-600/20"
    },
    {
      title: "Optima Furniture",
      description: "An elegant furniture company website showcasing premium kitchen designs and installations. Features project galleries and consultation booking.",
      image: "/images/optima.png",
      liveUrl: "https://optima-furniture.com",
      icon: <Home className="w-6 h-6" />,
      color: "from-amber-500/20 to-amber-600/20"
    }
  ]

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden">
      <StarField />
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        className="relative z-10 container mx-auto px-4 py-24"
      >
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center text-white mb-4 font-orbitron"
        >
          Cosmic Creations
        </motion.h1>
        <motion.p
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          className="text-xl text-center text-[#17b6a7] mb-12"
        >
          Explore our digital universe of web projects
        </motion.p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${project.color} blur-xl group-hover:blur-2xl transition-all duration-500`} />
              <div className="relative bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={338}
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#17b6a7] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#14a090] transition-colors"
                    >
                      Visit Site <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#17b6a7]/10 flex items-center justify-center text-[#17b6a7]">
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-[#17b6a7]"
                  initial={{ width: "0%" }}
                  animate={{ width: hoveredProject === index ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 text-[#17b6a7]">
            <Rocket className="w-5 h-5" />
            <span>More projects launching soon</span>
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
}