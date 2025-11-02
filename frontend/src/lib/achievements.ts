import type { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    title: "Game Jam Grand Winner",
    event: "PromptQuest Hackathon",
    year: "2025",
    highlight:
      "Designed and programmed an AI-assisted puzzle game in 72 hours, earning top marks for storytelling and technical execution.",
  },
  {
    title: "UXPH Spotlight Speaker",
    event: "UXPH Conference",
    year: "2024",
    highlight:
      "Presented a live case study on aligning player empathy with design systems for cross-platform experiences.",
  },
  {
    title: "Design System Accelerator",
    event: "Internal Agency Award",
    year: "2023",
    highlight:
      "Led a cross-functional initiative that reduced component delivery time by 40% and improved accessibility scores across products.",
  },
];

export const getRecentAchievements = (limit = achievements.length): Achievement[] =>
  achievements.slice(0, limit);
