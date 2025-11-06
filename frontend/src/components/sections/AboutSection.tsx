import * as Popover from "@radix-ui/react-popover";

export default function AboutSection() {
  return (
    <section className="flex w-full min-h-screen items-center justify-center pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="flex w-full max-w-6xl flex-col justify-center px-6 sm:px-10">
        <header className="mb-12 space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-victus-blue">Get to know me</p>
          <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">About Me</h2>
        </header>

        <div className="flex h-full w-full max-w-6xl flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          {/* Left Side - Description */}
          <div className="hidden h-full max-h-[600px] w-full max-w-md flex-col justify-center lg:flex">
            <div className="space-y-6 rounded-3xl border border-text-secondary/20 bg-mica-light/60 p-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-text-primary">Mikhail</h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  A passionate developer with a love for creating innovative solutions and exploring new technologies. 
                  Focused on building scalable applications and delivering exceptional user experiences.
                </p>
              </div>
              
              <div className="space-y-3 border-t border-text-secondary/20 pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-victus-blue">Interests</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-victus-blue/30 bg-mica-dark/40 px-3 py-1 text-xs text-victus-blue">Game Dev</span>
                  <span className="rounded-full border border-victus-blue/30 bg-mica-dark/40 px-3 py-1 text-xs text-victus-blue">Web Dev</span>
                  <span className="rounded-full border border-victus-blue/30 bg-mica-dark/40 px-3 py-1 text-xs text-victus-blue">UI/UX</span>
                </div>
              </div>
            </div>
          </div>

        {/* Right Side - Content Sections */}
        <div className="flex h-full w-full flex-col justify-center gap-5">
          <Popover.Root>
            <Popover.Trigger asChild>
              <button
                type="button"
                className="group w-full rounded-2xl border border-text-secondary/20 bg-mica-light/60 p-6 text-left transition-all hover:border-victus-blue/30 hover:shadow-lg hover:shadow-victus-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-victus-blue/60"
              >
                <h3 className="mb-3 text-lg font-semibold text-victus-blue">Who I Am</h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Brief introduction about yourself. Share your passion, what drives you, and what makes you unique as a developer.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-victus-blue/70">
                  Learn more
                  <svg className="h-3 w-3 transition-transform group-data-[state=open]:rotate-90" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                sideOffset={12}
                align="start"
                className="z-[90] w-[min(420px,90vw)] rounded-3xl border border-victus-blue/25 bg-mica-dark/95 p-5 text-sm leading-relaxed text-text-secondary shadow-2xl backdrop-blur-xl focus:outline-none"
              >
                <h4 className="mb-2 text-base font-semibold text-text-primary">Crafted storyteller</h4>
                <p>
                  I combine game design instincts with product thinking to turn ambiguous ideas into interactive narratives.
                  Every project starts with empathy, playtesting, and clear success metrics so the end result feels intuitive and delightful.
                </p>
                <Popover.Arrow className="fill-mica-dark/95" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <Popover.Root>
            <Popover.Trigger asChild>
              <button
                type="button"
                className="group w-full rounded-2xl border border-text-secondary/20 bg-mica-light/60 p-6 text-left transition-all hover:border-victus-blue/30 hover:shadow-lg hover:shadow-victus-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-victus-blue/60"
              >
                <h3 className="mb-3 text-lg font-semibold text-victus-blue">What I Do</h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Describe your expertise, specializations, and the kind of work you love doing. Highlight your key skills and interests.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-victus-blue/70">
                  Learn more
                  <svg className="h-3 w-3 transition-transform group-data-[state=open]:rotate-90" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                sideOffset={12}
                align="start"
                className="z-[90] w-[min(420px,90vw)] rounded-3xl border border-victus-blue/25 bg-mica-dark/95 p-5 text-sm leading-relaxed text-text-secondary shadow-2xl backdrop-blur-xl focus:outline-none"
              >
                <h4 className="mb-2 text-base font-semibold text-text-primary">Designing joyful systems</h4>
                <ul className="list-disc space-y-1 pl-4">
                  <li>UX audits and rapid prototyping for responsive web apps.</li>
                  <li>Component libraries that bridge marketing sites and in-game UI.</li>
                  <li>Automation pipelines that keep delivery fast and measurable.</li>
                </ul>
                <Popover.Arrow className="fill-mica-dark/95" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <Popover.Root>
            <Popover.Trigger asChild>
              <button
                type="button"
                className="group w-full rounded-2xl border border-text-secondary/20 bg-mica-light/60 p-6 text-left transition-all hover:border-victus-blue/30 hover:shadow-lg hover:shadow-victus-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-victus-blue/60"
              >
                <h3 className="mb-3 text-lg font-semibold text-victus-blue">Beyond Code</h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Share your hobbies, interests outside of programming, or what you do in your free time. Make it personal and engaging.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-victus-blue/70">
                  Learn more
                  <svg className="h-3 w-3 transition-transform group-data-[state=open]:rotate-90" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                sideOffset={12}
                align="start"
                className="z-[90] w-[min(420px,90vw)] rounded-3xl border border-victus-blue/25 bg-mica-dark/95 p-5 text-sm leading-relaxed text-text-secondary shadow-2xl backdrop-blur-xl focus:outline-none"
              >
                <h4 className="mb-2 text-base font-semibold text-text-primary">Fuel outside the IDE</h4>
                <p>
                  When I’m not shipping features you’ll find me prototyping indie games, mentoring aspiring devs, or composing synthwave soundtracks for upcoming projects. These creative breaks keep my product instincts sharp.
                </p>
                <Popover.Arrow className="fill-mica-dark/95" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
        </div>
      </div>
    </section>
  );
}
