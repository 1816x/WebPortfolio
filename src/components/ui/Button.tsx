'use client';

import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost' | 'underline';

const base =
  'group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-300';

const variants: Record<Variant, string> = {
  primary:
    'h-11 px-5 rounded-full border border-ink/90 bg-ink text-canvas hover:bg-accent hover:border-accent hover:text-canvas',
  ghost:
    'h-11 px-5 rounded-full border border-line/30 text-ink hover:border-ink/60',
  underline:
    'pb-1 border-b border-line/40 text-ink hover:border-ink/90',
};

type CommonProps = { variant?: Variant; children: ReactNode; className?: string };

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, ...rest }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], className)} {...rest}>
      {children}
      <Arrow />
    </button>
  ),
);
Button.displayName = 'Button';

export const ButtonLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'primary', className, children, ...rest }, ref) => (
    <a ref={ref} className={cn(base, variants[variant], className)} {...rest}>
      {children}
      <Arrow />
    </a>
  ),
);
ButtonLink.displayName = 'ButtonLink';

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="transition-transform duration-500 ease-editorial group-hover:translate-x-0.5"
    >
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
