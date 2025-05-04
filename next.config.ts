import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'memorylog-cdn.b-cdn.net',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
