import type { ProjectCaseStudy } from "@/types";

export type ProjectCategory = "all" | "featured";

export const PROJECTS_PER_VIEW = 3;

export const PROJECT_CATEGORIES: { key: ProjectCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "featured", label: "Featured" },
];

export const myProjects: ProjectCaseStudy[] = [
  {
    timeframe: "2024",
    image: "/Pictures/JAVA_OOP2_GAME/JAVA OOP2 GROUP.jpg",
    title: "Mythic Quest Companion",
    primaryTech: "Java OOP2 Game",
    featuredTechs: ["Apache Netbeans", "Java"],
    stack: [
      "Java OOP2 Game",
      "Apache Netbeans",
      "Java",
    ],
    role: "Product Designer & Front-End Developer",
    // Modal details
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
  },
  {
    timeframe: "2023",
    image: "/Pictures/UXPH_EVENT_2025/uxph_1.jpeg",
    title: "Indie Dev Portfolio Engine",
    primaryTech: "Full-Stack Development",
    featuredTechs: ["Automation", "Deployment Pipeline"],
    stack: ["Full-Stack Development", "Automation", "Deployment Pipeline"],
    role: "Lead Developer",
    // Modal details
    problem:
      "Ship customizable portfolio templates for game developers with minimal setup.",
    solution:
      "Architected a modular content model, delivered theming controls, and automated deployments.",
    results: ["12+ live portfolios", "Average Lighthouse 95+", "2 week turnaround"],
    caseStudyUrl: "#",
    sourceUrl: "#",
  },
  {
    timeframe: "2023",
    image: "/images/projects/roblox-showcase.jpg",
    title: "Roblox",
    primaryTech: "Game Systems",
    featuredTechs: ["Luau Scripting", "Live Ops"],
    stack: ["Game Systems", "Luau Scripting", "Live Ops"],
    role: "Lead Developer",
    // Modal details
    problem:
      "Ship customizable portfolio templates for game developers with minimal setup.",
    solution:
      "Architected a modular content model, delivered theming controls, and automated deployments.",
    results: ["12+ live portfolios", "Average Lighthouse 95+", "2 week turnaround"],
    caseStudyUrl: "#",
    sourceUrl: "#",
  },
  {
    timeframe: "2024",
    image: "/images/projects/pbr-asset-manager.jpg",
    title: "PBR Asset Manager",
    primaryTech: "UI/UX Design",
    featuredTechs: ["Wireframing", "User Research"],
    stack: ["UI/UX Design", "Wireframing", "User Research"],
    role: "UI/UX Designer",
    // Modal details
    problem:
      "Game artists needed a way to visually browse, tag, and manage a massive library of 3D assets and materials without technical overhead.",
    solution:
      "Designed a drag-and-drop interface with real-time 3D model previews, batch-editing for metadata, and a smart-tagging system.",
    results: ["-50% time spent searching for assets", "Artist adoption rate of 95%", "Standardized asset library"],
    caseStudyUrl: "#",
    sourceUrl: "#",
  },
  {
    timeframe: "2023",
    image: "/images/projects/open-source-engine-docs.jpg",
    title: "Open-Source Engine Docs",
    primaryTech: "Static Site Generation",
    featuredTechs: ["Search Integration", "Technical Writing"],
    stack: ["Static Site Generation", "Search Integration", "Technical Writing"],
    role: "Technical Writer & Front-End Developer",
    // Modal details
    problem:
      "A new engine struggled with adoption because its documentation was disorganized, hard to search, and not beginner-friendly.",
    solution:
      "Migrated all content to a static site generator, implemented powerful algorithmic search, and rewrote key tutorials with interactive code samples.",
    results: ["+200% daily active doc users", "Community contributions to docs increased", "Ranked #1 on Google for key engine queries"],
    caseStudyUrl: "#",
    sourceUrl: "#",
  },
  {
    timeframe: "2024",
    image: "/images/projects/pixel-tribe-hub.jpg",
    title: "Pixel Tribe Community Hub",
    primaryTech: "Community Platform",
    featuredTechs: ["API Integration", "Database Management"],
    stack: ["Community Platform", "API Integration", "Database Management"],
    role: "Full-Stack Developer",
    // Modal details
    problem:
      "An indie game needed a hub for players to share creations, form guilds, and view leaderboards outside of the game client.",
    solution:
      "Developed a secure forum with API-driven leaderboards, user-generated content galleries, and OAuth integration with the game's auth system.",
    results: ["10,000+ user accounts in 3 months", "User-generated content drove social engagement", "Reduced developer time on community management"],
    caseStudyUrl: "#",
    sourceUrl: "#",
  },
];

export const projects = myProjects;

export const getProjectsByCategory = (category: ProjectCategory): ProjectCaseStudy[] => {
  switch (category) {
    case "featured":
      // At the moment everything is featured; add a boolean field to filter later
      return myProjects;
    case "all":
    default:
      return myProjects;
  }
};
