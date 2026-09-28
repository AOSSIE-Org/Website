"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const HubDiagram3D = dynamic(() => import("./HubDiagram3D"), {
  loading: () => (
    <div className="w-full aspect-[1200/450] flex items-center justify-center">
      <div className="w-64 h-64 rounded-full border border-border bg-card/40 animate-pulse flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border border-border bg-background animate-pulse" />
      </div>
    </div>
  ),
});

const PROJECT_SVGS = [
  "/brand/project_svgs/MoveYourBody_logo.svg",
  "/brand/project_svgs/carbonTracker_logo.svg",
  "/brand/project_svgs/chainvoice_logo.svg",
  "/brand/project_svgs/dit_logo.svg",
  "/brand/project_svgs/djed_alliance_logo.svg",
  "/brand/project_svgs/ellena_logo.svg",
  "/brand/project_svgs/fate_logo.svg",
  "/brand/project_svgs/minichain_logo.svg",
  "/brand/project_svgs/ogh_logo.svg",
  "/brand/project_svgs/pictopy_logo.svg",
  "/brand/project_svgs/rein_logo.svg",
  "/brand/project_svgs/resonate_logo.svg",
  "/brand/project_logos/skills_logo.png",
  "/brand/project_svgs/stablepay_logo.svg",
  "/brand/project_svgs/thrubox_logo.svg",
  "/brand/project_svgs/tnt_logo.svg",
  "/brand/project_svgs/zplit_logo.svg",
];

function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/* ------------------------------------------------------------------ */

export default function Hero() {
  const t = useTranslations("Hero");
  const [randomLogos, setRandomLogos] = useState<string[]>(() => PROJECT_SVGS.slice(0, 6));

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const shuffled = fisherYatesShuffle(PROJECT_SVGS);
      setRandomLogos(shuffled.slice(0, 6));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="flex flex-col items-center w-full min-h-[calc(100svh-69px)] md:min-h-[calc(100svh-66.4px)] pt-10 md:pt-14 [@media(max-height:54rem)]:pt-6">
      {/* 1. Main Title, Subtitle & Join Our Community Button */}
      <div className="px-4 sm:px-10 lg:px-14 w-full flex flex-col items-center text-center max-w-6xl mx-auto gap-4 mb-6 [@media(max-height:54rem)]:mb-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl [@media(min-width:48rem)_and_(max-height:54rem)]:text-6xl font-medium tracking-tight text-foreground leading-[1.1] break-words animate-hero-title">
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </h1>

        <p className="text-base sm:text-lg text-foreground-secondary font-normal leading-relaxed mt-2 animate-hero-subtext">
          {t("subtitlePrefix")}
          <span className="font-semibold text-brand-yellow">2016</span>
        </p>

        {/* Floating "Join Our Community →" Pill Button (positioned close to title & subtitle) */}
        <div className="relative z-20 mt-2 animate-hero-badge">
          <a
            href="https://discord.gg/hjUhu33uAn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border bg-background hover:bg-hover hover:scale-105 text-md font-semibold text-foreground transition-all shadow-md hover:shadow-lg cursor-pointer group"
          >
            <span>{t("joinCommunity")}</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>

      {/* 2. Reserved Canvas Container (absorbs spare height, keeping the diagram centred) */}
      <div className="flex-1 lg:px-2 xl:px-14 w-full max-w-[max(36rem,calc((100svh-31rem)*3.1))] [@media(min-width:48rem)_and_(max-height:54rem)]:max-w-[max(40rem,calc((100svh-25rem)*3.1))] [@media(min-width:48rem)_and_(max-height:54rem)]:-mt-[4.5rem] mx-auto relative z-0 flex flex-col items-center justify-center md:justify-end">
        {/* Canvas: central 3D hub diagram connecting AOSSIE to its projects */}
        <div className="w-full -mt-[1.5%] -mb-[1.5%] flex items-center justify-center relative overflow-hidden animate-hero-canvas">
          <HubDiagram3D logos={randomLogos} />
        </div>
      </div>

      {/* 3. Hero Bottom Bar: social media icons, centred with equal space above and below */}
      <div className="px-4 sm:px-10 lg:px-14 w-full flex items-center justify-center py-6 animate-hero-footer">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <a
            href="https://discord.gg/hjUhu33uAn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-hover hover:scale-105 flex items-center justify-center transition-all shadow-xs"
          >
            <Image src="/brand/icons/discord.svg" alt="" width={20} height={20} className="theme-icon-invert" />
          </a>
          <a
            href="https://x.com/aossie_org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-hover hover:scale-105 flex items-center justify-center transition-all shadow-xs"
          >
            <Image src="/brand/icons/twitter.svg" alt="" width={14} height={14} className="theme-icon-invert" />
          </a>

          <a
            href="https://www.linkedin.com/company/aossie/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-hover hover:scale-105 flex items-center justify-center transition-all shadow-xs"
          >
            <Image src="/brand/icons/linkedin.svg" alt="" width={18} height={18} className="theme-icon-invert" />
          </a>

          <a
            href="https://github.com/AOSSIE-Org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-hover hover:scale-105 flex items-center justify-center transition-all shadow-xs"
          >
            <Image src="/brand/icons/github.svg" alt="" width={18} height={18} className="theme-icon-invert" />
          </a>

          <a
            href="https://www.youtube.com/@AOSSIE-Org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-hover hover:scale-105 flex items-center justify-center transition-all shadow-xs"
          >
            <Image src="/brand/icons/youtube.svg" alt="" width={20} height={20} className="theme-icon-invert" />
          </a>

          <a
            href="mailto:aossie.oss@gmail.com"
            aria-label={t("emailLabel")}
            className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-hover hover:scale-105 flex items-center justify-center transition-all shadow-xs"
          >
            <Image src="/brand/icons/mail.svg" alt="" width={20} height={20} className="theme-icon-invert" />
          </a>
        </div>
      </div>

      {/* Bottom Horizontal Divider Line (Extends touch-to-touch up to the slanted boundary frames!) */}
      <div className="w-full border-b border-border" />
    </section>
  );
}