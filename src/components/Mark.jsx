import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

/**
 * The Spireforge mark.
 *
 * Paths are copied verbatim from `01-LOGO-CORE/icon-dark.svg` in the brand
 * kit. Every angle derives from one 26/28 slope and none of it may be redrawn
 * by eye -- if the mark ever changes, it changes there and is copied here.
 *
 * Two things that look like details and are not:
 *
 * Draw order. The tip is painted after the chevron so its aurora ends sit on
 * top and run clear onto the ground, where they read at 14.94:1. Painted
 * underneath they score 1.08 against the chevron and disappear entirely.
 *
 * The counter -- the rhombus where chevron and tip cross -- is never drawn.
 * It is produced by the two strokes meeting, and drawing it as its own shape
 * means it drifts the moment either stroke moves.
 *
 * Inks come from tokens rather than literals so the mark follows the face:
 * near-white and aurora on Night, and Night and aurora-800 on paper.
 *
 * Do not render below 24px. Under that the counter closes, the spark's arms
 * drop under a pixel each and the tip's four emerging units vanish; the kit
 * ships a compact variant for those sizes.
 */
/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {boolean} [props.decorative]
 *   Set when the mark sits beside text that already names the thing. It then
 *   announces nothing, rather than making a link read as "Spireforge Slav
 *   Lambov, home".
 */
const Mark = ({ className = "", decorative = false, animate = false }) => {
  const root = useRef(null)

  useGSAP(
    () => {
      if (!animate) return

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Draw order is the mark's own: chevron, then tip, then spark. The
        // sequence is the logo assembling itself in the order it is specified
        // to be painted, not an arbitrary reveal.
        const timeline = gsap.timeline({ defaults: { ease: "power2.out" } })

        timeline
          .from('[data-mark="chevron"]', { drawSVG: 0, duration: 0.42 })
          .from('[data-mark="tip"]', { drawSVG: 0, duration: 0.3 }, "-=0.18")
          .from(
            '[data-mark="spark"]',
            { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 31%", duration: 0.24 },
            "-=0.08",
          )
      })
    },
    { scope: root, dependencies: [animate] },
  )

  return (
  <svg
    ref={root}
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    {...(decorative
      ? { "aria-hidden": true, focusable: false }
      : { role: "img", "aria-label": "Spireforge" })}
  >
    <path
      data-mark="chevron"
      d="M22 74 L50 48 L78 74"
      stroke="var(--sf-mark-chevron)"
      strokeWidth="11"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      data-mark="tip"
      d="M34.03 56 L50 70.8 L65.97 56"
      stroke="var(--sf-mark-accent)"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      data-mark="spark"
      d="M50 18 Q50 31 61.26 37.5 Q50 31 38.74 37.5 Q50 31 50 18 Z"
      fill="var(--sf-mark-accent)"
    />
  </svg>
  )
}

export default Mark
