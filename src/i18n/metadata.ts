import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateLocaleMetadata(
  locale: string,
  namespace: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aossie.org';
  const siteUrl = rawSiteUrl.replace(/\/$/, '');
  const localeUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`;


  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: localeUrl,
      languages: {
        en: siteUrl,
        hi: `${siteUrl}/hi`,
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
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
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [`${siteUrl}/brand/icons/aossie_logo.svg`],
    },
  };
}
