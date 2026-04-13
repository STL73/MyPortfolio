# Portfolio Redesign — Design Spec

**Date:** 2026-04-08  
**Status:** Approved (all sections)  
**Approach:** Full visual overhaul — rebuild every section in-place, no new routing or data architecture.

---

## 1. Design Direction

**Style:** Modern Dark + Depth  
**Background:** `#080d1a` (deep navy)  
**Surface:** `#0f172a`  
**Border:** `#1e293b`  
**Accent:** `#6366f1` (indigo)  
**Text primary:** `#f1f5f9`  
**Text secondary:** `#94a3b8`  
**Text muted:** `#64748b` / `#475569`

**Typography:**

- Headings: Syne 800/700 — imported via Google Fonts
- Body: DM Sans 400/500/600 — imported via Google Fonts

**Recurring motifs:**

- `::before` pseudo-element top gradient line on cards: `linear-gradient(90deg, transparent, #6366f1, transparent)`
- Hover state: `border-color: #6366f133`, `box-shadow: 0 0 32px #6366f10d`
- Indigo glow dot: `box-shadow: 0 0 8px #6366f166`
- Section label: 12px, `#6366f1`, letter-spacing 3px, uppercase
- Section title: Syne 800, `clamp(2rem, 4vw, 3rem)`, letter-spacing −1.5px; accent word wrapped in `<span style="color:#6366f1">`

---

## 2. Section Order & Themes

| #   | Section   | Theme | Notes                            |
| --- | --------- | ----- | -------------------------------- |
| 1   | Hero      | dark  | Centred layout                   |
| 2   | About     | dark  | Two-column                       |
| 3   | Projects  | dark  | Featured + grid                  |
| 4   | Skills    | dark  | 2×2 category grid + marquee      |
| 5   | Education | dark  | Timeline + certs grid            |
| 6   | Contact   | dark  | Two-column info + form           |
| 7   | Footer    | dark  | Brand + nav + social + copyright |

All sections use the same dark theme throughout (no alternating light sections).

---

## 3. Navigation (`Nav.jsx`)

- Fixed header, `background: rgba(8,13,26,0.8)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid #1e293b`
- Logo: `Slav<span style="color:#6366f1">.</span>` — Syne 800, 18px
- Nav links: DM Sans, 16px, `#94a3b8` default → `#f1f5f9` hover, `#6366f1` active
- CTA button "Hire Me": `background: #6366f1`, 15px, 8px/20px padding, border-radius 6px
- Active section tracked via `IntersectionObserver` (existing behaviour — keep)

---

## 4. Hero (`Hero.jsx`)

- Full-viewport centred column
- Radial glow background: 600px circle, `#6366f120`
- **Available badge**: `#6366f115` bg, `#6366f133` border, `#a5b4fc` text, pulsing indigo dot
- **Avatar**: 140px circle, `linear-gradient(135deg, #1e1b4b, #312e81)`, initials "SG" in `#a5b4fc`, outer glow rings spinning (8s / 5s reverse), `box-shadow: 0 0 40px #6366f133, 0 0 80px #6366f115`
- **h1**: Syne 800, `clamp(2.5rem, 5vw, 4rem)`, letter-spacing −2px
- **Role text**: `#6366f1`, 600, `clamp(1rem, 2vw, 1.25rem)`
- **Tagline**: 15px, `#64748b`, max-width 420px
- **CTAs**: "Hire Me" solid indigo + "View Projects ↓" ghost border
- **Tech badges**: `#0f172a` bg, `#1e293b` border, `#94a3b8` text, hover → `#6366f144` border + `#a5b4fc` text; display: React, TypeScript, Tailwind CSS, GSAP, Vite
- **Scroll indicator**: animated scroll wheel at bottom centre

---

## 5. About (`About.jsx`)

Two-column grid (`1fr 1fr`, gap 64px):

**Left — photo card:**

- `aspect-ratio: 4/5`, `border-radius: 16px`, indigo gradient bg, `border: 1px solid #1e293b`
- Real photo replaces "SG" placeholder at implementation
- Overlay badge (bottom-centre): name + "Frontend Developer" on dark frosted bg
- Decorative indigo square accent bottom-right (z-index −1)

**Right — content:**

- 2× bio paragraphs, `#94a3b8`, `strong` highlighted in `#f1f5f9`
- Info chips (pill shape): 📍 UK, 🎓 Computer Science, ✅ Open to work, 🌐 Remote friendly
- CV buttons: "View CV" (solid indigo) + "Download CV ↓" (ghost)
- **Stats row** (3 cards): "3+ Years experience", "10+ Technologies", "20+ Projects built" — each card has indigo top-line gradient, Syne 800 number in `#6366f1`

---

## 6. Projects (`Projects.jsx`)

**Featured card** (full-width, `grid-template-columns: 1fr 1fr`):

- Left: preview area with indigo radial glow + green pulsing "Live" badge
- Right: title, description, tag chips, "↗ Live Demo" (solid) + "GitHub" (ghost) links

**Grid** (`repeat(3, 1fr)`, gap 20px) for additional projects:

- Card: preview strip (140px, indigo gradient bg), body with title + desc, footer with tag chips + "GitHub →" link
- "In Progress" badge (stone-coloured) for WIP projects
- Hover: `translateY(-4px)` + glow

