import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaFacebookF,
  FaReact,
  FaNode,
  SiTailwindcss,
  SiGreensock,
  SiJavascript,
  SiGit,
  SiExpress,
  SiPhp,
} from "../assets/icons"
import mossShot from "../assets/images/projects/moss-storefront.jpg"

const base = import.meta.env.BASE_URL

export const PERSONAL = {
  email: "hello@spireforge.co.uk",
  linkedin: "https://www.linkedin.com/in/slavi-lambov-a69a65229",
  github: "https://github.com/STL73",
  cv: `${base}resume/CV.pdf`,
  site: "https://spireforge.co.uk",
  gmailCompose: "https://mail.google.com/mail/?view=cm&fs=1&to=hello@spireforge.co.uk",
  location: "UK · Open to remote (incl. Bulgaria)",
  workStatus: "Open to work",
  tagline: "Frontend Developer building fast, accessible web experiences.",
}

/**
 * Hero copy.
 *
 * The largest type on the page is a sentence, not a name. Nobody hires on the
 * strength of a name, and every other portfolio in the pile sets it at 96px --
 * so the space goes to the one claim that is true of Slav and almost nobody
 * else applying for the same roles.
 *
 * `claim` and `turn` are two sentences rather than one string so the second can
 * drop to muted ink: the eye takes the assertion, then the pivot.
 */
export const HERO = {
  eyebrow: "Slav Lambov · Manchester",
  claim: "For eight years I ran a supermarket.",
  turn: "Now I build the software that would have made the job easier.",
}

/**
 * The two career tracks, drawn as parallel lanes under the hero.
 *
 * They do not converge and they are not a before-and-after. Both are still
 * running: the degree was taken in the evenings across 2021-2025 without the
 * day job stopping, and it has not stopped now. That concurrency is the fact
 * the rest of the page hangs off, so it gets the signature element.
 *
 * `offset` is where the lane's rule begins, as a percentage of the full span,
 * so the computing lane visibly starts inside the other one. No absolute start
 * year is shown because none is recorded anywhere -- "13 years" is the figure
 * that is actually verifiable, and it is the one that lands harder anyway.
 */
export const careerTracks = [
  {
    id: "work",
    label: "retail & warehouse management",
    figure: "13 years",
    offset: 0,
  },
  {
    id: "computing",
    label: "computing",
    figure: "2021 →",
    offset: 46,
  },
]

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "My Projects" },
  { href: "#about", label: "About Me" },
  { href: "#skills", label: "My Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
]

export const techStack = [
  { id: 1, name: "React",      icon: FaReact },
  { id: 2, name: "Node.js",    icon: FaNode },
  { id: 3, name: "JavaScript", icon: SiJavascript },
  { id: 4, name: "Tailwind",   icon: SiTailwindcss },
  { id: 5, name: "GSAP",       icon: SiGreensock },
  { id: 6, name: "Git",        icon: SiGit },
  { id: 7, name: "Express",    icon: SiExpress },
  { id: 8, name: "PHP",        icon: SiPhp },
]

export const educationData = [
  {
    id: 1,
    period: "2021 - 2025",
    type: "Degree",
    title: "BSc in Computing Sciences",
    institution: "Arden University, Manchester",
    description: "Software engineering, web development, UI/UX foundations.",
  },
  {
    id: 2,
    period: "1986 - 1991",
    type: "Diploma",
    title: "High School Diploma",
    institution: "Secondary School 'Kliment Ohridski', Bulgaria",
    description: "Mathematics, physics, and general education curriculum.",
  },
]

export const experienceData = [
  {
    id: 1,
    period: "Level 6 (2024-2025)",
    type: "Specialisation",
    title: "Advanced Development & Cloud",
    institution: "Arden University",
    description:
      "Web application development, distributed systems, cloud computing, data mining, and project management.",
  },
  {
    id: 2,
    period: "Level 5 (2023-2024)",
    type: "Core Skills",
    title: "Software Engineering & Data",
    institution: "Arden University",
    description:
      "Object-oriented programming, database design, HCI, system analysis, data visualisation, and IT project management.",
  },
  {
    id: 3,
    period: "Level 4 (2022-2023)",
    type: "Foundations",
    title: "Web & Programming Fundamentals",
    institution: "Arden University",
    description:
      "Web authoring, databases, programming basics, computer systems, security, and collaboration tools.",
  },
]

export const certificatesData = [
  {
    id: 1,
    title: "BSc in Computing Sciences",
    issuer: "Arden University, Manchester",
    date: "2025",
    fileUrl: `${base}certificates/diploma.pdf`,
    fileSize: "282KB",
  },
  {
    id: 2,
    title: "Arden Achievement Certificate",
    issuer: "Arden University",
    date: "2023",
    fileUrl: `${base}certificates/arden-achieve-certificate.pdf`,
    fileSize: "195KB",
  },
  {
    id: 3,
    title: "Program Results",
    issuer: "Arden University, Manchester",
    date: "2025",
    fileUrl: `${base}certificates/results.pdf`,
    fileSize: "409KB",
  },
  {
    id: 4,
    title: "High School Diploma",
    issuer: "Secondary School 'Kliment Ohridski'",
    date: "1991",
    fileUrl: `${base}certificates/diploma-BG.pdf`,
    fileSize: "210KB",
  },
]

