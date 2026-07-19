/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Ensure static files are served properly
  output: 'standalone',
};

export default nextConfig;