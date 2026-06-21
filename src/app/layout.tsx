import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { fontSans, fontDisplay, fontMono } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://santiagorivera.com'),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('calm')==='1')document.documentElement.classList.add('calm')}catch(e){}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
