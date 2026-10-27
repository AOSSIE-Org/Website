import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import {
  getAllProjects,
  getLastActivity,
  getOrganization,
  getProjectStars,
  getRepoStars,
  githubUrl,
  hasOwnDiscordChannel,
  ORGANIZATION_GITHUB,
  type Project,
} from '../lib/projectsData';
import { REPO_STATS } from '../lib/repoStats';
import { GSOC_APPLY_URL, PARTNER_MAILTO, CONTACT_EMAIL } from '../lib/links';

const projects = getAllProjects();

const project = (fullNames: string[], discordUrl = 'https://discord.gg/x'): Project => ({
  slug: 'p',
  name: 'P',
  description: 'd',
  topics: [],
  themes: [],
  repositories: fullNames.map((fullName) => ({ fullName })),
  discordUrl,
});

describe('project helpers', () => {
  it('builds GitHub URLs from owner/name', () => {
    expect(githubUrl({ fullName: 'AOSSIE-Org/Resonate' })).toBe('https://github.com/AOSSIE-Org/Resonate');
  });

  it('maps the primary repository owner to its organization, defaulting to AOSSIE', () => {
    expect(getOrganization(project(['StabilityNexus/Fate-EVM-Frontend']))).toBe('Stability Nexus');
    expect(getOrganization(project(['DjedAlliance/StablePay']))).toBe('Djed Alliance');
    expect(getOrganization(project(['someone-else/repo']))).toBe('AOSSIE');
  });

  it('distinguishes a project channel from a server invite', () => {
    expect(hasOwnDiscordChannel(project(['a/b'], 'https://discord.com/channels/1/2'))).toBe(true);
    expect(hasOwnDiscordChannel(project(['a/b'], 'https://discord.gg/hjUhu33uAn'))).toBe(false);
  });

  it('counts unknown repositories as 0 stars and no activity', () => {
    const unknown = project(['nobody/nothing']);
    expect(getRepoStars(unknown.repositories[0])).toBe(0);
    expect(getProjectStars(unknown)).toBe(0);
    expect(getLastActivity(unknown)).toBe('');
  });

  it('property: project stars are the sum of its repositories, independent of order', () => {
    const known = Object.keys(REPO_STATS);
    fc.assert(
      fc.property(fc.uniqueArray(fc.constantFrom(...known), { minLength: 1, maxLength: 6 }), (names) => {
        const expected = names.reduce((sum, n) => sum + REPO_STATS[n].stars, 0);
        expect(getProjectStars(project(names))).toBe(expected);
        expect(getProjectStars(project([...names].reverse()))).toBe(expected);
      }),
    );
  });

  it('property: last activity is the most recent push among the repositories', () => {
    const known = Object.keys(REPO_STATS);
    fc.assert(
      fc.property(fc.uniqueArray(fc.constantFrom(...known), { minLength: 1, maxLength: 6 }), (names) => {
        const latest = names.map((n) => REPO_STATS[n].pushedAt).sort().at(-1);
        expect(getLastActivity(project(names))).toBe(latest);
      }),
    );
  });
});

describe('PROJECTS_DATA integrity', () => {
  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('gives every project a repository hosted by one of the three organizations', () => {
    const owners = Object.values(ORGANIZATION_GITHUB).map((url) => url.split('/').pop());
    for (const p of projects) {
      expect(p.repositories.length, p.slug).toBeGreaterThan(0);
      expect(owners, p.slug).toContain(p.repositories[0].fullName.split('/')[0]);
    }
  });

  it('only links Discord over HTTPS', () => {
    for (const p of projects) {
      expect(new URL(p.discordUrl).protocol, p.slug).toBe('https:');
    }
  });
});

describe('links', () => {
  it('points GSoC applicants at the AOSSIE Info repository', () => {
    expect(GSOC_APPLY_URL).toMatch(/^https:\/\/github\.com\/AOSSIE-Org\/Info\//);
  });

  it('builds a pre-filled, encoded partner email', () => {
    const url = new URL(PARTNER_MAILTO);
    expect(url.protocol).toBe('mailto:');
    expect(url.pathname).toBe(CONTACT_EMAIL);
    expect(url.searchParams.get('subject')).toBe('Partnering with AOSSIE');
  });
});

describe('getProjectText', () => {
  it('returns the localized text when a translation exists and English otherwise', async () => {
    const { getProjectText, PROJECT_TRANSLATIONS } = await import('../lib/projectTranslations');
    const [locale, bySlug] = Object.entries(PROJECT_TRANSLATIONS).find(([, t]) => Object.keys(t).length > 0)!;
    const translated = projects.find((p) => bySlug[p.slug])!;
    expect(getProjectText(translated, locale).description).toBe(bySlug[translated.slug].description);
    expect(getProjectText(translated, 'xx')).toEqual({ description: translated.description, about: translated.about });
  });
});
