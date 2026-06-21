import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { site } from '@/content/site';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/LinkButton';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return buildMetadata({ locale: locale as 'en' | 'es', title: `${t('title')} — Santiago Rivera`, description: t('lede'), path: '/services' });
}

const NUM_COLORS = [
  'bg-brand-yellow text-on-accent',
  'bg-brand-blue text-white',
  'bg-brand-coral text-on-accent',
  'bg-brand-green text-on-accent',
];

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');
  const l = locale as 'en' | 'es';

  return (
    <article>
      <header className="container-x py-16 md:py-24">
        <div className="inline-flex items-center gap-2 border-2 border-ink bg-surface px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] shadow-brut-sm">
          <span className="dot" />
          {t('title')}
        </div>
        <h1 className="mt-6 max-w-[18ch] text-[clamp(2.4rem,6.5vw,5rem)] font-bold leading-[0.98] tracking-[-0.03em]">
          {t('lede')}
        </h1>
      </header>

      <section className="border-t-[3px] border-ink">
        <Reveal stagger={0.08} className="container-x grid gap-6 py-16 md:py-24">
          {site.services.map((s, i) => (
            <div key={s.id} className="brut grid gap-6 bg-surface p-6 md:grid-cols-[260px_1fr] md:gap-12 md:p-9">
              <div className="flex items-center gap-4 md:flex-col md:items-start">
                <span
                  className={`grid h-12 w-12 flex-none place-items-center border-[3px] border-ink font-mono text-lg font-bold ${NUM_COLORS[i]}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="text-2xl font-bold tracking-[-0.02em] md:mt-5 md:text-3xl">{s.title[l]}</h2>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <p className="label mb-1.5 text-ink-subtle">{t('problem')}</p>
                  <p className="text-[15px] leading-relaxed text-ink-muted">{s.problem[l]}</p>
                </div>
                <div>
                  <p className="label mb-1.5 text-ink-subtle">{t('deliverable')}</p>
                  <p className="text-[15px] leading-relaxed text-ink-muted">{s.deliverable[l]}</p>
                </div>
                <div>
                  <p className="label mb-1.5 text-ink-subtle">{t('outcome')}</p>
                  <p className="text-[15px] font-bold leading-relaxed">{s.outcome[l]}</p>
                </div>
                <LinkButton href="/contact" variant="accent" className="mt-1 self-start">
                  {t('cta')}
                </LinkButton>
              </div>
            </div>
          ))}
        </Reveal>
      </section>
    </article>
  );
}
