import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { site, isPending, unwrap } from '@/content/site';
import { PendingBadge } from '@/components/ui/PendingBadge';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return buildMetadata({ locale: locale as 'en' | 'es', title: `${t('title')} — Santiago Rivera`, description: t('lede'), path: '/about' });
}

const SOON = {
  es: 'Las entradas verificadas aparecerán aquí cuando el CV esté finalizado.',
  en: 'Verified entries will appear here once the CV is finalized.',
};

const CHIP = 'inline-flex items-center gap-2 border-2 border-ink bg-surface px-3 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] shadow-brut-sm';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const l = locale as 'en' | 'es';

  const experience = unwrap(site.experience);
  const education = unwrap(site.education);
  const certifications = unwrap(site.certifications);
  const credly = unwrap(site.social.credly);
  const expPending = isPending(site.experience);
  const eduPending = isPending(site.education);
  const portrait = unwrap(site.person.portrait);
  const portraitPending = isPending(site.person.portrait);

  return (
    <article>
      <header className="container-x grid gap-10 py-16 md:grid-cols-[1fr_320px] md:items-start md:gap-16 md:py-24">
        <div>
          <div className={CHIP}>
            <span className="dot" />
            {t('title')}
          </div>
          <h1 className="mt-6 max-w-[22ch] text-[clamp(2.1rem,5vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.02em]">
            {t('lede')}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={unwrap(site.contact.cv)} download variant="primary">
              {t('downloadCv')}
            </ButtonLink>
            {isPending(site.contact.cv) ? <PendingBadge /> : null}
          </div>
        </div>

        <div className="brut aspect-[4/5] w-full max-w-[320px] overflow-hidden bg-canvas-sunken">
          {portraitPending ? (
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <span className="label text-ink-subtle">Retrato · Portrait</span>
              <PendingBadge />
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={portrait} alt={site.person.portraitAlt[l]} className="h-full w-full object-cover" />
          )}
        </div>
      </header>

      <section className="border-t-[3px] border-ink">
        <Reveal stagger={0.08} className="container-x grid gap-6 py-14 md:grid-cols-2">
          <div className="brut bg-surface p-6 md:p-8">
            <p className="label mb-3 text-ink-subtle">{t('focusHeading')}</p>
            <p className="text-[16px] leading-relaxed text-ink-muted">{t('focusBody')}</p>
          </div>
          <div className="brut bg-surface p-6 md:p-8">
            <p className="label mb-3 text-ink-subtle">{t('approachHeading')}</p>
            <p className="text-[16px] leading-relaxed text-ink-muted">{t('approachBody')}</p>
          </div>
        </Reveal>
      </section>

      <section className="border-t-[3px] border-ink">
        <div className="container-x py-16 md:py-20">
          <h2 className={CHIP}>
            <span className="dot" />
            {t('directaHeading')}
          </h2>
          <p className="mt-6 max-w-[28ch] text-2xl font-bold leading-[1.15] tracking-[-0.02em] md:text-4xl">
            {t('directaBody')}{' '}
            <a href="https://directa.mx" target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">
              directa.mx →
            </a>
          </p>
        </div>
      </section>

      <section className="border-t-[3px] border-ink">
        <div className="container-x py-16 md:py-20">
          <h2 className={CHIP}>
            <span className="dot" />
            {t('experienceHeading')}
          </h2>
          {expPending || experience.length === 0 ? (
            <div className="brut mt-6 flex max-w-2xl items-center gap-3 bg-surface p-5 text-ink-muted">
              <PendingBadge />
              <span>{SOON[l]}</span>
            </div>
          ) : (
            <ul className="mt-8 grid gap-5">
              {experience.map((exp, i) => (
                <li key={i} className="brut grid gap-3 bg-surface p-6 md:grid-cols-[160px_1fr] md:gap-8">
                  <span className="label text-ink-subtle">{exp.period[l]}</span>
                  <div>
                    <h3 className="text-xl font-bold tracking-[-0.01em]">{exp.role[l]}</h3>
                    <p className="label mt-1 text-ink-muted">{exp.org}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{exp.summary[l]}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="border-t-[3px] border-ink">
        <div className="container-x py-16 md:py-20">
          <h2 className={CHIP}>
            <span className="dot" />
            {t('educationHeading')}
          </h2>
          {eduPending || education.length === 0 ? (
            <div className="brut mt-6 flex max-w-2xl items-center gap-3 bg-surface p-5 text-ink-muted">
              <PendingBadge />
              <span>{SOON[l]}</span>
            </div>
          ) : (
            <ul className="mt-8 grid gap-5">
              {education.map((ed, i) => (
                <li key={i} className="brut grid gap-3 bg-surface p-6 md:grid-cols-[160px_1fr] md:gap-8">
                  <span className="label text-ink-subtle">{ed.period[l]}</span>
                  <div>
                    <h3 className="text-lg font-bold">{ed.degree[l]}</h3>
                    <p className="label mt-1 text-ink-muted">{ed.org}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="border-t-[3px] border-ink">
        <div className="container-x py-16 md:py-20">
          <h2 className={CHIP}>
            <span className="dot" />
            {t('certificationsHeading')}
          </h2>
          <ul className="mt-8 grid gap-5">
            {certifications.map((group) => (
              <li key={group.issuer} className="brut grid gap-4 bg-surface p-6 md:grid-cols-[160px_1fr] md:gap-8">
                <div>
                  <h3 className="text-lg font-bold">{group.issuer}</h3>
                  {group.period ? <p className="label mt-1 text-ink-subtle">{group.period}</p> : null}
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="inline-flex items-center gap-2 border-2 border-ink bg-canvas px-3 py-1.5 text-[13px] font-medium"
                    >
                      <span>{item.name}</span>
                      {item.year ? <span className="font-mono text-[11px] text-ink-subtle">{item.year}</span> : null}
                      {item.honors ? (
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                          ★ {t('honors')}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          {credly ? (
            <div className="mt-8">
              <ButtonLink href={credly} target="_blank" rel="noreferrer" variant="secondary">
                {t('viewOnCredly')}
              </ButtonLink>
            </div>
          ) : null}
        </div>
      </section>
    </article>
  );
}
