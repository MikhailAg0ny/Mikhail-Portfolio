export default function AboutSection() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full max-w-6xl flex-col justify-center px-6 pb-14 pt-24 sm:px-10">
        <header className="mb-12 space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-[#00CFE8]">Get to know me</p>
          <h2 className="text-3xl font-semibold text-[#F0F2F5] md:text-4xl">About Me</h2>
        </header>

        <div className="flex h-full w-full max-w-6xl items-center gap-8 lg:gap-12">
          {/* Left Side - Description */}
          <div className="hidden h-full max-h-[600px] w-full max-w-md flex-col justify-center lg:flex">
            <div className="space-y-6 rounded-3xl border border-[#9AA5B1]/20 bg-[#2A2F35]/60 p-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-[#F0F2F5]">Mikhail</h3>
                <p className="text-sm leading-relaxed text-[#9AA5B1]">
                  A passionate developer with a love for creating innovative solutions and exploring new technologies. 
                  Focused on building scalable applications and delivering exceptional user experiences.
                </p>
              </div>
              
              <div className="space-y-3 border-t border-[#9AA5B1]/20 pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#00CFE8]">Interests</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#00CFE8]/30 bg-[#1A1D21]/40 px-3 py-1 text-xs text-[#00CFE8]">Game Dev</span>
                  <span className="rounded-full border border-[#00CFE8]/30 bg-[#1A1D21]/40 px-3 py-1 text-xs text-[#00CFE8]">Web Dev</span>
                  <span className="rounded-full border border-[#00CFE8]/30 bg-[#1A1D21]/40 px-3 py-1 text-xs text-[#00CFE8]">UI/UX</span>
                </div>
              </div>
            </div>
          </div>

        {/* Right Side - Content Sections */}
        <div className="flex h-full w-full flex-col justify-center gap-6">
          {/* Content Box 1 */}
          <div className="group rounded-2xl border border-[#9AA5B1]/20 bg-[#2A2F35]/60 p-6 transition-all hover:border-[#00CFE8]/30 hover:shadow-lg hover:shadow-[#00CFE8]/10">
            <h3 className="mb-3 text-lg font-semibold text-[#00CFE8]">Who I Am</h3>
            <p className="text-sm leading-relaxed text-[#9AA5B1]">
              Brief introduction about yourself. Share your passion, what drives you, and what makes you unique as a developer.
            </p>
          </div>

          {/* Content Box 2 */}
          <div className="group rounded-2xl border border-[#9AA5B1]/20 bg-[#2A2F35]/60 p-6 transition-all hover:border-[#00CFE8]/30 hover:shadow-lg hover:shadow-[#00CFE8]/10">
            <h3 className="mb-3 text-lg font-semibold text-[#00CFE8]">What I Do</h3>
            <p className="text-sm leading-relaxed text-[#9AA5B1]">
              Describe your expertise, specializations, and the kind of work you love doing. Highlight your key skills and interests.
            </p>
          </div>

          {/* Content Box 3 */}
          <div className="group rounded-2xl border border-[#9AA5B1]/20 bg-[#2A2F35]/60 p-6 transition-all hover:border-[#00CFE8]/30 hover:shadow-lg hover:shadow-[#00CFE8]/10">
            <h3 className="mb-3 text-lg font-semibold text-[#00CFE8]">Beyond Code</h3>
            <p className="text-sm leading-relaxed text-[#9AA5B1]">
              Share your hobbies, interests outside of programming, or what you do in your free time. Make it personal and engaging.
            </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
