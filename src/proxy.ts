import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const middleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return middleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for public files, API, etc.
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Match all pathnames within `/`
    '/',
  ],
};
