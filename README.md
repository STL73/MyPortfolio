# MyPortfolio

A personal portfolio site — React 19, Vite, Tailwind CSS v4, GSAP. Seven sections composed as a
single page, with everything below the fold code-split.

---

> **Status: builds, content is now real, still not deployed — and due to be redesigned outright.**
>
> The shell compiles clean, the sections are lazy-loaded, there is a skip link and a section-theme
> context. As of 24 August 2026 the **content is real too**: the four projects listed are the four
> that exist, and the contact details are the brand ones. What has not moved is the **branding**,
> which still belongs to the retired STL Media identity, and **deployment**, which has not happened.
>
> A full redesign is planned rather than further patching, so the remaining
> [known gaps](#known-gaps) are deliberately left for it. This README records what is actually
> here, not a pitch.

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
| Main | 114.18 kB |
| CSS | 4.83 kB |
| Per-section chunks | 1.07 – 2.23 kB |

## Known gaps

Measured on 24 August 2026, not guessed. Split into what was closed that day and what is still
open — the open ones are the reasons this is not deployable as it stands.

### Fixed on 24 August 2026

**The projects on display are now the real ones.** `projectsData` previously listed *Portfolio
Redesign*, *E-Commerce UI*, *Event Landing* and *SaaS Dashboard*, none of which exist, while
omitting the only shipped work. It now carries [Moss](https://mossart.spireforge.co.uk) as the
featured entry with a screenshot of the live storefront,
[WorldQuiz](https://github.com/STL73/WorldQuiz), the Manchester Event Portal (private — assessed
coursework, so no link), and this repository. Each description states what is built and what is
not, so the badges read Live, In Progress, Private, In Progress rather than four uniform claims.

**Contact details are the brand ones.** `PERSONAL.email`, the Gmail compose link and the footer all
use `hello@spireforge.co.uk`, which both receives and sends. `PERSONAL.site` pointed at a 404 and
now points at `spireforge.co.uk`.

**The image payload dropped from about 2.1 MB to 555 kB.** `STL-logo.png` (1.57 MB) was imported by
the icons barrel and used by nothing once it stopped being a project image — Vite emitted it into
every build regardless, for an asset no page ever requested. Removing the import removed the asset.
What remains is `home1.png` at 511 kB and the 45 kB Moss screenshot.

**The JSON-LD no longer claims TypeScript**, which is a listed gap rather than a skill.

### Still open

**The branding is a retired identity.** `src/assets/icons/` and `public/` still carry STL Media
favicons, the apple-touch icon and the nav wordmark. The current identity is Spireforge and its kit
— mark, lockups, tokens, fonts — already exists at
`Claude Cowork/MY-BRAND/OUTPUTS/`. This is the largest remaining gap and the main reason the site is
not shareable yet.

**The dead github.io URL survives outside `src/`.** It is still hardcoded in `index.html` (canonical,
`og:url`, both image tags), `public/robots.txt`, `public/sitemap.xml`, and as `base: "/my-portfolio/"`
in `vite.config.js` — a GitHub Pages sub-path that has to become `"/"` for any root-domain host.
Left in place deliberately: they all resolve together once a deployment target is chosen, and the
redesign will choose one.

**`home1.png` is 511 kB**, uncompressed and unconverted, and it is used in both Hero and About.

**No tests.** Playwright is installed (`^1.59.1`) and there is no spec and no test script.

**Not deployed.** `spireforge.co.uk` currently serves the Spireforge placeholder page.

## Running it

```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build
npm run preview  # serve the build
npm run lint
```

## What is next

The portfolio is being **redesigned outright** rather than patched further, so the list is short:

1. Redesign against the Spireforge design system — copy
   `MY-BRAND/OUTPUTS/08-GUIDELINES/design-system_2026-08-20_v1.md` into this repo as `DESIGN.md`
   and build to it, replacing the STL Media assets as part of that work
2. Pick a deployment target, then fix `index.html`, `robots.txt`, `sitemap.xml` and vite's `base`
   together in one pass
3. Compress or drop `home1.png`
4. Write the first Playwright spec

The project data and contact details are already correct and should survive the redesign — they
live in `src/constants/index.js`, which is one file.
