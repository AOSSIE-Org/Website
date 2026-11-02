/**
 * Property tests (fast-check): invariants that must hold for every input in a generated range,
 * not only for the examples in the other test files.
 */
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createTranslator } from 'next-intl';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { parseLegalMarkdown, renderLegalInline, resolveLegalHref, type LegalBlock } from '@/lib/legal-markdown';
import ProjectLogo from '@/components/ProjectLogo';
import HubDiagram3D from '@/components/HubDiagram3D';
import Navbar from '@/components/Navbar';
import Stats from '@/components/Stats';
import ProjectsPage from '@/app/[locale]/projects/page';
import { languages } from '@/config/languages';
import { MESSAGES } from '@/i18n/messages';
import { getAllProjects } from '@/lib/projectsData';
import { getProjectText } from '@/lib/projectTranslations';
import { messages, renderWithIntl } from './test-utils/render';
import { router } from './test-utils/next-navigation';

const codes = languages.map((l) => l.code);
const LINKS = { privacy: '/xx/privacy', terms: '/xx/terms' };
const word = fc.stringMatching(/^[a-z]{1,8}$/);
const words = fc.array(word, { minLength: 1, maxLength: 6 }).map((ws) => ws.join(' '));

describe('legal Markdown', () => {
  it('property: a link target is always a site legal page, http(s), mailto, a relative path or dropped', () => {
    const href = fc.oneof(
      fc.string(),
      fc.constantFrom('javascript:', 'data:', 'vbscript:', 'https://', 'http://', 'mailto:', '/', '#', './', 'JavaScript:').chain((prefix) =>
        fc.string().map((rest) => prefix + rest),
      ),
      fc.constantFrom('PRIVACY.md', './PRIVACY.md', 'TERMS.md', './TERMS.md'),
    );
    fc.assert(
      fc.property(href, (h) => {
        const target = resolveLegalHref(h, LINKS);
        if (target === null) return true;
        return target === LINKS.privacy || target === LINKS.terms || /^(https?:|mailto:|\/|#)/i.test(target);
      }),
    );
  });

  it('property: parsing the Markdown of any sequence of headings, paragraphs and lists gives those blocks back', () => {
    const block: fc.Arbitrary<LegalBlock> = fc.oneof(
      fc.record({ type: fc.constant('heading' as const), level: fc.constantFrom(1, 2, 3) as fc.Arbitrary<1 | 2 | 3>, text: words }),
      fc.record({ type: fc.constant('paragraph' as const), text: words }),
      fc.record({ type: fc.constant('list' as const), items: fc.array(words, { minLength: 1, maxLength: 4 }) }),
    );
    const toMarkdown = (b: LegalBlock, bullet: string, eol: string) => {
      if (b.type === 'heading') return `${'#'.repeat(b.level)} ${b.text}`;
      if (b.type === 'list') return b.items.map((item) => `${bullet} ${item}`).join(eol);
      // Paragraph lines are joined with spaces, so a paragraph may be wrapped anywhere
      return b.text.split(' ').join(eol);
    };
    fc.assert(
      fc.property(fc.array(block, { maxLength: 8 }), fc.constantFrom('*', '-'), fc.constantFrom('\n', '\r\n'), (blocks, bullet, eol) => {
        const source = blocks.map((b) => toMarkdown(b, bullet, eol)).join(eol + eol);
        expect(parseLegalMarkdown(source)).toEqual(blocks);
      }),
    );
  });

  it('property: inline formatting only changes markup, never the visible text', () => {
    // Link targets without parentheses: the parser ends a target at the first ")"
    const segment = fc.oneof(
      words.map((text) => ({ md: text, text })),
      words.map((text) => ({ md: `**${text}**`, text })),
      words.map((text) => ({ md: `\`${text}\``, text })),
      fc.tuple(words, fc.constantFrom('https://aossie.org', 'mailto:a@b.c', 'PRIVACY.md', 'javascript:void0')).map(([text, href]) => ({
        md: `[${text}](${href})`,
        text,
      })),
    );
    fc.assert(
      fc.property(fc.array(segment, { minLength: 1, maxLength: 6 }), (segments) => {
        const markup = renderToStaticMarkup(<p>{renderLegalInline(segments.map((s) => s.md).join(' '), LINKS)}</p>);
        const el = document.createElement('div');
        el.innerHTML = markup;
        expect(el.textContent).toBe(segments.map((s) => s.text).join(' '));
        expect(markup).not.toContain('javascript:');
      }),
    );
  });
});

describe('ProjectLogo monogram', () => {
  it('property: any project name without a logo gets a one- or two-letter monogram taken from the name', () => {
    const name = fc.string({ unit: 'grapheme-ascii', minLength: 1, maxLength: 30 });
    fc.assert(
      fc.property(name, (n) => {
        const { container, unmount } = render(<ProjectLogo project={{ name: n }} />);
        const monogram = container.querySelector('span[aria-hidden]')!.textContent!;
        unmount();
        expect(monogram.length).toBeGreaterThanOrEqual(1);
        expect(monogram.length).toBeLessThanOrEqual(2);
        expect(monogram).toBe(monogram.toUpperCase());
        for (const char of monogram) expect(n.toUpperCase()).toContain(char);
      }),
    );
  });
});

describe('HubDiagram3D', () => {
  it('property: any logo list fills the six satellites in order, keeping the defaults for gaps', () => {
    const defaults = [...render(<HubDiagram3D />).container.querySelectorAll('image')].slice(0, 6).map((i) => i.getAttribute('href'));
    cleanup();
    const logo = fc.option(fc.constantFrom('/brand/project_svgs/pictopy_logo.svg', '/brand/project_svgs/rein_logo.svg', '/x/unknown.svg'), {
      nil: undefined,
    });
    fc.assert(
      fc.property(fc.array(logo, { maxLength: 9 }), (logos) => {
        const { container, unmount } = render(<HubDiagram3D logos={logos} />);
        const images = [...container.querySelectorAll('image')].map((i) => i.getAttribute('href'));
        const stops = [...container.querySelectorAll('linearGradient[id^="rimGrad"] stop')].map((s) => s.getAttribute('stop-color'));
        unmount();
        expect(images).toHaveLength(7);
        expect(images.slice(0, 6)).toEqual(defaults.map((d, i) => logos[i] || d));
        expect(stops).toHaveLength(12);
        stops.forEach((color) => expect(color).toMatch(/^#[0-9A-F]{6}$/i));
      }),
    );
  });
});

describe('message catalogs', () => {
  /** Rich-text tags used in the catalogs, rendered as plain text for this check. */
  const tags = { mark: (c: string) => c, highlight: (c: string) => c };
  const keys = Object.entries(MESSAGES.en).flatMap(([namespace, entries]) => Object.keys(entries).map((key) => `${namespace}.${key}`));

  it('property: every message formats in every locale for any argument values, leaving no placeholder behind', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...codes),
        fc.constantFrom(...keys),
        fc.nat({ max: 100000 }),
        fc.stringMatching(/^[A-Za-z][A-Za-z ]{0,15}$/),
        (locale, key, number, name) => {
          const t = createTranslator({ locale, messages: MESSAGES[locale as keyof typeof MESSAGES] });
          const args = { count: number, year: number, projects: number, index: number, name, ...tags };
          const text = t.markup(key as never, args as never);
          expect(text.length).toBeGreaterThan(0);
          expect(text).not.toMatch(/[{}]/);
          if (/\{name\}/.test(String(t.raw(key as never)))) {
            expect(text).toContain(name);
          }
        },
      ),
      { numRuns: 300 },
    );
  });
});

