import type { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    title: "Proweaver AI Hackathon Vibe Coding Champion",
    event: "Proweaver AI Hackathon",
    year: "2025",
    highlight:
      "Designed and implemented Horizontal Shoot Em Up game in just 4 hours using AI powered tools",
    links: [
      {
        name: "CIT-U Official Page",
        url: "https://www.facebook.com/CITUniversity/posts/pfbid0rG3uVVBLhPXXTDYhQWGjqaK2HJtT2Sr452UyqeBRKHHaaetzdMBm6hvBxxqo4dB1l",
        icon: "facebook",
      },
      {
        name: "Cebu Daily News Article",
        url: "https://cebudailynews.inquirer.net/659355/reimagining-play-powering-the-future-proweavers-promptquest-showcases-cebuano-talent-in-tech",
        icon: "newspaper",
      },
    ],
  },
];

export const getRecentAchievements = (limit = achievements.length): Achievement[] =>
  achievements.slice(0, limit);
