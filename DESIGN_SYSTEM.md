# Design system

The visual identity is **light-only neo-brutalist**: a warm cream page, hard
3px ink borders with offset drop-shadows, a royal-blue accent over comic
ben-day halftone dots, and two type voices (a grotesque display/sans + a
mono for metadata). Motion is selective and always reduced-motion aware.

## Tokens

Tokens live in `src/app/globals.css` as CSS custom properties on `:root`
(space-separated RGB so Tailwind can apply `<alpha-value>`). Tailwind reads
them via the `colors` config in `tailwind.config.ts`. There is **no dark
theme** — a single light palette.

| Token             | Value        | Use                                   |
| ----------------- | ------------ | ------------------------------------- |
| `--canvas`        | `#FBF4E4`    | cream page background                  |
| `--canvas-sunken` | `#F4EBD6`    | deeper cream (media wells)             |
| `--surface`       | `#FFFFFF`    | raised card surface                    |
| `--ink`           | `#111111`    | text + 3px borders + hard shadow       |
| `--ink-muted` / `--ink-subtle` | greys | body / metadata text            |
| `--royal` / `--accent` / `--blue` | `#2746D0` | lead accent (comic primary blue) |
| `--royal-deep`    | `#162A8C`    | footer field                           |
| `--yellow`        | `#FFD23F`    | accent fill / marker                   |
| `--coral`         | `#FF5C39`    | accent fill                            |
| `--green`         | `#1FBF57`    | accent fill / live dot                 |
| `--panel` / `--panel-ink` | `#111` / cream | inverse panels (contact/footer) |
| `--on-accent`     | `#111111`    | fixed near-black text on light fills; never flips |

Use `rgb(var(--token))` or the Tailwind classes (`bg-canvas`, `text-ink-muted`,
`text-accent`, `bg-brand-yellow`, `bg-brand-royal`, …).

## Typography

Two faces, served via `@fontsource` and wired in `src/lib/fonts.ts`:

| Role         | Family          | Usage                                |
| ------------ | --------------- | ------------------------------------ |
| Display/Sans | Space Grotesk   | Headings, hero, body, navigation     |
| Mono         | JetBrains Mono  | Labels, eyebrows, metadata, buttons  |

Helper classes in `globals.css`: `.eyebrow` and `.label` (small uppercase
mono lead-ins / metadata).

## Primitives

- `.brut` — 3px ink border + `5px 5px 0` offset shadow. `.brut-sm` is the 2px
  variant. The defining box of the whole look.
- `.press` — applied to interactive `.brut` boxes: lifts `-3px,-3px` on hover
  (bigger shadow) and slams flat on `:active`. Uses stepped easing.
- `.halftone` / `.halftone-strong` / `.halftone-on-royal` — comic ben-day dot
  fields (royal on cream, or white on royal).
- `.dot` — small accent status dot. `.mark` — marker-highlight behind text.
- Shadows: `shadow-brut` / `-sm` / `-lg` / `-xl` (Tailwind).

## Motion

- **Reveals** — the `<Reveal>` wrapper (`components/ui/Reveal.tsx`) snaps
  content into place with a `back.out` overshoot via GSAP ScrollTrigger
  (`start: top 86%`, `once: true`). Use it; don't sprinkle raw GSAP.
- **Hero** — GSAP staggers each headline word up into place; the `CardStack`
  deals its cards in and, on fine pointers, they are draggable with an elastic
  return.
- **Smooth scroll** — `Lenis`, mounted once in `SmoothScrollProvider` and
  bound to GSAP's ticker. Bypassed under reduced motion.
- **Ticker / Marker** — marquee strip and marker-highlight micro-interactions.

All motion is gated twice: the OS `prefers-reduced-motion: reduce` **and** a
visible `CalmToggle` that sets an `html.calm` class (persisted, applied before
hydration) for users who never set the OS flag.

## Components

| Component        | Purpose                                                   |
| ---------------- | --------------------------------------------------------- |
| `Header`         | Sticky nav, mobile drawer, skip-link target               |
| `Footer`         | Tagline + nav + contact channels (royal-deep field)       |
| `CalmToggle`     | Visible reduce-motion switch (replaces the old theme toggle) |
| `LocaleSwitcher` | es / en (next-intl), localized `aria-label`               |
| `Button`         | Bordered hard-shadow button; variants primary/secondary/accent/ghost/underline |
| `Reveal`         | Scroll-triggered snap-in wrapper                          |
| `PendingBadge`   | Surfaces unverified content                               |
| `CardStack`      | Interactive DOM hero centerpiece                          |
| `ContactPanel`   | Royal contact section (copy-email + channels)             |

## Accessibility

- All interactive elements are keyboard reachable.
- `:focus-visible` uses an accent outline plus a cream halo so the ring stays
  visible on both cream and royal/ink dark surfaces.
- `prefers-reduced-motion` **and** the `CalmToggle` disable Lenis + GSAP.
- `<Header>` exposes `Skip to content` as the first focusable element; nav uses
  `aria-current`.
- Color contrast on the light palette meets AA for body and large text.

## What to avoid

- Generic developer-portfolio tropes: skill bars, floating tech logos, fake
  dashboards, terminal headers, neon gradients.
- Animation on every element; more than one accent highlight per section.
- Re-introducing a dark theme or a 3D scene — the redesign is deliberately
  light-only with a DOM hero. The 3D field was removed.
