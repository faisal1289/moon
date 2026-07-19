/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Ensure proper output for Vercel
  output: 'standalone',
};

export default nextConfig;