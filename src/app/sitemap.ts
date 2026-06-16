import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const PATHS = ['', '/about', '/work', '/work/directa', '/services', '/contact'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://santiagorivera.com';
  const out: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const path of PATHS) {
      out.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(routing.locales.map((l) => [l, `${base}/${l}${path}`])),
        },
      });
    }
  }
  return out;
}
