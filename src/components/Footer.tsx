"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full bg-background border-t border-border pt-12 pb-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-14 flex flex-col gap-10">
        
        {/* Top Section: Organization Brand & Nav Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Mission Column (Col 1-5) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-2 group w-fit">
              <Image
                src="/brand/icons/aossie_secondary_dark_logo.svg"
                alt="AOSSIE Logo"
                width={130}
                height={26}
                className="h-7 w-auto theme-icon-invert group-hover:opacity-85 transition-opacity"
              />
            </Link>
            <p className="text-sm text-foreground-secondary leading-relaxed max-w-md">
              {t("description")}
            </p>
          </div>

          {/* Quick Links Column (Col 6-8) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              {t("quickLinks")}
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-foreground-secondary">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  {t("aboutLink")}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  {t("projectsLink")}
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-foreground transition-colors">
                  {t("programsLink")}
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-foreground transition-colors">
                  {t("applyLink")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Social Links Column (Col 9-12) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              {t("community")}
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-foreground-secondary">
              <a
                href="https://discord.gg/hjUhu33uAn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-hover hover:text-foreground transition-all flex items-center gap-1.5"
              >
                <span>Discord</span>
                <span className="text-[10px]">↗</span>
              </a>
              <a
                href="https://github.com/AOSSIE-Org"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-hover hover:text-foreground transition-all flex items-center gap-1.5"
              >
                <span>GitHub</span>
                <span className="text-[10px]">↗</span>
              </a>
              <a
                href="https://t.me/+bMWGzaMTMa8xN2Ex"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-hover hover:text-foreground transition-all flex items-center gap-1.5"
              >
                <span>Telegram</span>
                <span className="text-[10px]">↗</span>
              </a>
              <a
                href="https://www.linkedin.com/company/aossie/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-hover hover:text-foreground transition-all flex items-center gap-1.5"
              >
                <span>LinkedIn</span>
                <span className="text-[10px]">↗</span>
              </a>
              <a
                href="https://www.youtube.com/@AOSSIE-Org"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-hover hover:text-foreground transition-all flex items-center gap-1.5"
              >
                <span>YouTube</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Minimalistic Official Footnote Bar (Google for Nonprofits & Australian Statutory Compliance) */}
        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground-muted font-sans">
          
          {/* Registered Non-Profit Details (ABN + Physical Address) */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center md:text-left">
            <span className="font-semibold text-foreground-secondary">
              {t("orgName")}
            </span>
            <span className="hidden md:inline">•</span>
            <span>{t("abnLabel")} <strong className="font-mono text-foreground-secondary">32 743 493 466</strong></span>
            <span className="hidden md:inline">•</span>
            <span>{t("addressText")}</span>
          </div>

          {/* Copyright & License */}
          <div className="text-center md:text-right shrink-0">
            {t("copyright")}
          </div>

        </div>

      </div>
    </footer>
  );
}
