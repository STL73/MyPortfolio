import { useEffect } from "react"
import { useLocation } from "react-router"

/**
 * Puts a new route at the top of the page.
 *
 * A browser preserves scroll position across a client-side navigation, so
 * following a link from halfway down the homepage lands halfway down the case
 * study. React Router ships ScrollRestoration for this, but it needs a data
 * router; this app is declarative, so the four lines are cheaper than the
 * migration.
 *
 * Keyed on pathname alone. Hash changes are in-page jumps -- the whole point
 * of them is to land somewhere other than the top.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    // Instant, not smooth: a page the reader has not seen yet has no position
    // worth animating away from, and honouring reduced-motion here would mean
    // branching on a preference that changes nothing.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
