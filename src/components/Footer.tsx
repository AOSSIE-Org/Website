"use client";

import type { PointerEvent, ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GSOC_APPLY_URL } from "@/lib/links";
import FooterCta from "@/components/FooterCta";

const INFO_REPO = "https://github.com/AOSSIE-Org/Info/blob/main";

interface Social {
  /** Brand names stay as-is; `labelKey` marks labels that need translating. */
  label: string;
  labelKey?: "email";
  href: string;
  icon: ReactNode;
}

function IconImage({ src, size = 18 }: { src: string; size?: number }) {
  return <Image src={src} alt="" width={size} height={size} className="theme-icon-invert" />;
}

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M21.94 4.3a1.2 1.2 0 0 0-1.62-1.1L2.9 10.06c-1.13.45-1.1 2.07.05 2.47l4.3 1.47 1.66 5.2c.24.76 1.2 1 1.77.44l2.4-2.33 4.5 3.3c.7.5 1.68.12 1.86-.72L21.94 4.3ZM9.52 14.1l8.44-7.48-6.56 8.6-.33 3.08-1.55-4.2Z" />
  </svg>
);

const SOCIALS: Social[] = [
  { label: "Discord", href: "https://discord.gg/hjUhu33uAn", icon: <IconImage src="/brand/icons/discord.svg" size={20} /> },
  { label: "GitHub", href: "https://github.com/AOSSIE-Org", icon: <IconImage src="/brand/icons/github.svg" /> },
  { label: "X (Twitter)", href: "https://x.com/aossie_org", icon: <IconImage src="/brand/icons/twitter.svg" size={15} /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/aossie/", icon: <IconImage src="/brand/icons/linkedin.svg" /> },
  { label: "YouTube", href: "https://www.youtube.com/@AOSSIE-Org", icon: <IconImage src="/brand/icons/youtube.svg" size={20} /> },
  { label: "Telegram", href: "https://t.me/+bMWGzaMTMa8xN2Ex", icon: <TelegramIcon /> },
  { label: "Email", labelKey: "email", href: "mailto:contact@aossie.org", icon: <IconImage src="/brand/icons/mail.svg" size={20} /> },
];

interface FooterLink {
  label: string;
  href: string;
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title} className="flex flex-col gap-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</h2>
      <ul className="flex flex-col gap-2.5 text-sm text-foreground-secondary">
        {links.map((link) => {
          const external = !link.href.startsWith("/");
          const className =
            "group inline-flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible:text-foreground";
          const content = (
            <>
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                {link.label}
              </span>
              {external && (
                <span aria-hidden className="text-[10px] opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              )}
            </>
          );
          return (
            <li key={link.href}>
              {external ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {content}
                </a>
              ) : (
                <Link href={link.href} className={className}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Moves the wordmark spotlight with CSS variables only, so nothing re-renders
function trackPointer(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--wm-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--wm-y", `${e.clientY - rect.top}px`);
}

export default function Footer() {
  const t = useTranslations("Footer");

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: t("organization"),
      links: [
        { label: t("aboutLink"), href: "/about" },
        { label: t("projectsLink"), href: "/projects" },
        { label: t("programsLink"), href: "/programs" },
        { label: t("brandKit"), href: `${INFO_REPO}/Brand.md` },
      ],
    },
    {
      title: t("contribute"),
      links: [
        { label: t("applyLink"), href: GSOC_APPLY_URL },
        { label: t("contributing"), href: `${INFO_REPO}/Rules/Contribution.md` },
        { label: t("communication"), href: `${INFO_REPO}/Rules/Communication.md` },
        { label: t("aiPolicy"), href: `${INFO_REPO}/Rules/AI.md` },
        { label: t("codeOfConduct"), href: `${INFO_REPO}/CODE_OF_CONDUCT.md` },
      ],
    },
  ];

  return (
    <footer className="w-full bg-background border-t border-border transition-colors duration-200">
      {/* 1. Call to action: one path for contributors, one for organizations */}
      <FooterCta />

      {/* 2. Brand, links and socials */}
      <div className="px-4 sm:px-10 lg:px-14 py-12 flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-12">
        <div className="flex flex-col gap-5">
          <Link href="/" className="inline-flex w-fit" aria-label="AOSSIE">
            <Image
              src="/brand/icons/aossie_logo.svg"
              alt="AOSSIE"
              width={336}
              height={360}
              className="h-20 w-auto transition-opacity hover:opacity-80"
            />
          </Link>
          <p className="text-sm text-foreground-secondary leading-relaxed text-pretty">{t("description")}</p>

          <ul className="flex flex-wrap gap-2" aria-label={t("community")}>
            {SOCIALS.map((social) => {
              const label = social.labelKey ? t(social.labelKey) : social.label;
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    {...(social.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-heading-highlight hover:shadow-[0_6px_16px_-6px_color-mix(in_srgb,var(--heading-highlight)_60%,transparent)]"
                  >
                    {social.icon}
                  </a>
                </li>
                );
            })}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-x-[5%] gap-y-10 lg:flex lg:gap-x-[clamp(2.5rem,5vw,5.5rem)]">
          {columns.map((column) => (
            <FooterColumn key={column.title} title={column.title} links={column.links} />
          ))}
        </div>
      </div>

      {/* 3. Interactive wordmark: a highlight follows the pointer */}
      <div
        className="group select-none overflow-hidden border-t border-border px-4 sm:px-10 lg:px-14 py-8 sm:py-10"
        aria-hidden
      >
        {/*
          Outline drawn from the letters' silhouette (dilated glyph minus the glyph).
          text-stroke would trace every contour of the variable font, including the
          overlapping ones inside the "A", so it is not used here.
        */}
        <svg width="0" height="0" className="absolute">
          <filter id="footer-wordmark-outline" colorInterpolationFilters="sRGB">
            <feMorphology in="SourceGraphic" operator="dilate" radius="1.5" result="grown" />
            <feComposite in="grown" in2="SourceAlpha" operator="out" />
          </filter>
        </svg>
        <div className="relative" onPointerMove={trackPointer}>
          <p className="text-[clamp(4.5rem,22vw,19rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-foreground opacity-[0.16] [filter:url(#footer-wordmark-outline)] text-center">
            AOSSIE
          </p>
          <p
            className="pointer-events-none absolute inset-0 text-[clamp(4.5rem,22vw,19rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-heading-highlight text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              WebkitMaskImage: "radial-gradient(260px circle at var(--wm-x, 50%) var(--wm-y, 50%), #000 0%, transparent 70%)",
              maskImage: "radial-gradient(260px circle at var(--wm-x, 50%) var(--wm-y, 50%), #000 0%, transparent 70%)",
            }}
          >
            AOSSIE
          </p>
        </div>
      </div>

      {/* 4. Legal bar */}
      <div className="px-4 sm:px-10 lg:px-14 py-5 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-foreground-muted">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-center md:text-left">
          <span>{t("copyright")}</span>
          <span>
            {t("abnLabel")} <strong className="font-mono font-medium text-foreground-secondary">32 743 493 466</strong>
          </span>
        </div>
        <address className="not-italic text-center md:text-right">{t("addressText")}</address>
      </div>
    </footer>
  );
}
