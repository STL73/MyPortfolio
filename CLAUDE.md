# CLAUDE.md — Personal Portfolio

---

## Live memory lives in the Evolving Brain

**Before doing anything in this project, read this page first:**

- `C:\Users\slavi\Evolving Brain\Projects\Coding Projects\Personal Portfolio.md`

It is a single dossier: **compiled truth** on top (current state, blockers, next action) and an
**append-only timeline** underneath (dated history, every entry cited). Trust its compiled-truth
section over anything in this file or any README.

Check it for contradiction and unverified-claim callouts before acting on anything they touch.

This `CLAUDE.md` holds **stable** config only - stack, scope, constraints, output location. Anything
that changes between sessions goes in the brain, not here.

**At end of session, update the brain - not this file:**

- Append a dated entry to the page's `## Timeline` (newest first, each ending with a source link)
- Update `## Compiled truth` only if the state genuinely moved
- Commit the vault

> Superseded 2026-07-26. This previously pointed at four files in `Slav's Vault`, which has been
> archived. Do not write there.

---

## Project Overview

Personal portfolio SPA built to target junior developer roles and freelance clients.
Type: personal portfolio
Visual system: [[My Brand]] (Spireforge). **Rebuilt 2026-08-20 — the description here was three
identities out of date.** One chevron carrying a trimmed tip with a three-point spark above it, every
angle derived from a single 26/28 slope; Night `#100A28` ground, aurora green `#5BFFB0`, near-white
`#EDE9FF` ink; Fraunces display, Inter Tight body, IBM Plex Mono code. Manrope is retired. The
canonical spec is `my-brand\outputs\08-GUIDELINES\design-system_2026-08-20_v1.md` — copy it to this
repo root as `DESIGN.md`. It **is now applied** — copied to the repo root as `DESIGN.md` and to
`src/styles/tokens.css` on 2026-08-24. Both are verbatim copies: change them in the kit and copy
across, never hand-edit them here. Nothing of the STL Media identity remains.

---

## Tech Stack

- Frontend: React 19 + Vite + Tailwind CSS v4 + GSAP (animations)
- Backend: none
- Database: none
- Auth: none
- Testing: **Playwright** for committed specs, **`agent-browser`** for interactive one-off browser
  checks. Neither is the other's fallback — decided 2026-08-31, because `agent-browser` has no test
  runner. `@playwright/test` **is installed** (^1.59.1) but no spec file or config exists yet. See
  [testing.md](.claude/rules/testing.md).
  *This line previously said "none installed yet"; checked against `package.json` 2026-08-24.*
- Deployment: **live at <https://spireforge.co.uk> since 2026-08-27**, served by the Cloudflare
  Worker `spireforge` and rebuilt by Workers Builds on every push to `main`. `base` is `"/"`,
  `wrangler.jsonc` carries `not_found_handling: "single-page-application"`, and `public/_redirects`
  has been removed. Config detail and the post-deploy checks live in
  [deployment.md](.claude/rules/deployment.md) — do not restate values here.
  *This line said "**not deployed**" until 2026-08-31, four days after it went live. Verified
  against a 200 from the live URL, `vite.config.js` and `wrangler.jsonc`.*
- Package manager: npm

---

## Folder Structure

- `/src/sections/`     Page-level sections (Hero, About, Projects, Skills, Education, Contact, Footer)
- `/src/components/`   Reusable UI components (Nav, Button, cards)
- `/src/constants/`    Static data (project list, skills, education entries, etc.)
- `/src/context/`      React context providers (SectionThemeContext)
- `/src/assets/`       Images and icons
- `/public/`           Favicons, resume PDF, certificates, static assets

---

## Build Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server (Vite HMR) |
| `npm run build` | Production build to `/dist` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Rules

Project-local rules (extend the global rules — read these for React/Tailwind/GSAP work):

- [frontend.md](.claude/rules/frontend.md) — React, Tailwind, GSAP conventions and watch-outs
- [backend.md](.claude/rules/backend.md) — backend rules (none yet)
- [api.md](.claude/rules/api.md) — API design rules (none yet)
- [testing.md](.claude/rules/testing.md) — testing rules (none yet)
- [deployment.md](.claude/rules/deployment.md) — deployment rules (none yet)

---

## Agents

Custom agents in `.claude/agents/` — invoke by asking Claude to use them:

| Agent | When to Use |
|-------|------------|
| `react-reviewer` | After writing or modifying any component or section |
| `gsap-specialist` | After any layout change to Hero.jsx, or when debugging animations |
| `seo-auditor` | Before deployment, or after changes to index.html meta/schema |
| `a11y-checker` | Before any section is marked done |
| `deploy-helper` | When preparing a deployment or diagnosing a broken build |
| `playwright-runner` | When setting up Playwright or writing/running E2E tests |

---

## Skills

See [.claude/skills-manifest.md](.claude/skills-manifest.md) for the full list of applicable skills and when to invoke them.

---

## MCP Integrations

Connected at account level — no `.mcp.json` config needed:

| Integration | When to Use |
|-------------|------------|
| **Figma** | Pull design mockups directly into component code |
| **21st Magic** | Generate React UI components from a prompt |
| **Context7** | Live docs for React 19, GSAP 3, Tailwind v4 — **avoids outdated API usage from training data** |
| **Cloudflare** | The live host. Worker `spireforge`, D1/KV/R2 if the site ever needs state |
| **Vercel** | Not used. This site was never on Vercel and is not moving there |
| **GitHub** | Already configured in `.mcp.json` — PR, issues, branch management |
