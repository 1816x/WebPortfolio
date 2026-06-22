import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

/**
 * Neo-brutalist type system:
 *  - Space Grotesk for everything structural (body + display)
 *  - JetBrains Mono for labels, metadata, tickers, buttons-as-data
 * `--font-display` is the same family at heavier weights so headings stay
 * cohesive with body copy (the brutalist look is weight + scale, not a
 * second typeface).
 */
export const fontSans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '700'],
  display: 'swap',
});

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
  display: 'swap',
});
