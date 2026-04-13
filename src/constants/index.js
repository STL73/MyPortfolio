import {
  headerLogo,
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
import placeholderImg from "../assets/images/placeholder.svg"

const base = import.meta.env.BASE_URL

export const PERSONAL = {
  email: "slavi.lambov73@gmail.com",
  linkedin: "https://www.linkedin.com/in/slavi-lambov-a69a65229",
  github: "https://github.com/STL73",
  cv: `${base}resume/CV.pdf`,
  site: "https://slavlambov.github.io/my-portfolio/",
  gmailCompose: "https://mail.google.com/mail/?view=cm&fs=1&to=slavi.lambov73@gmail.com",
  location: "UK · Open to remote (incl. Bulgaria)",
  workStatus: "Open to work",
  tagline: "Frontend Developer building fast, accessible web experiences.",
}

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Me" },
  { href: "#projects", label: "My Projects" },
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
    year: "2024",
    title: "Portfolio Redesign",
    description:
      "Performance-first portfolio with custom animations, smooth navigation, and a clear storytelling flow.",
    technologies: ["React", "Vite", "Tailwind", "GSAP"],
    image: headerLogo,
    status: "live",
    liveUrl: "https://slavlambov.github.io/my-portfolio/",
    githubUrl: "https://github.com/STL73",
  },
  {
    id: 2,
    year: "2023",
    title: "E-Commerce UI",
    description: "Product listing, filters, and checkout flow optimized for conversion.",
    technologies: ["React", "Redux", "Stripe"],
    image: placeholderImg,
    status: "wip",
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 3,
    year: "2022",
    title: "Event Landing",
    description: "Bold landing page with hero motion and CTA-driven layout.",
    technologies: ["Next.js", "Tailwind", "Framer"],
    image: placeholderImg,
    status: "wip",
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 4,
    year: "2021",
    title: "SaaS Dashboard",
    description: "Data-rich dashboard with clean hierarchy and reusable components.",
    technologies: ["React", "Chart.js", "Tailwind"],
    image: placeholderImg,
    status: "wip",
    liveUrl: null,
    githubUrl: null,
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
        name: "slavi.lambov73@gmail.com",
        link: "mailto:slavi.lambov73@gmail.com",
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
