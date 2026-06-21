'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Copy-to-clipboard with a state morph: on click it copies `value` and swaps
 * its visible label to a success state with a green border flash. The visible
 * label is aria-hidden and a stable `label` provides the accessible name, while
 * a polite `role="status"` region announces success — so the button's name
 * never shifts under assistive tech.
 */
export function CopyButton({
  value,
  children,
  done = 'COPIADO ✓',
  label,
  className,
}: {
  value: string;
  children: ReactNode;
  done?: string;
  label?: string;
  className?: string;
}) {
  const [ok, setOk] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
        } catch {
          /* clipboard blocked — still show feedback */
        }
        setOk(true);
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setOk(false), 1600);
      }}
      className={cn(
        'press inline-flex max-w-full items-center gap-2 border-[3px] px-4 py-3 text-left font-mono text-[12px] font-bold sm:px-5 sm:py-3.5 sm:text-[14px]',
        ok ? 'border-brand-green text-brand-green' : 'border-current',
        className,
      )}
    >
      <span aria-hidden className="min-w-0 break-all">
        {ok ? done : children}
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {ok ? done : ''}
      </span>
    </button>
  );
}
