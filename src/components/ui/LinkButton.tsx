import { type ComponentProps, type ReactNode } from 'react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/cn';

/**
 * Internal, locale-aware button-styled link (server-safe). Use for navigation
 * to other routes so next-intl localizes the pathname (e.g. /contact → /es/contacto).
 * For external/download links use <ButtonLink> from ui/Button instead.
 */
type Variant = 'primary' | 'secondary' | 'accent';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-canvas',
  secondary: 'bg-surface text-ink',
  accent: 'bg-brand-yellow text-on-accent',
};

export function LinkButton({
  href,
  variant = 'primary',
  className,
  children,
}: {
  href: ComponentProps<typeof Link>['href'];
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'press group inline-flex items-center justify-center gap-2 border-[3px] border-ink px-5 py-3.5 text-[14px] font-semibold leading-none no-underline',
        variants[variant],
        className,
      )}
    >
      {children}
      <span aria-hidden className="transition-transform duration-200 ease-steps3 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
