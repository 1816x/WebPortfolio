'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';

export function CapabilitiesGrid() {
  const t = useTranslations('home');
  const locale = useLocale() as 'en' | 'es';

  return (
    <section className="border-t-[3px] border-ink">
      <div className="container-x py-16 md:py-24">
        <h2 className="brut-sm inline-flex items-center gap-2 bg-surface px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em]">
          <span className="dot" />
          05 — {t('capabilitiesHeading')}
        </h2>

        <p className="mt-6 max-w-[42ch] text-[18px] leading-relaxed text-ink-muted md:text-[20px]">
          {t('capabilitiesLead')}
        </p>

        <Reveal stagger={0.07} className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {site.capabilities.map((cap) => (
            <div key={cap.id} className="brut bg-surface p-5">
              <h3 className="mb-3 font-mono text-[12px] tracking-wide text-ink-muted">
                {cap.title[locale]}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {cap.items.map((it) => (
                  <li
                    key={it}
                    className="border-2 border-ink bg-canvas px-2.5 py-1 text-[13px] leading-none"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
