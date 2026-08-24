import { useRef } from "react"
import { useLocation } from "react-router"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

/**
 * A short rise and fade when the route changes.
 *
 * It makes moving between the homepage and a case study feel like one
 * application rather than two page loads, which is the only thing a client-side
 * router buys that a plain link does not.
 *
 * It deliberately does not run on first paint. Animating from opacity 0 means
 * the content is invisible until the tween runs, so a thrown error or a failed
 * import would leave a blank page rather than a page without an animation.
 * Skipping the first render removes that failure mode entirely: the initial
 * load is never hidden, and only navigations the reader has already triggered
 * are animated.
 *
 * 240ms is the bottom of the design system's entrance band. A transition
 * between pages is a state change the reader asked for, so it should be over
 * before they wonder whether the click registered.
 */
const RouteTransition = ({ children }) => {
  const { pathname } = useLocation()
  const scope = useRef(null)
  const isFirstRender = useRef(true)

  useGSAP(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          scope.current,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" },
        )
      })
    },
    { dependencies: [pathname], scope },
  )

  return <div ref={scope}>{children}</div>
}

export default RouteTransition
