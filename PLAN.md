# Plan — portfolio credibility and Directa connection

## Objective

Clarify Santiago Rivera's role, show documented personal contributions and projects, and make Directa the commercial path without presenting unverified client results.

## Checklist

- [x] Inspect repository guidance, content, design, scripts, routing, and smoke tests.
- [x] Replace Space Grotesk with Outfit, including the generated OpenGraph card.
- [x] Simplify the bilingual home narrative and use the existing configured portrait.
- [x] Put selected work before personal experience, then services/capabilities, Directa connection, and contact.
- [x] Reframe Directa as a self-initiated brand/site project and distinguish site features from offered services.
- [x] Remove unsupported outcomes and inflated language found during review.
- [x] Extend smoke coverage for localized routes, contact, CV, and work links.
- [x] Run all automated checks and record results below.
- [ ] Complete responsive visual review and capture screenshots (blocked by unavailable Playwright browser binaries).

## Decisions

- Kept Next.js 15, React 18, Tailwind 3, next-intl, GSAP, Lenis, pnpm and the existing lockfile format.
- Outfit is the primary sans/display family; JetBrains Mono remains limited to metadata.
- The existing configured portrait (`public/portrait/santiago.png`) replaces the draggable hero cards. Important information no longer depends on drag.
- Existing Directa captures are retained as repository-provided captures. Their exact parity with the current production site has not been independently established, so no version/date claim is shown.
- Canonicals continue to default to `https://santiagorivera.com` with `NEXT_PUBLIC_SITE_URL` as the deployment override.
- The CV PDF and verified contact values remain unchanged.

## Tests performed

- `pnpm typecheck` — passed.
- `pnpm lint` — passed with the upstream Next 15 deprecation notice for `next lint`.
- `pnpm build` — passed after switching font loading to bundled local files; the first attempt could not reach Google Fonts.
- `pnpm test:e2e` — could not launch because Playwright browser binaries are absent.
- `pnpm exec playwright install chromium webkit` — download blocked with HTTP 403 by the environment.
- Responsive screenshots could not be captured because no browser executable is available.

## Pending confirmation

- Confirm that `santiagorivera.com` remains connected to the intended Vercel project and that the production `NEXT_PUBLIC_SITE_URL` value is set; no DNS or Vercel settings were changed.
- Confirm whether the existing Directa captures represent the current public version; until then the gallery avoids a version claim.
- Reconcile future-dated/current entries already present in the source (CEMEX 2026—present, projects dated 2026) with Santiago before changing source facts.
- Confirm whether Directa's `2025 — present` dates should remain public; they were preserved from the existing source rather than newly inferred.
