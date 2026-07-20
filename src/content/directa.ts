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

const ok = <T,>(value: T): PendingBlock<T> => ({ value, pending: false });

export const directa = {
  slug: 'directa',
  name: 'Directa',
  url: 'https://directa.mx',
  year: ok<LocaleStr>({ en: '2025 — present', es: '2025 — presente' }),
  role: ok<LocaleStr>({
    en: 'Founder & full-stack engineer',
    es: 'Fundador e ingeniero full-stack',
  }),

  context: ok<LocaleStr>({
    en: 'Directa is the digital agency Santiago founded and runs. It packages the work he already does — websites, e-commerce and automation — into a single team a business can hire for its whole digital presence, instead of coordinating a separate designer, developer and agency.',
    es: 'Directa es la agencia digital que Santiago fundó y dirige. Empaqueta el trabajo que ya hace — sitios web, e-commerce y automatización — en un solo equipo que un negocio puede contratar para toda su presencia digital, en lugar de coordinar por separado a un diseñador, un desarrollador y una agencia.',
  }),

  problem: ok<LocaleStr>({
    en: 'Small and mid-size businesses in Mexico need modern web infrastructure, but the market splits the work: agencies design, freelancers build, template shops hand over something the owner still has to finish. Few deliver a site that is ready to operate and sell from day one.',
    es: 'Los negocios pequeños y medianos en México necesitan infraestructura web moderna, pero el mercado parte el trabajo: las agencias diseñan, los freelancers programan y las fábricas de plantillas entregan algo que el dueño todavía tiene que terminar. Pocos entregan un sitio listo para operar y vender desde el primer día.',
  }),

  strategy: ok<LocaleStr>({
    en: 'Position Directa as one team for the whole digital presence, sold by outcome rather than deliverable. Every engagement starts from the business goal — more bookings, more orders, more clients — and ends with a system the owner can actually run.',
    es: 'Posicionar a Directa como un solo equipo para toda la presencia digital, vendido por resultado y no por entregable. Cada proyecto arranca desde la meta del negocio — más reservas, más pedidos, más clientes — y termina con un sistema que el dueño realmente puede operar.',
  }),

  implementation: ok<LocaleStr>({
    en: 'Built on a modern, maintainable stack — TypeScript, Next.js, Tailwind and edge deploys — with e-commerce, SEO and workflow automation wired in per project. Santiago owns the full cycle: scoping, design direction, development, deployment and ongoing maintenance.',
    es: 'Construido sobre un stack moderno y mantenible — TypeScript, Next.js, Tailwind y despliegues en el edge — con e-commerce, SEO y automatización de flujos integrados según cada proyecto. Santiago es dueño del ciclo completo: alcance, dirección de diseño, desarrollo, despliegue y mantenimiento.',
  }),

  design: ok<LocaleStr>({
    en: 'A bold, high-contrast brand voice — "built to sell more" — that stays legible and fast. Direct typography, clear hierarchy and restrained motion, deliberately avoiding the over-decorated agency look common in the local market.',
    es: 'Una voz de marca directa y de alto contraste — "built to sell more" — que se mantiene legible y rápida. Tipografía directa, jerarquía clara y motion contenido, evitando a propósito el look sobrecargado de agencia común en el mercado local.',
  }),

  features: [
    ok<LocaleStr>({ en: 'Websites & e-commerce built to convert', es: 'Sitios web y e-commerce hechos para convertir' }),
    ok<LocaleStr>({ en: 'Brand, SEO and blog content', es: 'Marca, SEO y contenido de blog' }),
    ok<LocaleStr>({ en: 'Bilingual (ES / EN) content infrastructure', es: 'Infraestructura de contenido bilingüe (ES / EN)' }),
    ok<LocaleStr>({ en: 'Client portal + book-a-call intake', es: 'Portal de cliente y captación con reserva de llamada' }),
  ],

  outcome: ok<LocaleStr>({
    en: 'A live business identity that Santiago runs as the front door for new client work. Operational metrics are not published for now.',
    es: 'Una identidad de negocio activa que Santiago opera como la puerta de entrada para nuevos proyectos. Las métricas operativas no se publican por ahora.',
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
