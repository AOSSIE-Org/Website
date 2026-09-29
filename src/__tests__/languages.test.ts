import { describe, it, expect } from 'vitest';
import { languages, defaultLanguage } from '../config/languages';

describe('Languages Configuration & i18n Data', () => {
  it('should list English first, followed by every other supported language', () => {
    expect(languages.map((lang) => lang.code)).toEqual([
      'en', 'zh', 'hi', 'es', 'fr', 'ar', 'bn', 'pt', 'ru', 'ur', 'sw', 'ha', 'mi',
    ]);
  });

  it('should have unique language codes', () => {
    const codes = languages.map((lang) => lang.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it('should render Arabic and Urdu right-to-left and everything else left-to-right', () => {
    const rtl = languages.filter((lang) => lang.dir === 'rtl').map((lang) => lang.code);
    expect(rtl).toEqual(['ar', 'ur']);
  });

  it('should have default language set to English (en)', () => {
    expect(defaultLanguage).toBe('en');
  });

  it('should have non-empty name and localName attributes for each language', () => {
    languages.forEach((lang) => {
      expect(lang.code).toBeTruthy();
      expect(lang.name).toBeTruthy();
      expect(lang.localName).toBeTruthy();
    });
  });
});
