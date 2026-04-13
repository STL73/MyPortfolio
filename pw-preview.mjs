/**
 * Playwright preview helper — takes before/after screenshots of the portfolio.
 * Usage: node pw-preview.mjs <section-id> <output-prefix>
 *   section-id   : "full" for full-page, or a hash like "about", "contact", etc.
 *   output-prefix: filename prefix saved in pw-shots/
 *
 * Examples:
 *   node pw-preview.mjs full cq1
 *   node pw-preview.mjs about an1
 */

import { chromium } from "@playwright/test"
import { mkdirSync } from "fs"
import { join } from "path"

const BASE_URL = "http://localhost:5175/my-portfolio/"
const OUT_DIR  = "pw-shots"
mkdirSync(OUT_DIR, { recursive: true })

const [, , section = "full", prefix = "shot"] = process.argv

async function screenshot(page, viewport, label) {
  await page.setViewportSize(viewport)

  if (section === "full") {
    await page.goto(BASE_URL, { waitUntil: "networkidle" })
    await page.waitForTimeout(600) // let GSAP settle
    await page.screenshot({ path: join(OUT_DIR, `${prefix}-${label}-full.png`), fullPage: true })
    console.log(`  saved: ${prefix}-${label}-full.png`)
  } else {
    await page.goto(BASE_URL, { waitUntil: "networkidle" })
    // Scroll to section
    await page.evaluate((id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant" })
    }, section)
    await page.waitForTimeout(1000) // let scroll-triggered animations fire
    await page.screenshot({
      path: join(OUT_DIR, `${prefix}-${label}-${section}.png`),
      clip: await page.evaluate((id) => {
        const el = document.getElementById(id)
        if (!el) return null
        const r = el.getBoundingClientRect()
        return { x: 0, y: Math.max(0, r.top + window.scrollY - 80), width: window.innerWidth, height: Math.min(r.height + 160, window.innerHeight * 2) }
      }, section),
    })
    console.log(`  saved: ${prefix}-${label}-${section}.png`)
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true })

  console.log(`\n📸 Capturing [${section}] at two viewports…`)

  // Desktop
  const pageD = await browser.newPage()
  await screenshot(pageD, { width: 1440, height: 900 }, "desktop")
  await pageD.close()

  // Mobile
  const pageM = await browser.newPage()
  await screenshot(pageM, { width: 390, height: 844 }, "mobile")
  await pageM.close()

  await browser.close()
  console.log(`✅ Done — screenshots saved to ./${OUT_DIR}/\n`)
}

main().catch((e) => { console.error(e); process.exit(1) })
