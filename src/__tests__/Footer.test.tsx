import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { describe, expect, it } from 'vitest';
import Footer from '@/components/Footer';
import FooterCta from '@/components/FooterCta';
import { languages } from '@/config/languages';
import SiteShareButton from '@/components/SiteShareButton';
import {
  CONTACT_MAILTO,
  DISCORD_INVITE_URL,
  GSOC_APPLY_URL,
  INFO_REPO_URL,
  PARTNER_MAILTO,
  SOCIAL_LINKS,
} from '@/config/links';
import { messages, renderWithIntl } from './test-utils/render';
import { MockShareDialog } from './test-utils/share';

const en = messages('en').Footer;
const hi = messages('hi').Footer;

describe('Footer', () => {
  it('lists the organization and contribution links, localizing the internal ones', () => {
    renderWithIntl(<Footer />, { locale: 'hi' });

    const organization = screen.getByRole('navigation', { name: hi.organization });
    expect(within(organization).getByRole('link', { name: hi.aboutLink })).toHaveAttribute('href', '/hi/about');
    expect(within(organization).getByRole('link', { name: hi.projectsLink })).toHaveAttribute('href', '/hi/projects');
    expect(within(organization).getByRole('link', { name: hi.programsLink })).toHaveAttribute('href', '/hi/programs');
    const brandKit = within(organization).getByRole('link', { name: new RegExp(hi.brandKit) });
    expect(brandKit).toHaveAttribute('href', `${INFO_REPO_URL}/Brand.md`);
    expect(brandKit).toHaveAttribute('target', '_blank');
    expect(brandKit).toHaveTextContent('↗');
    expect(within(organization).getByRole('link', { name: hi.aboutLink })).not.toHaveTextContent('↗');

    const contribute = screen.getByRole('navigation', { name: hi.contribute });
    const hrefs = within(contribute).getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([
      GSOC_APPLY_URL,
      `${INFO_REPO_URL}/Rules/Contribution.md`,
      `${INFO_REPO_URL}/Rules/Communication.md`,
      `${INFO_REPO_URL}/Rules/AI.md`,
      `${INFO_REPO_URL}/CODE_OF_CONDUCT.md`,
    ]);
  });

  it('links every official account, opening web links in a new tab and translating the email label', () => {
    renderWithIntl(<Footer />, { locale: 'hi' });
    const socials = within(screen.getByRole('list', { name: hi.community })).getAllByRole('link');
    expect(socials.map((a) => a.getAttribute('aria-label'))).toEqual([
      'Discord',
      'GitHub',
      'X (Twitter)',
      'LinkedIn',
      'YouTube',
      'Telegram',
      hi.email,
    ]);
    expect(socials.map((a) => a.getAttribute('href'))).toEqual([
      SOCIAL_LINKS.discord,
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.x,
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.youtube,
      SOCIAL_LINKS.telegram,
      CONTACT_MAILTO,
    ]);
    socials.slice(0, 6).forEach((a) => expect(a).toHaveAttribute('target', '_blank'));
    expect(socials[6]).not.toHaveAttribute('target');
  });

  it('shows the legal bar with localized privacy, terms and support links', () => {
    renderWithIntl(<Footer />, { locale: 'hi' });
    expect(screen.getByRole('link', { name: hi.privacyLink })).toHaveAttribute('href', '/hi/privacy');
    expect(screen.getByRole('link', { name: hi.termsLink })).toHaveAttribute('href', '/hi/terms');
    expect(screen.getByRole('link', { name: new RegExp(hi.supportLink) })).toHaveAttribute('href', '/hi/support');
    // Copyright, organization and ABN form one item that never wraps; the long-form name is not repeated
    const abn = screen.getByText('32 743 493 466').parentElement!;
    expect(abn.textContent).toBe('© AOSSIE ABN: 32 743 493 466');
    expect(abn).toHaveClass('whitespace-nowrap');
    expect(screen.getAllByText(/©/)).toEqual([abn]);
    expect(screen.getByText(hi.addressText).tagName).toBe('ADDRESS');
    expect(screen.getByRole('link', { name: 'AOSSIE' })).toHaveAttribute('href', '/hi');
  });

  it.each(languages.map((l) => l.code))('keeps "© AOSSIE ABN" on one line in %s', (locale) => {
    renderWithIntl(<Footer />, { locale });
    const abn = screen.getByText('32 743 493 466').parentElement!;
    expect(abn.textContent).toBe(`© AOSSIE ${messages(locale).Footer.abnLabel} 32 743 493 466`);
    expect(abn).toHaveClass('whitespace-nowrap');
  });

  it('moves the wordmark highlight with the pointer', () => {
    const { container } = renderWithIntl(<Footer />);
    const wordmark = container.querySelector('[aria-hidden] .relative') as HTMLElement;
    fireEvent.pointerMove(wordmark, { clientX: 120, clientY: 30 });
    expect(wordmark.style.getPropertyValue('--wm-x')).toBe('120px');
    expect(wordmark.style.getPropertyValue('--wm-y')).toBe('30px');
  });
});

