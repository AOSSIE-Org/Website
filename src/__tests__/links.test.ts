import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import * as links from '../config/links';
import { SITE_URL } from '../config/site';
import { LEGAL_DOCUMENTS } from '../config/legal';

// Flatten top-level constants and SOCIAL_LINKS entries into [name, value] pairs
const entries = Object.entries(links).flatMap(([name, value]) =>
  typeof value === 'string'
    ? [[name, value] as const]
    : Object.entries(value).map(([key, v]) => [`${name}.${key}`, v] as const),
);

const isEmail = (name: string) => name.endsWith('_EMAIL');
const isMailto = (name: string) => name.endsWith('_MAILTO');

describe('config/links', () => {
  it.each(entries.filter(([name]) => !isEmail(name) && !isMailto(name)))('%s is an https URL', (_, value) => {
    expect(new URL(value).protocol).toBe('https:');
  });

  it.each(entries.filter(([name]) => isMailto(name)))('%s is a mailto link', (_, value) => {
    expect(new URL(value).protocol).toBe('mailto:');
  });

  it.each(entries.filter(([name]) => isEmail(name)))('%s is an email address', (_, value) => {
    expect(value).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/);
  });
});

describe('GITHUB_SPONSORS_URL', () => {
  it('opens the AOSSIE-Org GitHub Sponsors page', () => {
    expect(links.GITHUB_SPONSORS_URL).toBe('https://github.com/sponsors/AOSSIE-Org');
  });
});

describe('config/site', () => {
  it('SITE_URL is an https origin without a trailing slash', () => {
    expect(SITE_URL).toMatch(/^https:\/\//);
    expect(SITE_URL.endsWith('/')).toBe(false);
  });
});

describe('config/legal', () => {
  it.each(Object.entries(LEGAL_DOCUMENTS))('%s renders a Markdown file that exists at the repository root', (_, { file }) => {
    expect(fs.existsSync(path.join(process.cwd(), file))).toBe(true);
  });

  it('gives each document its own page path', () => {
    const paths = Object.values(LEGAL_DOCUMENTS).map((doc) => doc.path);
    expect(new Set(paths).size).toBe(paths.length);
    paths.forEach((p) => expect(p).toMatch(/^\/[a-z]+$/));
  });
});
