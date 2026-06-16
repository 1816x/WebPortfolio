'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { site, isPending, unwrap } from '@/content/site';
import { PendingBadge } from '@/components/ui/PendingBadge';
import { ButtonLink } from '@/components/ui/Button';

export function ContactPanel({ compact = false }: { compact?: boolean }) {
  const t = useTranslations('contact');
  const th = useTranslations('home');
  const locale = useLocale() as 'en' | 'es';
  const [copied, setCopied] = useState(false);

  const channels = [
    {
      key: 'email',
      label: t('email'),
      value: site.contact.email.value,
      href: `mailto:${site.contact.email.value}`,
      pending: isPending(site.contact.email),
    },
    {
      key: 'whatsapp',
      label: t('whatsapp'),
      value: `+${unwrap(site.contact.whatsapp)}`,
      href: `https://wa.me/${unwrap(site.contact.whatsapp)}`,
      pending: isPending(site.contact.whatsapp),
    },
    {
      key: 'linkedin',
      label: t('linkedin'),
      value: '/in/santiagoxriv',
      href: site.contact.linkedin.value,
      pending: isPending(site.contact.linkedin),
    },
    {
      key: 'calendar',
      label: t('calendar'),
      value: unwrap(site.contact.calendar).replace(/^https?:\/\//, ''),
      href: unwrap(site.contact.calendar),
      pending: isPending(site.contact.calendar),
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.email.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* silent */
    }
  };

  return (
    <section className={compact ? '' : 'container-x py-24 md:py-40 border-t border-line/10'}>
      {!compact && (
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          <h2 className="md:col-span-7 display text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-tightest">
            {th('contactHeading')}
          </h2>
          <p className="md:col-span-4 md:col-start-9 text-ink-muted text-lg leading-relaxed">
            {th('contactLead')}
          </p>
        </div>
      )}

      <ul className="rule">
        {channels.map((c) => (
          <li
            key={c.key}
            className="grid grid-cols-12 items-center gap-4 border-b border-line/10 py-6 md:py-8"
          >
            <span className="label text-ink-subtle col-span-3 md:col-span-2">{c.label}</span>
            <a
              href={c.href}
              target={c.key === 'email' ? undefined : '_blank'}
              rel="noreferrer"
              className="display col-span-7 md:col-span-7 text-xl md:text-3xl tracking-snug hover:italic hover:text-accent transition-colors"
            >
              {c.value}
              {c.pending ? <PendingBadge /> : null}
            </a>
            <span className="col-span-2 md:col-span-3 text-right">
              {c.key === 'email' ? (
                <button
                  onClick={copy}
                  className="label hover:text-accent transition-colors"
                  type="button"
                >
                  {copied ? t('copied') : t('copy')}
                </button>
              ) : (
                <span className="label text-ink-subtle">→</span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <ButtonLink
          href={unwrap(site.contact.cv)}
          download
          variant="primary"
        >
          {t('cv')} {isPending(site.contact.cv) ? <PendingBadge /> : null}
        </ButtonLink>
      </div>
    </section>
  );
}
