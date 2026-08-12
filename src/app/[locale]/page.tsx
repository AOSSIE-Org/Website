"use client";

import Script from "next/script";
import { useTranslations } from "next-intl";
import { use } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

function ProjectsSkeleton() {
  return (
    <section className="w-full relative h-[420vh] bg-background border-b border-border">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center pt-24 pb-10 gap-6 overflow-hidden">
        <div className="px-4 sm:px-10 lg:px-14 w-full flex flex-col items-center text-center max-w-5xl mx-auto gap-3 z-10 shrink-0">
          <div className="h-12 w-64 bg-foreground-muted/10 rounded-xl animate-pulse" />
          <div className="h-6 w-96 max-w-full bg-foreground-muted/10 rounded-lg animate-pulse" />
        </div>
        <div className="w-full flex-1 flex items-center justify-center">
          <div className="w-48 h-48 rounded-2xl bg-card border border-border animate-pulse shadow-md" />
        </div>
      </div>
    </section>
  );
}

function StatsSkeleton() {
  return (
    <section className="w-full relative h-[140vh] sm:h-[120vh] bg-background border-b border-border">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center pt-24 pb-10 gap-8 overflow-hidden">
        <div className="w-full flex flex-col items-center text-center max-w-6xl mx-auto gap-4 px-4 sm:px-10 lg:px-14 shrink-0">
          <div className="h-12 w-72 bg-foreground-muted/10 rounded-xl animate-pulse" />
          <div className="h-6 w-80 max-w-full bg-foreground-muted/10 rounded-lg animate-pulse" />
        </div>
        <div className="flex-1 w-full flex items-center justify-center relative px-4 sm:px-10 lg:px-14">
          <div className="w-64 h-56 rounded-2xl bg-card border border-border animate-pulse shadow-md" />
        </div>
      </div>
    </section>
  );
}

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <ProjectsSkeleton />,
});

const Stats = dynamic(() => import("@/components/Stats"), {
  loading: () => <StatsSkeleton />,
});

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
              <Stats />
            </main>
          </div>

          {/* Right Edge Slanted Lines Column (Visible on mobile with w-5) */}
          <div className="w-5 sm:w-12 md:w-16 lg:w-20 shrink-0 slanted-bg-pattern border-r border-border" />

        </div>

      </div>
    </div>
  );
}



