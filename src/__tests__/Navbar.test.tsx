import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

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
  useRouter: () => ({ replace: vi.fn() }),
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock theme provider
vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

import Navbar from '@/components/Navbar';

describe('Navbar Component', () => {
  it('renders brand logo and key navigation links correctly', () => {
    render(<Navbar />);
    
    expect(screen.getByAltText(/AOSSIE Logo/i)).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });
});
