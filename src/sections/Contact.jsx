import ContactForm from "../components/ContactForm"
import SectionHeading from "../components/SectionHeading"
import { useSectionReveal } from "../hooks/useSectionReveal"
import { CONTACT, PERSONAL } from "../constants/index"

const DIRECT_LINKS = [
  { label: "Email", value: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
  { label: "LinkedIn", value: "slavi-lambov", href: PERSONAL.linkedin },
  { label: "GitHub", value: "STL73", href: PERSONAL.github },
]

/**
 * Contact.
 *
 * The direct routes sit beside the form rather than beneath it. Plenty of
 * people will not type into a form on a stranger's site, and a recruiter
 * usually wants an address they can paste into their own client. Making them
 * scroll past a form to find one costs enquiries for no reason.
 */
const Contact = () => {
  const scope = useSectionReveal()

  return (
    <section
      ref={scope}
      id="contact"
      aria-labelledby="contact-heading"
      className="sf-textured sf-wash-only px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-wide">
        <SectionHeading id="contact-heading" title={CONTACT.heading} meta={PERSONAL.email} />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="lg:col-span-5">
            <p className="max-w-measure text-lg text-ink-muted">{CONTACT.intro}</p>

            <dl className="mt-10">
              {DIRECT_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="flex flex-wrap items-baseline gap-x-6 border-t border-line py-4"
                >
                  <dt className="w-20 font-mono text-xs tracking-mono text-ink-low">
                    {link.label}
                  </dt>
                  <dd>
                    <a
                      href={link.href}
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                      className="text-ink underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-accent"
                    >
                      {link.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
