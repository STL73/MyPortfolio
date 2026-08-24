# Spireforge — DESIGN.md

> **Version 1 · 20 August 2026.** This is the canonical design system for Spireforge, the trading
> name of Slav Lambov. It supersedes `brand-guidelines_2026-05-13_v6.docx`, which describes a
> different mark, palette and typeface and is retained only as history.
>
> **Copy this file to the root of any project that uses the brand, named `DESIGN.md`.** The versioned
> master lives here; the working copy lives with the code. Tokens: `07-CODE/tokens_2026-08-20_v1.json`
> and `.css`.

---

## How to use this document

Written to be built from, not admired. Every value is stated as a number, every contrast figure is
measured rather than estimated, and the **Never** sections are load-bearing — they exist because they
are the rules most likely to be broken by someone working quickly.

Where a rule has a reason, the reason is given. A rule whose reason is forgotten gets discarded the
first time it is inconvenient.

---

## 1 · The one rule

**Everything angular in this identity derives from a single slope: `26/28`, or 42.9°.**

The chevron runs at it. The tip runs at its mirror. The rhombus counter between them is produced by
those two facts and is not drawn separately. If a new brand element needs an angle, it uses this one.

The only element deliberately off this grid is the spark — which is exactly why the eye goes to it.

---

## 2 · Colour

### Dark is the native state

Spireforge is a **dark-first** brand. Night `#100A28` is the ground; the light face exists because
paper is white, not as an equal alternative.

This is enforced by opt-in, not by `prefers-color-scheme`. A visitor whose operating system is set to
light does **not** get a light Spireforge — they get the dark brand. The light face is applied
explicitly, with `.sf-light` or `[data-sf-face="light"]`, for documents and print.

### Tokens

| Token | Hex | On night-800 | Use |
|---|---|---|---|
| `night-900` | `#0A0619` | — | Page edges, modal overlays |
| `night-800` | `#100A28` | — | **Canonical ground** |
| `night-700` | `#1B1240` | — | Raised surface — cards, panels, code |
| `night-600` | `#261A54` | — | Borders, dividers, hover fills |
| `text-hi` | `#EDE9FF` | **16.15** | Headings, body |
| `text-mid` | `#A79ACB` | **7.42** | Secondary copy, captions |
| `text-low` | `#6E6393` | **3.53** | Non-text only |
| `aurora-400` | `#7CFFC4` | **15.47** | Hover, raised |
| `aurora-500` | `#5BFFB0` | **14.94** | **The accent** |
| `aurora-600` | `#3DF5A0` | **13.47** | Pressed, active |
| `aurora-800` | `#0E7A4E` | — | **Light face and print only** — 5.14 on paper |
| `paper-50` | `#FBFAF7` | — | Document ground |
| `paper-100` | `#F1EFEA` | — | Raised surface on paper |

Light face: `night-800` on `paper-50` measures **18.36**, `text-low` **5.20**, `aurora-800` **5.14**.
Every pairing in this system clears WCAG 2.2 AA.

### Why aurora

A real aurora emits at roughly 557 nanometres, close to `aurora-500`. Green light in a violet-blue
night sky is a thing that exists, which is why the pairing reads as observed rather than assembled.
It is also a serviceable picture of a forge: cold dark, one hot thing in it.

### The gamut problem, stated plainly

**`aurora-500` cannot be printed.** It sits well outside CMYK. Anything reaching paper uses
`aurora-800`, which is a *different colour, not a dimmer one*. The printed brand runs calmer than the
screen brand. This is a known, accepted cost of choosing a neon accent — not a defect to be fixed at
the printer.

### Never

- **Never use `aurora-500` on a light background.** It measures 1.5:1 on paper. It is invisible.
- **Never use `aurora-800` on the dark face.** It is a print substitute, not a dark-mode colour.
- **Never put aurora next to `text-hi` and expect them to separate.** They score **1.08** against each
  other. Both are bright; contrast is measured between what touches, not against the ground.
