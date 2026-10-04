import type { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    id: "oltek-hackathon-2026",
    title: "Oltek Hackathon Top 11 Finalist",
    event: "Oltek: Paper to Data Logistic Automation Challenge",
    year: "March 2026",
    badge: "Top 11 Finalist",
    highlight:
      "Engineered One4All during an intensive 7-day hackathon in March 2026, pitching directly before senior software developers and industry leaders to reach the Top 11 finalists.",
    images: [
      {
        src: "/Pictures/AIXTRACT/Oltek_Hackathon_Image_2.jpg",
        alt: "One4All team holding certificates of participation on stage at Oltek Hackathon",
      },
      {
        src: "/Pictures/AIXTRACT/Oltek_Hackathon_Image_3.jpg",
        alt: "One4All team with Oltek Solutions organizers and mentors on stage",
      },
      {
        src: "/Pictures/AIXTRACT/Oltek_Hackathon_Image_4.jpg",
        alt: "Awarding ceremony and certificate presentation on stage",
      },
      {
        src: "/Pictures/AIXTRACT/Oltek_Hackathon_Image_5.jpg",
        alt: "Grand finals group photo of all participants and organizers holding certificates",
      },
    ],
    links: [
      {
        name: "Official Facebook Announcement",
        url: "https://web.facebook.com/permalink.php?story_fbid=pfbid02RvUhxB8dqq7v5GtW64tg4Rk8i4NviBLRUAfhWbXPw7gXq4sbKVJWaesj71A8XMbnl&id=61583917838435",
        icon: "facebook",
      },
      {
        name: "One4All Hackathon Project",
        url: "https://github.com/MikhailAg0ny/One4All_Hackathon",
        icon: "github",
      },
    ],
  },
  {
    id: "proweaver-hackathon-2025",
    title: "Proweaver AI Hackathon Vibe Coding Champion",
    event: "Proweaver AI Hackathon",
    year: "September 2025",
    badge: "Champion",
    highlight:
      "Designed and implemented Horizontal Shoot Em Up game in just 4 hours using AI powered tools",
    images: [
      {
        src: "/Pictures/PROMPTQUEST_AI_HACKATHON_2025/Proweaver%20AI%20HACKATHON%20CHAMPION.jpg",
        alt: "PromptQuest Hackathon champion team photo",
      },
      {
        src: "/Pictures/PROMPTQUEST_AI_HACKATHON_2025/proweaver_champion_1.jpg",
        alt: "Showcasing the winning project",
      },
      {
        src: "/Pictures/PROMPTQUEST_AI_HACKATHON_2025/proweaver_champion_2.jpg",
        alt: "On-stage presentation",
      },
      {
        src: "/Pictures/PROMPTQUEST_AI_HACKATHON_2025/proweaver_champion_3.jpg",
        alt: "Awarding ceremony",
      },
    ],
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
      {
        name: "Game Link",
        url: "https://projectchimera-hackaton.vercel.app/",
        icon: "game",
      },
    ],
  },
];

export const getRecentAchievements = (limit = achievements.length): Achievement[] =>
  achievements.slice(0, limit);
