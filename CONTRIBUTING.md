# Contributing to AOSSIE Website

We welcome contributions of all kinds! Whether you are fixing a bug, adding a feature, improving documentation, or optimizing performance, your help is appreciated.

---

## 💬 Join our Discord Community

If you have questions, feedback, or want to discuss ideas before building:
- **AOSSIE Discord Server:** [https://discord.gg/hjUhu33uAn](https://discord.gg/hjUhu33uAn)
- **Discord Channel:** [#landing-pages](https://discord.com/channels/1022871757289422898/1458840574076387448) in the AOSSIE Discord server (join the server first; the channel link only opens for members)

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: `v22` or higher (matches CI and `engines` in `package.json`)
- **npm**: `v9` or higher

### 2. Fork & Clone
```bash
git clone https://github.com/AOSSIE-Org/Resonate-Website.git
cd Resonate-Website
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📜 Pull Request Guidelines

1. **Create a Feature Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Quality Checks:**
   Run the same checks as CI before submitting:
   ```bash
   npm run lint
   npm run test:coverage   # Vitest; fails below 90% coverage
   npm run build
   ```
3. **Tests are required for new logic:** changes to `src/i18n/`, `src/config/`, `src/lib/` or `src/app/sitemap.ts` must add or update tests in `src/__tests__/`. Prefer [fast-check](https://fast-check.dev) property tests where the input space is large.
4. **Commit Messages:**
   Use clear, descriptive commit messages following Conventional Commits (e.g., `feat: add social share buttons`, `fix: header logo alignment`).
5. **Developer Certificate of Origin (DCO):**
   Ensure your commits adhere to our [`DCO.md`](DCO.md).

---

## 📋 Code Style & Architecture

- **Next.js 16 App Router:** Use React Server Components by default. Use `"use client"` only for interactive stateful components.
- **Tailwind CSS v4:** Use central semantic CSS variables (`bg-background`, `text-foreground`). Avoid ad-hoc inline dark classes.
- **Internationalization (i18n):** User-visible strings go into all 13 catalogs in `src/messages/` (the content tests fail on missing keys or placeholders). Use navigation helpers from `src/i18n/navigation.ts`, and logical CSS properties so RTL locales (Arabic, Urdu) lay out correctly.
- **Zero TODOs Policy:** Ensure all code, documentation, and metadata files contain no remaining `TODO` placeholders.

Thank you for contributing to AOSSIE!