describe('FooterCta', () => {
  it('underlines the marked words of the title and offers both paths', () => {
    renderWithIntl(<FooterCta />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent("Let's build a fair go, together.");
    expect(within(heading).getByText('together').closest('.relative.inline-block')?.querySelector('svg')).not.toBeNull();

    expect(screen.getByRole('heading', { name: en.ctaContributeLabel })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: en.ctaPartnerLabel })).toBeInTheDocument();
    const discord = screen.getByRole('link', { name: en.ctaDiscord });
    expect(discord).toHaveAttribute('href', DISCORD_INVITE_URL);
    expect(discord).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: en.ctaProjects })).toHaveAttribute('href', '/en/projects');
    expect(screen.getByRole('link', { name: en.ctaPartner })).toHaveAttribute('href', PARTNER_MAILTO);
    expect(screen.getByRole('link', { name: en.ctaPartners })).toHaveAttribute('href', '/en/about#partners');
  });

  it('uses the translated title in other locales', () => {
    renderWithIntl(<FooterCta />, { locale: 'hi' });
    expect(screen.getByText('मिलकर')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: hi.ctaPartners })).toHaveAttribute('href', '/hi/about#partners');
  });

  it('moves a card spotlight with the pointer', () => {
    renderWithIntl(<FooterCta />);
    const card = screen.getByRole('heading', { name: en.ctaPartnerLabel }).closest('.group\\/path') as HTMLElement;
    fireEvent.pointerMove(card, { clientX: 40, clientY: 75 });
    expect(card.style.getPropertyValue('--spot-x')).toBe('40px');
    expect(card.style.getPropertyValue('--spot-y')).toBe('75px');
  });
});

function ThemeSwitch() {
  const { setTheme } = useTheme();
  return (
    <button type="button" onClick={() => setTheme('dark')}>
      go dark
    </button>
  );
}

describe('SiteShareButton', () => {
  const share = messages('hi').Share;

  it('builds a localized, themed share dialog and opens it for the current page', async () => {
    renderWithIntl(<SiteShareButton className="share" />, { locale: 'hi', theme: true });
    await waitFor(() => expect(MockShareDialog.instances).toHaveLength(1));
    const dialog = MockShareDialog.instances[0];
    expect(dialog.options).toMatchObject({
      showButton: false,
      platforms: ['whatsapp', 'twitter', 'linkedin', 'telegram', 'email'],
      theme: 'light',
      labels: {
        share: share.share,
        close: share.close,
        copy: share.copy,
        copied: share.copied,
        copyFailed: share.copyFailed,
        urlLabel: share.urlLabel,
      },
    });
    expect((dialog.options.container as HTMLElement).hidden).toBe(true);

    document.title = 'Projects | AOSSIE';
    const trigger = screen.getByRole('button', { name: share.trigger });
    expect(trigger).toHaveClass('share');
    fireEvent.click(trigger);
    expect(dialog.updateOptions).toHaveBeenCalledWith({ url: window.location.href, title: 'Projects | AOSSIE' });
    expect(dialog.openModal).toHaveBeenCalledTimes(1);
  });

  it('rebuilds the dialog in the new theme when the site theme changes', async () => {
    renderWithIntl(
      <>
        <SiteShareButton className="share" />
        <ThemeSwitch />
      </>,
      { theme: true },
    );
    await waitFor(() => expect(MockShareDialog.instances).toHaveLength(1));
    fireEvent.click(screen.getByRole('button', { name: 'go dark' }));
    await waitFor(() => expect(MockShareDialog.instances).toHaveLength(2));
    expect(MockShareDialog.instances[0].destroy).toHaveBeenCalled();
    expect(MockShareDialog.instances[1].options.theme).toBe('dark');
  });

  it('uses the class the library puts on window when the module has no default export', async () => {
    MockShareDialog.exportOnWindowOnly = true;
    window.SocialShareButton = MockShareDialog as unknown as typeof window.SocialShareButton;
    renderWithIntl(<SiteShareButton className="share" />, { theme: true });
    await waitFor(() => expect(MockShareDialog.instances).toHaveLength(1));
  });

  it('waits for the theme before building the dialog', async () => {
    // Without the ThemeProvider next-themes never resolves a theme
    renderWithIntl(<SiteShareButton className="share" />);
    await act(async () => {});
    expect(MockShareDialog.instances).toHaveLength(0);
    // Clicking without a dialog is a no-op rather than an error
    expect(() => fireEvent.click(screen.getByRole('button', { name: messages('en').Share.trigger }))).not.toThrow();
  });

  it('builds no dialog when the library exposes no class', async () => {
    MockShareDialog.exportOnWindowOnly = true;
    renderWithIntl(<SiteShareButton className="share" />, { theme: true });
    await act(async () => {});
    expect(MockShareDialog.instances).toHaveLength(0);
  });

  it('does not build a dialog after it has been unmounted', async () => {
    const { unmount } = renderWithIntl(<SiteShareButton className="share" />, { theme: true });
    unmount();
    await act(async () => {});
    expect(MockShareDialog.instances).toHaveLength(0);
  });
});
