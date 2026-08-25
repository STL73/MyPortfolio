import { useEffect, useState } from "react"

/**
 * The sticky left rail of a case study: the measured figures, and an index of
 * the sections with the current one marked.
 *
 * It exists because of a measurement rather than a preference. Every homepage
 * section fills its frame edge to edge -- all of them are multi-column grids --
 * while the case study was a single column and left 401px of dead space beside
 * a diagram and 801px beside plain text, which is 55% of the page. Three
 * rounds of alignment work did not touch that, because alignment was never the
 * problem: one column in a two-column frame cannot fill it.
 *
 * A rail was chosen over margin notes and over setting each figure beside its
 * prose because it is the only one of the three that costs nothing per case
 * study. Margin notes need a sentence written for every section of every page;
 * a figure-beside-prose layout needs a figure or a pull quote for every section
 * or it collapses back to a half-empty row. This needs a few facts and a list
 * of headings, which every case study has by definition.
 *
 * Sticky, so it stays beside the text the whole way down instead of leaving
 * the gap it was added to close. Below `lg` it stacks above the document and
 * stops being sticky, because a rail pinned beside nothing is just a rail.
 */
const CaseStudyRail = ({ figures, sections }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id)

  useEffect(() => {
    // Reduce the viewport to a band near the top, so "current" means the
    // section whose start you have most recently passed rather than whichever
    // one happens to cover the most pixels. Without the bottom inset a tall
    // section stays marked while the next heading is already on screen.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-96px 0px -70% 0px" },
    )

    sections.forEach(({ id }) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <div className="flex flex-col gap-8 lg:sticky lg:top-24">
      {/* Measured, not remembered, and a few centimetres from a link to the
          source so anyone can check them. They were a four-across row under
          the intro; in the rail they read as the project's vital signs and
          stay on screen while you read the thing they describe. */}
      <dl className="flex flex-col gap-4">
        {figures.map((figure) => (
          <div key={figure.label} className="border-t border-line pt-3">
            <dt className="font-mono text-xs tracking-mono text-ink-muted">{figure.label}</dt>
            <dd className="mt-1 font-mono text-sm tracking-mono text-ink">{figure.value}</dd>
          </div>
        ))}
      </dl>

      {/* Desktop only. Stacked, the rail sits below the document, and an
          index of what you have already scrolled past is furniture. */}
      <nav aria-label="On this page" className="hidden border-t border-line pt-4 lg:block">
        <span className="font-mono text-xs tracking-caps text-ink-muted uppercase">
          On this page
        </span>
        <ul className="mt-3 flex list-none flex-col gap-2">
          {sections.map(({ id, title }) => {
            const isCurrent = id === activeId
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isCurrent ? "true" : undefined}
                  className={`text-sm transition-colors duration-150 ${
                    isCurrent ? "text-accent" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default CaseStudyRail
