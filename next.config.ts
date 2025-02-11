import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['v0.blob.com', 'localhost', 'placehold.co', 'https://devhouse-ten.vercel.app/','www.devhouse.dev', 'devhouse.dev'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

export default nextConfig

