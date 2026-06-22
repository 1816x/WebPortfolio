'use client';

import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Neo-brutalist button: a bordered, hard-shadow box that lifts on hover and
 * slams flat on press (see `.press` in globals.css).
 *
 * IMPORTANT — button bug fix: the magnetic-pull effect must NEVER live on this
 * element. The press uses `transform: translate(...)`; a magnet that also wrote
 * `transform` to the same node would fight it and the button would jump/stick.
 * Wrap the button in <Magnetic> instead — that translates an OUTER wrapper, so
 * the two transforms live on different elements and never collide.
 */
type Variant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'underline';

const base =
  'press group inline-flex select-none items-center justify-center gap-2 font-semibold leading-none no-underline';

const boxed = 'border-[3px] border-ink shadow-brut px-5 py-3.5 text-[14px]';

const variants: Record<Variant, string> = {
  primary: `${boxed} bg-ink text-canvas`,
  secondary: `${boxed} bg-surface text-ink`,
  accent: `${boxed} bg-brand-yellow text-ink`,
  // kept for back-compat with not-yet-migrated sections
  ghost: `${boxed} bg-surface text-ink`,
  underline:
    'font-mono text-[12px] uppercase tracking-[0.12em] text-ink underline decoration-[2px] underline-offset-4 hover:decoration-brand-blue',
};

type CommonProps = { variant?: Variant; children: ReactNode; className?: string; withArrow?: boolean };
type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, withArrow = true, ...rest }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], className)} {...rest}>
      {children}
      {withArrow && variant !== 'underline' ? <Arrow /> : null}
    </button>
  ),
);
Button.displayName = 'Button';

export const ButtonLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'primary', className, children, withArrow = true, ...rest }, ref) => (
    <a ref={ref} className={cn(base, variants[variant], className)} {...rest}>
      {children}
      {withArrow && variant !== 'underline' ? <Arrow /> : null}
    </a>
  ),
);
ButtonLink.displayName = 'ButtonLink';

function Arrow() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="transition-transform duration-300 ease-[steps(2)] group-hover:translate-x-1"
    >
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
