/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, 
  },
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '15.229.67.62', // IP de producción en AWS
        port: '8000',
        pathname: '/static/**', 
      },
      {
        protocol: 'http',
        hostname: 'localhost', // Para que no rompa las imágenes en desarrollo local
        port: '8000',
        pathname: '/static/**', 
      },
    ],
  },
  async rewrites() {
    // Lee la URL de la API del .env que genera el script de Python. 
    // Si no existe, cae en localhost:8000 por defecto.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    return [
      {
        source: '/api/:path*', 
        destination: `${apiUrl}/:path*`, // Puente para consultas de datos
      },
      {
        source: '/static/:path*',
        destination: `${apiUrl}/static/:path*`, // Puente para renderizar imágenes del back
      },
    ]
  },
}

export default nextConfig