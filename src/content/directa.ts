/**
 * Directa case study content.
 *
 * Copy is grounded in the live site (directa.mx) and Santiago's verified
 * background — no invented clients, prices or metrics. Wrap any field whose
 * content is not yet confirmed with `todo(...)`; confirmed fields use `ok(...)`
 * and render without a "pending" badge.
 */

export type LocaleStr = { en: string; es: string };
export type PendingBlock<T = LocaleStr> = { value: T; pending?: boolean };

const ok = <T>(value: T): PendingBlock<T> => ({ value, pending: false });

export const directa = {
  slug: 'directa',
  name: 'Directa',
  url: 'https://directa.mx',
  year: ok<LocaleStr>({ en: '2025 — present', es: '2025 — presente' }),
  role: ok<LocaleStr>({
    en: 'Self-initiated project · design direction and development',
    es: 'Proyecto propio · dirección de diseño y desarrollo',
  }),

  context: ok<LocaleStr>({
    en: 'Directa is Santiago’s own studio. This project documents the creation of its commercial presence and website while the studio begins business development.',
    es: 'Directa es el estudio propio de Santiago. Este proyecto documenta la creación de su presencia comercial y su sitio mientras el estudio comienza su desarrollo comercial.',
  }),

  problem: ok<LocaleStr>({
    en: 'The new studio needed a clear identity and a public place to explain its services, answer basic questions and open a conversation with prospective clients.',
    es: 'El nuevo estudio necesitaba una identidad clara y un espacio público para explicar sus servicios, responder preguntas básicas y abrir conversaciones con posibles clientes.',
  }),

  strategy: ok<LocaleStr>({
    en: 'Organize the offer around concrete services and a direct contact path. Santiago leads the studio and personally handles its technical work.',
    es: 'Organizar la oferta alrededor de servicios concretos y una vía directa de contacto. Santiago dirige el estudio y atiende personalmente su parte técnica.',
  }),

  implementation: ok<LocaleStr>({
    en: 'Santiago directed the design, implemented the site and structured its content. The published site includes Spanish and English pages, localized navigation, service pages and a route to schedule a conversation.',
    es: 'Santiago dirigió el diseño, implementó el sitio y estructuró su contenido. El sitio publicado incluye páginas en español e inglés, navegación localizada, páginas de servicios y una vía para agendar una conversación.',
  }),

  design: ok<LocaleStr>({
    en: 'The visual system uses direct typography, clear hierarchy and restrained motion to make the offer and next step easy to scan.',
    es: 'El sistema visual usa tipografía directa, jerarquía clara y movimiento contenido para facilitar la lectura de la oferta y el siguiente paso.',
  }),

  features: [
    ok<LocaleStr>({
      en: 'Localized Spanish and English pages',
      es: 'Páginas localizadas en español e inglés',
    }),
    ok<LocaleStr>({
      en: 'Navigation and dedicated service pages',
      es: 'Navegación y páginas dedicadas de servicios',
    }),
    ok<LocaleStr>({
      en: 'Structured studio and service content',
      es: 'Contenido estructurado del estudio y sus servicios',
    }),
    ok<LocaleStr>({ en: 'A direct scheduling path', es: 'Una vía directa para agendar' }),
  ],

  outcome: ok<LocaleStr>({
    en: 'The site is published and the studio is in the business-development stage. This case documents the brand and website, not client results.',
    es: 'El sitio está publicado y el estudio se encuentra en etapa de desarrollo comercial. Este caso documenta la marca y el sitio, no resultados de clientes.',
  }),

  /** Media — real captures of directa.mx (cover + gallery), in /public/work/directa/. */
  media: {
    cover: ok('/work/directa/cover.png'),
    gallery: [
      ok('/work/directa/01.png'),
      ok('/work/directa/02.png'),
      ok('/work/directa/03.png'),
      ok('/work/directa/04.png'),
    ],
  },
} as const;
