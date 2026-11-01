import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockUseLenis = vi.fn();
const mockUseReducedMotion = vi.fn();

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      scrollToTop: 'Scroll to top',
    };
    return translations[key] || key;
  },
}));

vi.mock('lenis/react', () => ({
  useLenis: () => mockUseLenis(),
}));

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useReducedMotion: () => mockUseReducedMotion(),
  };
});

import ScrollToTop from '@/components/ScrollToTop';

function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    configurable: true,
    value,
  });
}

describe('ScrollToTop Component', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = vi.fn();
    mockUseLenis.mockReturnValue(null);
    mockUseReducedMotion.mockReturnValue(false);
    setScrollY(0);
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    vi.clearAllMocks();
  });

  it('does not render button when scroll position is at the top', () => {
    setScrollY(0);
    render(<ScrollToTop />);

    expect(screen.queryByRole('button', { name: /scroll to top/i })).not.toBeInTheDocument();
  });

  it('renders button with translated accessible label when scrolled past 300px', () => {
    render(<ScrollToTop />);

    act(() => {
      setScrollY(350);
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: 'Scroll to top' });
    expect(button).toBeInTheDocument();
  });

  it('scrolls to top smoothly using window.scrollTo fallback when Lenis is not available', () => {
    render(<ScrollToTop />);

    act(() => {
      setScrollY(500);
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: 'Scroll to top' });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('scrolls to top using Lenis when available', () => {
    const mockLenisInstance = { scrollTo: vi.fn() };
    mockUseLenis.mockReturnValue(mockLenisInstance);

    render(<ScrollToTop />);

    act(() => {
      setScrollY(500);
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: 'Scroll to top' });
    fireEvent.click(button);

    expect(mockLenisInstance.scrollTo).toHaveBeenCalledWith(0);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('respects prefers-reduced-motion with instant scroll using Lenis', () => {
    const mockLenisInstance = { scrollTo: vi.fn() };
    mockUseLenis.mockReturnValue(mockLenisInstance);
    mockUseReducedMotion.mockReturnValue(true);

    render(<ScrollToTop />);

    act(() => {
      setScrollY(500);
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: 'Scroll to top' });
    fireEvent.click(button);

    expect(mockLenisInstance.scrollTo).toHaveBeenCalledWith(0, { immediate: true });
  });

  it('respects prefers-reduced-motion with instant scroll using window fallback', () => {
    mockUseReducedMotion.mockReturnValue(true);

    render(<ScrollToTop />);

    act(() => {
      setScrollY(500);
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: 'Scroll to top' });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'instant',
    });
  });
});
