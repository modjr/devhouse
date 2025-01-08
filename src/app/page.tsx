import StarField from '@/components/star-field'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      <StarField />
      <div className="relative z-10 flex flex-col items-center gap-8 text-white">
        {/* Replace with your actual logo */}
        <div className="flex items-center">
        <Image
          src="/images/logo.png" // Path relative to the public folder
          alt="DevHouse Logo"
          width={250} // Set your preferred width
          height={250} // Set your preferred height
        />
      </div>
        <Link href="/dashboard">
          <Button 
            variant="outline" 
            className="text-lg px-8 py-6 bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  )
}

