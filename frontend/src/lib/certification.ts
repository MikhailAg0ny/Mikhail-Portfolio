import type { Certificate } from "@/types";

//DO NOT TOUCH

export const certifications: Certificate[] = [
  {
    name: "CodeChum SQL Certification",
    issuer: "CodeChum",
    date: "2024",
    image: "/Certificates/pictures/CODECHUM_SQL_CERTIFICATION_MIKHAIL.png",
  },
  {
    name: "UXPH MINI 2025 Event Certificate",
    issuer: "UXPH",
    date: "2025",
    image: "/Certificates/pictures/UXPH_PARTICIPATION EVENT_MIKHAIL.png",
  },
  {
    name: "Introduction to C++",
    issuer: "Sololearn",
    date: "2025",
    image: "/Certificates/pictures/C++ MIKHAIL JAMES NAVARRO.jpg",
  },
  {
    name: "AWS Academy Graduate: Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "2025",
    image: "/Certificates/pictures/aws-academy-graduate-cloud-foundations-training-bad.png",
  },
  {
    name: "AI Empowerment for Communities",
    issuer: "GoTeamLearning",
    date: "2025",
    image: "/Certificates/pictures/cert_mjpn_ai_communities.png",
  },
  {
    name: "Kadasig Trio Champion",
    issuer: "Proweaver AI Hackathon",
    date: "2025",
    image: "/Certificates/pictures/KADASIG TRIO CHAMPION - MIKHAIL.jpg",
  },
];

export const getRecentCertifications = (limit = certifications.length): Certificate[] =>
  certifications.slice(0, limit);
