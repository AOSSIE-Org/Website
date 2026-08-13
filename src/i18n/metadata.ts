import type { Metadata } from 'next';
import enMessages from '../messages/en.json';
import hiMessages from '../messages/hi.json';

const messagesMap: Record<string, typeof enMessages> = {
  en: enMessages,
  hi: hiMessages,
};

export async function generateLocaleMetadata(
  locale: string,
  namespace: keyof typeof enMessages = 'Home'
): Promise<Metadata> {
  const messages = messagesMap[locale] || enMessages;
  const meta = (messages[namespace] as typeof enMessages.Home) || enMessages.Home;

  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aossie.org';
  const siteUrl = rawSiteUrl.replace(/\/$/, '');
  const localeUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`;

  return {
    title: meta.metaTitle,
    description: meta.metaDescription,
    alternates: {
      canonical: localeUrl,
      languages: {
        en: siteUrl,
        hi: `${siteUrl}/hi`,
      },
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
      locale: locale === 'en' ? 'en_US' : 'hi_IN',
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
