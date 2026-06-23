import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Security response headers (static marketing site — no auth/forms/API).
// 'unsafe-inline' is a deliberate trade-off: two static inline scripts +
// next/font + Next hydration + GSAP inline transforms. A nonce would require
// per-request middleware and kill static caching, for no real gain here.
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://plausible.io https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://directa.mx https://www.directa.mx https://www.google-analytics.com",
      "font-src 'self'",
      "connect-src 'self' https://plausible.io https://www.google-analytics.com https://*.google-analytics.com",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      // NB: `upgrade-insecure-requests` intentionally omitted — the site is
      // HTTPS-only on Vercel (with HSTS) and has no insecure subresources, so
      // it's a no-op in prod, while it breaks WebKit when served over HTTP
      // (localhost/CI) by forcing http→https and failing TLS.
    ].join('; '),
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

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
    optimizePackageImports: ['framer-motion'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
