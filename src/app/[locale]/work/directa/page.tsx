import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { directa } from '@/content/directa';
import { PendingBadge } from '@/components/ui/PendingBadge';
import { ButtonLink } from '@/components/ui/Button';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale: locale as 'en' | 'es',
    title: `Directa — Case study — Santiago Rivera`,
    description: directa.context.value[locale as 'en' | 'es'],
    path: '/work/directa',
  });
}

const block = (
  label: string,
  data: { value: { en: string; es: string }; pending?: boolean },
  l: 'en' | 'es',
) => (
  <section className="border-t border-line/10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
    <p className="label text-ink-subtle md:col-span-3">
      {label}
      {data.pending ? <PendingBadge /> : null}
    </p>
    <p className="md:col-span-9 display text-2xl md:text-4xl tracking-snug leading-[1.15] max-w-3xl">
      {data.value[l]}
    </p>
  </section>
);

export default async function DirectaCase({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('directa');
  const tw = await getTranslations('work');
  const l = locale as 'en' | 'es';

  return (
    <article className="pt-40 pb-24">
      <header className="container-x">
        <p className="eyebrow mb-8">{t('eyebrow')}</p>
        <h1 className="display text-[clamp(4rem,14vw,16rem)] leading-[0.85] tracking-tightest">
          Directa
        </h1>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="label text-ink-subtle mb-1">{tw('year')}</p>
            <p>
              {directa.year.value[l]}
              {directa.year.pending ? <PendingBadge /> : null}
            </p>
          </div>
          <div className="md:col-span-5">
            <p className="label text-ink-subtle mb-1">{t('role')}</p>
            <p>
              {directa.role.value[l]}
              {directa.role.pending ? <PendingBadge /> : null}
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <ButtonLink href={directa.url} target="_blank" rel="noreferrer" variant="ghost">
              {t('visit')}
            </ButtonLink>
          </div>
        </div>
      </header>

      <section className="container-x mt-20">
        <div className="aspect-[16/9] w-full bg-canvas-sunken flex items-center justify-center">
          {directa.media.cover.pending ? (
            <div className="flex flex-col items-center gap-3">
              <p className="label text-ink-subtle">Cover image</p>
              <PendingBadge />
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={directa.media.cover.value}
              alt="Directa — cover"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </section>

      <div className="container-x mt-20">
        {block(t('context'), directa.context, l)}
        {block(t('problem'), directa.problem, l)}
        {block(t('strategy'), directa.strategy, l)}
        {block(t('implementation'), directa.implementation, l)}
        {block(t('design'), directa.design, l)}

        <section className="border-t border-line/10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <p className="label text-ink-subtle md:col-span-3">{t('features')}</p>
          <ul className="md:col-span-9 space-y-3">
            {directa.features.map((f, i) => (
              <li key={i} className="text-xl md:text-2xl flex gap-4 items-baseline">
                <span className="label text-ink-subtle">0{i + 1}</span>
                <span>
                  {f.value[l]}
                  {f.pending ? <PendingBadge /> : null}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-line/10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <p className="label text-ink-subtle md:col-span-3">Gallery</p>
          <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
            {directa.media.gallery.map((g, i) => (
              <div key={i} className="aspect-[4/3] bg-canvas-sunken flex items-center justify-center">
                {g.pending ? (
                  <div className="flex flex-col items-center gap-2">
                    <p className="label text-ink-subtle">0{i + 1}</p>
                    <PendingBadge />
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={g.value} alt={`Directa — 0${i + 1}`} className="h-full w-full object-cover" />
                )}
              </div>
            ))}
          </div>
        </section>

        {block(t('outcome'), directa.outcome, l)}
      </div>

      <section className="container-x mt-20">
        <ButtonLink href={directa.url} target="_blank" rel="noreferrer" variant="primary">
          {t('visit')}
        </ButtonLink>
      </section>
    </article>
  );
}
