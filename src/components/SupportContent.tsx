"use client";

import { useTranslations } from "next-intl";
import SupportUsButton from "support-us-button";
import "support-us-button/style.css";
import { GITHUB_SPONSORS_URL } from "@/config/links";
import { SITE_URL } from "@/config/site";
import { SUPPORTERS } from "@/config/support";

/**
 * AOSSIE's support page body. The package styles are scoped to its own root, and the "auto"
 * theme takes the font and colours from the page around it.
 */
export default function SupportContent() {
  const t = useTranslations("SupportPage");

  // "auto" reads the colours of the nearest ancestor once the theme class changes. This wrapper
  // switches them at once (no colour transition), so it never reads a half-faded value.
  return (
    <div className="flex-1 bg-background text-foreground">
      <SupportUsButton
        Theme="auto"
        heading={t("title")}
        labels={{ supportedBy: t("supportedBy") }}
        organizationInformation={{
          name: "AOSSIE",
          desc: t("organizationDescription"),
          image: "/brand/icons/aossie_logo.svg",
          link: SITE_URL,
        }}
        sponsors={SUPPORTERS}
        ctaSection={{ sponsorLink: [{ name: "GitHub Sponsors", url: GITHUB_SPONSORS_URL }] }}
      />
    </div>
  );
}
