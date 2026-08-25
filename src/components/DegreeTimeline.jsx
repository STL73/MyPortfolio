import { useRef, useState } from "react"

/**
 * The degree levels, as one horizontal timeline.
 *
 * Four of them since the transcript was read: the foundation year was missing
 * from the site while the degree still claimed to start in 2021. The column
 * count is therefore data, not a layout constant -- it is passed to CSS as
 * `--sf-timeline-count` rather than written as a `md:grid-cols-3` utility,
 * which would have quietly stacked the fourth level on top of the third.
 *
 * Ordinal labels earn their keep here in a way they would not anywhere else on
 * this site: Level 6 genuinely cannot precede Level 4, so left-to-right carries
 * information rather than decorating a list. The order is chronological, which
 * means the data -- stored newest first, as everything else on the site is --
 * gets reversed on the way in.
 *
 * The rule is ONE element spanning the whole component, not a segment per
 * level. Drawn per level, the pointer glow lit all three at once, because each
 * segment carried its own gradient and the hover state was on their shared
 * parent. One rule, one gradient, one position.
 *
 * The spark travels along it and decides what is open. Where it sits is the
 * pointer's x as a percentage, written straight to the node rather than held in
 * state -- this fires every frame, and re-rendering to move a gradient would be
 * an absurd amount of React for a decoration. Which level is expanded IS state,
 * because it changes rarely and drives real content.
 *
 * With no pointer the spark parks just before the start of the line, which
 * still puts the accent on the section before anyone interacts with it. It
 * parked on the right at first, and pointing at the first level then sent it
 * sliding the entire width of the screen -- a long journey to answer a small
 * gesture, and it read as the decoration having a mind of its own rather than
 * following the hand.
 *
 * The spark is 40px because below that its two lower arms collapse and it reads
 * as a plain triangle. That number is measured, and the same failure is on
 * record in the design system from an earlier draft of the mark.
 *
 * Deliberately not a pulse. A pulsing dot was tried on the project status and
 * removed ("give the Live status a dot, and keep it still"): perpetual motion
 * with nothing to report pulls the eye off the thing being read. Everything
 * here moves only while someone is pointing at it.
 *
 * Expansion is pointer position AND click AND keyboard focus. Pointer alone
 * would hide every topic from every phone and from anyone on a keyboard, so
 * each level is a real button with `aria-expanded` and the travelling spark is
 * an enhancement layered over the top.
 *
 * Below `md` none of the horizontal apparatus exists. The grid stacks to one
 * column there, so a traveller sliding left to right has nothing to travel
 * along -- and parked, it hung 16px off the left edge of a 375px screen. The
 * spark and the single rule are hidden, and each level takes its own top
 * border instead, which is what gives the stacked list its separators.
 */
const DegreeTimeline = ({ levels }) => {
  // Pinned open by click or keyboard -- the interactions the pointer cannot
  // express. Kept separate from the hover index so a click survives the
  // pointer moving away.
  const [openId, setOpenId] = useState(null)
  // Which level the spark is currently over, or null when it is parked.
  const [activeIndex, setActiveIndex] = useState(null)
  const root = useRef(null)

  // Chronological, oldest first. A timeline that runs newest-to-oldest reads
  // backwards no matter how it is labelled.
  const inOrder = [...levels].reverse()

  const handlePointerMove = (event) => {
    const box = root.current?.getBoundingClientRect()
    if (!box) return
    const ratio = Math.min(Math.max((event.clientX - box.left) / box.width, 0), 1)
    root.current.style.setProperty("--sf-timeline-x", `${(ratio * 100).toFixed(2)}%`)
    // Which level the spark is over. `min` guards the exact right-hand edge,
    // where ratio is 1 and the floor would index past the last level.
    setActiveIndex(Math.min(Math.floor(ratio * inOrder.length), inOrder.length - 1))
  }

  const handlePointerLeave = () => {
    root.current?.style.removeProperty("--sf-timeline-x")
    setActiveIndex(null)
  }

  return (
    <div
      ref={root}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-tracking={activeIndex !== null}
      style={{ "--sf-timeline-count": inOrder.length }}
      className="sf-timeline relative md:pt-10"
    >
      {/* One rule, full width. Horizontal only -- stacked, each level
          draws its own separator instead. */}
      <span
        aria-hidden
        className="sf-timeline-rule absolute inset-x-0 top-10 hidden h-px bg-line md:block"
      />

      {/* The traveller. Parked at the right until a pointer arrives. */}
      <svg
        aria-hidden
        focusable="false"
        viewBox="38.74 18 22.52 19.5"
        className="sf-timeline-spark absolute top-10 hidden h-10 w-10 fill-accent md:block"
      >
        <path d="M50 18 Q50 31 61.26 37.5 Q50 31 38.74 37.5 Q50 31 50 18 Z" />
      </svg>

      <ol className="sf-timeline-track grid list-none">
        {inOrder.map((level, index) => {
          const isOpen = openId === level.id || activeIndex === index
          return (
            <li key={level.id} className="group relative border-t border-line md:border-t-0">
              {/* A stop on the line, marking where each level begins. Quiet --
                  the accent on this component is the spark, and a row of
                  aurora dots underneath it would be competing with it. */}
              <span
                aria-hidden
                className="absolute top-0 left-0 size-1.5 -translate-y-1/2 rounded-full bg-ink-muted"
              />

              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(openId === level.id ? null : level.id)}
                className="w-full cursor-pointer pt-6 pr-4 pb-6 text-left"
              >
                {/* Stacked only. The spark is what says "these open" on a wide
                    screen, and it is hidden below `md` -- which left four
                    titles on a phone with their modules behind a tap and
                    nothing at all to suggest the tap existed. A chevron is the
                    cheapest honest signpost; it rotates rather than swapping
                    glyph, so nothing reflows. */}
                <svg
                  aria-hidden
                  focusable="false"
                  viewBox="0 0 10 6"
                  className={`absolute top-7 right-0 size-2.5 stroke-ink-muted transition-transform duration-300 md:hidden ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  strokeWidth="1.5"
                >
                  <path d="M1 1.25 5 4.75 9 1.25" />
                </svg>

                <span className="block font-mono text-xs tracking-mono text-ink-muted">
                  {level.period}
                </span>
                <span className="mt-2 block text-ink">{level.title}</span>
                <span className="mt-1 block font-mono text-xs tracking-mono text-ink-muted">
                  {level.type}
                </span>

                {/* 0fr to 1fr rather than max-height, so it animates to the
                    content's real height instead of a guessed ceiling. The
                    inner element needs `min-h-0` or the row refuses to
                    collapse below min-content and the panel never closes.

                    None of these are properties `useSectionReveal` animates --
                    opacity, transform and visibility are its territory, and a
                    CSS transition on any of those has already blanked three
                    separate blocks on this site. */}
                <span
                  data-open={isOpen}
                  className="mt-4 grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-focus-within:grid-rows-[1fr] data-[open=true]:grid-rows-[1fr] motion-reduce:transition-none"
                >
                  <span className="min-h-0 overflow-hidden">
                    <span className="flex flex-col gap-1.5 pb-1 text-sm text-ink-muted">
                      {level.topics.map((topic) => (
                        <span key={topic} className="block">
                          {topic}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default DegreeTimeline
