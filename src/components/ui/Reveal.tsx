'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap, EASE, prefersReduced } from '@/lib/motion';

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Reveals each direct child individually — best for card grids / word stacks. */
  stagger?: number;
  y?: number;
  ease?: string;
};

/**
 * Scroll-triggered "snap into place" reveal. Objects land with a back.out
 * overshoot rather than a soft fade — the brutalist signature. Reduced-motion
 * and calm-mode render the final state instantly.
 */
export function Reveal({ children, as: Tag = 'div', className, delay = 0, stagger, y = 30, ease = EASE.snap }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = stagger ? (Array.from(node.children) as Element[]) : node;

    if (prefersReduced()) {
      gsap.set(targets, { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { autoAlpha: 0, y });
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        delay,
        duration: 0.55,
        ease,
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: node, start: 'top 86%', once: true },
      });
    }, node);

    return () => ctx.revert();
  }, [delay, stagger, y, ease]);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Component>
  );
}
