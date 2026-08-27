import { useEffect, useRef, useState } from "react"

/**
 * Reports whether an element's content is wider than the element.
 *
 * This exists so a scroll container can be given a tab stop only when it has
 * something to scroll. A region that scrolls must be reachable by keyboard or
 * its content is unreachable without a pointer (WCAG 2.1.1) -- but the case
 * study's figures only overflow below roughly 820px, and a permanent
 * `tabIndex` would put three tab stops on the desktop page that do nothing
 * when focused. Chrome 127+ and Firefox now focus scrollers natively; Safari
 * does not, so the attribute still has to be set, just not always.
 *
 * A ResizeObserver rather than a resize listener: the container changes width
 * when the grid around it does, which a window event does not always
 * accompany, and the child changes width when a font swaps in after load.
 * Both are watched.
 *
 * @returns {[import("react").RefObject<HTMLElement>, boolean]}
 *   The ref to attach, and whether it currently overflows.
 */
export const useOverflowX = () => {
  const ref = useRef(null)
  const [overflowing, setOverflowing] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    // A pixel of tolerance. Both properties are integers rounded from
    // fractional layout, so a container that fits its content exactly can
    // still report a 1px difference and claim to scroll.
    const measure = () => setOverflowing(element.scrollWidth - element.clientWidth > 1)

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(element)
    if (element.firstElementChild) observer.observe(element.firstElementChild)

    return () => observer.disconnect()
  }, [])

  return [ref, overflowing]
}
