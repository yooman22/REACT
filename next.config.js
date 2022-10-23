/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_MOCKING: 'enabled',
  },
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig
