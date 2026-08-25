import CertificateLink from "../components/CertificateLink"
import DegreeTimeline from "../components/DegreeTimeline"
import SectionHeading from "../components/SectionHeading"
import { useSectionReveal } from "../hooks/useSectionReveal"
import {
  certificatesData,
  degreeLevels,
  educationData,
} from "../constants/index"

const [degree, ...priorEducation] = educationData

/**
 * Education, and the paperwork that backs it.
 *
 * The degree gets the weight and the four levels sit under it as a sequence,
 * which is the one place on this site where ordinal labels earn their keep:
 * Level 6 genuinely cannot precede Level 4, so the order carries information
 * rather than decorating a list.
 *
 * The levels run the full width rather than sharing the twelve-column grid
 * with the certificates. As a stacked list they fitted seven columns; as four
 * side-by-side stops carrying module names they do not, and squeezing them
 * would have broken every second line.
 *
 * The certificates are real files rather than a claim that they exist. For
 * someone whose strongest evidence is graded coursework, a reader being able
 * to open the transcript is worth more than another paragraph asserting the
 * grade.
 */
const Education = () => {
  const scope = useSectionReveal()

  return (
  <section
    ref={scope}
    id="education"
    aria-labelledby="education-heading"
    className="px-6 py-24 sm:px-10 lg:px-16"
  >
    <div className="mx-auto max-w-wide">
      {/* The mark takes the accent and the rest of the line does not. The
          design system names "a single figure" as a sanctioned use, and this
          is the strongest single figure on the site -- it was rendering in the
          same muted grey as the year beside it. */}
      <SectionHeading
        id="education-heading"
        title="Education"
        meta={
          <>
            First Class &#183; <span className="text-accent">77.7%</span> &#183; 2025
          </>
        }
      />

      {/* One column, top to bottom: the degree, then its levels, then the
          paperwork. The certificates were a tall right-hand rail beside a
          seven-column list of levels, which worked while the levels were that
          list. Once they became a full-width timeline the rail had nothing to
          stand beside and left roughly four hundred vertical pixels of empty
          left column above it -- the same imbalance the About section was
          measured out of. Laid flat under the timeline they read as what they
          are: the evidence for everything above them. */}
      <div data-reveal className="mt-12">
        {/* Institution and dates on one line. Stacked as three separate
            blocks they read as three facts of equal weight, when they are
            one fact: this degree, from here, over these years. */}
        <h3 className="text-xl text-ink">{degree.title}</h3>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-ink-muted">{degree.institution}</span>
          <span className="font-mono text-xs tracking-mono text-ink-muted">
            {degree.period}
          </span>
        </p>
      </div>

      {/* Full width. Four stops carrying real module names need the whole
          measure -- inside seven of twelve columns each stop was narrower
          than its own longest line. */}
      <div data-reveal className="mt-10">
        <DegreeTimeline levels={degreeLevels} />
      </div>

      {priorEducation.map((entry) => (
        <div data-reveal key={entry.id} className="mt-10 border-t border-line pt-5">
          <h3 className="text-ink">{entry.title}</h3>
          <p className="mt-1 text-sm text-ink-muted">{entry.institution}</p>
          <p className="mt-2 font-mono text-xs tracking-mono text-ink-muted">
            {entry.period}
          </p>
        </div>
      ))}

      <div data-reveal className="mt-16 border-t border-line pt-8">
        <h3 className="font-mono text-xs tracking-caps text-ink-muted uppercase">
          Certificates
        </h3>
        <ul className="mt-4 grid list-none gap-x-10 sm:grid-cols-3">
          {certificatesData.map((certificate) => (
            <CertificateLink key={certificate.id} certificate={certificate} />
          ))}
        </ul>
      </div>
    </div>
  </section>
  )
}

export default Education
