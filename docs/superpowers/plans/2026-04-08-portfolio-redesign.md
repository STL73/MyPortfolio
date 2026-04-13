# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current purple/violet aesthetic with a Modern Dark + Depth design (deep navy `#080d1a`, indigo `#6366f1` accent, Syne + DM Sans typography) across all 8 sections.

**Architecture:** Each section is rebuilt in-place — same file structure, same data layer (`src/constants/index.js`), same routing. Only the visual layer (CSS tokens, JSX markup, component styles) changes. No new files unless strictly necessary.

**Tech Stack:** React 19, Vite, Tailwind CSS v4 (via `@import "tailwindcss"` in `index.css`), GSAP, Formspree (Contact).

> **No test suite is configured for this project. Skip all TDD steps. Verify each task by running `npm run dev` and inspecting the browser.**

> **Conventions:** Implement one section at a time. After each section commit, wait for explicit user approval before moving to the next task.

---

## File Map

| File                                 | Action | Purpose                                           |
| ------------------------------------ | ------ | ------------------------------------------------- |
| `index.html`                         | Modify | Add Syne font import                              |
| `src/index.css`                      | Modify | Replace design tokens, update/add utility classes |
| `src/App.jsx`                        | Modify | Fix section order (Education moves after Skills)  |
| `src/components/Nav.jsx`             | Modify | New frosted-glass nav with "Hire Me" CTA          |
| `src/sections/Hero.jsx`              | Modify | Centred layout with spinning avatar rings         |
| `src/sections/About.jsx`             | Modify | Two-column photo + content layout                 |
| `src/components/ProjectCard.jsx`     | Modify | Support `featured` prop for full-width layout     |
| `src/sections/Projects.jsx`          | Modify | Featured card + 3-column grid                     |
| `src/components/SkillCard.jsx`       | Modify | New category card with skill chips                |
| `src/sections/Skills.jsx`            | Modify | 2×2 grid + CSS marquee strip                      |
| `src/components/EduCard.jsx`         | Modify | Timeline card style                               |
| `src/components/CertificateCard.jsx` | Modify | Compact cert card with hover lift                 |
| `src/sections/Education.jsx`         | Modify | Vertical timeline + certs grid                    |
| `src/sections/Contact.jsx`           | Modify | Two-column info + form, keep Formspree logic      |
| `src/sections/Footer.jsx`            | Modify | Brand + flat nav + social + copyright             |

---

## Task 1: Design Tokens & Fonts

**Files:**

- Modify: `index.html`
- Modify: `src/index.css`

- [ ] **Step 1: Add Syne font to `index.html`**

In `index.html`, replace the existing `<link rel="preconnect" href="https://fonts.googleapis.com" />` block (lines 70–71) with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 2: Replace design tokens in `src/index.css`**

Replace the entire `@import url(...)` line at the top and the `@theme {}` block with:

```css
@import "tailwindcss";

@theme {
  /* New palette */
  --color-navy: #080d1a;
  --color-surface: #0f172a;
  --color-border: #1e293b;
  --color-indigo: #6366f1;
  --color-indigo-dim: #6366f133;
  --color-text: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-indigo-soft: #a5b4fc;

  /* Keep legacy aliases so existing Tailwind classes don't break */
  --color-bg-dark: #080d1a;
  --color-bg-light: #6366f1;
  --color-primary: #a5b4fc;

  /* Fonts */
  --font-syne: "Syne", sans-serif;
  --font-dm-sans: "DM Sans", sans-serif;
  --font-heading: "Syne", sans-serif;
  --font-body: "DM Sans", sans-serif;

  /* Screens (unchanged) */
  --screen-wide: 1440px;
}
```

- [ ] **Step 3: Replace `@layer base` body styles**

Replace the `body` and `body::before` rules inside `@layer base` with:

```css
@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-dm-sans);
    background: #080d1a;
    color: #f1f5f9;
  }

  :focus-visible {
    outline: 2px solid #6366f1;
    outline-offset: 3px;
    border-radius: 4px;
  }

  section {
    scroll-margin-top: 5rem;
  }
}
```

- [ ] **Step 4: Add new shared component classes to `@layer components`**

Add inside the existing `@layer components {}` block (after `.max-container`):

```css
/* Section typography helpers */
.section-label {
  font-size: 12px;
  color: #6366f1;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 12px;
}

.section-title {
  font-family: var(--font-syne);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -1.5px;
  color: #f1f5f9;
  margin-bottom: 48px;
  line-height: 1.1;
}

.section-title span {
  color: #6366f1;
}

/* Shared card base */
.ds-card {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.ds-card:hover {
  border-color: #6366f133;
  box-shadow: 0 0 32px #6366f10d;
}

/* Indigo top-line accent used on most cards */
.ds-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #6366f1, transparent);
}

/* Ghost button */
.ds-btn-ghost {
  background: transparent;
  color: #94a3b8;
  font-size: 14px;
  font-weight: 500;
  padding: 11px 24px;
  border-radius: 8px;
  border: 1px solid #1e293b;
  text-decoration: none;
  font-family: var(--font-dm-sans);
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.ds-btn-ghost:hover {
  border-color: #6366f1;
  color: #f1f5f9;
}

/* Solid indigo button */
.ds-btn-primary {
  background: #6366f1;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 11px 24px;
  border-radius: 8px;
  border: none;
  text-decoration: none;
  font-family: var(--font-dm-sans);
  cursor: pointer;
  transition:
    background 0.2s,
    box-shadow 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.ds-btn-primary:hover {
  background: #4f46e5;
  box-shadow: 0 0 20px #6366f133;
}
```

- [ ] **Step 5: Update `@media (prefers-reduced-motion: reduce)` block**

Replace the existing reduced-motion block at the bottom of `index.css` with:

```css
@media (prefers-reduced-motion: reduce) {
  .circle-spin,
  .avatar-ring-outer,
  .avatar-ring-inner,
  .marquee-inner,
  .live-dot,
  .available-dot,
  .scroll-indicator__wheel {
    animation: none !important;
  }

  .ds-card,
  .ds-btn-ghost,
  .ds-btn-primary {
    transition: none;
  }
}
```

