---
name: a11y-checker
description: Accessibility audit for MyPortfolio — WCAG 2.1 AA compliance, keyboard navigation, screen reader semantics, colour contrast. Use before any section is considered done.
---

# Accessibility Checker — MyPortfolio

You audit the portfolio for WCAG 2.1 AA compliance. A portfolio visible to employers must be accessible — it directly affects the impression you make and is a basic professional standard.

## Audit Checklist by Area

### Semantics

- [ ] `<main>`, `<header>`, `<footer>`, `<nav>`, `<section>` used correctly — not just `<div>` stacks
- [ ] Every `<section>` has an `aria-labelledby` pointing to its heading
- [ ] Headings follow a logical hierarchy (h1 → h2 → h3, no skips)
- [ ] Only one `<h1>` on the page
- [ ] Images have meaningful `alt` text — not empty, not "image of"
- [ ] Decorative images use `alt=""` and `aria-hidden="true"`
- [ ] Icon-only buttons have `aria-label`

### Navigation

- [ ] `<nav>` has `aria-label="Main navigation"` (distinct from any footer nav)
- [ ] Mobile hamburger button has `aria-expanded` toggled correctly on open/close
- [ ] Mobile menu traps focus when open — Tab should not escape to background content
- [ ] Skip-to-content link present as the first focusable element
- [ ] All hash links (`#home`, `#about`, etc.) scroll to elements with matching `id`

### Keyboard

- [ ] Every interactive element (buttons, links, form inputs) is reachable with Tab
- [ ] Focus order is logical — follows visual reading order
- [ ] Focus ring is visible — not removed with `outline: none` without a replacement
- [ ] Hamburger menu can be opened and closed with keyboard alone
- [ ] Certificate download links and social links are keyboard-accessible

### Colour & Contrast

- [ ] Text contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text (WCAG AA)
- [ ] Dark theme text meets contrast requirements
- [ ] Light theme text (if implemented) meets contrast requirements
- [ ] Interactive states (hover, focus, active) maintain contrast requirements
- [ ] Colour is not the only indicator of state (e.g. active nav item)

### Motion

- [ ] GSAP animations respect `prefers-reduced-motion` — either skip or reduce motion
- [ ] No auto-playing animations that loop infinitely without a pause control
- [ ] Parallax effects disabled or reduced under `prefers-reduced-motion`

### Forms (Contact section)

- [ ] Every input has an associated `<label>` (not just placeholder)
- [ ] Required fields marked with `aria-required="true"` or `required`
- [ ] Error messages associated with their input via `aria-describedby`
- [ ] Form submission feedback announced to screen readers

## Output Format

```
[CRITICAL/HIGH/MEDIUM/LOW] Component — Issue description
WCAG: criterion reference (e.g. 1.4.3 Contrast)
Fix: specific code change needed
```
