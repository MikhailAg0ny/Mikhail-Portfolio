export interface NavLink {
  label: string;
  href?: string;
  anchor?: string;
  isHighlighted?: boolean;
  externalPath?: string;
}

export interface ProjectCaseStudy {
  title: string;
  timeframe: string;
  primaryTech: string;
  featuredTechs: string[];
  description: string;
  caseStudyUrl?: string;
  sourceUrl?: string;
  showCaseStudyButton?: boolean;
  image?: string;
  images?: string[];
  projectType?: "school" | "client" | "side" | "hackathon";
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  image?: string;
  link?: string;
}

export interface AchievementLink {
  name: string;
  url: string;
  icon?: "facebook" | "newspaper" | "globe" | "video" | "trophy" | "game" | "github";
}

export interface AchievementImage {
  src: string;
  alt: string;
}

export interface Achievement {
  id?: string;
  title: string;
  event: string;
  year: string;
  badge?: string;
  highlight: string;
  images?: AchievementImage[];
  links?: AchievementLink[];
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
}
