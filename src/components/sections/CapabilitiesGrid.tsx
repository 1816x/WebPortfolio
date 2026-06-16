'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';

export function CapabilitiesGrid() {
  const t = useTranslations('home');
  const locale = useLocale() as 'en' | 'es';

  return (
    <section className="container-x py-24 md:py-40 border-t border-line/10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 mb-16">
        <Reveal as="h2" className="md:col-span-7 display text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-tightest">
          {t('capabilitiesHeading')}
        </Reveal>
        <Reveal as="p" className="md:col-span-4 md:col-start-9 text-ink-muted text-lg leading-relaxed">
          {t('capabilitiesLead')}
        </Reveal>
      </div>

      <ul className="grid grid-cols-1 gap-px bg-line/10 border border-line/10 md:grid-cols-2 lg:grid-cols-3">
        {site.capabilities.map((group) => (
          <li key={group.id} className="bg-canvas p-8">
            <p className="label text-ink-subtle mb-4">{group.title[locale]}</p>
            <ul className="flex flex-wrap gap-x-3 gap-y-2 text-ink">
              {group.items.map((item, i) => (
                <li key={item} className="text-base">
                  {item}
                  {i < group.items.length - 1 && <span className="text-ink-subtle ml-3">·</span>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
