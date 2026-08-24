import mossShot from "../assets/images/projects/moss-storefront.jpg"

/**
 * The Moss case study.
 *
 * Every figure below was measured rather than remembered: the test count and
 * the bundle size come from `npm test` and `npm run build` in that repository,
 * re-run before this page was written. They are on a public page next to a
 * link to the source, so anyone can check them, which is the point.
 *
 * The last section is the reason this page is worth reading at all. A case
 * study that only lists what works is a brochure; naming what is stubbed, and
 * why it was left that way, is what makes the rest of it credible.
 */
export const mossCaseStudy = {
  title: "Moss",
  subtitle: "A storefront for a preserved-moss decorations business",
  year: "2026",
  status: "live",
  image: mossShot,
  liveUrl: "https://mossart.spireforge.co.uk",
  githubUrl: "https://github.com/STL73/Moss",

  intro: [
    "Moss Decorations makes arrangements from preserved moss and dried plants — the kind that live indoors for years without water or light. The business was running on an Instagram feed and direct messages, which is fine until someone wants to see everything at once, or send a friend a link to one particular piece.",
    "This is the storefront that replaced that. It has been live on its own domain since 18 August 2026, and it is the first thing I have built that a stranger can open and use.",
  ],

  figures: [
    { label: "Live since", value: "18 Aug 2026" },
    { label: "Tests", value: "196 across 33 files" },
    { label: "Main chunk", value: "116.78 kB gzipped" },
    { label: "Routes", value: "5, plus a 404" },
  ],

  built: [
    "Five routes — home, a product listing, a product detail page, a cart and a contact page — each one its own chunk, so opening the catalogue does not download the cart.",
    "Filtering and sorting on the listing page are driven by the URL rather than by component state.",
    "The cart lives in context and persists to localStorage, so closing the tab does not empty it.",
    "Dark by default with a light toggle, applied before the first paint.",
  ],

  decisions: [
    {
      heading: "The catalogue sits behind one module",
      diagram: "moduleBoundary",
      body: "Every component asks the same API module for products; today that module returns a mock catalogue. When there is a real database behind it, the swap is one file rather than a hunt through every component that happened to import the data directly. It cost nothing to do at the start and it is the difference between a port and a rewrite.",
    },
    {
      heading: "Filter and sort live in the URL",
      body: "A filtered view of a shop is a thing people send each other. Held in component state it cannot be shared, cannot be bookmarked, and the back button walks out of the page instead of undoing the filter. In the URL, all three work for free and the server-rendered version later gets them for free too.",
    },
    {
      heading: "The theme is applied before React mounts",
      diagram: "themeOrder",
      body: "Reading a saved theme inside an effect means the wrong one paints first and corrects itself a frame later, which is a white flash on every reload for anyone using dark mode. A small script reads the preference before the app boots, so the first paint is already correct.",
    },
    {
      heading: "Colour contrast is asserted in tests",
      body: "The palette lives in tokens, and a test computes the contrast ratio of the pairings that carry text and fails the build if any of them drops below the WCAG floor. Accessibility checked by eye survives exactly until someone adjusts a colour to look better in one component.",
    },
  ],

  deployment: [
    "It deploys as a Cloudflare Worker serving static assets, not as a Pages project — Cloudflare no longer creates Pages projects from the dashboard. Pushing to main is a release; there is no staging.",
    "One line of that config is load-bearing. Pages used to infer single-page routing from the absence of a top-level 404.html; Workers does not, so without `not_found_handling: \"single-page-application\"` every deep link returns a 404 while clicking through to the same page from the homepage works fine. That is a failure that survives a casual check and breaks every link anyone shares.",
    "Node is pinned to 22 in the repository, because Cloudflare's builder still defaults to 18 and Vite 8 needs 20.19 or newer. Without the pin the build fails on their machine and passes on mine.",
  ],

  notBuilt: [
    "There are no payments. The cart works, remembers itself and totals correctly, and then stops — nothing takes money.",
    "The Express and Mongoose API is half-built. Authentication works; the product, order and category routes are stubs returning fixed shapes.",
    "The catalogue is mock data, which is why the module boundary above mattered.",
  ],

  next: "The next piece of work is a port from MongoDB to Postgres on Neon with Drizzle, decided in August and deliberately parked. The storefront being live and useful mattered more than the database behind a set of routes nothing calls yet.",
}
