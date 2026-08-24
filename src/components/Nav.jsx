import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router"
import { FiMenu, FiX } from "react-icons/fi"
import Mark from "./Mark"
import SectionLink from "./SectionLink"
import { navLinks } from "../constants/index"

/**
 * The site header.
 *
 * It pairs the Spireforge mark with the person's name; the reasoning for that
 * split is at the Link itself, where anyone tempted to change it will be.
 *
 * The name is live text in Fraunces rather than an SVG lockup, so it inherits
 * the self-hosted font, stays crisp at any zoom, and can be selected and read.
 * It sets in sentence case at near-zero tracking -- Fraunces keeps its
 * character in the lowercase, and capitals throw away the reason the face was
 * chosen in the first place.
 */
const Nav = () => {
  const { pathname } = useLocation()
  const isHome = pathname === "/"

  const [activeLink, setActiveLink] = useState("#home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Suppresses observer updates while a click-triggered scroll is in flight,
  // so passing through three sections on the way does not flicker the
  // highlight through all three.
  const isScrollingRef = useRef(false)
  const scrollTimerRef = useRef(null)

  // Close the mobile menu on any route change. Without this, following a link
  // to a case study leaves the panel open over the new page, and browser back
  // does the same -- which no click handler can catch.
  //
  // Adjusted during render rather than in an effect. React documents this as
  // the way to reset state when something it derives from changes: it runs
  // before the browser paints, so the panel never appears over the new route,
  // where an effect would let one frame of it through.
  const [menuRoute, setMenuRoute] = useState(pathname)
  if (menuRoute !== pathname) {
    setMenuRoute(pathname)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (!isMenuOpen) return
    const handlePointerDown = (event) => {
      if (!event.target.closest("header")) setIsMenuOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }
    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMenuOpen])

  // Section tracking only means anything on the homepage; the sections do not
  // exist anywhere else.
  useEffect(() => {
    if (!isHome) return

    const sections = document.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isScrollingRef.current) {
            setActiveLink(`#${entry.target.id}`)
          }
        })
      },
      // Weighted to the upper third: a section counts as current once its top
      // reaches roughly where the eye is, not when it first peeks in.
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    const timer = scrollTimerRef.current
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [isHome])

  const handleNavigate = () => {
    setIsMenuOpen(false)
    isScrollingRef.current = true
    clearTimeout(scrollTimerRef.current)
    scrollTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false
    }, 700)
  }

  const linkClass = (href) =>
    `text-sm transition-colors duration-150 ${
      isHome && activeLink === href
        ? "text-accent"
        : "text-ink-muted hover:text-ink"
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-night-900/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-wide items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* The mark is Spireforge; the words are the person.

            A recruiter arrives here from a link on a CV that says Slav Lambov,
            and needs to leave remembering that name -- it is what gets said
            when they shortlist. Heading the page as a studio also implies a
            company that does not exist: Spireforge is a trading name, which is
            the same reason the GitHub profile leaves its Company field empty.
            Freelance context belongs in the footer and the contact section,
            where it reads as information rather than as a claim.

            The chevron carries the identity regardless. It is the favicon, the
            tab and the social card, and it is what anyone actually recognises. */}
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="Slav Lambov, home"
        >
          {/* 28px: above the mark's 24px floor, below which the counter
              closes and the compact variant becomes mandatory. */}
          <Mark className="h-7 w-7 shrink-0" decorative />
          <span
            aria-hidden="true"
            className="font-display text-lg font-semibold tracking-display text-ink"
          >
            Slav Lambov
          </span>
        </Link>

        <nav aria-label="Main" className="max-lg:hidden">
          <ul className="flex list-none items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <SectionLink
                  href={link.href}
                  className={linkClass(link.href)}
                  onNavigate={handleNavigate}
                >
                  {link.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Outlined, not filled. A filled version of this sat above the
              fold alongside the hero's "See the work", which is also aurora
              and also the primary action -- two accent fills on one screen,
              competing, saying almost the same thing. The accent belongs on
              one element per view, so the hero keeps it and this steps back. */}
          <SectionLink
            href="#contact"
            className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors duration-150 hover:border-ink-low hover:bg-surface max-sm:hidden"
            onNavigate={handleNavigate}
          >
            Get in touch
          </SectionLink>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            // 44px square. WCAG 2.2 asks for 24; a thumb wants more.
            className="grid size-11 place-items-center rounded-md text-ink transition-colors duration-150 hover:bg-surface lg:hidden"
          >
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="border-t border-line bg-night-900 lg:hidden"
        >
          <ul className="flex list-none flex-col px-6 py-2 sm:px-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <SectionLink
                  href={link.href}
                  className={`block py-3 ${linkClass(link.href)}`}
                  onNavigate={handleNavigate}
                >
                  {link.label}
                </SectionLink>
              </li>
            ))}
            <li className="sm:hidden">
              <SectionLink
                href="#contact"
                className="mt-2 mb-3 block rounded-md bg-accent px-4 py-3 text-center text-sm font-semibold text-on-accent"
                onNavigate={handleNavigate}
              >
                Get in touch
              </SectionLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Nav
