import gsap from "gsap"
import { useGSAP } from "@gsap/react"

// How far the ember layer travels across the whole scroll of its section. The
// tile is 240px, so this is a third of one tile -- enough to read as depth,
// short of enough to notice as movement.
const DRIFT = 80

/**
 * Drifts a textured section's ember layer against the scroll.
 *
 * Parallax gives the flat ground depth, which is the one thing a single dark
 * colour cannot do on its own. It moves the background, never the content:
 * text that slides at a different rate to the page is the version of this
 * effect that makes people feel ill.
 *
 * It animates a custom property rather than the pseudo-element, because a
 * pseudo-element is not in the DOM and cannot be targeted. The property is
 * declared in index.css with `inherits: true` so `::after` picks it up from
 * the section.
 *
 * Vestibular safety is not optional here. Parallax is a documented migraine
 * and nausea trigger, so under reduced motion the timeline is never built and
 * the layer simply stays put.
 *
 * @param {import("react").RefObject<HTMLElement>} ref The textured section.
 */
export const useEmberDrift = (ref) => {
  useGSAP(
    () => {
      const section = ref.current
      if (!section) return

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          section,
          { "--sf-ember-shift": `${-DRIFT / 2}px` },
          {
            "--sf-ember-shift": `${DRIFT / 2}px`,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              // Tied to scroll position rather than played on entry, so it
              // tracks the reader instead of firing once and finishing.
              scrub: true,
            },
          }
        )
      })
    },
    { dependencies: [ref] }
  )
}
