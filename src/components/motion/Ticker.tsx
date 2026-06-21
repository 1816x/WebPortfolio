'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReduced } from '@/lib/motion';

/**
 * Velocity-reactive brutalist ticker. Base crawl, but scroll speed feeds a
 * clamped skew + nudge so it lurches when you scroll fast and exhales to a
 * crawl when you stop. Decorative → aria-hidden; pauses on hover; static under
 * reduced-motion.
 */
export function Ticker({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = track?.parentElement;
    if (!track || !wrap || prefersReduced()) return;

    const xTo = gsap.quickTo(track, 'x', { duration: 0.5, ease: 'power3' });
    const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.4, ease: 'power2' });

    let base = 0;
    let half = track.scrollWidth / 2;
    let paused = false;
    const measure = () => (half = track.scrollWidth / 2);
    const enter = () => (paused = true);
    const leave = () => (paused = false);

    window.addEventListener('resize', measure);
    wrap.addEventListener('pointerenter', enter);
    wrap.addEventListener('pointerleave', leave);

    const tick = () => {
      if (paused) return;
      base -= 1.1;
      if (half && -base >= half) base += half;
      xTo(base);
    };
    gsap.ticker.add(tick);

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-300, 300, self.getVelocity() / 12);
        base -= Math.abs(v) * 0.02;
        skewTo(v * 0.04);
      },
    });

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      window.removeEventListener('resize', measure);
      wrap.removeEventListener('pointerenter', enter);
      wrap.removeEventListener('pointerleave', leave);
    };
  }, []);

  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap border-y-[3px] border-ink bg-panel text-panel-ink" aria-hidden>
      <div ref={trackRef} className="ticker-track py-3 font-mono text-[13px] font-bold tracking-[0.14em]">
        {loop.map((it, i) => (
          <span key={i} className="px-6">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
