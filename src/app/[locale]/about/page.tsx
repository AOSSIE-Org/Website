"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import PageWrapper from "@/components/PageWrapper";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  getAllProjects,
  getOrganization,
  ORGANIZATIONS,
  ORGANIZATION_GITHUB,
  type Organization,
} from "@/lib/projectsData";

const EASE = [0.16, 1, 0.3, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE },
};

/** Same heading system as the home page sections. */
function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div {...reveal} className="w-full flex flex-col items-center text-center max-w-5xl mx-auto gap-3">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base lg:text-lg text-foreground-secondary font-normal max-w-4xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const t = useTranslations("AboutPage");
  const facts = [
    { label: t("foundedLabel"), value: "2016" },
    { label: t("statusLabel"), value: t("statusValue") },
    { label: "ABN", value: "32 743 493 466" },
    { label: t("baseLabel"), value: t("baseValue") },
    { label: t("licenseLabel"), value: t("licenseValue") },
  ];

  return (
    <section className="flex flex-col gap-10 sm:gap-14">
      <div className="w-full flex flex-col items-center text-center max-w-5xl mx-auto gap-3">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.1]"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="text-sm sm:text-base lg:text-lg text-foreground-secondary font-normal max-w-4xl leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>
      </div>

      {/* Key facts strip */}
      <motion.dl
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        className="grid grid-cols-2 lg:grid-cols-5 gap-px rounded-3xl border border-border bg-border overflow-hidden"
      >
        {facts.map((fact, i) => (
          <div
            key={fact.label}
            className={`flex flex-col gap-1.5 p-5 sm:p-6 bg-card transition-colors hover:bg-background-secondary ${
              i === facts.length - 1 ? "col-span-2 lg:col-span-1" : ""
            }`}
          >
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">{fact.label}</dt>
            <dd className="text-base sm:text-lg font-medium text-foreground tabular-nums">{fact.value}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pillars                                                             */
/* ------------------------------------------------------------------ */

const pillarIcon = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function Pillars() {
  const t = useTranslations("AboutPage");
  const pillars: { title: string; description: string; icon: ReactNode }[] = [
    {
      title: t("p1Title"),
      description: t("p1Desc"),
      icon: (
        <svg {...pillarIcon}>
          <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />
        </svg>
      ),
    },
    {
      title: t("p2Title"),
      description: t("p2Desc"),
      icon: (
        <svg {...pillarIcon}>
          <path d="M22 10 12 5 2 10l10 5 10-5Z" />
          <path d="M6 12v5c3 2 9 2 12 0v-5" />
        </svg>
      ),
    },
    {
      title: t("p3Title"),
      description: t("p3Desc"),
      icon: (
        <svg {...pillarIcon}>
          <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      ),
    },
  ];

  return (
    <section className="flex flex-col gap-10">
      <SectionHeading title={t("pillarsTitle")} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {pillars.map((pillar, i) => (
          <motion.article
            key={pillar.title}
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.08 }}
            className="group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-card transition-colors hover:border-foreground/20"
          >
            <span
              aria-hidden
              className="absolute -right-6 -top-8 font-mono text-[7rem] font-semibold leading-none text-foreground/[0.04] transition-transform duration-700 group-hover:-translate-x-2 group-hover:translate-y-2"
            >
              0{i + 1}
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background-secondary text-foreground transition-colors duration-300 group-hover:border-heading-highlight group-hover:bg-heading-highlight group-hover:text-brand-dark">
              {pillar.icon}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold tracking-tight text-foreground">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-foreground-secondary">{pillar.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Journey: sticky year that follows the milestone in view             */
/* ------------------------------------------------------------------ */

const MILESTONES = [
  { key: "m1", year: "2011" },
  { key: "m2", year: "2016" },
  { key: "m3", year: "2016" },
  { key: "m4", year: "2017" },
  { key: "m5", year: "2018" },
  { key: "m6", year: "2025" },
] as const;

function Journey() {
  const t = useTranslations("Timeline");
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      // A thin band across the middle of the viewport decides the active milestone
      { rootMargin: "-45% 0px -45% 0px" }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = MILESTONES[active];

  return (
    <section className="flex flex-col gap-10">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
      <div className="hidden lg:block lg:col-span-5">
        <div className="lg:sticky lg:top-40 flex flex-col gap-8">

          <div className="hidden lg:flex flex-col gap-5" aria-hidden>
            <div className="relative h-[7.5rem] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={current.year}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0 text-[7.5rem] font-medium leading-none tracking-[-0.05em] text-foreground tabular-nums"
                >
                  {current.year}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-1.5">
              {MILESTONES.map((m, i) => (
                <span
                  key={m.key}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === active ? "w-10 bg-heading-highlight" : i < active ? "w-4 bg-foreground/40" : "w-4 bg-foreground/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ol className="lg:col-span-7 flex flex-col gap-4">
        {MILESTONES.map((m, i) => (
          <li
            key={m.key}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            data-index={i}
            className={`transition-opacity duration-500 ${i === active ? "lg:opacity-100" : "lg:opacity-50"}`}
          >
            <motion.article
              {...reveal}
              className={`relative rounded-3xl border p-6 sm:p-8 transition-all duration-500 ${
                i === active
                  ? "border-foreground/20 bg-card shadow-card"
                  : "border-border bg-card/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono text-sm font-semibold tabular-nums transition-colors ${
                    i === active ? "text-foreground" : "text-foreground-muted"
                  }`}
                >
                  {m.year}
                </span>
                <span
                  aria-hidden
                  className={`h-px flex-1 origin-left transition-all duration-700 ${
                    i === active ? "bg-heading-highlight scale-x-100" : "bg-border scale-x-50"
                  }`}
                />
              </div>
              <h3 className="mt-4 text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                {t(`${m.key}Title`)}
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-foreground-secondary">
                {t(`${m.key}Desc`)}
              </p>
            </motion.article>
          </li>
        ))}
      </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Ecosystem                                                           */
/* ------------------------------------------------------------------ */

const ORGANIZATION_LOGOS: Record<Organization, string> = {
  AOSSIE: "/brand/icons/aossie_logomark.svg",
  "Stability Nexus": "/brand/icons/stability.svg",
  "Djed Alliance": "/brand/project_svgs/djed_alliance_logo.svg",
};

function Ecosystem() {
  const t = useTranslations("AboutPage");
  const counts = ORGANIZATIONS.map((org) => getAllProjects().filter((p) => getOrganization(p) === org).length);
  const descriptions: Record<Organization, string> = {
    AOSSIE: t("orgAossie"),
    "Stability Nexus": t("orgStability"),
    "Djed Alliance": t("orgDjed"),
  };

  return (
    <section className="flex flex-col gap-10">
      <SectionHeading title={t("ecosystemTitle")} subtitle={t("ecosystemSubtitle")} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {ORGANIZATIONS.map((org, i) => (
          <motion.article
            key={org}
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.08 }}
            className="group flex flex-col gap-6 rounded-3xl border border-border bg-card p-7 shadow-card transition-colors hover:border-foreground/20"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ORGANIZATION_LOGOS[org]} alt="" className="h-10 w-10 object-contain" />
              </span>
              <span className="text-right">
                <span className="block text-4xl font-medium tracking-tight text-foreground tabular-nums">{counts[i]}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">
                  {t("ecosystemProjects")}
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold tracking-tight text-foreground">{org}</h3>
              <p className="text-sm leading-relaxed text-foreground-secondary">{descriptions[org]}</p>
            </div>
            <div className="mt-auto flex items-center gap-4 pt-2 text-sm font-semibold">
              <Link href="/projects" className="group/link inline-flex items-center gap-1.5 text-foreground">
                <span>{t("viewProjects")}</span>
                <span aria-hidden className="transition-transform group-hover/link:translate-x-0.5">→</span>
              </Link>
              <a
                href={ORGANIZATION_GITHUB[org]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground-secondary hover:text-foreground transition-colors"
              >
                <span>GitHub</span>
                <span aria-hidden className="text-[10px]">↗</span>
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Community                                                           */
/* ------------------------------------------------------------------ */

function Community() {
  const t = useTranslations("Team");
  const roles = [
    { title: t("r1Title"), count: "10", description: t("r1Desc") },
    { title: t("r2Title"), count: "70", description: t("r2Desc") },
    { title: t("r3Title"), count: "160+", description: t("r3Desc") },
    { title: t("r4Title"), count: "8,000+", description: t("r4Desc") },
  ];

  return (
    <section className="flex flex-col gap-10">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {roles.map((role, i) => (
          <motion.article
            key={role.title}
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.08 }}
            className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card transition-colors hover:border-foreground/20"
          >
            <span className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground tabular-nums">{role.count}</span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-semibold text-foreground">{role.title}</h3>
              <p className="text-sm leading-relaxed text-foreground-secondary">{role.description}</p>
            </div>
            {/* Fill bar showing each circle's relative size in the community */}
            <span aria-hidden className="mt-auto h-1 w-full overflow-hidden rounded-full bg-background-muted">
              <span
                className="block h-full origin-left rounded-full bg-heading-highlight transition-transform duration-700 ease-out scale-x-[0.3] group-hover:scale-x-100"
                style={{ width: `${[18, 38, 62, 100][i]}%` }}
              />
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="w-full py-14 sm:py-20 px-4 sm:px-10 lg:px-14 max-w-7xl mx-auto flex flex-col gap-24 sm:gap-32">
        <Hero />
        <Pillars />
        <Journey />
        <Ecosystem />
        <Community />
      </div>
    </PageWrapper>
  );
}
