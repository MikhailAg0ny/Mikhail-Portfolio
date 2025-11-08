"use client";

import { useState } from "react";
import Image from "next/image";
import type { Skill } from "@/lib/skills";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <li
      className="group relative flex w-full max-h-full min-h-[56px] flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl border border-text-secondary/20 bg-gradient-to-b from-mica-dark/60 to-mica-dark/80 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-victus-blue/40 hover:bg-gradient-to-b hover:from-mica-light/40 hover:to-mica-dark/60 hover:shadow-xl hover:shadow-victus-blue/25 sm:min-h-[64px] sm:gap-2.5 sm:p-4"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-victus-blue/0 to-victus-blue/0 opacity-0 transition-opacity duration-300 group-hover:from-victus-blue/5 group-hover:to-cyan-400/5 group-hover:opacity-100" />
      
      {!imageError ? (
        <Image
          src={skill.icon}
          alt={skill.name}
          width={44}
          height={44}
          loading="lazy"
          onError={() => setImageError(true)}
          className="relative z-10 h-9 w-9 flex-shrink-0 drop-shadow-[0_0_10px_rgba(0,207,232,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(0,207,232,0.55)] sm:h-11 sm:w-11"
          unoptimized
        />
      ) : (
        <div className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-victus-blue/20 text-xs font-bold text-victus-blue sm:h-11 sm:w-11">
          {skill.name.charAt(0)}
        </div>
      )}
      
      <span className="relative z-10 mt-1 w-full px-1 text-center text-[0.7rem] leading-5 font-medium text-text-secondary transition-colors duration-300 group-hover:text-victus-blue sm:mt-1.5 sm:px-1.5 sm:text-xs line-clamp-2 whitespace-normal break-words min-h-[0.9rem] sm:min-h-[1.3rem]" title={skill.name}>
        {skill.name}
      </span>
    </li>
  );
}
