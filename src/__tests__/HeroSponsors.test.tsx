import { render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Hero from '@/components/Hero';
import HubDiagram3D from '@/components/HubDiagram3D';
import Sponsors from '@/components/Sponsors';
import { COMMUNITY_MAILTO, GSOC_URL, PARTNER_MAILTO, SOCIAL_LINKS, STABILITY_NEXUS_URL } from '@/config/links';
import { messages, renderWithIntl } from './test-utils/render';
import { holdDynamicImports } from './test-utils/dynamic';

const satelliteImages = (container: HTMLElement) =>
  [...container.querySelectorAll('image')].slice(0, 6).map((img) => img.getAttribute('href'));

describe('Hero', () => {
  // Runs first: React.lazy keeps the loaded diagram for the rest of the file
  it('shows a placeholder while the diagram loads, then six distinct project logos', async () => {
    const release = holdDynamicImports();
    const { container } = renderWithIntl(<Hero />);
    expect(container.querySelector('.animate-pulse')).not.toBeNull();
    expect(container.querySelector('svg[viewBox="0 0 1200 450"]')).toBeNull();

    release();
    await waitFor(() => expect(container.querySelector('svg[viewBox="0 0 1200 450"]')).not.toBeNull());
    const logos = satelliteImages(container);
    expect(logos).toHaveLength(6);
    expect(new Set(logos).size).toBe(6);
    logos.forEach((logo) => expect(logo).toMatch(/^\/brand\/project_(svgs|logos)\/[\w]+\.(svg|png)$/));
  });
  it('shows the localized title, the highlighted founding year and the community link', () => {
    const hero = messages('hi').Hero;
    renderWithIntl(<Hero />, { locale: 'hi' });
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(hero.titleLine1);
    expect(heading).toHaveTextContent(hero.titleLine2);
    expect(screen.getByText('2016')).toHaveClass('text-brand-yellow');

    const join = screen.getByRole('link', { name: new RegExp(hero.joinCommunity) });
    expect(join).toHaveAttribute('href', SOCIAL_LINKS.discord);
    expect(join).toHaveAttribute('target', '_blank');
  });

  it('links the social accounts and the community inbox', () => {
    renderWithIntl(<Hero />, { locale: 'hi' });
    const expected: [string, string][] = [
      ['Discord', SOCIAL_LINKS.discord],
      ['X (Twitter)', SOCIAL_LINKS.x],
      ['LinkedIn', SOCIAL_LINKS.linkedin],
      ['GitHub', SOCIAL_LINKS.github],
      ['YouTube', SOCIAL_LINKS.youtube],
      [messages('hi').Hero.emailLabel, COMMUNITY_MAILTO],
    ];
    for (const [label, href] of expected) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
    }
    expect(screen.getByRole('link', { name: messages('hi').Hero.emailLabel })).not.toHaveAttribute('target');
  });

});

describe('HubDiagram3D', () => {
  it('falls back to the default satellites and the AOSSIE logo', () => {
    const { container } = render(<HubDiagram3D />);
    expect(satelliteImages(container)).toEqual([
      '/brand/project_svgs/resonate_logo.svg',
      '/brand/project_svgs/djed_alliance.svg',
      '/brand/project_svgs/tnt_logo.svg',
      '/brand/project_svgs/stablepay_logo.svg',
      '/brand/project_svgs/fate_logo.svg',
      '/brand/project_svgs/stability_nexus.svg',
    ]);
    const images = container.querySelectorAll('image');
    expect(images[6]).toHaveAttribute('href', '/brand/icons/aossie_logo.svg');
    // Only the dark Resonate wordmark is inverted in dark mode
    expect(images[0]).toHaveClass('theme-icon-invert');
    expect(images[1]).not.toHaveClass('theme-icon-invert');
  });

  it('draws one connector (base wire and flow pulse) per satellite', () => {
    const { container } = render(<HubDiagram3D />);
    const wires = container.querySelectorAll('path.hub-wire-base');
    const flows = container.querySelectorAll('path.hub-wire-flow');
    expect(wires).toHaveLength(6);
    expect(flows).toHaveLength(6);
    wires.forEach((wire) => expect(wire.getAttribute('d')).toMatch(/^M [\d.]+ [\d.]+ L .* L [\d.]+ [\d.]+$/));
    // Left satellites end on the hub's left edge (x = 480), right ones on its right edge (x = 720)
    const ends = [...wires].map((w) => Number(w.getAttribute('d')!.trim().split(' ').at(-2)));
    expect(ends).toEqual([480, 480, 480, 720, 720, 720]);
  });

  it('colours each satellite rim after its logo, keeping the default colours for unknown logos', () => {
    const { container } = render(
      <HubDiagram3D logos={['/brand/project_svgs/pictopy_logo.svg', '/elsewhere/unknown.svg']} centerLogo="/custom.svg" />,
    );
    const stops = (id: string) => [...container.querySelectorAll(`#${id} stop`)].map((s) => s.getAttribute('stop-color'));
    expect(stops('rimGrad1')).toEqual(['#428AFB', '#1D4ED8']);
    expect(stops('rimGrad2')).toEqual(['#F7941D', '#D27728']);
    expect(satelliteImages(container).slice(0, 2)).toEqual(['/brand/project_svgs/pictopy_logo.svg', '/elsewhere/unknown.svg']);
    expect(container.querySelectorAll('image')[6]).toHaveAttribute('href', '/custom.svg');
  });
});

describe('Sponsors', () => {
  const t = messages('en').Sponsors;

  it('links each partner with an accessible label and theme-aware logos', () => {
    renderWithIntl(<Sponsors />);
    expect(screen.getByRole('heading', { level: 2, name: t.title })).toBeInTheDocument();

    const gsoc = screen.getByRole('link', { name: 'Visit Google Summer of Code (opens in a new tab)' });
    expect(gsoc).toHaveAttribute('href', GSOC_URL);
    expect(gsoc).toHaveAttribute('target', '_blank');
    const gsocLogos = gsoc.querySelectorAll('img');
    expect([...gsocLogos].map((img) => img.getAttribute('src'))).toEqual([
      '/brand/icons/gsoc_full_logo_light.svg',
      '/brand/icons/gsoc_full_logo.svg',
    ]);
    expect(gsocLogos[0]).toHaveClass('dark:hidden');

    const nexus = screen.getByRole('link', { name: 'Visit Stability Nexus (opens in a new tab)' });
    expect(nexus).toHaveAttribute('href', STABILITY_NEXUS_URL);
    expect(nexus.querySelectorAll('img')).toHaveLength(1);
    expect(nexus.querySelector('img')).not.toHaveClass('dark:hidden');
  });

  it('invites organizations to partner, in the page language', () => {
    const hi = messages('hi').Sponsors;
    renderWithIntl(<Sponsors />, { locale: 'hi' });
    expect(screen.getByRole('heading', { level: 3, name: hi.ctaTitle })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: new RegExp(hi.ctaButton) })).toHaveAttribute('href', PARTNER_MAILTO);
    expect(screen.getByRole('link', { name: new RegExp(hi.ctaLearnMore) })).toHaveAttribute('href', '/hi/about#partners');
    expect(within(screen.getByRole('list')).getAllByRole('listitem')).toHaveLength(2);
  });
});
