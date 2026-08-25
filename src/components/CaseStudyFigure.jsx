import { cardSurface } from "../lib/surfaceStyles"

/**
 * A diagram, presented as a figure rather than as loose SVG in the prose.
 *
 * Three things it fixes, all of which were real on the Moss page:
 *
 * One scale. Every diagram is authored in viewBox units and rendered
 * `w-full`, so its on-screen text size is `fontSize x containerWidth /
 * viewBoxWidth`. Two of the three sat in the 8-column content area and one sat
 * inside a `max-w-measure` wrapper -- 64ch, about 576px -- which rendered its
 * labels at 8px against the others' 13.5px. Nothing was wrong with the
 * authored sizes; they were being divided by three different numbers. Every
 * diagram now goes through here, and here has one width.
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
const CaseStudyFigure = ({ number, caption, framed = true, children }) => (
  // The cap is the whole point of the wrapper. An SVG with a viewBox and no
  // width fills whatever it is given, and these are authored on a canvas about
  // 720 units wide -- handed the full 12 columns they scale to 1.85x and the
  // labels come out larger than the body copy, which reads as a mistake in the
  // other direction. The article width puts a 720-unit canvas at roughly
  // 1.3x -- labels near 13px, matching the two that already looked right.
  <figure className={`w-full max-w-article ${framed ? `${cardSurface()} sm:p-8` : ""}`}>
    {children}
    <figcaption className="mt-5 font-mono text-xs tracking-mono text-ink-muted">
      Fig {number} &#183; {caption}
    </figcaption>
  </figure>
)

export default CaseStudyFigure