describe('Navbar language menu', () => {
  it('property: choosing a language keeps the page and switches only when the language changes', () => {
    const page = fc.constantFrom('', '/about', '/projects', '/programs', '/privacy', '/terms', '/support');
    fc.assert(
      fc.property(fc.constantFrom(...codes), fc.constantFrom(...codes), page, (current, target, path) => {
        router.replace.mockReset();
        const { unmount } = renderWithIntl(<Navbar />, { locale: current, path });
        fireEvent.click(screen.getByRole('button', { name: messages(current).Navbar.selectLanguage }));
        const option = screen.getAllByRole('button').find((b) => b.getAttribute('lang') === target)!;
        fireEvent.click(option);
        unmount();
        if (current === target) expect(router.replace).not.toHaveBeenCalled();
        else expect(router.replace).toHaveBeenCalledWith(`/${target}${path}`);
      }),
      { numRuns: 40 },
    );
  }, 60_000);
});

describe('Stats card stack', () => {
  it('property: after any sequence of swipes and arrow keys the top card is the model’s', () => {
    const t = messages('en').Stats;
    const labels = [
      `${t.mainStatTitle}: ${t.mainStatValue}. ${t.mainStatDesc}`,
      `${t.stat1Label}: ${t.stat1Value}. ${t.stat1Desc}`,
      `${t.stat2Label}: ${t.stat2Value}. ${t.stat2Desc}`,
      `${t.stat3Label}: ${t.stat3Value}. ${t.stat3Desc}`,
    ];
    const move = fc.oneof(
      fc.integer({ min: -300, max: 300 }).map((offset) => ({ kind: 'swipe' as const, offset })),
      fc.constantFrom('ArrowLeft', 'ArrowRight').map((key) => ({ kind: 'key' as const, key })),
    );
    fc.assert(
      fc.property(fc.array(move, { maxLength: 12 }), (moves) => {
        const { unmount } = renderWithIntl(<Stats />);
        let model = 0;
        for (const m of moves) {
          const top = document.querySelector('[data-drag="x"]') as HTMLElement;
          if (m.kind === 'key') {
            fireEvent.keyDown(top, { key: m.key });
            model += m.key === 'ArrowRight' ? 1 : -1;
          } else {
            fireEvent.dragEnd(top, { dataTransfer: { offset: { x: m.offset, y: 0 }, velocity: { x: 0, y: 0 } } });
            if (m.offset < -50) model += 1;
            else if (m.offset > 50) model -= 1;
          }
        }
        const top = document.querySelector('[data-drag="x"]');
        unmount();
        expect(top).toHaveAttribute('aria-label', labels[((model % 4) + 4) % 4]);
      }),
      { numRuns: 30 },
    );
  }, 60_000);
});

