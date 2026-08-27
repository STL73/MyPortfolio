import { FaRegCopyright } from "../assets/icons"
import Mark from "../components/Mark"
import SectionLink from "../components/SectionLink"
import { PERSONAL, footerLinks, socialMedia } from "../constants/index"

const currentYear = new Date().getFullYear()

// Section links have to route from a case study; a CV or an external profile
// is just a link. Telling them apart by the "#" avoids passing a flag around.
const isSectionLink = (href) => href.startsWith("#")

/**
 * The footer.
 *
 * This is where Spireforge is named. The header carries the mark but the
 * person's name, because a recruiter needs to leave with that; the trading
 * name belongs somewhere it reads as information for a prospective client
 * rather than as a claim to be a company.
 */
const Footer = () => (
  <footer className="border-t border-line px-6 py-16 sm:px-10 lg:px-16">
    <div className="mx-auto max-w-wide">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* The header and the footer carry different names on purpose.
            Up top a recruiter needs the person; down here, where someone has
            read the whole page and might be thinking about hiring for work
            rather than for a role, the trading name is the useful one. The
            person's name sits directly beneath it so the two are never
            separated. */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <Mark className="h-7 w-7 shrink-0" decorative />
            <span className="font-display text-lg font-semibold tracking-display text-ink">
              Spireforge
            </span>
          </div>

          <p className="mt-3 text-ink">Slav Lambov</p>

          <p className="mt-2 max-w-measure text-sm text-ink-muted">
            Junior developer in Manchester, UK. Freelance work trades as Spireforge.
          </p>
        </div>

        {/* Two columns below `lg`, one grid track each at `lg`.

            Stacked, the three groups ran 986px down a 375px screen and one of
            them -- Resources -- spent a whole row on a single link. Two columns
            is the obvious fix and a plain `grid-cols-2` is the wrong one: grid
            rows align, so a six-link Navigation beside a one-link Resources
            leaves a hole the height of five links and pushes Connect below
            both. CSS multi-column balances instead, which puts Navigation in
            one column and Resources plus Connect in the other with no hole --
            and it does it without knowing how many groups there are or how
            long each is, so adding a fourth group does not need this comment
            rewritten.

            `break-inside-avoid` is what keeps a group whole; without it the
            balancer will happily split Navigation's list across both columns.

            At `lg` the wrapper becomes a grid and the column count stops
            applying -- multi-column does not apply to grid containers -- so the
            desktop layout is unchanged. `col-span-8` split four ways with a
            64px gap resolves to exactly the `col-span-2` each nav had when
            they were direct children of the outer 12-column grid, which is why
            the fourth, empty track is deliberate rather than a miscount. */}
        <div className="columns-2 gap-x-8 sm:gap-x-12 lg:col-span-8 lg:grid lg:grid-cols-4 lg:gap-x-16">
          {footerLinks.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="mb-10 break-inside-avoid lg:mb-0"
            >
              <h2 className="font-mono text-xs tracking-caps text-ink-muted uppercase">
                {group.title}
              </h2>
              {/* `wrap-anywhere`, not `break-words`, and the difference is the
                  whole point. A column can never be narrower than its widest
                  unbreakable run, and "hello@spireforge.co.uk" is one 137px
                  word -- so at 320px the two columns demanded 306px of a 257px
                  footer and pushed 49px off the side of the page. Only
                  `overflow-wrap: anywhere` feeds back into intrinsic sizing;
                  `break-word` lets the text wrap once it is already too late
                  and leaves the minimum width exactly where it was. Set on the
                  list because the property inherits, so a future long label
                  cannot reintroduce the same bug. */}
              <ul className="mt-4 flex list-none flex-col gap-3 wrap-anywhere">
                {group.links.map((link) => (
                  <li key={link.name}>
                    {isSectionLink(link.link) ? (
                      <SectionLink
                        href={link.link}
                        // Muted to near-white was the old hover and it was too
                        // small a step to register. Same treatment as the links
                        // beside it, so the whole column behaves alike.
                        className="text-sm underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline hover:decoration-accent text-ink-muted"
                      >
                        {link.name}
                      </SectionLink>
                    ) : (
                      <a
                        href={link.link}
                        {...(link.link.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                        // The address is the only thing down here anyone is
                        // meant to act on, and until now the footer's only
                        // colour was the 28px mark. One accent, on the one link
                        // that is a call to action rather than navigation.
                        //
                        // Its hover was `aurora-400`, which is the same green
                        // one step lighter -- 15.47 against 14.94, a difference
                        // nobody can see. An underline appearing is a change you
                        // cannot miss, and it costs no layout.
                        className={`text-sm underline-offset-4 transition-colors duration-150 hover:underline ${
                          link.link.startsWith("mailto:")
                            ? "text-accent decoration-accent"
                            : "text-ink-muted hover:text-accent hover:decoration-accent"
                        }`}
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
        {/* The person, not the trading name. Copyright vests in a human or a
            registered company, and Spireforge is neither -- it is a name Slav
            trades under. Same reasoning that leaves the GitHub Company field
            empty. */}
        <p className="flex items-center gap-2 font-mono text-xs tracking-mono text-ink-muted">
          <FaRegCopyright aria-hidden="true" />
          {currentYear} Slav Lambov
        </p>

        <ul className="flex list-none items-center gap-2">
          {socialMedia.map((social) => (
            <li key={social.label}>
              <a
                href={social.link}
                target="_blank"
                rel="noreferrer noopener"
                // 44px hit area around a 16px glyph. WCAG 2.2 asks for 24
                // and a thumb wants more than that.
                className="grid size-11 place-items-center rounded-sm text-ink-muted transition-colors duration-150 hover:bg-surface hover:text-ink"
              >
                <social.src aria-hidden="true" />
                <span className="sr-only">{social.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <SectionLink
          href="#home"
          className="font-mono text-xs tracking-mono text-ink-muted transition-colors duration-150 hover:text-accent"
        >
          Back to top &#8593;
        </SectionLink>
      </div>
    </div>
  </footer>
)

export default Footer
