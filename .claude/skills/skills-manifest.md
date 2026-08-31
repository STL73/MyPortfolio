# Skills Manifest — MyPortfolio

Reference guide for which global skills apply to this project and when to invoke them.
Skills are invoked via the Skill tool: e.g. `/frontend-patterns` or `/seo`.

---

## Active Now

| Skill | Invoke When |
|-------|------------|
| `frontend-patterns` | Writing new components, reviewing composition, unsure about React patterns |
| `seo` | Adding/updating meta tags, og: tags, structured data, before any deployment |
| `ui-ux-pro-max` | Design quality check before any section is marked done — catches template-looking UI |
| `code-review` | After writing or modifying any component, section, or utility |
| `security-review` | Before any deployment or public release |
| `github-ops` | GitHub Actions workflows, branch protection, PR setup, Pages config |

---

## When Testing Is Added

| Skill | Invoke When |
|-------|------------|
| `tdd-workflow` | Writing new utility functions or custom hooks — write tests first |
| `e2e-testing` | Setting up or extending Playwright E2E flows (nav, contact form, downloads, responsive) |
| `test-coverage` | Checking coverage thresholds — target is 80% minimum |

---

## When Deployment Is Decided

| Skill | Invoke When |
|-------|------------|
| `deployment-patterns` | Changing how the site builds or ships. Current pipeline is push to `main` → Cloudflare Workers Builds → the `spireforge` Worker |

---

## Notes

- Skills complement the custom agents in `.claude/agents/` — agents are project-specific, skills are general-purpose depth
- For GSAP issues: use the `gsap-specialist` agent first, then `frontend-patterns` skill for React-specific questions
- For SEO: use the `seo-auditor` agent for auditing, `seo` skill for implementation guidance
