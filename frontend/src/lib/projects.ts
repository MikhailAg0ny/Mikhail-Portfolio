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
    featuredTechs: ["Apache Netbeans", "Java", "SQL"],
    stack: [
      "Apache Netbeans",
      "Java",
      "SQL",
    ],
    role: "Game Programmer, Pixel Artist",
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
    stack: ["Full-Stack Development", "Automation", "Deployment Pipeline"],
    role: "Frontend And Backend Developer",
    description:
      "Sapatosan E-Commerce Platform: A full-stack application built with Spring Boot and React, featuring a secure RESTful API, JWT authentication, and a responsive user interface.",
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
    primaryTech: "IT342	Systems Integration and Architecture",
    featuredTechs: ["Kotlin", "Android Studio", "Springboot", "MySQL"],
    stack: ["Game Systems", "Luau Scripting", "Live Ops"],
    role: "Mobile Developer",
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
    primaryTech: "UI/UX Design",
    featuredTechs: ["Wireframing", "User Research"],
    stack: ["Mobile", "User Research"],
    role: "Mobile Developer, Tester",
    description:
      "TimEd is a time management platform that helps schools and universities streamline event organization, real-time attendance, and department management.",
    caseStudyUrl: "https://timedsystem.netlify.app/",
    sourceUrl: "https://github.com/cabadany/TimEd",
    showCaseStudyButton: true,
    images: [
      "/Pictures/TimEd/1_timed.png",
    ],
  },
  {
    timeframe: "2025",
    image: "/Pictures/Identity_Fragments_Of_Me/1_identity.png",
    title: "Identity: Fragments of Me (Godot Turn-based Horror)",
    primaryTech: "Godot Game",
    featuredTechs: ["Search Integration", "Technical Writing"],
    stack: ["Static Site Generation", "Search Integration", "Technical Writing"],
    role: "Technical Writer & Front-End Developer",
    description:
      "Identity: Fragments of Me A psychological turn-based horror RPG in Godot, blending strategic combat and exploration as players reconstruct a fractured psyche in a shifting reality.",
    caseStudyUrl: "#",
    sourceUrl: "https://github.com/danrave1234/Godot-Project",
    showCaseStudyButton: false,
    images: [
      "/Pictures/Identity_Fragments_Of_Me/1_identity.png",
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
