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
    startTransition(() => router.replace(pathname, { locale: next }));
  };

  return (
    <div
      className={cn(
        'brut-sm inline-flex select-none border-2 border-ink bg-brand-yellow font-mono text-[11px] font-bold',
        pending && 'opacity-60',
      )}
      role="group"
      aria-label="Language"
    >
      {(['es', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => set(l)}
          aria-pressed={locale === l}
          className={cn(
            'px-2.5 py-1.5 uppercase transition-colors ease-steps3',
            locale === l ? 'bg-ink text-canvas' : 'text-ink hover:bg-ink/10',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
