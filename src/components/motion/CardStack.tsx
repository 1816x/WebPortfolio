'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, finePointer, prefersReduced } from '@/lib/motion';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') gsap.registerPlugin(Draggable);

const ROTS = [-3, 2, -2];

/**
 * The hero's interactive centerpiece — replaces the crashed 3D field. Three
 * real cards (availability / studio / stats) deal in with a shadow lag-snap,
 * the green dot keeps a heartbeat, and on fine pointers the cards are grabbable
 * and fling home with an elastic return. Drag is off on touch (so it never
 * hijacks scroll) and rotation flattens on phones (so corners don't clip);
 * everything is static under reduced-motion / calm.
 *
 * Cards animate hover via box-shadow only (no transform), so the press shadow
 * and Draggable's transform never fight.
 */
export function CardStack() {
  const t = useTranslations('home');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = gsap.utils.toArray<HTMLElement>('[data-card]', root);
    const narrow = window.innerWidth < 640;
    const rotOf = (i: number) => (narrow ? 0 : ROTS[i] ?? 0);

    if (prefersReduced()) {
      cards.forEach((c, i) => gsap.set(c, { rotate: rotOf(i) }));
      return;
    }

    const drags: Draggable[] = [];
    const ctx = gsap.context(() => {
      cards.forEach((c, i) => {
        gsap.set(c, { rotate: rotOf(i) });
        gsap.from(c, {
          y: 46,
          x: -14,
          rotate: rotOf(i) - 7,
          autoAlpha: 0,
          duration: 0.55,
          ease: 'back.out(2.2)',
          delay: 0.35 + i * 0.09,
        });
      });

      gsap
        .timeline({ repeat: -1, repeatDelay: 0.9 })
        .to('[data-dot]', { scale: 1.28, duration: 0.12, ease: 'power3.out' })
        .to('[data-dot]', { scale: 1, duration: 0.12, ease: 'power2.in' })
        .to('[data-dot]', { scale: 1.18, duration: 0.1, ease: 'power3.out' })
        .to('[data-dot]', { scale: 1, duration: 0.18, ease: 'power2.in' });
      gsap.fromTo(
        '[data-ring]',
        { scale: 1, opacity: 0.85 },
        { scale: 2.5, opacity: 0, duration: 1.15, ease: 'power2.out', repeat: -1, repeatDelay: 0.75 },
      );

      if (finePointer()) {
        cards.forEach((c, i) => {
          const [d] = Draggable.create(c, {
            type: 'x,y',
            zIndexBoost: true,
            onPress() {
              gsap.to(c, { scale: 1.05, duration: 0.12 });
            },
            onRelease() {
              gsap.to(c, { x: 0, y: 0, scale: 1, rotate: rotOf(i), duration: 0.8, ease: 'elastic.out(1,0.4)' });
            },
          });
          drags.push(d);
        });
      }
    }, root);

    return () => {
      // gsap.context does NOT track Draggable — kill them explicitly to avoid
      // leaking pointer listeners across re-mounts (locale switch / route back).
      drags.forEach((d) => d.kill());
      ctx.revert();
    };
  }, []);

  const card = 'shadow-brut transition-shadow duration-150 hover:shadow-brut-lg';

  return (
    <div ref={ref} className="flex flex-col gap-4 self-center">
      <div
        data-card
        className={`${card} flex items-center gap-3 border-[3px] border-ink bg-brand-yellow px-5 py-4 font-mono text-[13px] font-bold tracking-[0.04em] text-on-accent`}
      >
        <span className="relative inline-flex h-3.5 w-3.5 flex-none">
          <span data-ring className="absolute inset-0 rounded-full border-2 border-brand-green" />
          <span data-dot className="absolute inset-0 rounded-full border-2 border-ink bg-brand-green" />
        </span>
        {t('heroAvailable').toUpperCase()}
      </div>

      <div data-card className={`${card} border-[3px] border-ink bg-brand-blue px-5 py-5 text-white`}>
        <div className="font-mono text-[11px] tracking-[0.14em] text-white/85">{t('heroStudioLabel').toUpperCase()}</div>
        <div className="mt-1 text-3xl font-bold leading-tight">Directa</div>
        <div className="mt-2 font-mono text-[13px]">→ directa.mx</div>
      </div>

      <div data-card className="grid grid-cols-2 gap-4">
        <div className={`${card} border-[3px] border-ink bg-surface px-4 py-4`}>
          <div className="text-3xl font-bold leading-none">4</div>
          <div className="mt-1.5 font-mono text-[10px] tracking-[0.1em] text-ink-muted">{t('heroServicesLabel').toUpperCase()}</div>
        </div>
        <div className={`${card} border-[3px] border-ink bg-brand-coral px-4 py-4 text-on-accent`}>
          <div className="text-3xl font-bold leading-none">MX</div>
          <div className="mt-1.5 font-mono text-[10px] tracking-[0.1em] text-on-accent">{t('heroBaseLabel').toUpperCase()}</div>
        </div>
      </div>

      <p aria-hidden className="hidden text-right font-mono text-[10px] tracking-[0.1em] text-ink-subtle lg:block">
        {t('heroGrabHint')}
      </p>
    </div>
  );
}
