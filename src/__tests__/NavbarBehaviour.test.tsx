import { act, fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Navbar from '@/components/Navbar';
import { languages } from '@/config/languages';
import { GITHUB_ORG_URL } from '@/config/links';
import { messages, renderWithIntl } from './test-utils/render';
import { router } from './test-utils/next-navigation';

const en = messages('en').Navbar;
const hi = messages('hi').Navbar;

/** Lets next-themes apply the theme it has just stored. */
const flush = () => act(async () => {});

describe('Navbar links', () => {
  it('links every section under the current locale and marks the current page', () => {
    renderWithIntl(<Navbar />, { locale: 'hi', path: '/about' });

    expect(screen.getByRole('link', { name: hi.home })).toHaveAttribute('href', '/hi');
    const about = screen.getByRole('link', { name: hi.about });
    expect(about).toHaveAttribute('href', '/hi/about');
    expect(about).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: hi.projects })).toHaveAttribute('href', '/hi/projects');
    expect(screen.getByRole('link', { name: hi.projects })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: hi.programs })).toHaveAttribute('href', '/hi/programs');
    expect(screen.getByAltText(hi.logoAlt)).toHaveAttribute('src', '/brand/icons/aossie_secondary_dark_logo.svg');
  });

  it('marks Home as current only on the home page', () => {
    renderWithIntl(<Navbar />);
    expect(screen.getByRole('link', { name: en.home })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: en.about })).not.toHaveAttribute('aria-current');
  });

  it('keeps a section current on its nested pages', () => {
    renderWithIntl(<Navbar />, { path: '/projects/pictopy' });
    expect(screen.getByRole('link', { name: en.projects })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: en.home })).not.toHaveAttribute('aria-current');
  });

  it('opens the GitHub organization in a new tab', () => {
    renderWithIntl(<Navbar />);
    const github = screen.getByRole('link', { name: /GitHub/ });
    expect(github).toHaveAttribute('href', GITHUB_ORG_URL);
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

describe('Navbar logo', () => {
  it('scrolls to the top instead of navigating on the home page', () => {
    renderWithIntl(<Navbar />);
    fireEvent.click(screen.getByAltText(en.logoAlt));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    expect(router.push).not.toHaveBeenCalled();
  });

  it('also scrolls the document scrolling element, where the browser has one', () => {
    const scrollTo = vi.fn();
    Object.defineProperty(document, 'scrollingElement', { configurable: true, value: { scrollTo } });
    try {
      renderWithIntl(<Navbar />, { locale: 'ur' });
      fireEvent.click(screen.getByAltText(messages('ur').Navbar.logoAlt));
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    } finally {
      delete (document as { scrollingElement?: unknown }).scrollingElement;
    }
  });

  it('navigates to the localized home page from another page', () => {
    renderWithIntl(<Navbar />, { locale: 'fr', path: '/programs' });
    fireEvent.click(screen.getByAltText(messages('fr').Navbar.logoAlt));
    expect(router.push).toHaveBeenCalledWith('/fr');
  });
});

describe('Navbar language menu', () => {
  const openMenu = () => {
    const trigger = screen.getByRole('button', { name: en.selectLanguage });
    fireEvent.click(trigger);
    return trigger;
  };

  it('shows the current language code and lists every language when opened', () => {
    renderWithIntl(<Navbar />, { locale: 'ar' });
    const trigger = screen.getByRole('button', { name: messages('ar').Navbar.selectLanguage });
    expect(trigger).toHaveTextContent('AR');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    for (const lang of languages) {
      const option = screen.getByRole('button', { name: new RegExp(`${lang.localName}\\s*${lang.code}`, 'i') });
      expect(option).toHaveAttribute('lang', lang.code);
    }
    expect(screen.getByRole('button', { name: /العربية/ })).toHaveClass('text-heading-highlight');
  });

  it('switches locale on the same page', () => {
    renderWithIntl(<Navbar />, { path: '/about' });
    const trigger = openMenu();
    fireEvent.click(screen.getByRole('button', { name: /हिन्दी/ }));
    expect(router.replace).toHaveBeenCalledWith('/hi/about');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('only closes the menu when the current language is chosen', () => {
    renderWithIntl(<Navbar />);
    const trigger = openMenu();
    fireEvent.click(screen.getByRole('button', { name: /^English\s*en$/i }));
    expect(router.replace).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes when clicking outside, but not when clicking inside', () => {
    renderWithIntl(<Navbar />);
    const trigger = openMenu();
    fireEvent.mouseDown(screen.getByRole('button', { name: /Español/ }));
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.mouseDown(document.body);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Navbar theme toggle', () => {
  it('switches between dark and light and swaps the icon', async () => {
    renderWithIntl(<Navbar />, { theme: true });
    await flush();
    const toggle = screen.getByRole('button', { name: en.toggleTheme });
    // The default "system" theme is not dark, so the first click turns dark mode on
    expect(within(toggle).getByRole('presentation', { hidden: true })).toHaveAttribute('src', '/brand/icons/moon.svg');

    fireEvent.click(toggle);
    await flush();
    expect(document.documentElement).toHaveClass('dark');
    expect(within(toggle).getByRole('presentation', { hidden: true })).toHaveAttribute('src', '/brand/icons/sun.svg');

    fireEvent.click(toggle);
    await flush();
    expect(document.documentElement).toHaveClass('light');
    expect(document.documentElement).not.toHaveClass('dark');
  });
});

describe('Navbar mobile menu', () => {
  const toggleMenu = () => screen.getByRole('button', { name: en.toggleMenu });

  it('opens a drawer with the links, language pills and a theme toggle', async () => {
    renderWithIntl(<Navbar />, { theme: true, path: '/programs' });
    await flush();
    expect(toggleMenu()).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getAllByRole('link', { name: en.programs })).toHaveLength(1);

    fireEvent.click(toggleMenu());
    expect(toggleMenu()).toHaveAttribute('aria-expanded', 'true');
    const programLinks = screen.getAllByRole('link', { name: en.programs });
    expect(programLinks).toHaveLength(2);
    programLinks.forEach((link) => expect(link).toHaveAttribute('aria-current', 'page'));
    expect(screen.getAllByRole('link', { name: /GitHub/ })).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'English (EN)' })).toHaveClass('text-heading-highlight');
    expect(screen.getAllByRole('button', { name: en.toggleTheme })).toHaveLength(2);

    fireEvent.click(screen.getAllByRole('button', { name: en.toggleTheme })[1]);
    await flush();
    expect(document.documentElement).toHaveClass('dark');
  });

  it('closes after following a link', () => {
    renderWithIntl(<Navbar />);
    fireEvent.click(toggleMenu());
    fireEvent.click(screen.getAllByRole('link', { name: en.about })[1]);
    expect(toggleMenu()).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggleMenu());
    fireEvent.click(screen.getAllByRole('link', { name: /GitHub/ })[1]);
    expect(toggleMenu()).toHaveAttribute('aria-expanded', 'false');
  });

  it('switches language from the pills', () => {
    renderWithIntl(<Navbar />, { path: '/projects' });
    fireEvent.click(toggleMenu());
    fireEvent.click(screen.getByRole('button', { name: 'Kiswahili (SW)' }));
    expect(router.replace).toHaveBeenCalledWith('/sw/projects');
  });

  it('closes when clicking outside the navbar and toggles closed again', () => {
    renderWithIntl(<Navbar />);
    fireEvent.click(toggleMenu());
    fireEvent.mouseDown(document.body);
    expect(toggleMenu()).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggleMenu());
    fireEvent.click(toggleMenu());
    expect(toggleMenu()).toHaveAttribute('aria-expanded', 'false');
  });
});
