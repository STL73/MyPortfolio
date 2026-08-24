import SectionHeading from "../components/SectionHeading"
import { SKILLS } from "../constants/index"

/**
 * Skills, in tiers rather than as a wall of logos.
 *
 * The previous version was a scrolling marquee of framework icons. A marquee
 * says nothing a reader can act on -- every logo carries identical weight, so
 * "used it once in a tutorial" and "built and shipped it" look the same, and
 * the whole thing moves so it cannot even be scanned. Worse for someone
 * changing careers, where the entire question is which is which.
 *
 * The fourth tier names the gaps. It is the most valuable block on the page:
 * it is what makes the other three tiers credible, and it is the answer to a
 * question an interviewer was going to ask anyway.
 */
const Skills = () => (
  <section
    id="skills"
    aria-labelledby="skills-heading"
    className="px-6 py-24 sm:px-10 lg:px-16"
  >
    <div className="mx-auto max-w-wide">
      <SectionHeading
        id="skills-heading"
        title={SKILLS.heading}
        meta={`${SKILLS.tiers.length} tiers`}
      />

      <p className="mt-8 max-w-measure text-lg text-ink-muted">{SKILLS.note}</p>

      <dl className="mt-12">
        {SKILLS.tiers.map((tier) => (
          <div
            key={tier.id}
            className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8"
          >
            <dt className="md:col-span-4">
              <span className="text-lg text-ink">{tier.label}</span>
              <span className="mt-1 block text-sm text-ink-low">{tier.note}</span>
            </dt>

            {/* Mono, and separated by middots rather than set as pills. Pills
                read as badges -- eight of them look like eight awards, which
                is the opposite of what tiering this list is for. */}
            <dd className="font-mono text-sm tracking-mono text-ink-muted md:col-span-8">
              {tier.items.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
)

export default Skills
