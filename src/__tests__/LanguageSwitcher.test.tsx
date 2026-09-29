import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const mockReplace = vi.fn();

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/en',
  useRouter: () => ({ replace: mockReplace }),
}));

import LanguageSwitcher from '@/components/LanguageSwitcher';
import { languages } from '@/config/languages';

describe('LanguageSwitcher Component', () => {
  it('renders combobox accessible element and available locale options', () => {
    render(<LanguageSwitcher />);
    
    const selectElement = screen.getByRole('combobox', { name: /label/i });
    expect(selectElement).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(languages.length);
    expect(options[0]).toHaveTextContent(/English/i);
    expect(screen.getByRole('option', { name: /हिन्दी/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Te Reo Māori/ })).toBeInTheDocument();
  });

  it('triggers router.replace with selected locale when changing selection', () => {
    render(<LanguageSwitcher />);
    
    const selectElement = screen.getByRole('combobox', { name: /label/i });
    fireEvent.change(selectElement, { target: { value: 'hi' } });

    expect(mockReplace).toHaveBeenCalledWith('/en', { locale: 'hi' });
  });
});
