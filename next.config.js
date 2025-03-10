/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcMinify: true,
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig 