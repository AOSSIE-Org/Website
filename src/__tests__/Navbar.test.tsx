import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';

const mockSetTheme = vi.fn();

// Mock next-intl hooks
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      about: 'About',
      projects: 'Projects',
      programs: 'Programs',
      github: 'GitHub',
      selectLanguage: 'Select Language',
    };
    return translations[key] || key;
  },
  useLocale: () => 'en',
}));

// Mock navigation
vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/en',
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
  Link: ({ children, href, ...props }: { children: ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock theme provider
vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: mockSetTheme }),
}));

import Navbar from '@/components/Navbar';

describe('Navbar Component', () => {
  it('renders brand logo and key navigation links with accessible target paths', () => {
    render(<Navbar />);
    
    expect(screen.getByAltText(/aossie logo/i)).toBeInTheDocument();
    
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toHaveAttribute('href', '/about');

    const projectsLink = screen.getByRole('link', { name: 'Projects' });
    expect(projectsLink).toHaveAttribute('href', '/projects');

    const programsLink = screen.getByRole('link', { name: 'Programs' });
    expect(programsLink).toHaveAttribute('href', '/programs');

    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/AOSSIE-Org');
  });

  it('exercises interactive theme toggle control', () => {
    render(<Navbar />);
    const themeToggleButton = screen.getByRole('button', { name: /Toggle theme/i });
    expect(themeToggleButton).toBeInTheDocument();

    fireEvent.click(themeToggleButton);
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});
