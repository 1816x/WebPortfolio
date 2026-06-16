/**
 * Directa case study content.
 *
 * Only the live URL is treated as verified — everything else is marked as
 * pending until Santiago confirms the source material. Replace the values
 * (and remove `pending: true`) once each block is verified.
 */

export type LocaleStr = { en: string; es: string };
export type PendingBlock<T = LocaleStr> = { value: T; pending?: boolean };

const todo = <T,>(value: T): PendingBlock<T> => ({ value, pending: true });

export const directa = {
  slug: 'directa',
  name: 'Directa',
  url: 'https://directa.mx',
  year: todo<LocaleStr>({ en: '2024 — present', es: '2024 — presente' }),
  role: todo<LocaleStr>({
    en: 'Founder, product designer and lead developer',
    es: 'Fundador, diseñador de producto y desarrollador principal',
  }),

  context: todo<LocaleStr>({
    en: 'Directa is the services studio Santiago runs. It packages the work he already does — web products, automation, AI integration — under a single brand for Spanish-speaking clients.',
    es: 'Directa es el estudio de servicios que dirige Santiago. Empaqueta el trabajo que ya hace — productos web, automatización, integración de IA — bajo una misma marca para clientes hispanohablantes.',
  }),

  problem: todo<LocaleStr>({
    en: 'Small and mid-size operators in Mexico need modern web infrastructure but rarely find one team that can both design and ship it. Agencies design. Freelancers build. Few do both with the same standard.',
    es: 'Operadores pequeños y medianos en México necesitan infraestructura web moderna, pero rara vez encuentran un solo equipo que diseñe y construya con el mismo estándar.',
  }),

  strategy: todo<LocaleStr>({
    en: 'Position Directa around outcomes rather than deliverables. Each engagement starts with the business problem, ends with a system the client can operate, and stays small enough to ship fast.',
    es: 'Posicionar a Directa por resultados, no por entregables. Cada proyecto arranca con el problema del negocio, termina con un sistema que el cliente puede operar y se mantiene compacto para entregar rápido.',
  }),

  implementation: todo<LocaleStr>({
    en: 'Built on a modern web stack: Next.js, Tailwind, edge deploys, with custom integrations into CRM, email and AI workflows as projects require.',
    es: 'Construido sobre un stack web moderno: Next.js, Tailwind, despliegues en el edge, con integraciones a medida con CRM, correo y flujos de IA según lo que cada proyecto requiera.',
  }),

  design: todo<LocaleStr>({
    en: 'Direct typography, generous whitespace, restrained motion. The brand visibly avoids the over-decorated agency look common in the local market.',
    es: 'Tipografía directa, generosos espacios en blanco, motion contenido. La marca evita visiblemente el look sobrecargado de agencia común en el mercado local.',
  }),

  features: [
    todo<LocaleStr>({ en: 'Service-led marketing site', es: 'Sitio de marketing orientado a servicios' }),
    todo<LocaleStr>({ en: 'Bilingual content infrastructure', es: 'Infraestructura de contenido bilingüe' }),
    todo<LocaleStr>({ en: 'Editorial case-study layouts', es: 'Layouts editoriales para casos de estudio' }),
    todo<LocaleStr>({ en: 'Contact and intake flows', es: 'Flujos de contacto y captación' }),
  ],

  outcome: todo<LocaleStr>({
    en: 'A live business identity Santiago uses as the front door for new client work. Operational metrics are intentionally not published.',
    es: 'Una identidad de negocio activa que Santiago usa como puerta de entrada para nuevos proyectos. Las métricas operativas no se publican intencionalmente.',
  }),

  /** Media — replace these paths once screenshots are dropped in /public/work/directa/ */
  media: {
    cover: todo('/work/directa/cover.jpg'),
    gallery: [
      todo('/work/directa/01.jpg'),
      todo('/work/directa/02.jpg'),
      todo('/work/directa/03.jpg'),
    ],
  },
} as const;
