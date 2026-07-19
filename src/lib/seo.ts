import type { Metadata } from 'next';
import { site, isPending, unwrap } from '@/content/site';
import { getPathname, routing, type Pathnames } from '@/i18n/routing';

type BuildArgs = {
  locale: 'en' | 'es';
  title: string;
  description: string;
  /** Internal routing key (e.g. '/work'); the localized public URL is derived per locale. */
  path?: Pathnames;
};

/** Resolve the absolute, locale-aware public URL for a routing key. */
function localizedUrl(base: string, locale: 'en' | 'es', path: Pathnames): string {
  return `${base}${getPathname({ locale, href: path })}`;
}

export function buildMetadata({ locale, title, description, path = '/' }: BuildArgs): Metadata {
  const base = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  const url = localizedUrl(base, locale, path);

  // hreflang alternates must point at each locale's REAL localized path
  // (e.g. /es/trabajo, not /es/work) or they 404 and the SEO signal is wrong.
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, localizedUrl(base, l, path)]),
  );
  languages['x-default'] = localizedUrl(base, routing.defaultLocale, path);

  return {
    metadataBase: new URL(base),
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: site.person.name,
      locale: locale === 'es' ? 'es_MX' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export function personJsonLd(locale: 'en' | 'es') {
  const base = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  const role = site.person.role[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.person.name,
    url: base,
    sameAs: [site.social.linkedin.value, site.social.github.value, site.social.x.value].filter(Boolean),
    // Only emit a verified job title — JSON-LD has no "pending" badge, so an
    // unconfirmed role would ship as a hard claim.
    ...(isPending(role) ? {} : { jobTitle: unwrap(role) }),
    worksFor: {
      '@type': 'Organization',
      name: 'Directa',
      url: 'https://directa.mx',
    },
  };
}
