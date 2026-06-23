import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { buildMetadata, personJsonLd } from '@/lib/seo';
import Script from 'next/script';
import { site } from '@/content/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    locale: locale as 'en' | 'es',
    title: t('title'),
    description: t('description'),
  });
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'en' | 'es')) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <NextIntlClientProvider messages={messages}>
      <SmoothScrollProvider>
        <a href="#main" className="skip-link">
          {t('skipToContent')}
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </SmoothScrollProvider>
      <Script
        id="ld-person"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale as 'en' | 'es')).replace(/</g, '\\u003c') }}
      />
      {site.analytics.plausibleDomain ? (
        <Script
          defer
          data-domain={site.analytics.plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      ) : null}
      {site.analytics.gaMeasurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${site.analytics.gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.analytics.gaMeasurementId}');`}
          </Script>
        </>
      ) : null}
    </NextIntlClientProvider>
  );
}
