import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/** Hard, snappy easings — brutalist motion lands, it doesn't drift. */
export const EASE = {
  snap: 'back.out(1.8)',
  pop: 'back.out(2.4)',
  bigPop: 'back.out(3)',
  hardOut: 'power4.out',
  hardIn: 'power4.in',
  spring: 'elastic.out(1, 0.4)',
} as const;

export const DUR = {
  press: 0.12,
  enter: 0.5,
  wipe: 0.42,
} as const;

/** Single source of truth for "should motion be suppressed?". */
export function prefersReduced(): boolean {
  if (typeof window === 'undefined') return true;
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('calm')
  );
}

/** Pointer-driven effects (magnet, drag) only on real pointers, never reduced. */
export function finePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: fine)').matches && !prefersReduced();
}

export { gsap, ScrollTrigger };
