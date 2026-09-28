"use client";

import { useTranslations } from "next-intl";

interface Partner {
  name: string;
  href: string;
  /** Logo for light mode (and dark mode, unless `logoDark` is set). */
  logo: string;
  /** Optional variant for dark mode, for logos with dark or white wordmarks. */
  logoDark?: string;
  width: number;
  height: number;
}

const PARTNERS: Partner[] = [
  {
    name: "Google Summer of Code",
    href: "https://summerofcode.withgoogle.com/",
    logo: "/brand/icons/gsoc_full_logo_light.svg",
    logoDark: "/brand/icons/gsoc_full_logo.svg",
    width: 205,
    height: 26,
  },
  {
    name: "Stability Nexus",
    href: "https://stability.nexus/",
    logo: "/brand/icons/stability_nexus_full_logo.svg",
    width: 340,
    height: 131,
  },
];

export default function Sponsors() {
  const t = useTranslations("Sponsors");

  return (
    <section id="sponsors" className="w-full bg-background border-b border-border">
      <div className="px-4 sm:px-10 lg:px-14 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 w-full flex flex-col items-center text-center gap-3">
        <h2 className="text-[clamp(1.75rem,3.6vw,3.5rem)] font-medium tracking-tight text-foreground leading-[1.1] text-balance md:whitespace-nowrap">
          {t("title")}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-foreground-secondary font-normal leading-relaxed lg:whitespace-nowrap">
          {t("subtitle")}
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 border-t border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
        {PARTNERS.map((partner) => (
          <li key={partner.name}>
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("visit", { name: partner.name })}
              className="group relative flex h-full flex-col items-center justify-center gap-8 px-8 pt-14 pb-8 sm:pt-16 transition-colors duration-300 hover:bg-background-secondary focus-visible:outline-none focus-visible:bg-background-secondary"
            >
              {/* Corner accent, drawn in on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-heading-highlight transition-all duration-500 ease-out group-hover:w-full group-focus-visible:w-full"
              />

              <span className="flex h-20 sm:h-24 w-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt=""
                  width={partner.width}
                  height={partner.height}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-auto max-h-full max-w-[300px] object-contain ${partner.logoDark ? "dark:hidden" : ""}`}
                />
                {partner.logoDark && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={partner.logoDark}
                    alt=""
                    width={partner.width}
                    height={partner.height}
                    loading="lazy"
                    decoding="async"
                    className="hidden dark:block w-full h-auto max-h-full max-w-[300px] object-contain"
                  />
                )}
              </span>

              <span className="flex w-full items-center justify-between text-sm font-medium text-foreground-secondary transition-colors group-hover:text-foreground">
                <span>{partner.name}</span>
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-heading-highlight group-hover:bg-heading-highlight group-hover:text-brand-dark"
                >
                  ↗
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
