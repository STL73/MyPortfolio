import SectionHeading from "../components/SectionHeading"
import { cardSurface } from "../lib/surfaceStyles"
import { SKILL_ICONS } from "../lib/skillIcons"
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
 *
 * Items are pills with brand marks, which is close to the logo wall this
 * section replaced and is not the same thing: a marquee gave every logo equal
 * weight and moved so it could not be read, where these sit inside a named
 * tier that says how well each is known. The mark is an aid to scanning, not
 * the claim.
 *
 * The gaps tier carries no marks at all. Two of its four -- ORMs and REST APIs
 * -- are concepts with no logo to carry, and a row where half the pills have a
 * symbol and half do not reads as broken assets. Dropping them from that tier
 * entirely turns an inconsistency into a distinction: marks mean tools, no
 * marks mean things being learned.
 *
 * Cards stretch to the row rather than sizing to their content, so the four
 * end level. That is a deliberate trade and it is not free: the gaps tier holds
 * four items against the others' six to nine, so it carries the slack. Sized to
 * content instead, the four cards ended at three different heights and the grid
 * read as ragged -- which was judged the worse of the two.
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
        {SKILLS.tiers.map((tier) => {
          // The gaps tier is the accented one. It is the block that makes the
          // other three believable, so it is the block that should draw the
          // eye -- and it is the only one accented, because emphasis on
          // everything is emphasis on nothing.
          const isGaps = tier.id === "learning"
          return (
            <div key={tier.id} data-reveal className="flex">
              <div className={`w-full ${cardSurface({ accented: isGaps })}`}>
                <dt>
                  <span className="text-lg text-ink">{tier.label}</span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    {tier.note}
                  </span>
                </dt>

                <dd className="mt-4 flex flex-wrap gap-2">
                  {tier.items.map((item) => {
                    const Icon = isGaps ? null : SKILL_ICONS[item]
                    return (
                      <span
                        key={item}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-sm tracking-mono ${
                          isGaps
                            ? "border-accent/40 text-accent"
                            : // border-line measured 1.2:1 against this fill --
                              // no visible edge at all. This clears the 3:1
                              // floor for a non-text boundary.
                              "border-ink-muted/60 bg-night-600/30 text-ink-muted"
                        }`}
                      >
                        {Icon && <Icon className="size-3.5 shrink-0" aria-hidden />}
                        {item}
                      </span>
                    )
                  })}
                </dd>
              </div>
            </div>
          )
        })}
      </dl>
    </div>
  </section>
  )
}

export default Skills
