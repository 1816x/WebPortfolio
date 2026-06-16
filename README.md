# santiagorivera.com

Personal portfolio for **Santiago Rivera** — software developer, founder of
[Directa](https://directa.mx). Bilingual (Spanish / English), light + dark mode,
editorial layout with a restrained WebGL signature visual.

> Built with Next.js 15 (App Router) · TypeScript · Tailwind · next-intl ·
> next-themes · GSAP + ScrollTrigger · Lenis · react-three-fiber · Framer Motion.

---

## Local setup

```bash
pnpm install
cp .env.example .env.local   # optional — fill in if you want analytics
pnpm dev
```

Open <http://localhost:3000>. The middleware redirects `/` to the default
locale (`/es`).

## Scripts

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `pnpm dev`        | Local dev server                              |
| `pnpm build`      | Production build                              |
| `pnpm start`      | Serve the production build                    |
| `pnpm lint`       | Lint with Next/ESLint                         |
| `pnpm typecheck`  | TypeScript no-emit                            |
| `pnpm format`     | Prettier format the repo                      |
| `pnpm test:e2e`   | Playwright smoke tests (boots production)     |

## Project structure

```
src/
  app/
    [locale]/            # localized routes (next-intl, App Router)
      page.tsx           # home — composed of section components
      about/             # /sobre-mi | /about
      work/              # /trabajo | /work
        directa/         # the featured case study
      services/          # /servicios | /services
      contact/           # /contacto | /contact
    layout.tsx           # root <html> + fonts
    sitemap.ts           # /sitemap.xml
    robots.ts            # /robots.txt
    icon.tsx             # generated favicon
    opengraph-image.tsx  # generated OG card
  components/
    layout/              # Header, Footer, ThemeToggle, LocaleSwitcher
    sections/            # Hero, IntroBlock, WorkPreview, ServicesGrid, etc.
    three/               # SignatureField — the one 3D visual
    ui/                  # Button, Reveal, PendingBadge
    providers/           # ThemeProvider, SmoothScrollProvider (Lenis + GSAP)
  content/
    site.ts              # ⭐ single source of truth for editable content
    directa.ts           # Directa case-study copy
  i18n/                  # next-intl wiring
  lib/                   # fonts, cn, seo helpers
  middleware.ts          # locale routing
messages/
  en.json                # English UI strings
  es.json                # Spanish UI strings
public/
  cv/                    # drop CV PDF here
  portrait/              # drop portrait here
  work/directa/          # drop case-study media here
```

See `CONTENT_GUIDE.md` for how to edit content, and `DESIGN_SYSTEM.md` for
typography, spacing and motion rules.

## Deployment

The project targets **Vercel** out of the box.

1. Create a project on Vercel and link this repository.
2. Set the production env vars (mirror `.env.example`):
   - `NEXT_PUBLIC_SITE_URL=https://santiagorivera.com`
   - (optional) `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=santiagorivera.com`
   - (optional) `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-…`
3. In **Settings → Domains**, add `santiagorivera.com` and `www.santiagorivera.com`.
   Point your registrar's A record to `76.76.21.21` and the CNAME for `www` to
   `cname.vercel-dns.com`. Use `www` as primary or apex — either works.
4. Vercel will auto-build on push to `main`.

Build command: `pnpm build` · Output: standard Next.js.

## Pending content

Anything not yet verified is marked `pending: true` in `src/content/site.ts`
and `src/content/directa.ts`. The UI renders a small "pending" badge on every
such field so unverified claims never ship silently.

Current pending items at first commit:

- Portrait (`public/portrait/santiago.jpg`)
- CV PDF (`public/cv/santiago-rivera-cv.pdf`)
- WhatsApp number
- Calendar URL
- Directa screenshots in `public/work/directa/`
- Directa case-study copy (context, problem, strategy, etc.)
- Experience and education arrays

When you replace a value, also flip its `pending` to `false` (or remove the
wrapper for fields whose entire wrapper is the placeholder).

## Analytics

Set **one** of:

- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — loads Plausible's script-only embed.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — loads GA4 with `gtag.js`.

Leave both empty to ship no analytics. No third-party scripts load otherwise.

## License

All rights reserved.
