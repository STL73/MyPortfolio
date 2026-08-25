import CareerTracks from "../components/CareerTracks"
import CaseStudyFigure from "../components/CaseStudyFigure"
import CertificateLink from "../components/CertificateLink"
import DegreeTimeline from "../components/DegreeTimeline"
import { FaBriefcase, FaLocationDot, FaLanguage, FaRegStar } from "react-icons/fa6"
import {
  SiCss3,
  SiExpress,
  SiGit,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiPandas,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiXampp,
  SiOracle,
  SiGithub,
  SiNextdotjs,
} from "react-icons/si"
import { VscAzure } from "react-icons/vsc"
import DeepLinkDiagram from "../components/diagrams/DeepLinkDiagram"
import ModuleBoundaryDiagram from "../components/diagrams/ModuleBoundaryDiagram"
import ThemeOrderDiagram from "../components/diagrams/ThemeOrderDiagram"
import ProjectStatus from "../components/ProjectStatus"
import { primaryAction, secondaryAction } from "../lib/actionStyles"
import { cardSurface } from "../lib/surfaceStyles"
import portrait from "../assets/images/slav-portrait.webp"
import {
  ABOUT,
  HERO,
  SKILLS,
  careerTracks,
  certificatesData,
  degreeLevels,
  projectsData,
} from "../constants/index"
import { mossCaseStudy as moss } from "../constants/moss"

/**
 * A comparison page for motion and layout variants. Development only.
 *
 * Registered in App.jsx behind `import.meta.env.DEV`, so it is never in a
 * production bundle and never reachable on the live site. It exists to settle
 * arguments by hovering rather than by describing, and it gets deleted once
 * the choices are made.
 *
 * Every variant is built from the real tokens and the real data, because a
 * variant built from placeholder greys tells you nothing about whether it
 * works on this page.
 */

// `?only=<id>` renders a single block and nothing else. It exists so the page
// can embed itself in an iframe at a phone width: Tailwind's breakpoints read
// the viewport, not the container, so a 375px-wide div on a desktop page still
// gets desktop styles and shows nothing useful. An iframe has its own viewport
// and therefore its own breakpoints.
const only = new URLSearchParams(window.location.search).get("only")

const secondary = projectsData.slice(1)

// Shared by the four layout variants below so the only thing differing
// between them is the layout.
const DEEP_LINK_CAPTION =
  "A deep link has no file behind it. Workers returns 404 unless told to serve index.html."

// Kept deliberately bare -- the point is to see the component at a phone
// width, not the lab's chrome around it.
const IsolatedBlocks = {
  timeline: () => <DegreeTimeline levels={degreeLevels} />,
}

const Lab = () => {
  const Isolated = only && IsolatedBlocks[only]
  if (Isolated) {
    // App renders the nav and the footer outside the route, so an isolated
    // block arrives with 65px of fixed header over it and 986px of footer
    // under it -- which in a preview frame is almost all of what you see. Both
    // are hidden here rather than restructured: this path only exists behind
    // `?only=`, which only exists in the dev-only lab.
    return (
      <div className="px-6 py-8">
        <style>{`#root > header, #root > footer { display: none !important; }`}</style>
        <Isolated />
      </div>
    )
  }
  return <LabPage />
}

