'use client';

import { useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { gsap, prefersReduced } from '@/lib/motion';
import { Link } from '@/i18n/routing';
import { Magnetic } from '@/components/motion/Magnetic';
import Image from 'next/image';
import { site } from '@/content/site';

const CTA =
  'press group inline-flex items-center justify-center gap-2 border-[3px] border-ink px-5 py-3.5 text-[14px] font-semibold leading-none no-underline';

function Words({ text }: { text: string }) {
  const parts = text.split(' ');
  return (
    <span className="block">
      {parts.map((w, i) => {
        const norm = w.replace(/[.,]/g, '');
        const isAccent = norm === 'IA' || norm === 'AI';
        return (
          <span key={i}>
            <span className="clip">
              <span data-word className="inline-block">
                {isAccent ? <span className="text-accent">{w}</span> : w}
              </span>
            </span>
            {i < parts.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </span>
  );
}

export function Hero() {
  const t = useTranslations('home');
  const locale = useLocale() as 'en' | 'es';
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-word]', {
        yPercent: 115,
        rotate: 4,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'back.out(1.8)',
        stagger: 0.06,
        delay: 0.15,
      });
    }, node);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative isolate overflow-hidden border-b border-ink/20">
      <div className="container-x grid min-h-[calc(100svh-4rem)] grid-cols-1 items-center gap-10 py-12 md:grid-cols-[1.4fr_0.6fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <p className="eyebrow">{site.person.name}</p>

          <h1 className="text-[clamp(2.6rem,6.2vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.03em]">
            <Words text={t('heroLineA')} />
            <Words text={t('heroLineB')} />
            <Words text={t('heroLineC')} />
          </h1>

          <p className="max-w-[48ch] text-[17px] leading-relaxed text-ink-muted">
            {t('heroIntro')}
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <Magnetic>
              <Link href="/work" className={`${CTA} bg-ink text-canvas`}>
                {t('ctaWork')}
                <span
                  aria-hidden
                  className="transition-transform duration-200 ease-steps3 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contact" className={`${CTA} bg-surface text-ink`}>
                {t('ctaContact')}
                <span
                  aria-hidden
                  className="transition-transform duration-200 ease-steps3 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl bg-canvas-sunken">
          <Image
            src={site.person.portrait.value}
            alt={site.person.portraitAlt[locale]}
            width={800}
            height={1000}
            priority
            className="aspect-[4/5] h-auto w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
