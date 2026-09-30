"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import PageWrapper from "@/components/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { getAllProjects, getOrganization, ORGANIZATION_GITHUB, type Organization } from "@/lib/projectsData";
import { CONTACT_EMAIL, PARTNER_MAILTO } from "@/lib/links";

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
/* Sponsors, partners and supporters                                   */
/* ------------------------------------------------------------------ */

interface Supporter {
  name: string;
  /** Translation keys under AboutPage: `${key}Role` and `${key}Desc`. */
  key: "gsoc" | "stability" | "djed";
  logo: string;
  /** Variant for dark mode, for logos whose wordmark is dark. */
  logoDark?: string;
  website: string;
  github?: string;
  /** Partner organization whose repositories hold AOSSIE projects, used for the project count. */
  organization?: Organization;
  since?: string;
}

const SUPPORTERS: Supporter[] = [
  {
    name: "Google Summer of Code",
    key: "gsoc",
    logo: "/brand/icons/gsoc_full_logo_light.svg",
    logoDark: "/brand/icons/gsoc_full_logo.svg",
    website: "https://summerofcode.withgoogle.com/",
    since: "2016",
  },
  {
    name: "Stability Nexus",
    key: "stability",
    logo: "/brand/icons/stability_nexus_full_logo.svg",
    website: "https://stability.nexus/",
    github: ORGANIZATION_GITHUB["Stability Nexus"],
    organization: "Stability Nexus",
  },
  {
    name: "Djed Alliance",
    key: "djed",
    logo: "/brand/project_svgs/djed_alliance_logo.svg",
    website: "https://djed.one/",
    github: ORGANIZATION_GITHUB["Djed Alliance"],
    organization: "Djed Alliance",
  },
];

const supportIcon = { ...pillarIcon, width: 20, height: 20 };

function Partners() {
  const t = useTranslations("AboutPage");
  const projectCount = (org: Organization) => getAllProjects().filter((p) => getOrganization(p) === org).length;

  const ways: { title: string; description: string; icon: ReactNode }[] = [
    {
      title: t("way1Title"),
      description: t("way1Desc"),
      icon: (
        <svg {...supportIcon}>
          <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z" />
        </svg>
      ),
    },
    {
      title: t("way2Title"),
      description: t("way2Desc"),
      icon: (
        <svg {...supportIcon}>
          <circle cx="9" cy="12" r="6" />
          <circle cx="15" cy="12" r="6" />
        </svg>
      ),
    },
    {
      title: t("way3Title"),
      description: t("way3Desc"),
      icon: (
        <svg {...supportIcon}>
          <rect x="3" y="4" width="18" height="6" rx="1.5" />
          <rect x="3" y="14" width="18" height="6" rx="1.5" />
          <path d="M7 7h.01M7 17h.01" />
        </svg>
      ),
    },
  ];

  return (
    <section id="partners" className="flex flex-col gap-10 scroll-mt-32">
      <SectionHeading title={t("partnersTitle")} subtitle={t("partnersSubtitle")} />

      <ul className="flex flex-col gap-4 sm:gap-5">
        {SUPPORTERS.map((supporter, i) => {
          const count = supporter.organization ? projectCount(supporter.organization) : 0;
          return (
            <motion.li
              key={supporter.name}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className="group grid grid-cols-1 md:grid-cols-12 overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-colors hover:border-foreground/20"
            >
              <div className="md:col-span-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-border bg-background px-8 py-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={supporter.logo}
                  alt={supporter.name}
                  loading="lazy"
                  className={`h-16 sm:h-20 w-auto max-w-[240px] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04] ${supporter.logoDark ? "dark:hidden" : ""}`}
                />
                {supporter.logoDark && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={supporter.logoDark}
                    alt={supporter.name}
                    loading="lazy"
                    className="hidden dark:block h-16 sm:h-20 w-auto max-w-[240px] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                )}
              </div>

              <div className="md:col-span-8 flex flex-col gap-4 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-heading-highlight/40 bg-heading-highlight/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground">
                    {t(`${supporter.key}Role`)}
                  </span>
                  {supporter.since && (
                    <span className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">
                      {t("partnerSince", { year: supporter.since })}
                    </span>
                  )}
                  {count > 0 && (
                    <span className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">
                      {t("partnerProjects", { count })}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">{supporter.name}</h3>
                <p className="text-sm sm:text-base leading-relaxed text-foreground-secondary">{t(`${supporter.key}Desc`)}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm font-semibold">
                  <a
                    href={supporter.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-foreground hover:opacity-80 transition-opacity"
                  >
                    <span>{t("partnerWebsite")}</span>
                    <span aria-hidden className="text-[10px]">↗</span>
                  </a>
                  {supporter.github && (
                    <a
                      href={supporter.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-foreground-secondary hover:text-foreground transition-colors"
                    >
                      <span>GitHub</span>
                      <span aria-hidden className="text-[10px]">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>

      {/* How organizations can get involved */}
      <motion.div {...reveal} className="flex flex-col gap-8 rounded-3xl border border-border bg-background-secondary p-6 sm:p-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground text-balance">{t("waysTitle")}</h3>
          <p className="text-sm sm:text-base leading-relaxed text-foreground-secondary text-pretty">{t("waysSubtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ways.map((way) => (
            <div key={way.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background-secondary text-foreground">
                {way.icon}
              </span>
              <h4 className="text-base font-semibold text-foreground">{way.title}</h4>
              <p className="text-sm leading-relaxed text-foreground-secondary">{way.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={PARTNER_MAILTO}
            className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            <span>{t("waysCta")}</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors">
            {CONTACT_EMAIL}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Community                                                           */
/* ------------------------------------------------------------------ */

function Community() {
  const t = useTranslations("Team");
  const roles: { title: string; count: string; description: string; icon: ReactNode }[] = [
    {
      title: t("r1Title"),
      count: "10",
      description: t("r1Desc"),
      icon: (
        <svg {...pillarIcon}>
          <path d="M12 3 4 7v5c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V7l-8-4Z" />
        </svg>
      ),
    },
    {
      title: t("r2Title"),
      count: "70",
      description: t("r2Desc"),
      icon: (
        <svg {...pillarIcon}>
          <path d="M22 10 12 5 2 10l10 5 10-5Z" />
          <path d="M6 12v5c3 2 9 2 12 0v-5" />
        </svg>
      ),
    },
    {
      title: t("r3Title"),
      count: "160+",
      description: t("r3Desc"),
      icon: (
        <svg {...pillarIcon}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="8" r="2.5" />
          <path d="M6 8.5v7M18 10.5c0 4-6 3-11 6" />
        </svg>
      ),
    },
    {
      title: t("r4Title"),
      count: "8,000+",
      description: t("r4Desc"),
      icon: (
        <svg {...pillarIcon}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20c.6-3.5 3.3-6 6.5-6s5.9 2.5 6.5 6" />
          <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14.4c1.7.9 2.8 3 3 5.6" />
        </svg>
      ),
    },
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
            <div className="flex items-start justify-between gap-3">
              <span className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground tabular-nums">{role.count}</span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-background-secondary text-foreground transition-colors duration-300 group-hover:border-heading-highlight group-hover:bg-heading-highlight group-hover:text-brand-dark">
                {role.icon}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-semibold text-foreground">{role.title}</h3>
              <p className="text-sm leading-relaxed text-foreground-secondary">{role.description}</p>
            </div>
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
        <Partners />
        <Community />
      </div>
    </PageWrapper>
  );
}
