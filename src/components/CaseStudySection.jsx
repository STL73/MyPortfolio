/**
 * A titled block within a case study.
 *
 * Extracted rather than left as a local helper in the page: the project keeps
 * one component per file, and a const arrow declared below its own call site
 * relies on the module having finished evaluating before render, which works
 * and reads like a mistake.
 */
const CaseStudySection = ({ title, children }) => (
  <section className="mt-20">
    <h2 className="border-b border-line pb-6 text-2xl text-ink">{title}</h2>
    <div className="mt-8">{children}</div>
  </section>
)

export default CaseStudySection