- **Never use aurora as a background for body text.** It is an accent — the spark, a button fill, a
  focus ring, a single figure. Fill an area with it and the whole system tips over.
- **Never introduce a second accent hue.** One accent, on the smallest element. That is the system.
- **Never use gradients in the mark.** The previous identity did and it is a large part of why it
  read as generic. Gradients may appear in page backgrounds; the mark stays flat.
- **Never reintroduce the old indigo→cyan palette.** It is retired.

---

## 3 · The mark

### Geometry

All values in a `100 × 100` viewBox.

| Element | Geometry | Stroke | Ink |
|---|---|---|---|
| Chevron | `M22 74 L50 48 L78 74` | 11, round cap + join | `text-hi` |
| Tip | `M34.03 56 L50 70.8 L65.97 56` | 9, round cap + join | `aurora-500` |
| Spark | 3-point concave, R 13, pinch 0, centre (50,31) | filled | `aurora-500` |
| Counter | rhombus, 9.2 tall | **not drawn** | — |

Spark path:
`M50 18 Q50 31 61.26 37.5 Q50 31 38.74 37.5 Q50 31 50 18 Z`

Bounding box `67 × 61.5` — x 16.5 to 83.5, y 18 to 79.5 — centred `(50, 48.75)`. Clear space
**20 units** on all four sides. Nothing enters it: no text, no rule, no photograph edge.

### The spark's waist, which is the value that actually matters

**A quadratic curve's closest approach to the centre is `0.25·P₀ + 0.5·C + 0.25·P₂`, not the control
point.** At radius 13 with all three controls on the centre, the waist sits at **3.25** — a ratio of
0.25 against the outer radius, which is what makes the three points register as points.

This is documented because getting it wrong is easy and the failure is silent. An earlier draft used
radius 9.8 with the controls pulled to 2.6, which *looks* like a deep pinch and produces a waist ratio
of 0.38. It rendered as a plain triangle, repeating what the chevron already said, and the error
survived several rounds of review in monochrome before showing up in a colour raster.

**If the spark is ever redrawn, check the waist ratio. The pinch number tells you nothing on its own.**

### Draw order is part of the specification

**Chevron first, tip second, spark last.**

The tip crosses the chevron. Painted underneath, its ends are hidden inside the chevron's stroke and
score 1.08 against it — invisible. Painted on top and extended, its ends exit onto the ground where
they score **14.94**. Draw order here is not a rendering detail; it is the difference between the
two-colour mark working and not working.

### The extension

The tip runs **5 units** past the crossing. The chevron covers 5.5 units either side of its
centreline and the tip's round cap reaches a further 4.5, so visible aurora on the ground is
`5 + 4.5 − 5.5 = 4 units`. That is 2.6px at 64px and 1.3px at 32px.

Below 3 units of extension nothing meaningful shows. Above 6 the emerging pieces start reading as a
second shape behind the chevron, which is a different and worse mark.

### Variants

| Variant | File | When |
|---|---|---|
| Two-colour, dark | `icon-dark_2026-08-20_v1.svg` | Default, on night grounds |
| Two-colour, light | `icon-light_2026-08-20_v1.svg` | Paper, print, documents |
| **Single ink** | `icon-mono_2026-08-20_v1.svg` | **The definitive form** |
| Compact, dark | `icon-compact-dark_2026-08-20_v1.svg` | Below 24px on dark |
| Compact, light | `icon-compact-light_2026-08-20_v1.svg` | Below 24px on light |
| Favicon | `favicon_2026-08-20_v1.svg` | Browser tabs and the `.ico`, **only**. Carries the FULL mark since 2026-08-21 |
| **Icon tile, dark** | `icon-tile-dark_2026-08-20_v1.svg` | **App icons and social avatars** |

**The single-ink version is canonical, not the two-colour one.** Embroidery, rubber stamps, etching,
laser cutting and single-colour print all reproduce it, and in those media the tip's extension simply
disappears. The two-colour mark is the *enriched* form. If the two ever disagree, the single ink wins.

