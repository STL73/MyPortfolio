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
/**
 * Shouts, in development only, when an element this hook animates also has a
 * CSS transition on a property the hook owns.
 *
 * This has now caused three separate "content is permanently invisible" bugs:
 * two systems interpolating the same opacity or transform every frame, with the
 * tween losing. It is invisible in code review because the two halves live in
 * different files -- a Tailwind class on the component and a tween in here.
 */
const warnOnStyleConflicts = (root) => {
  if (!root) return
  root.querySelectorAll("[data-reveal]").forEach((el) => {
    const { transitionProperty, transitionDuration } = getComputedStyle(el)
    // Split rather than match. A regex here needs backslash escapes, and
    // this file has already been corrupted once by them -- the word
    // boundaries arrived as literal backspace characters.
    const owned = transitionProperty
      .split(",")
      .map((property) => property.trim())
      .some((property) =>
        ["all", "opacity", "transform", "visibility"].includes(property),
      )
    const running = transitionDuration !== "0s"
    if (owned && running) {
      console.warn(
        "[useSectionReveal] CSS transitions a property this hook animates:",
        el,
        `(${transitionProperty} / ${transitionDuration}).`,
        "Move the reveal to a wrapper, or narrow the transition.",
      )
    }
  })
}

export const useSectionReveal = () => {
  const scope = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (import.meta.env.DEV) warnOnStyleConflicts(scope.current)

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
