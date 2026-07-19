'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { Marker } from '@/components/motion/Marker';

/** No i18n key exists for this one-line tagline, so it lives here, bilingual. */
const TAGLINE: Record<'en' | 'es', string> = {
  en: 'A practice, not an agency.',
  es: 'Una práctica, no una agencia.',
};

export function IntroBlock() {
  const t = useTranslations('home');
  const locale = useLocale() as 'en' | 'es';

  return (
    <section className="border-t-[3px] border-ink">
      <div className="container-x py-16 md:py-24">
        <h2 className="brut-sm inline-flex items-center gap-2 bg-surface px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em]">
          <span className="dot" />
          02 — {t('introHeading')}
        </h2>

        <Reveal className="mt-8 md:mt-12" y={36}>
          <p className="mb-5 text-[clamp(1.05rem,2vw,1.35rem)] font-bold leading-[1.2] tracking-[-0.01em]">
            <Marker color="coral">{TAGLINE[locale]}</Marker>
          </p>
          <p className="max-w-[24ch] text-[clamp(1.5rem,3.2vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.02em]">
            {t('introBody')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
