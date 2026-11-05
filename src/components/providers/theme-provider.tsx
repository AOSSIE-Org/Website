"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "./theme-script";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  // disableTransitionOnChange: colours switch instantly, so components that read the page's computed colours
  // right after a theme change (the Support Us widget in "auto" theme) see the new theme, not a mid-fade value.
  return (
    <NextThemesProvider
      attribute="class"
      storageKey={THEME_STORAGE_KEY}
      defaultTheme={DEFAULT_THEME}
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
