'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { Link } from '@/i18n/routing';
import { site, isPending } from '@/content/site';
import { PendingBadge } from '@/components/ui/PendingBadge';

export function IntroBlock() {
  const t = useTranslations('home');
  const locale = useLocale() as 'en' | 'es';
  const portraitPending = isPending(site.person.portrait);

  return (
    <section className="container-x py-24 md:py-40">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <div
            className="aspect-[4/5] w-full overflow-hidden bg-canvas-sunken relative"
            aria-label={site.person.portraitAlt[locale]}
          >
            {portraitPending ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center p-8">
                <div className="h-32 w-32 rounded-full border border-line/20" />
                <p className="label text-ink-subtle">Portrait</p>
                <PendingBadge />
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={site.person.portrait.value}
                alt={site.person.portraitAlt[locale]}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>

        <div className="md:col-span-7 md:pl-16">
          <Reveal as="p" className="eyebrow mb-8">{t('introHeading')}</Reveal>
          <Reveal as="p" className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
            {t('introBody')}
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="label text-ink-subtle mb-2">{site.person.name}</p>
              <p className="text-ink-muted">{site.person.role[locale].value}</p>
            </div>
            <div>
              <p className="label text-ink-subtle mb-2">Directa</p>
              <a
                href="https://directa.mx"
                target="_blank"
                rel="noreferrer"
                className="text-ink-muted hover:text-accent transition-colors"
              >
                directa.mx →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