Data from `src/constants/index.js` — update project entries there.

---

## 7. Skills (`Skills.jsx`)

**Category grid** (`repeat(2, 1fr)`, gap 24px) — 4 cards:

| Card     | Icon | Skills                                                                    |
| -------- | ---- | ------------------------------------------------------------------------- |
| Frontend | ⚡   | React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, GSAP, Vite      |
| Design   | 🎨   | Figma, Responsive Design, Design Systems, Accessibility, UI/UX Principles |
| Delivery | 🚀   | Git, GitHub, npm/Vite, REST APIs, Agile, VS Code                          |
| Backend  | 🗄️   | Node.js, Express, PHP, SQL, MongoDB, REST APIs, XAMPP                     |

Each card: `#0f172a` bg, indigo top-line gradient, category icon in indigo-tinted box, skill chips (`#0d1829` bg, `#1e293b` border, `#94a3b8` text, indigo dot).

**Marquee strip** (below grid):

- `border-top` + `border-bottom: 1px solid #1e293b`, fade masks on left/right
- Two identical `.marquee-track` divs inside `.marquee-inner` (animated wrapper)
- Animation: `translateX(0)` → `translateX(-50%)`, 35s linear infinite, `will-change: transform`
- `padding-right: 32px` on each track to match `gap: 32px`
- 20 items: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, GSAP, Vite, Figma, Node.js, Express, PHP, SQL, MongoDB, XAMPP, REST APIs, Git, GitHub, Responsive Design, Accessibility

---

## 8. Education (`Education.jsx`)

**Timeline** (vertical, `margin-bottom: 64px`):

- Left border: 1px line, `linear-gradient(to bottom, transparent, #6366f144 10%, #6366f144 90%, transparent)`
- Each item: glowing indigo dot (10px, `box-shadow: 0 0 8px #6366f166`) + card to the right
- Card: `#0f172a` bg, indigo top-line gradient, degree title (Syne 800 17px), year badge (indigo-tinted), school name in `#6366f1`, description in `#64748b`
- Entries come from `src/constants/index.js`

**Certificates subsection** (below timeline):

- Sub-label: 12px, `#475569`, uppercase
- `repeat(3, 1fr)` grid
- Each cert card: icon box (indigo-tinted), name (Syne 700), issuer, footer with year + "View ↗" link
- Hover: `translateY(-3px)` + glow
- Data from `src/constants/index.js`

---

## 9. Contact (`Contact.jsx`)

Two-column grid (`1fr 1fr`, gap 48px, `align-items: stretch`):

**Left — info cards** (`justify-content: space-between`):

- Email card, Location card ("UK · Open to remote (incl. Bulgaria)"), Status card ("Open to work")
- Social row: LinkedIn + GitHub buttons (equal width, ghost style)

**Right — form card** (indigo top-line gradient):

- Name + Email in a 2-column row
- Subject (full width)
- Message textarea (min-height 120px, resizable)
- "Send Message ↗" full-width indigo button
- Input focus: `border-color: #6366f1`, `box-shadow: 0 0 0 3px #6366f115`

Form submission behaviour: wire to existing contact handler or EmailJS — outside scope of this spec.

---

## 10. Footer (`Footer.jsx`)

- `border-top: 1px solid #1e293b`, padding 48px 48px 32px
- Subtle radial glow: `radial-gradient(ellipse at bottom, #6366f10a 0%, transparent 70%)`

**Top row** (space-between):

- Brand: `Slav.` logo (Syne 800) + tagline ("Frontend Developer building fast, accessible web experiences.")
- Nav links: About, Projects, Skills, Education, Contact — 13px, `#475569` → `#f1f5f9` hover
- Social icon buttons: GitHub, LinkedIn, Email — 38px square, `#0f172a` bg, ghost border, emoji icons (replace with react-icons at implementation)

**Divider:** `border-top: 1px solid #1e293b`

**Bottom row** (space-between):

- Copyright: "© 2025 Slav Georgiev. All rights reserved."
- "Back to top ↑" button — text + small arrow box, `#475569` → `#a5b4fc` hover

---

## 11. Data Layer

No changes to `src/constants/index.js` structure — all existing data keys remain. Visual components read the same arrays; only rendering changes.

Confirm real values before implementation:

- Email address
- LinkedIn URL
- GitHub URL
- CV PDF path (currently expected at `public/resume/CV.pdf`)
- Education entries (degree, school, years, description)
- Certificate entries (name, issuer, year, PDF/link)
- Project entries (title, description, tags, live URL, GitHub URL)

---

## 12. Fonts

Add to `index.html` `<head>` (or import in CSS):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

Add to `@theme {}` in `src/index.css`:

```css
--font-syne: "Syne", sans-serif;
--font-dm-sans: "DM Sans", sans-serif;
```

---

## 13. Animations (GSAP)

Keep existing GSAP entrance timelines in `Hero.jsx`. Extend to other sections as desired post-approval — out of scope for initial overhaul. CSS handles: spinning avatar rings, pulsing dots, marquee, scroll indicator, hover transitions.

`@media (prefers-reduced-motion: reduce)` disables all animations (existing behaviour — keep).

---

## 14. Implementation Order

Implement one section at a time, wait for explicit approval before moving to the next:

1. Nav
2. Hero
3. About
4. Projects
5. Skills
6. Education
7. Contact
8. Footer
