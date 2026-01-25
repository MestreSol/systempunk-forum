import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true
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
