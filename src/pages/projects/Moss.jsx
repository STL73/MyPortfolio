import { Link } from "react-router"
import CaseStudySection from "../../components/CaseStudySection"
import ProjectStatus from "../../components/ProjectStatus"
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
          <span className="font-mono text-xs tracking-mono text-ink-muted">
            {moss.year}
          </span>
        </div>

        <h1 className="mt-4 text-3xl text-ink">{moss.title}</h1>
        <p className="mt-3 max-w-measure text-xl text-ink-muted">
          {moss.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={moss.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-all duration-150 hover:-translate-y-0.5 hover:bg-aurora-400 hover:shadow-[0_6px_20px_-6px_var(--sf-aurora-500)]"
          >
            Visit the site &#8594;
          </a>
          <a
            href={moss.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface"
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
          <p
            key={paragraph.slice(0, 32)}
            className="max-w-measure text-lg text-ink-muted"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Measured, not remembered, and sitting a few centimetres from a link
          to the source so anyone can check them. */}
      <dl className="mt-16 grid gap-px border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {moss.figures.map((figure) => (
          <div key={figure.label} className="py-6">
            <dt className="font-mono text-xs tracking-mono text-ink-low">
              {figure.label}
            </dt>
            <dd className="mt-2 font-mono text-sm tracking-mono text-ink">
              {figure.value}
            </dd>
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
        <div className="flex flex-col">
          {moss.decisions.map((decision) => (
            <div
              key={decision.heading}
              className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8"
            >
              <h3 className="text-lg text-ink md:col-span-4">
                {decision.heading}
              </h3>
              <p className="text-ink-muted md:col-span-8">{decision.body}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection title="How it deploys">
        <div className="flex max-w-measure flex-col gap-6">
          {moss.deployment.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
              {paragraph}
            </p>
          ))}
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
