'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useThemeWipe } from '@/components/providers/ThemeWipeProvider';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('common');
  const wipe = useThemeWipe();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={t('theme')}
      onClick={() => wipe(() => setTheme(isDark ? 'light' : 'dark'))}
      className="brut-sm press inline-flex h-9 w-9 items-center justify-center border-2 border-ink bg-surface text-ink"
    >
      <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden>
        {isDark ? (
          <path d="M11 7.5A4 4 0 0 1 6.5 3a4 4 0 1 0 4.5 4.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        ) : (
          <>
            <circle cx="7" cy="7" r="2.4" stroke="currentColor" strokeWidth="1.3" />
            <path
              d="M7 1.5v1.5M7 11v1.5M1.5 7h1.5M11 7h1.5M2.8 2.8l1 1M10.2 10.2l1 1M2.8 11.2l1-1M10.2 3.8l1-1"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </button>
  );
}
