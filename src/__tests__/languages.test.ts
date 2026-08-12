import { describe, it, expect } from 'vitest';
import { languages, defaultLanguage } from '../config/languages';

describe('Languages Configuration & i18n Data', () => {
  it('should include English and Hindi as supported languages', () => {
    expect(languages).toHaveLength(2);
    expect(languages[0].code).toBe('en');
    expect(languages[1].code).toBe('hi');
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
