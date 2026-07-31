export interface Language {
  code: string;
  name: string;
  localName: string;
}

export const languages = [
  { code: 'en', name: 'English', localName: 'English' },
  { code: 'hi', name: 'Hindi', localName: 'हिन्दी' },
] as const satisfies readonly Language[];

export type Locale = (typeof languages)[number]['code'];

export const defaultLanguage: Locale = 'en';

