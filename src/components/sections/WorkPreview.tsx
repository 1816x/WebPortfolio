'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';

export function WorkPreview() {
  const t = useTranslations('home');
  const tw = useTranslations('work');
  const locale = useLocale() as 'en' | 'es';

  return (
    <section className="container-x py-24 md:py-40">
      <div className="mb-16 flex items-end justify-between">
        <Reveal as="h2" className="display text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-tightest">
          {t('workHeading')}
        </Reveal>
        <Link href="/work" className="label hover:text-accent transition-colors hidden md:inline-block">
          {t('workViewAll')} →
        </Link>
      </div>

      <ul className="rule">
        {site.work.map((project) => (
          <li key={project.slug}>
            <Link
              href={project.slug === 'directa' ? '/work/directa' : '/work'}
              className="group block border-b border-line/10 py-8 md:py-12 transition-colors"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end">
                <span className="label text-ink-subtle md:col-span-1">01</span>
                <span className="display text-[clamp(2rem,6vw,5rem)] leading-[0.95] tracking-tightest md:col-span-6 group-hover:italic group-hover:text-accent transition-all duration-500">
                  {project.name}
                </span>
                <span className="label text-ink-muted md:col-span-3">
                  {project.summary[locale]}
                </span>
                <span className="label text-ink-subtle md:col-span-2 md:text-right">
                  {project.tags.join(' · ')}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
