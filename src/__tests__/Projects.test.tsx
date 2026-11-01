import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Projects from '@/components/Projects';
import { PROJECTS_DATA, githubUrl } from '@/lib/projectsData';
import { messages, renderWithIntl } from './test-utils/render';
import { MockResizeObserver } from './test-utils/browser';
import { scrollYProgress } from './test-utils/framer-motion';

const t = messages('en').Projects;

interface Target {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  opacity: number;
}

/** Active projects with a logo: the pool the home page section draws from. */
const POOL = PROJECTS_DATA.filter((p) => p.logo && !p.archived);

const cards = () => screen.getAllByRole('link', { name: / GitHub Repository$/ });
const targets = () => cards().map((card) => JSON.parse(card.getAttribute('data-animate')!) as Target);
const scrollTo = (progress: number) => act(() => scrollYProgress.set(progress));
const resize = (width: number, height: number) => act(() => MockResizeObserver.instances.at(-1)!.resize(width, height));

describe('Projects (home page section)', () => {
  it('shows eight distinct active projects, each linking to its repository', async () => {
    renderWithIntl(<Projects />);
    expect(screen.getByRole('heading', { level: 2, name: t.title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: new RegExp(t.viewAll) })).toHaveAttribute('href', '/en/projects');

    // The first render is deterministic; a random selection replaces it after the first frame
    await waitFor(() => expect(cards()).toHaveLength(8));
    const names = cards().map((card) => card.getAttribute('aria-label')!.replace(' GitHub Repository', ''));
    expect(new Set(names).size).toBe(8);
    for (const card of cards()) {
      const project = POOL.find((p) => `${p.name} GitHub Repository` === card.getAttribute('aria-label'));
      expect(project, card.getAttribute('aria-label')!).toBeDefined();
      expect(card).toHaveAttribute('href', githubUrl(project!.repositories[0]));
      expect(card).toHaveAttribute('target', '_blank');
      expect(card.querySelector('img')).toHaveAttribute('src', project!.logo);
      expect(card.querySelector('img')!.classList.contains('theme-icon-invert')).toBe(Boolean(project!.logoInvertOnDark));
    }
  });

  it('starts scattered and invisible', () => {
    renderWithIntl(<Projects />);
    targets().forEach((target) => {
      expect(target.opacity).toBe(0);
      expect(target.scale).toBe(0.6);
    });
  });

  it('lines the cards up, scaled to the stage width, between 10% and 22% scroll', () => {
    renderWithIntl(<Projects />);
    resize(400, 500);
    scrollTo(0.15);
    const line = targets();
    // 360px available for 8 cards: 45px apart, scaled down from the 85px maximum
    line.forEach((target, i) => {
      expect(target).toMatchObject({ y: 0, rotate: 0, opacity: 1 });
      expect(target.scale).toBeCloseTo(45 / 85);
      expect(target.x).toBeCloseTo(i * 45 - 180 + 22.5);
    });

    scrollTo(0.05);
    expect(targets()[0].opacity).toBe(0);
  });

  it('uses an 800px line before the stage has been measured', () => {
    renderWithIntl(<Projects />);
    scrollTo(0.15);
    expect(targets().map((target) => target.scale)).toEqual(Array(8).fill(1));
    expect(targets()[1].x - targets()[0].x).toBe(85);
  });

  it.each([
    // Desktop cards grow with the stage (600 / 380); mobile cards keep their size
    { width: 1000, height: 600, radius: 198, scale: 600 / 380 },
    { width: 500, height: 600, radius: 165, scale: 1 },
    { width: 0, height: 0, radius: 165, scale: 1 },
  ])('forms a circle on a $width x $height stage', ({ width, height, radius, scale }) => {
    renderWithIntl(<Projects />);
    resize(width, height);
    scrollTo(0.4);
    targets().forEach((target, i) => {
      expect(Math.hypot(target.x, target.y)).toBeCloseTo(radius);
      expect(target.rotate).toBeCloseTo(i * 45 + 90);
      expect(target.scale).toBeCloseTo(scale);
      expect(target.opacity).toBe(1);
    });
  });

  it('morphs the circle into a bottom arc that rotates and follows the pointer', async () => {
    const { container } = renderWithIntl(<Projects />);
    resize(1000, 600);
    scrollTo(0.4);
    scrollTo(0.85);
    await waitFor(() => expect(Math.hypot(targets()[0].x, targets()[0].y)).not.toBeCloseTo(198));
    // Fully morphed: every card sits on the arc around (0, arcCenterY)
    const arcRadius = Math.min(1000, 600 * 1.4) * 1.05;
    const arcCenterY = 600 * 0.28 + arcRadius;
    const arc = targets();
    arc.forEach((target) => expect(Math.hypot(target.x, target.y - arcCenterY)).toBeCloseTo(arcRadius));

    scrollTo(0.98);
    await waitFor(() => expect(targets()[0].rotate).not.toBeCloseTo(arc[0].rotate));
    expect(targets()[0].rotate).toBeCloseTo(arc[0].rotate - 125 * 0.75);

    const stage = container.querySelector('.max-h-\\[550px\\]') as HTMLElement;
    vi.spyOn(stage, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 1000, height: 600 } as DOMRect);
    const before = targets()[0].x;
    fireEvent.mouseMove(stage, { clientX: 750, clientY: 100 });
    await waitFor(() => expect(targets()[0].x).toBeCloseTo(before + 50));
  });

  it('labels the hovered or focused project next to the cursor', () => {
    renderWithIntl(<Projects />);
    const first = cards()[0];
    const name = first.getAttribute('aria-label')!.replace(' GitHub Repository', '');
    fireEvent.mouseEnter(first);
    expect(screen.getByText(`View ${name} on GitHub`)).toBeInTheDocument();
    fireEvent.mouseLeave(first);
    expect(screen.queryByText(`View ${name} on GitHub`)).toBeNull();
    fireEvent.focus(first);
    expect(screen.getByText(`View ${name} on GitHub`)).toBeInTheDocument();
    fireEvent.blur(first);
    expect(screen.queryByText(/on GitHub$/)).toBeNull();
  });
});
