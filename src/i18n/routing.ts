import { defineRouting } from 'next-intl/routing';
import { languages, defaultLanguage } from '@/config/languages';

export const routing = defineRouting({
  locales: languages.map((lang) => lang.code),
  defaultLocale: defaultLanguage,
  localePrefix: 'always',
});
