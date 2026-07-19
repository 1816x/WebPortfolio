# CLAUDE.md — context for the next session

You are continuing work on **santiagorivera.com**, the personal portfolio for
Santiago Rivera. The first build is complete and deployed-ready; the work
ahead is mostly finalizing content and shipping. Read this file first, then
`README.md` for setup, `CONTENT_GUIDE.md` for editing, `DESIGN_SYSTEM.md` for
tokens and motion rules.

---

## What this is

A bilingual (Spanish default, English secondary) editorial portfolio site
positioning Santiago as a software developer working across web products,
automation and AI. Featured project: **Directa** (https://directa.mx, his
services studio).

## Stack — locked, do not swap without asking

- Next.js 15 (App Router) + TypeScript
- Tailwind v3 (token-driven, see `globals.css`) — light-only neo-brutalist
- next-intl (i18n)
- GSAP + ScrollTrigger (scroll timelines) · Lenis (smooth scroll)
- Deploy: Vercel

> The site was redesigned from an editorial light/dark theme (Instrument Serif,
> next-themes, a react-three-fiber hero) to a light-only neo-brutalist look with
> a DOM `CardStack` hero. **next-themes, three / react-three-fiber / drei and
> Framer Motion were removed — do not re-add them.**

## Routes (6 × 2 locales = 12 static pages)

| Path                | EN                  | ES                       |
| ------------------- | ------------------- | ------------------------ |
| Home                | `/en`               | `/es`                    |
| Work index          | `/en/work`          | `/es/trabajo`            |
| Directa case        | `/en/work/directa`  | `/es/trabajo/directa`    |
| About               | `/en/about`         | `/es/sobre-mi`           |
| Services            | `/en/services`      | `/es/servicios`          |
| Contact             | `/en/contact`       | `/es/contacto`           |

Plus `sitemap.xml`, `robots.txt`, generated `icon.tsx`, `opengraph-image.tsx`,
and global `not-found.tsx`.

## ⭐ Single source of truth for editable content

**Almost every edit goes through two files**:

- `src/content/site.ts` — person, contact, services, capabilities, work
  list, projects (public GitHub repos), experience, education, analytics flags.
- `src/content/directa.ts` — Directa case-study copy.

Both use a `{ value, pending, note }` wrapper for any field whose verified
content is not yet supplied. The UI renders a small **"pending" badge** next
to every field still marked `pending: true`. To finalize: replace `value`,
flip `pending: false`. UI strings live in `messages/{en,es}.json`.

Do **not** scatter content across components. Always go through these files.

## Pending content (what's left to do)

| Item                         | Where to put it                                |
| ---------------------------- | ---------------------------------------------- |
| Portrait                     | `public/portrait/santiago.jpg` (4:5, ≥1600px)  |
| Experience array             | `site.ts → experience`                         |
| Education array              | `site.ts → education`                          |
| Role / positioning line      | `site.ts → person.role`                        |
| Directa case-study copy      | `directa.ts → context/problem/strategy/…`      |
| Directa screenshots + year   | `public/work/directa/{cover,01,02,03}.jpg`     |

WhatsApp, calendar and the CV PDF are finalized (verified in `site.ts`). The
public GitHub projects now render on the Work page (`site.ts → projects`).

The CV PDF is being redesigned in a parallel Claude Code session — do not
overwrite it without checking with Santiago first.

## Verified (do not "improve" by guessing)

- Name: Santiago Rivera
- Email: `saitiago@protonmail.com`
- Directa: `https://directa.mx`
- LinkedIn: `https://www.linkedin.com/in/santiagoxriv/`

Everything else — work history, dates, employers, technologies *he has used*,
metrics, education, achievements — must come from him. The brief
(`/root/.claude/uploads/.../SantiagoRivera.md` on the original web session)
explicitly forbids inventing any of it.

## Commands

```bash
pnpm install
pnpm dev               # localhost:3000 → redirects to /es
pnpm build
pnpm start
pnpm typecheck         # strict TS, currently clean
pnpm lint              # next-lint, currently clean
pnpm format
pnpm test:e2e          # Playwright smoke tests (boots prod build)
```

CI gate: `pnpm typecheck && pnpm lint && pnpm build` should all pass on
every commit.

## Architectural notes worth keeping in mind

- **Path alias**: `@/*` → `src/*`.
- **Routing**: localized pathnames are configured in `src/i18n/routing.ts`.
  When adding a new route, register it there too or `next-intl`'s
  type-safe `<Link>` won't accept it.
- **Hero visual**: the hero centerpiece is `CardStack`
  (`components/motion/CardStack.tsx`), a DOM card stack — the old
  react-three-fiber field was removed. There is no 3D scene; don't add one.
- **Reveals**: use the `<Reveal>` wrapper (`src/components/ui/Reveal.tsx`).
  It already handles reduced-motion. Don't sprinkle raw GSAP from inside
  components.
- **Lenis**: mounted once in `SmoothScrollProvider`. Do not instantiate a
  second Lenis anywhere.
- **Theming**: light-only. Tokens in `globals.css` (`:root`); Tailwind reads
  them via `tailwind.config.ts → theme.extend.colors`. There is no `.dark`
  block and no theme toggle — a `CalmToggle` controls reduced motion instead.
- **Buttons**: `<Button>` and `<ButtonLink>` from `components/ui/Button.tsx`
  — three variants (`primary`, `ghost`, `underline`). Don't roll your own.
- **Analytics**: read from env vars at runtime. Setting either
  `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` or `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  auto-injects the corresponding script in `[locale]/layout.tsx`.

## Don'ts

- Don't fabricate biography, employers, dates, metrics, testimonials,
  client logos, or prices.
- Don't replace the portrait with stock photography.
- Don't inflate Directa with metrics Santiago hasn't given you.
- Don't add a CMS, database or backend unless the work actually justifies
  it.
- Don't add another 3D scene "to show range" — the hero field is the only
  one. The brief is explicit about this.
- Don't add animation on every element. Motion is selective; reduced-motion
  must work.

## Git

- Develop on the active feature branch (was
  `claude/nice-ptolemy-60q4wg` in the original session — on local you can
  branch off `main` with a new name).
- Production deploys are gated by Vercel on `main`.
- Commit messages: imperative mood, short subject + a paragraph of "why".

## Deploy

Vercel project pointed at this repo. Set `NEXT_PUBLIC_SITE_URL=https://santiagorivera.com`
in production env. Add `santiagorivera.com` (apex) and `www.santiagorivera.com`
in Domains. Build command is `pnpm build`. Details in `README.md`.

## When in doubt

Ask Santiago. The brief explicitly says it is better to leave a `pending`
placeholder than to invent a fact.
