import type { Config } from 'tailwindcss';

const withVar = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: withVar('--ink'),
          muted: withVar('--ink-muted'),
          subtle: withVar('--ink-subtle'),
        },
        canvas: {
          DEFAULT: withVar('--canvas'),
          raised: withVar('--canvas-raised'),
          sunken: withVar('--canvas-sunken'),
        },
        surface: withVar('--surface'),
        panel: withVar('--panel'),
        'panel-ink': withVar('--panel-ink'),
        // fixed near-black text for use on the light accent fills (yellow/coral/green) — never flips
        'on-accent': '#111111',
        accent: withVar('--accent'),
        line: withVar('--line'),
        // neo-brutalist accents
        brand: {
          yellow: withVar('--yellow'),
          blue: withVar('--blue'),
          coral: withVar('--coral'),
          green: withVar('--green'),
        },
      },
      boxShadow: {
        brut: '5px 5px 0 rgb(var(--shadow))',
        'brut-sm': '3px 3px 0 rgb(var(--shadow))',
        'brut-lg': '8px 8px 0 rgb(var(--shadow))',
        'brut-xl': '10px 10px 0 rgb(var(--shadow))',
      },
      spacing: {
        gutter: 'var(--gutter)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        snug: '-0.015em',
      },
      transitionTimingFunction: {
        steps2: 'steps(2)',
        steps3: 'steps(3)',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        blink: 'blink 1s steps(1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '50.01%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
