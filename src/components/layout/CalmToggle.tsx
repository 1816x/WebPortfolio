'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';

/**
 * Visible "reduce motion" control — the biggest real-world a11y win for a site
 * this animated, since many users never set the OS flag. Persists to
 * localStorage and reloads so every motion provider re-reads the calm state
 * from a single source of truth (a blocking script in the root layout applies
 * the class before hydration). Its displayed state also reflects the OS
 * prefers-reduced-motion flag so it never claims motion is on when it isn't.
 */
export function CalmToggle() {
  const t = useTranslations('common');
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    setCalm(
      document.documentElement.classList.contains('calm') ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
  }, []);

  const toggle = () => {
    try {
      localStorage.setItem('calm', calm ? '0' : '1');
    } catch {
      /* ignore */
    }
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={calm}
      title={calm ? t('enableMotion') : t('reduceMotion')}
      className={cn(
        'brut-sm press inline-flex h-9 items-center gap-1.5 border-2 border-ink px-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em]',
        calm ? 'bg-brand-yellow text-on-accent' : 'bg-surface text-ink',
      )}
    >
      <span aria-hidden>≈</span>
      <span className="hidden sm:inline">{calm ? 'off' : 'motion'}</span>
    </button>
  );
}
