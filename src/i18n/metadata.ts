import type { Metadata } from 'next';
import { languages, defaultLanguage, getLanguage } from '@/config/languages';
import { getMessages } from './messages';

/** Sub-pages with their own title, description and canonical URL. */
export const PAGE_META = {
  projects: { path: '/projects', namespace: 'ProjectsPage' },
  programs: { path: '/programs', namespace: 'ProgramsPage' },
  about: { path: '/about', namespace: 'AboutPage' },
} as const;

export type PageKey = keyof typeof PAGE_META;

/** 1200x630 raster share image; Discord, X and LinkedIn do not render SVG previews. */
export const OG_IMAGE = { path: '/og-image.png', width: 1200, height: 630 } as const;

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://aossie.org').replace(/\/$/, '');
}

function buildMetadata(locale: string, path: string, title: string, description: string): Metadata {
  const siteUrl = getSiteUrl();
  // Every page lives under a locale prefix (localePrefix: 'always'), matching sitemap.ts
  const urlFor = (code: string) => `${siteUrl}/${code}${path}`;
  const localeUrl = urlFor(locale);
  const imageUrl = `${siteUrl}${OG_IMAGE.path}`;

  return {
    title,
    description,
    alternates: {
      canonical: localeUrl,
      languages: {
        ...Object.fromEntries(languages.map((lang) => [lang.code, urlFor(lang.code)])),
        'x-default': urlFor(defaultLanguage),
      },
    },
    openGraph: {
      title,
      description,
      url: localeUrl,
      siteName: 'AOSSIE',
      images: [{ url: imageUrl, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: title }],
      locale: getLanguage(locale).ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@aossie_org',
      title,
      description,
      images: [imageUrl],
    },
  };
}

/** Metadata for a locale's home page. */
export async function generateLocaleMetadata(locale: string): Promise<Metadata> {
  const { metaTitle, metaDescription } = getMessages(locale).Home;
  return buildMetadata(locale, '', metaTitle, metaDescription);
}

/** Metadata for a sub-page, so each one gets its own title, description and canonical URL. */
export async function generatePageMetadata(locale: string, page: PageKey): Promise<Metadata> {
  const { path, namespace } = PAGE_META[page];
  const { title, subtitle } = getMessages(locale)[namespace];
  return buildMetadata(locale, path, `${title} | AOSSIE`, subtitle);
}
