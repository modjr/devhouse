'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import Image from 'next/image'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
        <Image
          src="/images/logo1.png" // Path relative to the public folder
          alt="DevHouse Logo"
          width={150} // Set your preferred width
          height={150} // Set your preferred height
        />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative group",
                    pathname === item.href && "text-white"
                  )}
                >
                  {item.label}
                  <span 
                    className={cn(
                      "absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                      pathname === item.href && "scale-x-100"
                    )}
                  ></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

<style jsx global>{`
  .group:hover {
    color: #17b6a7;
  }
  .group:hover .text-white {
    color: #17b6a7;
  }
`}</style>

