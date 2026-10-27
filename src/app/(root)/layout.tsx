import { ReactNode } from "react";
import "../[locale]/globals.css";

/**
 * Root layout for the bare `/` route, which only forwards to the default
 * locale. Localized pages keep their own root layout in `[locale]/` so that
 * `<html lang>` and `dir` carry the real page language.
 */
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
