# CLAUDE.md — MyPortfolio

## Project Overview

Personal portfolio SPA built to target junior developer roles and freelance clients.
Type: personal portfolio
Status: in progress

## Tech Stack

- Frontend: React 19 + Vite + Tailwind CSS v4 + GSAP (animations)
- Backend: none
- Database: none
- Auth: none
- Testing: none installed yet
- Deployment: TBD
- Package manager: npm

## Folder Structure

- /src/sections       Page-level sections (Hero, About, Projects, Skills, Education, Contact, Footer)
- /src/components     Reusable UI components (Nav, Button, cards)
- /src/constants      Static data (project list, skills, education entries, etc.)
- /src/context        React context providers (SectionThemeContext)
- /src/assets         Images and icons
- /public             Favicons, resume PDF, certificates, static assets

## Build Commands

- `npm run dev`       Start dev server (Vite HMR)
- `npm run build`     Production build to /dist
- `npm run preview`   Preview production build locally
- `npm run lint`      Run ESLint

## Rules

- [frontend.md](.claude/rules/frontend.md) — React, Tailwind, GSAP conventions and watch-outs
- [backend.md](.claude/rules/backend.md) — backend rules (none yet)
- [api.md](.claude/rules/api.md) — API design rules (none yet)
- [testing.md](.claude/rules/testing.md) — testing rules (none yet)
- [deployment.md](.claude/rules/deployment.md) — deployment rules (none yet)

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

## Skills

See [.claude/skills-manifest.md](.claude/skills-manifest.md) for the full list of applicable skills and when to invoke them.

## MCP Integrations

Connected at account level — no `.mcp.json` config needed:

| Integration | When to Use |
|-------------|------------|
| **Figma** | Pull design mockups directly into component code |
| **21st Magic** | Generate React UI components from a prompt |
| **Context7** | Live docs for React 19, GSAP 3, Tailwind v4 — avoids outdated API usage |
| **Vercel** | Deployment workflow when moving off GitHub Pages |
| **GitHub** | Already configured in `.mcp.json` — PR, issues, branch management |
