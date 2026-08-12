import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  /**
   * INSTRUCTIONS FOR PRODUCTION DOMAIN:
   * 1. Define the `NEXT_PUBLIC_SITE_URL` environment variable in your hosting environment (e.g. Vercel, Docker).
   * 2. Replace the fallback domain 'https://aossie.org' below with your project's target production domain.
   */
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aossie.org';
  const baseUrl = rawBaseUrl.replace(/\/$/, '');


  return routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    changeFrequency: 'monthly',
    priority: 1,
  }));
}

