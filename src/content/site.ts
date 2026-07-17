/**
 * Central source of truth for everything editable on the site.
 *
 * Anything marked `pending: true` is a placeholder waiting on verified content.
 * Replace the value and flip `pending` to `false` (or remove the wrapper) once
 * confirmed. The UI surfaces a small "pending" badge for any pending field so
 * unverified claims never ship silently.
 *
 * Do NOT hardcode the same content across multiple components — import from
 * here.
 */

type Pending<T> = { value: T; pending?: boolean; note?: string };
const ok = <T>(value: T): Pending<T> => ({ value, pending: false });
const todo = <T>(value: T, note?: string): Pending<T> => ({ value, pending: true, note });

export const site = {
  /** Domain used for canonical URLs, OpenGraph, sitemap and JSON-LD. */
  url: 'https://santiagorivera.com',

  person: {
    name: 'Santiago Rivera',
    /** Concise, evidence-based positioning. Adjust once CV is finalized. */
    role: {
      en: todo('Software developer building web products, automation and AI systems'),
      es: todo('Desarrollador de software construyendo productos web, automatización y sistemas de IA'),
    },
    location: ok({ en: 'San Pedro Garza García, MX', es: 'San Pedro Garza García, MX' }),
    /** Path to the portrait. Replace with the real headshot. */
    portrait: todo('/portrait/santiago.jpg', 'Drop the headshot in /public/portrait/'),
    portraitAlt: {
      en: 'Portrait of Santiago Rivera',
      es: 'Retrato de Santiago Rivera',
    },
  },

  /** Resolved contact channels. Anything pending shows a "pending" badge in the UI. */
  contact: {
    email: ok('saitiago@protonmail.com'),
    /** WhatsApp number in international format, digits only, no plus. */
    whatsapp: ok('528187996456'),
    linkedin: ok('https://www.linkedin.com/in/santiagoxriv/'),
    /** Calendar booking link (Cal.com, Calendly, etc.). */
    calendar: ok('https://calendly.com/saitiago/30min'),
    /** Path to the downloadable CV PDF inside /public/. */
    cv: ok('/cv/santiago-rivera-cv.pdf'),
  },

  /** Social handles for footer / metadata. */
  social: {
    linkedin: ok('https://www.linkedin.com/in/santiagoxriv/'),
    github: ok('https://github.com/1816x'),
    x: todo('', 'Optional — leave empty to hide'),
  },

  /**
   * Services. Each service is described by the problem it solves, the deliverable
   * and the practical outcome. No prices, no inflated claims.
   */
  services: [
    {
      id: 'web-products',
      icon: 'product',
      title: { en: 'Web products', es: 'Productos web' },
      problem: {
        en: 'Marketing and product teams need fast, reliable sites that read as part of the brand, not a template.',
        es: 'Los equipos de marketing y producto necesitan sitios rápidos y fiables que se lean como parte de la marca, no como una plantilla.',
      },
      deliverable: {
        en: 'Production-ready Next.js sites with custom design systems, i18n, analytics and CMS integration when needed.',
        es: 'Sitios Next.js listos para producción, con sistemas de diseño a medida, i18n, analítica e integración de CMS cuando se requiera.',
      },
      outcome: {
        en: 'A site you can extend without rebuilding it.',
        es: 'Un sitio que puedes extender sin tener que reconstruirlo.',
      },
    },
    {
      id: 'automation',
      icon: 'automation',
      title: { en: 'Automation', es: 'Automatización' },
      problem: {
        en: 'Operations stall on repeated manual work between tools that do not talk to each other.',
        es: 'Las operaciones se atascan en trabajo manual repetido entre herramientas que no se comunican.',
      },
      deliverable: {
        en: 'Internal workflows wiring CRM, email, sheets and APIs into a single, observable pipeline.',
        es: 'Flujos internos que conectan CRM, correo, hojas y APIs en un único pipeline observable.',
      },
      outcome: {
        en: 'Hours of manual work removed every week.',
        es: 'Horas de trabajo manual eliminadas cada semana.',
      },
    },
    {
      id: 'ai',
      icon: 'ai',
      title: { en: 'AI systems', es: 'Sistemas de IA' },
      problem: {
        en: 'Generic LLM wrappers do not survive contact with real business data or real users.',
        es: 'Las envolturas genéricas de LLMs no sobreviven al contacto con datos reales ni con usuarios reales.',
      },
      deliverable: {
        en: 'Focused AI features — retrieval, classification, drafting, support — built around the model and the data, not the hype.',
        es: 'Funcionalidades de IA enfocadas — recuperación, clasificación, redacción, soporte — construidas alrededor del modelo y los datos, no del hype.',
      },
      outcome: {
        en: 'Workflows that actually use AI in production.',
        es: 'Flujos que realmente usan IA en producción.',
      },
    },
    {
      id: 'consulting',
      icon: 'consulting',
      title: { en: 'Technical consulting', es: 'Consultoría técnica' },
      problem: {
        en: 'A team needs an outside read on stack choices, architecture or a stuck project.',
        es: 'Un equipo necesita una lectura externa sobre decisiones de stack, arquitectura o un proyecto atascado.',
      },
      deliverable: {
        en: 'A short engagement: audit, written recommendations, and a path forward your team can execute.',
        es: 'Un trabajo corto: auditoría, recomendaciones escritas y un camino claro que tu equipo pueda ejecutar.',
      },
      outcome: {
        en: 'Clarity, with the receipts to act on it.',
        es: 'Claridad, con los argumentos para actuar.',
      },
    },
  ],

  /**
   * Capabilities — grouped by function, not an icon wall.
   * Add or remove technologies only when verified.
   */
  capabilities: [
    {
      id: 'product',
      title: { en: 'Product & front end', es: 'Producto y front end' },
      items: ['TypeScript', 'React', 'Next.js', 'Tailwind', 'Three.js / R3F', 'GSAP', 'Framer Motion'],
    },
    {
      id: 'backend',
      title: { en: 'Back end & data', es: 'Back end y datos' },
      items: ['Node.js', 'PostgreSQL', 'Supabase', 'REST & GraphQL', 'Edge functions'],
    },
    {
      id: 'ai-automation',
      title: { en: 'AI & automation', es: 'IA y automatización' },
      items: ['LLM integration', 'RAG', 'Prompt engineering', 'n8n / Make', 'Internal tooling'],
    },
    {
      id: 'cloud',
      title: { en: 'Cloud & deployment', es: 'Cloud y despliegue' },
      items: ['Vercel', 'Cloudflare', 'GitHub Actions', 'Observability'],
    },
    {
      id: 'design',
      title: { en: 'Design & prototyping', es: 'Diseño y prototipado' },
      items: ['Figma', 'Design systems', 'Motion design', 'Editorial layout'],
    },
  ],

  /** Featured work. Add new case studies here — layout adapts automatically. */
  work: [
    {
      slug: 'directa',
      featured: true,
      name: 'Directa',
      year: { value: '2024 — present', pending: true },
      url: 'https://directa.mx',
      summary: {
        en: 'Founder-led services studio: web, automation and AI for Mexican businesses.',
        es: 'Estudio de servicios fundado por Santiago: web, automatización e IA para empresas mexicanas.',
      },
      tags: ['Founder', 'Web', 'Automation', 'AI'],
    },
  ],

  /**
   * Public GitHub projects — personal work and experiments, shown on the Work
   * page as external links (no case-study page). Copy is derived from each
   * repo's own description, so it is verified, not pending. Add or remove
   * entries here; the Work page grid adapts automatically. Only list PUBLIC
   * repositories — private ones must not be surfaced.
   *
   * `accent` picks the language-swatch / highlight colour from the palette
   * ('blue' | 'coral' | 'green' | 'yellow'). `wip` flags an early-phase repo.
   */
  projects: [
    {
      slug: 'vuln-triage',
      name: 'Vulnerability Triage Agent',
      repo: '1816x/Vulnerability-Triage-Agent',
      url: 'https://github.com/1816x/Vulnerability-Triage-Agent',
      year: '2026',
      language: 'Python · Rust',
      accent: 'coral',
      wip: false,
      summary: {
        en: 'Reachability-aware CVE prioritizer: it works out which vulnerabilities are actually reachable from your code, and drafts the GitHub issue for the ones that matter.',
        es: 'Priorizador de CVEs consciente de la accesibilidad: determina qué vulnerabilidades son realmente alcanzables desde tu código y redacta el issue de GitHub para las que importan.',
      },
      tags: ['Python', 'Security', 'Static analysis', 'LLM agent', 'Tree-sitter'],
    },
    {
      slug: 'edge-predict',
      name: 'Edge Predict Model',
      repo: '1816x/Edge-Predict-Model',
      url: 'https://github.com/1816x/Edge-Predict-Model',
      year: '2026',
      language: 'Python',
      accent: 'green',
      wip: false,
      summary: {
        en: 'Quantitative sports-betting decision support: calibrated probabilities against no-vig market odds, expected-value detection, fractional-Kelly sizing and fully auditable picks.',
        es: 'Soporte de decisión cuantitativo para apuestas deportivas: probabilidades calibradas frente a cuotas sin vig, detección de valor esperado, sizing por Kelly fraccional y selecciones totalmente auditables.',
      },
      tags: ['Python', 'Calibration', 'Kelly criterion', 'Expected value', 'PostgreSQL'],
    },
    {
      slug: 'microstructure',
      name: 'Trading Microstructure Engine',
      repo: '1816x/Trading-Microstructure-Engine',
      url: 'https://github.com/1816x/Trading-Microstructure-Engine',
      year: '2026',
      language: 'Rust · Python',
      accent: 'blue',
      wip: true,
      summary: {
        en: 'Tick-by-tick futures microstructure engine in Rust — order-flow imbalance computed over real tick data, exposed through a Python API layer.',
        es: 'Motor de microestructura de futuros tick a tick en Rust — desequilibrio de flujo de órdenes calculado sobre datos reales, expuesto mediante una capa de API en Python.',
      },
      tags: ['Rust', 'Python', 'Market microstructure', 'Order flow', 'FastAPI'],
    },
    {
      slug: 'web-portfolio',
      name: 'Web Portfolio',
      repo: '1816x/WebPortfolio',
      url: 'https://github.com/1816x/WebPortfolio',
      year: '2026',
      language: 'TypeScript',
      accent: 'yellow',
      wip: false,
      summary: {
        en: 'This site. A bilingual Next.js 15 portfolio with an editorial neo-brutalist design system, a custom GSAP motion layer and fully localized routing.',
        es: 'Este sitio. Un portafolio bilingüe en Next.js 15 con un sistema de diseño editorial neo-brutalista, una capa de motion propia con GSAP y ruteo totalmente localizado.',
      },
      tags: ['TypeScript', 'Next.js', 'next-intl', 'GSAP', 'Tailwind'],
    },
  ],

  /**
   * Experience — populate from the verified CV.
   * Until then, the Experience section renders a clear "pending" state.
   */
  experience: todo<
    Array<{
      role: { en: string; es: string };
      org: string;
      period: string;
      summary: { en: string; es: string };
    }>
  >([], 'Populate from CV when finalized'),

  education: todo<
    Array<{
      degree: { en: string; es: string };
      org: string;
      period: string;
    }>
  >([], 'Populate from CV when finalized'),

  /** Analytics hooks read from env vars; null if unset. */
  analytics: {
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || null,
    gaMeasurementId: /^G-[A-Z0-9]{4,15}$/.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '')
      ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!
      : null,
  },
} as const;

export function isPending<T>(field: T | Pending<T>): boolean {
  return typeof field === 'object' && field !== null && 'pending' in field && (field as Pending<T>).pending === true;
}

export function unwrap<T>(field: T | Pending<T>): T {
  if (typeof field === 'object' && field !== null && 'value' in field && 'pending' in field) {
    return (field as Pending<T>).value;
  }
  return field as T;
}
