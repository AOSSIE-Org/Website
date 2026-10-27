<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AOSSIE Webpage

Project specific context and directives for AI agents.

## 🛠️ Stack & Commands

- **Stack:** Next.js 16.4.3 App Router (Turbopack), React 19, Tailwind CSS v4, `next-intl` (i18n), `next-themes` (light/dark state manager).
- **Build:** `npm run build` (static export to `out/`)
- **Develop:** `npm run dev`
- **Lint:** `npm run lint`
- **Test:** `npm test` · `npm run test:coverage` (90% threshold on SEO, config and project-data modules; enforced in CI)

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
- **Branding Assets:** The official branding logo, favicon, and style specifications reside inside [`public/brand/`](public/brand/). The social share image is [`public/og-image.png`](public/og-image.png) (1200x630 PNG; never point Open Graph at an SVG).
- **Metadata:** the home page uses `generateLocaleMetadata()`; each sub-page (`projects`, `programs`, `about`) has a `layout.tsx` calling `generatePageMetadata()` so it gets its own title, description and canonical. Add new pages to `PAGE_META` in [`src/i18n/metadata.ts`](src/i18n/metadata.ts) and to `PAGES` in [`src/app/sitemap.ts`](src/app/sitemap.ts).
- **Root route:** [`src/app/(root)/`](src/app/(root)/) serves the bare `/` with the default locale's metadata and a `<meta http-equiv="refresh">` to `/en`. Do not replace it with `redirect()`, which exports an empty error page.
- **Skills:** Automated skill workflows for synchronizing translations and project metadata live in [`.agents/skills/manage-project-translations/`](.agents/skills/manage-project-translations/SKILL.md).


