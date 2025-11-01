import type {
  Achievement,
  Certificate,
  ContactChannel,
  Experience,
  Highlight,
  ProgrammingLanguage,
  ProjectCaseStudy,
} from "@/types";

export const highlights: Highlight[] = [
  { label: "Years Experience", value: "1+" },
  { label: "Hackathon Wins", value: "3" },
  { label: "Projects Built", value: "5+" },
];

export const experience: Experience[] = [
  {
    role: "Full-Stack Developer",
    company: "Indie Studio Collective",
    period: "2023 — Present",
    summary:
      "Lead developer across web and game prototypes, owning discovery, UX, and front-end build pipelines.",
  },
  {
    role: "Associate Software Engineer",
    company: "Tech Agency",
    period: "2021 — 2023",
    summary:
      "Delivered marketing sites and internal tools with emphasis on accessibility, automation, and developer experience.",
  },
];

export const interests: string[] = [
  "Gameplay prototyping",
  "Interactive storytelling",
  "Design systems",
  "Developer tooling",
];

export const programmingLanguages: ProgrammingLanguage[] = [
  { name: "JavaScript", level: "S" },
  { name: "TypeScript", level: "S" },
  { name: "Java", level: "A" },
  { name: "Python", level: "A" },
  { name: "C#", level: "B" },
  { name: "HTML/CSS", level: "S" },
];



export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    title: "Mythic Quest Companion",
    role: "Product Designer & Front-End Developer",
    timeframe: "2024",
    problem:
      "Increase player retention with a lore companion experience that works seamlessly on web and mobile.",
    solution:
      "Built a headless CMS driven site with in-browser mini games, accessibility-first navigation, and a component library shared with in-game overlays.",
    results: [
      "+38% session duration",
      "22% reduction in support tickets",
      "Optimized TTI under 1.2s",
    ],
    caseStudyUrl: "#",
    sourceUrl: "#",
    stack: ["Frontend Development", "Component Architecture", "Performance Optimization"],
  },
  {
    title: "Indie Dev Portfolio Engine",
    role: "Lead Developer",
    timeframe: "2023",
    problem:
      "Ship customizable portfolio templates for game developers with minimal setup.",
    solution:
      "Architected a modular content model, delivered theming controls, and automated deployments.",
    results: ["12+ live portfolios", "Average Lighthouse 95+", "2 week turnaround"],
    caseStudyUrl: "#",
    sourceUrl: "#",
    stack: ["Full-Stack Development", "Automation", "Deployment Pipeline"],
  },
  {
    title: "Roblox",
    role: "Lead Developer",
    timeframe: "2023",
    problem:
      "Ship customizable portfolio templates for game developers with minimal setup.",
    solution:
      "Architected a modular content model, delivered theming controls, and automated deployments.",
    results: ["12+ live portfolios", "Average Lighthouse 95+", "2 week turnaround"],
    caseStudyUrl: "#",
    sourceUrl: "#",
    stack: ["Full-Stack Development", "Automation", "Deployment Pipeline"],
  },
];
// Alias for general project listing usage
export const projects: ProjectCaseStudy[] = projectCaseStudies;

export const achievements: Achievement[] = [
  {
    title: "Game Jam Grand Winner",
    event: "PromptQuest Hackathon",
    year: "2025",
    highlight:
      "Designed and programmed an AI-assisted puzzle game in 72 hours, earning top marks for storytelling and technical execution.",
  },
  {
    title: "UXPH Spotlight Speaker",
    event: "UXPH Conference",
    year: "2024",
    highlight:
      "Presented a live case study on aligning player empathy with design systems for cross-platform experiences.",
  },
  {
    title: "Design System Accelerator",
    event: "Internal Agency Award",
    year: "2023",
    highlight:
      "Led a cross-functional initiative that reduced component delivery time by 40% and improved accessibility scores across products.",
  },
];

export const certifications: Certificate[] = [
  {
    name: "Google UX Design Professional Certificate",
    issuer: "Google / Coursera",
    date: "2024",
    focus: "Human-centered research, low-to-high fidelity prototyping, usability testing.",
  },
  {
    name: "Meta Front-End Developer Certificate",
    issuer: "Meta / Coursera",
    date: "2023",
    focus: "Design systems, accessibility-first component development, CI/CD pipelines.",
  },
  {
    name: "Unity Certified Associate: Game Developer",
    issuer: "Unity",
    date: "2022",
    focus: "Gameplay systems, performance optimization, and cross-platform deployment.",
  },
];

export const contactChannels: ContactChannel[] = [
  {
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/username",
    href: "https://linkedin.com/in/username",
  },
  {
    label: "GitHub",
    value: "github.com/username",
    href: "https://github.com/username",
  },
];
