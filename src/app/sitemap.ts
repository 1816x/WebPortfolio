import type { MetadataRoute } from 'next';
import { getPathname, routing, type Pathnames } from '@/i18n/routing';

const PATHS: Pathnames[] = ['/', '/about', '/work', '/work/directa', '/services', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://santiagorivera.com';
  const url = (locale: 'en' | 'es', path: Pathnames) => `${base}${getPathname({ locale, href: path })}`;

  const out: MetadataRoute.Sitemap = [];
  for (const path of PATHS) {
    for (const locale of routing.locales) {
      out.push({
        url: url(locale, path),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '/' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(routing.locales.map((l) => [l, url(l, path)])),
        },
      });
    }
  }
  return out;
}
