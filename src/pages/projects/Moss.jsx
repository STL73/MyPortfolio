import { Link } from "react-router"
import CaseStudyFigure from "../../components/CaseStudyFigure"
import CaseStudyRail from "../../components/CaseStudyRail"
import CaseStudySection from "../../components/CaseStudySection"
import DeepLinkDiagram from "../../components/diagrams/DeepLinkDiagram"
import ModuleBoundaryDiagram from "../../components/diagrams/ModuleBoundaryDiagram"
import ThemeOrderDiagram from "../../components/diagrams/ThemeOrderDiagram"
import ProjectStatus from "../../components/ProjectStatus"
import { primaryAction, secondaryAction } from "../../lib/actionStyles"
import { mossCaseStudy as moss } from "../../constants/moss"

/**
 * The Moss case study.
 *
 * The one project with enough behind it to fill a page. The homepage answers
 * "is this person worth a conversation" in a scroll; this answers "can they
 * explain a decision" for someone who has already decided the first question
 * and wants to check.
 *
 * There is deliberately no second case study yet. WorldQuiz and the Event
 * Portal do not have this much to say, and three thin pages beside one full
 * one make the full one look worse rather than the thin ones look better.
 */
// Named in the data, resolved here. Keeping the mapping in the page is what
// lets the content file stay free of component imports.
//
// The caption sits beside the component rather than in the content file for
// the same reason: it describes the drawing, and it would go stale the moment
// the drawing changed if it lived a file away from it. Each states the finding
// rather than naming the parts -- someone who reads only the figures should
// still come away with the argument.
const DIAGRAMS = {
  moduleBoundary: {
    Component: ModuleBoundaryDiagram,
    caption:
      "Three components, one API module. The swap to a real database is one file, not a hunt.",
  },
  themeOrder: {
    Component: ThemeOrderDiagram,
    caption:
      "Read the theme in an effect and the wrong one paints first. Read it before the paint and it does not.",
  },
}

// Figure numbers are the page's, not each section's, so a caption can be cited
// from anywhere on the page. Declared here rather than counted at render time:
// two of the four decisions carry a diagram, so an index into `decisions` would
// number them 1 and 3.
// One list, read by the rail's index and by the sections themselves, so the
// two can never disagree about what is on the page or what it is called.
const SECTIONS = [
  { id: "what-it-does", title: "What it does" },
  { id: "decisions", title: "Decisions worth explaining" },
  { id: "how-it-deploys", title: "How it deploys" },
  { id: "not-built", title: "What is not built" },
]

const FIGURE_NUMBERS = {
  moduleBoundary: 1,
  themeOrder: 2,
  deepLink: 3,
}

