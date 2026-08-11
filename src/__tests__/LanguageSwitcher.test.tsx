import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/en',
  useRouter: () => ({ replace: vi.fn() }),
}));

import LanguageSwitcher from '@/components/LanguageSwitcher';

describe('LanguageSwitcher Component', () => {
  it('renders language selector select element with active language', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
