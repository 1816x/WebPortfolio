import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Santiago Rivera — Software, web, automatización e IA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Fonts are vendored via @fontsource (pinned + integrity-checked by the
// lockfile) and read from node_modules at build — no network fetch, no
// supply-chain exposure. Falls back to the default font if a file is missing.
async function loadFont(rel: string): Promise<ArrayBuffer | null> {
  try {
    const buf = await readFile(join(process.cwd(), 'node_modules', rel));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } catch {
    return null;
  }
}

export default async function OG() {
  const [grotesk, mono] = await Promise.all([
    loadFont('@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff'),
    loadFont('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff'),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 500 | 700; style: 'normal' }[] = [];
  if (grotesk) fonts.push({ name: 'Space Grotesk', data: grotesk, weight: 700, style: 'normal' });
  if (mono) fonts.push({ name: 'JetBrains Mono', data: mono, weight: 500, style: 'normal' });

  const sans = grotesk ? 'Space Grotesk' : 'sans-serif';
  const monoFamily = mono ? 'JetBrains Mono' : 'monospace';

  const CREAM = '#FBF4E4';
  const INK = '#111111';
  const ROYAL = '#2746D0';
  const YELLOW = '#FFD23F';
  const CORAL = '#FF5C39';

  const tag = (bg: string, color: string, label: string) => ({ bg, color, label });
  const tags = [tag(YELLOW, INK, 'WEB'), tag(ROYAL, '#fff', 'AUTOMATIZACIÓN'), tag(CORAL, '#fff', 'IA')];

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
            automatización e<span style={{ color: ROYAL, marginLeft: 22 }}>IA</span>.
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
