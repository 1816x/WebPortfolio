import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ContactPanel } from '@/components/sections/ContactPanel';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return buildMetadata({ locale: locale as 'en' | 'es', title: `${t('title')} — Santiago Rivera`, description: t('lede'), path: '/contact' });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <article className="container-x pt-40 pb-24">
      <p className="eyebrow mb-8">{t('title')}</p>
      <h1 className="display text-[clamp(3rem,8vw,7rem)] leading-[1] tracking-tightest max-w-5xl">
        {t('lede')}
      </h1>

      <div className="mt-20">
        <ContactPanel compact />
      </div>
    </article>
  );
}
