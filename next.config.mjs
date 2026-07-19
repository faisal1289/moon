/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Ensure proper output for Vercel
  output: 'standalone',
  // Webpack config for video files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|mov)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/videos/[name].[hash][ext]',
      },
    });
    return config;
  },
};

export default nextConfig;