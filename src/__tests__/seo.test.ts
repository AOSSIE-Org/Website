import { describe, it, expect, vi, afterEach } from 'vitest';
import fc from 'fast-check';
import sitemap from '../app/sitemap';
import { languages, defaultLanguage } from '../config/languages';
import { MESSAGES } from '../i18n/messages';
import {
  generateLocaleMetadata,
  generatePageMetadata,
  getSiteUrl,
  OG_IMAGE,
  PAGE_META,
  type PageKey,
} from '../i18n/metadata';

const SITE = 'https://aossie.org';
const codes = languages.map((l) => l.code);
const pages = Object.keys(PAGE_META) as PageKey[];

afterEach(() => vi.unstubAllEnvs());

describe('generateLocaleMetadata', () => {
  it.each(codes)('uses the %s home catalog for title and description', async (code) => {
    const meta = await generateLocaleMetadata(code);
    expect(meta.title).toBe(MESSAGES[code].Home.metaTitle);
    expect(meta.description).toBe(MESSAGES[code].Home.metaDescription);
  });

  it('points the canonical at the prefixed URL that is actually served and listed in the sitemap', async () => {
    const meta = await generateLocaleMetadata('en');
    expect(meta.alternates?.canonical).toBe(`${SITE}/en`);
    expect(sitemap().map((e) => e.url)).toContain(meta.alternates?.canonical);
  });

  it('declares an hreflang alternate for every language plus x-default', async () => {
    const meta = await generateLocaleMetadata('fr');
    const alternates = meta.alternates?.languages as Record<string, string>;
    expect(Object.keys(alternates).sort()).toEqual([...codes, 'x-default'].sort());
    expect(alternates['x-default']).toBe(`${SITE}/${defaultLanguage}`);
  });

  it('shares a 1200x630 raster image, because social platforms ignore SVG previews', async () => {
    const meta = await generateLocaleMetadata('en');
    const [image] = meta.openGraph?.images as { url: string; width: number; height: number }[];
    expect(image).toMatchObject({ url: `${SITE}${OG_IMAGE.path}`, width: 1200, height: 630 });
    expect(image.url).not.toMatch(/\.svg$/);
    expect(meta.twitter).toMatchObject({ card: 'summary_large_image', images: [image.url] });
  });

  it('sets the Open Graph locale from the language table, including RTL languages', async () => {
    expect((await generateLocaleMetadata('ar')).openGraph).toMatchObject({ locale: 'ar_AR' });
    expect((await generateLocaleMetadata('zh')).openGraph).toMatchObject({ locale: 'zh_CN' });
  });
});

describe('generatePageMetadata', () => {
  it.each(pages)('gives /%s its own title, description and canonical', async (page) => {
    const { path, namespace } = PAGE_META[page];
    const meta = await generatePageMetadata('en', page);
    expect(meta.title).toBe(`${MESSAGES.en[namespace].title} | AOSSIE`);
    expect(meta.description).toBe(MESSAGES.en[namespace].subtitle);
    expect(meta.alternates?.canonical).toBe(`${SITE}/en${path}`);
    expect(meta.openGraph).toMatchObject({ url: `${SITE}/en${path}` });
  });

  it('never reuses the home page canonical or title for a sub-page', async () => {
    const home = await generateLocaleMetadata('en');
    for (const page of pages) {
      const meta = await generatePageMetadata('en', page);
      expect(meta.alternates?.canonical).not.toBe(home.alternates?.canonical);
      expect(meta.title).not.toBe(home.title);
    }
  });

  it('property: every page/locale canonical is a sitemap URL, and its alternates stay on the same path', async () => {
    const sitemapUrls = new Set(sitemap().map((e) => e.url));
    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...pages), fc.constantFrom(...codes), async (page, code) => {
        const meta = await generatePageMetadata(code, page);
        expect(sitemapUrls.has(meta.alternates?.canonical as string)).toBe(true);
        for (const url of Object.values(meta.alternates?.languages as Record<string, string>)) {
          expect(url.endsWith(PAGE_META[page].path)).toBe(true);
        }
      }),
    );
  });
});

describe('getSiteUrl', () => {
  it('defaults to the production domain', () => {
    expect(getSiteUrl()).toBe(SITE);
  });

  it('honours NEXT_PUBLIC_SITE_URL and strips one trailing slash', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://preview.example.org/');
    expect(getSiteUrl()).toBe('https://preview.example.org');
  });
});

describe('locale fallbacks', () => {
  it('falls back to English metadata and Open Graph locale for an unknown locale', async () => {
    const meta = await generateLocaleMetadata('xx');
    expect(meta.title).toBe(MESSAGES.en.Home.metaTitle);
    expect(meta.openGraph).toMatchObject({ locale: 'en_US' });
  });
});
