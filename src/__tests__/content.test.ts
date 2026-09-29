import { describe, it, expect } from 'vitest';
import { languages, defaultLanguage } from '../config/languages';
import { MESSAGES } from '../i18n/messages';
import { PROJECTS_DATA, TOPICS, THEMES } from '../lib/projectsData';
import { getProjectText } from '../lib/projectTranslations';
import { REPO_STATS } from '../lib/repoStats';

type Messages = Record<string, unknown>;

function flatKeys(obj: Messages, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) =>
    value && typeof value === 'object' ? flatKeys(value as Messages, `${prefix}${key}.`) : [`${prefix}${key}`]
  );
}

function flatValues(obj: Messages): string[] {
  return Object.values(obj).flatMap((value) =>
    value && typeof value === 'object' ? flatValues(value as Messages) : [String(value)]
  );
}

const en = MESSAGES[defaultLanguage];
const otherLocales = languages.map((lang) => lang.code).filter((code) => code !== defaultLanguage);

/** ICU placeholders such as `{count}` or `{count, plural`, and rich-text tags such as `<mark>`, in a message. */
function placeholders(message: string): string[] {
  const args = [...message.matchAll(/\{(\w+)(?:\}|,\s*(\w+))/g)].map((m) => m.slice(1).filter(Boolean).join(','));
  const tags = [...message.matchAll(/<\/?(\w+)>/g)].map((m) => m[0]);
  return [...args, ...tags].sort();
}

describe.each(otherLocales)('Translations (%s)', (locale) => {
  const messages = MESSAGES[locale];

  it('has the same keys as English', () => {
    expect(flatKeys(messages).sort()).toEqual(flatKeys(en).sort());
  });

  it('keeps the same ICU placeholders as English', () => {
    for (const [section, keys] of Object.entries(en)) {
      for (const [key, value] of Object.entries(keys)) {
        const translated = (messages as Record<string, Record<string, string>>)[section][key];
        expect(placeholders(translated), `${section}.${key}`).toEqual(placeholders(value));
      }
    }
  });

  it('has translated text for every project', () => {
    for (const project of PROJECTS_DATA) {
      const text = getProjectText(project, locale);
      expect(text.description, project.slug).not.toBe(project.description);
      if (project.about) expect(text.about, project.slug).not.toBe(project.about);
    }
  });
});

describe('Site copy', () => {
  it('does not use em dashes', () => {
    const copy = [
      ...Object.values(MESSAGES).flatMap((messages) => flatValues(messages)),
      ...PROJECTS_DATA.flatMap((p) => [p.description, p.about ?? '']),
      ...otherLocales.flatMap((locale) => PROJECTS_DATA.flatMap((p) => Object.values(getProjectText(p, locale)))),
    ];
    expect(copy.filter((s) => s?.includes('—'))).toEqual([]);
  });
});

describe('Project data', () => {
  it('has unique slugs', () => {
    const slugs = PROJECTS_DATA.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('uses only known topics and themes, and has at least one repository', () => {
    for (const project of PROJECTS_DATA) {
      expect(project.repositories.length, project.slug).toBeGreaterThan(0);
      project.topics.forEach((topic) => expect(TOPICS).toContain(topic));
      project.themes.forEach((theme) => expect(THEMES).toContain(theme));
    }
  });

  it('has GitHub stats for every repository', () => {
    const missing = PROJECTS_DATA.flatMap((p) => p.repositories.map((r) => r.fullName)).filter((name) => !REPO_STATS[name]);
    expect(missing).toEqual([]);
  });
});
