'use client';

import { useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@/i18n/routing';
import { ButtonLink } from '@/components/ui/Button';
import { SignatureCanvas } from '@/components/three/SignatureCanvas';
import { site, unwrap, isPending } from '@/content/site';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const t = useTranslations('home');
  const locale = useLocale() as 'en' | 'es';
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-hero-line]', {
        opacity: 0,
        y: 60,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.08,
      });
      gsap.from('[data-hero-meta]', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'expo.out',
        delay: 0.5,
        stagger: 0.08,
      });
      gsap.to('[data-hero-line]', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: node,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, node);
    return () => ctx.revert();
  }, []);

  const role = site.person.role[locale];

  return (
    <section
      ref={rootRef}
      className="relative isolate min-h-[100svh] overflow-hidden pt-32 md:pt-40"
    >
      <SignatureCanvas />

      <div className="container-x relative">
        <div data-hero-meta className="eyebrow mb-12 flex items-center gap-3">
          <span className="dot" />
          {t('heroEyebrow')}
        </div>

        <h1 className="display text-[clamp(3rem,11vw,11rem)]">
          <span data-hero-line className="block">{t('heroLineA')}</span>
          <span data-hero-line className="block">{t('heroLineB')}</span>
          <span data-hero-line className="block italic">{t('heroLineC')}</span>
        </h1>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          <p data-hero-meta className="md:col-span-5 md:col-start-7 text-lg leading-relaxed text-ink-muted">
            {t('heroIntro')}
          </p>
        </div>

        <div data-hero-meta className="mt-12 flex flex-wrap items-center gap-4">
          <ButtonLink href={`/${locale}/work`} variant="primary">
            {t('ctaWork')}
          </ButtonLink>
          <ButtonLink href={`/${locale}/contact`} variant="ghost">
            {t('ctaContact')}
          </ButtonLink>
          <span className="label text-ink-subtle ml-2">
            {role.value}
            {isPending(role) ? <span className="ml-1 text-accent">·</span> : null}
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-[var(--gutter)] right-[var(--gutter)] flex items-end justify-between">
        <p className="label text-ink-subtle">
          Directa — directa.mx
        </p>
        <p className="label text-ink-subtle">
          {unwrap(site.person.location)[locale]}
        </p>
      </div>
    </section>
  );
}
