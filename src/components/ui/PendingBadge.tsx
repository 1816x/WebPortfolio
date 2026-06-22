'use client';

import { useTranslations } from 'next-intl';

/**
 * Surfaces unverified content. Uses currentColor so it stays legible wherever
 * it sits — on a light section (dark text) or on a dark panel like the contact
 * block / footer (light text).
 */
export function PendingBadge() {
  const t = useTranslations('common');
  return (
    <span
      title={t('pendingTooltip')}
      className="ml-2 inline-flex items-center gap-1 border border-current/40 px-1.5 py-0.5 align-middle font-mono text-[9px] uppercase tracking-[0.12em] opacity-70"
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-coral" />
      {t('pending')}
    </span>
  );
}
