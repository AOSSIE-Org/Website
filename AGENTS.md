<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AOSSIE Webpage

Project specific context and directives for AI agents.

## 🛠️ Stack & Commands

- **Stack:** Next.js 16.2.11 App Router (Turbopack), React 19, Tailwind CSS v4, `next-intl` (i18n), `next-themes` (light/dark state manager).
- **Build:** `npm run build`
- **Develop:** `npm run dev`

---

## 🎨 Styles & Theme System

- **Class-Based Dark Mode:** Tailwind CSS v4 is configured for class-based overrides using `@custom-variant dark (&:where(.dark, .dark *))` in [`globals.css`](src/app/[locale]/globals.css).
- **Semantic Tokens:** Do **not** write inline layout dark utilities (e.g., `dark:bg-black` or `dark:text-zinc-50`). Always write semantic classes linked to the central theme variables (e.g., `bg-background-primary`, `text-foreground-primary`).
- **Typography:** The default font family is **Inter**. It is mapped to `--font-sans` in globals.css.

---

## 🌐 i18n & l10n Routing

- **Dynamic segment:** All localized pages and layouts must be nested inside [`src/app/[locale]/`](src/app/[locale]/).
- **Awaiting params:** Layout and Page `params` props are Promises in Next.js 15/16. Always `await params` before accessing `locale`.
- **Navigation:** Never import `Link`, `useRouter`, or `usePathname` from standard `next/link` or `next/navigation`. Always import them from local configuration helpers in [`src/i18n/navigation.ts`](src/i18n/navigation.ts).

---

## 📦 Project Boundaries

- **Config Alias Map:** Turbopack and Webpack alias resolvers map `"next-intl/config"` to our local request setup inside [`next.config.ts`](next.config.ts) using `createNextIntlPlugin("./src/i18n/request.ts")`.
- **Branding Assets:** The official branding logo, favicon, and style specifications reside inside [`public/brand/`](public/brand/).

