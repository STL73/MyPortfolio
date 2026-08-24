import { useRef } from "react"

/**
 * Two career tracks drawn as parallel lanes.
 *
 * This is the page's signature element and the only place its boldness is
 * spent. It says the thing a CV buries: the computing track started inside the
 * working one and neither has stopped. A reader takes that in a glance, where
 * the same fact written as prose takes a paragraph nobody reads.
 *
 * It rhymes with the Spireforge mark -- lines meeting, a spark above -- which
 * is deliberate. It is not the mark, and it must not become it: the design
 * system forbids tiling the logo, and a page that repeats its own logo as
 * decoration stops registering it in the header where it matters.
 *
 * The lanes are decorative; the labels and figures are real text, so a screen
 * reader gets "retail & warehouse management, 13 years" and reads the same
 * information the rules encode visually.
 */
const CareerTracks = ({ tracks }) => {
  const root = useRef(null)

  // The pointer's x position, as a percentage across the tracks, handed to CSS
  // as a custom property. Written straight to the node rather than held in
  // state: this fires on every pointermove, and a re-render per frame to move
  // a gradient would be an absurd amount of React for a decoration.
  const handlePointerMove = (event) => {
    const box = root.current?.getBoundingClientRect()
    if (!box) return
    const ratio = (event.clientX - box.left) / box.width
    root.current.style.setProperty("--sf-track-x", `${(ratio * 100).toFixed(2)}%`)
  }

  return (
    <div
      ref={root}
      onPointerMove={handlePointerMove}
      className="sf-tracks relative w-full max-w-xl"
    >
      <ul className="flex list-none flex-col gap-6">
        {tracks.map((track) => (
          // The offset indents the label and the figure along with the rule.
          // Indenting the rule alone was the first attempt and it read as a
          // mistake: "computing" sat at the far left above empty space, with
          // nothing tying it to a line starting halfway across.
          // The indent halves on narrow screens. At 375px a 46% indent leaves
          // about 150px for "computing" and its figure, which fits by a hair and
          // reads as cramped. Half of it keeps the lane visibly starting inside
          // the other one, which is the only thing the offset has to say.
          <li
            key={track.id}
            style={{ "--track-offset": `${track.offset}%` }}
            className="ml-[calc(var(--track-offset)/2)] sm:ml-[var(--track-offset)]"
          >
            <div className="mb-2 flex items-baseline justify-between gap-4" data-hero="track-meta">
              <span className="text-sm text-ink-muted">{track.label}</span>
              {/* Mono means verifiable. Both of these are figures a reader
                could check, which is the whole rule for the face. */}
              <span className="font-mono text-xs tracking-mono text-ink-muted">{track.figure}</span>
            </div>

            <div
              data-hero="track-rule"
              className={`sf-track-rule h-px origin-left ${
                // The newer track is drawn brighter. text-low is a non-text
                // token -- legal for rules, never for body copy.
                track.offset > 0 ? "bg-ink-low" : "bg-line"
              }`}
            />
          </li>
        ))}
      </ul>

      {/* The spark, at the far end of both lanes. Aurora appears once on this
        page and this is it: the accent belongs on the smallest element, and
        filling anything larger tips the whole system over.

        The path is copied verbatim from the design system rather than drawn
        by eye. Its waist sits at a quarter of the outer radius, which is what
        makes the three arms register as points instead of a blunt triangle --
        a value that is invisible until it is wrong.

        The path is authored against a 100x100 mark grid but occupies only
        x 38.74-61.26, y 18-37.5 of it, so the viewBox is cropped to those
        bounds. The full grid would render it as a speck in one corner.

        40px, and the size was measured rather than picked. Rendered side by
        side at 16, 24, 32, 40 and 48, the two lower arms collapse into a
        flared base at 32 and below and the shape reads as a plain triangle --
        the exact failure the design system records from an earlier draft of
        the mark, which survived several rounds of review before anyone caught
        it. It holds from about 40 up.

        That is more aurora than a 16px dot, and it is still within the rules:
        the system names "the spark" as a sanctioned use of the accent, and the
        call to action below is a far larger area of it. What the rule forbids
        is aurora behind body copy or as a second hue, neither of which this
        is. */}
      <svg
        data-hero="spark"
        className="absolute -right-2 -bottom-9 h-10 w-10 fill-accent"
        viewBox="38.74 18 22.52 19.5"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M50 18 Q50 31 61.26 37.5 Q50 31 38.74 37.5 Q50 31 50 18 Z" />
      </svg>
    </div>
  )
}

export default CareerTracks
