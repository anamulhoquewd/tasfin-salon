import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
  },
  serverExternalPackages: ['mongoose', 'bcryptjs'],
};

export default nextConfig;
