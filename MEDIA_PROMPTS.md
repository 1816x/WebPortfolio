# MEDIA_PROMPTS.md — generating site media with Gemini

Prompts and guidance for producing the visual assets santiagorivera.com still
needs. Read the **recommendation** first — this design is intentionally
image‑light, so generating *less* is the right call.

> Surfaces: the free **Gemini app** ("Nano Banana" = Gemini 2.5 Flash Image) is
> best for **editing your real photo** and quick generation. **Google AI Studio**
> / **Imagen 4** give more control + higher fidelity for the abstract pieces.

---

## 1. Recommendation — what to generate vs. keep real

| Asset | Slot | Do this |
| --- | --- | --- |
| **Portrait** | `public/portrait/santiago.jpg` · 4:5 · ≥1600px | **Use your real photo.** Optionally *restyle* it with Gemini (prompt A). Never AI‑invent a face. |
| **Directa screenshots** | `public/work/directa/{cover,01,02,03}.jpg` | **Use real captures of directa.mx.** Only generate the temp placeholders (prompt C) until you have them — and replace before launch. |
| **OG / social card** | `src/app/opengraph-image.tsx` (1200×630) | **Keep it code‑generated, not Gemini** — image models garble text. (It's still in the old editorial style — ask me to restyle it to neo‑brutalist.) |
| **Favicon** | `src/app/icon.tsx` | Already code‑generated. Only make a custom one if you want (prompt D). |
| **Abstract textures/accents** | optional, `public/art/` | Fair game for Gemini (prompt B) — but use sparingly; the brand avoids decoration. |

**Golden rules for every prompt**
1. Never ask the model to render **text/your name** — it will misspell it. Text lives in code/design.
2. Match the brand kit below exactly, or assets won't sit together.
3. Export, then drop the file at the listed path and flip `pending: false` in `site.ts` / `directa.ts`.

---

## 2. Brand kit (paste into prompts for consistency)

```
STYLE: neo-brutalist, flat vector + risograph print, hard 3px black outlines,
hard OFFSET solid shadow (no blur), bold geometric, high contrast, halftone dots,
subtle paper grain, limited palette.
PALETTE: cream #FBF4E4, ink #111111, electric blue #3D5AFE, signal yellow #FFD23F,
coral #FF5C39, green #1FBF57. (dark variant background: graphite #161310)
AVOID: gradients, soft glow, blurred drop shadows, lens flare, glossy 3D render,
photorealism, neon, busy detail, any text/letters/words.
```

---

## 3. Prompts

### A — Portrait, restyled (EDIT your real photo; Gemini app → upload photo)
Run this on your **actual headshot**. Keeps your likeness, gives it the brand look.

```
Edit this photo into a high-contrast two-tone (duotone) editorial portrait.
Convert it to a bold halftone / risograph print look using ONLY deep ink black
#111111 and warm cream #FBF4E4, with a single electric-blue #3D5AFE accent on the
shadows. Hard posterized edges, visible halftone dots, no gradients, no blur.
Keep my face, likeness and pose; vertical 4:5 crop, plain cream background.
Flat, graphic, confident.
```
- Variant: swap the accent to **coral #FF5C39** or **yellow #FFD23F** and compare.
- Export ≥1600px long edge → `public/portrait/santiago.jpg`.

### B — Abstract brand textures (GENERATE; optional accents)
```
Flat neo-brutalist abstract composition: bold geometric shapes (rectangles,
circles, plus/cross marks, arrows) with thick 3px black outlines and hard offset
solid-black shadows, arranged on a warm cream #FBF4E4 background. Limited palette:
electric blue #3D5AFE, signal yellow #FFD23F, coral #FF5C39. Risograph print
texture, slight paper grain, halftone dots. High contrast, no gradients, no glow,
no text. Square, balanced negative space.
```
- Background variant (very subtle, tileable): `Seamless tileable halftone dot pattern, ink dots on cream, large evenly-spaced dots, flat risograph, no gradient, no text.`
- Export PNG → `public/art/` (then I can wire it in as a section accent if you want).

### C — Directa placeholders (GENERATE → **replace with real screenshots before launch**)
> ⚠️ Temporary only. Presenting AI mockups as a real product is misleading — swap
> these for genuine directa.mx captures as soon as you have them.

Cover (16:9):
```
Neo-brutalist illustration of a browser window frame with a thick 3px black
outline and a hard offset solid shadow, sitting on a cream #FBF4E4 background.
Inside the window: an abstract minimal website layout built from solid color
blocks (cream, electric blue #3D5AFE, yellow #FFD23F, coral #FF5C39) — placeholder
bars and rectangles only, NO readable text. Flat vector, risograph grain, high
contrast, no gradients. 16:9.
```
Gallery `01/02/03` (4:3): reuse the cover prompt but change the frame to:
`01` a phone screen frame · `02` a dashboard of bordered stat cards/blocks ·
`03` a close-up detail of buttons and tags. Keep the same palette/style, no text.
- Export → `public/work/directa/{cover,01,02,03}.jpg`.

### D — Custom 'SR' monogram sticker (GENERATE; optional, favicon already exists)
```
A bold "SR" monogram set in a heavy geometric grotesque, cream letters knocked out
of a solid black square sticker with a thick black outline and hard offset shadow.
Flat, neo-brutalist, centered, no gradient, no extra text. Square, transparent or
cream background.
```
- Export PNG (transparent) → `public/art/monogram.png`.

---

## 4. Workflow checklist
1. Generate in **Gemini app / AI Studio**; set the aspect ratio in the prompt **and** the tool (4:5 portrait, 16:9 cover, 4:3 gallery, 1:1 textures).
2. If a result has stray text or wrong color, say "remove all text, use exactly #3D5AFE/#FFD23F/#FF5C39 on #FBF4E4" and regenerate.
3. Optimize (e.g. squoosh.app) — JPG for photos/placeholders, PNG for graphics with transparency.
4. Drop the file at the exact path above.
5. Open `src/content/site.ts` / `src/content/directa.ts`, replace the path if needed and set `pending: false` so the "pending" badge disappears.

---

## 5. (Optional) Using Gemini for COPY — with guardrails
Gemini can polish/translate copy, but **must not invent facts** (the brief forbids
fabricated bio, dates, employers, metrics, clients). Use this wrapper:

```
You are editing copy for a bilingual (ES/EN) portfolio. Rephrase ONLY the text I
give you — do not invent facts, names, dates, metrics or clients. Keep it concise,
plain, confident; no marketing fluff. Leave [SQUARE BRACKETS] anywhere a fact is
missing so I can fill it in. Return ES and EN versions.

[paste your raw notes here]
```
Good uses: tighten the Directa case-study blocks in `directa.ts`, draft `alt` text
for the images above, write meta descriptions. Bad uses: anything that states a
fact you haven't given it.
