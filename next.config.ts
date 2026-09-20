import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
