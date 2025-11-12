export interface ProgrammingLanguage {
  name: string;
  level: "S" | "A" | "B" | "C" | "D" | "E" | "F";
}

export interface Highlight {
  label: string;
  value: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ProjectCaseStudy {
  title: string;
  role: string;
  timeframe: string;
  primaryTech: string;
  featuredTechs: string[];
  description: string;
  caseStudyUrl?: string;
  sourceUrl?: string;
  showCaseStudyButton?: boolean;
  stack: string[];
  image?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  image: string;
  link?: string;
}

export interface AchievementLink {
  name: string;
  url: string;
  icon?: "facebook" | "newspaper" | "globe" | "video" | "trophy" | "game";
}

export interface Achievement {
  title: string;
  event: string;
  year: string;
  highlight: string;
  links?: AchievementLink[];
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
}
