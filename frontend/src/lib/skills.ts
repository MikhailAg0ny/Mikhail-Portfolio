// Skill data types and constants
// DO NOT TOUCH THE URL
export interface Skill {
  name: string;
  icon: string;
}

export type SkillCategory = "languages" | "tools" | "platforms";

// DO NOT TOUCH THE URL
// Tools & Software
export const tools: Skill[] = [
  { name: "Android Studio", icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/android-studio-icon.png" },
  { name: "Aseprite", icon: "https://images.seeklogo.com/logo-png/50/1/aseprite-logo-png_seeklogo-506592.png" },
  { name: "Canva", icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/canva-icon.png" },
  { name: "Figma", icon: "https://cdn.jim-nielsen.com/macos/1024/figma-2021-05-05.png" },
  { name: "GitHub Copilot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Godot Engine", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg" },
  { name: "MySQL", icon: "https://www.nicepng.com/png/detail/14-143154_mysql-dolphin-square-mysql-dolphin-logo.png" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "React.js", icon: "https://www.svgrepo.com/show/355190/reactjs.svg" },
  { name: "Roblox Studio", icon: "https://images.seeklogo.com/logo-png/40/1/roblox-studio-logo-png_seeklogo-401838.png" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Windsurf", icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/windsurf-icon.png" },
];

// DO NOT TOUCH THE URL
// Platforms & Frameworks
export const platforms: Skill[] = [
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
];

// DO NOT TOUCH THE URL
// Languages & Technologies
export const languages: Skill[] = [
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Kotlin", icon: "https://www.svgrepo.com/show/303617/kotlin-1-logo.svg" },
  { name: "Lua", icon: "https://icon.icepanel.io/Technology/png/Lua.png" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg" },
];

// DO NOT TOUCH THE URL
// Currently learning
export const currentlyLearning: Skill[] = [
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
];

// DO NOT TOUCH THE URL
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

// DO NOT TOUCH THE URL
// Constants
export const ITEMS_PER_PAGE = 9;
export const SKILL_CATEGORIES: { key: SkillCategory; label: string }[] = [
  { key: "languages", label: "Languages" },
  { key: "tools", label: "Tools" },
  { key: "platforms", label: "Platforms" },
];
