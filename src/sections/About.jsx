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
 * Prose and portrait sit side by side; the facts run underneath as a strip.
 * The previous version made prose, portrait and facts three separate columns,
 * which left the prose only five columns to run in and stacked the portrait
 * above the facts in a right-hand column 889px tall against the prose's 476 --
 * 413px of nothing below the text. Measured, not eyeballed.
 *
 * The strip is four across, which is the shape the Moss case study already
 * uses for its measured figures. Reusing it costs nothing and means the site
 * has one way of presenting a short row of labelled values, not two.
 *
 * The version before that had a photo and three stat cards reading "Years
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
        <SectionHeading id="about-heading" title={ABOUT.heading} />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* The measure is capped in ch rather than px. Running text stops
              being comfortable somewhere around 75 characters regardless of
              how wide the column happens to be -- so the column can take seven
              of twelve without the lines getting away from the reader. */}
          <div data-reveal className="flex flex-col gap-6 lg:col-span-7">
            {ABOUT.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="max-w-measure text-lg text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div data-reveal className="lg:col-span-4 lg:col-start-9">
            <img
              src={portrait}
              alt="Slav Lambov in cap and gown at his 2026 Arden University graduation, holding his degree"
              width={720}
              height={900}
              loading="lazy"
              decoding="async"
              className="w-full rounded-lg border border-line"
            />
          </div>
        </div>

        {/* One rule above the strip rather than one above each item. Four
            values in a row read as a set; four separate rules would say they
            are four unrelated things that happen to be adjacent. */}
        <dl
          data-reveal
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 sm:grid-cols-4"
        >
          {ABOUT.facts.map((fact) => (
            <div key={fact.label}>
              {/* Mono on the label only. The design system gives the face to
                  code, figures and technical labels -- a label qualifies, the
                  sentence answering it does not. */}
              <dt className="font-mono text-xs tracking-mono text-ink-muted">{fact.label}</dt>
              <dd className="mt-2 text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default About
