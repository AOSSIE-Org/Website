"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const t = useTranslations("Error");

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background-primary text-foreground-primary font-sans transition-colors duration-200 p-6">
      <div className="flex w-full max-w-md flex-col items-center justify-center p-8 bg-background-secondary rounded-2xl border border-border-default shadow-card gap-6 text-center">
        <div className="w-12 h-12 rounded-full bg-status-error-bg flex items-center justify-center text-status-error-text">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground-secondary">
            {t("title")}
          </h1>
          <p className="text-sm text-foreground-muted">
            {t("description")}
          </p>
        </div>

        <button
          type="button"
          onClick={reset}
          className="flex h-10 items-center justify-center rounded-lg bg-button-primary-bg text-button-primary-text px-6 border border-button-primary-border hover:bg-button-primary-hover-bg transition-colors font-medium cursor-pointer"
        >
          {t("retry")}
        </button>
      </div>
    </div>
  );
}
