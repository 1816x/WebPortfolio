import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { site } from '@/content/site';
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
    <article className="container-x pt-40 pb-24">
      <p className="eyebrow mb-8">{t('title')}</p>
      <h1 className="display text-[clamp(3rem,8vw,7rem)] leading-[1] tracking-tightest max-w-5xl">
        {t('lede')}
      </h1>

      <ul className="mt-24 rule">
        {site.work.map((project, idx) => (
          <li key={project.slug} className="border-b border-line/10 py-12 md:py-16">
            <Link
              href={project.slug === 'directa' ? '/work/directa' : '/work'}
              className="group grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end"
            >
              <span className="label text-ink-subtle md:col-span-1">0{idx + 1}</span>
              <div className="md:col-span-7">
                <p className="display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tightest group-hover:italic group-hover:text-accent transition-all duration-500">
                  {project.name}
                </p>
                <p className="mt-4 text-ink-muted text-lg max-w-xl">{project.summary[l]}</p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <p className="label text-ink-subtle">{t('year')}</p>
                <p className="text-ink mt-1">{project.year.value}</p>
                <p className="label text-ink-subtle mt-4">{project.tags.join(' · ')}</p>
                <p className="label mt-4 text-ink group-hover:text-accent transition-colors">
                  {t('viewCase')} →
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
