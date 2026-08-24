# MyPortfolio

Slav Lambov's portfolio site — React 19, Vite, Tailwind CSS v4, GSAP, React Router. A homepage
that carries the whole story in one scroll, plus one project case study.

---

> **Status: redesigned, builds clean, not deployed.**
>
> As of 24 August 2026 the site is rebuilt against the [Spireforge design system](DESIGN.md), which
> is copied into this repository as the contract it builds to. The retired STL Media identity is
> gone: assets, palette, typefaces and stylesheet. The content is accurate — the thirteen-year
> retail and warehouse management career is on the page, the skills are tiered by how they are
> actually known, and every figure quoted was measured rather than remembered.
>
> What has not happened is **deployment**. That is the only thing standing between this and being
> the URL on the CV.

## Stack

React 19, Vite, Tailwind CSS v4 (through `@tailwindcss/vite`, so no `tailwind.config.js`), React
Router 8, GSAP with `@gsap/react`, `react-icons`. Playwright is installed as a dev dependency and
there is still no spec.

## The design system

[`DESIGN.md`](DESIGN.md) is the Spireforge design system, copied from the brand kit. It is the
contract, not documentation of what happened to get built.

`src/styles/tokens.css` is the brand's own token file, **verbatim**. Do not hand-edit it — change
it in the kit and copy it across. `src/index.css` only teaches Tailwind the names, using
`@theme inline` so each utility resolves to the value the token points at.

Two things in there are load-bearing:

- **`--color-*: initial` wipes Tailwind's default palette.** The system's hardest rule is one accent
  hue and no second one. Leaving `bg-sky-500` reachable makes that a rule someone has to remember;
  wiping the defaults makes it a compile error.
- **Mono means verifiable.** IBM Plex Mono is used for dates, counts, percentages, statuses, file
  sizes and technical labels — things a reader could check. Inter Tight carries claims. Keeping that
  split is what makes the numbers on the page read as measurements.

Fonts are self-hosted in `src/assets/fonts` as subsetted WOFF2, 143 kB for all four cuts. The design
system bans third-party font CDNs in production. To regenerate them, see the note at the top of
`src/styles/fonts.css` — the variable axes are pinned deliberately.

## What is built

**Homepage**, one scroll, in this order: Hero, Projects, About, Skills, Education, Contact, Footer.
Projects sits above About on purpose — a recruiter wants evidence before biography.

- **Hero.** The largest type on the page is a sentence, not a name. Two career tracks are drawn as
  parallel lanes underneath, showing the computing track starting inside the working one, because
  neither stopped. That is the page's signature element and the only place its boldness is spent.
- **Projects.** Moss takes a wide featured treatment; the other three are rows. Only the live
  project's status takes the accent.
- **About.** The management career, the degree taken in the evenings, and an explicit statement
  that none of it substitutes for commercial development experience.
- **Skills.** Four tiers — comfortable, working in, from the degree not from a job, learning now.
  The fourth tier names the gaps and is what makes the first three credible.
- **Education.** The degree, its three levels as a real sequence, and the certificates as
  downloadable files with their weights shown.
- **Contact.** Direct links beside the form, and the form degrades to email-only rather than
  failing silently.

**Case study** at `/projects/moss` — the one project with enough behind it to fill a page.

## Running it

```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build
npm run preview  # serve the build
npm run lint     # ESLint
```

`VITE_FORMSPREE_ID` is needed for the contact form to post. See [`.env.example`](.env.example). It
is not a secret — anything prefixed `VITE_` is inlined into the client bundle — but without it the
form renders as email-only.

## Deploying

**Not done yet, and the plan changed.** `vite.config.js` now sets `base: "/"` and every URL points
at `spireforge.co.uk`, so the site is ready for a root domain.

The intended target was Cloudflare Pages, and `public/_redirects` was added for SPA routing. That is
probably wrong: Cloudflare no longer creates Pages projects from the dashboard, and the sibling
[Moss](https://github.com/STL73/Moss) project deploys as a **Worker serving static assets** instead.
That route needs a `wrangler.jsonc` with `not_found_handling: "single-page-application"` — without
it every deep link 404s while in-app navigation works, which passes a casual smoke test and breaks
every shared link. It also needs a pinned Node version, because Cloudflare's builder still defaults
to 18.

`_redirects` stays until that switch is made rather than leaving nothing in place.

## Known gaps

Measured on 24 August 2026.

- **Not deployed.** `spireforge.co.uk` still serves the Spireforge placeholder page.
- **No `og:image`.** The old one was an SVG in the retired palette quoting a dead URL, and X,
  Facebook and LinkedIn do not render SVG, so no preview card has ever worked. A 1200×630 PNG
  replaces it once the headline copy is settled.
- **Motion stops at the hero.** The hero has one orchestrated page-load sequence built inside
  `gsap.matchMedia`. Nothing else animates. That is deliberate for now — a considered pass beats
  scattered scroll reveals — but it is unfinished.
- **No tests.** Playwright is installed, there is no spec and no test script.
- **The high-school entry** in `educationData` is dated 1986–1991. It adds nothing beside a 2025
  BSc and it broadcasts age to a recruiter. Flagged, not decided.
- **`home1.png` is still in `src/assets/images`** at 511 kB. Nothing imports it, so it does not
  ship — it is kept because the photo for the redesign has not been chosen.

## Layout

```text
src/
├── pages/            Route components — Home, NotFound, projects/Moss
├── sections/         Homepage sections
├── components/       Reusable pieces
├── constants/        All copy and data. Changing what the site claims is an edit here
├── styles/           tokens.css (verbatim from the brand kit) and fonts.css
├── context/          SectionThemeContext
└── assets/           Fonts and images
```

Content lives in `src/constants/`, not in components — correcting what the site says about Slav is
an edit to one folder.
