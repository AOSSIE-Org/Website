"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import type SocialShareButton from "@aossie-org/social-share-button";
import "@aossie-org/social-share-button/src/social-share-button.css";

/** Networks offered in the share dialog, in display order. */
const SHARE_PLATFORMS = ["whatsapp", "twitter", "linkedin", "telegram", "email"];

/** Footer icon button that opens the share dialog for the current page. */
export default function SiteShareButton({ className }: { className: string }) {
  const t = useTranslations("Share");
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLSpanElement>(null);
  const instanceRef = useRef<SocialShareButton | null>(null);

  const labels = useMemo(
    () => ({
      share: t("share"),
      close: t("close"),
      copy: t("copy"),
      copied: t("copied"),
      copyFailed: t("copyFailed"),
      urlLabel: t("urlLabel"),
    }),
    [t],
  );

  // The dialog takes its theme when it is built, so it is rebuilt when the site theme changes
  useEffect(() => {
    if (!resolvedTheme) return;
    let instance: SocialShareButton | null = null;
    let cancelled = false;

    // Loaded in the browser only: the library touches window and document
    import("@aossie-org/social-share-button").then((module) => {
      const ShareDialog = module.default ?? window.SocialShareButton;
      if (cancelled || !containerRef.current || !ShareDialog) return;
      instance = new ShareDialog({
        container: containerRef.current,
        showButton: false,
        platforms: SHARE_PLATFORMS,
        theme: resolvedTheme === "dark" ? "dark" : "light",
        labels,
      });
      instanceRef.current = instance;
    });

    return () => {
      cancelled = true;
      instance?.destroy();
      instanceRef.current = null;
    };
  }, [resolvedTheme, labels]);

  const openDialog = () => {
    const instance = instanceRef.current;
    if (!instance) return;
    instance.updateOptions({ url: window.location.href, title: document.title });
    instance.openModal();
  };

  return (
    <>
      <span ref={containerRef} hidden />
      <button type="button" onClick={openDialog} aria-label={t("trigger")} title={t("trigger")} className={className}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
        </svg>
      </button>
    </>
  );
}
