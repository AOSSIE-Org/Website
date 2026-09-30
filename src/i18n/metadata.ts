import type { Metadata } from 'next';
import { languages, defaultLanguage, getLanguage } from '@/config/languages';
import { getMessages, type Messages } from './messages';

export async function generateLocaleMetadata(
  locale: string,
  namespace: keyof Messages = 'Home'
): Promise<Metadata> {
  const meta = getMessages(locale)[namespace] as Messages['Home'];

  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aossie.org';
  const siteUrl = rawSiteUrl.replace(/\/$/, '');
  const urlFor = (code: string) => (code === defaultLanguage ? siteUrl : `${siteUrl}/${code}`);
  const localeUrl = urlFor(locale);

  return {
    title: meta.metaTitle,
    description: meta.metaDescription,
    alternates: {
      canonical: localeUrl,
      languages: Object.fromEntries(languages.map((lang) => [lang.code, urlFor(lang.code)])),
    },
    openGraph: {
      title: meta.metaTitle,
      description: meta.metaDescription,
      url: localeUrl,
      siteName: 'AOSSIE',
      images: [
        {
          url: `${siteUrl}/brand/icons/aossie_logo.svg`,
          width: 500,
          height: 500,
          alt: 'AOSSIE Logo',
        },
      ],
      locale: getLanguage(locale).ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.metaTitle,
      description: meta.metaDescription,
      images: [`${siteUrl}/brand/icons/aossie_logo.svg`],
    },
  };
}
