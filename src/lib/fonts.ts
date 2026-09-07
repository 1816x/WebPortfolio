import localFont from 'next/font/local';

/** Locally bundled typography avoids runtime requests and keeps builds reproducible. */
export const fontSans = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/outfit/files/outfit-latin-400-normal.woff2',
      weight: '400',
    },
    {
      path: '../../node_modules/@fontsource/outfit/files/outfit-latin-500-normal.woff2',
      weight: '500',
    },
    {
      path: '../../node_modules/@fontsource/outfit/files/outfit-latin-700-normal.woff2',
      weight: '700',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

export const fontDisplay = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/outfit/files/outfit-latin-500-normal.woff2',
      weight: '500',
    },
    {
      path: '../../node_modules/@fontsource/outfit/files/outfit-latin-700-normal.woff2',
      weight: '700',
    },
  ],
  variable: '--font-display',
  display: 'swap',
});

export const fontMono = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2',
      weight: '400',
    },
    {
      path: '../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2',
      weight: '500',
    },
    {
      path: '../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2',
      weight: '700',
    },
  ],
  variable: '--font-mono',
  display: 'swap',
});
