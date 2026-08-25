import SectionHeading from "./SectionHeading"

/**
 * A titled block within a case study.
 *
 * The heading is `SectionHeading` -- the same component every homepage section
 * uses, rule and aurora tab included. It is here because it was missing: the
 * case study was the only page not using it, which is most of why that page
 * read as having less colour than the rest of the site. Reusing it also means
 * a change to the heading treatment lands everywhere at once, which was the
 * argument for extracting it in the first place.
 *
 * Children are given the full article width rather than a reading measure,
 * because two different things go in here and they want different widths: a
 * passage of prose caps at `max-w-measure` and centres, while a figure fills
 * the article edge to edge. Deciding that per block at the call site is
 * clearer than a prop, and it is why this component does not impose a width.
 *
 * The previous version split heading and body into a 3/8 grid. It read well
 * with the heading beside the passage, but below the heading the left third
 * was dead space for the whole height of the section -- so every section had a
 * column of nothing down its left side.
 */
const CaseStudySection = ({ title, meta, children }) => (
  <section className="mt-20">
    <SectionHeading title={title} meta={meta} />
    <div className="mt-10">{children}</div>
  </section>
)

export default CaseStudySection