export const skillsData = [
  {
    id: 1,
    title: "Frontend",
    description: "React apps, component systems, animation, and performance tuning.",
    skills: ["React", "Vite", "Tailwind", "JavaScript", "Node.js", "GSAP"],
  },
  {
    id: 2,
    title: "Design",
    description: "Visual systems, prototyping, and clean, consistent UI flows.",
    skills: ["Figma", "UI Systems", "Prototyping", "Wireframing", "Branding", "Handoff"],
  },
  {
    id: 3,
    title: "Delivery",
    description: "Collaboration, APIs, and shipping fast without breaking quality.",
    skills: ["Git", "REST APIs", "Performance", "Accessibility", "SEO", "Testing"],
  },
  {
    id: 4,
    title: "Backend",
    description: "Server-side tools and data management.",
    skills: ["Node.js", "Express", "PHP", "SQL", "MongoDB", "REST APIs", "XAMPP"],
  },
]

export const projectsData = [
  {
    id: 1,
    year: "2026",
    title: "Moss — preserved-moss storefront",
    description:
      "A storefront for a preserved-moss decorations business, deployed and running on a custom domain. React 19 client with every route lazy-loaded, a mock catalogue held behind a single API module so the swap to real data is one file, and a colour-contrast contract asserted in tests against the stylesheet itself. The Express API is half-built: authentication works, the product and order routes are still stubs.",
    technologies: ["React 19", "Vite", "Tailwind", "Express", "MongoDB", "Vitest"],
    image: mossShot,
    status: "live",
    liveUrl: "https://mossart.spireforge.co.uk",
    githubUrl: "https://github.com/STL73/Moss",
  },
  {
    id: 2,
    year: "2026",
    title: "WorldQuiz",
    description:
      "A geography quiz built deliberately in vanilla PHP and MySQLi rather than a framework — 46 landmarks, a token economy, server-side progress that survives the session, and role-gated admin dashboards for managing questions and users. Runs locally under XAMPP; not deployed.",
    technologies: ["PHP", "MySQLi", "JavaScript", "CSS"],
    image: null,
    status: "wip",
    liveUrl: null,
    githubUrl: "https://github.com/STL73/WorldQuiz",
  },
  {
    id: 3,
    year: "2025",
    title: "Manchester Event Portal",
    description:
      "Final-year Computing project: an events portal with event CRUD, ticketing status, user management, contact handling and an admin statistics dashboard, written in PHP against MySQL. Graded First Class. Repository is private because it is assessed coursework.",
    technologies: ["PHP", "MySQL", "Tailwind", "XAMPP"],
    image: null,
    status: "private",
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 4,
    year: "2026",
    title: "This portfolio",
    description:
      "The site you are reading. React 19 and Vite, everything below the fold code-split behind a Suspense boundary, GSAP scroll animations that respect prefers-reduced-motion, and all copy centralised in one constants file. Source is public; it is not yet deployed to its own domain.",
    technologies: ["React 19", "Vite", "Tailwind v4", "GSAP"],
    image: null,
    status: "wip",
    liveUrl: null,
    githubUrl: "https://github.com/STL73/MyPortfolio",
  },
]

// Marquee strip items for the Skills section ticker
export const MARQUEE_ITEMS = [
  "React",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "GSAP",
  "Vite",
  "Figma",
  "Node.js",
  "Express",
  "PHP",
  "SQL",
  "MongoDB",
  "XAMPP",
  "REST APIs",
  "Git",
  "GitHub",
  "Responsive Design",
  "Accessibility",
]

export const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", link: "#home" },
      { name: "About Me", link: "#about" },
      { name: "My Projects", link: "#projects" },
      { name: "My Skills", link: "#skills" },
      { name: "Education", link: "#education" },
      { name: "Contact", link: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [{ name: "Resume/CV", link: `${base}resume/CV.pdf` }],
  },
  {
    title: "Connect",
    links: [
      {
        name: "hello@spireforge.co.uk",
        link: "mailto:hello@spireforge.co.uk",
      },
      {
        name: "LinkedIn Profile",
        link: "https://www.linkedin.com/in/slavi-lambov-a69a65229",
      },
      { name: "GitHub", link: "https://github.com/STL73" },
    ],
  },
]

export const socialMedia = [
  {
    src: FaLinkedinIn,
    alt: "linkedin logo",
    link: "https://www.linkedin.com/in/slavi-lambov-a69a65229",
  },
  { src: FaGithub, alt: "github logo", link: "https://github.com/STL73" },
  {
    src: FaInstagram,
    alt: "instagram logo",
    link: "https://www.instagram.com/slavitl73/",
  },
  {
    src: FaXTwitter,
    alt: "twitter logo",
    link: "https://x.com/home/@SlaviLambov73",
  },
  {
    src: FaTiktok,
    alt: "tiktok logo",
    link: "https://www.tiktok.com/@stlambov?is_from_webapp=1&sender_device=pc",
  },
  {
    src: FaFacebookF,
    alt: "facebook logo",
    link: "https://www.facebook.com/rafael.rage.5",
  },
]
