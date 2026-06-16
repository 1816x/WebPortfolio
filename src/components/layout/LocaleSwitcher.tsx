'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';
import { cn } from '@/lib/cn';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const set = (next: 'en' | 'es') => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.16em]',
        pending && 'opacity-50',
      )}
      role="group"
      aria-label="Language"
    >
      {(['es', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => set(l)}
          className={cn(
            'px-2 py-1 rounded transition-colors',
            locale === l ? 'text-ink' : 'text-ink-muted hover:text-ink',
          )}
          aria-current={locale === l}
          type="button"
        >
          {l}
        </button>
      ))}
    </div>
  );
}
