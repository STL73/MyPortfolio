/**
 * The two button treatments, in one place.
 *
 * These class strings were duplicated across the hero, the featured project,
 * the case study and the contact form, which meant a change to the hover
 * behaviour had to be made five times and was made inconsistently at least
 * once. They are strings rather than a component because the call sites are a
 * mix of `<a>`, react-router `<Link>` and `<button type="submit">`, and a
 * component that abstracts over all three earns less than it costs.
 *
 * Radius is `rounded-sm`, which is the design system's 2px default. Everything
 * shipped at `rounded-md` before this, which is the 3px specified for cards --
 * a button is not a card.
 *
 * The primary keeps its transform to itself: GSAP must never animate these
 * elements, because a CSS transition and a GSAP tween fighting over the same
 * transform is what left both hero buttons invisible on every load. Animate a
 * wrapper instead.
 */

const SIZES = {
  md: "px-6 py-3",
  sm: "px-5 py-2.5 text-sm",
}

/** Filled aurora. One per view -- it is the action the page actually wants. */
export const primaryAction = (size = "md") =>
  [
    "inline-block rounded-sm font-semibold",
    SIZES[size],
    "bg-accent text-on-accent",
    "transition-all duration-150",
    "hover:-translate-y-0.5 hover:bg-aurora-400",
    "hover:shadow-[0_6px_20px_-6px_var(--sf-aurora-500)]",
  ].join(" ")

/**
 * Outlined, with the conic border that turns while hovered.
 *
 * `sf-conic` is defined in index.css. It is deliberately not spinning at rest:
 * a border that turns forever is the clearest "2024 landing page" tell there
 * is, and perpetual motion on a small element is the first thing a motion
 * audit flags.
 */
export const secondaryAction = (size = "md") =>
  [
    "sf-conic inline-block rounded-sm font-semibold",
    SIZES[size],
    "bg-night-800 text-ink",
    "transition-all duration-150",
    "hover:-translate-y-0.5 hover:text-accent",
  ].join(" ")
