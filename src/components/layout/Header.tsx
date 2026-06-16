'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { ThemeToggle } from './ThemeToggle';
import { LocaleSwitcher } from './LocaleSwitcher';

const ROUTES = [
  { href: '/work', key: 'work' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/contact', key: 'contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        scrolled ? 'backdrop-blur-md bg-canvas/80 border-b border-line/10' : 'bg-transparent',
      )}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-[20px] leading-none tracking-snug">
          Santiago <span className="text-accent">·</span> Rivera
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {ROUTES.map(({ href, key }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                href={href}
                key={href}
                className={cn(
                  'font-mono text-[11px] uppercase tracking-[0.16em] transition-colors',
                  active ? 'text-ink' : 'text-ink-muted hover:text-ink',
                )}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        <button
          className="md:hidden font-mono text-[11px] uppercase tracking-[0.16em]"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-line/10 bg-canvas px-[var(--gutter)] py-6"
        >
          <nav className="flex flex-col gap-5" aria-label="Mobile">
            {ROUTES.map(({ href, key }) => (
              <Link
                href={href}
                key={href}
                className="font-display text-3xl tracking-snug"
              >
                {t(key)}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-line/10">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
