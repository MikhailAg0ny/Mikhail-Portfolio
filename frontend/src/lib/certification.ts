import type { Certificate } from "@/types";

export const certifications: Certificate[] = [
  {
    name: "Google UX Design Professional Certificate",
    issuer: "Google / Coursera",
    date: "2024",
    focus: "Human-centered research, low-to-high fidelity prototyping, usability testing.",
  },
  {
    name: "Meta Front-End Developer Certificate",
    issuer: "Meta / Coursera",
    date: "2023",
    focus: "Design systems, accessibility-first component development, CI/CD pipelines.",
  },
  {
    name: "Unity Certified Associate: Game Developer",
    issuer: "Unity",
    date: "2022",
    focus: "Gameplay systems, performance optimization, and cross-platform deployment.",
  },
];

export const getRecentCertifications = (limit = certifications.length): Certificate[] =>
  certifications.slice(0, limit);
