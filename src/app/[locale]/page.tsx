"use client";

import Script from "next/script";
import { useTranslations } from "next-intl";
import { use } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import GSoC from "@/components/GSoC";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = useTranslations("Home");

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AOSSIE Website",
    "description": t("metaDescription"),
    "publisher": {
      "@type": "Organization",
      "name": "AOSSIE",
      "url": "https://aossie.org",
      "logo": "https://aossie.org/brand/icons/aossie_logo.svg",
    },
    "inLanguage": locale,
  };

  return (
    <div className="w-full min-h-screen bg-outer-bg flex justify-center text-foreground font-sans transition-colors duration-200">
      {/* Schema.org JSON-LD Structured Data */}
      <Script
        id="schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Container Bounded to Max Width */}
      <div className="w-full max-w-[1440px] flex flex-col min-h-screen">
        
        {/* 1. Navbar Row (Sticky Top, Clean Background, NO Slanted Lines, NO Inner Vertical Lines) */}
        <div className="sticky top-0 z-50 w-full bg-nav-bg backdrop-blur-md border-b border-x border-border">
          <div className="flex w-full min-w-0">
            {/* Left clean spacer matching edge column width */}
            <div className="w-5 sm:w-12 md:w-16 lg:w-20 shrink-0 bg-background" />
            
            {/* Center Navbar */}
            <div className="flex-1 min-w-0 bg-background">
              <Navbar />
            </div>

            {/* Right clean spacer matching edge column width */}
            <div className="w-5 sm:w-12 md:w-16 lg:w-20 shrink-0 bg-background" />
          </div>
        </div>

        {/* 2. Body Row Below Navbar (Left Slanted Column, Main Content, Right Slanted Column) */}
        <div className="flex-1 flex w-full min-w-0">
          
          {/* Left Edge Slanted Lines Column (Visible on mobile with w-5) */}
          <div className="w-5 sm:w-12 md:w-16 lg:w-20 shrink-0 slanted-bg-pattern border-x border-border" />

          {/* Main Center Content Column (Hero + Projects) */}
          <div className="flex-1 min-w-0 bg-background border-r border-border flex flex-col justify-between">
            <main className="flex-1 flex flex-col justify-between min-w-0">
              <Hero />
              <Projects />
              <GSoC />
            </main>
          </div>

          {/* Right Edge Slanted Lines Column (Visible on mobile with w-5) */}
          <div className="w-5 sm:w-12 md:w-16 lg:w-20 shrink-0 slanted-bg-pattern border-r border-border" />

        </div>

      </div>
    </div>
  );
}



