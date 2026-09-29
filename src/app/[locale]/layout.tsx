import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic, Noto_Sans_Bengali, Noto_Sans_Devanagari } from "next/font/google";
import { routing } from "@/i18n/routing";
import { generateLocaleMetadata } from "@/i18n/metadata";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "@/i18n/messages";
import { getLanguage } from "@/config/languages";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import "./globals.css";

// Latin extended covers Hausa and te reo Māori; Cyrillic covers Russian.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

// Script fonts are not preloaded: the browser fetches them only when a page uses their characters.
const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  display: "swap",
  preload: false,
});

const bengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  display: "swap",
  preload: false,
});

// Used for both Arabic and Urdu
const arabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  return generateLocaleMetadata(locale, "Home");
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Await params since PageProps and LayoutProps are Promises in Next.js 15/16
  const { locale } = await params;

  // Validate that the incoming `locale` is supported
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Provide messages to Client Components
  const messages = getMessages(locale);

  return (
    <html
      lang={locale}
      dir={getLanguage(locale).dir}
      className={`${inter.variable} ${devanagari.variable} ${bengali.variable} ${arabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
          <ThemeProvider>
            <LenisProvider>
              {children}
            </LenisProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
