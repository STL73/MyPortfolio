import SectionHeading from "../components/SectionHeading"
import { cardSurface } from "../lib/surfaceStyles"
import { useSectionReveal } from "../hooks/useSectionReveal"
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
const Skills = () => {
  const scope = useSectionReveal({ stagger: 0.06 })

  return (
  <section
    ref={scope}
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

      <p data-reveal className="mt-8 max-w-measure text-lg text-ink-muted">
        {SKILLS.note}
      </p>

      {/* Cards rather than rows, and the same card the projects section uses.
          A card here and a card there are the same kind of object, so they get
          one definition -- the difference between the sections comes from
          content and scale, not from each inventing its own container. */}
      <dl className="mt-12 grid gap-4 md:grid-cols-2">
        {SKILLS.tiers.map((tier) => (
          <div key={tier.id} data-reveal className="flex">
            {/* The gaps tier is the accented one. It is the block that makes
                the other three believable, so it is the block that should draw
                the eye -- and it is the only one accented, because emphasis on
                everything is emphasis on nothing. */}
            <div
              className={`w-full ${cardSurface({ accented: tier.id === "learning" })}`}
            >
              <dt>
                <span className="text-lg text-ink">{tier.label}</span>
                <span className="mt-1 block text-sm text-ink-muted">
                  {tier.note}
                </span>
              </dt>

              {/* Mono, and separated by middots rather than set as pills. Pills
                  read as badges -- eight of them look like eight awards, which
                  is the opposite of what tiering this list is for. */}
              <dd className="mt-4 font-mono text-sm tracking-mono text-ink-muted">
                {tier.items.join(" · ")}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  </section>
  )
}

export default Skills
