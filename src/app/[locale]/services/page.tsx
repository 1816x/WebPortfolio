import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { site } from '@/content/site';
import { ButtonLink } from '@/components/ui/Button';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return buildMetadata({ locale: locale as 'en' | 'es', title: `${t('title')} — Santiago Rivera`, description: t('lede'), path: '/services' });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');
  const l = locale as 'en' | 'es';

  return (
    <article className="container-x pt-40 pb-24">
      <p className="eyebrow mb-8">{t('title')}</p>
      <h1 className="display text-[clamp(3rem,8vw,7rem)] leading-[1] tracking-tightest max-w-5xl">
        {t('lede')}
      </h1>

      <div className="mt-24 space-y-16">
        {site.services.map((service, idx) => (
          <section key={service.id} className="border-t border-line/10 pt-12 grid grid-cols-1 md:grid-cols-12 gap-8">
            <span className="label text-ink-subtle md:col-span-1">0{idx + 1}</span>
            <h2 className="md:col-span-4 display text-3xl md:text-5xl tracking-snug leading-[1.05]">
              {service.title[l]}
            </h2>
            <div className="md:col-span-7 space-y-6 text-lg leading-relaxed text-ink-muted">
              <div>
                <p className="label text-ink-subtle mb-2">{t('problem')}</p>
                <p>{service.problem[l]}</p>
              </div>
              <div>
                <p className="label text-ink-subtle mb-2">{t('deliverable')}</p>
                <p>{service.deliverable[l]}</p>
              </div>
              <div>
                <p className="label text-ink-subtle mb-2">{t('outcome')}</p>
                <p className="text-ink">{service.outcome[l]}</p>
              </div>
              <div className="pt-4">
                <ButtonLink href={`/${l}/contact`} variant="underline">
                  {t('cta')}
                </ButtonLink>
              </div>
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
