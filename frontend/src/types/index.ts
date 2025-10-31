export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

export interface ProgrammingLanguage {
  name: string;
  level: number;
}

export interface Highlight {
  label: string;
  value: string;
}

export interface NavLink {
  label: string;
  href: string;
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
