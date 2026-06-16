import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'es',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/about': { en: '/about', es: '/sobre-mi' },
    '/work': { en: '/work', es: '/trabajo' },
    '/work/directa': { en: '/work/directa', es: '/trabajo/directa' },
    '/services': { en: '/services', es: '/servicios' },
    '/contact': { en: '/contact', es: '/contacto' },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
