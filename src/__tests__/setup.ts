import '@testing-library/jest-dom/vitest';
import React from 'react';
import { afterEach, beforeEach, vi } from 'vitest';
import { installBrowserMocks, resetBrowserMocks } from './test-utils/browser';
import { resetNavigation } from './test-utils/next-navigation';
import { resetShareDialogs } from './test-utils/share';
import { releaseDynamicImports } from './test-utils/dynamic';

/*
 * Shared mocks for what jsdom cannot run. Everything else (next-intl, next-themes, the site's
 * navigation helpers, the message catalogs) runs for real.
 */

// Animations, scroll tracking and drag gestures (see the module for details)
vi.mock('framer-motion', () => import('./test-utils/framer-motion'));

// App Router hooks and redirects; next-intl's navigation is built on these
vi.mock('next/navigation', () => import('./test-utils/next-navigation'));

// The share dialog is a DOM widget loaded on demand
vi.mock('@aossie-org/social-share-button', async () => (await import('./test-utils/share')).shareModule);

// next/image needs the Next.js image loader; a plain <img> keeps src and alt
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, className }: Record<string, unknown>) =>
    React.createElement('img', { src, alt, width, height, className }),
}));

// next/script defers injection to the Next.js runtime; render the tag itself
vi.mock('next/script', () => ({
  default: ({ id, type, dangerouslySetInnerHTML }: Record<string, unknown>) =>
    React.createElement('script', { id, type, dangerouslySetInnerHTML }),
}));

// next/dynamic: React.lazy with the component's own loading placeholder as the fallback
vi.mock('next/dynamic', () => import('./test-utils/dynamic'));

// next/font/google fetches fonts at build time; tests only need the CSS variable names
vi.mock('next/font/google', () => {
  const font = (name: string) => (options: { variable: string }) => ({ variable: options.variable, className: name });
  return {
    Inter: font('inter'),
    Noto_Sans_Arabic: font('arabic'),
    Noto_Sans_Bengali: font('bengali'),
    Noto_Sans_Devanagari: font('devanagari'),
  };
});

// next-intl/server only works in React Server Components; use the same catalogs synchronously
vi.mock('next-intl/server', async () => {
  const { createTranslator } = await import('next-intl');
  const { getMessages } = await import('@/i18n/messages');
  return {
    getTranslations: async ({ locale, namespace }: { locale: string; namespace: string }) =>
      createTranslator({ locale, messages: getMessages(locale), namespace: namespace as never }),
    setRequestLocale: vi.fn(),
    getRequestConfig: <T>(factory: T) => factory,
  };
});

installBrowserMocks();

// jsdom cannot load another page; stop link clicks after React's handlers have run, so a test that
// clicks a link sees the site's own click handling without jsdom's "not implemented" navigation
window.addEventListener('click', (event) => {
  if ((event.target as Element | null)?.closest?.('a[href]')) event.preventDefault();
});

beforeEach(() => {
  resetNavigation();
});

afterEach(async () => {
  resetBrowserMocks();
  resetShareDialogs();
  releaseDynamicImports();
  const { scrollYProgress } = await import('./test-utils/framer-motion');
  scrollYProgress.jump(0);
  document.documentElement.className = '';
  document.documentElement.removeAttribute('style');
  localStorage.clear();
});
