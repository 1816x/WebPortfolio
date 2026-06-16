'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { site, unwrap, isPending } from '@/content/site';
import { PendingBadge } from '@/components/ui/PendingBadge';

export function Footer() {
  const t = useTranslations('footer');
  const tnav = useTranslations('nav');
  const tcontact = useTranslations('contact');
  const locale = useLocale() as 'en' | 'es';
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-line/10 pt-16 pb-12">
      <div className="container-x grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-4xl tracking-snug leading-[1.05] max-w-lg">
            {t('tagline')}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="label text-ink-muted mb-4">{tnav('home')}</p>
          <ul className="space-y-2">
            <li><Link href="/work" className="hover:text-accent transition-colors">{tnav('work')}</Link></li>
            <li><Link href="/about" className="hover:text-accent transition-colors">{tnav('about')}</Link></li>
            <li><Link href="/services" className="hover:text-accent transition-colors">{tnav('services')}</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">{tnav('contact')}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="label text-ink-muted mb-4">{tcontact('title')}</p>
          <ul className="space-y-2">
            <li>
              <a className="hover:text-accent transition-colors" href={`mailto:${site.contact.email.value}`}>
                {site.contact.email.value}
              </a>
            </li>
            <li>
              <a
                className="hover:text-accent transition-colors"
                href={site.contact.linkedin.value}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="hover:text-accent transition-colors"
                href={`https://wa.me/${unwrap(site.contact.whatsapp)}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp {isPending(site.contact.whatsapp) ? <PendingBadge /> : null}
              </a>
            </li>
            <li>
              <a
                className="hover:text-accent transition-colors"
                href={unwrap(site.contact.calendar)}
                target="_blank"
                rel="noreferrer"
              >
                {tcontact('calendar')} {isPending(site.contact.calendar) ? <PendingBadge /> : null}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-16 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <p className="label text-ink-muted">
          © {year} {site.person.name}. {t('rights')}
        </p>
        <p className="label text-ink-muted">{t('builtWith')}</p>
      </div>
    </footer>
  );
}
