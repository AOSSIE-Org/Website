# AOSSIE Brand Guidelines

This document details the visual identity guidelines for **AOSSIE** (Australian Open Source Software Innovation and Education).

---

## 🎨 Color Palette

The AOSSIE color scheme is inspired by Australia's national colors and modern UI design standards.

| Color Name | Color Sample | HEX Code | RGB Code | Role |
| :--- | :--- | :--- | :--- | :--- |
| **Golden Wallet** | 🟡 | `#FFCD00` | `rgb(255, 205, 0)` | Primary Brand Color |
| **Baggy Green** | 🟢 | `#00843D` | `rgb(0, 132, 61)` | Secondary Brand Color |
| **Neutral Dark** | ⬛ | `#121212` | `rgb(18, 18, 18)` | Dark Layouts & Text |
| **Neutral Light** | ⬜ | `#FFFFFF` | `rgb(255, 255, 255)` | Light Layouts & Text |
| **Neutral Muted** | 🔘 | `#7A7A7A` | `rgb(122, 122, 122)` | Borders & Muted Text |
| **Primary Dark** | ⬛ | `#282C33` | `rgb(40, 44, 51)` | Primary Brand Dark Color (Fonts, Headers, Primary Icons) |
| **Light Mode Line & Border** | ◽ | `#E6E6E6` | `rgb(230, 230, 230)` | Light Mode Borders, Dividers & Slanted Frame Lines |
| **Dark Mode Surface** | ⬛ | `#0F1115` | `rgb(15, 17, 21)` | Dark Mode Background |


---

## 👁️ Visual Assets

All official visual branding assets and icons reside inside [`public/brand/icons/`](icons/):

- **Secondary Logo:** [aossie_secondary_logo.svg](icons/aossie_secondary_logo.svg) (`/brand/icons/aossie_secondary_logo.svg`)
- **Primary Logo:** [aossie_logo.svg](icons/aossie_logo.svg) (`/brand/icons/aossie_logo.svg`)
- **Favicon:** [favicon.ico](icons/favicon.ico) (`/brand/icons/favicon.ico`)
- **UI & Theme Icons:** [sun.svg](icons/sun.svg), [moon.svg](icons/moon.svg), [globe.svg](icons/globe.svg)
- **Social Media Icons:** `github.svg`, `discord.svg`, `twitter.svg`, `instagram.svg`, `linkedin.svg`, `youtube.svg`, `mail.svg`

---

## ✍️ Typography

- **Default Font Family:** **Inter**
- **Fallback Stack:** `ui-sans-serif, system-ui, sans-serif`
- **Configuration:** Set globally via Tailwind CSS v4 custom theme bindings inside [`globals.css`](src/app/[locale]/globals.css) and loaded asynchronously in the root layout via Next.js Google Font optimizer.

