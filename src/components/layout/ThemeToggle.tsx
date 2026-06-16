'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line/20 text-ink hover:border-line/60 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        {isDark ? (
          <path
            d="M11 7.5A4 4 0 0 1 6.5 3a4 4 0 1 0 4.5 4.5z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        ) : (
          <>
            <circle cx="7" cy="7" r="2.4" stroke="currentColor" strokeWidth="1.1" />
            <path
              d="M7 1.5v1.6M7 10.9v1.6M1.5 7h1.6M10.9 7h1.6M2.6 2.6l1.2 1.2M10.2 10.2l1.2 1.2M2.6 11.4l1.2-1.2M10.2 3.8l1.2-1.2"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </button>
  );
}
