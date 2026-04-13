# Frontend Rules — MyPortfolio

## Component Structure
- One component per file, PascalCase filenames
- Sections live in /src/sections — full page-level sections only
- Reusable UI pieces live in /src/components
- Static data kept in /src/constants — never hardcode data inline in components
- All page sections must be wrapped in SectionThemeProvider
- Lazy-load sections via React.lazy + Suspense — Hero and Nav are the only exceptions

## Styling
- Tailwind CSS v4 — uses the @tailwindcss/vite plugin
- NEVER add a postcss.config.js — it will break the Tailwind v4 setup
- Do NOT introduce TypeScript — project is plain JS/JSX only. No .ts or .tsx files

## Animations
- GSAP handles all scroll-based animations
- After any layout change to Hero.jsx, verify GSAP scroll triggers still fire correctly
- Do not restructure Hero markup without checking animation target selectors

## Protected Directories
- /public/resume — contains the user's CV. NEVER delete or move this directory
- /public/certificates — contains the user's certificates. NEVER delete or move this directory
