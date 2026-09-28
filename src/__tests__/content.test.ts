import { describe, it, expect } from 'vitest';
import en from '../messages/en.json';
import hi from '../messages/hi.json';
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

describe('Translations', () => {
  it('has the same keys in every locale', () => {
    expect(flatKeys(hi).sort()).toEqual(flatKeys(en).sort());
  });

  it('has Hindi text for every project', () => {
    for (const project of PROJECTS_DATA) {
      const text = getProjectText(project, 'hi');
      expect(text.description, project.slug).not.toBe(project.description);
      if (project.about) expect(text.about, project.slug).not.toBe(project.about);
    }
  });

  it('does not use em dashes in site copy', () => {
    const copy = [
      ...flatValues(en),
      ...flatValues(hi),
      ...PROJECTS_DATA.flatMap((p) => [p.description, p.about ?? '']),
      ...PROJECTS_DATA.flatMap((p) => Object.values(getProjectText(p, 'hi'))),
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
