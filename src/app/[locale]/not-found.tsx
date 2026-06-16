'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-start justify-center">
      <p className="eyebrow mb-6">404</p>
      <h1 className="display text-[clamp(3rem,10vw,9rem)] leading-[1] tracking-tightest">
        {t('title')}
      </h1>
      <p className="mt-6 max-w-md text-ink-muted text-lg">{t('body')}</p>
      <Link
        href="/"
        className="mt-12 font-mono text-[12px] uppercase tracking-[0.14em] border-b border-line/40 pb-1 hover:border-ink"
      >
        ← {t('cta')}
      </Link>
    </section>
  );
}