### The compact variant is mandatory, not optional

Below **24px** the full mark fails in three places at once: the counter closes, the spark's three arms
drop under a pixel each, and the tip's four emerging units fall below 1px. The compact variant —
chevron plus a solid dot — is the same idea reduced, and it is required, not preferred.

**24px is a floor, not a default.** At and above it the full mark reads correctly and must be used.

> [!warning] The favicon is no longer one of the compact mark's jobs
> Changed 2026-08-21. This section previously named the favicon and the `.ico` as the compact
> mark's territory. They are not, and the reasoning above was applied too bluntly: it optimised
> the 16px case at the cost of 20, 24 and 32, and **at 16px the compact mark reads as a different
> logo** — chevron plus a dot, with the spark and the rhombus counter both absent. A blurry version
> of the real mark beats a crisp version of a shape the brand does not otherwise use.
>
> The favicon now carries the **full mark at 84% of its tile**. The earlier comparison that
> rejected it was unfair without meaning to be: it measured the compact mark at 84% of its tile
> against `icon-tile-dark`, whose mark sits at 64% because it is built to survive a circular avatar
> crop. Given equal room the full mark holds up — clearly legible at 24 and 32, muddy but
> recognisably itself at 16.
>
> Re-check it with `07-CODE\build\compare_favicon.py`; the sheet is
> `favicon-size-test_*.png` in this folder. → measured, 2026-08-21

The compact form's remaining jobs are **UI chrome genuinely rendering under 24px in a single ink**,
where there is no tile and no second colour to help — a list row, a dense toolbar, a monochrome
system tray. It stays in the kit for those.

### Two tiles, and which one feeds what

Both tiles are Night `#100A28` at corner radius 22, and they differ only in which mark they carry.

| Tile | Mark | Rasterises to |
|---|---|---|
| `favicon_2026-08-20_v1.svg` | Full, 84% of tile | `favicon.ico` (16/24/32/48) |
| `icon-tile-dark_2026-08-20_v1.svg` | Full | `app-icon_*` (96–1024), `social-avatar_*` (200–800), `youtube-watermark_150x150` |

Neither tile redraws its mark. Each wraps the relevant variant's paths verbatim; `icon-tile-dark`
adds a placement transform only — `scale(0.955)` to bring the mark's 67-unit width to 64% of the
tile, plus a translate to centre the result. To change a mark, change `icon-dark` or
`icon-compact-dark` and copy the paths across.

The 64% figure is what makes the tile survive a circular crop. The transformed mark's furthest
corner sits 43.4 units from centre against the inscribed circle's 50, so Instagram, X, TikTok and
GitHub can all mask it to a circle without touching the mark.

> **Known limit, accepted.** Every platform takes one avatar upload and scales it everywhere, so an
> Instagram comment row renders this at 24px where the spark is nearly gone. Supplying the compact
> mark instead would fix the 24px case and break the 150px profile page, which is the impression
> that matters. The full mark wins.

### The YouTube watermark uses the tile, and that is a contrast decision

The channel watermark overlays every video, bottom-right, on footage nobody controls. Measured
against dark, light, green and busy mid-tone frames:

| Treatment | Dark | Light | Green | Busy | **Worst** |
|---|---|---|---|---|---|
| Bare two-colour mark | 14.14:1 | 1.13:1 | 3.28:1 | 3.25:1 | **1.13:1** |
| Single ink, transparent | 15.16:1 | 1.05:1 | 3.52:1 | 3.48:1 | **1.05:1** |
| Mark on 70% tile | 14.74:1 | 5.40:1 | 10.14:1 | 9.91:1 | **5.40:1** |
| **Mark on solid tile** | 15.04:1 | 13.60:1 | 14.48:1 | 14.42:1 | **13.60:1** |

Both transparent treatments fail the 3:1 floor for a graphical object on light footage — the
chevron is Paper, so against near-white only the aurora survives and the mark reads as a floating
tick. The tile brings its own ground, which is the entire point. It is also the same object as the
channel icon, so watermark and avatar reinforce each other rather than competing.

