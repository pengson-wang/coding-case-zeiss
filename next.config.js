/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: process.env.ENVIRONMENT === 'PRODUCTION' ? 'standalone' : undefined,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
