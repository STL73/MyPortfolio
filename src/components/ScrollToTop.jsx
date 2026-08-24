import { useEffect } from "react"
import { useLocation } from "react-router"

// How long to keep waiting for a hash target before giving up. The target is
// inside a lazy chunk, so on a cold load it does not exist for as long as the
// network takes. Generous, because the cost of waiting is nothing and the cost
// of giving up early is landing on the wrong part of the page.
const TARGET_TIMEOUT_MS = 5000

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
 * its own, and every section it can name is lazy-loaded, so the element is
 * usually absent for some unknowable number of frames after the route renders.
 *
 * This waits with a MutationObserver rather than counting frames. The frame
 * count was the first attempt and it was the wrong instrument: a budget in
 * frames is really a bet about how fast a chunk downloads, and it lost that
 * bet on any cold load, silently leaving the reader at the top of the page.
 *
 * Same-page anchors never reach this. On the homepage SectionLink renders a
 * plain anchor and the browser handles it natively.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  // Take scroll position off the browser. Left on "auto" it restores the
  // previous offset after a reload, asynchronously, competing with everything
  // below. This component decides position on every navigation, so the two
  // cannot both be in charge.
  //
  // The cost is that Back no longer restores where you were on a long page.
  // That was already true the moment this component started forcing the top,
  // and a shared link resolving to the wrong section is the worse failure.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
  }, [])

  useEffect(() => {
    if (!hash) {
      // Instant, not smooth: a page the reader has not seen yet has no
      // position worth animating away from.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      return
    }

    // The hash arrives from the URL bar and querySelector throws on anything
    // it cannot parse as a selector.
    const findTarget = () => {
      try {
        return document.querySelector(hash)
      } catch {
        return null
      }
    }

    const scrollTo = (target) => {
      // scroll-margin-top on the section is what keeps the heading clear of
      // the fixed header; scrollIntoView honours it, a raw scrollTo would not.
      target.scrollIntoView({ behavior: "instant", block: "start" })
    }

    const immediate = findTarget()
    if (immediate) {
      scrollTo(immediate)
      return
    }

    const observer = new MutationObserver(() => {
      const target = findTarget()
      if (!target) return
      observer.disconnect()
      clearTimeout(timer)
      scrollTo(target)
    })

    observer.observe(document.body, { childList: true, subtree: true })
    const timer = setTimeout(() => observer.disconnect(), TARGET_TIMEOUT_MS)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
