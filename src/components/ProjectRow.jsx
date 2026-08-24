import ProjectStatus from "./ProjectStatus"

/**
 * A project that is not the featured one.
 *
 * A row separated by a hairline, not a card. Cards imply equal weight and a
 * grid of them is the default portfolio layout that says nothing about what is
 * in it. These three are genuinely secondary -- one is not deployed, one is
 * private coursework, one is the page you are reading -- and the layout should
 * say so rather than dress them up to match.
 *
 * Each still gets its real description. Truncating them to a line each would
 * make the honest bits ("the Express API is half-built", "runs locally, not
 * deployed") the first thing cut, which is exactly backwards.
 */
const ProjectRow = ({ project }) => (
  <article className="grid gap-4 border-t border-line py-8 md:grid-cols-12 md:gap-8">
    <div className="md:col-span-4">
      <h3 className="text-lg text-ink">{project.title}</h3>
      <div className="mt-2 flex items-baseline gap-4">
        <ProjectStatus status={project.status} />
        <span className="font-mono text-xs tracking-mono text-ink-muted">
          {project.year}
        </span>
      </div>
    </div>

    <div className="md:col-span-8">
      <p className="text-sm text-ink-muted">{project.description}</p>

      <p className="mt-4 font-mono text-xs tracking-mono text-ink-low">
        {project.technologies.join(" · ")}
      </p>

      {(project.liveUrl || project.githubUrl) && (
        <div className="mt-4 flex flex-wrap gap-6">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm font-semibold text-ink underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-accent"
            >
              Visit the site &#8594;
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm font-semibold text-ink underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-accent"
            >
              Source &#8594;
            </a>
          )}
        </div>
      )}
    </div>
  </article>
)

export default ProjectRow