The 70% tile is the fallback if the solid badge ever reads too heavy: add `fill-opacity="0.70"` to
the rect. Do not reach for a drop shadow or an outline instead — both are forbidden below, and
neither solves light footage anyway.

### Never

- **Never redraw the mark by eye.** Every value is in this document and in `tokens.json`.
- **Never use the full mark below 24px in a single ink and with no tile.** Use the compact
  variant. The favicon is the documented exception: it has a Night tile and two inks, which
  is enough support for the full mark to survive.
- **Never use the compact variant above 24px.** It is a legibility floor, not a simplified
  logo. Rasterising app icons or social avatars from `favicon.svg` — which happened, and put
  the 16px mark on a 1024px app icon and an 800px Instagram avatar — is the specific mistake
  this rule exists to stop. Use `icon-tile-dark`.
- **Never place anything inside the clear space.**
- **Never rotate, skew, outline, add a shadow to, or apply a gradient to the mark.**
- **Never recolour the chevron to make the tip more visible.** This was tested against seven greys.
  Reaching 3:1 against aurora requires steel `#6B7791`, which drops the chevron to 4.26 on the ground
  — solving a detail by weakening the logo. The extension is the fix.
- **Never draw the counter as a shape.** It is produced by the chevron and tip meeting. Drawing it
  separately means it will drift.

---

## 4 · Typography

| Role | Face | Weight | Tracking |
|---|---|---|---|
| Display | **Fraunces** | 600 | `0.01em` |
| Body & UI | **Inter Tight** | 400–600 | normal |
| Code & data | **IBM Plex Mono** | 400–500 | `0.05em` |

All three are OFL-licensed, variable, self-hostable and print-embeddable. No paid licences.

### The wordmark sets in sentence case

**Spireforge**, not SPIREFORGE. Fraunces is an old-style serif and nearly all its character lives in
the lowercase — the tail of the *g*, the angled stress through the *e* and *o*. Capitals discard the
reason the face was chosen and leave the plainest part of it. Sentence case also sets more compactly,
which matters in a header and on a business card.

Tracking is `0.01em` — near zero. Fraunces is drawn to set tight. Earlier drafts used `0.035em`,
which was too loose.

### Scale

Fluid, `clamp()`-based, in `tokens.css`. Running text sits at `--sf-measure: 64ch`.

### Never

- **Never set the wordmark in capitals.**
- **Never use Manrope.** It belonged to the previous identity.
- **Never use IBM Plex Mono for running prose.** It is for code, figures, reference numbers and
  technical labels.
- **Never letterspace lowercase display type.** Only small uppercase labels get `0.10em`.
- **Never load fonts from a third-party CDN in production.** Self-host. The old placeholder site
  pulled from jsDelivr, which is a render-blocking request to a host you do not control.

---

## 5 · Surface texture

Two layers. They do different jobs and they do **not** travel together.

| Layer | What it is | Dark face | Light face |
|---|---|---|---|
| **Ember scatter** | The spark alone, repeated at five sizes on a 240px tile, irregularly placed | `aurora-500` at **7%** | `aurora-800` at **14%**, or **18%** on card backs and covers |
| **Aurora wash** | Two radial gradients — green top-left, violet bottom-right | 15% / 14% | **Screen only. Never printed.** |

### Why the two ember values differ

7% on dark and 14% on light are **the same apparent weight**. A tint reads roughly twice
as strongly against near-white as a highlight does against near-black. Matching the
numbers would make the two faces look wrong.

### Why the wash never prints

A screen renders a gradient in millions of continuous values. A press approximates it in
halftone dots at a fixed screen ruling, so a broad pale gradient bands visibly — and on
uncoated stock it also goes patchy as ink spreads. It is the least reliable thing in
printing rendering the least visible thing on the page. The embers are flat tints of a
single ink, which is the most reliable thing a press does, so they print anywhere.

