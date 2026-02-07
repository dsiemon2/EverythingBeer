import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  basePath: '/everythingbeer',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
