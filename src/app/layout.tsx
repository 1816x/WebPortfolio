import type { Metadata } from 'next';
import { fontSans, fontDisplay, fontMono } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://santiagorivera.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
