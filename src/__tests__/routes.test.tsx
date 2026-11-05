import { isValidElement, type ReactElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { describe, expect, it, vi } from 'vitest';
import RootRedirectLayout from '@/app/(root)/layout';
import RootPage, { generateMetadata as rootMetadata } from '@/app/(root)/page';
import LocaleLayout, { dynamicParams, generateMetadata as localeMetadata, generateStaticParams } from '@/app/[locale]/layout';
import ErrorBoundary from '@/app/[locale]/error';
import NotFound from '@/app/[locale]/not-found';
import AboutLayout, { generateMetadata as aboutMetadata } from '@/app/[locale]/about/layout';
import ProgramsLayout, { generateMetadata as programsMetadata } from '@/app/[locale]/programs/layout';
import ProjectsLayout, { generateMetadata as projectsMetadata } from '@/app/[locale]/projects/layout';
import IdeasPage, { generateStaticParams as ideasParams } from '@/app/[locale]/ideas/page';
import PrivacyPage, { generateMetadata as privacyMetadata } from '@/app/[locale]/privacy/page';
import TermsPage, { generateMetadata as termsMetadata } from '@/app/[locale]/terms/page';
import SupportPage, { generateMetadata as supportMetadata } from '@/app/[locale]/support/page';
import LegalPage from '@/components/LegalPage';
import getRequestConfig from '@/i18n/request';
import { generateLocaleMetadata, generatePageMetadata } from '@/i18n/metadata';
import { MESSAGES } from '@/i18n/messages';
import { languages } from '@/config/languages';
import { GITHUB_SPONSORS_URL, GSOC_URL, STABILITY_NEXUS_URL } from '@/config/links';
import { SUPPORTERS } from '@/config/support';
import { messages, renderWithIntl } from './test-utils/render';
import { notFound } from './test-utils/next-navigation';
import { themeInitScript } from '@/components/providers/theme-script';

const params = (locale: string) => ({ params: Promise.resolve({ locale }) });
const codes = languages.map((l) => l.code);

/** Shows a translated string, proving which catalog a provider received. */
function Probe() {
  return <span data-testid="probe">{useTranslations('Navbar')('home')}</span>;
}

describe('Locale root layout', () => {
  it('pre-renders every locale and nothing else', () => {
    expect(generateStaticParams()).toEqual(codes.map((locale) => ({ locale })));
    expect(dynamicParams).toBe(false);
  });

  it.each([
    ['en', 'ltr'],
    ['ar', 'rtl'],
    ['ur', 'rtl'],
    ['hi', 'ltr'],
  ])('renders <html lang="%s" dir="%s"> with the script fonts', async (locale, dir) => {
    const html = (await LocaleLayout({ children: <Probe />, ...params(locale) })) as ReactElement<{
      lang: string;
      dir: string;
      className: string;
      children: [ReactElement<{ children: ReactElement<{ dangerouslySetInnerHTML: { __html: string } }> }>, ReactElement<{ children: ReactNode }>];
    }>;
    expect(html.type).toBe('html');
    expect(html.props.lang).toBe(locale);
    expect(html.props.dir).toBe(dir);
    for (const variable of ['--font-inter', '--font-devanagari', '--font-bengali', '--font-arabic']) {
      expect(html.props.className).toContain(variable);
    }
    expect(setRequestLocale).toHaveBeenCalledWith(locale);

    // The theme is applied from <head>, before <body> exists, so the first paint is never the wrong theme
    const [head, body] = html.props.children;
    expect(head.type).toBe('head');
    expect(head.props.children.props.dangerouslySetInnerHTML.__html).toBe(themeInitScript);

    // The body provides that locale's messages, the theme and smooth scrolling to the page
    expect(body.type).toBe('body');
    render(<>{body.props.children}</>);
    expect(screen.getByTestId('probe')).toHaveTextContent(MESSAGES[locale as keyof typeof MESSAGES].Navbar.home);
  });

  it('rejects an unknown locale', async () => {
    await expect(LocaleLayout({ children: null, ...params('xx') })).rejects.toThrow('NEXT_NOT_FOUND');
    await expect(localeMetadata(params('xx'))).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalledTimes(2);
  });

  it('uses the localized home metadata', async () => {
    expect(await localeMetadata(params('es'))).toEqual(await generateLocaleMetadata('es'));
  });
});

describe('Root redirect route', () => {
  it('wraps the redirect in a minimal English document', () => {
    const html = RootRedirectLayout({ children: <p>x</p> }) as ReactElement<{ lang: string; children: ReactElement }>;
    expect(html.type).toBe('html');
    expect(html.props.lang).toBe('en');
    expect(html.props.children.type).toBe('body');
  });

  it('forwards to the default locale by script, with a meta refresh and a link as fallbacks', async () => {
    const markup = renderToStaticMarkup(<RootPage />);
    expect(markup).toContain('<script>location.replace("/en")</script>');
    expect(markup).toContain('<meta http-equiv="refresh" content="0; url=/en"/>');
    expect(markup).toContain(`<noscript><a href="/en">${messages('en').NotFound.home}</a></noscript>`);
    expect(await rootMetadata()).toEqual(await generateLocaleMetadata('en'));
  });
});

describe('Sub-page layouts', () => {
  it.each([
    ['about', aboutMetadata, AboutLayout],
    ['programs', programsMetadata, ProgramsLayout],
    ['projects', projectsMetadata, ProjectsLayout],
  ] as const)('%s declares its own metadata and passes the page through', async (page, generateMetadata, Layout) => {
    expect(await generateMetadata(params('zh'))).toEqual(await generatePageMetadata('zh', page));
    const child = <p>page</p>;
    expect(Layout({ children: child })).toBe(child);
  });
});

describe('Ideas route', () => {
  it('redirects to the programs page in the same locale', async () => {
    expect(ideasParams()).toEqual(codes.map((locale) => ({ locale })));
    await expect(IdeasPage(params('hi'))).rejects.toThrow('NEXT_REDIRECT:/hi/programs');
  });
});

describe('Error boundary', () => {
  it('logs the error and offers a localized retry', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('boom');
    const reset = vi.fn();
    const t = messages('hi').Error;
    renderWithIntl(<ErrorBoundary error={error} reset={reset} />, { locale: 'hi' });
    expect(consoleError).toHaveBeenCalledWith(error);
    expect(screen.getByRole('heading', { level: 1, name: t.title })).toBeInTheDocument();
    expect(screen.getByText(t.description)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: t.retry }));
    expect(reset).toHaveBeenCalledTimes(1);
    consoleError.mockRestore();
  });
});

