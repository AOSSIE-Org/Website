import { fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectsPage from '@/app/[locale]/projects/page';
import {
  ORGANIZATION_GITHUB,
  getAllProjects,
  getLastActivity,
  getOrganization,
  getProjectStars,
  getRepoStars,
  githubUrl,
} from '@/lib/projectsData';
import { getProjectText } from '@/lib/projectTranslations';
import { messages, renderWithIntl } from './test-utils/render';

const t = messages('en').ProjectsPage;
const ALL = getAllProjects();
const ACTIVE = ALL.filter((p) => !p.archived);
const ARCHIVED = ALL.filter((p) => p.archived);

const byName = (name: string) => ALL.find((p) => p.name === name)!;

/*
 * The page renders every project at once, and role queries over the whole document are slow, so
 * these helpers locate the regions with selectors and use role queries inside them.
 */
const controls = () => document.querySelector('input[type="search"]')!.closest('.rounded-3xl') as HTMLElement;
const resultCount = () => document.querySelector('p[aria-live="polite"]')!.textContent;
/** Project names in the order their cards appear. */
const shownNames = () => [...document.querySelectorAll('article h3')].map((h) => h.textContent!);
const articles = (root: ParentNode = document) => root.querySelectorAll('article');
const group = (label: string) => document.querySelector(`[role="group"][aria-label="${label}"]`) as HTMLElement;
const chip = (label: string, name: RegExp | string) => within(group(label)).getByRole('button', { name });
const region = (label: string) => document.querySelector(`section[aria-label="${label}"]`) as HTMLElement | null;
const regionToggle = (label: string) => within(region(label)!).getAllByRole('button')[0];
const search = (query: string) => fireEvent.change(within(controls()).getByRole('searchbox'), { target: { value: query } });
/** The sort or group dropdown, found by its visible label (a combobox takes no name from its content). */
const combobox = (label: string) =>
  within(controls())
    .getAllByRole('combobox')
    .find((el) => el.firstElementChild?.textContent === label)!;
const choose = (label: string, option: string) => {
  fireEvent.click(combobox(label));
  fireEvent.click(within(controls()).getByRole('option', { name: option }));
};
const directionButton = (label: string) => within(controls()).getByRole('button', { name: `${t.sortDirection}: ${label}` });
const archivedSwitch = () => within(controls()).getByRole('switch');
const textButton = (text: string) => screen.queryByText(text, { selector: 'button' });
const cardOf = (name: string) => [...articles()].find((a) => a.querySelector('h3')?.textContent === name) as HTMLElement;

describe('Projects page: listing and sorting', () => {
  it('lists every project, most starred first, with archived projects last', () => {
    renderWithIntl(<ProjectsPage />);
    expect(screen.getByText(t.title, { selector: 'h1' })).toBeInTheDocument();
    expect(resultCount()).toBe(`${ALL.length} projects`);

    const names = shownNames();
    expect(names).toHaveLength(ALL.length);
    const activeStars = names.slice(0, ACTIVE.length).map((n) => getProjectStars(byName(n)));
    expect(activeStars).toEqual([...activeStars].sort((a, b) => b - a));
    expect(names.slice(ACTIVE.length).every((n) => byName(n).archived)).toBe(true);
  });

  it('hides archived projects with the switch', () => {
    renderWithIntl(<ProjectsPage />);
    expect(archivedSwitch()).toBeChecked();
    expect(archivedSwitch()).toHaveAccessibleName(t.showArchived);
    fireEvent.click(archivedSwitch());
    expect(resultCount()).toBe(`${ACTIVE.length} projects`);
    expect(shownNames().some((n) => byName(n).archived)).toBe(false);
  });

  it('sorts by name A to Z, then Z to A', () => {
    renderWithIntl(<ProjectsPage />);
    fireEvent.click(archivedSwitch());
    choose(t.sortBy, t.sortName);
    expect(combobox(t.sortBy)).toHaveTextContent(t.sortName);
    const aToZ = shownNames();
    expect(aToZ).toEqual([...aToZ].sort((a, b) => a.localeCompare(b)));

    fireEvent.click(directionButton('A → Z'));
    expect(directionButton('Z → A')).toBeInTheDocument();
    expect(shownNames()).toEqual([...aToZ].reverse());
  });

  it('sorts by recent activity and by number of repositories, in either direction', () => {
    renderWithIntl(<ProjectsPage />);
    fireEvent.click(archivedSwitch());

    choose(t.sortBy, t.sortActivity);
    const activity = shownNames().map((n) => getLastActivity(byName(n)));
    expect(activity).toEqual([...activity].sort().reverse());

    choose(t.sortBy, t.sortRepos);
    const repos = shownNames().map((n) => byName(n).repositories.length);
    expect(repos).toEqual([...repos].sort((a, b) => b - a));

    fireEvent.click(directionButton(t.directionDesc));
    const ascending = shownNames().map((n) => byName(n).repositories.length);
    expect(ascending).toEqual([...ascending].sort((a, b) => a - b));
    expect(directionButton(t.directionAsc)).toBeInTheDocument();

    // Choosing a new sort starts again from the descending order
    choose(t.sortBy, t.sortStars);
    expect(directionButton(t.directionDesc)).toBeInTheDocument();
  });

  it('operates the sort menu from the keyboard', () => {
    renderWithIntl(<ProjectsPage />);
    const sort = combobox(t.sortBy);
    fireEvent.keyDown(sort, { key: 'a' });
    expect(sort).toHaveAttribute('aria-expanded', 'false');

    fireEvent.keyDown(sort, { key: 'ArrowDown' });
    expect(sort).toHaveAttribute('aria-expanded', 'true');
    const listbox = within(controls()).getByRole('listbox', { name: t.sortBy });
    expect(sort).toHaveAttribute('aria-controls', listbox.id);
    const options = within(listbox).getAllByRole('option');
    expect(options.map((o) => o.textContent)).toEqual([t.sortStars, t.sortActivity, t.sortName, t.sortRepos]);
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(sort).toHaveAttribute('aria-activedescendant', options[0].id);

    fireEvent.keyDown(sort, { key: 'ArrowUp' });
    expect(sort).toHaveAttribute('aria-activedescendant', options[3].id);
    fireEvent.keyDown(sort, { key: 'ArrowDown' });
    fireEvent.keyDown(sort, { key: 'ArrowDown' });
    fireEvent.keyDown(sort, { key: 'ArrowDown' });
    expect(sort).toHaveAttribute('aria-activedescendant', options[2].id);
    fireEvent.keyDown(sort, { key: 'Enter' });
    expect(sort).toHaveAttribute('aria-expanded', 'false');
    expect(sort).toHaveTextContent(t.sortName);

    fireEvent.keyDown(sort, { key: ' ' });
    fireEvent.mouseEnter(within(controls()).getAllByRole('option')[1]);
    fireEvent.keyDown(sort, { key: ' ' });
    expect(sort).toHaveTextContent(t.sortActivity);

    fireEvent.keyDown(sort, { key: 'Enter' });
    fireEvent.keyDown(sort, { key: 'x' });
    expect(sort).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(sort, { key: 'Escape' });
    expect(sort).toHaveAttribute('aria-expanded', 'false');
    fireEvent.keyDown(sort, { key: 'ArrowUp' });
    fireEvent.keyDown(sort, { key: 'Tab' });
    expect(sort).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the menu on a second click or a click outside, keeping the choice', () => {
    renderWithIntl(<ProjectsPage />);
    const sort = combobox(t.sortBy);
    fireEvent.click(sort);
    fireEvent.mouseDown(within(controls()).getByRole('option', { name: t.sortRepos }));
    expect(sort).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(sort);
    expect(sort).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(sort);
    fireEvent.mouseDown(document.body);
    expect(sort).toHaveAttribute('aria-expanded', 'false');
    expect(sort).toHaveTextContent(t.sortStars);
  });
});

describe('Projects page: search and filters', () => {
  it('searches names, descriptions and repository names, and clears the search', () => {
    renderWithIntl(<ProjectsPage />);
    search('PictoPy');
    expect(shownNames()).toEqual(['PictoPy']);
    expect(resultCount()).toBe('1 project');

    search('thrubox-client');
    expect(shownNames()).toEqual(['ThruBox']);

    fireEvent.click(within(controls()).getByRole('button', { name: t.clearSearch }));
    expect(resultCount()).toBe(`${ALL.length} projects`);
    expect(within(controls()).queryByRole('button', { name: t.clearSearch })).toBeNull();
  });

  it('searches the translated descriptions in the page language', () => {
    renderWithIntl(<ProjectsPage />, { locale: 'hi' });
    expect(within(controls()).getByRole('searchbox')).toHaveAccessibleName(messages('hi').ProjectsPage.searchPlaceholder);
    const word = getProjectText(byName('PictoPy'), 'hi')
      .description.split(' ')
      .find((w) => w.length > 6)!;
    search(word);
    const query = word.toLowerCase();
    const expected = ALL.filter((p) => getProjectText(p, 'hi').description.toLowerCase().includes(query)).length;
    expect(shownNames()).toContain('PictoPy');
    expect(shownNames()).toHaveLength(expected);
  });

  it('filters by organization, counting matches per chip and disabling empty ones', () => {
    renderWithIntl(<ProjectsPage />);
    const nexus = ALL.filter((p) => getOrganization(p) === 'Stability Nexus');
    const nexusChip = chip(t.organizationsLabel, /^Stability Nexus/);
    expect(nexusChip).toHaveTextContent(String(nexus.length));
    fireEvent.click(nexusChip);
    expect(nexusChip).toHaveAttribute('aria-pressed', 'true');
    expect(resultCount()).toBe(`${nexus.length} projects`);
    shownNames().forEach((n) => expect(getOrganization(byName(n))).toBe('Stability Nexus'));

    // Counts for the other dimensions follow the organization filter
    const nexusAi = nexus.filter((p) => p.topics.includes('Artificial Intelligence')).length;
    expect(chip(t.topicsLabel, /^Artificial Intelligence/)).toHaveTextContent(String(nexusAi));

    // PictoPy is an AOSSIE project: nothing matches, but the active chip stays usable
    search('PictoPy');
    expect(chip(t.organizationsLabel, /^Djed Alliance/)).toBeDisabled();
    expect(nexusChip).toBeEnabled();
    expect(screen.getByText(t.noResults)).toBeInTheDocument();

    fireEvent.click(textButton(t.resetFilters)!);
    expect(resultCount()).toBe(`${ALL.length} projects`);
    expect(chip(t.organizationsLabel, /^All/)).toHaveAttribute('aria-pressed', 'true');
    expect(within(controls()).getByRole('searchbox')).toHaveValue('');
  });

  it('filters by topic and theme together', () => {
    renderWithIntl(<ProjectsPage />);
    fireEvent.click(chip(t.topicsLabel, /^Mobile/));
    fireEvent.click(chip(t.themesLabel, /^Communication/));
    const expected = ALL.filter((p) => p.topics.includes('Mobile') && p.themes.includes('Communication'));
    expect(shownNames().sort()).toEqual(expected.map((p) => p.name).sort());
    fireEvent.click(chip(t.themesLabel, /^All/));
    expect(shownNames()).toHaveLength(ALL.filter((p) => p.topics.includes('Mobile')).length);
  });

  it('shows translated filter labels', () => {
    const hi = messages('hi');
    renderWithIntl(<ProjectsPage />, { locale: 'hi' });
    expect(group(hi.ProjectsPage.topicsLabel)).not.toBeNull();
    expect(chip(hi.ProjectsPage.themesLabel, new RegExp(`^${hi.Themes.Finance}`))).toBeInTheDocument();
    expect(chip(hi.ProjectsPage.topicsLabel, new RegExp(`^${hi.ProjectsPage.all}`))).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('Projects page: grouping', () => {
  it('groups by organization with each organization’s mark, count and GitHub link', () => {
    renderWithIntl(<ProjectsPage />);
    choose(t.groupBy, t.organizationsLabel);
    for (const org of ['AOSSIE', 'Stability Nexus', 'Djed Alliance'] as const) {
      const section = region(org)!;
      const count = ALL.filter((p) => getOrganization(p) === org).length;
      expect(articles(section)).toHaveLength(count);
      expect(within(section).getByRole('link', { name: /^GitHub/ })).toHaveAttribute('href', ORGANIZATION_GITHUB[org]);
      expect(section.querySelector('img')).not.toBeNull();
    }
  });

  it('collapses and expands groups one by one or all at once', () => {
    renderWithIntl(<ProjectsPage />);
    choose(t.groupBy, t.themesLabel);
    const finance = regionToggle('Finance');
    expect(finance).toHaveAccessibleName('Collapse Finance');
    expect(finance).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(finance);
    expect(regionToggle('Finance')).toHaveAccessibleName('Expand Finance');
    expect(regionToggle('Finance')).toHaveAttribute('aria-expanded', 'false');
    expect(articles(region('Finance')!)).toHaveLength(0);
    expect(articles(region('Education')!).length).toBeGreaterThan(0);

    fireEvent.click(textButton(t.collapseAll)!);
    expect(articles()).toHaveLength(0);
    fireEvent.click(textButton(t.expandAll)!);
    expect(regionToggle('Finance')).toHaveAccessibleName('Collapse Finance');
    expect(articles(region('Finance')!).length).toBeGreaterThan(0);
  });

  it('puts projects without a topic in an "Other" group', () => {
    renderWithIntl(<ProjectsPage />);
    choose(t.groupBy, t.topicsLabel);
    expect(articles(region(t.otherGroup)!)).toHaveLength(ALL.filter((p) => p.topics.length === 0).length);
    expect(articles(region('Mobile')!)).toHaveLength(ALL.filter((p) => p.topics.includes('Mobile')).length);

    choose(t.groupBy, t.groupNone);
    expect(region(t.otherGroup)).toBeNull();
    expect(textButton(t.collapseAll)).toBeNull();
  });

  it('hides "collapse all" when only one group is left', () => {
    renderWithIntl(<ProjectsPage />);
    choose(t.groupBy, t.organizationsLabel);
    search('PictoPy');
    expect(document.querySelectorAll('section[aria-label]')).toHaveLength(1);
    expect(textButton(t.collapseAll)).toBeNull();
  });
});

describe('Projects page: cards', () => {
  it('shows stars, topics and links for a project', () => {
    renderWithIntl(<ProjectsPage />);
    const project = byName('PictoPy');
    const card = cardOf(project.name);
    const stars = getProjectStars(project);
    expect(within(card).getByTitle(`${stars} GitHub stars`)).toHaveTextContent(String(stars));
    expect(within(card).getByText(getOrganization(project))).toBeInTheDocument();
    expect(within(card).getByText(project.description)).toBeInTheDocument();
    project.topics.forEach((topic) => expect(within(card).getByText(topic)).toBeInTheDocument());
    expect(within(card).getByRole('link', { name: project.name })).toHaveAttribute('href', githubUrl(project.repositories[0]));
    expect(within(card).getByRole('link', { name: `${project.name}: ${t.discordChannel}` })).toHaveAttribute('href', project.discordUrl);
    expect(within(card).getByRole('link', { name: `${project.name}: ${t.website}` })).toHaveAttribute('href', project.websiteUrl);
  });

  it('shows theme chips and leaves out the website link when there is none', () => {
    renderWithIntl(<ProjectsPage />);
    const project = ALL.find((p) => p.themes.length > 0 && !p.websiteUrl)!;
    const card = cardOf(project.name);
    project.themes.forEach((theme) => expect(within(card).getByText(theme)).toBeInTheDocument());
    expect(within(card).queryByRole('link', { name: `${project.name}: ${t.website}` })).toBeNull();
  });

  it('marks archived projects', () => {
    renderWithIntl(<ProjectsPage />);
    expect(within(cardOf(ARCHIVED[0].name)).getByText(t.archived)).toBeInTheDocument();
    expect(within(cardOf(ACTIVE[0].name)).queryByText(t.archived)).toBeNull();
  });

  it('expands the overview and every repository with its language and stars', () => {
    renderWithIntl(<ProjectsPage />);
    const project = byName('PictoPy');
    const card = cardOf(project.name);
    const toggle = within(card).getByRole('button', { name: t.showMore });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(within(card).queryByText(project.about!)).toBeNull();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveTextContent(t.showLess);
    expect(within(card).getByText(project.about!)).toBeInTheDocument();
    expect(within(card).getByRole('heading', { level: 4 })).toHaveTextContent(`${project.repositories.length} repos`);
    const repoLinks = within(within(card).getByRole('heading', { level: 4 }).nextElementSibling as HTMLElement).getAllByRole('link');
    expect(repoLinks).toHaveLength(project.repositories.length);
    project.repositories.forEach((repo, i) => {
      const link = repoLinks[i];
      expect(link).toHaveAttribute('href', githubUrl(repo));
      expect(link).toHaveTextContent(repo.fullName.split('/')[1]);
      if (repo.language) expect(link).toHaveTextContent(repo.language);
      if (getRepoStars(repo) > 0) expect(link).toHaveTextContent(String(getRepoStars(repo)));
    });

    fireEvent.click(toggle);
    expect(within(card).queryByText(project.about!)).toBeNull();
  });

  it('shows the translated description and overview in the page language', () => {
    renderWithIntl(<ProjectsPage />, { locale: 'hi' });
    const project = byName('PictoPy');
    const text = getProjectText(project, 'hi');
    const card = cardOf(project.name);
    expect(within(card).getByText(text.description)).toBeInTheDocument();
    fireEvent.click(within(card).getByRole('button', { name: messages('hi').ProjectsPage.showMore }));
    expect(within(card).getByText(text.about!)).toBeInTheDocument();
  });

  it('moves the card spotlight with the pointer', () => {
    renderWithIntl(<ProjectsPage />);
    const card = cardOf('PictoPy');
    fireEvent.pointerMove(card, { clientX: 64, clientY: 12 });
    expect(card.style.getPropertyValue('--spot-x')).toBe('64px');
    expect(card.style.getPropertyValue('--spot-y')).toBe('12px');
  });
});
