"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { languages } from "@/config/languages";

const emptySubscribe = () => () => {};

export default function Navbar() {
  const locale = useLocale();
  const tNav = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const selectLanguage = (newLocale: string) => {
    setIsLangOpen(false);
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    setIsMobileMenuOpen(false);
    const isHomePage =
      pathname === "/" ||
      pathname === "" ||
      (typeof window !== "undefined" &&
        (window.location.pathname === "/" ||
          window.location.pathname === `/${locale}` ||
          window.location.pathname === `/${locale}/`));

    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (document.scrollingElement) {
        document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      router.push("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentLang = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <nav className="w-full bg-nav-bg backdrop-blur-md transition-colors duration-200 animate-navbar-entrance" ref={mobileMenuRef}>
      <div className="flex items-center justify-between px-4 sm:px-10 lg:px-14 py-4 max-w-full">
        {/* Left: AOSSIE Secondary Logo (With Hover & Touch Micro-Interactions) */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 cursor-pointer group hover:opacity-85 active:scale-95 transition-all duration-200 select-none"
        >
          <Image
            src="/brand/icons/aossie_secondary_dark_logo.svg"
            alt="aossie logo"
            width={120}
            height={24}
            priority
            className="h-6 w-auto theme-icon-invert group-hover:scale-[1.02] transition-transform duration-200"
          />
        </Link>

        {/* Center Desktop: Nav Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-foreground-secondary">
          <Link href="/about" className="hover:text-foreground transition-colors">
            {tNav("about")}
          </Link>
          <Link href="/projects" className="hover:text-foreground transition-colors">
            {tNav("projects")}
          </Link>
          <Link href="/programs" className="hover:text-foreground transition-colors">
            {tNav("programs")}
          </Link>
          <a
            href="https://github.com/AOSSIE-Org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1 group"
          >
            <span>{tNav("github")}</span>
            <span className="text-[14px] leading-none text-foreground-muted group-hover:text-foreground transition-colors">↗</span>
          </a>
        </div>

        {/* Right Desktop: Controls (Language Selector Dropdown Menu & Theme Toggle) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Selector Dropdown Container */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              aria-expanded={isLangOpen}
              aria-haspopup="true"
              aria-label="Select Language"
              className="flex items-center gap-2 p-2 rounded-full border border-border bg-background-secondary hover:bg-hover text-xs font-medium text-foreground transition-all shadow-xs cursor-pointer group"
            >
              <Image
                src="/brand/icons/globe.svg"
                alt="Language"
                width={14}
                height={14}
                className="w-4 h-4 theme-icon-invert"
              />
              <span>{currentLang.code.toUpperCase()}</span>
              
              {/* Proper SVG Down Arrow Icon */}
              <svg
                className={`w-4 h-4 text-foreground-muted transition-transform duration-200 ${
                  isLangOpen ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown Options Menu */}
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-border bg-background-secondary shadow-xl py-2 z-50 animate-in fade-in-0 zoom-in-95">
                <div className="px-3 py-1 text-[10px] font-semibold text-foreground-muted uppercase tracking-wider border-b border-border mb-1">
                  {tNav("selectLanguage")}
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => selectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between p-2 text-xs font-medium transition-colors text-left cursor-pointer ${
                      locale === lang.code
                        ? "text-heading-highlight font-semibold"
                        : "text-foreground-secondary hover:bg-hover"
                    }`}
                  >
                    <span>{lang.localName}</span>
                    <span className="text-[10px] text-foreground-muted font-mono uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-border bg-background-secondary hover:bg-hover text-foreground transition-all shadow-xs cursor-pointer"
            >
              <Image
                src={theme === "dark" ? "/brand/icons/sun.svg" : "/brand/icons/moon.svg"}
                alt="Theme Toggle"
                width={16}
                height={16}
                className={theme === "dark" ? "w-4 h-4" : "w-4 h-4 theme-icon-invert"}
              />
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-background-secondary text-foreground hover:bg-hover transition-all cursor-pointer shadow-xs"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background-secondary/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-4 text-base font-medium text-foreground-secondary">
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-foreground transition-colors py-1"
            >
              {tNav("about")}
            </Link>
            <Link
              href="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-foreground transition-colors py-1"
            >
              {tNav("projects")}
            </Link>
            <Link
              href="/programs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-foreground transition-colors py-1"
            >
              {tNav("programs")}
            </Link>
            <a
              href="https://github.com/AOSSIE-Org"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-foreground transition-colors py-1 flex items-center justify-between"
            >
              <span>{tNav("github")}</span>
              <span className="text-xs text-foreground-muted">↗</span>
            </a>
          </div>

          <div className="border-t border-border" />

          {/* Mobile Controls (Language & Theme Toggle) */}
          <div className="flex items-center justify-between pt-1">
            {/* Mobile Language Selector Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <Image
                src="/brand/icons/globe.svg"
                alt="Language"
                width={16}
                height={16}
                className="w-4 h-4 theme-icon-invert mr-1"
              />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => selectLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    locale === lang.code
                      ? "bg-amber-500/10 border-amber-500/30 text-heading-highlight"
                      : "border-border text-foreground-secondary hover:bg-hover"
                  }`}
                >
                  {lang.localName} ({lang.code.toUpperCase()})
                </button>
              ))}
            </div>

            {/* Mobile Theme Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background hover:bg-hover text-foreground transition-all shadow-xs cursor-pointer shrink-0 ml-2"
              >
                <Image
                  src={theme === "dark" ? "/brand/icons/sun.svg" : "/brand/icons/moon.svg"}
                  alt="Theme Toggle"
                  width={18}
                  height={18}
                  className={theme === "dark" ? "w-4.5 h-4.5" : "w-4.5 h-4.5 theme-icon-invert"}
                />
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
