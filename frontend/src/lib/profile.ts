export const profile = {
  name: "Mikhail James P. Navarro",
  shortName: "Mikhail",
  title: "Software Developer",
  status: {
    isAvailable: true,
    badgeText: "Actively Job Hunting",
  },
  bio: {
    hero: "An Information Technology graduate (May 2026) with experience in web, game, and mobile development. Passionate about building interactive, scalable systems with modern design.",
    aboutShort: "Graduate of the Bachelor of Science in Information Technology program at Cebu Institute of Technology - University (May 2026), with experience in web, game, and mobile development. Currently broadening skills in backend and frontend design.",
  },
  socials: {
    github: "https://github.com/MikhailAg0ny",
    linkedin: "https://www.linkedin.com/in/mikhailjamesnavarro/",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/M1kh4ilAg0ny",
    email: process.env.NEXT_PUBLIC_EMAIL || "mikhailjpn@gmail.com",
  },
  resume: {
    fileName: "Navarro_Resume_1-15-2026.pdf",
    url: "/resume/Navarro_Resume_1-15-2026.pdf",
  },
  location: "Cebu, Philippines",
} as const;
