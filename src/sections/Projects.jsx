import { useSectionReveal } from "../hooks/useSectionReveal"
import FeaturedProject from "../components/FeaturedProject"
import ProjectCard from "../components/ProjectCard"
import SectionHeading from "../components/SectionHeading"
import { projectsData } from "../constants/index"

// Derived rather than written down, so the heading cannot drift from the list
// the way a hardcoded "4 projects" would the first time one is added.
const liveCount = projectsData.filter((project) => project.status === "live").length
const [featured, ...rest] = projectsData

const Projects = () => {
  const scope = useSectionReveal()

  return (
    <section
      ref={scope}
      id="projects"
      aria-labelledby="projects-heading"
      className="px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-wide">
        <SectionHeading
          id="projects-heading"
          title="The work"
          meta={`${projectsData.length} projects · ${liveCount} live`}
        />

        <div data-reveal className="mt-12">
          <FeaturedProject project={featured} />
        </div>

        {/* Three columns rather than the stacked rows this replaced. The rows
          were the more editorial choice but left most of the width empty, and
          the section that carries the actual evidence should not be the
          thinnest thing on the page. */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
