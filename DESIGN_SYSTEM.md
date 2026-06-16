# Design system

The visual identity is editorial, restrained, and built around typography
rather than decoration. Two type voices, generous white space, one signal
color, one signature visual.

## Tokens

Tokens live in `src/app/globals.css` as CSS custom properties scoped to
`:root` (light) and `.dark`. Tailwind reads them via the `colors` config in
`tailwind.config.ts`.

| Token                | Light                    | Dark                       |
| -------------------- | ------------------------ | -------------------------- |
| `--canvas`           | `250 249 246` (paper)    | `10 10 12` (graphite)      |
| `--canvas-raised`    | `255 255 255`            | `18 18 22`                 |
| `--canvas-sunken`    | `244 242 237`            | `6 6 8`                    |
| `--ink`              | `18 18 20`               | `244 240 232`              |
| `--ink-muted`        | `75 75 80`               | `175 175 180`              |
| `--ink-subtle`       | `130 130 135`            | `110 110 115`              |
| `--accent`           | `220 60 30` (signal red) | `255 100 65`               |
| `--gutter`           | `clamp(1.25rem,2.5vw,2.5rem)` | same                  |

Use `rgb(var(--token))` or Tailwind classes (`bg-canvas`, `text-ink-muted`,
`text-accent`, etc.).

## Typography

Three faces, served via `next/font`:

| Role     | Family            | Usage                                |
| -------- | ----------------- | ------------------------------------ |
| Display  | Instrument Serif  | Headings, hero, name lockup          |
| Sans     | Inter             | Body, navigation, prose              |
| Mono     | JetBrains Mono    | Labels, eyebrows, metadata, buttons  |

Helper classes in `globals.css`:

- `.display` — serif headings with tight letter-spacing.
- `.eyebrow` — small uppercase mono lead-in over sections.
- `.label` — micro mono caps used for metadata.

Tracking:
- `.tracking-tightest` (`-0.04em`) for the largest serif headings.
- `.tracking-snug` (`-0.015em`) for mid-size headings.

## Spacing

- Vertical rhythm uses generous section padding (`py-24 md:py-40`).
- Horizontal page gutter uses `var(--gutter)` via the `.container-x` utility.
- Section dividers are 1px `border-t border-line/10` — never a thicker rule.

## Color usage

- **Accent** is used sparingly: hover states, pending badge dot, one
  highlight per page max. Never as a background fill.
- Surfaces alternate `--canvas` and `--canvas-sunken` for soft contrast
  without losing the editorial feel.

## Motion

- **Reveals** — `<Reveal>` component fades-up content with `expo.out` easing,
  triggered by GSAP ScrollTrigger at `top 85%`, fires `once: true`.
- **Hero** — GSAP timeline animates each headline line individually with a
  60px translate and 8% scroll-driven parallax.
- **Smooth scroll** — `Lenis` (1.05s duration, exponential ease) bound to
  GSAP's ticker. Bypassed entirely when `prefers-reduced-motion` is set.
- **Hover** — text shifts to `italic` and `text-accent` on interactive
  serif headings. Buttons translate the arrow icon 2px on hover.

All motion is gated by a `prefers-reduced-motion: reduce` check.

## The signature visual

`src/components/three/SignatureField.tsx` renders a slow-rotating point
field whose vertices respond to the cursor. It only mounts when:

1. `site.visual.enableSignatureField` is `true`,
2. the viewport is wider than 720px,
3. the user has not requested reduced motion.

It uses react-three-fiber with `powerPreference: 'high-performance'` and is
dynamically imported with `ssr: false` so it never blocks initial paint.

## Components

| Component       | Purpose                                                   |
| --------------- | --------------------------------------------------------- |
| `Header`        | Sticky nav, blurs on scroll, mobile drawer                |
| `Footer`        | Tagline + nav + contact channels                          |
| `ThemeToggle`   | Light / dark, system-aware (next-themes)                  |
| `LocaleSwitcher`| es / en (next-intl)                                       |
| `Button`        | Pill button with chevron, three variants                  |
| `Reveal`        | Scroll-triggered fade-up wrapper                          |
| `PendingBadge`  | Surfaces unverified content                               |
| `SignatureField`| Hero 3D scene                                             |
| `ContactPanel`  | Channel list with copy-email, badges for pending values   |

## Accessibility

- All interactive elements are keyboard reachable.
- Focus uses a 2px accent outline at 3px offset.
- `prefers-reduced-motion` disables Lenis, GSAP reveals, and the 3D scene.
- Color contrast on both themes meets AA for body and large text.
- `<Header>` exposes `Skip to content` as the first focusable element.
- Locale switching uses semantic `<button>`s with `aria-current`.

## What to avoid

- Generic developer-portfolio tropes: skill bars, floating tech logos, fake
  dashboards, terminal headers, neon gradients.
- Animation on every element.
- More than one accent highlight per page section.
- 3D added "just because". The signature field is the only piece.
