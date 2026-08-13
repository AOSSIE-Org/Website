import { getRequestConfig } from 'next-intl/server';
import enMessages from '../messages/en.json';
import hiMessages from '../messages/hi.json';
import { routing } from './routing';

const messagesMap: Record<string, Record<string, unknown>> = {
  en: enMessages as Record<string, unknown>,
  hi: hiMessages as Record<string, unknown>,
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messagesMap[locale] || enMessages,
  };
});
