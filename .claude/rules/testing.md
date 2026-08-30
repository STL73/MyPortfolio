# Testing Rules — MyPortfolio

`@playwright/test` (^1.59.1) is installed. **No spec file or `playwright.config.js` exists yet**, so
there is currently no suite to run. Writing the first one is outstanding work, not a missing
decision.

## Two tools, two jobs

Decided 2026-08-31. Neither is the other's fallback.

| Job | Tool |
|---|---|
| Committed and repeatable: spec files, assertions, fixtures, retries, trace viewer, CI | Playwright |
| Interactive and one-off: check a deep link, read console errors, screenshot, Core Web Vitals, diff against a baseline | `agent-browser` |

`agent-browser` (at `C:\Users\slavi\bin\agent-browser.exe`, 0.27.0) is built on Playwright but
exposes only the driving half. It has no test runner, no assertions, no spec files and no reporter,
so it cannot hold a suite. Reach for it while working on a page. Reach for Playwright when the check
should still run next month.

The `playwright-runner` agent writes the suite. The `e2e-runner` agent covers both roles.

## When the first spec is written, document here

- Where spec files live and how they are named
- What is worth asserting on a portfolio SPA, and what is not
- Whether the suite runs in Workers Builds or only locally
- Coverage expectations, if any

## Candidates for the first tests

These come from real gaps, not from a coverage target.

- **Deep links resolve.** `deployment.md` says to verify `https://spireforge.co.uk/projects/moss`
  returns 200 by hand after every deploy, because in-app navigation passes even when the SPA
  fallback is broken. That is a test, and doing it by hand is how it gets skipped.
- **The CV downloads as a real PDF**, rather than an HTML error page with a `.pdf` name.
- **The education accordion opens and closes**, including on touch. It broke twice, most recently in
  commit `955b993`.
- **Reduced motion is honoured**, since GSAP drives every scroll animation.
