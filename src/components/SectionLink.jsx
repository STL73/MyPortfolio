import { Link, useLocation } from "react-router"

/**
 * A link to a section of the homepage, from anywhere on the site.
 *
 * The two cases are genuinely different and collapsing them breaks one of
 * them:
 *
 * On the homepage the target is already in the document, so a plain anchor is
 * right. The browser's own hash handling scrolls to it, honours the CSS
 * scroll-behaviour, and updates the URL without the router touching anything.
 * Routing it instead would mean re-implementing all three.
 *
 * Anywhere else -- a case study, the 404 -- the target does not exist yet, so
 * the same anchor would silently do nothing. Those need a real navigation to
 * "/" first, which is what ScrollToTop then resolves the hash against.
 */
const SectionLink = ({ href, className, children, onNavigate, current }) => {
  const { pathname } = useLocation()

  if (pathname === "/") {
    return (
      <a
        href={href}
        className={className}
        onClick={onNavigate}
        aria-current={current ? "location" : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      to={`/${href}`}
      className={className}
      onClick={onNavigate}
      aria-current={current ? "location" : undefined}
    >
      {children}
    </Link>
  )
}

export default SectionLink
