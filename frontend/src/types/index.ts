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
  projectType?: "school" | "client" | "side";
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
