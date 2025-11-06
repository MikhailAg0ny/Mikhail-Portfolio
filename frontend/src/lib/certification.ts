import type { Certificate } from "@/types";

//DO NOT TOUCH

export const certifications: Certificate[] = [
  {
    name: "CodeChum SQL Certification",
    issuer: "CodeChum",
    date: "2024",
    image: "/Certificates/pictures/codechum_sql_mjpn.png",
    link: "/Certificates/pdf-files/NavarroMikhailJames-15679-CSIT327-IM2-G4_SQL.pdf",
  },
  {
    name: "UXPH MINI 2025 Event Certificate",
    issuer: "UXPH",
    date: "2025",
    image: "/Certificates/pictures/UXPH_PARTICIPATION EVENT_MIKHAIL.png",
    link: "/Certificates/pdf-files/UXPH%20Conf%202025%20Certificate%20of%20Attendance%20-%20Mikhail.pdf",
  },
  {
    name: "Introduction to C++",
    issuer: "Sololearn",
    date: "2025",
    image: "/Certificates/pictures/C++ MIKHAIL JAMES NAVARRO.jpg",
    link: "/Certificates/pictures/C++%20MIKHAIL%20JAMES%20NAVARRO.jpg",
  },
  {
    name: "AWS Academy Graduate: Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "2025",
    image: "/Certificates/pictures/aws_cloud_foundation_mjpn.png",
    link: "/Certificates/pdf-files/AWS_Academy_Graduate___Cloud_Foundations___Training_Badge_Badge20251106-31.pdf",
  },
  {
    name: "AI Empowerment for Communities",
    issuer: "GoTeamLearning",
    date: "2025",
    image: "/Certificates/pictures/cert_mjpn_ai_communities.png",
    link: "/Certificates/pictures/cert_mjpn_ai_communities.png",
  },
  {
    name: "Kadasig Trio Champion",
    issuer: "Proweaver AI Hackathon",
    date: "2025",
    image: "/Certificates/pictures/KADASIG TRIO CHAMPION - MIKHAIL.jpg",
    link: "/Certificates/pictures/KADASIG%20TRIO%20CHAMPION%20-%20MIKHAIL.jpg",
  },
];

export const getRecentCertifications = (limit = certifications.length): Certificate[] =>
  certifications.slice(0, limit);
