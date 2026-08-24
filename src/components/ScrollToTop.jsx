import { useEffect } from "react"
import { useLocation } from "react-router"

// A lazy section can take a few frames to arrive after the route renders.
// Roughly two-thirds of a second at 60fps before giving up, which is long
// enough for a chunk on a slow connection and short enough that a genuinely
// wrong hash does not leave something retrying in the background.
const MAX_FRAMES = 40

/**
 * Puts a new route where it should be: at the top, or at the section the URL
 * asked for.
 *
 * A browser preserves scroll position across a client-side navigation, so
 * following a link from halfway down the homepage lands halfway down the case
 * study. React Router ships ScrollRestoration for this, but it needs a data
 * router and this app is declarative.
 *
 * The hash branch is what makes a link like "/#projects" work from a page
 * where that section does not exist. React Router will not scroll to a hash on
 * its own, and the section it names is lazy-loaded, so the element is usually
 * absent on the first frame after navigation -- hence the retry rather than a
 * single lookup that would quietly do nothing.
 *
 * Same-page anchors never reach this. On the homepage SectionLink renders a
 * plain anchor and the browser handles it natively.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      // Instant, not smooth: a page the reader has not seen yet has no
      // position worth animating away from.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      return
    }

    let frame
    let attempts = 0

    const scrollToTarget = () => {
      // The hash is author-controlled, but it arrives from the URL bar, and
      // querySelector throws on a selector it cannot parse.
      let target = null
      try {
        target = document.querySelector(hash)
      } catch {
        return
      }

      if (target) {
        target.scrollIntoView({ behavior: "instant", block: "start" })
        return
      }

      if (attempts < MAX_FRAMES) {
        attempts += 1
        frame = requestAnimationFrame(scrollToTarget)
      }
    }

    frame = requestAnimationFrame(scrollToTarget)
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
