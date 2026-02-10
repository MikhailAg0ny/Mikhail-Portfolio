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
    timeframe: "2026",
    image: "/Pictures/GennyFilipinoFood/genny_filipino_food_1.png",
    title: "Mabuhay Meals",
    primaryTech: "Full-Stack Web Development",
    featuredTechs: ["Next.js", "TypeScript", "Tailwind CSS", "EmailJS"],
    projectType: "client",

    description:
      "Mabuhay Meals functions as the online hub for a home-based kitchen in Ramkvilla, Sweden, showcasing authentic Filipino menus and culinary workshops.",
    caseStudyUrl: "https://gennyfilipinokitchen.vercel.app",
    showCaseStudyButton: true,
    images: [
      "/Pictures/GennyFilipinoFood/genny_filipino_food_1.png",
      "/Pictures/GennyFilipinoFood/genny_filipino_food_2.png",
      "/Pictures/GennyFilipinoFood/genny_filipino_food_3.png",
      "/Pictures/GennyFilipinoFood/genny_filipino_food_4.png",
      "/Pictures/GennyFilipinoFood/genny_filipino_food_5.png",
    ],
  },
  {
    timeframe: "2024",
    image: "/Pictures/JAVA_OOP2_GAME/JAVA OOP2 GROUP.jpg",
    title: "HeroConquest Turn Based RPG",
    primaryTech: "Java OOP2 Game",
    featuredTechs: ["Apache Netbeans", "Java", "SQL"],
    projectType: "school",

    description:
      "A Java-based turn-based RPG with custom pixel art, party management systems, and tactical combat built in Apache NetBeans.",
    caseStudyUrl: "#",
    sourceUrl: "https://github.com/MikhailAg0ny/Heroes-Conquest-RPG-Game-JavaOOP2",
    showCaseStudyButton: false,
    images: [
      "/Pictures/JAVA_OOP2_GAME/HeroesConquest_1.png",
      "/Pictures/JAVA_OOP2_GAME/HeroesConquest_2.png",
      "/Pictures/JAVA_OOP2_GAME/HeroesConquest_3.png",
      "/Pictures/JAVA_OOP2_GAME/JAVA OOP2 GROUP.jpg",
    ],
  },
  {
    timeframe: "2024",
    image: "/Pictures/Sapatosan/1_sapatosan.png",
    title: "Sapatosan",
    primaryTech: "CSIT321 Applications Development",
    featuredTechs: ["Springboot", "Reactjs", "Vite", "Java"],
    projectType: "school",

    description:
      "A responsive footwear marketplace with secure customer checkout and a dedicated administrative suite for full control over inventory, orders, and users.",
    caseStudyUrl: "#",
    sourceUrl: "https://github.com/rommelmars/Sapatosan",
    showCaseStudyButton: false,
    images: [
      "/Pictures/Sapatosan/1_sapatosan.png",
      "/Pictures/Sapatosan/2_sapatosan.png",
      "/Pictures/Sapatosan/3_sapatosan.png",
      "/Pictures/Sapatosan/4_sapatosan.png",
      "/Pictures/Sapatosan/5_sapatosan.png",
      "/Pictures/Sapatosan/6_sapatosan.png",
      "/Pictures/Sapatosan/7_sapatosan.png",
      "/Pictures/Sapatosan/8_sapatosan.png",
    ],
  },
  {
    timeframe: "2025",
    image: "/Pictures/Barangay360/1_barangay360.png",
    title: "Barangay360 Web and Mobile",
    primaryTech: "IT342 Systems Integration and Architecture",
    featuredTechs: ["Kotlin", "Android Studio", "Springboot", "MySQL"],
    projectType: "school",

    description:
      "A community-centric platform designed to strengthen communication and engagement between barangay officials and residents.",
    caseStudyUrl: "https://barangay360.vercel.app/",
    sourceUrl: "https://github.com/karl2522/IT342-G2-Barangay360",
    showCaseStudyButton: true,
    images: [
      "/Pictures/Barangay360/1_barangay360.png",
    ],
  },
  {
    timeframe: "2025",
    image: "/Pictures/TimEd/1_timed.png",
    title: "TimEd - Smart Educational Time Management System",
    primaryTech: "Capstone Project",
    featuredTechs: ["Reactjs", "Firebase", "Springboot"],
    projectType: "school",

    description:
      "TimEd is a time management platform that helps schools and universities streamline event organization, real-time attendance, and department management.",
    caseStudyUrl: "https://timedsystem.netlify.app/",
    sourceUrl: "https://github.com/MikhailAg0ny/Timed-Project",
    showCaseStudyButton: true,
    images: [
      "/Pictures/TimEd/1_timed.png",
    ],
  },

];

const projectTypePriority: Record<string, number> = {
  client: 1,
  side: 2,
  school: 3,
};

const sortedProjects = [...myProjects].sort((a, b) => {
  // Primary sort: by year (descending - latest first)
  const yearDiff = parseInt(b.timeframe) - parseInt(a.timeframe);
  if (yearDiff !== 0) return yearDiff;

  // Secondary sort: by project type (client > side > school)
  const aPriority = projectTypePriority[a.projectType || 'school'] || 3;
  const bPriority = projectTypePriority[b.projectType || 'school'] || 3;
  return aPriority - bPriority;
});

export const projects = sortedProjects;

export const getProjectsByCategory = (category: ProjectCategory): ProjectCaseStudy[] => {
  switch (category) {
    case "featured":
      // At the moment everything is featured; add a boolean field to filter later
      return sortedProjects;
    case "all":
    default:
      return sortedProjects;
  }
};