- [ ] **Step 6: Run dev server and check no console errors**

```bash
npm run dev
```

Expected: app loads, no compile errors. Colours may look broken — that's expected until sections are rebuilt.

- [ ] **Step 7: Commit**

```bash
git add index.html src/index.css
git commit -m "chore: update design tokens to Modern Dark + Depth palette, add Syne font"
```

---

## Task 2: App.jsx — Section Order

**Files:**

- Modify: `src/App.jsx`

- [ ] **Step 1: Fix section order and all themes to dark**

Replace the entire `App.jsx` content with:

```jsx
import { lazy, Suspense } from "react"
import Hero from "./sections/Hero"
import Nav from "./components/Nav"
import { SectionThemeProvider } from "./context/SectionThemeContext"

const About = lazy(() => import("./sections/About"))
const Projects = lazy(() => import("./sections/Projects"))
const Skills = lazy(() => import("./sections/Skills"))
const Education = lazy(() => import("./sections/Education"))
const Contact = lazy(() => import("./sections/Contact"))
const Footer = lazy(() => import("./sections/Footer"))

function App() {
  return (
    <main className="relative">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-navy focus:text-indigo focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>
      <Nav />
      <SectionThemeProvider theme="dark">
        <Hero />
      </SectionThemeProvider>
      <Suspense fallback={<div className="min-h-screen" />}>
        <SectionThemeProvider theme="dark">
          <About />
        </SectionThemeProvider>
        <SectionThemeProvider theme="dark">
          <Projects />
        </SectionThemeProvider>
        <SectionThemeProvider theme="dark">
          <Skills />
        </SectionThemeProvider>
        <SectionThemeProvider theme="dark">
          <Education />
        </SectionThemeProvider>
        <SectionThemeProvider theme="dark">
          <Contact />
        </SectionThemeProvider>
        <SectionThemeProvider theme="dark">
          <Footer />
        </SectionThemeProvider>
      </Suspense>
    </main>
  )
}

export default App
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: sections appear in order Home → About → Projects → Skills → Education → Contact → Footer.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "chore: reorder sections and set all themes to dark"
```

---

## Task 3: Nav

**Files:**

- Modify: `src/components/Nav.jsx`

**Data used:** `navLinks` from `src/constants/index.js` (unchanged — keep `href` and `label` fields).

- [ ] **Step 1: Rewrite `Nav.jsx`**

Replace the entire file content with:

