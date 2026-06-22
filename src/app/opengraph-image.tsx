import { ImageResponse } from 'next/og';

export const alt = 'Santiago Rivera — Software, web, automatización e IA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Static-weight woff files (Satori supports woff, not woff2). Wrapped so a
// failed fetch never breaks the build — Satori falls back to its default font.
async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (res.ok) return await res.arrayBuffer();
  } catch {
    /* offline build — fall back to default */
  }
  return null;
}

export default async function OG() {
  const [grotesk, mono] = await Promise.all([
    loadFont('https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5/files/space-grotesk-latin-700-normal.woff'),
    loadFont('https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5/files/jetbrains-mono-latin-500-normal.woff'),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 500 | 700; style: 'normal' }[] = [];
  if (grotesk) fonts.push({ name: 'Space Grotesk', data: grotesk, weight: 700, style: 'normal' });
  if (mono) fonts.push({ name: 'JetBrains Mono', data: mono, weight: 500, style: 'normal' });

  const sans = grotesk ? 'Space Grotesk' : 'sans-serif';
  const monoFamily = mono ? 'JetBrains Mono' : 'monospace';

  const CREAM = '#FBF4E4';
  const INK = '#111111';
  const BLUE = '#3D5AFE';
  const YELLOW = '#FFD23F';
  const CORAL = '#FF5C39';

  const tag = (bg: string, color: string, label: string) => ({ bg, color, label });
  const tags = [tag(YELLOW, INK, 'WEB'), tag(BLUE, '#fff', 'AUTOMATIZACIÓN'), tag(CORAL, '#fff', 'IA')];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: CREAM,
          color: INK,
          padding: 60,
          fontFamily: sans,
          border: `14px solid ${INK}`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 66,
                height: 66,
                background: INK,
                color: CREAM,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              SR
            </div>
            <div style={{ fontFamily: monoFamily, fontSize: 24, letterSpacing: 4 }}>SANTIAGO RIVERA</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {tags.map((t) => (
              <div
                key={t.label}
                style={{
                  display: 'flex',
                  background: t.bg,
                  color: t.color,
                  border: `3px solid ${INK}`,
                  padding: '8px 14px',
                  fontFamily: monoFamily,
                  fontSize: 18,
                }}
              >
                {t.label}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 104, fontWeight: 700, lineHeight: 1.0, letterSpacing: -3 }}>
          <div style={{ display: 'flex' }}>Software, web,</div>
          <div style={{ display: 'flex' }}>
            automatización e<span style={{ color: BLUE, marginLeft: 22 }}>IA</span>.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: monoFamily, fontSize: 22, letterSpacing: 3 }}>
          <div style={{ display: 'flex' }}>directa.mx</div>
          <div style={{ display: 'flex' }}>santiagorivera.com</div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
