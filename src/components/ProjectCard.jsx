import ProjectStatus from "./ProjectStatus"

/**
 * One of the projects that is not the featured one.
 *
 * Cards rather than the hairline rows this replaced, chosen from the variants
 * lab. They fill the width the rows left empty and give the section something
 * to look at, and unlike the peek-and-expand alternative they hide nothing:
 * every description is fully readable without touching anything, which matters
 * because hover does not exist on a phone and a recruiter skimming on a train
 * would otherwise see three titles and no content.
 *
 * The hover lift is 4px and the border lights in accent. It is not a scale --
 * `hover:scale-105` on every card in a grid is one of the clearest signs of a
 * page assembled without a point of view.
 *
 * The scroll reveal is deliberately on a wrapper in Projects.jsx rather than on
 * this element. GSAP animates transform for the reveal and this element
 * transitions transform for the hover; the same two systems owning the same
 * property is what has already left three project rows and both hero buttons
 * permanently invisible. One element, one owner.
 */
const ProjectCard = ({ project }) => (
  <article
    className="group flex h-full w-full flex-col rounded-md border border-line bg-night-700/40 p-6 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-accent/50"
  >
    <div className="flex items-baseline gap-4">
      <ProjectStatus status={project.status} />
      <span className="font-mono text-xs tracking-mono text-ink-muted">{project.year}</span>
    </div>

    <h3 className="mt-3 text-lg text-ink transition-colors duration-200 group-hover:text-accent">
      {project.title}
    </h3>

    <p className="mt-3 text-sm text-ink-muted">{project.description}</p>

    {/* mt-auto pins the stack to the bottom so the cards' technology lines and
        links align across the row however unequal the descriptions are. */}
    <p className="mt-auto pt-6 font-mono text-xs tracking-mono text-ink-muted">
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
  </article>
)

export default ProjectCard
