'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { LocaleSwitcher } from './LocaleSwitcher';
import { CalmToggle } from './CalmToggle';

const ROUTES = [
  { href: '/work', key: 'work', accent: 'hover:bg-brand-blue hover:text-white' },
  { href: '/about', key: 'about', accent: 'hover:bg-brand-coral hover:text-on-accent' },
  { href: '/services', key: 'services', accent: 'hover:bg-brand-green hover:text-on-accent' },
  { href: '/contact', key: 'contact', accent: 'hover:bg-brand-yellow hover:text-on-accent' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-canvas">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-3 font-bold">
          <span className="grid h-9 w-9 place-items-center bg-ink font-mono text-[14px] text-canvas">SR</span>
          <span className="hidden text-[15px] sm:inline">Santiago Rivera</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {ROUTES.map(({ href, key, accent }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'border-2 px-3 py-2 text-[12px] font-medium tracking-[0.03em] transition-colors duration-200 ease-steps3',
                  active ? 'border-ink' : 'border-transparent',
                  accent,
                )}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher />
          <CalmToggle />
        </div>

        <button
          type="button"
          className="brut-sm press inline-flex h-9 items-center gap-2 border-2 border-ink bg-surface px-3 font-mono text-[12px] font-bold md:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span aria-hidden>{open ? '✕' : '☰'}</span>
          {open ? t('close') : t('menu')}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t-[3px] border-ink bg-canvas md:hidden">
          <nav className="container-x flex flex-col gap-3 py-6" aria-label="Mobile">
            {ROUTES.map(({ href, key }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'brut press flex items-center justify-between bg-surface px-4 py-4 text-2xl font-bold',
                    active && 'bg-brand-yellow text-on-accent',
                  )}
                >
                  {t(key)}
                  <span aria-hidden>→</span>
                </Link>
              );
            })}
            <div className="flex items-center gap-2 pt-2">
              <LocaleSwitcher />
              <CalmToggle />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