describe('Projects page search', () => {
  it('property: any query shows exactly the projects whose name, description or repositories contain it', () => {
    const all = getAllProjects();
    renderWithIntl(<ProjectsPage />);
    const input = within(document.querySelector('input[type="search"]')!.parentElement!).getByRole('searchbox');
    // Queries drawn from real names, descriptions and repositories, plus arbitrary text
    const fragment = fc
      .tuple(
        fc.constantFrom(...all.flatMap((p) => [p.name, p.description, ...p.repositories.map((r) => r.fullName)])),
        fc.nat(),
        fc.integer({ min: 1, max: 8 }),
      )
      .map(([source, start, length]) => source.slice(start % source.length, (start % source.length) + length));
    const query = fc.oneof(fragment, fragment.map((q) => q.toUpperCase()), fc.string({ maxLength: 4 }), fragment.map((q) => `  ${q} `));

    fc.assert(
      fc.property(query, (q) => {
        fireEvent.change(input, { target: { value: q } });
        const needle = q.toLowerCase().trim();
        const expected = all
          .filter(
            (p) =>
              !needle ||
              p.name.toLowerCase().includes(needle) ||
              getProjectText(p, 'en').description.toLowerCase().includes(needle) ||
              p.repositories.some((r) => r.fullName.toLowerCase().includes(needle)),
          )
          .map((p) => p.name)
          .sort();
        const shown = [...document.querySelectorAll('article h3')].map((h) => h.textContent!).sort();
        expect(shown).toEqual(expected);
      }),
      { numRuns: 40 },
    );
  }, 60_000);
});
