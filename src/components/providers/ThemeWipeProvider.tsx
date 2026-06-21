'use client';

import { createContext, useCallback, useContext, useRef, type ReactNode } from 'react';
import { gsap, prefersReduced } from '@/lib/motion';

type WipeFn = (swap: () => void) => void;

const ThemeWipeContext = createContext<WipeFn>((swap) => swap());
export const useThemeWipe = () => useContext(ThemeWipeContext);

/**
 * Guillotine wipe: a single solid panel slams across the viewport, the state
 * swap (theme change) happens mid-cover, then it retracts off the far edge.
 * Transform-driven (translateX), not an animated clip-path, so it stays cheap
 * and works on iOS. Reduced-motion / calm just runs the swap instantly.
 *
 * A timeline ref guarantees a rapid second toggle kills the in-flight timeline
 * (and its onComplete) so the full-screen panel can never get stuck visible.
 */
export function ThemeWipeProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const wipe = useCallback<WipeFn>((swap) => {
    const el = ref.current;
    if (!el || prefersReduced()) {
      swap();
      return;
    }
    tlRef.current?.kill();
    gsap.set(el, { display: 'block', xPercent: -101, skewX: -6, scale: 1.25 });
    tlRef.current = gsap
      .timeline({ onComplete: () => gsap.set(el, { display: 'none' }) })
      .to(el, { xPercent: 0, duration: 0.32, ease: 'power4.in' })
      .add(swap)
      .to(el, { xPercent: 101, duration: 0.36, ease: 'power4.out' }, '+=0.03');
  }, []);

  return (
    <ThemeWipeContext.Provider value={wipe}>
      {children}
      <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[200] hidden bg-brand-yellow" />
    </ThemeWipeContext.Provider>
  );
}
