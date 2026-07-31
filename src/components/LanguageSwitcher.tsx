"use client";

import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { languages } from "@/config/languages";
import { useTranslations, useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("LanguageSwitcher");
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="language-select" className="text-sm font-medium text-foreground-muted">
        {t("label")}:
      </label>

      <select
        id="language-select"
        value={locale}
        disabled={isPending}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="rounded-md border border-border-default bg-background-secondary px-3 py-1.5 text-sm text-foreground-primary shadow-sm focus:border-foreground-primary focus:outline-none focus:ring-1 focus:ring-foreground-primary cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.localName} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  );
}
