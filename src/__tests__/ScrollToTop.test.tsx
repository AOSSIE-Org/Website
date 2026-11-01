import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ScrollToTop from '@/components/ScrollToTop';

describe('ScrollToTop Component', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = vi.fn();
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    vi.clearAllMocks();
  });

  it('does not render button when scroll position is at the top', () => {
    window.scrollY = 0;
    render(<ScrollToTop />);

    expect(screen.queryByRole('button', { name: /scroll to top/i })).not.toBeInTheDocument();
  });

  it('renders button when scrolled past 300px', () => {
    render(<ScrollToTop />);

    act(() => {
      window.scrollY = 350;
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toBeInTheDocument();
  });

  it('scrolls to top smoothly when clicked', () => {
    render(<ScrollToTop />);

    act(() => {
      window.scrollY = 500;
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: /scroll to top/i });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
