import { useOverflowX } from "../hooks/useOverflowX"
import { cardSurface } from "../lib/surfaceStyles"

/**
 * The floor the diagrams are allowed to shrink to, in rem.
 *
 * Every diagram is authored on a canvas 700-760 units wide and rendered
 * `w-full`, so its on-screen label size is `fontSize x containerWidth /
 * viewBoxWidth`. That is fine while the container is wide and catastrophic
 * when it is not: measured at a 375px viewport the container came out 277px,
 * which divided the authored 9-12 unit labels down to **3.3-4.4px**. The
 * caption beside them stayed at 12px, which is how the mismatch got noticed --
 * but the caption was never the problem, it was the only legible thing left.
 *
 * 48rem puts the widest canvas (760) at 1.01x and the narrowest (700) at
 * 1.10x, so the smallest label lands at 9.1px against the 10.6px it gets on a
 * desktop. Close enough that a phone reader sees what a laptop reader sees.
 * Below that width the figure scrolls sideways instead of scaling down.
 *
 * Shrinking the caption to match would have made the figure internally
 * consistent and still unreadable.
 */
const MIN_DIAGRAM_WIDTH = "min-w-[48rem]"

/**
 * A diagram, presented as a figure rather than as loose SVG in the prose.
 *
 * Three things it fixes, all of which were real on the Moss page:
 *
 * One scale. Two of the three diagrams sat in the 8-column content area and
 * one sat inside a `max-w-measure` wrapper -- 64ch, about 576px -- which
 * rendered its labels at 8px against the others' 13.5px. Nothing was wrong
 * with the authored sizes; they were being divided by three different numbers.
 * Every diagram now goes through here, and here has one width.
 *
 * A boundary. A bordered surface says where the diagram starts and stops. Set
 * loose between paragraphs it reads as an interruption in the prose instead of
 * an object the prose refers to.
 *
 * A caption. The figure number gives the paragraph something to point at, and
 * the caption states the finding rather than naming the parts -- a reader who
 * looks only at the pictures should still come away with the argument.
 *
 * @param {object} props
 * @param {number} props.number   Figure number, sequential down the page.
 * @param {string} props.caption  What the diagram shows -- the point, not the parts.
 * @param {boolean} [props.framed]
 *   Draws the panel. Off gives caption and spacing only, which is lighter and
 *   leaves the boundary soft; it exists so the two can be compared in /lab.
 */
const CaseStudyFigure = ({ number, caption, framed = true, children }) => {
  const [scrollRef, scrollable] = useOverflowX()

  return (
    // The cap is the whole point of the wrapper. An SVG with a viewBox and no
    // width fills whatever it is given, and these are authored on a canvas about
    // 720 units wide -- handed the full 12 columns they scale to 1.85x and the
    // labels come out larger than the body copy, which reads as a mistake in the
    // other direction. The article width puts a 720-unit canvas at roughly
    // 1.3x -- labels near 13px, matching the two that already looked right.
    <figure className={`w-full max-w-article ${framed ? `${cardSurface()} sm:p-8` : ""}`}>
      {/*
      A scroll container rather than a smaller drawing.

      The tab stop is conditional, and only for as long as there is something
      to scroll: a scrolling region unreachable by keyboard puts its content
      out of reach of anyone without a pointer (WCAG 2.1.1), but a permanent
      `tabIndex` would leave three stops on the desktop page that do nothing
      when focused. An element given a tab stop also needs a role and a name,
      or a screen reader announces an unlabelled stop -- so the three
      attributes travel together or not at all. The SVG keeps its own
      `role="img"` and description either way, and that is what gets read.

      There is deliberately no "swipe" hint. A diagram cut off mid-arrow at the
      frame edge already says it continues, the scrollbar says it again, and
      three hint lines down one page would cost more attention than they
      return.
    */}
      <div
        ref={scrollRef}
        className="overflow-x-auto"
        {...(scrollable ? { tabIndex: 0, role: "group", "aria-label": `Figure ${number}` } : {})}
      >
        <div className={MIN_DIAGRAM_WIDTH}>{children}</div>
      </div>

      <figcaption className="mt-5 font-mono text-xs tracking-mono text-ink-muted">
        Fig {number} &#183; {caption}
      </figcaption>
    </figure>
  )
}

export default CaseStudyFigure
