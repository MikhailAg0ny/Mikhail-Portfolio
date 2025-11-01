// Skill data types and constants
export interface Skill {
  name: string;
  icon: string;
}

export type SkillCategory = "languages" | "tools" | "platforms";

// Tools & Software
export const tools: Skill[] = [
  { name: "GitHub Copilot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Godot Engine", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg" },
  { name: "Roblox Studio", icon: "https://cdn-1.webcatalog.io/catalog/roblox-studio/roblox-studio-icon-filled-256.png?v=1684801410955" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Figma", icon: "https://cdn.jim-nielsen.com/macos/1024/figma-2021-05-05.png" },
  { name: "MySQL", icon: "https://www.nicepng.com/png/detail/14-143154_mysql-dolphin-square-mysql-dolphin-logo.png" },
  { name: "Aseprite", icon: "https://images.seeklogo.com/logo-png/50/1/aseprite-logo-png_seeklogo-506592.png" },
  { name: "React.js", icon: "https://www.svgrepo.com/show/355190/reactjs.svg" },
  { name: "Next.js", icon: "https://seekicon.com/free-icon-download/nextjs_2.png" },
];

// Platforms & Frameworks
export const platforms: Skill[] = [
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
];

// Languages & Technologies
export const languages: Skill[] = [
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg" },
  { name: "Lua", icon: "https://handwiki.org/wiki/images/thumb/c/cf/Lua-Logo.svg/128px-Lua-Logo.svg.png" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "GDScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg" },
  { name: "Kotlin", icon: "https://user-images.githubusercontent.com/103866722/177941491-1947c6b0-6e38-4880-8bd7-01dac36165df.png" }
];

// Currently learning
export const currentlyLearning: Skill[] = [
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
];

// Helper to get skills by category
export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  switch (category) {
    case "languages":
      return languages;
    case "tools":
      return tools;
    case "platforms":
      return platforms;
    default:
      return [];
  }
};

// Constants
export const ITEMS_PER_PAGE = 9;
export const SKILL_CATEGORIES: { key: SkillCategory; label: string }[] = [
  { key: "languages", label: "Languages" },
  { key: "tools", label: "Tools" },
  { key: "platforms", label: "Platforms" },
];
