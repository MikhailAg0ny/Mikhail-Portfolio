import type { Project, ProgrammingLanguage, Highlight, NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/(main)/about" },
  { label: "Projects", href: "/(main)/projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "/(main)/contact" },
];

export const featuredProjects: Project[] = [
  {
    title: "PromptQuest AI Hackathon Winner",
    description:
      "Shipped an AI-assisted puzzle narrative in 72 hours, owning gameplay systems, UX writing, and pitch-ready storytelling.",
    link: "/(main)/projects#promptquest",
    tags: ["Next.js", "OpenAI", "Game Design"],
  },
  {
    title: "UXPH 2025 Experience Hub",
    description:
      "Built an event microsite with speaker journeys, schedule personalization, and analytics-informed content strategy.",
    link: "/(main)/projects#uxph",
    tags: ["Content Design", "TailwindCSS", "Accessibility"],
  },
  {
    title: "Java OOP2 Game Showcase",
    description:
      "Crafted a lightweight arcade experience to demonstrate clean architecture, smooth animations, and controller support.",
    link: "/(main)/projects#oop2",
    tags: ["Java", "Game Loop", "Pixel Art"],
  },
];

export const programmingLanguages: ProgrammingLanguage[] = [
  { name: "JavaScript", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Java", level: 80 },
  { name: "Python", level: 75 },
  { name: "C#", level: 70 },
  { name: "HTML/CSS", level: 95 },
];

export const frameworks = [
  "Next.js",
  "React",
  "TailwindCSS",
  "Chakra UI",
  "Three.js",
  "Unity",
  "Node.js",
  "Express",
];

export const highlights: Highlight[] = [
  { label: "Years Experience", value: "5+" },
  { label: "Hackathon Wins", value: "3" },
  { label: "Projects Built", value: "20+" },
];

export const principles = [
  "Start with narrative clarity",
  "Prototype quickly, iterate publicly",
  "Document decisions and measure impact",
];
