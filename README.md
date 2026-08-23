# MyPortfolio

A personal portfolio site — React 19, Vite, Tailwind CSS v4, GSAP. Seven sections composed as a
single page, with everything below the fold code-split.

---

> **Status: builds, not deployed, and the content is placeholder.**
>
> The shell is real — it compiles clean, the sections are lazy-loaded, there is a skip link and a
> section-theme context. **What is in it is not.** The projects on show are invented placeholders,
> the branding belongs to a retired identity, and the site URL it points at does not exist. See
> [Known gaps](#known-gaps) before reading anything here as finished.
>
> Last feature work was 13 April 2026. This README exists to record what is actually here, not to
> present the project as done.

## Stack

React 19, Vite, Tailwind CSS v4 (through `@tailwindcss/vite`, so no `tailwind.config.js`), GSAP for
motion, `react-icons`. Playwright is installed as a dev dependency but there is no test script and
no specs.

## What is built

Seven sections composed in `App.jsx` — Hero, About, Projects, Skills, Education, Contact, Footer —
with five card components (`ProjectCard`, `SkillCard`, `EduCard`, `CertificateCard`, `Nav`).

Three things are done properly and are worth keeping:

- **Everything below the fold is code-split.** Only `Hero` and `Nav` are imported eagerly; the rest
  are `lazy` behind a `Suspense` boundary whose fallback reserves a full viewport height, so the
  page does not jump as chunks arrive.
- **There is a skip link**, visible on focus, ahead of the nav.
- **Content lives in `src/constants/index.js`**, not scattered through components — so correcting
  what the site claims is an edit to one file.

Build output, from a clean `npm run build`:

| Chunk | Gzipped |
|---|---|
| Main | 115.04 kB |
| CSS | 4.83 kB |
| Per-section chunks | 1.07 – 2.23 kB |

## Known gaps

Measured on 24 August 2026, not guessed. These are the reasons this is not deployable as it stands.

**The projects on display are not real.** `projectsData` lists *Portfolio Redesign*, *E-Commerce
UI*, *Event Landing* and *SaaS Dashboard*. Three are marked `wip` with no URL and the fourth points
at a dead link. Meanwhile the two projects that actually exist —
[MossArt](https://mossart.spireforge.co.uk), which is live, and
[WorldQuiz](https://github.com/STL73/WorldQuiz) — are not listed at all. A portfolio omitting the
only shipped work is worse than no portfolio.

**The site URL 404s.** `PERSONAL.site` and the *Portfolio Redesign* entry both point at
`slavlambov.github.io/my-portfolio/`, which returns 404. That is also a different GitHub account
from the real one, `STL73`.

**The branding is a retired identity.** `src/assets/icons/` carries STL Media logos, favicons and
video. STL Media is no longer in use; the current identity is Spireforge, and its kit — mark,
lockups, tokens, fonts — already exists.

**Contact details are stale.** `PERSONAL.email` is a personal Gmail rather than the brand address.

**About 2 MB of unoptimised images ship in the build.** `STL-logo.png` alone is 1.57 MB and
`home1.png` is 511 kB, neither compressed nor converted. They dwarf the 115 kB of JavaScript, and
the logo is from the retired identity, so it should not be there at all.

**No tests.** Playwright is installed and unused.

## Running it

```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build
npm run preview  # serve the build
npm run lint
```

## What is next

In order:

1. Replace `projectsData` with the real projects, MossArt first
2. Repoint or remove the dead site URL, and fix the contact details
3. Swap the STL Media assets for the Spireforge kit
4. Compress the images, or drop the ones no longer needed
5. Deploy to `spireforge.co.uk`, which currently serves a placeholder page

Steps 1 and 2 are edits to a single file.
