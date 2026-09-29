<!-- Don't delete it -->
<div name="readme-top"></div>

<!-- Organization Logo -->
<div align="center" style="display: flex; align-items: center; justify-content: center; gap: 16px;">
  <img src="public/brand/icons/aossie_logo.svg" width="175" alt="AOSSIE logo" >

</div>

&nbsp;

<!-- Organization Name -->
<div align="center">

[![Static Badge](https://img.shields.io/badge/AOSSIE-Website-228B22?style=for-the-badge&labelColor=FFC517)](https://aossie.org/)

</div>

<!-- Organization/Project Social Handles -->
<p align="center">
  <a href="https://t.me/+bMWGzaMTMa8xN2Ex">
    <img src="https://img.shields.io/badge/Telegram_AOSSIE-black?style=flat&logo=telegram&logoColor=white&color=24A1DE" alt="Telegram Badge"/>
  </a>
  &nbsp;
  <a href="https://x.com/aossie_org">
    <img src="https://img.shields.io/twitter/follow/aossie_org" alt="X Badge"/>
  </a>
  &nbsp;
  <a href="https://discord.gg/hjUhu33uAn">
    <img src="https://img.shields.io/discord/995968619034984528?style=flat&logo=discord&logoColor=white&label=Discord%20AOSSIE&labelColor=5865F2&color=57F287" alt="Discord AOSSIE"/>
  </a>
  &nbsp;
  <a href="https://discord.gg/YzDKeEfWtS">
    <img src="https://img.shields.io/discord/995968619034984528?style=flat&logo=discord&logoColor=white&label=Discord%20Stability%20Nexus&labelColor=5865F2&color=57F287" alt="Discord Stability Nexus"/>
  </a>
  &nbsp;
  <a href="https://www.linkedin.com/company/aossie/">
    <img src="https://img.shields.io/badge/LinkedIn_AOSSIE-black?style=flat&logo=LinkedIn&logoColor=white&color=0A66C2" alt="LinkedIn Badge"/>
  </a>
  &nbsp;
  <a href="https://www.youtube.com/@AOSSIE-Org">
    <img src="https://img.shields.io/badge/Subscribe_to_AOSSIE-red?style=flat&logo=youtube&logoColor=white" alt="Subscribe to AOSSIE"/>
  </a>
  &nbsp;
  <a href="https://scorecard.dev/viewer/?uri=github.com/AOSSIE-Org/website">
    <img src="https://api.scorecard.dev/projects/github.com/AOSSIE-Org/website/badge" alt="OpenSSF Scorecard Badge"/>
  </a>
  &nbsp;
  <a href="https://www.youtube.com/@StabilityNexus">
    <img src="https://img.shields.io/badge/Subscribe_to_Stability_Nexus-red?style=flat&logo=youtube&logoColor=white" alt="Subscribe to Stability Nexus"/>
  </a>
</p>


---

<div align="center">
<h1>AOSSIE's Website</h1>
</div>

This repository contains the assets required to build **AOSSIE's Website**. We're glad that you want to contribute! Contributions to the project are very much welcomed! Please reach out with ideas for new content or issues with existing content!

The website is built on **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and pre-configured for **Internationalization (i18n)** and **Localization (l10n)** using **next-intl**.

---

## 🚀 Features

- **Multi-lingual Support (i18n):** Deeply integrated multi-language support powered by `next-intl`.
- **Dual Theme System:** Light, Dark, and System mode support with zero flash on load.
- **Modern Responsive Design:** Crafted with Tailwind CSS v4 and smooth scrolling via Lenis.
- **High Performance:** Built with Next.js 16 App Router and React 19 for speed and SEO.

---

## 💻 Tech Stack

- **Framework:** Next.js 16.2.11 (App Router, Turbopack)
- **Library:** React 19
- **Styling:** Tailwind CSS v4 & PostCSS
- **Internationalization:** `next-intl`
- **Theme Manager:** `next-themes`

---

## 📋 Project Maturity & TODO Checklist

In the checklist below, mark the items that have been completed for your project:

* [x] The project has a logo (`public/brand/icons/aossie_logo.svg`).
* [x] The project has a favicon (`public/brand/icons/favicon.ico`).
* [x] The web frontend:
   - [x] Has proper title and metadata.
   - [x] Has proper open graph metadata, to ensure that it is shown well when shared in social media.
   - [x] Has a footer and header with AOSSIE logos and social handles.
   - [x] Uses React Server Components by default, introducing Client Components (`"use client"`) only when interactivity or client hooks are required.
   - [x] Is deployed to GitHub Pages via a GitHub Workflow (`.github/workflows/nextjs.yml`).
   - [x] Has automated CI build and lint validation (`.github/workflows/ci.yml`).
   - [x] Has CodeRabbit automated AI code review (`.coderabbit.yml`).
   - [x] Has open-source legal compliance (`DCO.md`, `COPYRIGHT.md`, `Contributors.md`).

---

## 🚀 Key Features

- **Next.js 16 & React 19:** Utilizing the latest Server Components, Client Actions, and async routing paradigms.
- **Tailwind CSS v4:** Modern utility-first styling with native CSS variables and streamlined postcss integrations.
- **Dual Theme System:** Flash-free light, dark, and system preferred themes using `next-themes` and Tailwind CSS v4 custom variants.
- **Robust i18n & l10n:** Deeply integrated multi-language support:
  - Automatic locale detection based on browser preferences.
  - Subpath routing (e.g., `/en`, `/hi`) with clean `as-needed` URL prefixing.
  - Sleek, interactive language switcher client component.
  - Zero-bundle-size footprint for static translations using Server Components & Client `useTranslations`.
- **Developer Experience:** Strict TypeScript compilation and ES Lint setup.
- **Application Control Compatibility:** Configured with manual Webpack & Turbopack alias resolution to bypass restrictive execution environments blocking native binary compiles.
- **Open-Source Governance & CI/CD:** Integrated GitHub Actions workflows (`ci.yml`, `nextjs.yml`, `label-merge-conflicts.yml`), `.coderabbit.yml`, and `DCO.md` legal documentation.
- **AI Agent Pairing Ready:** Includes `AGENTS.md` and `CLAUDE.md` to guide AI development agents.

---

## 📂 Project Structure

```text
├── .github/workflows/          # CI, GitHub Pages deployment, merge-conflict checks
├── next.config.ts              # Next.js config (static export, next-intl plugin)
├── scripts/
│   └── update-repo-stats.mjs   # Refreshes GitHub stars / activity used to rank projects
├── public/
│   ├── llms.txt, robots.txt, .well-known/
│   └── brand/
│       ├── Brand.md            # Official AOSSIE brand guidelines
│       ├── icons/              # AOSSIE, partner and social icons
│       ├── project_svgs/       # Official project logos (from AOSSIE-Org/Info)
│       └── project_logos/      # Project logos collected from each project's repository
└── src/
    ├── app/
    │   ├── sitemap.ts          # Localized sitemap for every page
    │   └── [locale]/           # Localized routes
    │       ├── layout.tsx      # Fonts, theme, smooth scrolling, translations
    │       ├── page.tsx        # Home: hero, projects, partners, impact numbers
    │       ├── about/          # About page
    │       ├── projects/       # Projects catalogue (search, filters, sorting, grouping)
    │       ├── programs/       # GSoC, internships, Australian Winter of Code
    │       └── globals.css     # Theme tokens and global styles
    ├── components/             # Navbar, Footer, Hero, Stats, Sponsors, ProjectLogo, ...
    ├── i18n/                   # Routing, request config, navigation helpers, metadata
    ├── lib/
    │   ├── projectsData.ts     # Every project: text, logo, topics, themes, repos, links
    │   ├── projectTranslations/ # Project descriptions per locale (hi.ts, zh.ts, ...)
    │   ├── repoStats.ts        # Generated GitHub stats snapshot (do not edit by hand)
    │   └── links.ts            # Shared external links
    ├── messages/               # UI translations, one JSON file per locale (en.json is the source)
    └── __tests__/              # Vitest suites, including content checks
```

---

## 🗂️ Managing Projects & Content

All projects displayed on the website are managed through structured data files. Modifying projects involves a few coordinated files to ensure full translations, asset linkage, and GitHub statistics.

---

### 1. Adding a New Project

1. **Add the project metadata in [`src/lib/projectsData.ts`](src/lib/projectsData.ts):**
   Add a new entry to the `PROJECTS_DATA` array:
   ```typescript
   {
     slug: "my-project",
     name: "My Project",
     description: "One or two sentences summarizing the project for cards.",
     about: "Optional longer overview shown in the Details modal.",
     logo: "/brand/project_logos/my_project_logo.png", // or project_svgs/
     logoInvertOnDark: false, // Set true if single-dark logo needs inverting in dark mode
     topics: ["Artificial Intelligence"], // "Blockchain" | "Artificial Intelligence" | "Mobile"
     themes: ["Education"], // "Communication" | "Education" | "Finance" | "Sustainability" | "Infrastructure"
     repositories: [
       { fullName: "AOSSIE-Org/My-Project", language: "TypeScript" },
     ],
     discordUrl: aossieChannel("DISCORD_CHANNEL_ID"), // or AOSSIE_DISCORD_INVITE
     websiteUrl: "https://myproject.aossie.org", // optional
   }
   ```
2. **Add the logo asset (Optional):**
   - Place image or SVG in [`public/brand/project_logos/`](public/brand/project_logos/) or [`public/brand/project_svgs/`](public/brand/project_svgs/).
   - Projects without a logo automatically display a fallback monogram.
3. **Add translations in [`src/lib/projectTranslations/`](src/lib/projectTranslations/):**
   - Add the matching `slug` entry to every locale file (`hi.ts`, `zh.ts`, `es.ts`, ...) with translated `description` (and `about`, if provided in English).
4. **Fetch GitHub statistics:**
   - Run `npm run update:stats` (set `GITHUB_TOKEN` environment variable if needed to avoid API rate limits) to automatically update [`src/lib/repoStats.ts`](src/lib/repoStats.ts) with star counts and commit activity.
5. **Verify with tests:**
   - Run `npm test` to validate that all required fields, translations, and repository stats pass CI checks.

---

### 2. Changing / Updating an Existing Project

- **Copy or Links:** Update the relevant fields (`name`, `description`, `about`, `discordUrl`, `websiteUrl`, `topics`, `themes`) in [`src/lib/projectsData.ts`](src/lib/projectsData.ts).
- **Translations:** If you updated `description` or `about`, make sure to update the corresponding translations in every file under [`src/lib/projectTranslations/`](src/lib/projectTranslations/).
- **Repositories:** If you added or changed repositories, run `npm run update:stats` to refresh [`src/lib/repoStats.ts`](src/lib/repoStats.ts).
- **Run validation:** Execute `npm test` to ensure all consistency checks pass.

---

### 3. Archiving vs. Removing a Project

- **Archiving a project (Recommended for inactive/historical projects):**
  - Set `archived: true` on the project entry in [`src/lib/projectsData.ts`](src/lib/projectsData.ts).
  - The project will remain catalogued with an *Archived* badge.
- **Removing a project completely:**
  1. Delete the project entry from `PROJECTS_DATA` in [`src/lib/projectsData.ts`](src/lib/projectsData.ts).
  2. Remove its translated entries from every file under [`src/lib/projectTranslations/`](src/lib/projectTranslations/).
  3. (Optional) Remove unused logo assets from `public/brand/project_logos/` or `public/brand/project_svgs/`.
  4. Run `npm run update:stats` to prune repository stats from [`src/lib/repoStats.ts`](src/lib/repoStats.ts).
  5. Run `npm test` to verify no broken references remain.

---

### Writing Copy Guidelines

- Every user-facing UI string goes in `src/messages/*.json` in all supported locales.
- Keep sentences plain and concise; avoid em dashes `—` (content tests enforce this rule).

---

## 🛠️ Usage Guide

### 1. Adding a New Language

The site currently supports English, Simplified Chinese, Hindi, Spanish, French, Arabic, Bengali, Portuguese, Russian, Urdu, Swahili, Hausa and te reo Māori. To add another language (e.g., Japanese - `ja`):

1. **Register the language:** Add it to the `languages` array in [`src/config/languages.ts`](src/config/languages.ts), including its text direction and Open Graph locale:
   ```typescript
   { code: 'ja', name: 'Japanese', localName: '日本語', dir: 'ltr', ogLocale: 'ja_JP' },
   ```

2. **Create the translation catalog:** Copy `src/messages/en.json` to `src/messages/ja.json`, translate every value, and register it in [`src/i18n/messages.ts`](src/i18n/messages.ts). Keep ICU placeholders such as `{count}` and `{count, plural, ...}` intact.

3. **Translate project text:** Create `src/lib/projectTranslations/ja.ts` (same shape as `hi.ts`) and register it in [`src/lib/projectTranslations/index.ts`](src/lib/projectTranslations/index.ts).

4. **Check the font:** Latin, Cyrillic, Devanagari, Bengali and Arabic script are covered by the fonts in [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx); Chinese uses the visitor's system fonts. Add a Noto font there if the new script needs one.

5. Run `npm test`. The content tests check that every locale has the same keys and placeholders as English and a translation for every project.

---

### 2. Translating Text in Pages and Components

#### Server Components (Recommended for Static Content)
By default, server components can load translations statically without shipping translation JSONs to the client bundle:

```tsx
import { useTranslations } from 'next-intl';

export default function Section() {
  const t = useTranslations('Home');
  return <h1>{t('heading')}</h1>;
}
```

#### Client Components
If your component uses React hooks (e.g., `useState`), define it with `"use client"` and import from `next-intl`:

```tsx
"use client";

import { useTranslations } from 'next-intl';

export default function InteractiveButton() {
  const t = useTranslations('Home');
  return <button onClick={() => alert('Clicked!')}>{t('heading')}</button>;
}
```

---

### 3. Navigation Helpers

When navigating between routes, always use the locale-aware navigation helpers imported from [`src/i18n/navigation.ts`](src/i18n/navigation.ts) instead of standard `next/link` or `next/navigation`:

```tsx
import { Link } from '@/i18n/navigation';

// Will automatically resolve to /en/about or /hi/about based on active locale
<Link href="/about">About Us</Link>
```

For programmatic router navigation:
```typescript
import { useRouter, usePathname } from '@/i18n/navigation';

const router = useRouter();
const pathname = usePathname();

// Switch active locale on current page
router.replace(pathname, { locale: 'hi' });
```

---

### 4. Theme Configuration & Dual Theme Support

The starter kit uses `next-themes` combined with Tailwind CSS v4's class-based custom variants to provide a responsive and flash-free theme experience.

#### Customizing Colors
Tailwind v4 is configured via CSS custom properties in [`src/app/[locale]/globals.css`](src/app/[locale]/globals.css). To adjust the default light and dark theme background or text colors, edit the root variables:

```css
:root {
  --background: #ffffff; /* Light theme background */
  --foreground: #121212; /* Light theme text */
}

.dark {
  --background: #0a0a0a; /* Dark theme background */
  --foreground: #f4f4f5; /* Dark theme text */
}
```

#### Using Theme Classes
To create element styles that adapt automatically to the user's selected theme, use semantic utility tokens instead of inline `dark:` utilities:

```tsx
<div className="bg-background-secondary text-foreground-primary border border-border-default">
  This card automatically transitions colors across light and dark themes.
</div>
```

---

### 5. Smooth Scrolling (Lenis)

The starter repository integrates the `lenis` library to provide smooth, high-performance inertial scrolling across all browsers.

#### Customizing Lenis Options
To configure scroll parameters (e.g., dampening velocity, custom scroll durations, or scroll directions), update the parameters passed to the `ReactLenis` component in [`lenis-provider.tsx`](src/components/providers/lenis-provider.tsx):

```tsx
<ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
  {children}
</ReactLenis>
```

To access the active Lenis instance or bind custom scroll animations programmatically in your page components, use the `useLenis` hook:

```typescript
import { useLenis } from 'lenis/react';

const lenis = useLenis(({ scroll, limit, velocity, direction }) => {
  // Bind your scroll logic or animation timelines here
});
```

---

## ⚡ Development and Deployment

### Getting Started

Install the project dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it. The application will automatically detect your browser's language preferences and route you to the matching locale, such as `/en` or `/hi` (or fall back to the default language, English).

### Building for Production

Compile and optimize the project:
```bash
npm run build
```

This compiles optimized static pages under the `/[locale]` path and checks all TypeScript configurations.

### Running in Production

Start the optimized server:
```bash
npm run start
```

---

## ⚙️ Initial Project Setup Checklist

When bootstrapping a new project from this starter repository, update the following configurations to align with your project's branding, package naming, and hosting domains:

### 1. Project Identity & Header Details
- **Project Title & Logo ([`README.md`](README.md))**: Update the main project header logo (`public/brand/icons/aossie_logo.svg`), title `<h1>AOSSIE's Website</h1>`, project description, feature list, and tech stack.
- **AI Agent Context ([`AGENTS.md`](AGENTS.md))**: Update directives and rules for AI coding agents.
- **LLM Manifest ([`public/llms.txt`](public/llms.txt))**: Update the root LLM crawler policy.
- **Community & Social Links ([`Contributors.md`](Contributors.md))**: Update Discord and community links.

### 2. Domain Names & Search Engine Crawlers
- **Sitemap Generator ([`src/app/sitemap.ts`](src/app/sitemap.ts))**: Set the default fallback domain `https://aossie.org` or set the `NEXT_PUBLIC_SITE_URL` environment variable in your production hosting panel.
- **Search Crawler Rules ([`public/robots.txt`](public/robots.txt))**: Point to your production sitemap URL (`https://aossie.org/sitemap.xml`).

### 3. Branding Guidelines & Assets
- **Logo & Favicons ([`public/brand/icons/`](public/brand/icons/))**: Maintain official organization logos (`aossie_logo.svg` and `favicon.ico`).
- **Brand Documentation ([`public/brand/Brand.md`](public/brand/Brand.md))**: Document custom color hex codes, typography selections, and asset paths to guide developers and AI coding agents.

### 4. SEO & i18n Localization Metadata
- **Schema.org JSON-LD ([`src/app/[locale]/page.tsx`](src/app/[locale]/page.tsx))**: Locate the `jsonLd` object inside the `Home` component and update `publisher.name`, `publisher.url`, and `publisher.logo`.
- **Translation Catalogs ([`src/messages/`](src/messages/))**: Update the `heading`, `metaTitle`, and `metaDescription` keys with localized titles and descriptions.

### 5. Mobile & AI Platform Configurations
- **Android App Links ([`public/.well-known/assetlinks.json`](public/.well-known/assetlinks.json))**: Configure package name and Android application certificate SHA-256 fingerprint if applicable.
- **AI Agent Plugins ([`public/.well-known/ai-plugin.json`](public/.well-known/ai-plugin.json))**: Update host URLs, contact emails, and description text to describe website features to AI agents.
- **LLM Crawler Rules ([`public/llms.txt`](public/llms.txt))**: Serves the root crawlers policy indicating allowed LLM bot indexing.


---

## 🚀 Getting Started

To contribute to this repository you will need to:
1. Fork this repository
2. Push changes to a new branch in your fork
3. Create a pull request from that branch to the main branch of this repository

> [!NOTE]
> Forking only needs to be done once, after which you can push changes to your fork.

---

## 💻 Running the website Locally

In order to run the site locally:
1. Fork the website and clone that fork on your system:
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/website.git
   ```
2. Open a terminal window and change the directory to the cloned repository:
   ```bash
   cd website
   ```
3. In the root directory, install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```
4. The website will be active at [http://localhost:3000](http://localhost:3000/).

---

## 🤝 Contributing

Contributions to the project are very much welcomed! Please reach out with ideas for new content or issues with existing content.

You can contribute by:
- Raising any issues you find
- Fixing issues by opening Pull Requests
- Improving the website
- Talking about AOSSIE

If you want to get in touch with us first before contributing, join our community:
- **Discord:** [AOSSIE Discord Channel](https://discord.gg/hjUhu33uAn)

---

## 📄 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

