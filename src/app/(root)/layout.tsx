import { ReactNode } from "react";

/**
 * Root layout for the bare `/` route, which only forwards to the default
 * locale. Localized pages keep their own root layout in `[locale]/` so that
 * `<html lang>` and `dir` carry the real page language.
 * It loads no stylesheet, so nothing delays the redirect script in `page.tsx`.
 */
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
