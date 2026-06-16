import type { Metadata } from 'next';
import { site } from '@/content/site';

type BuildArgs = {
  locale: 'en' | 'es';
  title: string;
  description: string;
  path?: string;
};

export function buildMetadata({ locale, title, description, path = '/' }: BuildArgs): Metadata {
  const base = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  const url = `${base}/${locale}${path === '/' ? '' : path}`;
  return {
    metadataBase: new URL(base),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${base}/en${path === '/' ? '' : path}`,
        es: `${base}/es${path === '/' ? '' : path}`,
      },
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
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.person.name,
    url: site.url,
    sameAs: [site.social.linkedin.value].filter(Boolean),
    jobTitle: site.person.role[locale].value,
    worksFor: {
      '@type': 'Organization',
      name: 'Directa',
      url: 'https://directa.mx',
    },
  };
}
