import CertificateLink from "../components/CertificateLink"
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
 * The degree gets the weight and the three levels sit under it as a sequence,
 * which is the one place on this site where ordinal labels earn their keep:
 * Level 6 genuinely cannot precede Level 4, so the order carries information
 * rather than decorating a list.
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
      <SectionHeading
        id="education-heading"
        title="Education"
        meta="First Class · 77.7% · 2025"
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:col-span-7">
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

          <ol className="mt-8 list-none">
            {degreeLevels.map((level) => (
              // The period sits directly above its own title rather than four
              // columns away from it. Split across a 4/8 grid there were three
              // hundred empty pixels between a label and the thing it labels,
              // and the eye had to jump the gap to connect them.
              <li key={level.id} className="border-t border-line py-5">
                <span className="font-mono text-xs tracking-mono text-ink-muted">
                  {level.period}
                </span>
                <h4 className="mt-2 text-ink">{level.title}</h4>
                <p className="mt-1 max-w-measure text-sm text-ink-muted">
                  {level.description}
                </p>
              </li>
            ))}
          </ol>

          {priorEducation.map((entry) => (
            <div key={entry.id} className="mt-10 border-t border-line pt-5">
              <h3 className="text-ink">{entry.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{entry.institution}</p>
              <p className="mt-2 font-mono text-xs tracking-mono text-ink-muted">
                {entry.period}
              </p>
            </div>
          ))}
        </div>

        <div data-reveal className="lg:col-span-4 lg:col-start-9">
          <h3 className="font-mono text-xs tracking-caps text-ink-muted uppercase">
            Certificates
          </h3>
          <ul className="mt-4 list-none">
            {certificatesData.map((certificate) => (
              <CertificateLink key={certificate.id} certificate={certificate} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Education
