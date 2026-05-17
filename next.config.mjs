/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '15.229.67.62', 
        port: '8000',
        pathname: '/static/**', 
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', 
        destination: 'http://15.229.67.62:8000/:path*', 
      },
    ]
  },
}

export default nextConfig