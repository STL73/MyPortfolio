# Deployment Rules — MyPortfolio

**Target: Cloudflare Worker serving static assets, built by Workers Builds from the GitHub repo.**
Decided 2026-08-27, following [Moss](https://github.com/STL73/Moss).

**Not Cloudflare Pages.** Cloudflare no longer creates Pages projects from the dashboard, and the
`public/_redirects` file that was added for Pages does nothing on a Worker.

## Configuration

| Thing | Where | Why it matters |
| --- | --- | --- |
| Worker name `spireforge` | `wrangler.jsonc` | Must match the dashboard exactly or Workers Builds fails the build. This Worker already owns the `spireforge.co.uk` custom domain, so deploying into it swaps the site in place with no DNS change. |
| `not_found_handling: "single-page-application"` | `wrangler.jsonc` | Without it every deep link 404s while in-app navigation works. It passes a casual smoke test and breaks every shared link. |
| `directory: "./dist"` | `wrangler.jsonc` | Build output. Repo root is the Workers Builds root directory. |
| Node 22 | `.node-version` | Cloudflare's builder defaults to Node 18; Vite 7 needs 20.19+. Without the pin the build fails. |
| `VITE_FORMSPREE_ID` | Workers Builds env vars | Inlined at build time. Unset, the contact form renders as email-only. Not a secret. |

## Rules

- **Verify a deep link directly after every deploy** — request `https://spireforge.co.uk/projects/moss`
  and check for a 200, rather than clicking through from the homepage. In-app navigation works even
  when the SPA fallback is broken, so clicking through proves nothing.
- **Never delete `public/sig-mark.png` or `public/og-card.png`.** Neither is referenced by this
  codebase. Both were live on the domain under the previous placeholder site and are linked from
  outside the repo — `sig-mark.png` from the email signature, `og-card.png` from cached link
  previews. See the README's Deploying section.
- **Do not re-add `public/_redirects`.** It is the Pages mechanism, superseded by
  `not_found_handling`.
- After the first deploy, run the live URL through LinkedIn's Post Inspector and X's card validator.
  Both cache a bad first fetch hard, and `og:image` has never been testable before the site was live.
