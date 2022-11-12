/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_MOCKING: 'enabled',
  },
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig
