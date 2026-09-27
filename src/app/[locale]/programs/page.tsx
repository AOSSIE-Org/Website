"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AOSSIE_DISCORD_INVITE } from "@/lib/projectsData";
import { GSOC_APPLY_URL } from "@/lib/links";

interface ProgramAction {
  label: string;
  href: string;
  primary?: boolean;
}

interface Program {
  id: string;
  title: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
  actions: ProgramAction[];
}

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** The Google Summer of Code mark (star, disc and code brackets), drawn as an outline. */
function GsocIcon() {
  return (
    <svg {...iconProps} viewBox="0.4 -0.9 27.9 27.9" strokeWidth={1.6}>
      <path d="M10.68 21.82 14.36 25.5l3.69-3.68h5.2v-5.21l3.69-3.68-3.69-3.69V4H18L14.36.35 10.68 4H5.47v5.24l-3.68 3.69 3.68 3.68v5.21h5.21Z" />
      <circle cx="14.36" cy="12.93" r="6.4" />
      <path d="m12.1 10.75-2 2 2 2M16.6 10.75l2 2-2 2M15.1 9.9l-1.5 5.7" />
    </svg>
  );
}

function MentorIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="8" cy="7" r="3" />
      <path d="M2.5 20a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.25" />
      <path d="M14.5 15.2A4.5 4.5 0 0 1 21.5 19" />
    </svg>
  );
}

function SnowflakeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 2v20M3.34 7l17.32 10M3.34 17 20.66 7" />
      <path d="m9.5 3.5 2.5 2 2.5-2M9.5 20.5l2.5-2 2.5 2M4 10.2l3.1-.6-.9-3M20 13.8l-3.1.6.9 3M4 13.8l3.1.6-.9 3M20 10.2l-3.1-.6.9-3" />
    </svg>
  );
}

function isExternal(href: string) {
  return href.startsWith("http");
}

export default function ProgramsPage() {
  const t = useTranslations("ProgramsPage");

  const programs: Program[] = [
    {
      id: "gsoc",
      title: t("gsocTitle"),
      description: t("gsocDesc"),
      icon: <GsocIcon />,
      actions: [
        { label: t("gsocApply"), href: GSOC_APPLY_URL, primary: true },
      ],
    },
    {
      id: "internships",
      title: t("internTitle"),
      description: t("internDesc"),
      icon: <MentorIcon />,
      actions: [{ label: t("internCta"), href: AOSSIE_DISCORD_INVITE, primary: true }],
    },
    {
      id: "awoc",
      title: t("awocTitle"),
      description: t("awocDesc"),
      badge: t("awocBadge"),
      icon: <SnowflakeIcon />,
      actions: [{ label: t("awocCta"), href: "mailto:contact@aossie.org", primary: true }],
    },
  ];

  return (
    <PageWrapper>
      <div className="w-full py-12 sm:py-16 px-4 sm:px-10 lg:px-14 max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.1]"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-foreground-secondary leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Programs Grid */}
        <ol className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {programs.map((program, idx) => (
            <motion.li
              key={program.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col rounded-3xl border border-border bg-card shadow-card overflow-hidden transition-colors duration-300 hover:border-foreground/20"
            >
              {/* Accent rule that grows on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-heading-highlight transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100"
              />

              <div className="flex flex-col gap-6 p-7 sm:p-8 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background-secondary text-foreground transition-colors duration-300 group-hover:bg-heading-highlight group-hover:border-heading-highlight group-hover:text-brand-dark">
                    {program.icon}
                  </span>
                  <span className="font-mono text-sm text-foreground-muted tabular-nums" aria-hidden>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">{program.title}</h2>
                  <p className="text-[15px] text-foreground-secondary leading-relaxed">{program.description}</p>
                  {program.badge && (
                    <span className="mt-1 w-fit inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border border-heading-highlight/40 bg-heading-highlight/10 text-foreground">
                      <span aria-hidden className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-heading-highlight opacity-75 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-heading-highlight" />
                      </span>
                      {program.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 px-7 sm:px-8 pb-7 sm:pb-8">
                {program.actions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    {...(isExternal(action.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`group/btn flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      action.primary
                        ? "bg-foreground text-background hover:opacity-90"
                        : "border border-border bg-background text-foreground hover:bg-hover"
                    }`}
                  >
                    <span className="truncate">{action.label}</span>
                    <span aria-hidden className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </PageWrapper>
  );
}
