import { act, fireEvent, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Stats from '@/components/Stats';
import { GITHUB_URL } from '@/config/links';
import { messages, renderWithIntl } from './test-utils/render';
import { MockIntersectionObserver, matchingMedia } from './test-utils/browser';
import { scrollYProgress } from './test-utils/framer-motion';

const t = messages('en').Stats;
const timeline = messages('en').Timeline;

const CARDS = [
  { title: t.mainStatTitle, value: t.mainStatValue, desc: t.mainStatDesc },
  { title: t.stat1Label, value: t.stat1Value, desc: t.stat1Desc },
  { title: t.stat2Label, value: t.stat2Value, desc: t.stat2Desc },
  { title: t.stat3Label, value: t.stat3Value, desc: t.stat3Desc },
];
const label = (i: number) => `${CARDS[i].title}: ${CARDS[i].value}. ${CARDS[i].desc}`;
const card = (i: number) => screen.getByRole('button', { name: label(i) });
/** The card on top of the stack is the only one that can be dragged. */
const topCard = () => document.querySelector('[data-drag="x"]') as HTMLElement;
const dragEnd = (el: HTMLElement, offsetX: number, velocityX = 0) =>
  fireEvent.dragEnd(el, { dataTransfer: { offset: { x: offsetX, y: 0 }, velocity: { x: velocityX, y: 0 } } });
const enterView = () => act(() => MockIntersectionObserver.instances.at(-1)!.trigger(true));

afterEach(() => {
  vi.useRealTimers();
});

describe('Stats layout', () => {
  it('renders the four statistics as labelled cards with the first one on top', () => {
    renderWithIntl(<Stats />);
    expect(screen.getByRole('heading', { level: 2, name: t.title })).toBeInTheDocument();
    CARDS.forEach((_, i) => expect(card(i)).toHaveAttribute('aria-pressed', 'false'));
    expect(topCard()).toBe(card(0));
    expect(within(topCard()).getByText(t.swipeHint)).toBeInTheDocument();
    expect(screen.getAllByText(t.swipeHint)).toHaveLength(1);
  });

  it('brings a card to the top with the dots', () => {
    renderWithIntl(<Stats />);
    const dots = [1, 2, 3, 4].map((n) => screen.getByRole('button', { name: `Go to card ${n}` }));
    fireEvent.click(dots[2]);
    expect(topCard()).toBe(card(2));
    expect(dots[2]).toHaveClass('w-4');
    expect(dots[0]).not.toHaveClass('w-4');
  });

  it('cycles the stack with the arrow keys in both directions', () => {
    renderWithIntl(<Stats />);
    fireEvent.keyDown(topCard(), { key: 'ArrowRight' });
    expect(topCard()).toBe(card(1));
    fireEvent.keyDown(topCard(), { key: 'ArrowLeft' });
    fireEvent.keyDown(topCard(), { key: 'ArrowLeft' });
    expect(topCard()).toBe(card(3));
  });

  it('cycles the stack with swipes, by distance or by speed', () => {
    renderWithIntl(<Stats />);
    dragEnd(topCard(), -80);
    expect(topCard()).toBe(card(1));
    dragEnd(topCard(), 80);
    expect(topCard()).toBe(card(0));
    // A short, fast flick counts as a swipe
    dragEnd(topCard(), -10, -200);
    expect(topCard()).toBe(card(1));
    dragEnd(topCard(), 10, 200);
    expect(topCard()).toBe(card(0));
    // A short, slow drag does not
    dragEnd(topCard(), -20, -10);
    expect(topCard()).toBe(card(0));
  });

  it('expands a card on click or Enter/Space, but not at the end of a drag', () => {
    renderWithIntl(<Stats />);
    fireEvent.click(card(0));
    expect(card(0)).toHaveAttribute('aria-pressed', 'true');
    fireEvent.keyDown(card(0), { key: 'Enter' });
    expect(card(0)).toHaveAttribute('aria-pressed', 'false');
    fireEvent.keyDown(card(2), { key: ' ' });
    expect(card(2)).toHaveAttribute('aria-pressed', 'true');
    fireEvent.keyDown(card(2), { key: 'Tab' });
    expect(card(2)).toHaveAttribute('aria-pressed', 'true');

    fireEvent.dragStart(card(0));
    fireEvent.click(card(0));
    expect(card(0)).toHaveAttribute('aria-pressed', 'false');
    dragEnd(card(0), 0);
    fireEvent.click(card(0));
    expect(card(0)).toHaveAttribute('aria-pressed', 'true');
  });

  it('spreads the stack into a grid once the section is scrolled past 40%', () => {
    renderWithIntl(<Stats />);
    act(() => scrollYProgress.set(0.5));
    expect(topCard()).toBeNull();
    expect(screen.queryByRole('button', { name: 'Go to card 1' })).toBeNull();
    expect(screen.queryByText(t.swipeHint)).toBeNull();
    const order = screen.getAllByRole('button', { name: /: .*\. / });
    expect(order.map((el) => el.getAttribute('aria-label'))).toEqual([0, 1, 2, 3].map(label));
    // Arrow keys only move the stack
    fireEvent.keyDown(card(0), { key: 'ArrowRight' });
    act(() => scrollYProgress.set(0.1));
    expect(topCard()).toBe(card(0));
  });
});

describe('Stats counters and visuals', () => {
  it('counts the numbers up once the section is in view', async () => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'] });
    renderWithIntl(<Stats />);
    const value = () => within(card(0)).getByText(/^\d+\+$/).textContent;
    expect(value()).toBe('11+');

    act(() => MockIntersectionObserver.instances.at(-1)!.trigger(false));
    expect(MockIntersectionObserver.instances.at(-1)!.disconnected).toBe(false);

    await enterView();
    act(() => vi.advanceTimersByTime(300));
    expect(Number.parseInt(value()!, 10)).toBeLessThan(11);
    act(() => vi.advanceTimersByTime(2000));
    expect(value()).toBe('11+');
    expect(within(card(2)).getByText('8K+')).toBeInTheDocument();
  });

  it('shows the final numbers at once with reduced motion', async () => {
    matchingMedia.add('(prefers-reduced-motion: reduce)');
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'] });
    renderWithIntl(<Stats />);
    await enterView();
    act(() => vi.advanceTimersByTime(50));
    expect(within(card(0)).getByText('11+')).toBeInTheDocument();
  });

  it('starts the visuals of the top card only after it scrolls into view', async () => {
    const { container } = renderWithIntl(<Stats />);
    const cells = () => [...container.querySelectorAll<HTMLElement>('.grid-flow-col > span')];
    expect(cells()).toHaveLength(126);
    expect(cells()[0].style.opacity).toBe('0');

    fireEvent.click(screen.getByRole('button', { name: 'Go to card 4' }));
    await enterView();
    expect(cells()[0].style.opacity).toBe('1');
  });

  it('switches the milestone shown on the timeline', () => {
    renderWithIntl(<Stats />);
    const latest = screen.getByRole('button', { name: `2025: ${timeline.m6Title}` });
    expect(latest).toHaveAttribute('aria-pressed', 'true');

    const first = screen.getByRole('button', { name: `2011: ${timeline.m1Title}` });
    fireEvent.click(first);
    expect(first).toHaveAttribute('aria-pressed', 'true');
    expect(latest).toHaveAttribute('aria-pressed', 'false');
    expect(within(card(0)).getByText(timeline.m1Title)).toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByRole('button', { name: `2017: ${timeline.m4Title}` }));
    expect(within(card(0)).getByText(timeline.m4Title)).toBeInTheDocument();
    fireEvent.focus(screen.getByRole('button', { name: `2018: ${timeline.m5Title}` }));
    expect(within(card(0)).getByText(timeline.m5Title)).toBeInTheDocument();
    // Choosing a milestone does not expand the card
    expect(card(0)).toHaveAttribute('aria-pressed', 'false');
  });

  it('describes the hovered year of the projects chart and resets on leave', () => {
    renderWithIntl(<Stats />);
    const chart = card(1);
    expect(within(chart).getByText('2026: 22 Projects', { selector: 'p' })).toBeInTheDocument();
    const bar2016 = screen.getByRole('button', { name: '2016: 4 Projects' });
    fireEvent.mouseEnter(bar2016);
    expect(within(chart).getByText('2016: 4 Projects', { selector: 'p' })).toBeInTheDocument();
    fireEvent.focus(screen.getByRole('button', { name: '2019: 9 Projects' }));
    expect(within(chart).getByText('2019: 9 Projects', { selector: 'p' })).toBeInTheDocument();
    fireEvent.mouseLeave(bar2016.parentElement!);
    expect(within(chart).getByText('2026: 22 Projects', { selector: 'p' })).toBeInTheDocument();
    fireEvent.click(bar2016);
    expect(chart).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows contributor avatars from GitHub around the Discord logo', () => {
    renderWithIntl(<Stats />);
    const avatars = card(2).querySelectorAll('img');
    expect(avatars).toHaveLength(18);
    avatars.forEach((img) => expect(img.getAttribute('src')).toMatch(new RegExp(`^${GITHUB_URL}/[\\w.-]+\\.png\\?size=64$`)));
    expect(avatars[0]).toHaveAttribute('title', 'reach2saksham');
  });

  it('uses the page language', () => {
    const hi = messages('hi').Stats;
    renderWithIntl(<Stats />, { locale: 'hi' });
    expect(screen.getByRole('heading', { level: 2, name: hi.title })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: `${hi.stat2Label}: ${hi.stat2Value}. ${hi.stat2Desc}` })).toBeInTheDocument();
  });
});
