import { Link } from "react-router"
import ProjectStatus from "./ProjectStatus"
import { primaryAction, secondaryAction } from "../lib/actionStyles"

/**
 * The one project that gets the full treatment.
 *
 * Four identical cards would claim four things of equal weight, and they are
 * not: one of these is deployed, on a custom domain, and a reader can open it
 * in a new tab and use it. That difference is the most persuasive thing on the
 * page, so it is expressed as scale rather than mentioned in a badge and then
 * contradicted by the layout.
 */
const FeaturedProject = ({ project }) => (
  <article className="group/shot grid gap-8 lg:grid-cols-12 lg:gap-12">
    <div className="lg:col-span-7">
      <img
        src={project.image}
        alt={`The ${project.title.split("—")[0].trim()} storefront, showing its product listing`}
        // Explicit dimensions: without them the image has no intrinsic size
        // until it decodes, and the text beside it jumps when it does.
        width={1280}
        height={800}
        loading="lazy"
        decoding="async"
        className="w-full rounded-lg border border-line transition-colors duration-200 group-hover/shot:border-ink-low"
      />
    </div>

    <div className="flex flex-col lg:col-span-5">
      <div className="flex items-baseline gap-4">
        <ProjectStatus status={project.status} />
        <span className="font-mono text-xs tracking-mono text-ink-muted">
          {project.year}
        </span>
      </div>

      <h3 className="mt-4 text-xl text-ink">{project.title}</h3>

      <p className="mt-4 text-ink-muted">{project.description}</p>

      {/* Mono, because a stack is a list of checkable facts. Comma-separated
          rather than a row of pills: eight pills read as eight achievements,
          and this is one sentence's worth of information. */}
      <p className="mt-6 font-mono text-xs tracking-mono text-ink-muted">
        {project.technologies.join(" · ")}
      </p>

      <div className="mt-auto flex flex-wrap gap-3 pt-8">
        {/* The case study is the primary action here, not the live site. A
            reader who opens the shop leaves for someone else's domain; one who
            reads the write-up is still being persuaded. */}
        {project.caseStudyUrl && (
          <Link
            to={project.caseStudyUrl}
            className={primaryAction("sm")}
          >
            Read the case study &#8594;
          </Link>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={secondaryAction("sm")}
          >
            Visit the site &#8594;
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={secondaryAction("sm")}
          >
            Source &#8594;
          </a>
        )}
      </div>
    </div>
  </article>
)

export default FeaturedProject
