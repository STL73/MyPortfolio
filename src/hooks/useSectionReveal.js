import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

/**
 * Fades a section's marked elements up as it comes into view.
 *
 * Returns a ref for the section root. Anything inside it carrying
 * `data-reveal` rises 12px and fades in, once, in document order.
 *
 * Deliberately restrained, and deliberately not per-word or per-letter: that
 * treatment is the clearest tell of a page assembled by a machine, and it
 * makes a sentence take three times as long to become readable as it takes to
 * read. 280ms sits inside the design system's 240-320ms entrance band.
 *
 * Reduced motion never has the timeline built at all -- matchMedia means those
 * visitors get the finished state rather than a hurried version of the
 * animation, and GSAP reverts cleanly if the preference changes mid-session.
 *
 * There is deliberately no ScrollTrigger.refresh() here. Sections mount as
 * their chunks arrive and append below the ones already placed, so an existing
 * trigger stays correctly measured -- but a refresh fired by a later section
 * lands on an earlier section's tween while it is mid-stagger, snaps it back to
 * its start values, and `once: true` then makes that permanent. It left three
 * project rows invisible for good.
 *
 * `start: "top 85%"` rather than something tighter is a safety margin as much
 * as a taste decision. These elements begin at opacity 0, so a trigger that
 * never fires leaves a section permanently blank; firing early costs nothing
 * and removes that failure mode from anything already near the fold.
 */
export const useSectionReveal = () => {
  const scope = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-reveal]", {
          autoAlpha: 0,
          y: 12,
          duration: 0.28,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: scope.current,
            start: "top 85%",
            once: true,
          },
        })
      })
    },
    { scope },
  )

  return scope
}
