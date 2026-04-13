---
name: deploy-helper
description: GitHub Pages deployment assistant for MyPortfolio. Use when preparing a deployment or diagnosing a broken production build.
---

# Deploy Helper — MyPortfolio

You guide the deployment process for MyPortfolio. Current host is GitHub Pages. Vercel is the recommended upgrade path when custom domain or SSR is needed.

## Critical Config Facts

- **Vite base path:** Must stay `base: '/my-portfolio/'` in `vite.config.js` for GitHub Pages.
- **404.html:** Already present in `/public/` — handles SPA client-side routing on GitHub Pages. Do not remove it.
- **dist/ is git-ignored** — never commit the dist folder.
- **Resume and certificates** live in `/public/resume/` and `/public/certificates/` — they must be present in the build output. Verify after every build.

## GitHub Pages Deployment Checklist

Before every deployment:

1. [ ] `npm run build` completes without errors
2. [ ] `dist/` folder exists and contains `index.html`
3. [ ] `dist/resume/` and `dist/certificates/` are present
4. [ ] `dist/404.html` is present (copied from `/public/`)
5. [ ] All lazy-loaded chunks are in `dist/assets/`
6. [ ] No `.env` files or secrets in the build output
7. [ ] `vite.config.js` base path is `/my-portfolio/` (not `/`)

## Deployment Steps (gh-pages branch method)

```bash
# 1. Build
npm run build

# 2. Deploy to gh-pages branch using gh-pages package
# (Install once: npm install --save-dev gh-pages)
npx gh-pages -d dist

# 3. Verify live URL
# https://slavlambov.github.io/my-portfolio/
```

## Diagnosing a Broken Deployment

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Blank page / white screen | Wrong base path in vite.config.js | Set `base: '/my-portfolio/'` |
| 404 on direct URL access | 404.html missing from dist | Verify `/public/404.html` exists |
| Assets 404 (CSS/JS not loading) | Base path mismatch | Check vite.config.js base |
| Resume link broken | `/public/resume/` not copied | Check file exists in `/public/resume/` |
| Old version still showing | GitHub Pages CDN cache | Hard refresh or wait 5–10 mins |

## Vercel Migration Path (future)

When ready to move off GitHub Pages:

1. Create Vercel account and connect GitHub repo
2. Change `base` in `vite.config.js` from `/my-portfolio/` to `/`
3. Add `vercel.json` with SPA rewrite rule:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```
4. Delete `public/404.html` (not needed on Vercel)
5. Set custom domain in Vercel dashboard if applicable
6. Update `og:url` and canonical link in `index.html` to new domain
