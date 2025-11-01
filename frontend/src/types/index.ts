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
  problem: string;
  solution: string;
  results: string[];
  caseStudyUrl: string;
  sourceUrl: string;
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
  focus: string;
}

export interface Achievement {
  title: string;
  event: string;
  year: string;
  highlight: string;
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
}
