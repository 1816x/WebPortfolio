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
      en: ok('Software developer and founder of Directa'),
      es: ok('Desarrollador de software y fundador de Directa'),
    },
    location: ok({ en: 'San Pedro Garza García, MX', es: 'San Pedro Garza García, MX' }),
    /** Path to the portrait. Replace with the real headshot. */
    portrait: ok('/portrait/santiago.png'),
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
    x: ok('https://x.com/1816z'),
    /** Public Credly badge wallet — verifiable certifications. */
    credly: ok('https://www.credly.com/users/eccoed/badges'),
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
        en: 'A documented workflow with fewer repeated handoffs.',
        es: 'Un flujo documentado con menos traspasos repetitivos.',
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
        en: 'A focused feature that can be reviewed and maintained.',
        es: 'Una función enfocada que se puede revisar y mantener.',
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
        en: 'A written technical plan the team can evaluate and execute.',
        es: 'Un plan técnico escrito que el equipo puede evaluar y ejecutar.',
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
      items: [
        'TypeScript',
        'React',
        'Next.js',
        'Tailwind',
        'Three.js / R3F',
        'GSAP',
        'Framer Motion',
      ],
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
      year: { value: '2025 — present', pending: false },
      url: 'https://directa.mx',
      summary: {
        en: 'Self-initiated project: the brand and bilingual website for Santiago’s services studio.',
        es: 'Proyecto propio: la marca y el sitio bilingüe del estudio de servicios de Santiago.',
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
  experience: ok<
    Array<{
      role: { en: string; es: string };
      org: string;
      period: { en: string; es: string };
      summary: { en: string; es: string };
    }>
  >([
    {
      role: { en: 'Founder & Full-Stack Engineer', es: 'Fundador e ingeniero full-stack' },
      org: 'Directa',
      period: { en: '2025 — present', es: '2025 — presente' },
      summary: {
        en: 'Founded and run a done-for-you digital agency for small businesses — designing, building and shipping web products, e-commerce and workflow automation on a TypeScript / Next.js stack, and owning the full delivery cycle from scoping to maintenance.',
        es: 'Fundé y dirijo una agencia digital llave en mano para pequeñas empresas — diseño, construyo y despliego productos web, e-commerce y automatización de flujos sobre un stack de TypeScript / Next.js, y soy dueño del ciclo completo, del alcance al mantenimiento.',
      },
    },
    {
      role: { en: 'Intern', es: 'Practicante' },
      org: 'CEMEX',
      period: { en: '2026 — present', es: '2026 — presente' },
      summary: {
        en: 'Support digital and technical workflows at a global building-materials company while completing my engineering degree.',
        es: 'Apoyo flujos de trabajo digitales y técnicos en una empresa global de materiales de construcción mientras curso mi carrera de ingeniería.',
      },
    },
    {
      role: { en: 'Systems & Web Manager', es: 'Encargado de sistemas y web' },
      org: 'Moreno Diesel',
      period: { en: '2023 — present', es: '2023 — presente' },
      summary: {
        en: "Manage the company's online store, website infrastructure and electronic-invoicing systems, implementing backend improvements and system integrations that keep daily operations running.",
        es: 'Gestiono la tienda en línea, la infraestructura del sitio y los sistemas de facturación electrónica de la empresa, implementando mejoras de backend e integraciones que sostienen la operación diaria.',
      },
    },
    {
      role: { en: 'Developer', es: 'Desarrollador' },
      org: 'Arwen — Discord bot',
      period: { en: '2021 — 2023', es: '2021 — 2023' },
      summary: {
        en: 'Designed and maintained an all-in-one Discord bot for automation, moderation and monetization, integrating social, gaming and cryptocurrency APIs.',
        es: 'Diseñé y mantuve un bot de Discord todo-en-uno para automatización, moderación y monetización, integrando APIs sociales, de gaming y de criptomonedas.',
      },
    },
  ]),

  education: ok<
    Array<{
      degree: { en: string; es: string };
      org: string;
      period: { en: string; es: string };
    }>
  >([
    {
      degree: {
        en: 'B.S. in Software Development Engineering',
        es: 'Ing. en Desarrollo de Software',
      },
      org: 'Universidad Tecmilenio, Campus Las Torres',
      period: { en: '2023 — 2027 (expected)', es: '2023 — 2027 (en curso)' },
    },
    {
      degree: {
        en: 'High-school diploma — Bilingual program',
        es: 'Bachillerato — Programa bilingüe',
      },
      org: 'CIDEB — Centro de Investigación y Desarrollo en Educación Bilingüe',
      period: { en: '2020 — 2022', es: '2020 — 2022' },
    },
  ]),

  /**
   * Certifications & credentials — verified from the CV, grouped by issuer.
   * `honors` marks a distinction; the public Credly wallet lives in
   * `social.credly`. Add or remove entries here; the About section adapts.
   */
  certifications: ok<
    Array<{
      issuer: string;
      period?: string;
      items: Array<{ name: string; year?: string; honors?: boolean }>;
    }>
  >([
    {
      issuer: 'Universidad Tecmilenio',
      period: '2025 — 2026',
      items: [
        { name: 'Full-Stack Development' },
        { name: 'Cloud Computing' },
        { name: 'Data Science' },
        { name: 'Databases' },
        { name: 'Data Structures', honors: true },
        { name: 'Object-Oriented Programming' },
        { name: 'Operating Systems', honors: true },
        { name: 'Network Management', honors: true },
        { name: 'Agile Methodologies', honors: true },
        { name: 'Probability & Statistics for Data Science' },
        { name: 'Programming Fundamentals', honors: true },
        { name: 'Upper-Intermediate English', honors: true },
      ],
    },
    {
      issuer: 'AWS',
      items: [{ name: 'AWS Academy Graduate — Cloud Foundations', year: '2024' }],
    },
    {
      issuer: 'Cisco',
      items: [
        { name: 'Networking Basics', year: '2025' },
        { name: 'Python Essentials 1', year: '2024' },
      ],
    },
    {
      issuer: 'IBM',
      items: [
        { name: 'Web Development Fundamentals — SkillsBuild', year: '2025' },
        { name: 'Data Visualization with R', year: '2024' },
      ],
    },
  ]),

  /** Analytics hooks read from env vars; null if unset. */
  analytics: {
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || null,
    gaMeasurementId: /^G-[A-Z0-9]{4,15}$/.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '')
      ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!
      : null,
  },
} as const;

export function isPending<T>(field: T | Pending<T>): boolean {
  return (
    typeof field === 'object' &&
    field !== null &&
    'pending' in field &&
    (field as Pending<T>).pending === true
  );
}

export function unwrap<T>(field: T | Pending<T>): T {
  if (typeof field === 'object' && field !== null && 'value' in field && 'pending' in field) {
    return (field as Pending<T>).value;
  }
  return field as T;
}
