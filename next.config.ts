import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Use this ONLY if you're getting issues with image optimization.
    unoptimized: false, // set to true only if needed for testing
  },
};

export default nextConfig;
