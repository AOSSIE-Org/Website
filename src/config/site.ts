/** Site origin used for canonical URLs, the sitemap and structured data. */

/** Production domain, used when NEXT_PUBLIC_SITE_URL is not set. */
const DEFAULT_SITE_URL = 'https://aossie.org';

/**
 * Site origin without a trailing slash. Set NEXT_PUBLIC_SITE_URL in the hosting environment
 * to override the production domain (e.g. for previews).
 */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
}

/** Site origin resolved at build time. */
export const SITE_URL = getSiteUrl();
