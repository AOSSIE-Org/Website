import { describe, it, expect, afterEach, vi } from 'vitest';
import { DEFAULT_THEME, THEME_STORAGE_KEY, themeInitScript } from '@/components/providers/theme-script';

const root = document.documentElement;

function run({ stored, systemDark = false }: { stored?: string; systemDark?: boolean }) {
  if (stored !== undefined) localStorage.setItem(THEME_STORAGE_KEY, stored);
  vi.stubGlobal('matchMedia', (query: string) => ({ matches: query === '(prefers-color-scheme: dark)' && systemDark }));
  new Function(themeInitScript)();
}

afterEach(() => {
  localStorage.clear();
  root.className = '';
  root.removeAttribute('style');
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('theme head script', () => {
  it('shares its storage key and default with ThemeProvider', () => {
    expect(THEME_STORAGE_KEY).toBe('theme');
    expect(DEFAULT_THEME).toBe('system');
  });

  it.each(['dark', 'light'] as const)('applies a saved %s theme and its colour scheme', (theme) => {
    root.className = 'font-var light dark';
    run({ stored: theme, systemDark: theme === 'light' });
    expect(root.className).toBe(`font-var ${theme}`);
    expect(root.style.colorScheme).toBe(theme);
  });

  it.each([
    [true, 'dark'],
    [false, 'light'],
  ] as const)('follows the system (prefers dark: %s) when nothing or "system" is saved', (systemDark, expected) => {
    run({ systemDark });
    expect(root.className).toBe(expected);
    root.className = '';
    run({ stored: 'system', systemDark });
    expect(root.className).toBe(expected);
  });

  it('leaves the page alone for an unknown saved value', () => {
    run({ stored: 'sepia' });
    expect(root.className).toBe('');
    expect(root.getAttribute('style')).toBeNull();
  });

  it('does not throw when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => run({})).not.toThrow();
    expect(root.className).toBe('');
  });
});
