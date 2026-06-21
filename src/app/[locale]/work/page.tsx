import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { site } from '@/content/site';
import { Reveal } from '@/components/ui/Reveal';
import { PendingBadge } from '@/components/ui/PendingBadge';
import { buildMetadata } from '@/lib/seo';

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
    </article>
  );
}
