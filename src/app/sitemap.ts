import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export const dynamic = 'force-static';

/** Localized pages, relative to the locale root. */
const PAGES = [
  { path: '', priority: 1 },
  { path: '/projects', priority: 0.9 },
  { path: '/programs', priority: 0.8 },
  { path: '/about', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Set NEXT_PUBLIC_SITE_URL in the hosting environment to override the production domain.
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aossie.org').replace(/\/$/, '');

  return routing.locales.flatMap((locale) =>
    PAGES.map(({ path, priority }) => ({
      url: `${baseUrl}/${locale}${path}`,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${baseUrl}/${l}${path}`])),
      },
    }))
  );
}