const Moss = () => (
  <article className="px-6 py-24 sm:px-10 lg:px-16">
    {/* The frame is the site's width, the same as every homepage section, and
        the content inside it is a two-column grid for the same reason every
        homepage section is: measured, a single column left 401px of dead space
        beside a diagram and 801px beside plain text, while every section on the
        homepage left none. See `CaseStudyRail` for why a rail rather than
        margin notes or a figure beside each passage. */}
    <div className="mx-auto max-w-wide">
      <Link
        to="/#projects"
        className="font-mono text-xs tracking-mono text-ink-muted transition-colors duration-150 hover:text-ink"
      >
        &#8592; All work
      </Link>

      {/* Source order is document-then-rail so a phone reads the project name
          before its statistics; `order` puts the rail back on the left from
          `lg`, where it has text to sit beside. Ordering the grid rather than
          the markup keeps the heading first for a screen reader too. */}
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="order-2 lg:order-1 lg:col-span-3">
          <CaseStudyRail figures={moss.figures} sections={SECTIONS} />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-9">
          {/* The header sits in the document column, not across the frame, so
              the rail starts level with the title instead of a block below it.
              Two-up inside that: the name and what it is on the left, the two
              ways into the project on the right. Stacked full width, the title
              block ran to a reading measure and the buttons sat under it, which
              left the widest empty band on the page directly under the one
              thing every visitor reads first. */}
          <header className="border-b border-line pb-10">
            <div className="grid gap-8 sm:grid-cols-12">
              <div className="sm:col-span-8">
                <div className="flex items-baseline gap-4">
                  <ProjectStatus status={moss.status} />
                  <span className="font-mono text-xs tracking-mono text-ink-muted">
                    {moss.year}
                  </span>
                </div>

                <h1 className="mt-4 text-3xl text-ink">{moss.title}</h1>
                {/* The measure goes on the wrapper, not on the sized text.
                    `64ch` resolves against the element's OWN font-size, so
                    putting it on a `text-xl` paragraph asked for 64 characters
                    of 20px type and returned a 1036px column, while the same
                    class on a base-size wrapper returns 592px. Three different
                    widths down this page came from that one class. */}
                <div className="mt-3 max-w-measure">
                  <p className="text-xl text-ink-muted">{moss.subtitle}</p>
                </div>
              </div>

              {/* Bottom-aligned, one width, labels centred.

                  Bottom rather than top because it puts both columns on the
                  same baseline -- the rule closing the header -- which is the
                  strongest alignment available here. Top-aligned they sat level
                  with the status label, which is the smallest thing in the
                  block, and read as having landed there rather than been put
                  there. It also matches the reading order: what it is called,
                  then what it is, then how to go and see it.

                  A shared fixed width rather than stretching to the column.
                  Stretched, a 323px "Source" button claimed the same weight as
                  the sentence beside it; sized to content the two came out
                  ragged against each other. One width for both, text centred,
                  is the only version where they read as a pair. */}
              <div className="flex flex-col items-start gap-3 sm:col-span-4 sm:items-end sm:justify-end">
                <a
                  href={moss.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`${primaryAction("sm")} w-full text-center sm:w-48`}
                >
                  Visit the site &#8594;
                </a>
                <a
                  href={moss.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`${secondaryAction("sm")} w-full text-center sm:w-48`}
                >
                  Source &#8594;
                </a>
              </div>
            </div>
          </header>

          <img
            src={moss.image}
            alt="The Moss storefront, showing the product listing with filter controls"
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            className="mt-12 w-full rounded-lg border border-line"
          />

          <div className="mt-12 flex max-w-measure flex-col gap-6">
            {moss.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <CaseStudySection id={SECTIONS[0].id} title={SECTIONS[0].title}>
            <ul className="flex w-full max-w-measure list-none flex-col gap-4">
              {moss.built.map((item) => (
                <li key={item.slice(0, 32)} className="text-lg text-ink-muted">
                  {item}
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection id={SECTIONS[1].id} title={SECTIONS[1].title}>
            {/* No inner grid any more. The section already splits heading from
                body, and nesting a second 4/8 split inside it squeezed each
                decision into a third of the page. */}
            <div className="flex flex-col gap-8">
              {moss.decisions.map((decision, index) => {
                const figure = DIAGRAMS[decision.diagram]
                return (
                  <div
                    key={decision.heading}
                    className={index === 0 ? "" : "border-t border-line pt-8"}
                  >
                    {/* text-lg matches every other passage on the page; this
                        block was the only one left at the base size. The heading
                        moves up with it -- at text-lg it would now be the same
                        size as the paragraph under it and stop reading as a
                        heading at all. */}
                    <div className="w-full max-w-measure">
                      <h3 className="text-xl text-ink">{decision.heading}</h3>
                      <p className="mt-3 text-lg text-ink-muted">{decision.body}</p>
                    </div>
                    {/* Only two of the four decisions carry one. A diagram per
                        section would be decoration; these two are the ones a
                        picture explains faster than the paragraph does.

                        The figure fills the document column, which is now nine
                        of twelve rather than the whole frame -- so it is the
                        one thing on the page wider than the prose, and the
                        three drawings still come out at one scale. */}
                    {figure && (
                      <div className="mt-8">
                        <CaseStudyFigure
                          number={FIGURE_NUMBERS[decision.diagram]}
                          caption={figure.caption}
                        >
                          <figure.Component />
                        </CaseStudyFigure>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CaseStudySection>

          <CaseStudySection id={SECTIONS[2].id} title={SECTIONS[2].title}>
            <div className="flex w-full max-w-measure flex-col gap-6">
              {moss.deployment.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <CaseStudyFigure
                number={FIGURE_NUMBERS.deepLink}
                caption="A deep link has no file behind it. Workers returns 404 unless told to serve index.html."
              >
                <DeepLinkDiagram />
              </CaseStudyFigure>
            </div>
          </CaseStudySection>

          <CaseStudySection id={SECTIONS[3].id} title={SECTIONS[3].title}>
            <div className="w-full max-w-measure">
              <ul className="flex list-none flex-col gap-4">
                {moss.notBuilt.map((item) => (
                  <li key={item.slice(0, 32)} className="text-lg text-ink-muted">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-lg text-ink-muted">{moss.next}</p>
            </div>
          </CaseStudySection>
        </div>
      </div>
    </div>
  </article>
)

export default Moss
