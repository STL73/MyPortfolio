/**
 * A titled block within a case study.
 *
 * The heading sits in its own left column with the content beside it, rather
 * than above it across the full width. Stacked, the content was capped at a
 * reading measure under a full-width heading, which left the right half of
 * every section empty and made the page look like it had lost something.
 *
 * The two-column form is the standard shape for documentation and case
 * studies for a reason: the heading stays beside the passage it names as you
 * read down, the measure stays comfortable, and the block spans the page
 * without anything being invented to fill it.
 *
 * Extracted rather than left as a local helper in the page: the project keeps
 * one component per file, and a const arrow declared below its own call site
 * relies on the module having finished evaluating before render, which works
 * and reads like a mistake.
 */
const CaseStudySection = ({ title, children }) => (
  <section className="mt-20 grid gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12">
    <h2 className="text-2xl text-ink lg:col-span-3">{title}</h2>
    <div className="lg:col-span-8 lg:col-start-5">{children}</div>
  </section>
)

export default CaseStudySection
