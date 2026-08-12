# Best Practices Checklist

This document details the adherence of **AOSSIE-Website** to AOSSIE's standard engineering, security, accessibility, and documentation best practices.

---

## 🔴 Must Have (Red Good Practices)

- [x] **Repository Governance & Legal Compliance:** Includes `LICENSE`, `DCO.md`, `COPYRIGHT.md`, `MAINTAINERS.md`, `Contributors.md`, and `CONTRIBUTING.md`.
- [x] **Zero TODO Policy:** README and all project documentation contain zero unaddressed `TODO` items or broken links.
- [x] **Project Branding:** Logo in SVG format (`public/brand/icons/aossie_logo.svg`), valid favicons, color palette, typography, and `Brand.md` document stored inside `public/brand/`.
- [x] **Automated CI/CD Pipeline:** Configured with GitHub Actions workflows for continuous integration linting, unit testing, and static export build (`.github/workflows/ci.yml`).
- [x] **Automated Deployment:** Configured GitHub Actions workflow (`.github/workflows/nextjs.yml`) for static export deployment to GitHub Pages.
- [x] **AI Agent Directives:** Repository contains an up-to-date `AGENTS.md` and `CLAUDE.md` providing architectural context for AI coding agents.
- [x] **Code Quality & Linting:** Strict ESLint configuration and TypeScript type checking enabled without build warnings.
- [x] **Clean Configuration:** No magic constants or raw hardcoded values; central constants defined in configuration files (`src/config/languages.ts`, `src/i18n/routing.ts`).
- [x] **SEO & Metadata:** Semantic HTML elements, proper OpenGraph and Twitter card metadata, dynamically generated sitemaps (`sitemap.ts`), and `robots.txt`.
- [x] **Automated AI Code Review:** Integration configured via `.coderabbit.yaml`.

---

## 🟡 Should Have (Yellow Good Practices)

- [x] **Unit Testing Framework:** Vitest and React Testing Library configured with non-trivial test coverage for core components (`Navbar`, `LanguageSwitcher`).
- [x] **Internationalization (i18n):** Multi-language catalog support via `next-intl` with language selector component and clean URL prefixing (`/en`, `/hi`).
- [x] **Accessibility (a11y):** High contrast color pairs, proper ARIA attributes, semantic landmarks (`<main>`, `<nav>`, `<footer>`), and smooth keyboard navigation.
- [x] **Performance Optimization:** Static HTML export (`output: 'export'`), responsive asset sizing, micro-animations, and fast page load times.
- [x] **Social & Support Integration:** Social share buttons and community support link (Support Us / AOSSIE Discord) integrated into navigation and footer.
- [x] **Peer Review & Audit Report:** Comprehensive peer evaluation and security audit report available in `audit/AuditReport.md`.
