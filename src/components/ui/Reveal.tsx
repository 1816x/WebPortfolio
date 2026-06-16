'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Reveals each child individually. Best for word/line stacks. */
  stagger?: number;
  y?: number;
};

export function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  stagger,
  y = 24,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(stagger ? (node.children as unknown as Element[]) : node, { opacity: 1, y: 0 });
      return;
    }

    const targets = stagger ? (node.children as unknown as Element[]) : node;
    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        delay,
        duration: 1,
        ease: 'expo.out',
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: node,
          start: 'top 85%',
          once: true,
        },
      });
    }, node);

    return () => ctx.revert();
  }, [delay, stagger, y]);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Component>
  );
}