```jsx
import { useEffect, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { navLinks } from "../constants/index"

const Nav = () => {
  const [activeLink, setActiveLink] = useState(() => window.location.hash || "#home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Track hash changes
  useEffect(() => {
    const handleHashChange = () => setActiveLink(window.location.hash || "#home")
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isMenuOpen) return
    const handleClick = (e) => {
      if (!e.target.closest("header")) setIsMenuOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [isMenuOpen])

  // IntersectionObserver — active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`
            setActiveLink(id)
            if (window.location.hash !== id) window.history.replaceState(null, "", id)
          }
        })
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => sections.forEach((s) => observer.unobserve(s))
  }, [])

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 48px",
        height: "64px",
        background: "rgba(8,13,26,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #1e293b",
      }}
    >
      {/* Logo */}
      <a
        href="#home"
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 800,
          fontSize: "18px",
          color: "#f1f5f9",
          letterSpacing: "-0.5px",
          textDecoration: "none",
        }}
      >
        Slav<span style={{ color: "#6366f1" }}>.</span>
      </a>

      {/* Desktop links */}
      <ul
        className="max-lg:hidden"
        style={{ display: "flex", gap: "32px", listStyle: "none", margin: 0, padding: 0 }}
      >
        {navLinks.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              onClick={() => setActiveLink(item.href)}
              style={{
                fontSize: "16px",
                color: activeLink === item.href ? "#6366f1" : "#94a3b8",
                textDecoration: "none",
                transition: "color 0.2s",
                fontFamily: "var(--font-dm-sans)",
              }}
              onMouseEnter={(e) => {
                if (activeLink !== item.href) e.currentTarget.style.color = "#f1f5f9"
              }}
              onMouseLeave={(e) => {
                if (activeLink !== item.href) e.currentTarget.style.color = "#94a3b8"
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <a
        href="#contact"
        className="max-lg:hidden"
        style={{
          background: "#6366f1",
          color: "#fff",
          fontSize: "15px",
          fontWeight: 500,
          padding: "8px 20px",
          borderRadius: "6px",
          textDecoration: "none",
          fontFamily: "var(--font-dm-sans)",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#4f46e5")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#6366f1")}
      >
        Hire Me
      </a>

      {/* Mobile toggle */}
      <button
        className="lg:hidden"
        onClick={() => setIsMenuOpen((o) => !o)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        style={{
          background: "none",
          border: "none",
          color: "#94a3b8",
          cursor: "pointer",
          padding: "8px",
        }}
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            background: "#0f172a",
            borderBottom: "1px solid #1e293b",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => {
                setActiveLink(item.href)
                setIsMenuOpen(false)
              }}
              style={{
                display: "block",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "16px",
                color: activeLink === item.href ? "#6366f1" : "#94a3b8",
                textDecoration: "none",
                fontFamily: "var(--font-dm-sans)",
                background: activeLink === item.href ? "#6366f108" : "transparent",
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: "block",
              marginTop: "8px",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 500,
              color: "#fff",
              background: "#6366f1",
              textDecoration: "none",
              textAlign: "center",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  )
}

export default Nav
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: frosted-glass nav bar at top, "Slav." logo with indigo dot, nav links in slate grey, "Hire Me" indigo button. Active link turns indigo on scroll.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.jsx
git commit -m "feat: redesign Nav with frosted-glass dark style and Hire Me CTA"
```

**→ Wait for user approval before proceeding.**

---

## Task 4: Hero

**Files:**

- Modify: `src/sections/Hero.jsx`

**Data used:** None from constants — all content is hardcoded in Hero.

- [ ] **Step 1: Add keyframe animations to `src/index.css`**

Inside the `@layer utilities {}` block in `index.css`, add:

```css
/* Avatar ring spin */
.avatar-ring-outer {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  border: 1px solid #6366f122;
  animation: ring-spin 8s linear infinite;
}
.avatar-ring-inner {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid #6366f144;
  animation: ring-spin 5s linear infinite reverse;
}
@keyframes ring-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Pulsing dot */
@keyframes badge-pulse {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 6px #6366f1;
  }
  50% {
    opacity: 0.5;
    box-shadow: 0 0 12px #6366f1;
  }
}
.available-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6366f1;
  box-shadow: 0 0 6px #6366f1;
  animation: badge-pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

/* Scroll wheel indicator */
@keyframes scroll-wheel-new {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(10px);
    opacity: 0;
  }
}
```

- [ ] **Step 2: Rewrite `src/sections/Hero.jsx`**

Replace entire file with:

```jsx
import { useEffect, useRef } from "react"
import gsap from "gsap"

const Hero = () => {
  const tlRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    tlRef.current = gsap.timeline({ defaults: { ease: "power3.out" } })
    tlRef.current
      .fromTo(".hero-badge", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(
        ".hero-avatar",
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.7 },
        0.2
      )
      .fromTo(".hero-name", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
      .fromTo(".hero-role", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
      .fromTo(".hero-tagline", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.65)
      .fromTo(".hero-ctas", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.75)
      .fromTo(".hero-badges", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, 0.85)

    return () => tlRef.current?.kill()
  }, [])

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "100px 24px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #6366f120 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Available badge */}
      <div
        className="hero-badge"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "#6366f115",
          border: "1px solid #6366f133",
          color: "#a5b4fc",
          fontSize: "12px",
          fontWeight: 500,
          padding: "6px 14px",
          borderRadius: "999px",
          marginBottom: "32px",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        <span className="available-dot" />
        Available for work
      </div>

      {/* Avatar */}
      <div
        className="hero-avatar"
        style={{ position: "relative", width: "140px", height: "140px", marginBottom: "28px" }}
      >
        <div className="avatar-ring-outer" aria-hidden="true" />
        <div className="avatar-ring-inner" aria-hidden="true" />
        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1e1b4b, #312e81)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-syne)",
            fontSize: "42px",
            fontWeight: 800,
            color: "#a5b4fc",
            boxShadow: "0 0 40px #6366f133, 0 0 80px #6366f115",
            position: "relative",
            zIndex: 1,
          }}
          aria-label="Avatar initials SG"
        >
          SG
        </div>
      </div>

      {/* Name */}
      <h1
        className="hero-name"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 800,
          letterSpacing: "-2px",
          lineHeight: 1,
          marginBottom: "8px",
          color: "#f1f5f9",
        }}
      >
        Slav Georgiev
      </h1>

      {/* Role */}
      <p
        className="hero-role"
        style={{
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          color: "#6366f1",
          fontWeight: 600,
          marginBottom: "16px",
          letterSpacing: "0.5px",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        Frontend Developer
      </p>

      {/* Tagline */}
      <p
        className="hero-tagline"
        style={{
          fontSize: "15px",
          color: "#64748b",
          maxWidth: "420px",
          lineHeight: "1.6",
          marginBottom: "32px",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        Building fast, accessible web experiences with React, TypeScript, and a sharp eye for
        design.
      </p>

      {/* CTA buttons */}
      <div
        className="hero-ctas"
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "36px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <a
          href="#contact"
          className="ds-btn-primary"
          style={{ fontSize: "14px", padding: "12px 28px", borderRadius: "8px" }}
        >
          Hire Me
        </a>
        <a
          href="#projects"
          className="ds-btn-ghost"
          style={{ fontSize: "14px", padding: "12px 28px", borderRadius: "8px" }}
        >
          View Projects ↓
        </a>
      </div>

      {/* Tech badges */}
      <div
        className="hero-badges"
        style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}
      >
        {["React", "TypeScript", "Tailwind CSS", "GSAP", "Vite"].map((tech) => (
          <span
            key={tech}
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              color: "#94a3b8",
              fontSize: "12px",
              fontWeight: 500,
              padding: "5px 12px",
              borderRadius: "4px",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          color: "#334155",
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        <div
          style={{
            width: "22px",
            height: "34px",
            border: "1px solid #334155",
            borderRadius: "999px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "6px",
              background: "#6366f1",
              borderRadius: "999px",
              animation: "scroll-wheel-new 1.5s ease-in-out infinite",
            }}
          />
        </div>
        <span>scroll</span>
      </div>
    </section>
  )
}

export default Hero
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Expected: dark full-screen hero, spinning avatar rings (indigo), pulsing "Available for work" badge, Syne heading, two CTA buttons, tech badge row, scroll indicator at bottom.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Hero.jsx src/index.css
git commit -m "feat: redesign Hero with centred layout, spinning avatar rings, indigo badge"
```

**→ Wait for user approval before proceeding.**

---

## Task 5: About

**Files:**

- Modify: `src/sections/About.jsx`

**Data used:** `PERSONAL` from `src/constants/index.js` — uses `PERSONAL.cvUrl` and `PERSONAL.cvDownloadUrl` if present; falls back to `#` if not defined.

- [ ] **Step 1: Rewrite `src/sections/About.jsx`**

Replace entire file with:

```jsx
import { PERSONAL } from "../constants"

const About = () => {
  const cvUrl = PERSONAL?.cvUrl || "#"
  const cvDownloadUrl = PERSONAL?.cvDownloadUrl || "#"

  return (
    <section id="about" style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div className="section-label">Who I am</div>
      <h2 className="section-title">
        About <span>Me</span>
      </h2>

      {/* Two-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "start",
        }}
        className="max-md:block"
      >
        {/* Left — photo card */}
        <div style={{ position: "relative", maxWidth: "320px", margin: "0 auto" }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "4/5",
              background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
              borderRadius: "16px",
              border: "1px solid #1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-syne)",
              fontSize: "64px",
              fontWeight: 800,
              color: "#6366f144",
              position: "relative",
              overflow: "hidden",
            }}
            aria-label="Photo placeholder"
          >
            SG
            {/* Bottom gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, #080d1a88, transparent)",
              }}
            />
            {/* Name badge */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(8,13,26,0.9)",
                border: "1px solid #1e293b",
                borderRadius: "8px",
                padding: "10px 20px",
                textAlign: "center",
                whiteSpace: "nowrap",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "15px",
                  fontWeight: 800,
                  color: "#f1f5f9",
                }}
              >
                Slav Georgiev
              </div>
              <div style={{ fontSize: "11px", color: "#6366f1", marginTop: "2px" }}>
                Frontend Developer
              </div>
            </div>
          </div>
          {/* Decorative accent */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-16px",
              right: "-16px",
              width: "80px",
              height: "80px",
              background: "#6366f1",
              borderRadius: "16px",
              opacity: 0.15,
              zIndex: -1,
            }}
          />
        </div>

        {/* Right — content */}
        <div>
          <p
            style={{
              fontSize: "15px",
              color: "#94a3b8",
              lineHeight: 1.8,
              marginBottom: "20px",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            I&apos;m a{" "}
            <strong style={{ color: "#f1f5f9", fontWeight: 600 }}>Frontend Developer</strong>{" "}
            passionate about building polished, high-performance web experiences. I specialise in{" "}
            <strong style={{ color: "#f1f5f9", fontWeight: 600 }}>React</strong> and{" "}
            <strong style={{ color: "#f1f5f9", fontWeight: 600 }}>TypeScript</strong>, with a strong
            eye for design and detail.
          </p>
          <p
            style={{
              fontSize: "15px",
              color: "#94a3b8",
              lineHeight: 1.8,
              marginBottom: "28px",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            I enjoy the intersection of engineering and aesthetics — writing clean code that also
            looks and feels great. When I&apos;m not building UIs, I&apos;m exploring new tools,
            design systems, and open-source projects.
          </p>

          {/* Info chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
            {[
              { icon: "📍", text: "UK · Remote friendly" },
              { icon: "🎓", text: "Computer Science" },
              { icon: "✅", text: "Open to work" },
              { icon: "🌐", text: "Remote friendly" },
            ].map(({ icon, text }) => (
              <span
                key={text}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  color: "#94a3b8",
                  fontSize: "13px",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                <span>{icon}</span> {text}
              </span>
            ))}
          </div>

          {/* CV buttons */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
            <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="ds-btn-primary">
              View CV
            </a>
            <a href={cvDownloadUrl} download className="ds-btn-ghost">
              Download CV ↓
            </a>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              paddingTop: "32px",
              borderTop: "1px solid #1e293b",
            }}
          >
            {[
              { number: "3+", label: "Years experience" },
              { number: "10+", label: "Technologies" },
              { number: "20+", label: "Projects built" },
            ].map(({ number, label }) => (
              <div
                key={label}
                className="ds-card"
                style={{ textAlign: "center", padding: "20px 12px" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#6366f1",
                    letterSpacing: "-1px",
                  }}
                >
                  {number}
                </div>
                <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: two-column layout, photo placeholder card with name badge overlay, bio text with bold highlights, 4 info chips, CV buttons, 3 stat cards with indigo top-line gradient.

- [ ] **Step 3: Commit**

```bash
git add src/sections/About.jsx
git commit -m "feat: redesign About with two-column layout, photo card, stat cards"
```

**→ Wait for user approval before proceeding.**

---

## Task 6: Projects

**Files:**

- Modify: `src/components/ProjectCard.jsx`
- Modify: `src/sections/Projects.jsx`

**Data used:** `projectsData` from `src/constants/index.js`. Expected shape per item:

```js
{
  ;(id, title, description, technologies, image, status, liveUrl, githubUrl, year)
}
```

`status` values: `"live"` | `"wip"` | `"private"`

- [ ] **Step 1: Rewrite `src/components/ProjectCard.jsx`**

Replace entire file with:

```jsx
const STATUS_CONFIG = {
  live: {
    label: "Live",
    style: { background: "#052e16", border: "1px solid #16a34a44", color: "#4ade80" },
    dot: true,
  },
  wip: {
    label: "In Progress",
    style: { background: "#1c1917", border: "1px solid #78716c44", color: "#a8a29e" },
    dot: false,
  },
  private: {
    label: "Private",
    style: { background: "#1c1917", border: "1px solid #78716c44", color: "#a8a29e" },
    dot: false,
  },
}

const ProjectCard = ({
  title,
  description,
  technologies = [],
  image,
  status = "live",
  liveUrl,
  githubUrl,
  featured = false,
}) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.wip

  if (featured) {
    return (
      <div
        className="projects-card"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "24px",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#6366f133"
          e.currentTarget.style.boxShadow = "0 0 40px #6366f110"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#1e293b"
          e.currentTarget.style.boxShadow = "none"
        }}
      >
        {/* Preview */}
        <div
          style={{
            background: image ? "none" : "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
            minHeight: "280px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {image ? (
            <img
              src={image}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          ) : (
            <>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 50% 50%, #6366f120 0%, transparent 70%)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "#6366f122",
                  letterSpacing: "-2px",
                }}
              >
                01
              </span>
            </>
          )}
          {/* Status badge */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "11px",
              fontWeight: 500,
              padding: "4px 10px",
              borderRadius: "999px",
              fontFamily: "var(--font-dm-sans)",
              ...cfg.style,
            }}
          >
            {cfg.dot && (
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 5px #4ade80",
                  animation: "badge-pulse 2s ease-in-out infinite",
                  display: "inline-block",
                }}
              />
            )}
            {cfg.label}
          </div>
        </div>

        {/* Info */}
        <div
          style={{
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "22px",
              fontWeight: 800,
              color: "#f1f5f9",
              letterSpacing: "-0.5px",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#64748b",
              lineHeight: 1.7,
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {technologies.map((t) => (
              <span
                key={t}
                style={{
                  background: "#6366f111",
                  border: "1px solid #6366f122",
                  color: "#a5b4fc",
                  fontSize: "11px",
                  fontWeight: 500,
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ds-btn-primary"
                style={{ fontSize: "13px", padding: "8px 18px", borderRadius: "6px" }}
              >
                ↗ Live Demo
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ds-btn-ghost"
                style={{ fontSize: "13px", padding: "8px 18px", borderRadius: "6px" }}
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Grid card (non-featured)
  return (
    <div
      className="projects-card"
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#6366f133"
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.boxShadow = "0 8px 32px #6366f110"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1e293b"
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      {/* Preview strip */}
      <div
        style={{
          background: image ? "none" : "linear-gradient(135deg, #1e1b4b, #0f172a)",
          height: "140px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
        ) : (
          <>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 50% 50%, #6366f115 0%, transparent 70%)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "28px",
                fontWeight: 800,
                color: "#6366f122",
                letterSpacing: "-1px",
              }}
            >
              {String(technologies.length + 2).padStart(2, "0")}
            </span>
          </>
        )}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            fontSize: "10px",
            fontWeight: 500,
            padding: "3px 8px",
            borderRadius: "999px",
            fontFamily: "var(--font-dm-sans)",
            ...cfg.style,
          }}
        >
          {cfg.label}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px" }}>
        <h3
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "16px",
            fontWeight: 700,
            color: "#f1f5f9",
            marginBottom: "6px",
            letterSpacing: "-0.3px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "12px",
            color: "#64748b",
            lineHeight: 1.6,
            marginBottom: "12px",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "12px",
            borderTop: "1px solid #1e293b",
          }}
        >
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                style={{
                  background: "#6366f111",
                  border: "1px solid #6366f122",
                  color: "#a5b4fc",
                  fontSize: "10px",
                  padding: "2px 7px",
                  borderRadius: "3px",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "11px",
                color: "#6366f1",
                textDecoration: "none",
                fontWeight: 600,
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
```

- [ ] **Step 2: Rewrite `src/sections/Projects.jsx`**

Replace entire file with:

```jsx
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProjectCard from "../components/ProjectCard"
import { projectsData } from "../constants"

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        })
        .fromTo(".projects-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(
          ".projects-card",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          0.3
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const [featured, ...rest] = projectsData

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}
    >
      <div className="section-label">What I&apos;ve built</div>
      <h2 className="section-title projects-title">
        My <span>Projects</span>
      </h2>

      {/* Featured project */}
      {featured && <ProjectCard {...featured} featured={true} />}

      {/* Grid */}
      {rest.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
          className="max-md:grid-cols-1"
        >
          {rest.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Projects
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Expected: first project as a full-width two-column card with status badge, remaining projects in a 3-column grid with hover lift effect.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.jsx src/sections/Projects.jsx
git commit -m "feat: redesign Projects with featured card layout and 3-column grid"
```

**→ Wait for user approval before proceeding.**

---

## Task 7: Skills

**Files:**

- Modify: `src/components/SkillCard.jsx`
- Modify: `src/sections/Skills.jsx`
- Modify: `src/index.css` (add marquee CSS)

**Data used:** `skillsData` from `src/constants/index.js`. Expected shape per item:

```js
{ id, category, title, description, skills: string[], icon }
```

- [ ] **Step 1: Add marquee CSS to `src/index.css`**

Inside `@layer utilities {}`, add:

```css
/* Marquee strip */
.marquee-wrap {
  margin-top: 48px;
  overflow: hidden;
  padding: 20px 0;
  border-top: 1px solid #1e293b;
  border-bottom: 1px solid #1e293b;
  position: relative;
}
.marquee-wrap::before,
.marquee-wrap::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 2;
  pointer-events: none;
}
.marquee-wrap::before {
  left: 0;
  background: linear-gradient(to right, #080d1a, transparent);
}
.marquee-wrap::after {
  right: 0;
  background: linear-gradient(to left, #080d1a, transparent);
}
.marquee-inner {
  display: flex;
  width: max-content;
  animation: marquee-scroll 35s linear infinite;
  will-change: transform;
}
@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
.marquee-track {
  display: flex;
  gap: 32px;
  padding-right: 32px;
}
.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #334155;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  font-family: var(--font-dm-sans);
}
.marquee-item span {
  color: #6366f144;
  font-size: 16px;
}
```

- [ ] **Step 2: Rewrite `src/components/SkillCard.jsx`**

Replace entire file with:

```jsx
const ICON_MAP = {
  Frontend: "⚡",
  Design: "🎨",
  Delivery: "🚀",
  Backend: "🗄️",
}

const SkillCard = ({ title, description, skills = [], icon }) => {
  const emoji = icon || ICON_MAP[title] || "💡"

  return (
    <div className="skills-card ds-card" style={{ padding: "28px" }}>
      {/* Icon */}
      <div
        style={{
          width: "44px",
          height: "44px",
          background: "#6366f115",
          border: "1px solid #6366f122",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          marginBottom: "16px",
        }}
      >
        {emoji}
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "16px",
          fontWeight: 700,
          color: "#f1f5f9",
          marginBottom: "4px",
        }}
      >
        {title}
      </div>

      {/* Description */}
      {description && (
        <div
          style={{
            fontSize: "12px",
            color: "#475569",
            marginBottom: "20px",
            lineHeight: 1.5,
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {description}
        </div>
      )}

      {/* Skill chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {skills.map((skill) => (
          <span
            key={skill}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#0d1829",
              border: "1px solid #1e293b",
              color: "#94a3b8",
              fontSize: "12px",
              fontWeight: 500,
              padding: "6px 12px",
              borderRadius: "6px",
              fontFamily: "var(--font-dm-sans)",
              cursor: "default",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#6366f1",
                opacity: 0.6,
                flexShrink: 0,
              }}
            />
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default SkillCard
```

- [ ] **Step 3: Rewrite `src/sections/Skills.jsx`**

Replace entire file with:

```jsx
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { skillsData } from "../constants"
import SkillCard from "../components/SkillCard"

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_ITEMS = [
  "React",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "GSAP",
  "Vite",
  "Figma",
  "Node.js",
  "Express",
  "PHP",
  "SQL",
  "MongoDB",
  "XAMPP",
  "REST APIs",
  "Git",
  "GitHub",
  "Responsive Design",
  "Accessibility",
]

const Skills = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        })
        .fromTo(".skills-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(
          ".skills-card",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          0.3
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}
    >
      <div className="section-label">What I work with</div>
      <h2 className="section-title skills-title">
        My <span>Skills</span>
      </h2>

      {/* 2×2 Category grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px",
        }}
        className="max-sm:grid-cols-1"
      >
        {skillsData.map((skill) => (
          <SkillCard key={skill.id} {...skill} />
        ))}
      </div>

      {/* Marquee strip */}
      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-inner">
          <div className="marquee-track">
            {MARQUEE_ITEMS.map((item) => (
              <span key={item} className="marquee-item">
                <span>◆</span> {item}
              </span>
            ))}
          </div>
          <div className="marquee-track">
            {MARQUEE_ITEMS.map((item) => (
              <span key={`${item}-2`} className="marquee-item">
                <span>◆</span> {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
```

- [ ] **Step 4: Update `src/constants/index.js` — ensure `skillsData` matches expected shape**

Check that each entry in `skillsData` has: `id`, `title`, `description`, `skills` (array of strings). Add a `Backend` entry if missing:

```js
{
  id: 4,
  title: "Backend",
  description: "Server-side tools and data management",
  skills: ["Node.js", "Express", "PHP", "SQL", "MongoDB", "REST APIs", "XAMPP"],
}
```

And ensure the other three entries have `title` values of `"Frontend"`, `"Design"`, and `"Delivery"` so the icon map in `SkillCard` picks up the right emoji. If the titles differ, either update them or pass an `icon` prop in the data.

- [ ] **Step 5: Verify in browser**

```bash
npm run dev
```

Expected: 2×2 card grid with icon boxes and skill chips, seamless scrolling marquee strip below.

- [ ] **Step 6: Commit**

```bash
git add src/components/SkillCard.jsx src/sections/Skills.jsx src/index.css src/constants/index.js
git commit -m "feat: redesign Skills with category cards, skill chips, and seamless marquee"
```

**→ Wait for user approval before proceeding.**

---

## Task 8: Education

**Files:**

- Modify: `src/components/EduCard.jsx`
- Modify: `src/components/CertificateCard.jsx`
- Modify: `src/sections/Education.jsx`

**Data used:**

- `educationData` — shape: `{ id, period, title, institution, description }`
- `certificatesData` — shape: `{ id, title, issuer, date, fileUrl }`

- [ ] **Step 1: Rewrite `src/components/EduCard.jsx`**

Replace entire file with:

```jsx
const EduCard = ({ period, title, institution, description }) => (
  <div
    className="edu-card"
    style={{
      display: "flex",
      gap: "32px",
      paddingBottom: "40px",
      position: "relative",
    }}
  >
    {/* Dot */}
    <div
      style={{
        flexShrink: 0,
        width: "41px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "4px",
      }}
    >
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "#6366f1",
          boxShadow: "0 0 8px #6366f166",
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>

    {/* Card */}
    <div className="ds-card" style={{ flex: 1, padding: "24px 28px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "17px",
            fontWeight: 800,
            color: "#f1f5f9",
            letterSpacing: "-0.3px",
          }}
        >
          {title}
        </div>
        <span
          style={{
            background: "#6366f111",
            border: "1px solid #6366f122",
            color: "#a5b4fc",
            fontSize: "11px",
            fontWeight: 600,
            padding: "3px 10px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {period}
        </span>
      </div>
      {institution && (
        <div
          style={{
            fontSize: "13px",
            color: "#6366f1",
            fontWeight: 500,
            marginBottom: "10px",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {institution}
        </div>
      )}
      {description && (
        <p
          style={{
            fontSize: "13px",
            color: "#64748b",
            lineHeight: 1.7,
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {description}
        </p>
      )}
    </div>
  </div>
)

export default EduCard
```

- [ ] **Step 2: Rewrite `src/components/CertificateCard.jsx`**

Replace entire file with:

```jsx
const CertificateCard = ({ title, issuer, date, fileUrl }) => {
  const handleView = () => {
    if (fileUrl) window.open(fileUrl, "_blank")
  }

  return (
    <div
      className="cert-card"
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
        cursor: fileUrl ? "pointer" : "default",
      }}
      onClick={handleView}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#6366f133"
        e.currentTarget.style.boxShadow = "0 0 24px #6366f10d"
        e.currentTarget.style.transform = "translateY(-3px)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1e293b"
        e.currentTarget.style.boxShadow = "none"
        e.currentTarget.style.transform = "translateY(0)"
      }}
      role={fileUrl ? "button" : undefined}
      aria-label={fileUrl ? `View certificate: ${title}` : undefined}
    >
      {/* Icon */}
      <div
        style={{
          width: "40px",
          height: "40px",
          background: "#6366f115",
          border: "1px solid #6366f122",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        🏆
      </div>

      {/* Info */}
      <div>
        <div
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "14px",
            fontWeight: 700,
            color: "#f1f5f9",
            letterSpacing: "-0.2px",
            lineHeight: 1.3,
            marginBottom: "4px",
          }}
        >
          {title}
        </div>
        {issuer && (
          <div style={{ fontSize: "12px", color: "#475569", fontFamily: "var(--font-dm-sans)" }}>
            {issuer}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "10px",
          borderTop: "1px solid #1e293b",
          marginTop: "auto",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "#334155",
            fontWeight: 500,
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          {date}
        </span>
        {fileUrl && (
          <span
            style={{
              fontSize: "11px",
              color: "#6366f1",
              fontWeight: 600,
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            View ↗
          </span>
        )}
      </div>
    </div>
  )
}

export default CertificateCard
```

- [ ] **Step 3: Rewrite `src/sections/Education.jsx`**

Replace entire file with:

```jsx
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { educationData, certificatesData } from "../constants"
import EduCard from "../components/EduCard"
import CertificateCard from "../components/CertificateCard"

gsap.registerPlugin(ScrollTrigger)

const Education = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        })
        .fromTo(".edu-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(
          ".edu-card",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          0.3
        )
        .fromTo(
          ".cert-card",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          0.5
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="education"
      ref={sectionRef}
      style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}
    >
      <div className="section-label">Background</div>
      <h2 className="section-title edu-title">
        Education &amp; <span>Credentials</span>
      </h2>

      {/* Timeline */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          marginBottom: "64px",
        }}
      >
        {/* Vertical line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "20px",
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent, #6366f144 10%, #6366f144 90%, transparent)",
          }}
        />
        {educationData.map((item) => (
          <EduCard key={item.id} {...item} />
        ))}
      </div>

      {/* Certificates */}
      {certificatesData?.length > 0 && (
        <>
          <div
            style={{
              fontSize: "12px",
              color: "#475569",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: "24px",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            Certificates
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
            className="max-md:grid-cols-1 max-sm:grid-cols-1"
          >
            {certificatesData.map((cert) => (
              <CertificateCard key={cert.id} {...cert} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Education
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Expected: vertical indigo timeline with glowing dots, degree cards with indigo top-line accent, Certificates subsection below in a 3-column grid with hover lift.

- [ ] **Step 5: Commit**

```bash
git add src/components/EduCard.jsx src/components/CertificateCard.jsx src/sections/Education.jsx
git commit -m "feat: redesign Education with vertical timeline and certificates grid"
```

**→ Wait for user approval before proceeding.**

---

## Task 9: Contact

**Files:**

- Modify: `src/sections/Contact.jsx`

**Data used:** `PERSONAL` from `src/constants/index.js` — uses `PERSONAL.email`, `PERSONAL.linkedin`. Formspree ID stays as-is.

- [ ] **Step 1: Rewrite `src/sections/Contact.jsx`**

Replace entire file with:

```jsx
import { useState } from "react"
import { PERSONAL } from "../constants"

const FORMSPREE_ID = "xzdkodpv"

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState("idle") // idle | sending | success | error

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", email: "", subject: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const inputStyle = {
    background: "#080d1a",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    padding: "11px 14px",
    fontSize: "14px",
    color: "#f1f5f9",
    fontFamily: "var(--font-dm-sans)",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s, box-shadow 0.2s",
  }

  const labelStyle = {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: 500,
    letterSpacing: "0.5px",
    fontFamily: "var(--font-dm-sans)",
    marginBottom: "6px",
    display: "block",
  }

  return (
    <section id="contact" style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}>
      <div className="section-label">Let&apos;s talk</div>
      <h2 className="section-title">
        Get In <span>Touch</span>
      </h2>
      <p
        style={{
          fontSize: "15px",
          color: "#64748b",
          marginBottom: "48px",
          maxWidth: "480px",
          lineHeight: 1.6,
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        Open to new opportunities, freelance work, or just a chat. Drop me a message and I&apos;ll
        get back to you.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "stretch",
        }}
        className="max-md:block"
      >
        {/* Left: info cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            justifyContent: "space-between",
          }}
        >
          {[
            { icon: "✉️", label: "Email", value: PERSONAL?.email || "your@email.com" },
            { icon: "📍", label: "Location", value: "UK · Open to remote (incl. Bulgaria)" },
            { icon: "✅", label: "Status", value: "Open to work" },
          ].map(({ icon, label, value }) => (
            <div
              key={label}
              style={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "12px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#6366f133"
                e.currentTarget.style.boxShadow = "0 0 24px #6366f10d"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e293b"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  background: "#6366f115",
                  border: "1px solid #6366f122",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#475569",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "4px",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#f1f5f9",
                    fontWeight: 500,
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {value}
                </div>
              </div>
            </div>
          ))}

          {/* Social buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { label: "LinkedIn", icon: "🔗", href: PERSONAL?.linkedin || "#" },
              { label: "GitHub", icon: "🐙", href: PERSONAL?.github || "#" },
            ].map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "10px",
                  padding: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontFamily: "var(--font-dm-sans)",
                  transition: "border-color 0.2s, color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#6366f133"
                  e.currentTarget.style.color = "#a5b4fc"
                  e.currentTarget.style.background = "#6366f108"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1e293b"
                  e.currentTarget.style.color = "#94a3b8"
                  e.currentTarget.style.background = "#0f172a"
                }}
              >
                <span style={{ fontSize: "16px" }}>{icon}</span> {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="ds-card" style={{ padding: "32px" }}>
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p
                style={{
                  fontSize: "22px",
                  fontFamily: "var(--font-syne)",
                  fontWeight: 800,
                  color: "#f1f5f9",
                  marginBottom: "8px",
                }}
              >
                Message sent!
              </p>
              <p style={{ fontSize: "14px", color: "#64748b", fontFamily: "var(--font-dm-sans)" }}>
                Thanks for reaching out — I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label htmlFor="name" style={labelStyle}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#6366f1"
                      e.target.style.boxShadow = "0 0 0 3px #6366f115"
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#1e293b"
                      e.target.style.boxShadow = "none"
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#6366f1"
                      e.target.style.boxShadow = "0 0 0 3px #6366f115"
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#1e293b"
                      e.target.style.boxShadow = "none"
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" style={labelStyle}>
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6366f1"
                    e.target.style.boxShadow = "0 0 0 3px #6366f115"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#1e293b"
                    e.target.style.boxShadow = "none"
                  }}
                />
              </div>

              <div>
                <label htmlFor="message" style={labelStyle}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity…"
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6366f1"
                    e.target.style.boxShadow = "0 0 0 3px #6366f115"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#1e293b"
                    e.target.style.boxShadow = "none"
                  }}
                />
              </div>

              {status === "error" && (
                <p
                  style={{ fontSize: "13px", color: "#f87171", fontFamily: "var(--font-dm-sans)" }}
                >
                  Something went wrong. Please email directly at{" "}
                  <a href={`mailto:${PERSONAL?.email}`} style={{ color: "#6366f1" }}>
                    {PERSONAL?.email}
                  </a>
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="ds-btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "13px 24px",
                  borderRadius: "8px",
                  marginTop: "4px",
                  opacity: status === "sending" ? 0.6 : 1,
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                }}
              >
                {status === "sending" ? "Sending…" : "Send Message ↗"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
```

- [ ] **Step 2: Verify `PERSONAL.github` is defined in `src/constants/index.js`**

Open `src/constants/index.js` and check `PERSONAL`. If `github` key is missing, add it:

```js
export const PERSONAL = {
  // ... existing keys ...
  github: "https://github.com/YOUR_USERNAME",
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Expected: two-column layout, 3 info cards + social buttons on the left, form card with indigo top-line accent on the right. Form fields glow indigo on focus.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Contact.jsx src/constants/index.js
git commit -m "feat: redesign Contact with two-column layout, info cards, and styled form"
```

**→ Wait for user approval before proceeding.**

---

## Task 10: Footer

**Files:**

- Modify: `src/sections/Footer.jsx`

**Data used:** `navLinks` and `socialMedia` from `src/constants/index.js`. `socialMedia` shape: `{ alt, link, src }` where `src` is a react-icons component.

- [ ] **Step 1: Rewrite `src/sections/Footer.jsx`**

Replace entire file with:

```jsx
import { navLinks, socialMedia } from "../constants"

const Footer = () => (
  <footer
    style={{
      borderTop: "1px solid #1e293b",
      padding: "48px 48px 32px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Subtle radial glow */}
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "200px",
        background: "radial-gradient(ellipse at bottom, #6366f10a 0%, transparent 70%)",
        pointerEvents: "none",
      }}
    />

    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "32px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <a
            href="#home"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "22px",
              fontWeight: 800,
              color: "#f1f5f9",
              letterSpacing: "-0.5px",
              textDecoration: "none",
            }}
          >
            Slav<span style={{ color: "#6366f1" }}>.</span>
          </a>
          <p
            style={{
              fontSize: "13px",
              color: "#475569",
              maxWidth: "260px",
              lineHeight: 1.6,
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            Frontend Developer building fast, accessible web experiences.
          </p>
        </div>

        {/* Nav links */}
        <nav
          style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}
          aria-label="Footer navigation"
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontSize: "13px",
                color: "#475569",
                textDecoration: "none",
                fontFamily: "var(--font-dm-sans)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div style={{ display: "flex", gap: "10px" }}>
          {socialMedia.map((item) => (
            <a
              key={item.alt}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.alt}
              style={{
                width: "38px",
                height: "38px",
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#6366f133"
                e.currentTarget.style.background = "#6366f108"
                e.currentTarget.style.color = "#a5b4fc"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e293b"
                e.currentTarget.style.background = "#0f172a"
                e.currentTarget.style.color = "#94a3b8"
              }}
            >
              <item.src aria-hidden="true" style={{ width: "16px", height: "16px" }} />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #1e293b", marginBottom: "24px" }} />

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#334155",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          © {new Date().getFullYear()} <span style={{ color: "#475569" }}>Slav Georgiev</span>. All
          rights reserved.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            color: "#475569",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-dm-sans)",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#a5b4fc"
            e.currentTarget.querySelector(".arrow-box").style.borderColor = "#6366f133"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#475569"
            e.currentTarget.querySelector(".arrow-box").style.borderColor = "#1e293b"
          }}
        >
          Back to top
          <span
            className="arrow-box"
            style={{
              width: "24px",
              height: "24px",
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              transition: "border-color 0.2s",
            }}
          >
            ↑
          </span>
        </button>
      </div>
    </div>
  </footer>
)

export default Footer
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: footer with brand + tagline, flat nav links, social icon buttons (from `socialMedia` data), divider, copyright + back-to-top button.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Footer.jsx
git commit -m "feat: redesign Footer with brand, flat nav, social icons, back-to-top"
```

**→ Wait for user approval before proceeding.**

---

## Task 11: Final Polish & Build Check

- [ ] **Step 1: Run lint check**

```bash
npm run lint
```

Fix any errors (warnings are acceptable).

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Check all sections render correctly in production mode.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: final polish pass, build verified"
```

---

## Self-Review

**Spec coverage check:**

| Spec section         | Covered by task                        |
| -------------------- | -------------------------------------- |
| Design tokens        | Task 1                                 |
| Section order        | Task 2                                 |
| Nav                  | Task 3                                 |
| Hero                 | Task 4                                 |
| About                | Task 5                                 |
| Projects             | Task 6                                 |
| Skills               | Task 7                                 |
| Education            | Task 8                                 |
| Contact              | Task 9                                 |
| Footer               | Task 10                                |
| Fonts                | Task 1 (index.html)                    |
| Marquee              | Task 7 (index.css)                     |
| Reduced motion       | Task 1 (index.css)                     |
| Data layer unchanged | All tasks read from existing constants |

**Type consistency:** All components use the same prop names as the existing constants data shape. `SkillCard` uses `title`/`description`/`skills` (matching existing `skillsData`). `EduCard` uses `period`/`title`/`institution`/`description` (matching existing `educationData`). `CertificateCard` uses `title`/`issuer`/`date`/`fileUrl` (matching existing `certificatesData`). `ProjectCard` adds `featured` prop with `false` default.

**No placeholders found.** All code blocks are complete.
