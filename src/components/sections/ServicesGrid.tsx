'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';

const NUM_COLORS = [
  'bg-brand-yellow text-on-accent',
  'bg-brand-blue text-white',
  'bg-brand-coral text-on-accent',
  'bg-brand-green text-on-accent',
];

export function ServicesGrid() {
  const t = useTranslations('home');
  const ts = useTranslations('services');
  const locale = useLocale() as 'en' | 'es';

  return (
    <section className="border-t-[3px] border-ink">
      <div className="container-x py-16 md:py-24">
        <div className="brut-sm inline-flex items-center gap-2 bg-surface px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em]">
          <span className="dot" />
          04 — {t('servicesHeading')}
        </div>

        <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-ink-muted">
          {t('servicesLead')}
        </p>

        <Reveal stagger={0.08} className="mt-10 grid gap-5 md:grid-cols-2">
          {site.services.map((s, i) => (
            <div key={s.id} className="brut bg-surface p-6">
              <div className="mb-5 flex items-center gap-3">
                <span
                  className={`grid h-9 w-9 place-items-center border-2 border-ink font-mono font-bold ${NUM_COLORS[i]}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl font-bold tracking-[-0.01em]">{s.title[locale]}</h3>
              </div>

              <dl className="grid grid-cols-[88px_1fr] gap-y-2.5 text-[14px] leading-snug">
                <dt className="pt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-subtle">
                  {ts('problem')}
                </dt>
                <dd>{s.problem[locale]}</dd>

                <dt className="pt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-subtle">
                  {ts('deliverable')}
                </dt>
                <dd>{s.deliverable[locale]}</dd>

                <dt className="pt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-subtle">
                  {ts('outcome')}
                </dt>
                <dd className="font-bold">{s.outcome[locale]}</dd>
              </dl>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