describe('Not-found page', () => {
  it('explains the problem and links to the localized home page', () => {
    const t = messages('fr').NotFound;
    renderWithIntl(<NotFound />, { locale: 'fr', path: '/missing' });
    expect(screen.getByRole('heading', { level: 1, name: t.title })).toBeInTheDocument();
    expect(screen.getByText(t.description)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: t.home })).toHaveAttribute('href', '/fr');
  });
});

describe('Legal pages', () => {
  it.each([
    ['privacy', PrivacyPage, privacyMetadata],
    ['terms', TermsPage, termsMetadata],
  ] as const)('%s renders the legal document for the locale', async (document, Page, generateMetadata) => {
    expect(await generateMetadata(params('bn'))).toEqual(await generatePageMetadata('bn', document));
    const page = (await Page(params('bn'))) as ReactElement<{ locale: string; document: string }>;
    expect(setRequestLocale).toHaveBeenCalledWith('bn');
    expect(page.type).toBe(LegalPage);
    expect(page.props).toEqual({ locale: 'bn', document });
  });

  it('shows the English privacy policy with an "English only" note on other locales', async () => {
    renderWithIntl(await LegalPage({ locale: 'hi', document: 'privacy' }), { locale: 'hi', path: '/privacy' });
    expect(screen.getByRole('note')).toHaveTextContent(messages('hi').Legal.englishOnly);
    const main = screen.getByRole('main');
    expect(within(main).getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument();
    // The English document keeps an English, left-to-right layout inside a translated page
    expect(main.querySelector('[dir="ltr"] > [lang="en"]')).not.toBeNull();
    expect(within(main).getByRole('link', { name: 'GitHub Sponsors' })).toHaveAttribute('href', GITHUB_SPONSORS_URL);
  });

  it('links the terms to the privacy page of the same locale, without a note in English', async () => {
    renderWithIntl(await LegalPage({ locale: 'en', document: 'terms' }), { path: '/terms' });
    expect(screen.queryByRole('note')).toBeNull();
    const main = screen.getByRole('main');
    expect(within(main).getByRole('heading', { level: 1, name: 'Terms of Service' })).toBeInTheDocument();
    expect(within(main).getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/en/privacy');
  });
});

describe('Support page', () => {
  it('shows the localized support widget with the GitHub Sponsors link', async () => {
    const t = messages('hi').SupportPage;
    expect(await supportMetadata(params('hi'))).toEqual(await generatePageMetadata('hi', 'support'));
    const page = await SupportPage(params('hi'));
    expect(setRequestLocale).toHaveBeenCalledWith('hi');
    expect(isValidElement(page)).toBe(true);

    renderWithIntl(page, { locale: 'hi', path: '/support' });
    const main = screen.getByRole('main');
    expect(within(main).getByText(t.title)).toBeInTheDocument();
    expect(within(main).getByText(t.organizationDescription)).toBeInTheDocument();
    expect(within(main).getByText(t.supportedBy, { exact: false })).toBeInTheDocument();
    // Supporters are linked by name, with no sponsorship tier claimed
    const gsoc = within(main).getByRole('link', { name: /Google Summer of Code/ });
    expect(gsoc).toHaveAttribute('href', GSOC_URL);
    const nexus = within(main).getByRole('link', { name: /Stability Nexus/ });
    expect(nexus).toHaveAttribute('href', STABILITY_NEXUS_URL);
    expect(within(main).queryByText(/Platinum|Gold|Silver|Bronze/)).toBeNull();

    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    fireEvent.click(within(main).getByRole('button', { name: 'GitHub Sponsors' }));
    expect(open).toHaveBeenCalledWith(GITHUB_SPONSORS_URL, '_blank', 'noopener,noreferrer');
    open.mockRestore();
  });
});

describe('Supporters (config/support)', () => {
  it('lists Google Summer of Code and Stability Nexus with https links and no tier', () => {
    expect(SUPPORTERS).toEqual([
      { name: 'Google Summer of Code', link: GSOC_URL },
      { name: 'Stability Nexus', link: STABILITY_NEXUS_URL },
    ]);
    SUPPORTERS.forEach((s) => expect(new URL(s.link).protocol).toBe('https:'));
  });
});

describe('Request config (next-intl/config)', () => {
  // getRequestConfig is the identity in tests, so the default export is the factory itself
  const resolve = getRequestConfig as unknown as (args: { requestLocale: Promise<string | undefined> }) => Promise<{
    locale: string;
    messages: unknown;
  }>;

  it.each(codes)('loads the %s catalog for a supported locale', async (locale) => {
    expect(await resolve({ requestLocale: Promise.resolve(locale) })).toEqual({
      locale,
      messages: MESSAGES[locale as keyof typeof MESSAGES],
    });
  });

  it.each([undefined, 'xx', 'EN'])('falls back to English for %s', async (requested) => {
    expect(await resolve({ requestLocale: Promise.resolve(requested) })).toEqual({ locale: 'en', messages: MESSAGES.en });
  });
});
