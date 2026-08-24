import CertificateLink from "../components/CertificateLink"
import SectionHeading from "../components/SectionHeading"
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
const Education = () => (
  <section
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
        <div className="lg:col-span-7">
          <h3 className="text-xl text-ink">{degree.title}</h3>
          <p className="mt-1 text-ink-muted">{degree.institution}</p>
          <p className="mt-2 font-mono text-xs tracking-mono text-ink-low">
            {degree.period}
          </p>

          <ol className="mt-8 list-none">
            {degreeLevels.map((level) => (
              <li
                key={level.id}
                className="grid gap-2 border-t border-line py-5 sm:grid-cols-12 sm:gap-6"
              >
                <span className="font-mono text-xs tracking-mono text-ink-low sm:col-span-4">
                  {level.period}
                </span>
                <div className="sm:col-span-8">
                  <span className="block text-ink">{level.title}</span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    {level.description}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          {priorEducation.map((entry) => (
            <div key={entry.id} className="mt-10 border-t border-line pt-5">
              <h3 className="text-ink">{entry.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{entry.institution}</p>
              <p className="mt-2 font-mono text-xs tracking-mono text-ink-low">
                {entry.period}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5">
          <h3 className="font-mono text-xs tracking-caps text-ink-low uppercase">
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

export default Education
