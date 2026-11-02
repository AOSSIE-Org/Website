import { act, fireEvent, render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { useTheme } from 'next-themes';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ProjectLogo from '@/components/ProjectLogo';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { messages, renderWithIntl } from './test-utils/render';
import { matchingMedia } from './test-utils/browser';
import { router } from './test-utils/next-navigation';

/** Waits for the next animation frame and lets React apply what it scheduled. */
const nextFrame = () => act(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

describe('ThemeToggle', () => {
  it('shows a placeholder until mounted, then cycles light, dark and system', async () => {
    const { container } = renderWithIntl(<ThemeToggle />, { theme: true });
    expect(screen.queryByRole('button')).toBeNull();
    expect(container.querySelector('.animate-pulse')).not.toBeNull();

    await nextFrame();
    const button = screen.getByRole('button', { name: messages('en').ThemeToggle.toggleTheme });
    // Default theme: follow the system
    expect(button.querySelector('svg')).toHaveClass('text-icon-system');

    fireEvent.click(button);
    await act(async () => {});
    expect(document.documentElement).toHaveClass('light');
    expect(button.querySelector('svg')).toHaveClass('text-icon-sun');

    fireEvent.click(button);
    await act(async () => {});
    expect(document.documentElement).toHaveClass('dark');
    expect(button.querySelector('svg')).toHaveClass('text-icon-moon');

    fireEvent.click(button);
    await act(async () => {});
    expect(button.querySelector('svg')).toHaveClass('text-icon-system');
    expect(localStorage.getItem('theme')).toBe('system');
  });

  it('is labelled in the page language', async () => {
    renderWithIntl(<ThemeToggle />, { theme: true, locale: 'hi' });
    await nextFrame();
    expect(screen.getByRole('button', { name: messages('hi').ThemeToggle.toggleTheme })).toBeInTheDocument();
  });
});

describe('LanguageSwitcher with the real catalogs and router', () => {
  it('selects the current locale and switches to another on the same page', () => {
    renderWithIntl(<LanguageSwitcher />, { locale: 'hi', path: '/about' });
    const select = screen.getByRole('combobox', { name: `${messages('hi').LanguageSwitcher.label}:` });
    expect(select).toHaveValue('hi');
    expect(screen.getByRole('option', { name: 'हिन्दी (Hindi)' })).toBeInTheDocument();
    fireEvent.change(select, { target: { value: 'ur' } });
    expect(router.replace).toHaveBeenCalledWith('/ur/about');
  });
});

describe('ProjectLogo', () => {
  it('shows the logo on a tile, inverting single-colour logos in dark mode', () => {
    const { container, rerender } = render(
      <ProjectLogo project={{ name: 'Resonate', logo: '/r.svg', logoInvertOnDark: true }} className="tile" imageClassName="img" />,
    );
    const img = container.querySelector('img')!;
    expect(img).toHaveAttribute('src', '/r.svg');
    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveClass('img', 'theme-icon-invert');
    expect(container.firstChild).toHaveClass('tile');

    rerender(<ProjectLogo project={{ name: 'PictoPy', logo: '/p.svg' }} />);
    expect(container.querySelector('img')).not.toHaveClass('theme-icon-invert');
    expect(container.firstChild).toHaveClass('w-14', 'h-14');
  });

  it.each([
    ['Social Street Smart', 'SS'],
    ['Devr.AI', 'DA'],
    ['OpenVerifiableLLM', 'OV'],
    ['rein', 'RE'],
    ['X', 'X'],
  ])('falls back to a monogram: %s -> %s', (name, expected) => {
    const { container } = render(<ProjectLogo project={{ name }} monogramClassName="big" />);
    expect(container.querySelector('img')).toBeNull();
    const monogram = container.querySelector('span[aria-hidden]')!;
    expect(monogram).toHaveTextContent(new RegExp(`^${expected}$`));
    expect(monogram).toHaveClass('big');
  });
});

describe('ThemeProvider', () => {
  it('stores the theme as a class on <html>, following the system by default', async () => {
    render(
      <ThemeProvider>
        <p>content</p>
      </ThemeProvider>,
    );
    await act(async () => {});
    expect(screen.getByText('content')).toBeInTheDocument();
    // jsdom reports a light system preference
    expect(document.documentElement).toHaveClass('light');
  });

  it('switches theme colours with transitions disabled (disableTransitionOnChange)', async () => {
    function SwitchToDark() {
      const { setTheme } = useTheme();
      return <button type="button" onClick={() => setTheme('dark')}>dark</button>;
    }
    render(
      <ThemeProvider>
        <SwitchToDark />
      </ThemeProvider>,
    );
    await act(async () => {});
    const appendChild = vi.spyOn(document.head, 'appendChild');
    try {
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'dark' }));
      });
      // next-themes adds a short-lived `transition:none` style while it swaps the theme class
      const added = appendChild.mock.calls.map(([node]) => node.textContent ?? '');
      expect(added.some((css) => css.includes('transition:none'))).toBe(true);
      expect(document.documentElement).toHaveClass('dark');
    } finally {
      appendChild.mockRestore();
    }
  });

  it('accepts overrides such as a forced theme', async () => {
    render(
      <ThemeProvider forcedTheme="dark">
        <p>content</p>
      </ThemeProvider>,
    );
    await act(async () => {});
    expect(document.documentElement).toHaveClass('dark');
  });
});

describe('LenisProvider', () => {
  it('turns on smooth scrolling for the whole page', async () => {
    const { unmount } = render(
      <LenisProvider>
        <p>content</p>
      </LenisProvider>,
    );
    await act(async () => {});
    expect(screen.getByText('content')).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('lenis');
    unmount();
    expect(document.documentElement).not.toHaveClass('lenis');
  });

  it('renders the page content on the server, before the motion preference is known', () => {
    expect(renderToStaticMarkup(<LenisProvider><p>content</p></LenisProvider>)).toContain('<p>content</p>');
  });

  it('leaves native scrolling alone when the user prefers reduced motion', async () => {
    matchingMedia.add('(prefers-reduced-motion: reduce)');
    render(
      <LenisProvider>
        <p>content</p>
      </LenisProvider>,
    );
    await act(async () => {});
    expect(screen.getByText('content')).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('lenis');
  });
});
