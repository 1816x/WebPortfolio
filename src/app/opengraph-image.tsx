import { ImageResponse } from 'next/og';

export const alt = 'Santiago Rivera — Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0c',
          color: '#faf0e8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 22, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'monospace' }}>
          <div style={{ width: 10, height: 10, background: '#ff6441', borderRadius: 999 }} />
          SANTIAGO · RIVERA
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 110, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>Software,</span>
          <span>web, automation</span>
          <span style={{ fontStyle: 'italic' }}>and AI systems.</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 4, textTransform: 'uppercase', fontFamily: 'monospace' }}>
          <span>directa.mx</span>
          <span>santiagorivera.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
