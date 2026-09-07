'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Reveal } from '@/components/ui/Reveal';
import { Magnetic } from '@/components/motion/Magnetic';
import { PendingBadge } from '@/components/ui/PendingBadge';
import { site, unwrap, isPending } from '@/content/site';

export function WorkPreview() {
  const t = useTranslations('home');
  const tWork = useTranslations('work');
  const locale = useLocale() as 'en' | 'es';

  const project = site.work[0];
  const year = unwrap(project.year);

  return (
    <section className="border-t-[3px] border-ink">
      <div className="container-x py-16 md:py-24">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 md:mb-10">
          <h2 className="brut-sm inline-flex items-center gap-2 bg-surface px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em]">
            <span className="dot" />
            03 — {t('workHeading')}
          </h2>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-ink underline-offset-4 hover:underline"
          >
            {t('workViewAll')}
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <Reveal>
          <article className="brut shadow-brut-lg grid gap-6 bg-brand-blue p-7 text-white md:grid-cols-2 md:items-end md:p-9">
            <div>
              <h3 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.92] tracking-[-0.03em]">
                {project.name}
              </h3>
              <p className="mt-3 flex flex-wrap items-center font-mono text-[12px] uppercase tracking-[0.1em] text-white/85">
                <span>{year}</span>
                {isPending(project.year) ? <PendingBadge /> : null}
                <span aria-hidden className="px-2">
                  ·
                </span>
                <span>directa.mx</span>
              </p>
            </div>

            <div>
              <p className="text-[16px] leading-relaxed text-white/90">{project.summary[locale]}</p>

              <ul className="my-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border-2 border-white px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.06em]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <Magnetic>
                <Link
                  href="/work/directa"
                  className="press group inline-flex items-center gap-2 border-[3px] border-white bg-brand-yellow px-4 py-3 text-[14px] font-bold leading-none text-on-accent no-underline"
                >
                  {tWork('viewCase')}
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Magnetic>
            </div>
          </article>
        </Reveal>

        <Reveal stagger={0.08} className="mt-6 grid gap-5 md:grid-cols-2">
          {site.projects.slice(0, 2).map((item) => (
            <a
              key={item.slug}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-ink/20 bg-surface p-6 no-underline transition-colors hover:border-accent md:p-7"
            >
              <div className="flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-wider text-ink-muted">
                <span>{item.language}</span>
                <span>{item.wip ? tWork('wip') : item.year}</span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold">{item.name}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{item.summary[locale]}</p>
              <span className="mt-5 inline-flex font-mono text-xs font-bold uppercase tracking-wider text-accent">
                {tWork('viewOnGithub')} ↗
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
