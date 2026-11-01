import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, type Messages } from "@/i18n/messages";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { navigation } from "./next-navigation";

interface IntlRenderOptions extends Omit<RenderOptions, "wrapper"> {
  locale?: string;
  /** Path after the locale prefix, e.g. "/about" (default: the locale's home page). */
  path?: string;
  /** Wrap in the site's ThemeProvider (next-themes), as the locale layout does. */
  theme?: boolean;
}

/**
 * Renders `ui` the way the locale layout does: inside NextIntlClientProvider with the real
 * message catalog for `locale`, at the browser path `/${locale}${path}`.
 */
export function renderWithIntl(ui: ReactElement, { locale = "en", path = "", theme = false, ...options }: IntlRenderOptions = {}) {
  navigation.pathname = `/${locale}${path}`;
  navigation.params = { locale };
  // Keep jsdom's own URL in step, for code that reads window.location
  window.history.replaceState(null, "", navigation.pathname);
  function Wrapper({ children }: { children: ReactNode }) {
    const content = theme ? <ThemeProvider>{children}</ThemeProvider> : children;
    return (
      <NextIntlClientProvider locale={locale} messages={getMessages(locale)} timeZone="UTC">
        {content}
      </NextIntlClientProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}

/** The real message catalog for a locale, for asserting on translated text. */
export function messages(locale: string): Messages {
  return getMessages(locale);
}
