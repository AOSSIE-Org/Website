"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PARTNER_MAILTO } from "@/lib/links";

const EASE = [0.16, 1, 0.3, 1] as const;
const DISCORD_URL = "https://discord.gg/hjUhu33uAn";

// Moves a card's spotlight with CSS variables only, so nothing re-renders
function trackPointer(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 rtl:-scale-x-100 ${className}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const primaryClass =
  "group/btn inline-flex items-center justify-between gap-3 rounded-full bg-foreground py-1.5 ps-5 pe-1.5 text-sm font-semibold text-background transition-opacity hover:opacity-90";

function PrimaryContent({ label }: { label: string }) {
  return (
    <>
      <span>{label}</span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover/btn:-rotate-45 rtl:group-hover/btn:rotate-45">
        <Arrow />
      </span>
    </>
  );
}

const secondaryClass =
  "group/link inline-flex items-center justify-center min-[420px]:justify-start gap-2 py-2 text-sm font-semibold text-foreground-secondary transition-colors hover:text-foreground";

function SecondaryContent({ label }: { label: string }) {
  return (
    <>
      <span>{label}</span>
      <Arrow className="transition-transform duration-300 group-hover/link:translate-x-0.5 rtl:group-hover/link:-translate-x-0.5" />
    </>
  );
}

function PathCard({
  index,
  label,
  description,
  delay,
  children,
}: {
  index: string;
  label: string;
  description: string;
  delay: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      onPointerMove={trackPointer}
      className="group/path relative flex min-w-0 flex-col gap-8 overflow-hidden rounded-3xl border border-border bg-card p-5 sm:p-7 transition-colors duration-300 hover:border-foreground/20"
    >
      {/* Soft spotlight that follows the pointer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/path:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--foreground) 5%, transparent), transparent 70%)",
        }}
      />

      <div className="relative flex flex-col gap-3">
        <div className="flex items-baseline gap-3 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
          <span className="font-mono tabular-nums text-foreground">{index}</span>
          <h3>{label}</h3>
        </div>
        <p className="text-lg sm:text-xl font-medium leading-snug tracking-tight text-foreground text-pretty">{description}</p>
      </div>

      <div className="relative mt-auto flex flex-col items-stretch gap-2 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center min-[420px]:gap-x-5">
        {children}
      </div>
    </motion.div>
  );
}

/** Underline that draws itself when the title scrolls into view. */
function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 h-2.5 w-full sm:h-3 rtl:-scale-x-100"
      >
        <motion.path
          d="M3 8 C 50 3, 120 3, 197 7"
          fill="none"
          className="stroke-heading-highlight"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        />
      </svg>
    </span>
  );
}

export default function FooterCta() {
  const t = useTranslations("Footer");

  return (
    <section className="px-4 sm:px-10 lg:px-14 py-12 sm:py-16 flex flex-col gap-8 sm:gap-10 border-b border-border">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex flex-col gap-3"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-[1.15] text-balance break-words">
          {t.rich("ctaTitle", { mark: (chunks) => <Highlight>{chunks}</Highlight> })}
        </h2>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed text-pretty">{t("ctaSubtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        <PathCard index="01" label={t("ctaContributeLabel")} description={t("ctaContributeText")} delay={0.08}>
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className={primaryClass}>
            <PrimaryContent label={t("ctaDiscord")} />
          </a>
          <Link href="/projects" className={secondaryClass}>
            <SecondaryContent label={t("ctaProjects")} />
          </Link>
        </PathCard>

        <PathCard index="02" label={t("ctaPartnerLabel")} description={t("ctaPartnerText")} delay={0.16}>
          <a href={PARTNER_MAILTO} className={primaryClass}>
            <PrimaryContent label={t("ctaPartner")} />
          </a>
          <Link href={{ pathname: "/about", hash: "partners" }} className={secondaryClass}>
            <SecondaryContent label={t("ctaPartners")} />
          </Link>
        </PathCard>
      </div>
    </section>
  );
}
