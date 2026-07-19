/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Disable Turbopack for Vercel
  turbopack: {},
  // Ensure proper output
  output: 'standalone',
};

export default nextConfig;