import { useEffect, useRef } from "react"

// How far the ember field travels over the entire page. The tile is 240px, so
// this is two and a half tiles across a full scroll -- visible as movement
// without ever being fast enough to compete with reading.
const DRIFT = 600

/**
 * The ember field, once, behind the whole page.
 *
 * The design system's two texture layers do different jobs, and this one is
 * the tile: the mark's spark repeated at five sizes on a 240px grid, at 7% on
 * the dark face. Because it tiles, it can run continuously down the page,
 * which is the right shape for it.
 *
 * The aurora wash is the opposite -- two large radial gradients, a composition
 * rather than a pattern. Repeating that per section bands the page visibly
 * wherever one ends and the next begins, so it stays a per-section accent on
 * the hero and the contact block.
 *
 * An earlier version put both on two sections only. The embers were then
 * absent from the four sections between them, and their drift was invisible
 * everywhere, because eighty pixels of travel on a layer at seven percent is
 * nothing.
 *
 * Fixed rather than absolute: the layer stays put while the document moves
 * over it, so shifting the background position against scroll is genuine
 * parallax rather than a background sliding inside a box.
 *
 * Deliberately not GSAP. This is one number derived from scroll position, and
 * two attempts at expressing it as a scrubbed ScrollTrigger both sat at
 * progress zero -- the root element is not a box ScrollTrigger reads usefully,
 * and a page whose height changes as chunks arrive keeps invalidating a
 * measured end. A scroll listener has none of those problems and is shorter
 * than the configuration was.
 */
const PageTexture = () => {
  const layer = useRef(null)

  useEffect(() => {
    const node = layer.current
    if (!node) return

    // Parallax is a documented nausea and migraine trigger, so this is a hard
    // gate rather than a softened duration.
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = null

    const update = () => {
      frame = null
      if (motionQuery.matches) {
        node.style.setProperty("--sf-ember-shift", "0px")
        return
      }
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      node.style.setProperty("--sf-ember-shift", `${(progress * DRIFT).toFixed(1)}px`)
    }

    // Coalesced to one write per frame. Scroll fires far more often than the
    // screen refreshes, and writing a style property on every event is the
    // classic way to make a page feel heavier than it is.
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    motionQuery.addEventListener("change", update)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      motionQuery.removeEventListener("change", update)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={layer}
      aria-hidden="true"
      className="sf-page-embers pointer-events-none fixed inset-0 -z-10"
    />
  )
}

export default PageTexture
