'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  speed: number
  size: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create stars
    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 0.5 + 0.1,
      size: Math.random() * 2 + 1,
    }))

    // Animation function
    function animate() {
      if (ctx) {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0)

        // Update and draw stars
        stars.forEach(star => {
          // Move star
          star.y = (star.y + star.speed) % (canvas?.height ?? 0)

          // Draw star
          ctx.fillStyle = 'white'
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
        })

        requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }}
    />
  )
}

