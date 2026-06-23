'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Reveal } from '@/components/ui/Reveal';
import { Marker } from '@/components/motion/Marker';
import { CopyButton } from '@/components/ui/CopyButton';
import { PendingBadge } from '@/components/ui/PendingBadge';
import { site, unwrap, isPending } from '@/content/site';

const ROW =
  'group flex items-center justify-between gap-4 border-b-2 border-white/25 py-3 font-mono text-[14px] no-underline transition-colors duration-200 hover:text-brand-yellow';
const ARROW = 'transition-transform duration-200 group-hover:translate-x-1';

/** `compact` is accepted for backward compatibility with the contact route; the royal panel renders identically. */
export function ContactPanel(_props: { compact?: boolean } = {}) {
  const t = useTranslations('home');
  const tc = useTranslations('contact');

  const email = site.contact.email.value;
  const linkedin = site.contact.linkedin.value;
  const whatsapp = unwrap(site.contact.whatsapp);
  const calendar = unwrap(site.contact.calendar);

  const headingWords = t('contactHeading').split(' ');
  const lastWord = headingWords.length > 1 ? headingWords.pop()! : t('contactHeading');
  const leadWords = headingWords.length > 1 ? `${headingWords.join(' ')} ` : '';

  return (
    <section className="relative isolate overflow-hidden border-t-[3px] border-ink bg-brand-royal text-white">
      <div aria-hidden className="halftone-on-royal pointer-events-none absolute inset-0 -z-10" />
      <div className="container-x py-20 md:py-28">
        <Reveal>
          <div className="inline-flex items-center gap-2 border-2 border-white/50 px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-white">
            <span className="dot" style={{ background: '#fff' }} />
            06 — {t('contactHeading')}
          </div>

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.03em]">
                {leadWords}
                <Marker color="yellow">{lastWord}</Marker>
              </h2>
              <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-white/80">{t('contactLead')}</p>
            </div>

            <div className="flex flex-col gap-7">
              <CopyButton
                value={email}
                label={`${tc('copy')} email`}
                done={`${tc('copied')} ✓`}
                className="w-full self-start border-white bg-transparent text-white sm:w-auto"
              >
                {'✉ '}
                {email}
              </CopyButton>

              <div className="flex flex-col">
                <a href={linkedin} target="_blank" rel="noreferrer" className={ROW}>
                  <span className="uppercase tracking-[0.12em]">{tc('linkedin')}</span>
                  <span aria-hidden className={ARROW}>
                    /santiagoxriv →
                  </span>
                </a>

                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className={ROW}>
                  <span className="uppercase tracking-[0.12em]">{tc('whatsapp')}</span>
                  {isPending(site.contact.whatsapp) ? (
                    <PendingBadge />
                  ) : (
                    <span aria-hidden className={ARROW}>
                      →
                    </span>
                  )}
                </a>

                <a href={calendar} target="_blank" rel="noreferrer" className={ROW}>
                  <span className="uppercase tracking-[0.12em]">{tc('calendar')}</span>
                  {isPending(site.contact.calendar) ? (
                    <PendingBadge />
                  ) : (
                    <span aria-hidden className={ARROW}>
                      →
                    </span>
                  )}
                </a>
              </div>

              <Link
                href="/contact"
                className="self-start font-mono text-[12px] uppercase tracking-[0.12em] text-white/80 underline-offset-4 transition-colors duration-200 hover:text-brand-yellow hover:underline"
              >
                {tc('title')} →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
