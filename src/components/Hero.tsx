"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="flex flex-col items-center justify-between w-full min-h-[calc(100vh-73px)] py-10 md:py-16 gap-8">
      {/* 1. Main Title & Subtitle */}
      <div className="px-4 sm:px-10 lg:px-14 w-full flex flex-col items-center text-center max-w-6xl mx-auto gap-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-foreground leading-[1.1] break-words animate-hero-title">
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </h1>

        <p className="text-base sm:text-lg text-foreground-secondary font-normal leading-relaxed mt-2 animate-hero-subtext">
          {t("subtitlePrefix")}
          <span className="font-semibold text-brand-yellow">2016</span>
        </p>
      </div>

      {/* 2. Floating "Learn More →" Badge & Reserved Canvas Container */}
      <div className="px-4 sm:px-10 lg:px-14 w-full relative flex flex-col items-center">
        {/* Floating "Learn More →" Pill Button */}
        <div className="z-20 mb-6 animate-hero-badge">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border bg-background hover:bg-hover hover:scale-105 text-md font-semibold text-foreground transition-all shadow-md hover:shadow-lg cursor-pointer group"
          >
            <span>{t("learnMore")}</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Empty Canvas Space reserved for future central animation assets */}
        <div className="w-full rounded-3xl border border-dashed border-border/60 bg-card/30 min-h-[320px] sm:min-h-[400px] flex items-center justify-center relative overflow-hidden animate-hero-canvas" />
      </div>

      {/* 3. Hero Bottom Bar (Copyright & Social Media aligned to content boundary) */}
      <div className="px-4 sm:px-10 lg:px-14 w-full flex flex-col sm:flex-row items-center justify-between pb-4 pt-6 gap-4 text-foreground-secondary animate-hero-footer">
        {/* Left: Copyright (16px) */}
        <p className="text-center sm:text-left text-[16px] font-medium leading-normal">
          {t("copyright")}
        </p>

        {/* Right: Social Media Icon Buttons (Label on top on mobile, inline on desktop) */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <span className="text-[16px] font-medium text-center sm:text-left">{t("socialMedia")}</span>
          
          <div className="flex items-center flex-wrap justify-center sm:justify-end gap-2 sm:gap-3">
            <a
              href="https://x.com/aossie_org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-hover hover:scale-105 flex items-center justify-center transition-all shadow-xs"
            >
              <Image src="/brand/icons/twitter.svg" alt="X" width={14} height={14} className="theme-icon-invert" />
            </a>

            <a
              href="https://www.linkedin.com/company/aossie/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-hover hover:scale-105 flex items-center justify-center transition-all shadow-xs"
            >
              <Image src="/brand/icons/linkedin.svg" alt="LinkedIn" width={18} height={18} className="theme-icon-invert" />
            </a>

            <a
              href="https://github.com/AOSSIE-Org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-hover hover:scale-105 flex items-center justify-center transition-all shadow-xs"
            >
              <Image src="/brand/icons/github.svg" alt="GitHub" width={18} height={18} className="theme-icon-invert" />
            </a>

            <a
              href="https://discord.gg/hjUhu33uAn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-hover hover:scale-105 flex items-center justify-center transition-all shadow-xs"
            >
              <Image src="/brand/icons/discord.svg" alt="Discord" width={20} height={20} className="theme-icon-invert" />
            </a>

            <a
              href="mailto:aossie.osst@gmail.com"
              aria-label="Email"
              className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-hover hover:scale-105 flex items-center justify-center transition-all shadow-xs"
            >
              <Image src="/brand/icons/mail.svg" alt="Mail" width={20} height={20} className="theme-icon-invert" />
            </a>

            <a
              href="https://www.youtube.com/@AOSSIE-Org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-hover hover:scale-105 flex items-center justify-center transition-all shadow-xs"
            >
              <Image src="/brand/icons/youtube.svg" alt="YouTube" width={20} height={20} className="theme-icon-invert" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Divider Line (Extends touch-to-touch up to the slanted boundary frames!) */}
      <div className="w-full border-b border-border" />
    </section>
  );
}
