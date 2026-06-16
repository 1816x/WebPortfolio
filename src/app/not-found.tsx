import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          background: '#faf9f6',
          color: '#121214',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '2rem',
          gap: '1rem',
        }}
      >
        <p style={{ fontFamily: 'ui-monospace, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 12 }}>
          404
        </p>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', lineHeight: 1, margin: 0 }}>Not found</h1>
        <Link
          href="/es"
          style={{
            marginTop: '2rem',
            fontFamily: 'ui-monospace, monospace',
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            borderBottom: '1px solid #121214',
            color: '#121214',
            textDecoration: 'none',
          }}
        >
          ← Back home
        </Link>
      </body>
    </html>
  );
}
