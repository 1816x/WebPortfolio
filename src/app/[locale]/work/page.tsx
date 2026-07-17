import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { site, unwrap } from '@/content/site';
import { Reveal } from '@/components/ui/Reveal';
import { PendingBadge } from '@/components/ui/PendingBadge';
import { buildMetadata } from '@/lib/seo';

/** Language-swatch / accent colour per project (see `accent` in site.projects). */
const ACCENT_BG: Record<string, string> = {
  blue: 'bg-brand-blue',
  coral: 'bg-brand-coral',
  green: 'bg-brand-green',
  yellow: 'bg-brand-yellow',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'work' });
  return buildMetadata({ locale: locale as 'en' | 'es', title: `${t('title')} — Santiago Rivera`, description: t('lede'), path: '/work' });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('work');
  const l = locale as 'en' | 'es';

  return (
    <article>
      <header className="container-x py-16 md:py-24">
        <div className="inline-flex items-center gap-2 border-2 border-ink bg-surface px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] shadow-brut-sm">
          <span className="dot" />
          {t('title')}
        </div>
        <h1 className="mt-6 max-w-[20ch] text-[clamp(2.4rem,6.5vw,5rem)] font-bold leading-[0.98] tracking-[-0.03em]">
          {t('lede')}
        </h1>
      </header>

      <section className="border-t-[3px] border-ink">
        <div className="container-x grid gap-8 py-16 md:py-24">
          {site.work.map((p, i) => (
            <Reveal key={p.slug}>
              <Link
                href={p.slug === 'directa' ? '/work/directa' : '/work'}
                className="group block border-[3px] border-ink bg-brand-blue p-7 text-white shadow-brut-lg md:p-10"
              >
                <div className="grid gap-7 md:grid-cols-2 md:items-end">
                  <div>
                    <div className="font-mono text-[12px] tracking-[0.14em] text-white/80">
                      {String(i + 1).padStart(2, '0')} · {p.year.value}
                      {p.year.pending ? <PendingBadge /> : null}
                    </div>
                    <div className="mt-3 text-[clamp(2.6rem,6vw,5.2rem)] font-bold leading-[0.9] tracking-[-0.03em]">
                      {p.name}
                    </div>
                  </div>
                  <div>
                    <p className="text-[16px] leading-relaxed text-white/90">{p.summary[l]}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="border-2 border-white px-2.5 py-1 font-mono text-[11px] tracking-[0.06em]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 border-[3px] border-white bg-brand-yellow px-4 py-2.5 font-bold text-on-accent transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                      {t('viewCase')} →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t-[3px] border-ink">
        <div className="container-x py-16 md:py-24">
          <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 border-2 border-ink bg-surface px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] shadow-brut-sm">
                <span className="dot" />
                {t('projectsEyebrow')}
              </div>
              <h2 className="mt-5 max-w-[16ch] text-[clamp(1.9rem,4.6vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                {t('projectsHeading')}
              </h2>
              <p className="mt-4 max-w-[54ch] text-[16px] leading-relaxed text-ink-muted">{t('projectsLede')}</p>
            </div>
            <a
              href={unwrap(site.social.github)}
              target="_blank"
              rel="noreferrer"
              className="brut-sm press inline-flex shrink-0 items-center gap-2 self-start bg-surface px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-ink no-underline"
            >
              github.com/1816x
              <span aria-hidden>↗</span>
            </a>
          </div>

          <Reveal stagger={0.08} className="grid gap-6 sm:grid-cols-2">
            {site.projects.map((p) => (
              <a
                key={p.slug}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="brut press group flex flex-col gap-4 bg-surface p-6 no-underline md:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className={`inline-block h-3.5 w-3.5 border-2 border-ink ${ACCENT_BG[p.accent] ?? 'bg-ink'}`}
                    />
                    <span className="font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-ink-muted">
                      {p.language}
                    </span>
                  </div>
                  {p.wip ? (
                    <span className="shrink-0 border-2 border-ink bg-brand-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-on-accent">
                      {t('wip')}
                    </span>
                  ) : null}
                </div>

                <h3 className="text-[22px] font-bold leading-[1.05] tracking-[-0.02em] md:text-[26px]">{p.name}</h3>
                <p className="text-[15px] leading-relaxed text-ink-muted">{p.summary[l]}</p>

                <ul className="mt-auto flex flex-wrap gap-2 pt-1">
                  {p.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border-2 border-ink/80 px-2 py-0.5 font-mono text-[11px] tracking-[0.04em] text-ink-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <span className="inline-flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-accent">
                  {t('viewOnGithub')}
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                    ↗
                  </span>
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>
    </article>
  );
}
