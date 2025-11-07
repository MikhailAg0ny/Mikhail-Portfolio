"use client";

import { useState } from "react";
import type { Skill } from "@/lib/skills";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <li
      className="group relative flex w-full max-h-full min-h-[50px] sm:min-h-[50px] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-text-secondary/20 bg-gradient-to-b from-mica-dark/60 to-mica-dark/80 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-victus-blue/40 hover:bg-gradient-to-b hover:from-mica-light/40 hover:to-mica-dark/60 hover:shadow-2xl hover:shadow-victus-blue/30 sm:gap-3 sm:p-6"
      style={{ 
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-victus-blue/0 to-victus-blue/0 opacity-0 transition-opacity duration-300 group-hover:from-victus-blue/5 group-hover:to-cyan-400/5 group-hover:opacity-100" />
      
      {!imageError ? (
        <img
          src={skill.icon}
          alt={skill.name}
          loading="lazy"
          onError={() => setImageError(true)}
          className="relative z-10 h-10 w-10 flex-shrink-0 drop-shadow-[0_0_12px_rgba(0,207,232,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_24px_rgba(0,207,232,0.6)] sm:h-12 sm:w-12"
        />
      ) : (
        <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-victus-blue/20 text-xs font-bold text-victus-blue sm:h-12 sm:w-12">
          {skill.name.charAt(0)}
        </div>
      )}
      
      <span className="relative z-10 mt-1 w-full px-1 text-center text-xs leading-5 font-medium text-text-secondary transition-colors duration-300 group-hover:text-victus-blue sm:mt-2 sm:px-2 sm:text-sm line-clamp-2 whitespace-normal break-words min-h-[1.0rem] sm:min-h-[1.5rem]" title={skill.name}>
        {skill.name}
      </span>
    </li>
  );
}
