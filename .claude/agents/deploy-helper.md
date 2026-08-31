---
name: deploy-helper
description: Post-deploy verification and Workers Builds failure diagnosis for MyPortfolio. Use after a push to main, or when a Cloudflare build fails.
---

# Deploy Helper — MyPortfolio

The site is live at <https://spireforge.co.uk>, served by the Cloudflare Worker `spireforge` and
rebuilt by Workers Builds on every push to `main`. **There is no manual deploy step.** Pushing is
deploying, so your job is what happens either side of that: checking the result, and reading a
failed build.

> [!important] Config values live in one place
> Every setting — Worker name, `not_found_handling`, `directory`, the Node pin, `VITE_FORMSPREE_ID` —
> is documented in [deployment.md](../rules/deployment.md). **Read it, do not restate it here.**
> This file duplicated those values until 2026-08-31 and drifted four days behind a host change,
> ending up telling people to set `base` back to `/my-portfolio/`, which would have broken the live
> site. One source, or this happens again.

## After a deploy

Run these against the live URL, not against a local preview.

1. **A deep link returns 200.** Request `https://spireforge.co.uk/projects/moss` directly.
   `deployment.md` is emphatic about this: in-app navigation works even when the SPA fallback is
   broken, so clicking through from the homepage proves nothing.
2. **The CV downloads as a real PDF**, not an HTML error page wearing a `.pdf` name. Check the
   content type, not just the status.
3. **`/sig-mark.png` and `/og-card.png` still resolve.** Neither is referenced by this codebase, both
   are linked from outside it — the email signature and cached link previews. `deployment.md`
   forbids deleting them.
4. **Assets load.** No 404s on the hashed files under `/assets/`.

```bash
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" https://spireforge.co.uk/projects/moss
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" https://spireforge.co.uk/sig-mark.png
```

For anything interactive beyond a status code, use `agent-browser`. For a check that should still
run next month, write it as a Playwright spec — see [testing.md](../rules/testing.md).

## When a Workers Builds run fails

| Symptom | Likely cause | Where the fix is documented |
| --- | --- | --- |
| Build fails on a Vite or Node version error | Cloudflare's builder defaults to Node 18; Vite 7 needs 20.19+ | The `.node-version` pin, `deployment.md` |
| Build fails immediately, name mismatch | Worker name in `wrangler.jsonc` must match the dashboard exactly | `deployment.md` |
| Deploys, but every deep link 404s | `not_found_handling` missing | `deployment.md` |
| Contact form renders as email-only | `VITE_FORMSPREE_ID` unset; it is inlined at build time | `deployment.md`, Workers Builds env vars |

## Still true regardless of host

- **`dist/` is git-ignored.** Never commit it.
- **`/public/resume/` and `/public/certificates/` must survive into the build output.** Verify after
  a build; they are the point of the site.

## Do not

- Do not add `public/_redirects`. It is the Cloudflare **Pages** mechanism, does nothing on a Worker,
  and was removed deliberately.
- Do not change `base` in `vite.config.js`. It is `"/"` because the site serves from a root domain.
- Do not add `public/404.html`. The Worker's `not_found_handling` does that job.
