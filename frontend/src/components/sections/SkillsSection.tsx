"use client";

import Image from "next/image";
import { useState } from "react";
// From the comment inside value, do not remove when prompting modifying here yet!!!!
// Your actual tools
const tools: { name: string; icon: string }[] = [
  { name: "GitHub Copilot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Godot Engine", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg" },
  { name: "Roblox Studio", icon: "https://cdn-1.webcatalog.io/catalog/roblox-studio/roblox-studio-icon-filled-256.png?v=1684801410955" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Figma", icon: "https://cdn.jim-nielsen.com/macos/1024/figma-2021-05-05.png" },
  { name: "MySQL", icon: "https://www.nicepng.com/png/detail/14-143154_mysql-dolphin-square-mysql-dolphin-logo.png" },
  { name: "Aseprite", icon: "https://images.seeklogo.com/logo-png/50/1/aseprite-logo-png_seeklogo-506592.png" },
];

// From the comment inside value, do not remove when prompting modifying here yet!!!!
// Platforms
const platforms: { name: string; icon: string }[] = [
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
];
// From the comment inside value, do not remove when prompting modifying here yet!!!!
// Your languages
const languages: { name: string; icon: string }[] = [
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg" },
  { name: "Lua", icon: "https://handwiki.org/wiki/images/thumb/c/cf/Lua-Logo.svg/128px-Lua-Logo.svg.png" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "GDScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg" },
  { name: "Nextscript.js", icon: "https://seekicon.com/free-icon-download/nextjs_2.png" },
  { name: "React.js", icon: "https://www.svgrepo.com/show/355190/reactjs.svg" },
  { name: "Kotlin", icon: "https://user-images.githubusercontent.com/103866722/177941491-1947c6b0-6e38-4880-8bd7-01dac36165df.png" }
];
// From the comment inside value, do not remove when prompting modifying here yet!!!!
// Currently learning
const currentlyLearning: { name: string; icon: string }[] = [
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<"languages" | "tools" | "platforms">("languages");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  const getCurrentItems = () => {
    let items: { name: string; icon: string }[] = [];
    if (activeTab === "languages") items = languages;
    else if (activeTab === "tools") items = tools;
    else if (activeTab === "platforms") items = platforms;
    
    const startIndex = currentPage * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalPages = () => {
    let items: { name: string; icon: string }[] = [];
    if (activeTab === "languages") items = languages;
    else if (activeTab === "tools") items = tools;
    else if (activeTab === "platforms") items = platforms;
    
    return Math.ceil(items.length / itemsPerPage);
  };

  const handleTabChange = (tab: "languages" | "tools" | "platforms") => {
    setActiveTab(tab);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(getTotalPages() - 1, prev + 1));
  };

  const totalPages = getTotalPages();
  const currentItems = getCurrentItems();

  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full max-w-6xl flex-col justify-center gap-10 px-6 pb-14 pt-24 sm:px-10">
        <header className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-victus-blue">Technical Expertise</p>
          <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">
            My Skills
          </h2>
          <p className="text-base text-text-secondary">
            Technologies and tools I work with
          </p>
        </header>

        <div className="mx-auto h-max w-full max-w-4xl rounded-3xl border border-text-secondary/20 bg-mica-light/60 p-2">
          <div className="mb-6 flex h-11 justify-center rounded-full bg-mica-dark/60">
            <button
              onClick={() => handleTabChange("languages")}
              className={`w-1/3 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === "languages"
                  ? "bg-gradient-to-r from-victus-blue to-victus-blue/80 text-white shadow-lg shadow-victus-blue/30"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              Languages
            </button>
            <button
              onClick={() => handleTabChange("tools")}
              className={`w-1/3 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === "tools"
                  ? "bg-gradient-to-r from-victus-blue to-victus-blue/80 text-white shadow-lg shadow-victus-blue/30"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              Tools
            </button>
            <button
              onClick={() => handleTabChange("platforms")}
              className={`w-1/3 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === "platforms"
                  ? "bg-gradient-to-r from-victus-blue to-victus-blue/80 text-white shadow-lg shadow-victus-blue/30"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              Platforms
            </button>
          </div>

          <div className="relative h-[520px] p-4">
            {/* Navigation Arrows */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-text-secondary/20 bg-mica-light/90 p-3 backdrop-blur-sm transition-all duration-300 ${
                    currentPage === 0
                      ? "cursor-not-allowed opacity-30"
                      : "hover:border-victus-blue hover:bg-victus-blue/20 hover:shadow-lg hover:shadow-victus-blue/30"
                  }`}
                  aria-label="Previous page"
                >
                  <svg
                    className="h-5 w-5 text-victus-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-text-secondary/20 bg-mica-light/90 p-3 backdrop-blur-sm transition-all duration-300 ${
                    currentPage === totalPages - 1
                      ? "cursor-not-allowed opacity-30"
                      : "hover:border-victus-blue hover:bg-victus-blue/20 hover:shadow-lg hover:shadow-victus-blue/30"
                  }`}
                  aria-label="Next page"
                >
                  <svg
                    className="h-5 w-5 text-victus-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Grid Content */}
            <div className="mx-8">
              <ul className="grid h-[400px] w-full auto-rows-fr grid-cols-3 content-start gap-4">
                {currentItems.map((item) => (
                  <li
                    key={item.name}
                    className="group flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-text-secondary/20 bg-mica-dark/40 p-4 text-center transition-all hover:border-transparent hover:shadow-lg hover:shadow-victus-blue/20"
                    style={{ transition: 'all 0.3s ease', aspectRatio: '1/1' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderImage = 'linear-gradient(to right, #00CFE8, #008C9E) 1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderImage = '';
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="h-10 w-10 flex-shrink-0 drop-shadow-[0_0_10px_rgba(0,207,232,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(0,207,232,0.5)]"
                    />
                    <span className="w-full truncate px-2 text-xs text-text-secondary group-hover:text-victus-blue">{item.name}</span>
                  </li>
                ))}
              </ul>

              {/* Page Indicator */}
              {totalPages > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentPage === index
                          ? "w-8 bg-gradient-to-r from-victus-blue to-victus-blue/80"
                          : "w-2 bg-text-secondary/30 hover:bg-text-secondary/50"
                      }`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
