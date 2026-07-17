import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { directa } from '@/content/directa';
import { PendingBadge } from '@/components/ui/PendingBadge';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'directa' });
  return buildMetadata({
    locale: locale as 'en' | 'es',
    title: `Directa — ${t('eyebrow')} — Santiago Rivera`,
    description: directa.context.value[locale as 'en' | 'es'],
    path: '/work/directa',
  });
}

const CHIP =
  'inline-flex h-fit items-center gap-2 self-start border-2 border-ink bg-surface px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] shadow-brut-sm';

function Block({
  label,
  data,
  l,
}: {
  label: string;
  data: { value: { en: string; es: string }; pending?: boolean };
  l: 'en' | 'es';
}) {
  return (
    <section className="border-t-[3px] border-ink">
      <Reveal className="container-x grid gap-6 py-12 md:grid-cols-[220px_1fr] md:gap-12 md:py-16">
        <div className={CHIP}>
          <span className="dot" />
          {label}
          {data.pending ? <PendingBadge /> : null}
        </div>
        <p className="max-w-[30ch] text-2xl font-bold leading-[1.15] tracking-[-0.02em] md:text-3xl">{data.value[l]}</p>
      </Reveal>
    </section>
  );
}

export default async function DirectaCase({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('directa');
  const tw = await getTranslations('work');
  const l = locale as 'en' | 'es';

  return (
    <article>
      <header className="border-b-[3px] border-ink">
        <div className="container-x py-16 md:py-24">
          <div className={CHIP}>
            <span className="dot" />
            {t('eyebrow')}
          </div>
          <h1 className="mt-6 text-[clamp(3.5rem,14vw,11rem)] font-bold leading-[0.82] tracking-[-0.04em]">Directa</h1>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="brut bg-surface p-5">
              <p className="label mb-1.5 text-ink-subtle">{tw('year')}</p>
              <p className="font-bold">
                {directa.year.value[l]}
                {directa.year.pending ? <PendingBadge /> : null}
              </p>
            </div>
            <div className="brut bg-surface p-5 md:col-span-2">
              <p className="label mb-1.5 text-ink-subtle">{t('role')}</p>
              <p className="font-bold">
                {directa.role.value[l]}
                {directa.role.pending ? <PendingBadge /> : null}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <ButtonLink href={directa.url} target="_blank" rel="noreferrer" variant="accent">
              {t('visit')}
            </ButtonLink>
          </div>
        </div>
      </header>

      {/* Cover */}
      <section className="border-t-[3px] border-ink">
        <div className="container-x py-12 md:py-16">
          <div className="brut aspect-[16/9] w-full overflow-hidden bg-canvas-sunken">
            {directa.media.cover.pending ? (
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <span className="label text-ink-subtle">Cover · 16:9</span>
                <PendingBadge />
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={directa.media.cover.value} alt="Directa — cover" className="h-full w-full object-cover" />
            )}
          </div>
        </div>
      </section>

      <Block label={t('context')} data={directa.context} l={l} />
      <Block label={t('problem')} data={directa.problem} l={l} />
      <Block label={t('strategy')} data={directa.strategy} l={l} />
      <Block label={t('implementation')} data={directa.implementation} l={l} />
      <Block label={t('design')} data={directa.design} l={l} />

      {/* Features */}
      <section className="border-t-[3px] border-ink">
        <div className="container-x grid gap-6 py-12 md:grid-cols-[220px_1fr] md:gap-12 md:py-16">
          <div className={CHIP}>
            <span className="dot" />
            {t('features')}
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {directa.features.map((f, i) => (
              <li key={i} className="brut flex items-start gap-3 bg-surface p-4">
                <span className="font-mono text-[12px] font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[15px] font-medium">
                  {f.value[l]}
                  {f.pending ? <PendingBadge /> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t-[3px] border-ink">
        <div className="container-x grid gap-6 py-12 md:grid-cols-[220px_1fr] md:gap-12 md:py-16">
          <div className={CHIP}>
            <span className="dot" />
            {t('gallery')}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {directa.media.gallery.map((g, i) => (
              <div key={i} className="brut aspect-[4/3] overflow-hidden bg-canvas-sunken">
                {g.pending ? (
                  <div className="flex h-full flex-col items-center justify-center gap-2">
                    <span className="label text-ink-subtle">{String(i + 1).padStart(2, '0')} · 4:3</span>
                    <PendingBadge />
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={g.value} alt={`Directa — 0${i + 1}`} className="h-full w-full object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Block label={t('outcome')} data={directa.outcome} l={l} />

      <section className="border-t-[3px] border-ink">
        <div className="container-x py-14 md:py-20">
          <ButtonLink href={directa.url} target="_blank" rel="noreferrer" variant="primary">
            {t('visit')}
          </ButtonLink>
        </div>
      </section>
    </article>
  );
}
