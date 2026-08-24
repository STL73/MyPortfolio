import SectionHeading from "../components/SectionHeading"
import { useSectionReveal } from "../hooks/useSectionReveal"
import portrait from "../assets/images/slav-portrait.webp"
import { ABOUT } from "../constants/index"

/**
 * The section that explains the hero.
 *
 * The hero makes a claim in four words; this is where it is evidenced, in the
 * order a sceptical reader would ask for it: what the thirteen years actually
 * were, when the degree happened and under what conditions, what that is and
 * is not worth, and what the ask is.
 *
 * Prose gets the wide column; the portrait and the facts share the narrow one.
 * The previous version had a photo and three stat cards reading "Years
 * experience" above a couple of sentences, and managed to say nothing about a
 * thirteen-year career while filling half a screen.
 *
 * The portrait is the graduation one on purpose. It is not decoration and it
 * is not a headshot for its own sake -- the page's central claim is a First
 * Class degree earned while working full time, and this is a photograph of
 * exactly that. Cap, hood and scroll are the evidence; cropping them out for a
 * tighter headshot would throw away the only reason to include a picture.
 */
const About = () => {
  const scope = useSectionReveal()

  return (
    <section
      ref={scope}
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

        {/* Left-weighted with the right side open, which is the shape the hero
            sets. Pushing the two columns to opposite edges left a few hundred
            pixels of dead space between things that belong next to each other. */}
        <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* The measure is capped in ch rather than px. Running text stops
              being comfortable somewhere around 75 characters regardless of
              how wide the column happens to be. */}
          <div data-reveal className="flex max-w-measure flex-col gap-6">
            {ABOUT.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div data-reveal className="flex shrink-0 flex-col gap-8 lg:w-72">
            <img
              src={portrait}
              alt="Slav Lambov in cap and gown at his 2026 Arden University graduation, holding his degree"
              width={720}
              height={900}
              loading="lazy"
              decoding="async"
              className="w-full max-w-72 rounded-lg border border-line"
            />

            <dl className="flex flex-col gap-6">
              {ABOUT.facts.map((fact) => (
                <div key={fact.label} className="border-t border-line pt-4">
                  {/* Mono on the label only. The design system gives the face
                      to code, figures and technical labels -- a label
                      qualifies, the sentence answering it does not. */}
                  <dt className="font-mono text-xs tracking-mono text-ink-low">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
