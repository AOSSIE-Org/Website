"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const VISIBILITY_THRESHOLD = 350;

export default function ScrollToTop() {
  const t = useTranslations("ScrollToTop");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > VISIBILITY_THRESHOLD);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t("label")}
      title={t("label")}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-background-secondary text-foreground-primary shadow-lg transition-colors hover:bg-background-primary focus:outline-none focus:ring-2 focus:ring-foreground-primary cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m6 15 6-6 6 6" />
      </svg>
    </button>
  );
}
