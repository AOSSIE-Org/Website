import { act, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '@/app/[locale]/page';
import AboutPage from '@/app/[locale]/about/page';
import ProgramsPage from '@/app/[locale]/programs/page';
import PageWrapper from '@/components/PageWrapper';
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  DJED_URL,
  GSOC_APPLY_URL,
  GSOC_URL,
  PARTNER_MAILTO,
  STABILITY_NEXUS_URL,
} from '@/config/links';
import { SITE_URL } from '@/config/site';
import { AOSSIE_DISCORD_INVITE, ORGANIZATION_GITHUB, getAllProjects, getOrganization } from '@/lib/projectsData';
import { messages, renderWithIntl } from './test-utils/render';
import { MockIntersectionObserver } from './test-utils/browser';
import { holdDynamicImports } from './test-utils/dynamic';

/**
 * Page params as Next.js passes them, already settled: React's `use()` reads a promise marked
 * fulfilled synchronously, so the page renders on the first pass.
 */
function settledParams(locale: string) {
  return Object.assign(Promise.resolve({ locale }), { status: 'fulfilled', value: { locale } });
}

/** Loads the lazily imported home page sections inside act, so React shows them. */
async function loadSections() {
  await act(async () => {
    await import('@/components/Projects');
    await import('@/components/Stats');
  });
  // React may retry the suspended sections on its own schedule once their modules have loaded
  await waitFor(() => {
    expect(document.getElementById('projects')).not.toBeNull();
    expect(document.querySelectorAll('main h2').length).toBeGreaterThanOrEqual(3);
  });
}

/** Renders the home page with its lazy sections loaded. */
async function renderHome(locale: string) {
  let result!: ReturnType<typeof renderWithIntl>;
  await act(async () => {
    result = renderWithIntl(<Home params={settledParams(locale)} />, { locale });
  });
  await loadSections();
  return result;
}

describe('Home page', () => {
  // Runs first: the lazily loaded sections stay loaded for the rest of the file
  it('shows placeholders for the lazily loaded sections, then the sections themselves', async () => {
    const release = holdDynamicImports();
    await act(async () => {
      renderWithIntl(<Home params={settledParams('en')} />);
    });
    const [, projects, , stats] = [...screen.getByRole('main').children];
    // Placeholders: same height as the sections, with pulsing shapes, and no content yet
    expect(projects).toHaveClass('h-[420vh]');
    expect(projects.id).toBe('');
    expect(projects.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
    expect(stats.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);

    release();
    await loadSections();
    const t = messages('en');
    expect(screen.getByRole('heading', { level: 2, name: t.Projects.title }).closest('section')).toHaveAttribute('id', 'projects');
    expect(screen.getByRole('heading', { level: 2, name: t.Stats.title })).toBeInTheDocument();
  });

  it('assembles the navbar, hero, sponsors and footer in the page language', async () => {
    const t = messages('hi');
    await renderHome('hi');
    const main = screen.getByRole('main');
    expect(within(main).getByRole('heading', { level: 1 })).toHaveTextContent(t.Hero.titleLine1);
    expect(within(main).getByRole('heading', { level: 2, name: t.Sponsors.title })).toBeInTheDocument();
    expect(within(main).getByRole('heading', { level: 2, name: t.Stats.title })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: t.Navbar.about })[0]).toHaveAttribute('href', '/hi/about');
    expect(screen.getByRole('contentinfo')).not.toContainElement(main);
    expect(within(screen.getByRole('contentinfo')).getByText(t.Footer.addressText)).toBeInTheDocument();
  });

  it('publishes schema.org data for the page in its language', async () => {
    const { container } = await renderHome('fr');
    const script = container.querySelector('script#schema-jsonld')!;
    expect(script).toHaveAttribute('type', 'application/ld+json');
    expect(JSON.parse(script.innerHTML)).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'AOSSIE Website',
      description: messages('fr').Home.metaDescription,
      publisher: {
        '@type': 'Organization',
        name: 'AOSSIE',
        url: SITE_URL,
        logo: `${SITE_URL}/brand/icons/aossie_logo.svg`,
      },
      inLanguage: 'fr',
    });
  });
});

