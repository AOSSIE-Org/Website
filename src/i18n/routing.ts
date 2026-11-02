import { defineRouting } from 'next-intl/routing';
import { languages, defaultLanguage } from '@/config/languages';

export const routing = defineRouting({
  locales: languages.map((lang) => lang.code),
  defaultLocale: defaultLanguage,
  localePrefix: 'always',
  // The locale lives in the URL, so no NEXT_LOCALE cookie is needed; switching language would otherwise
  // write one, and the Privacy Policy says the site stores nothing but the theme preference.
  localeCookie: false,
});
