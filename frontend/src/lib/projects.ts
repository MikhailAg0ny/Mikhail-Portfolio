//DO NOT TOUCH UNLESS I SAY SO

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
    title: "HeroConquest Turn Based RPG",
    primaryTech: "Java OOP2 Game",
    featuredTechs: ["Apache Netbeans", "Java"],
    stack: [
      "Java OOP2 Game",
      "Apache Netbeans",
      "Java",
    ],
    role: "Game Programmer, Pixel Artist",
    description:
      "A Java-based turn-based RPG with custom pixel art, party management systems, and tactical combat built in Apache NetBeans.",
    caseStudyUrl: "#",
    sourceUrl: "#",
    showCaseStudyButton: false,
    images: [
      "/Pictures/JAVA_OOP2_GAME/JAVA OOP2 GROUP.jpg",
      "/Pictures/UXPH_EVENT_2025/uxph_1.jpeg",
    ],
  },
  {
    timeframe: "2023",
    image: "/Pictures/UXPH_EVENT_2025/uxph_1.jpeg",
    title: "Indie Dev Portfolio Engine",
    primaryTech: "Full-Stack Development",
    featuredTechs: ["Automation", "Deployment Pipeline"],
    stack: ["Full-Stack Development", "Automation", "Deployment Pipeline"],
    role: "Lead Developer",
    description:
      "A customizable portfolio engine for indie developers featuring modular content models, theming controls, and an automated deployment pipeline.",
    caseStudyUrl: "#",
    sourceUrl: "#",
    showCaseStudyButton: true,
    images: [
      "/Pictures/UXPH_EVENT_2025/uxph_1.jpeg",
      "/Pictures/JAVA_OOP2_GAME/JAVA OOP2 GROUP.jpg",
    ],
  },
  {
    timeframe: "2023",
    image: "/images/projects/roblox-showcase.jpg",
    title: "Roblox",
    primaryTech: "Game Systems",
    featuredTechs: ["Luau Scripting", "Live Ops"],
    stack: ["Game Systems", "Luau Scripting", "Live Ops"],
    role: "Lead Developer",
    description:
      "Delivered live operations tooling and core gameplay systems for Roblox experiences using Luau scripting and data-driven events.",
    caseStudyUrl: "#",
    sourceUrl: "#",
    showCaseStudyButton: true,
    images: [
      "/images/projects/roblox-showcase.jpg",
    ],
  },
  {
    timeframe: "2024",
    image: "/images/projects/pbr-asset-manager.jpg",
    title: "PBR Asset Manager",
    primaryTech: "UI/UX Design",
    featuredTechs: ["Wireframing", "User Research"],
    stack: ["UI/UX Design", "Wireframing", "User Research"],
    role: "UI/UX Designer",
    description:
      "Designed a drag-and-drop interface for browsing, tagging, and managing large PBR asset libraries with real-time 3D previews and smart tagging.",
    caseStudyUrl: "#",
    sourceUrl: "#",
    showCaseStudyButton: true,
    images: [
      "/images/projects/pbr-asset-manager.jpg",
    ],
  },
  {
    timeframe: "2023",
    image: "/images/projects/open-source-engine-docs.jpg",
    title: "Open-Source Engine Docs",
    primaryTech: "Static Site Generation",
    featuredTechs: ["Search Integration", "Technical Writing"],
    stack: ["Static Site Generation", "Search Integration", "Technical Writing"],
    role: "Technical Writer & Front-End Developer",
    description:
      "Rebuilt the documentation for an open-source engine with static generation, advanced search integration, and interactive tutorials to boost adoption.",
    caseStudyUrl: "#",
    sourceUrl: "#",
    showCaseStudyButton: true,
    images: [
      "/images/projects/open-source-engine-docs.jpg",
    ],
  },
  {
    timeframe: "2024",
    image: "/images/projects/pixel-tribe-hub.jpg",
    title: "Pixel Tribe Community Hub",
    primaryTech: "Community Platform",
    featuredTechs: ["API Integration", "Database Management"],
    stack: ["Community Platform", "API Integration", "Database Management"],
    role: "Full-Stack Developer",
    description:
      "Developed a community hub with API-driven leaderboards, user-generated content galleries, and OAuth integration to extend an indie game's reach.",
    caseStudyUrl: "#",
    sourceUrl: "#",
    showCaseStudyButton: true,
    images: [
      "/images/projects/pixel-tribe-hub.jpg",
    ],
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
