"use client";

import { useTranslations } from "next-intl";

export default function GSoC() {
    const t = useTranslations("GSoC");

    return (
        <section className="flex flex-col items-center justify-between w-full min-h-[calc(100vh-73px)] py-10 md:py-16 gap-8">
            {/* 1. Main Title & Subtitle */}
            <div className="px-4 sm:px-10 lg:px-14 w-full flex flex-col items-center text-center max-w-6xl mx-auto gap-4">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-foreground leading-[1.1] break-words animate-hero-title">
                    {t("title")}
                </h1>
            </div>

            {/* 2. Reserved Canvas Container */}
            <div className="px-4 sm:px-10 lg:px-14 w-full relative flex flex-col items-center">
                {/* Empty Canvas Space reserved for future central animation assets */}
                <div className="w-full rounded-3xl border border-dashed border-border/60 bg-card/30 min-h-[320px] sm:min-h-[400px] flex items-center justify-center relative overflow-hidden animate-hero-canvas" />
            </div>

            {/* Bottom Horizontal Divider Line (Extends touch-to-touch up to the slanted boundary frames!) */}
            <div className="w-full border-b border-border" />
        </section>
    );
}
