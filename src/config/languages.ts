export interface Language {
  code: string;
  name: string;
  localName: string;
  /** Text direction of the script. */
  dir: 'ltr' | 'rtl';
  /** Open Graph locale (language_TERRITORY). */
  ogLocale: string;
}

/**
 * Supported interface languages: the most widely spoken languages in the world,
 * followed by major African languages and te reo Māori.
 */
export const languages = [
  { code: 'en', name: 'English', localName: 'English', dir: 'ltr', ogLocale: 'en_US' },
  { code: 'zh', name: 'Chinese (Simplified)', localName: '简体中文', dir: 'ltr', ogLocale: 'zh_CN' },
  { code: 'hi', name: 'Hindi', localName: 'हिन्दी', dir: 'ltr', ogLocale: 'hi_IN' },
  { code: 'es', name: 'Spanish', localName: 'Español', dir: 'ltr', ogLocale: 'es_ES' },
  { code: 'fr', name: 'French', localName: 'Français', dir: 'ltr', ogLocale: 'fr_FR' },
  { code: 'ar', name: 'Arabic', localName: 'العربية', dir: 'rtl', ogLocale: 'ar_AR' },
  { code: 'bn', name: 'Bengali', localName: 'বাংলা', dir: 'ltr', ogLocale: 'bn_BD' },
  { code: 'pt', name: 'Portuguese', localName: 'Português', dir: 'ltr', ogLocale: 'pt_BR' },
  { code: 'ru', name: 'Russian', localName: 'Русский', dir: 'ltr', ogLocale: 'ru_RU' },
  { code: 'ur', name: 'Urdu', localName: 'اردو', dir: 'rtl', ogLocale: 'ur_PK' },
  { code: 'sw', name: 'Swahili', localName: 'Kiswahili', dir: 'ltr', ogLocale: 'sw_KE' },
  { code: 'ha', name: 'Hausa', localName: 'Hausa', dir: 'ltr', ogLocale: 'ha_NG' },
  { code: 'mi', name: 'Māori', localName: 'Te Reo Māori', dir: 'ltr', ogLocale: 'mi_NZ' },
] as const satisfies readonly Language[];

export type Locale = (typeof languages)[number]['code'];

export const defaultLanguage: Locale = 'en';

export function getLanguage(code: string): (typeof languages)[number] {
  return languages.find((lang) => lang.code === code) ?? languages[0];
}
