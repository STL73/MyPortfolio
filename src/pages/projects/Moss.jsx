import { Link } from "react-router"
import CaseStudySection from "../../components/CaseStudySection"
import DeepLinkDiagram from "../../components/diagrams/DeepLinkDiagram"
import ModuleBoundaryDiagram from "../../components/diagrams/ModuleBoundaryDiagram"
import ThemeOrderDiagram from "../../components/diagrams/ThemeOrderDiagram"
import ProjectStatus from "../../components/ProjectStatus"
import { primaryAction, secondaryAction } from "../../lib/actionStyles"
import { mossCaseStudy as moss } from "../../constants/moss"

/**
 * The Moss case study.
 *
 * The one project with enough behind it to fill a page. The homepage answers
 * "is this person worth a conversation" in a scroll; this answers "can they
 * explain a decision" for someone who has already decided the first question
 * and wants to check.
 *
 * There is deliberately no second case study yet. WorldQuiz and the Event
 * Portal do not have this much to say, and three thin pages beside one full
 * one make the full one look worse rather than the thin ones look better.
 */
// Named in the data, resolved here. Keeping the mapping in the page is what
// lets the content file stay free of component imports.
const DIAGRAMS = {
  moduleBoundary: ModuleBoundaryDiagram,
  themeOrder: ThemeOrderDiagram,
}

const Moss = () => (
  <article className="px-6 py-24 sm:px-10 lg:px-16">
    <div className="mx-auto max-w-wide">
      <Link
        to="/#projects"
        className="font-mono text-xs tracking-mono text-ink-muted transition-colors duration-150 hover:text-ink"
      >
        &#8592; All work
      </Link>

      <header className="mt-8 border-b border-line pb-10">
        <div className="flex items-baseline gap-4">
          <ProjectStatus status={moss.status} />
          <span className="font-mono text-xs tracking-mono text-ink-muted">{moss.year}</span>
        </div>

        <h1 className="mt-4 text-3xl text-ink">{moss.title}</h1>
        <p className="mt-3 max-w-measure text-xl text-ink-muted">{moss.subtitle}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={moss.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={primaryAction("sm")}
          >
            Visit the site &#8594;
          </a>
          <a
            href={moss.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={secondaryAction("sm")}
          >
            Source &#8594;
          </a>
        </div>
      </header>

      <img
        src={moss.image}
        alt="The Moss storefront, showing the product listing with filter controls"
        width={1280}
        height={800}
        loading="lazy"
        decoding="async"
        className="mt-12 w-full rounded-lg border border-line"
      />

      <div className="mt-12 flex flex-col gap-6">
        {moss.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="max-w-measure text-lg text-ink-muted">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Measured, not remembered, and sitting a few centimetres from a link
          to the source so anyone can check them. */}
      <dl className="mt-16 grid gap-px border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {moss.figures.map((figure) => (
          <div key={figure.label} className="py-6">
            <dt className="font-mono text-xs tracking-mono text-ink-muted">{figure.label}</dt>
            <dd className="mt-2 font-mono text-sm tracking-mono text-ink">{figure.value}</dd>
          </div>
        ))}
      </dl>

      <CaseStudySection title="What it does">
        <ul className="flex max-w-measure list-none flex-col gap-4">
          {moss.built.map((item) => (
            <li key={item.slice(0, 32)} className="text-lg text-ink-muted">
              {item}
            </li>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection title="Decisions worth explaining">
        {/* No inner grid any more. The section already splits heading from
            body, and nesting a second 4/8 split inside it squeezed each
            decision into a third of the page. */}
        <div className="flex flex-col gap-8">
          {moss.decisions.map((decision, index) => {
            const Diagram = DIAGRAMS[decision.diagram]
            return (
              <div
                key={decision.heading}
                className={index === 0 ? "" : "border-t border-line pt-8"}
              >
                <h3 className="text-lg text-ink">{decision.heading}</h3>
                <p className="mt-2 max-w-measure text-ink-muted">{decision.body}</p>
                {/* Only two of the four decisions carry one. A diagram per
                    section would be decoration; these two are the ones a
                    picture explains faster than the paragraph does. */}
                {Diagram && (
                  <div className="mt-6">
                    <Diagram />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CaseStudySection>

      <CaseStudySection title="How it deploys">
        <div className="flex max-w-measure flex-col gap-6">
          {moss.deployment.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
              {paragraph}
            </p>
          ))}
          <div className="mt-2">
            <DeepLinkDiagram />
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection title="What is not built">
        <ul className="flex max-w-measure list-none flex-col gap-4">
          {moss.notBuilt.map((item) => (
            <li key={item.slice(0, 32)} className="text-lg text-ink-muted">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-measure text-lg text-ink-muted">{moss.next}</p>
      </CaseStudySection>
    </div>
  </article>
)

export default Moss