describe('PageWrapper', () => {
  it('places the page content in the main landmark between the navbar and the footer', () => {
    renderWithIntl(
      <PageWrapper>
        <p>Page body</p>
      </PageWrapper>,
    );
    const main = screen.getByRole('main');
    expect(within(main).getByText('Page body')).toBeInTheDocument();
    const nav = screen.getAllByRole('navigation')[0];
    expect(nav.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(main.compareDocumentPosition(screen.getByRole('contentinfo')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});

describe('About page', () => {
  const t = messages('en').AboutPage;
  const timeline = messages('en').Timeline;
  const team = messages('en').Team;

  it('introduces AOSSIE with its key facts', () => {
    renderWithIntl(<AboutPage />, { path: '/about' });
    expect(screen.getByRole('heading', { level: 1, name: t.title })).toBeInTheDocument();
    const facts = Object.fromEntries(
      [...document.querySelectorAll('dl > div')].map((div) => [div.querySelector('dt')!.textContent, div.querySelector('dd')!.textContent]),
    );
    expect(facts).toEqual({
      [t.foundedLabel]: '2016',
      [t.statusLabel]: t.statusValue,
      ABN: '32 743 493 466',
      [t.baseLabel]: t.baseValue,
      [t.licenseLabel]: t.licenseValue,
    });
  });

  it('lists the pillars and the community roles', () => {
    renderWithIntl(<AboutPage />, { path: '/about' });
    expect(screen.getByRole('heading', { level: 2, name: t.pillarsTitle })).toBeInTheDocument();
    for (const title of [t.p1Title, t.p2Title, t.p3Title]) {
      expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument();
    }
    const roles = [team.r1Title, team.r2Title, team.r3Title, team.r4Title].map(
      (title) => screen.getByRole('heading', { level: 3, name: title }).closest('article')!,
    );
    expect(roles.map((role) => role.querySelector('.tabular-nums')!.textContent)).toEqual(['10', '70', '160+', '8,000+']);
  });

  it('follows the milestone in the middle of the viewport', () => {
    renderWithIntl(<AboutPage />, { path: '/about' });
    const items = screen.getAllByRole('listitem').filter((li) => li.hasAttribute('data-index'));
    expect(items).toHaveLength(6);
    expect(within(items[0]).getByRole('heading', { name: timeline.m1Title })).toBeInTheDocument();
    expect(items[0]).toHaveClass('lg:opacity-100');

    const observer = MockIntersectionObserver.instances.find((o) => o.options?.rootMargin === '-45% 0px -45% 0px')!;
    expect(observer.observed).toEqual(items);
    act(() => observer.trigger(false, [items[4]]));
    expect(items[0]).toHaveClass('lg:opacity-100');

    act(() => observer.trigger(true, [items[3]]));
    expect(items[3]).toHaveClass('lg:opacity-100');
    expect(items[0]).toHaveClass('lg:opacity-50');
    expect(document.querySelector('.text-\\[7\\.5rem\\]')).toHaveTextContent('2017');
  });

  it('presents each sponsor and partner with its role, links and project count', () => {
    renderWithIntl(<AboutPage />, { path: '/about' });
    const card = (name: string) => screen.getByRole('heading', { level: 3, name }).closest('li')!;

    const gsoc = card('Google Summer of Code');
    expect(within(gsoc).getByText(t.gsocRole)).toBeInTheDocument();
    expect(within(gsoc).getByText('Since 2016')).toBeInTheDocument();
    expect(within(gsoc).getAllByRole('img', { name: 'Google Summer of Code' })).toHaveLength(2);
    expect(within(gsoc).getByRole('link', { name: new RegExp(t.partnerWebsite) })).toHaveAttribute('href', GSOC_URL);
    expect(within(gsoc).queryByRole('link', { name: /GitHub/ })).toBeNull();

    for (const [name, website] of [
      ['Stability Nexus', STABILITY_NEXUS_URL],
      ['Djed Alliance', DJED_URL],
    ] as const) {
      const partner = card(name);
      const count = getAllProjects().filter((p) => getOrganization(p) === name).length;
      expect(within(partner).getByText(`${count} projects in its repositories`)).toBeInTheDocument();
      expect(within(partner).queryByText(/^Since/)).toBeNull();
      expect(within(partner).getAllByRole('img')).toHaveLength(1);
      expect(within(partner).getByRole('link', { name: new RegExp(t.partnerWebsite) })).toHaveAttribute('href', website);
      expect(within(partner).getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', ORGANIZATION_GITHUB[name]);
    }
  });

  it('explains how organizations can get involved', () => {
    renderWithIntl(<AboutPage />, { path: '/about' });
    const partners = document.getElementById('partners')!;
    for (const title of [t.way1Title, t.way2Title, t.way3Title]) {
      expect(within(partners).getByRole('heading', { level: 4, name: title })).toBeInTheDocument();
    }
    expect(within(partners).getByRole('link', { name: new RegExp(t.waysCta) })).toHaveAttribute('href', PARTNER_MAILTO);
    expect(within(partners).getByRole('link', { name: CONTACT_EMAIL })).toHaveAttribute('href', CONTACT_MAILTO);
  });

  it('is translated', () => {
    const hi = messages('hi');
    renderWithIntl(<AboutPage />, { locale: 'hi', path: '/about' });
    expect(screen.getByRole('heading', { level: 1, name: hi.AboutPage.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: hi.Timeline.title })).toBeInTheDocument();
    expect(screen.getByText(hi.AboutPage.partnerSince.replace('{year}', '2016'))).toBeInTheDocument();
  });
});

describe('Programs page', () => {
  const t = messages('en').ProgramsPage;

  it('lists the three programs in order, with a badge only where one applies', () => {
    renderWithIntl(<ProgramsPage />, { path: '/programs' });
    expect(screen.getByRole('heading', { level: 1, name: t.title })).toBeInTheDocument();
    const main = screen.getByRole('main');
    const titles = within(main).getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(titles).toEqual([t.gsocTitle, t.internTitle, t.awocTitle]);

    const cards = titles.map((title) => within(main).getByRole('heading', { level: 2, name: title! }).closest('li')!);
    expect(cards.map((card) => card.querySelector('.font-mono')!.textContent)).toEqual(['01', '02', '03']);
    expect(within(cards[2]).getByText(t.awocBadge)).toBeInTheDocument();
    expect(within(cards[0]).queryByText(t.awocBadge)).toBeNull();
  });

  it('opens web links in a new tab and email links in place', () => {
    renderWithIntl(<ProgramsPage />, { path: '/programs' });
    const main = screen.getByRole('main');
    const apply = within(main).getByRole('link', { name: new RegExp(t.gsocApply) });
    expect(apply).toHaveAttribute('href', GSOC_APPLY_URL);
    expect(apply).toHaveAttribute('target', '_blank');
    const intern = within(main).getByRole('link', { name: new RegExp(t.internCta) });
    expect(intern).toHaveAttribute('href', AOSSIE_DISCORD_INVITE);
    expect(intern).toHaveAttribute('rel', 'noopener noreferrer');
    const awoc = within(main).getByRole('link', { name: new RegExp(t.awocCta) });
    expect(awoc).toHaveAttribute('href', CONTACT_MAILTO);
    expect(awoc).not.toHaveAttribute('target');
  });

  it('is translated', async () => {
    const hi = messages('hi').ProgramsPage;
    renderWithIntl(<ProgramsPage />, { locale: 'hi', path: '/programs' });
    await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: hi.title })).toBeInTheDocument());
    expect(screen.getByRole('link', { name: new RegExp(hi.gsocApply) })).toBeInTheDocument();
  });
});
