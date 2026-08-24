import FeaturedProject from "../components/FeaturedProject"
import ProjectRow from "../components/ProjectRow"
import SectionHeading from "../components/SectionHeading"
import { projectsData } from "../constants/index"

// Derived rather than written down, so the heading cannot drift from the list
// the way a hardcoded "4 projects" would the first time one is added.
const liveCount = projectsData.filter((project) => project.status === "live").length
const [featured, ...rest] = projectsData

const Projects = () => (
  <section
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

      <div className="mt-12">
        <FeaturedProject project={featured} />
      </div>

      <div className="mt-16">
        {rest.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  </section>
)

export default Projects
