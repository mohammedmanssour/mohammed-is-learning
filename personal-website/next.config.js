/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    loader: 'custom',
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
