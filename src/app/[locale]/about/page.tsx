import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { site, isPending, unwrap } from '@/content/site';
import { PendingBadge } from '@/components/ui/PendingBadge';
import { ButtonLink } from '@/components/ui/Button';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return buildMetadata({ locale: locale as 'en' | 'es', title: `${t('title')} — Santiago Rivera`, description: t('lede'), path: '/about' });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const l = locale as 'en' | 'es';
  const experience = unwrap(site.experience);
  const education = unwrap(site.education);
  const expPending = isPending(site.experience);
  const eduPending = isPending(site.education);

  return (
    <article className="container-x pt-40 pb-24">
      <p className="eyebrow mb-8">{t('title')}</p>
      <h1 className="display text-[clamp(2.5rem,7vw,6rem)] leading-[1] tracking-tightest max-w-5xl">
        {t('lede')}
      </h1>

      <div className="mt-24 grid grid-cols-1 gap-16 md:grid-cols-12">
        <section className="md:col-span-6">
          <p className="eyebrow mb-4">{t('focusHeading')}</p>
          <p className="text-lg leading-relaxed text-ink-muted">{t('focusBody')}</p>
        </section>
        <section className="md:col-span-6">
          <p className="eyebrow mb-4">{t('approachHeading')}</p>
          <p className="text-lg leading-relaxed text-ink-muted">{t('approachBody')}</p>
        </section>
      </div>

      <section className="mt-24">
        <p className="eyebrow mb-4">{t('directaHeading')}</p>
        <p className="display text-3xl md:text-4xl tracking-snug max-w-3xl leading-tight">
          {t('directaBody')}{' '}
          <a href="https://directa.mx" target="_blank" rel="noreferrer" className="italic text-accent hover:underline">
            directa.mx →
          </a>
        </p>
      </section>

      <section className="mt-24 border-t border-line/10 pt-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="display text-3xl md:text-5xl tracking-snug">
            {t('experienceHeading')}
            {expPending ? <PendingBadge /> : null}
          </h2>
        </div>
        {expPending || experience.length === 0 ? (
          <p className="text-ink-muted max-w-2xl">
            Verified experience entries will appear here once the CV is finalized. They live in{' '}
            <code className="font-mono text-sm">src/content/site.ts</code>.
          </p>
        ) : (
          <ul className="rule">
            {experience.map((exp, i) => (
              <li key={i} className="grid grid-cols-12 gap-4 border-b border-line/10 py-8">
                <span className="label text-ink-subtle col-span-3">{exp.period}</span>
                <div className="col-span-9">
                  <p className="display text-2xl tracking-snug">{exp.role[l]}</p>
                  <p className="label text-ink-muted mt-1">{exp.org}</p>
                  <p className="mt-3 text-ink-muted max-w-2xl">{exp.summary[l]}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-24 border-t border-line/10 pt-16">
        <h2 className="display text-3xl md:text-5xl tracking-snug mb-10">
          {t('educationHeading')}
          {eduPending ? <PendingBadge /> : null}
        </h2>
        {eduPending || education.length === 0 ? (
          <p className="text-ink-muted max-w-2xl">
            Education entries will appear here once verified.
          </p>
        ) : (
          <ul className="rule">
            {education.map((ed, i) => (
              <li key={i} className="grid grid-cols-12 gap-4 border-b border-line/10 py-6">
                <span className="label text-ink-subtle col-span-3">{ed.period}</span>
                <div className="col-span-9">
                  <p className="text-lg">{ed.degree[l]}</p>
                  <p className="label text-ink-muted mt-1">{ed.org}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-16">
        <ButtonLink href={unwrap(site.contact.cv)} download variant="primary">
          {t('downloadCv')} {isPending(site.contact.cv) ? <PendingBadge /> : null}
        </ButtonLink>
      </div>
    </article>
  );
}