const LabPage = () => (
  <div className="px-6 py-24 sm:px-10 lg:px-16">
    <style>{`
      /* @property is what makes an angle interpolable. Without a declared
         type the browser treats a custom property as a string and swaps
         rather than animates it. */
      @property --lab-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
      }
      @keyframes lab-spin { to { --lab-angle: 360deg; } }

      /* B1: four segments, not a two-stop blend. Conic starts at 12 o'clock,
         so 315-45deg is the top, 45-135 the right, and so on -- top and
         bottom take one ink, left and right the other. Hard stops keep the
         quadrants readable while it turns. */
      .lab-conic {
        position: relative;
        isolation: isolate;
        border-radius: var(--sf-radius-md);
      }
      .lab-conic::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        border-radius: inherit;
        padding: 1px;
        background: conic-gradient(
          from var(--lab-angle),
          var(--sf-aurora-500) 0deg 45deg,
          var(--sf-text-mid) 45deg 135deg,
          var(--sf-aurora-500) 135deg 225deg,
          var(--sf-text-mid) 225deg 315deg,
          var(--sf-aurora-500) 315deg 360deg
        );
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        mask-composite: exclude;
        opacity: 0.7;
        transition: opacity 150ms;
      }
      .lab-conic:hover::before {
        opacity: 1;
        animation: lab-spin 2.2s linear infinite;
      }

      /* B2: the same four quadrants, blended rather than hard-edged. */
      .lab-conic-soft::before {
        background: conic-gradient(
          from var(--lab-angle),
          var(--sf-aurora-500),
          var(--sf-text-mid) 90deg,
          var(--sf-aurora-500) 180deg,
          var(--sf-text-mid) 270deg,
          var(--sf-aurora-500) 360deg
        );
      }

      /* C1: the sweep, at an alpha that actually registers.
         The first attempt used near-white at 28% over an aurora fill. The
         mechanism was fine -- the band was in place and travelling -- but
         aurora is already a very light colour, so a translucent white over it
         changed almost nothing. Visible needs roughly 70%. */
      .lab-sweep { position: relative; overflow: hidden; }
      .lab-sweep::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          100deg,
          transparent 35%,
          rgba(255, 255, 255, 0.7) 50%,
          transparent 65%
        );
        transform: translateX(-120%);
        transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .lab-sweep:hover::after { transform: translateX(120%); }

      /* C2: the other way round -- a dark band raking across the bright fill,
         which on a light button reads more like light moving over a surface. */
      .lab-sweep-dark::after {
        background: linear-gradient(
          100deg,
          transparent 35%,
          rgba(16, 10, 40, 0.35) 50%,
          transparent 65%
        );
      }

      /* D: two shades drawing in from opposite corners. */
      .lab-draw { position: relative; }
      .lab-draw::before,
      .lab-draw::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        transition: width 200ms ease-out, height 200ms ease-out 200ms;
      }
      .lab-draw::before { top: 0; left: 0; border-top: 1px solid var(--sf-aurora-500); border-left: 1px solid var(--sf-aurora-500); }
      .lab-draw::after { right: 0; bottom: 0; border-bottom: 1px solid var(--sf-text-mid); border-right: 1px solid var(--sf-text-mid); }
      .lab-draw:hover::before,
      .lab-draw:hover::after { width: 100%; height: 100%; }

      /* Status indicator options. The slow pulse is what the pre-redesign
         site had; a motion audit flags any looped pulse on a status element
         as the single most recognisable AI-slop pattern there is, so it is
         here to be compared rather than assumed. */
      @keyframes lab-status-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.45; transform: scale(0.82); }
      }
      .lab-dot {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 9999px;
        background: var(--sf-aurora-500);
      }
      .lab-dot-pulse { animation: lab-status-pulse 2s ease-in-out infinite; }
      .lab-dot-ring {
        position: relative;
      }
      .lab-dot-ring::after {
        content: "";
        position: absolute;
        inset: -4px;
        border-radius: 9999px;
        border: 1px solid var(--sf-aurora-500);
        opacity: 0.35;
      }
      @media (prefers-reduced-motion: reduce) {
        .lab-dot-pulse { animation: none; }
      }

      /* His idea, built honestly: a card showing a slice until hovered. */
      .lab-peek { max-height: 5.5rem; overflow: hidden; transition: max-height 320ms cubic-bezier(0.22, 1, 0.36, 1); }
      .lab-peek:hover, .lab-peek:focus-within { max-height: 32rem; }

      @media (prefers-reduced-motion: reduce) {
        .lab-conic:hover::before { animation: none; }
        .lab-sweep::after { transition: none; }
        .lab-draw::before, .lab-draw::after { transition: none; }
        .lab-peek { transition: none; }
      }
    `}</style>

    <div className="mx-auto flex max-w-wide flex-col gap-24">
      <header>
        <p className="font-mono text-xs tracking-mono text-accent">
          development only &#183; not in the production bundle
        </p>
        <h1 className="mt-3 text-3xl text-ink">Variants</h1>
        <p className="mt-4 max-w-measure text-lg text-ink-muted">
          Hover everything. Screenshots cannot show any of this, which is the entire reason the page
          exists.
        </p>
      </header>

      <Group
        title="Case study diagrams"
        note="Three, for the three places a picture explains faster than the paragraph does. Every fact on them was read out of the Moss repository first -- the importer list, the inline script, the wrangler setting. A diagram that is confidently wrong is worse than no diagram."
      >
        <Labelled label="1 · the module boundary  (Decisions: the catalogue sits behind one module)">
          <div className="w-full max-w-3xl">
            <ModuleBoundaryDiagram />
          </div>
        </Labelled>

        <Labelled label="2 · theme before paint  (Decisions: the theme is applied before React mounts)">
          <div className="w-full max-w-3xl">
            <ThemeOrderDiagram />
          </div>
        </Labelled>

        <Labelled label="3 · the deep-link trap  (How it deploys)">
          <div className="w-full max-w-3xl">
            <DeepLinkDiagram />
          </div>
        </Labelled>
      </Group>

      <Group
        title="Hero layout"
        note="A is what ships: stacked and left-weighted, with the right side open. B moves the career tracks beside the headline, which fills the width and makes the hero shorter -- the calls to action were falling below the fold at 900px."
      >
        <Labelled label="A · stacked (current)">
          <div className="w-full border border-line/50 p-8">
            <p className="font-mono text-sm tracking-mono text-ink-muted">{HERO.eyebrow}</p>
            <h2 className="mt-8 max-w-4xl text-3xl leading-[1.08] text-ink">
              <span className="block">{HERO.claim}</span>
              <span className="mt-2 block text-ink-muted">{HERO.turn}</span>
            </h2>
            <div className="mt-14">
              <CareerTracks tracks={careerTracks} />
            </div>
            <div className="mt-16 flex flex-wrap items-center gap-4">
              <span className={primaryAction()}>See the work</span>
              <span className={secondaryAction()}>Download CV</span>
            </div>
          </div>
        </Labelled>

        <Labelled label="B · tracks beside the headline">
          <div className="w-full border border-line/50 p-8">
            <p className="font-mono text-sm tracking-mono text-ink-muted">{HERO.eyebrow}</p>
            <div className="mt-8 grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="text-3xl leading-[1.08] text-ink">
                  <span className="block">{HERO.claim}</span>
                  <span className="mt-2 block text-ink-muted">{HERO.turn}</span>
                </h2>
                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <span className={primaryAction()}>See the work</span>
                  <span className={secondaryAction()}>Download CV</span>
                </div>
              </div>
              <div className="lg:col-span-5">
                <CareerTracks tracks={careerTracks} />
              </div>
            </div>
          </div>
        </Labelled>
      </Group>

      <Group
        title="Buttons"
        note="B1 and B2 are the four-quadrant border, spinning on hover rather than forever. C1 and C2 are the sweep at an alpha you can actually see."
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Labelled label="A · current">
            <button
              type="button"
              className="rounded-md bg-accent px-6 py-3 font-semibold text-on-accent transition-all duration-150 hover:-translate-y-0.5 hover:bg-aurora-400 hover:shadow-[0_6px_20px_-6px_var(--sf-aurora-500)]"
            >
              See the work
            </button>
          </Labelled>

          <Labelled label="B1 · conic, hard quadrants">
            <button
              type="button"
              className="lab-conic rounded-md bg-night-800 px-6 py-3 font-semibold text-ink transition-colors duration-150 hover:text-accent"
            >
              See the work
            </button>
          </Labelled>

          <Labelled label="B2 · conic, blended">
            <button
              type="button"
              className="lab-conic lab-conic-soft rounded-md bg-night-800 px-6 py-3 font-semibold text-ink transition-colors duration-150 hover:text-accent"
            >
              See the work
            </button>
          </Labelled>

          <Labelled label="C1 · sweep, light">
            <button
              type="button"
              className="lab-sweep rounded-md bg-accent px-6 py-3 font-semibold text-on-accent"
            >
              See the work
            </button>
          </Labelled>

          <Labelled label="C2 · sweep, dark">
            <button
              type="button"
              className="lab-sweep lab-sweep-dark rounded-md bg-accent px-6 py-3 font-semibold text-on-accent"
            >
              See the work
            </button>
          </Labelled>

          <Labelled label="D · two-tone draw">
            <button
              type="button"
              className="lab-draw rounded-md bg-night-700 px-6 py-3 font-semibold text-ink"
            >
              See the work
            </button>
          </Labelled>
        </div>
      </Group>

      <Group
        title="Button shape"
        note="The design system's radius scale is 2px default, 3px cards, 6px large surfaces. Buttons are not cards, so 2px is what the system actually asks for. Everything currently ships at 3px. The pill is off-system entirely and is here for comparison, not as a candidate."
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "0 · square", radius: "0px" },
            { label: "2px · system default", radius: "var(--sf-radius-sm)" },
            { label: "3px · current (card radius)", radius: "var(--sf-radius-md)" },
            { label: "6px · large-surface radius", radius: "var(--sf-radius-lg)" },
            { label: "pill · off-system", radius: "9999px" },
          ].map((shape) => (
            <Labelled key={shape.label} label={shape.label}>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  style={{ borderRadius: shape.radius }}
                  className="bg-accent px-6 py-3 font-semibold text-on-accent transition-all duration-150 hover:-translate-y-0.5 hover:bg-aurora-400 hover:shadow-[0_6px_20px_-6px_var(--sf-aurora-500)]"
                >
                  See the work
                </button>
                <button
                  type="button"
                  style={{ borderRadius: shape.radius }}
                  className="border border-line px-6 py-3 font-semibold text-ink transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface"
                >
                  Download CV
                </button>
              </div>
            </Labelled>
          ))}
        </div>
      </Group>

      <Group
        title="Card radius"
        note="One definition drives every card on the site, so this is a single edit in src/lib/surfaceStyles.js. The design system's scale is 2px default, 3px cards, 6px large surfaces -- 12px is outside it and is here for comparison, not as a candidate."
      >
        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "0 · square", radius: "0px" },
            { label: "2px · default", radius: "var(--sf-radius-sm)" },
            { label: "3px · card (current)", radius: "var(--sf-radius-md)" },
            { label: "6px · large surface", radius: "var(--sf-radius-lg)" },
            { label: "12px · off-system", radius: "12px" },
          ].map((shape) => (
            <Labelled key={shape.label} label={shape.label}>
              <div className="flex w-full flex-col gap-4">
                <div
                  style={{ borderRadius: shape.radius }}
                  className="border border-line bg-night-700/40 p-6"
                >
                  <span className="text-lg text-ink">Comfortable</span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    Reach for these without looking things up
                  </span>
                  <p className="mt-4 font-mono text-xs tracking-mono text-ink-muted">
                    HTML · CSS · JavaScript
                  </p>
                </div>
                <div
                  style={{ borderRadius: shape.radius }}
                  className="border border-accent/40 bg-accent/5 p-6"
                >
                  <span className="text-lg text-ink">Learning now</span>
                  <span className="mt-1 block text-sm text-ink-muted">The honest gaps</span>
                  <p className="mt-4 font-mono text-xs tracking-mono text-ink-muted">
                    REST API design · ORMs
                  </p>
                </div>
              </div>
            </Labelled>
          ))}
        </div>
      </Group>

      <Group
        title="Secondary projects"
        note="Three ways to present the three projects that are not Moss."
      >
        <Labelled label="A · rows (current)">
          <div className="w-full">
            {secondary.map((project) => (
              <article
                key={project.id}
                className="group relative grid gap-4 border-t border-line py-6 pl-0 transition-[padding-left] duration-200 hover:pl-4 md:grid-cols-12 md:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-6 bottom-6 left-0 w-px scale-y-0 bg-accent transition-transform duration-200 group-hover:scale-y-100"
                />
                <h3 className="text-lg text-ink transition-colors duration-200 group-hover:text-accent md:col-span-4">
                  {project.title}
                </h3>
                <p className="text-sm text-ink-muted md:col-span-8">
                  {project.description.slice(0, 130)}&#8230;
                </p>
              </article>
            ))}
          </div>
        </Labelled>

        <Labelled label="B · cards, all visible">
          <div className="grid w-full gap-4 md:grid-cols-3">
            {secondary.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col rounded-lg border border-line bg-night-700/40 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/50"
              >
                <ProjectStatus status={project.status} />
                <h3 className="mt-3 text-lg text-ink transition-colors duration-200 group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-ink-muted">
                  {project.description.slice(0, 110)}&#8230;
                </p>
              </article>
            ))}
          </div>
        </Labelled>

        <Labelled label="C · peek, expands on hover (your idea)">
          <div className="grid w-full gap-4 md:grid-cols-3">
            {secondary.map((project) => (
              <article
                key={project.id}
                tabIndex={0}
                className="lab-peek rounded-lg border border-line bg-night-700/40 p-6"
              >
                <h3 className="text-lg text-ink">{project.title}</h3>
                <p className="mt-3 text-sm text-ink-muted">{project.description}</p>
              </article>
            ))}
          </div>
        </Labelled>
      </Group>

      <Group
        title="The Live status"
        note="The pre-redesign site pulsed this. A motion audit flags any looped pulse on a status element as the most recognisable AI-slop pattern there is -- so all four are here rather than one being assumed."
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Labelled label="A · plain text (current)">
            <span className="font-mono text-xs tracking-mono text-accent">Live</span>
          </Labelled>

          <Labelled label="B · static dot">
            <span className="inline-flex items-baseline gap-2 font-mono text-xs tracking-mono text-accent">
              <span className="lab-dot" />
              Live
            </span>
          </Labelled>

          <Labelled label="C · dot with a ring">
            <span className="inline-flex items-baseline gap-2 font-mono text-xs tracking-mono text-accent">
              <span className="lab-dot lab-dot-ring" />
              Live
            </span>
          </Labelled>

          <Labelled label="D · slow pulse (what you had)">
            <span className="inline-flex items-baseline gap-2 font-mono text-xs tracking-mono text-accent">
              <span className="lab-dot lab-dot-pulse" />
              Live
            </span>
          </Labelled>
        </div>
      </Group>

      <Group
        title="Skills layout"
        note="Four tiers, three arrangements. The fourth tier names the gaps and is the most valuable block, so whichever layout wins has to keep it as readable as the first three."
      >
        <Labelled label="A · rows (current)">
          <dl className="w-full">
            {SKILLS.tiers.map((tier) => (
              <div
                key={tier.id}
                className="grid gap-3 border-t border-line py-6 md:grid-cols-12 md:gap-8"
              >
                <dt className="md:col-span-4">
                  <span className="text-lg text-ink">{tier.label}</span>
                  <span className="mt-1 block text-sm text-ink-muted">{tier.note}</span>
                </dt>
                <dd className="font-mono text-sm tracking-mono text-ink-muted md:col-span-8">
                  {tier.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="B · four columns">
          <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SKILLS.tiers.map((tier) => (
              <div key={tier.id} className="border-t border-line pt-4">
                <h3 className="text-ink">{tier.label}</h3>
                <p className="mt-1 text-sm text-ink-muted">{tier.note}</p>
                <ul className="mt-4 flex list-none flex-col gap-2">
                  {tier.items.map((item) => (
                    <li key={item} className="font-mono text-xs tracking-mono text-ink-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Labelled>

        <Labelled label="C · cards, gaps tier accented">
          <div className="grid w-full gap-4 md:grid-cols-2">
            {SKILLS.tiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-md border p-6 ${
                  tier.id === "learning"
                    ? "border-accent/40 bg-accent/5"
                    : "border-line bg-night-700/40"
                }`}
              >
                <h3 className="text-lg text-ink">{tier.label}</h3>
                <p className="mt-1 text-sm text-ink-muted">{tier.note}</p>
                <p className="mt-4 font-mono text-xs tracking-mono text-ink-muted">
                  {tier.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Labelled>
      </Group>

      <Group
        title="About, right-hand space"
        note="The dead space is ~540px to the right of the portrait."
      >
        <Labelled label="A · current, left-weighted">
          <div className="flex w-full gap-20">
            <div className="max-w-measure text-lg text-ink-muted">{ABOUT.paragraphs[0]}</div>
            <img src={portrait} alt="" className="h-64 w-auto rounded-lg border border-line" />
          </div>
        </Labelled>

        <Labelled label="B · three columns, full width">
          <div className="grid w-full grid-cols-12 gap-8">
            <div className="col-span-5 text-lg text-ink-muted">{ABOUT.paragraphs[0]}</div>
            <img
              src={portrait}
              alt=""
              className="col-span-3 w-full rounded-lg border border-line"
            />
            <dl className="col-span-3 col-start-10 flex flex-col gap-6">
              {ABOUT.facts.map((fact) => (
                <div key={fact.label} className="border-t border-line pt-4">
                  <dt className="font-mono text-xs tracking-mono text-ink-low">{fact.label}</dt>
                  <dd className="mt-1 text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Labelled>
      </Group>

      <Group
        title="Case study section layout"
        note="The same section -- real copy, real diagram -- laid out three ways. What is being judged: whether the empty left third under the heading is a problem worth solving, and whether the diagram wants a frame around it. Every variant renders the diagram at the same width, so the label sizes are finally comparable."
      >
        <Labelled label="A · heading rail kept, figure breaks out to full width">
          <section className="grid w-full gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12">
            <h2 className="text-2xl text-ink lg:col-span-3">How it deploys</h2>
            <div className="flex flex-col gap-6 lg:col-span-8 lg:col-start-5">
              {moss.deployment.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-measure text-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-4 lg:col-span-12">
              <CaseStudyFigure number={3} caption={DEEP_LINK_CAPTION}>
                <DeepLinkDiagram />
              </CaseStudyFigure>
            </div>
          </section>
        </Labelled>

        <Labelled label="A2 · the same, with no panel around the figure">
          <section className="grid w-full gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12">
            <h2 className="text-2xl text-ink lg:col-span-3">How it deploys</h2>
            <div className="flex flex-col gap-6 lg:col-span-8 lg:col-start-5">
              {moss.deployment.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-measure text-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-6 lg:col-span-12">
              <CaseStudyFigure number={3} caption={DEEP_LINK_CAPTION} framed={false}>
                <DeepLinkDiagram />
              </CaseStudyFigure>
            </div>
          </section>
        </Labelled>

        <Labelled label="B · heading runs full width, no rail at all">
          <section className="w-full border-t border-line pt-10">
            <h2 className="text-2xl text-ink">How it deploys</h2>
            <div className="mt-6 flex flex-col gap-6">
              {moss.deployment.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-measure text-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10">
              <CaseStudyFigure number={3} caption={DEEP_LINK_CAPTION}>
                <DeepLinkDiagram />
              </CaseStudyFigure>
            </div>
          </section>
        </Labelled>

        <Labelled label="C · prose left, diagram right  (the labels go small again -- that is the point)">
          <section className="w-full border-t border-line pt-10">
            <h2 className="text-2xl text-ink">How it deploys</h2>
            <div className="mt-6 grid gap-10 lg:grid-cols-12">
              <div className="flex flex-col gap-6 lg:col-span-5">
                {moss.deployment.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="lg:col-span-7">
                <CaseStudyFigure number={3} caption={DEEP_LINK_CAPTION}>
                  <DeepLinkDiagram />
                </CaseStudyFigure>
              </div>
            </div>
          </section>
        </Labelled>

        <Labelled label="D · your idea — prose full width, diagram centred below">
          <section className="w-full border-t border-line pt-10">
            <h2 className="text-2xl text-ink">How it deploys</h2>
            <div className="mt-6 flex flex-col gap-6">
              {moss.deployment.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <CaseStudyFigure number={3} caption={DEEP_LINK_CAPTION}>
                <DeepLinkDiagram />
              </CaseStudyFigure>
            </div>
          </section>
        </Labelled>

        <Labelled label="E · narrow document column, figure breaks out wider and centres">
          <div className="w-full border-t border-line pt-10">
            <section className="mx-auto w-full max-w-[46rem]">
              <h2 className="text-2xl text-ink">How it deploys</h2>
              <div className="mt-6 flex flex-col gap-6">
                {moss.deployment.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              {/* The figure is the only thing allowed wider than the text. It
                  centres on the column rather than the page, which is what
                  keeps it reading as part of the passage. */}
              <div className="relative left-1/2 mt-10 w-[min(62rem,calc(100vw-3rem))] -translate-x-1/2">
                <CaseStudyFigure number={3} caption={DEEP_LINK_CAPTION}>
                  <DeepLinkDiagram />
                </CaseStudyFigure>
              </div>
            </section>
          </div>
        </Labelled>

        <Labelled label="E1 · heading pulled to the left margin, short accent rule under it">
          <div className="w-full border-t border-line pt-10">
            <h2 className="text-2xl text-ink">How it deploys</h2>
            <div className="mt-4 h-px w-14 bg-accent" />
            <section className="mx-auto mt-10 w-full max-w-[46rem]">
              <div className="flex flex-col gap-6">
                {moss.deployment.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="relative left-1/2 mt-10 w-[min(62rem,calc(100vw-3rem))] -translate-x-1/2">
                <CaseStudyFigure number={3} caption={DEEP_LINK_CAPTION}>
                  <DeepLinkDiagram />
                </CaseStudyFigure>
              </div>
            </section>
          </div>
        </Labelled>

        <Labelled label="E2 · the same, but the accent rule runs the full width">
          <div className="w-full border-t border-line pt-10">
            <h2 className="text-2xl text-ink">How it deploys</h2>
            <div className="mt-4 h-px w-full bg-accent/60" />
            <section className="mx-auto mt-10 w-full max-w-[46rem]">
              <div className="flex flex-col gap-6">
                {moss.deployment.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="relative left-1/2 mt-10 w-[min(62rem,calc(100vw-3rem))] -translate-x-1/2">
                <CaseStudyFigure number={3} caption={DEEP_LINK_CAPTION}>
                  <DeepLinkDiagram />
                </CaseStudyFigure>
              </div>
            </section>
          </div>
        </Labelled>

        <Labelled label="E3 · heading stays at the top of the column, short accent rule under it">
          <div className="w-full border-t border-line pt-10">
            <section className="mx-auto w-full max-w-[46rem]">
              <h2 className="text-2xl text-ink">How it deploys</h2>
              <div className="mt-4 h-px w-14 bg-accent" />
              <div className="mt-8 flex flex-col gap-6">
                {moss.deployment.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="relative left-1/2 mt-10 w-[min(62rem,calc(100vw-3rem))] -translate-x-1/2">
                <CaseStudyFigure number={3} caption={DEEP_LINK_CAPTION}>
                  <DeepLinkDiagram />
                </CaseStudyFigure>
              </div>
            </section>
          </div>
        </Labelled>

        <Labelled label="E4 · the homepage's own SectionHeading treatment, reused verbatim">
          {/* Not a new device. This is the exact rule SectionHeading already
              draws under every section on the homepage -- border-b in the line
              colour with a 64px aurora segment at its left end. The case study
              page is the only page that does not use it, which is why this one
              reads as having less colour than the rest of the site. */}
          <div className="w-full">
            <header className="relative flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-6 after:absolute after:-bottom-px after:left-0 after:h-px after:w-16 after:bg-accent">
              <h2 className="text-2xl text-ink">How it deploys</h2>
              <p className="font-mono text-xs tracking-mono text-ink-muted">3 paragraphs</p>
            </header>
            <section className="mx-auto mt-10 w-full max-w-[46rem]">
              <div className="flex flex-col gap-6">
                {moss.deployment.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="relative left-1/2 mt-10 w-[min(62rem,calc(100vw-3rem))] -translate-x-1/2">
                <CaseStudyFigure number={3} caption={DEEP_LINK_CAPTION}>
                  <DeepLinkDiagram />
                </CaseStudyFigure>
              </div>
            </section>
          </div>
        </Labelled>
      </Group>

      <Group
        title="About: portrait and facts stacked"
        note="Right now the prose, the portrait and the facts are three separate columns with a gap between the last two. These stack the portrait and the facts into one column so the prose can have the rest. The last pair is the same layout with and without icons on the fact labels."
      >
        <Labelled label="A · current — three columns, portrait and facts apart">
          <div className="grid w-full gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-6 lg:col-span-5">
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="lg:col-span-3">
              <Portrait />
            </div>
            <div className="lg:col-span-3 lg:col-start-10">
              <Facts />
            </div>
          </div>
        </Labelled>

        <Labelled label="B · portrait above the facts, prose takes the rest">
          <div className="grid w-full gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-6 lg:col-span-7">
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-measure text-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9">
              <Portrait />
              <Facts />
            </div>
          </div>
        </Labelled>

        <Labelled label="C · facts above the portrait">
          <div className="grid w-full gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-6 lg:col-span-7">
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-measure text-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9">
              <Facts />
              <Portrait />
            </div>
          </div>
        </Labelled>

        <Labelled label="D · narrower right column — portrait does not dominate">
          <div className="grid w-full gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-6 lg:col-span-8">
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-measure text-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-8 lg:col-span-3 lg:col-start-10">
              <Portrait />
              <Facts />
            </div>
          </div>
        </Labelled>

        <Labelled label="D-icons · the same, with icons on the fact labels  (the thing being judged)">
          <div className="grid w-full gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-6 lg:col-span-8">
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-measure text-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-8 lg:col-span-3 lg:col-start-10">
              <Portrait />
              <Facts icons />
            </div>
          </div>
        </Labelled>

        <Labelled label="B1 · facts two-up under the portrait  (right column ~734px)">
          <div className="grid w-full gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-6 lg:col-span-7">
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-measure text-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9">
              <Portrait />
              <Facts cols={2} />
            </div>
          </div>
        </Labelled>

        <Labelled label="B2 · facts as a four-across strip below both  (same shape as the case study figures)">
          <div className="w-full">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col gap-6 lg:col-span-7">
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-measure text-lg text-ink-muted">
                  {paragraph}
                </p>
              ))}
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <Portrait />
              </div>
            </div>
            <div className="mt-12 border-t border-line pt-8">
              <Facts cols={4} />
            </div>
          </div>
        </Labelled>

        <Labelled label="B3 · facts two-up under the prose, portrait alone on the right">
          <div className="grid w-full gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-8 lg:col-span-7">
              <div className="flex flex-col gap-6">
                {ABOUT.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="max-w-measure text-lg text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              <Facts cols={2} />
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Portrait />
            </div>
          </div>
        </Labelled>
      </Group>

      <Group
        title="Skills: laying out the items inside a card"
        note="The first two tiers are single tokens; the third is full phrases, one of them 54 characters. A single middot-joined run serves the first two and turns the third into a wrapped block of text. Same four cards each time, only the item layout differs."
      >
        <Labelled label="A · one run joined by middots  (current)">
          <dl className="grid w-full gap-4 md:grid-cols-2">
            {SKILLS.tiers.map((tier) => (
              <div key={tier.id} className="flex">
                <TierCard tier={tier} layout="run" />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="B · one item per line">
          <dl className="grid w-full gap-4 md:grid-cols-2">
            {SKILLS.tiers.map((tier) => (
              <div key={tier.id} className="flex">
                <TierCard tier={tier} layout="lines" />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="C · two columns inside the card, items flow between them">
          <dl className="grid w-full gap-4 md:grid-cols-2">
            {SKILLS.tiers.map((tier) => (
              <div key={tier.id} className="flex">
                <TierCard tier={tier} layout="columns" />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="D · one per line, hairline between each  (reads as a list of evidence)">
          <dl className="grid w-full gap-4 md:grid-cols-2">
            {SKILLS.tiers.map((tier) => (
              <div key={tier.id} className="flex">
                <TierCard tier={tier} layout="ruled" />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="E · four columns, one tier each, one item per line  (no card is padded to match another)">
          <dl className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS.tiers.map((tier) => (
              <div key={tier.id} className="flex">
                <TierCard tier={tier} layout="lines" />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="F · C, but a short tier keeps one column">
          <dl className="grid w-full gap-4 md:grid-cols-2">
            {SKILLS.tiers.map((tier) => (
              <div key={tier.id} className="flex">
                <TierCard tier={tier} layout="adaptive" />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="G · F, and cards size to their own content instead of stretching to the row">
          <dl className="grid w-full items-start gap-4 md:grid-cols-2">
            {SKILLS.tiers.map((tier) => (
              <div key={tier.id} className="flex">
                <TierCard tier={tier} layout="adaptive" />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="H · F, with the gaps tier full width at the end">
          <dl className="grid w-full gap-4 md:grid-cols-2">
            {SKILLS.tiers.map((tier) => (
              <div
                key={tier.id}
                className={`flex ${tier.id === "learning" ? "md:col-span-2" : ""}`}
              >
                <TierCard tier={tier} layout="adaptive" />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="I · pills, all four tiers, equal heights  (watch the 54-character one)">
          <dl className="grid w-full gap-4 md:grid-cols-2">
            {SKILLS.tiers.map((tier) => (
              <div key={tier.id} className="flex">
                <TierCard tier={tier} layout="pills" />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="J · pills · three evidence tiers in a row, the gaps tier full width below">
          <dl className="grid w-full gap-4 lg:grid-cols-3">
            {SKILLS.tiers.map((tier) => (
              <div
                key={tier.id}
                className={`flex ${tier.id === "learning" ? "lg:col-span-3" : ""}`}
              >
                <TierCard tier={tier} layout="pills" />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="K · lines · three evidence tiers in a row, the gaps tier full width below">
          <dl className="grid w-full gap-4 lg:grid-cols-3">
            {SKILLS.tiers.map((tier) => (
              <div
                key={tier.id}
                className={`flex ${tier.id === "learning" ? "lg:col-span-3" : ""}`}
              >
                <TierCard tier={tier} layout={tier.id === "learning" ? "pills" : "lines"} />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="J2 · J at text-sm, with a pill border you can actually see">
          <dl className="grid w-full gap-4 lg:grid-cols-3">
            {SKILLS.tiers.map((tier) => (
              <div
                key={tier.id}
                className={`flex ${tier.id === "learning" ? "lg:col-span-3" : ""}`}
              >
                <TierCard tier={tier} layout="pills-sm" />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="J3 · the same at text-base — pills spread over more rows">
          <dl className="grid w-full gap-4 lg:grid-cols-3">
            {SKILLS.tiers.map((tier) => (
              <div
                key={tier.id}
                className={`flex ${tier.id === "learning" ? "lg:col-span-3" : ""}`}
              >
                <TierCard tier={tier} layout="pills-base" />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="J4 · pills where the items are tokens, lines where they are phrases">
          {/* The split is by item shape, not by tier. Two tiers hold single
              words and take pills; the academic tier holds sentences and takes
              lines, which is also what stops it setting a row height the other
              two cannot reach. */}
          <dl className="grid w-full gap-4 lg:grid-cols-3">
            {SKILLS.tiers.map((tier) => (
              <div
                key={tier.id}
                className={`flex ${tier.id === "learning" ? "lg:col-span-3" : ""}`}
              >
                <TierCard
                  tier={tier}
                  layout={tier.id === "academic" ? "lines" : "pills-sm"}
                />
              </div>
            ))}
          </dl>
        </Labelled>
      </Group>

      <Group
        title="Skills: single-word items, and icons on the pills"
        note="The academic tier rewritten as single tokens -- compounds split, not truncated. What it costs: 'Advanced SQL (views, procedures, triggers, transactions)' becomes 'Advanced SQL', which says nothing a reader can check, and 'SQL' now appears in two tiers. Icons only exist for products; RBAC, CI/CD, Networking, Security, Azure, ORMs and REST API design have no logo, so those pills stay bare."
      >
        <Labelled label="L · single-word items, pills, no icons">
          <dl className="grid w-full gap-4 lg:grid-cols-3">
            {SHORT_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`flex ${tier.id === "learning" ? "lg:col-span-3" : ""}`}
              >
                <ShortCard tier={tier} withIcons={false} />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="M · the same, with a logo on every pill that has one">
          <dl className="grid w-full gap-4 lg:grid-cols-3">
            {SHORT_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`flex ${tier.id === "learning" ? "lg:col-span-3" : ""}`}
              >
                <ShortCard tier={tier} withIcons />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="N · M, with the lost detail folded into the tier subtitle">
          <dl className="grid w-full gap-4 lg:grid-cols-3">
            {SHORT_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`flex ${tier.id === "learning" ? "lg:col-span-3" : ""}`}
              >
                <DetailCard tier={tier} place="note" />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="N2 · M, with the detail as a footnote under the pills instead">
          <dl className="grid w-full gap-4 lg:grid-cols-3">
            {SHORT_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`flex ${tier.id === "learning" ? "lg:col-span-3" : ""}`}
              >
                <DetailCard tier={tier} place="under" />
              </div>
            ))}
          </dl>
        </Labelled>
      </Group>

      <Group
        title="Skills: only items that carry a logo"
        note="Every pill has a real mark, so none looks unfinished beside another. Corrections applied: OOP is back inside Java (OOP), Oracle joins the first card since that is where the basic SQL was used, GitHub joins the second and Next.js the last. Removed and needing a home: Advanced SQL with its four clauses, CI/CD, RBAC, Networking, Security, REST API design, ORMs."
      >
        <Labelled label="O · logo-only pills, three tiers in a row, gaps tier full width">
          <dl className="grid w-full gap-4 lg:grid-cols-3">
            {LOGO_ONLY_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`flex ${tier.id === "learning" ? "lg:col-span-3" : ""}`}
              >
                <LogoCard tier={tier} />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="O2 · the same in a 2x2, cards sized to their own content">
          <dl className="grid w-full items-start gap-4 md:grid-cols-2">
            {LOGO_ONLY_TIERS.map((tier) => (
              <div key={tier.id} className="flex">
                <LogoCard tier={tier} />
              </div>
            ))}
          </dl>
        </Labelled>
      </Group>

      <Group
        title="Education as a horizontal timeline"
        note="Three levels left to right, oldest first. Each expands on hover, on keyboard focus, and on click -- hover alone would hide every topic from every phone. The topics are where the concepts pulled out of Skills have landed: Advanced SQL and its four clauses, RBAC, networking, security, CI/CD. The mapping of topic to level is inferred from each level's existing description and needs checking."
      >
        <Labelled label="P-mobile · the same component in a 375px iframe  (real breakpoints, tap to expand)">
          <iframe
            title="Degree timeline at 375px"
            src="/lab?only=timeline"
            width="375"
            height="520"
            className="rounded-md border border-line bg-ground"
          />
        </Labelled>

        <Labelled label="P · one rule, the spark travels and opens the level it is over">
          <div className="w-full">
            <DegreeTimeline levels={degreeLevels} />
            <div className="mt-12 border-t border-line pt-8">
              <h3 className="font-mono text-xs tracking-caps text-ink-muted uppercase">
                Certificates
              </h3>
              <ul className="mt-4 grid list-none gap-x-8 sm:grid-cols-3">
                {certificatesData.map((certificate) => (
                  <CertificateLink key={certificate.id} certificate={certificate} />
                ))}
              </ul>
            </div>
          </div>
        </Labelled>
      </Group>

      <Group
        title="Skills, with the last three corrections"
        note="XAMPP added to the degree tier. ORMs and REST APIs back in the gaps tier -- neither has a logo, which is why that tier is shown both ways below."
      >
        <Labelled label="Q · gaps tier mixed — two pills with a logo, two without">
          <dl className="grid w-full gap-4 lg:grid-cols-3">
            {CORRECTED_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`flex ${tier.id === "learning" ? "lg:col-span-3" : ""}`}
              >
                <LogoOrBareCard tier={tier} bareGaps={false} />
              </div>
            ))}
          </dl>
        </Labelled>

        <Labelled label="Q2 · gaps tier deliberately icon-free  (it holds concepts, not tools)">
          <dl className="grid w-full gap-4 lg:grid-cols-3">
            {CORRECTED_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`flex ${tier.id === "learning" ? "lg:col-span-3" : ""}`}
              >
                <LogoOrBareCard tier={tier} bareGaps />
              </div>
            ))}
          </dl>
        </Labelled>
      </Group>
    </div>
  </div>
)

// Lab only. One tier card, with the item layout swappable -- that is the whole
// thing being compared.
const TierCard = ({ tier, layout }) => (
  <div className={`w-full ${cardSurface({ accented: tier.id === "learning" })}`}>
    <dt>
      <span className="text-lg text-ink">{tier.label}</span>
      <span className="mt-1 block text-sm text-ink-muted">{tier.note}</span>
    </dt>
    {layout === "run" && (
      <dd className="mt-4 font-mono text-sm tracking-mono text-ink-muted">
        {tier.items.join(" · ")}
      </dd>
    )}
    {layout === "lines" && (
      <dd className="mt-4 flex flex-col gap-1.5 font-mono text-sm tracking-mono text-ink-muted">
        {tier.items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </dd>
    )}
    {layout === "columns" && (
      <dd className="mt-4 columns-2 gap-x-6 font-mono text-sm tracking-mono text-ink-muted">
        {tier.items.map((item) => (
          <span key={item} className="mb-1.5 block break-inside-avoid">
            {item}
          </span>
        ))}
      </dd>
    )}
    {/* Same as "columns", except a short tier stays in one. Three items split
        two-and-one across two columns reads as a layout accident rather than a
        decision, and the tier that names the gaps is the one that can least
        afford to look like an afterthought. */}
    {layout === "adaptive" && (
      <dd
        className={`mt-4 gap-x-6 font-mono text-sm tracking-mono text-ink-muted ${
          tier.items.length > 4 ? "columns-2" : "columns-1"
        }`}
      >
        {tier.items.map((item) => (
          <span key={item} className="mb-1.5 block break-inside-avoid">
            {item}
          </span>
        ))}
      </dd>
    )}
    {(layout === "pills" || layout === "pills-sm" || layout === "pills-base") && (
      <dd className="mt-4 flex flex-wrap gap-2">
        {tier.items.map((item) => (
          <span
            key={item}
            className={`rounded-full border tracking-mono ${
              layout === "pills-base"
                ? "px-4 py-1.5 font-mono text-base"
                : layout === "pills-sm"
                  ? "px-3.5 py-1.5 font-mono text-sm"
                  : "px-3 py-1 font-mono text-xs"
            } ${
              tier.id === "learning"
                ? "border-accent/40 text-accent"
                : layout === "pills"
                  ? "border-line text-ink-muted"
                  : // `border-line` measured 1.2:1 against the card fill --
                    // no visible edge at all. Sampled through a canvas rather
                    // than computed, because Tailwind's opacity modifiers emit
                    // oklab() and a naive parse of that returns nonsense.
                    // ink-muted at 60% lands just past the 3:1 floor for a
                    // non-text boundary; the faint fill gives the pill a body
                    // so the edge is not doing all the work.
                    "border-ink-muted/60 bg-night-600/30 text-ink-muted"
            }`}
          >
            {item}
          </span>
        ))}
      </dd>
    )}
    {layout === "ruled" && (
      <dd className="mt-4 flex flex-col font-mono text-sm tracking-mono text-ink-muted">
        {tier.items.map((item, index) => (
          <span
            key={item}
            className={index === 0 ? "py-1.5" : "border-t border-line/60 py-1.5"}
          >
            {item}
          </span>
        ))}
      </dd>
    )}
  </div>
)

// Lab only. The academic tier rewritten to single tokens -- compounds split
// rather than truncated, so "pandas & scikit-learn" becomes two pills instead
// of one shortened phrase. What it still costs is stated in the group note.
const SHORT_TIERS = SKILLS.tiers.map((tier) =>
  tier.id === "academic"
    ? {
        ...tier,
        items: [
          "Java",
          "OOP",
          "Python",
          "pandas",
          "scikit-learn",
          "Advanced SQL",
          "Azure",
          "CI/CD",
          "RBAC",
          "Networking",
          "Security",
        ],
      }
    : tier,
)

// Only products have logos. Concepts -- RBAC, CI/CD, Networking, ORMs, REST API
// design -- have none, and inventing a generic glyph for them is the failure
// mode this is meant to expose rather than hide.
const ITEM_ICONS = {
  HTML: SiHtml5,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  PHP: SiPhp,
  MySQL: SiMysql,
  React: SiReact,
  Vite: SiVite,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Git: SiGit,
  GSAP: SiGreensock,
  Java: SiOpenjdk,
  Python: SiPython,
  pandas: SiPandas,
  "scikit-learn": SiScikitlearn,
  TypeScript: SiTypescript,
}

const IconPills = ({ tier, withIcons }) => (
  <dd className="mt-4 flex flex-wrap gap-2">
    {tier.items.map((item) => {
      const Icon = ITEM_ICONS[item]
      const accent = tier.id === "learning"
      return (
        <span
          key={item}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-sm tracking-mono ${
            accent
              ? "border-accent/40 text-accent"
              : "border-ink-muted/60 bg-night-600/30 text-ink-muted"
          }`}
        >
          {withIcons && Icon && <Icon className="size-3.5 shrink-0" aria-hidden />}
          {item}
        </span>
      )
    })}
  </dd>
)

const ShortCard = ({ tier, withIcons }) => (
  <div className={`w-full ${cardSurface({ accented: tier.id === "learning" })}`}>
    <dt>
      <span className="text-lg text-ink">{tier.label}</span>
      <span className="mt-1 block text-sm text-ink-muted">{tier.note}</span>
    </dt>
    <IconPills tier={tier} withIcons={withIcons} />
  </div>
)

// Lab only. What the shortened pills dropped, put back as prose. Each clause
// exists because a pill lost it: "Advanced SQL" lost its parenthetical, Python
// lost "for data science", and RBAC lost being spelled out for a reader who
// does not know the acronym.
const RESTORED_DETAIL = {
  academic:
    "The SQL is views, stored procedures, triggers and transactions; the Python is pandas and scikit-learn for data science; the auth work is role-based access control.",
}

const DetailCard = ({ tier, place }) => {
  const detail = RESTORED_DETAIL[tier.id]
  return (
    <div className={`w-full ${cardSurface({ accented: tier.id === "learning" })}`}>
      <dt>
        <span className="text-lg text-ink">{tier.label}</span>
        <span className="mt-1 block text-sm text-ink-muted">
          {tier.note}
          {detail && place === "note" && ` ${detail}`}
        </span>
      </dt>
      <IconPills tier={tier} withIcons />
      {detail && place === "under" && (
        <p className="mt-4 border-t border-line pt-3 text-sm text-ink-muted">{detail}</p>
      )}
    </div>
  )
}

// Lab only. Every item here is a product with a real logo. The concepts that
// were sharing these cards -- Advanced SQL and its four clauses, CI/CD, RBAC,
// Networking, Security, REST API design, ORMs -- are deliberately absent,
// pending somewhere honest to put them. They are evidence and must not simply
// vanish; this variant only shows what the tiers look like once they hold one
// kind of thing.
const LOGO_ONLY_TIERS = [
  {
    id: "comfortable",
    label: "Comfortable",
    note: "Reach for these without looking things up",
    // "SQL" left as a bare pill before. It is the basic SQL, and it is what
    // MySQL and Oracle were driven with -- so the two engines carry it, and
    // the word does not need its own logo-less pill in a tier where every
    // other item has one.
    items: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "PHP", "MySQL", "Oracle"],
  },
  {
    id: "working",
    label: "Working in",
    note: "Used on the projects above, still building fluency",
    items: ["React", "Vite", "Node.js", "Express", "MongoDB", "PostgreSQL", "Git", "GitHub", "GSAP"],
  },
  {
    id: "academic",
    label: "From the degree, not from a job",
    note: "Built and graded, never shipped commercially",
    // OOP is back inside Java, which is where it belonged -- splitting them
    // made "OOP" a logo-less pill describing how the item beside it was used.
    items: ["Java (OOP)", "Python", "pandas", "scikit-learn", "Azure"],
  },
  {
    id: "learning",
    label: "Learning now",
    note: "The honest gaps, and what I am working through",
    items: ["TypeScript", "Next.js"],
  },
]

const LOGO_ICONS = {
  HTML: SiHtml5,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  PHP: SiPhp,
  MySQL: SiMysql,
  Oracle: SiOracle,
  React: SiReact,
  Vite: SiVite,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Git: SiGit,
  GitHub: SiGithub,
  GSAP: SiGreensock,
  "Java (OOP)": SiOpenjdk,
  Python: SiPython,
  pandas: SiPandas,
  "scikit-learn": SiScikitlearn,
  Azure: VscAzure,
  TypeScript: SiTypescript,
  "Next.js": SiNextdotjs,
}

const LogoCard = ({ tier }) => (
  <div className={`w-full ${cardSurface({ accented: tier.id === "learning" })}`}>
    <dt>
      <span className="text-lg text-ink">{tier.label}</span>
      <span className="mt-1 block text-sm text-ink-muted">{tier.note}</span>
    </dt>
    <dd className="mt-4 flex flex-wrap gap-2">
      {tier.items.map((item) => {
        const Icon = LOGO_ICONS[item]
        const accent = tier.id === "learning"
        return (
          <span
            key={item}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-sm tracking-mono ${
              accent
                ? "border-accent/40 text-accent"
                : "border-ink-muted/60 bg-night-600/30 text-ink-muted"
            }`}
          >
            <Icon className="size-3.5 shrink-0" aria-hidden />
            {item}
          </span>
        )
      })}
    </dd>
  </div>
)

// The proposed topic lists that lived here are gone. They were inferred from
// each level's prose description and had to be confirmed before shipping; the
// transcript at `public/certificates/results.pdf` confirmed them, corrected two
// facts and added a fourth level, and they now live in `degreeLevels` itself.
// Skills, with Slav's last three corrections applied: XAMPP into the degree
// tier, ORMs and REST APIs back into the gaps tier.
const CORRECTED_TIERS = LOGO_ONLY_TIERS.map((tier) => {
  if (tier.id === "academic") {
    return { ...tier, items: [...tier.items, "XAMPP"] }
  }
  if (tier.id === "learning") {
    return { ...tier, items: ["TypeScript", "Next.js", "ORMs", "REST APIs"] }
  }
  return tier
})

const LogoOrBareCard = ({ tier, bareGaps }) => {
  const accent = tier.id === "learning"
  const showIcons = !(accent && bareGaps)
  return (
    <div className={`w-full ${cardSurface({ accented: accent })}`}>
      <dt>
        <span className="text-lg text-ink">{tier.label}</span>
        <span className="mt-1 block text-sm text-ink-muted">{tier.note}</span>
      </dt>
      <dd className="mt-4 flex flex-wrap gap-2">
        {tier.items.map((item) => {
          const Icon = showIcons ? { ...LOGO_ICONS, XAMPP: SiXampp }[item] : null
          return (
            <span
              key={item}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-sm tracking-mono ${
                accent
                  ? "border-accent/40 text-accent"
                  : "border-ink-muted/60 bg-night-600/30 text-ink-muted"
              }`}
            >
              {Icon && <Icon className="size-3.5 shrink-0" aria-hidden />}
              {item}
            </span>
          )
        })}
      </dd>
    </div>
  )
}

const Group = ({ title, note, children }) => (
  <section className="flex flex-col gap-8">
    <div className="border-b border-line pb-4">
      <h2 className="text-2xl text-ink">{title}</h2>
      <p className="mt-2 text-sm text-ink-muted">{note}</p>
    </div>
    {children}
  </section>
)

// Lab only. Four glyphs for four facts, which is the thing being judged.
const FACT_ICONS = [FaLocationDot, FaLanguage, FaBriefcase, FaRegStar]

const Portrait = () => (
  <img
    src={portrait}
    alt=""
    width={720}
    height={900}
    className="w-full rounded-lg border border-line"
  />
)

const Facts = ({ icons = false, cols = 1 }) => (
  <dl
    className={
      cols === 1
        ? "flex flex-col gap-6"
        : `grid gap-x-8 gap-y-6 ${cols === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`
    }
  >
    {ABOUT.facts.map((fact, index) => {
      const Icon = FACT_ICONS[index]
      return (
        <div key={fact.label} className="border-t border-line pt-4">
          <dt className="flex items-center gap-2 font-mono text-xs tracking-mono text-ink-muted">
            {icons && <Icon className="size-3.5 shrink-0" aria-hidden />}
            {fact.label}
          </dt>
          <dd className="mt-1 text-ink">{fact.value}</dd>
        </div>
      )
    })}
  </dl>
)

const Labelled = ({ label, children }) => (
  <div className="flex w-full flex-col items-start gap-3">
    <span className="font-mono text-xs tracking-mono text-ink-low">{label}</span>
    {children}
  </div>
)

export default Lab
