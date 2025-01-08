'use client'

import { useEffect, useState } from 'react'
import StarField from '@/components/star-field'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Navbar } from '@/components/navbar'

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      <StarField />
      <Navbar />
      <div className={`relative z-10 flex flex-col items-center gap-8 text-white w-full max-w-4xl px-4 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 transition-transform delay-300 duration-700 ease-out transform translate-y-10 opacity-0" style={{ transitionDelay: '300ms', ...(isLoaded && { transform: 'translateY(0)', opacity: 1 }) }}>
          Choose A Service
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {['Build Your Website', 'Build Your App', 'Consulting'].map((text, index) => (
            <div key={text} className="w-full transition-transform duration-700 ease-out transform translate-y-10 opacity-0" style={{ transitionDelay: `${500 + index * 200}ms`, ...(isLoaded && { transform: 'translateY(0)', opacity: 1 }) }}>
              {index === 1 ? (
                <Button 
                  variant="outline" 
                  className="w-full text-lg py-8 bg-white/5 backdrop-blur-sm border-white/20 opacity-50 cursor-not-allowed"
                  disabled
                >
                  {text}
                  <span className="block text-sm mt-2">Coming Soon</span>
                </Button>
              ) : (
                <Link href={index === 0 ? "/build-website" : "/consulting"} className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full text-lg py-8 bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10 transition-all duration-300"
                  >
                    {text}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

