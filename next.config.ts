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
  async redirects() {
    return [
      {
        source: '/breweries',
        has: [{ type: 'query', key: 'filter', value: 'commercial' }],
        destination: '/breweries/commercial',
        permanent: true,
      },
      {
        source: '/breweries',
        has: [{ type: 'query', key: 'filter', value: 'craft' }],
        destination: '/breweries/craft',
        permanent: true,
      },
      {
        source: '/breweries',
        has: [{ type: 'query', key: 'type', value: 'micro' }],
        destination: '/breweries/micro',
        permanent: true,
      },
      {
        source: '/breweries',
        has: [{ type: 'query', key: 'type', value: 'regional' }],
        destination: '/breweries/regional',
        permanent: true,
      },
      {
        source: '/breweries/homebrew',
        destination: '/homebrew',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
