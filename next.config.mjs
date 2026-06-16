import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'directa.mx' },
      { protocol: 'https', hostname: 'www.directa.mx' },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'three', '@react-three/fiber', '@react-three/drei'],
  },
};

export default withNextIntl(nextConfig);
