'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, finePointer } from '@/lib/motion';
import { cn } from '@/lib/cn';

/**
 * Magnetic pull. Translates THIS wrapper toward the pointer. The interactive
 * child (a Button) keeps its own press transform — because the two transforms
 * live on different elements, they never fight. This is the fix for the
 * button "jump/stick" bug.
 */
export function Magnetic({
  children,
  strength = 0.3,
  max = 12,
  className,
}: {
  children: ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(gsap.utils.clamp(-max, max, dx * strength));
      yTo(gsap.utils.clamp(-max, max, dy * strength));
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength, max]);

  return (
    <span ref={ref} className={cn('inline-block', className)}>
      {children}
    </span>
  );
}
