/**
 * The card surface, defined once.
 *
 * A card in the skills section and a card in the projects section are the same
 * kind of object: a bordered container holding a titled block. Giving each
 * section its own treatment is how a design system comes apart -- the page
 * starts reading as assembled from parts rather than designed, and every new
 * card becomes a fresh decision instead of a reuse.
 *
 * The variation between sections comes from content and scale instead, which
 * it already does: the projects section has a featured item at roughly double
 * the size of the rest, and the skills section has none.
 *
 * Radius is the design system's card radius. It is deliberately not a value
 * typed at each call site -- changing it should be one edit here, which is the
 * entire argument for this file existing.
 */

const RADIUS = "rounded-md"

/**
 * @param {object} [options]
 * @param {boolean} [options.accented]
 *   Draws the card in the accent rather than the border colour. For the one
 *   card in a group that carries different weight -- never for decoration, and
 *   never for more than one card in a set, or the emphasis means nothing.
 * @param {boolean} [options.interactive]
 *   Adds the hover lift. Only for a card that is, or contains, a link.
 */
export const cardSurface = ({ accented = false, interactive = false } = {}) =>
  [
    RADIUS,
    "border p-6",
    accented ? "border-accent/40 bg-accent/5" : "border-line bg-night-700/40",
    // transform and border-color only. A card that GSAP reveals must never
    // transition `all`, or the two fight over opacity every frame -- that
    // collision has already blanked three project rows and both hero buttons.
    interactive
      ? "transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-accent/50"
      : "",
  ]
    .filter(Boolean)
    .join(" ")
