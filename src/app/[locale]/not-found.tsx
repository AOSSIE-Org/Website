import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background-primary text-foreground-primary font-sans transition-colors duration-200 p-6">
      <div className="flex w-full max-w-md flex-col items-center justify-center p-8 bg-background-secondary rounded-2xl border border-border-default shadow-card gap-6 text-center">
        <div className="w-12 h-12 rounded-full bg-status-neutral-bg flex items-center justify-center text-status-neutral-text">

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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z"
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

        <Link
          href="/"
          className="flex h-10 items-center justify-center rounded-lg bg-button-primary-bg text-button-primary-text px-6 border border-button-primary-border hover:bg-button-primary-hover-bg transition-colors font-medium cursor-pointer"
        >
          {t("home")}
        </Link>
      </div>
    </div>
  );
}