Keep printed ember tints at **8% or above**. Below about 5% tints start dropping out
unpredictably.

### Never

- **Never tile the mark.** The previous identity did this and it is the single most
  common way a brand cheapens its own logo — wallpapered across a page the mark becomes
  furniture, and the eye stops registering it in the header where it matters. There is a
  second reason specific to this mark: its counter closes at small sizes, so a tiled mark
  is a page full of filled-in counters.
- **Never put the wash on anything heading to a printer.**
- **Never run texture behind body copy above the values in the table.**
- **Never let texture enter the mark's clear space.**
- **Never add a third layer.** Two is the system.

---

## 6 · Layout, space and motion

Spacing on a **4px base**: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`.
Radius: `2px` default, `3px` cards, `6px` large surfaces, `22%` for icon tiles only.

Use **container queries** over breakpoints where a component can appear at more than one width.
Lay out sibling groups with flex or grid and `gap`, never per-element margins.

Motion is brief and functional: `120–200ms` for state changes, `240–320ms` for entrances, standard
ease-out. Honour `prefers-reduced-motion` everywhere — it is in `tokens.css` already.

### Never

- **Never animate the mark's geometry.** A logo animation may reveal or assemble it, but the chevron,
  tip and spark do not morph, bounce or wobble.
- **Never use motion to carry meaning that is not also in the layout.**
- **Never let a page scroll horizontally.** Wide content — tables, code, diagrams — scrolls inside its
  own `overflow-x: auto` container.

---

## 7 · Accessibility floor

- Every text pairing in this system meets **WCAG 2.2 AA**. The figures in §2 are measured.
- Interactive targets: **24 × 24px minimum** (WCAG 2.2 target size).
- Focus is always visible. Use `aurora-500` for the focus ring on dark, `aurora-800` on light.
- `text-low` is **non-text only**. It measures 3.53 on night-800, which is below the 4.5 body-copy
  floor. It is legal for rules and disabled states and nothing else.

---

## 8 · Decisions worth remembering

Recorded because a rule without its reason gets discarded the first time it is inconvenient.

**The counter is the point.** The rhombus between the chevron and the tip is the mark's most
distinctive feature, and it emerged by accident — from trimming an earlier overlapping shape at its
intersections. Almost every subsequent decision protects it. That is why the chevron and tip once
shared an ink, and why the counter is never drawn as its own shape.

**The mark was tested at 16px before it was developed.** Two directions were killed there and only
there: a four-element version that turned to mush, and a stacked version that resolved into a human
figure — head, shoulders, legs — invisible at display size. Test small first, always.

**Three points, not four.** The four-point concave sparkle has been the universal "AI" glyph since
2024. Three points escapes it entirely, has an axis rather than a grid, and rhymes with the chevron
beneath.

**Monochrome review missed a shape error.** Ten rounds of mark development were reviewed in greyscale
at display size, which was the right call — it stops colour dominating the read of form. But the
spark's shallow waist survived every one of those rounds and only became obvious once the mark was
rasterised in colour at 200px. **Review in the medium the thing will actually be used in, at least
once, before signing it off.**

**Light-first was chosen and then reversed.** The original scope called for a light-first brand on the
reasoning that small-business clients respond to it. That was overruled by preference, which is the
right outcome — taste beats an abstract argument about audience. Print keeps a light face because
paper is white, not as a compromise.

---

## 9 · Still outstanding

- **Raster exports** — PNG set and multi-resolution `.ico`. Requires Fraunces installed at render time
  for the lockup rasterisation.
- **Applied collateral** — business card, letterhead, invoice, email signature, OG card, social
  banners and slide template all still show the previous identity and need re-issuing.
- **`spireforge.co.uk`** — still serving the old placeholder. Blocked on the portfolio.
- **Logo animation** — deferred. 3–5 seconds when built. The mark may be revealed or assembled; its
  geometry must not deform.
- **Metallic special** — a Pantone or foil for business cards was discussed and not decided. It would
  sit on top of this palette, never replace a token in it.
