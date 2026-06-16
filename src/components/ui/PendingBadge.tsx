'use client';

import { useTranslations } from 'next-intl';

export function PendingBadge() {
  const t = useTranslations('common');
  return (
    <span
      title={t('pendingTooltip')}
      className="ml-2 inline-flex items-center gap-1 rounded-full border border-line/30 px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted"
    >
      <span className="dot" style={{ background: 'rgb(var(--accent))' }} />
      {t('pending')}
    </span>
  );
}
