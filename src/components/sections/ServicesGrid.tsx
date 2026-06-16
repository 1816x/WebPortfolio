'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';

export function ServicesGrid() {
  const t = useTranslations('home');
  const ts = useTranslations('services');
  const locale = useLocale() as 'en' | 'es';

  return (
    <section className="container-x py-24 md:py-40 border-t border-line/10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 mb-16">
        <Reveal as="h2" className="md:col-span-7 display text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-tightest">
          {t('servicesHeading')}
        </Reveal>
        <Reveal as="p" className="md:col-span-4 md:col-start-9 text-ink-muted text-lg leading-relaxed">
          {t('servicesLead')}
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-px bg-line/10 border border-line/10 md:grid-cols-2">
        {site.services.map((service, idx) => (
          <article key={service.id} className="bg-canvas p-8 md:p-12">
            <header className="mb-8 flex items-start justify-between">
              <h3 className="display text-3xl md:text-4xl tracking-snug">{service.title[locale]}</h3>
              <span className="label text-ink-subtle">0{idx + 1}</span>
            </header>
            <dl className="space-y-6 text-sm leading-relaxed">
              <div>
                <dt className="label text-ink-subtle mb-1">{ts('problem')}</dt>
                <dd className="text-ink-muted">{service.problem[locale]}</dd>
              </div>
              <div>
                <dt className="label text-ink-subtle mb-1">{ts('deliverable')}</dt>
                <dd className="text-ink-muted">{service.deliverable[locale]}</dd>
              </div>
              <div>
                <dt className="label text-ink-subtle mb-1">{ts('outcome')}</dt>
                <dd className="text-ink">{service.outcome[locale]}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
