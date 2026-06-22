'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, prefersReduced } from '@/lib/motion';
import { cn } from '@/lib/cn';

/**
 * Highlighter primitive: a solid yellow/coral block that wipes in behind the
 * text via `scaleX` (transform-only, no clip-path repaint). Reused for the
 * hero "en serio", Enfoque, and Contacto highlights.
 */
export function Marker({
  children,
  color = 'yellow',
  className,
}: {
  children: ReactNode;
  color?: 'yellow' | 'coral';
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bg = el.querySelector('.mark-bg');
    if (!bg || prefersReduced()) return;

    const tween = gsap.fromTo(
      bg,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.45,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <span ref={ref} className={cn('mark', color === 'coral' && 'is-coral', className)}>
      <span className="mark-bg" aria-hidden />
      <span className="mark-fg">{children}</span>
    </span>
  );
}
