import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclude API, internals, dotted files, AND the dotless metadata routes
  // (opengraph-image, icon, apple-icon, manifest) so the locale redirect
  // doesn't 404 the OG card and favicon.
  matcher: ['/((?!api|_next|_vercel|opengraph-image|icon|apple-icon|manifest|.*\\..*).*)'],
};
