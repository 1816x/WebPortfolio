'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';

export function HomeExperience() {
  const locale = useLocale() as 'en' | 'es';
  const t = useTranslations('home');
  const selected = site.experience.value.filter((item) =>
    ['Moreno Diesel', 'Arwen — Discord bot'].includes(item.org),
  );

  return (
    <section className="border-t border-ink/20">
      <div className="container-x py-16 md:py-24">
        <p className="eyebrow">04 — {t('experienceHeading')}</p>
        <Reveal stagger={0.08} className="mt-8 grid gap-5 md:grid-cols-2">
          {selected.map((item) => (
            <article
              key={item.org}
              className="rounded-2xl border border-ink/20 bg-surface p-6 md:p-8"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-accent">
                {item.period[locale]}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">{item.org}</h2>
              <p className="mt-1 text-sm font-medium text-ink-muted">{item.role[locale]}</p>
              <p className="mt-5 leading-relaxed text-ink-muted">{item.summary[locale]}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
