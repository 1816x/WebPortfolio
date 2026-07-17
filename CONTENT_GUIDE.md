# Content guide

Almost everything on the site is editable from two TypeScript files. No CMS,
no database. Edits trigger a Vercel rebuild.

## 1. `src/content/site.ts`

Single source of truth for site-wide editable content. Edit and commit.

### Editing values

There are two kinds of fields:

- **Plain values** — e.g. `site.person.name`. Edit the string.
- **Wrapped values** — anything wrapped in `{ value, pending, note }`. These
  are fields awaiting verified content. To finalize a field:
  1. Replace `value` with the verified content.
  2. Flip `pending: true` to `pending: false` (or remove the property).
  3. Optional: delete `note`.

A small "pending" badge renders in the UI for every wrapped field still marked
`pending: true`, so nothing unverified ever ships silently.

### Sections you can edit

| Block              | What it controls                                   |
| ------------------ | -------------------------------------------------- |
| `person`           | Name, role per language, location, portrait path   |
| `contact`          | Email, WhatsApp, LinkedIn, calendar, CV path       |
| `social`           | Footer / metadata social links                     |
| `services`         | The four service blocks (Problem / Deliverable / Outcome) |
| `capabilities`     | Capability groups and tags                         |
| `work`             | Featured case studies (each with a dedicated page) |
| `projects`         | Public GitHub repos shown on the Work page (external links) |
| `experience`       | Work history (initially `pending`)                 |
| `education`        | Education (initially `pending`)                    |
| `analytics`        | Read from env vars                                 |

## 2. `src/content/directa.ts`

Long-form copy for the Directa case study. Every block (`context`, `problem`,
`strategy`, `implementation`, `design`, `features`, `outcome`) accepts an
`{ en, es }` pair. Set `pending: false` once verified.

## 3. UI strings: `messages/en.json` and `messages/es.json`

Labels, button text, navigation, eyebrows. Keys are mirrored between the two
files. Add the same key to both — keep translations natural, not mechanical.

If you add a new namespace (top-level key) in one file, add it to both.

## 4. Adding a new project

1. Drop media in `public/work/<slug>/`.
2. In `src/content/site.ts`, append a new entry to `work`:
   ```ts
   {
     slug: 'new-project',
     featured: false,
     name: 'New Project',
     year: { value: '2026', pending: false },
     url: 'https://...',
     summary: { en: '…', es: '…' },
     tags: ['Web'],
   }
   ```
3. Create a case-study page at `src/app/[locale]/work/<slug>/page.tsx`
   (the Directa page is a good template to copy).
4. The layout adapts automatically — no other code changes required.

For a **public GitHub repo** that should appear as an external card (not a full
case study), append to `projects` in `site.ts` instead — each entry is
`{ slug, name, repo, url, year, language, accent ('blue'|'coral'|'green'|'yellow'),
wip, summary: { en, es }, tags }`. It renders in the "Open work on GitHub"
section of the Work page and links straight to GitHub. Only list **public**
repositories.

## 5. Replacing the CV or portrait

- **CV** — drop a PDF at `public/cv/santiago-rivera-cv.pdf`. If you keep that
  exact name, no code change is needed; just flip `contact.cv.pending` to
  `false`.
- **Portrait** — drop a JPG/WebP at `public/portrait/santiago.jpg` (4:5 ratio
  recommended, ≥ 1600px on the long edge). Then flip
  `person.portrait.pending` to `false`.

## 6. Adding a language

1. Add the locale to `routing.locales` in `src/i18n/routing.ts`.
2. Add a translations file at `messages/<locale>.json`.
3. Add the locale to every `{ en, es }` content object across
   `src/content/site.ts` and `src/content/directa.ts`.

## 7. Tone

- Concise. Evidence-based. No inflated claims.
- No prices (unless verified separately).
- No invented metrics.
- Avoid generic developer-portfolio phrases ("passionate about", "innovative
  solutions"). Read aloud — if it sounds like a template, rewrite.
