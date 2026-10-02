import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Lets a verification build run alongside `next dev` without sharing .next.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  async redirects() {
    // URLs from the previous version of the site.
    return [
      { source: '/news', destination: '/transmissions', permanent: true },
      {
        source: '/news/:slug',
        destination: '/transmissions/:slug',
        permanent: true
      },
      {
        source: '/about/historias',
        destination: '/historias',
        permanent: true
      },
      {
        source: '/about/linha-do-tempo',
        destination: '/linha-do-tempo',
        permanent: true
      },
      { source: '/about/:section', destination: '/about', permanent: true },
      { source: '/projects/jogo', destination: '/projects', permanent: true },
      {
        source: '/projects/jogo/RR',
        destination: '/projects/retail-rush',
        permanent: true
      },
      {
        source: '/projects/jogo/MON',
        destination: '/projects/monocrom',
        permanent: true
      },
      {
        source: '/projects/jogo/:id',
        destination: '/projects',
        permanent: true
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/content/:path*',
        destination: '/api/content/:path*'
      }
    ]
  }
}

export default nextConfig
