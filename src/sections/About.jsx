import SectionHeading from "../components/SectionHeading"
import { ABOUT } from "../constants/index"

/**
 * The section that explains the hero.
 *
 * The hero makes a claim in four words; this is where it is evidenced, in the
 * order a sceptical reader would ask for it: what the thirteen years actually
 * were, when the degree happened and under what conditions, what that is and
 * is not worth, and what the ask is.
 *
 * Prose gets the wide column and the facts get the narrow one. The previous
 * version had this the other way round -- a photo and three stat cards reading
 * "Years experience" above a couple of sentences -- and it managed to say
 * nothing about a thirteen-year career while taking up half a screen.
 */
const About = () => (
  <section
    id="about"
    aria-labelledby="about-heading"
    className="px-6 py-24 sm:px-10 lg:px-16"
  >
    <div className="mx-auto max-w-wide">
      <SectionHeading
        id="about-heading"
        title={ABOUT.heading}
        meta={ABOUT.meta}
      />

      {/* Flex rather than a twelve-column grid, and the two columns sit
          together on the left rather than pushing apart to the edges.

          On a grid the prose column is capped by its measure and the facts
          were pinned to the far right, which left a few hundred pixels of dead
          space between two things that belong next to each other. Left-
          weighted with the right side open is also what the hero does, so the
          emptiness reads as the page's shape rather than as a gap. */}
      <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:gap-20">
        {/* The measure is capped in ch rather than px. Running text stops
            being comfortable somewhere around 75 characters regardless of how
            wide the column happens to be. */}
        <div className="flex max-w-measure flex-col gap-6">
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="flex shrink-0 flex-col gap-6 lg:w-64">
          {ABOUT.facts.map((fact) => (
            <div key={fact.label} className="border-t border-line pt-4">
              {/* Mono on the label only. The design system gives the face to
                  code, figures and technical labels -- a label qualifies, the
                  sentence answering it does not. */}
              <dt className="font-mono text-xs tracking-mono text-ink-low">
                {fact.label}
              </dt>
              <dd className="mt-1 text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
)

export default About
