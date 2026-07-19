'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { site, unwrap, isPending } from '@/content/site';
import { PendingBadge } from '@/components/ui/PendingBadge';

const NAV = [
  { href: '/work', key: 'work' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/contact', key: 'contact' },
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const tnav = useTranslations('nav');
  const tcontact = useTranslations('contact');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-[3px] border-ink bg-brand-royal-deep text-panel-ink">
      <div className="container-x grid grid-cols-1 gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="max-w-xl text-3xl font-bold leading-[1.06] md:text-4xl">{t('tagline')}</p>
          <p className="mt-6 font-mono text-[12px] tracking-[0.1em] text-panel-ink/65">DIRECTA — DIRECTA.MX</p>
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <p className="label mb-4 text-panel-ink/65">{tnav('home')}</p>
          <ul className="space-y-2 text-[15px]">
            {NAV.map(({ href, key }) => (
              <li key={href}>
                <Link href={href} className="transition-colors hover:text-brand-yellow">
                  {tnav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label mb-4 text-panel-ink/65">{tcontact('title')}</p>
          <ul className="space-y-2 font-mono text-[13px]">
            <li>
              <a href={`mailto:${site.contact.email.value}`} className="transition-colors hover:text-brand-yellow">
                {site.contact.email.value}
              </a>
            </li>
            <li>
              <a href={site.contact.linkedin.value} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand-yellow">
                LinkedIn ↗
              </a>
            </li>
            {!isPending(site.social.github) && unwrap(site.social.github) ? (
              <li>
                <a href={unwrap(site.social.github)} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand-yellow">
                  GitHub ↗
                </a>
              </li>
            ) : null}
            <li>
              <a href={`https://wa.me/${unwrap(site.contact.whatsapp)}`} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand-yellow">
                WhatsApp {isPending(site.contact.whatsapp) ? <PendingBadge /> : null}
              </a>
            </li>
            <li>
              <a href={unwrap(site.contact.calendar)} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand-yellow">
                {tcontact('calendar')} {isPending(site.contact.calendar) ? <PendingBadge /> : null}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col gap-1 border-t-2 border-panel-ink/15 py-6 font-mono text-[11px] tracking-[0.1em] text-panel-ink/65 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {site.person.name}. {t('rights')}
          <span className="caret ml-0.5">_</span>
        </p>
        <p>{t('builtWith')}</p>
      </div>
    </footer>
  );
}
