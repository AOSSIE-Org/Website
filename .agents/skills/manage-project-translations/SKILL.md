---
name: manage-project-translations
description: >-
  Use this skill whenever adding, updating, or removing projects and UI strings in the AOSSIE website repository, to automatically synchronize translations, enforce translation rules, update repo statistics, and validate test suites.
---

# Manage Project Translations & Synchronizations

This skill guides AI agents through the complete lifecycle of managing projects, project translations, and UI localization strings in the AOSSIE website repository.

## Target Files

- **Supported Locales:** [`src/config/languages.ts`](../../src/config/languages.ts) (en, zh, hi, es, fr, ar, bn, pt, ru, ur, sw, ha, mi)
- **Project Definitions (English):** [`src/lib/projectsData.ts`](../../src/lib/projectsData.ts)
- **Project Translations:** one file per locale in [`src/lib/projectTranslations/`](../../src/lib/projectTranslations/) (e.g. `hi.ts`, `zh.ts`)
- **UI Strings (English, source of truth):** [`src/messages/en.json`](../../src/messages/en.json)
- **UI Strings (other locales):** `src/messages/<locale>.json`
- **Repository Statistics Snapshot:** [`src/lib/repoStats.ts`](../../src/lib/repoStats.ts)

---

## Translation Rules & Constraints

1. **No Em Dashes:** Never use em dashes (`—`) in any English copy or translated strings. The Vitest content test suite (`npm test`) explicitly checks for and forbids em dashes across all translation catalogs. Use commas, hyphens (`-`), or colons instead.
2. **Key Parity:** Every key present in `en.json` must exist in every other locale file, with the same ICU placeholders (`{count}`, `{count, plural, ...}`).
3. **Project Parity:** Every project entry defined in `PROJECTS_DATA` within `projectsData.ts` must have a corresponding entry in every locale file under `src/lib/projectTranslations/` (providing `description` and optional `about` if defined in English).
4. **Right-to-left:** Arabic (`ar`) and Urdu (`ur`) render right-to-left; keep Latin-script names (AOSSIE, GitHub, project names) as they are.
5. **Terminology Preservation:** Keep technical names, protocol names, libraries, and frameworks intact (e.g., *Flutter, WebSockets, Appwrite, SQLite, EVM, Solana, Dart, TypeScript, RTMP, LiveKit*).

---

## Workflow Steps

### Step 1: Detect Changes & Missing Entries

- When a new project is added to `PROJECTS_DATA` in `src/lib/projectsData.ts`, extract its `slug`, `description`, and `about` (if present).
- Compare `src/messages/en.json` with each other locale file to find any newly added or modified keys.

### Step 2: Generate Translations

- Translate the `description` and `about` fields into clear, natural, and idiomatic text for every supported locale.
- Translate any new UI string keys in `en.json` into every other locale file.
- Verify the generated text contains **no em dashes (`—`)**.

### Step 3: Apply File Updates

- Add or update the translated entry in each `src/lib/projectTranslations/<locale>.ts` file, keyed by the project's `slug`:
  ```typescript
  "project-slug": {
    description: "अनुवादित विवरण...",
    about: "विस्तृत विवरण...",
  },
  ```
- If a project was removed, remove its corresponding key from every file in `src/lib/projectTranslations/`.

### Step 4: Refresh Repository Statistics

- If new repositories were added or modified in `projectsData.ts`, run:
  ```bash
  npm run update:stats
  ```
- Ensure every repository in `PROJECTS_DATA` has a corresponding entry in `src/lib/repoStats.ts`.

### Step 5: Validate with Test Suite

- Run the full test suite to guarantee all constraints and parity checks pass:
  ```bash
  npm test
  ```
- Address any failure reported by `src/__tests__/content.test.ts`.
