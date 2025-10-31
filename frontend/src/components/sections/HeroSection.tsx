import ImageWithFallback from "@/components/ui/ImageWithFallback";

export default function HeroSection() {
  return (
    <section className="h-full w-full">
      <div className="flex h-full items-center justify-center px-6 pb-16 pt-28 sm:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="h-64 w-64 overflow-hidden rounded-full border-4 border-[#00CFE8] shadow-2xl shadow-[#00CFE8]/20 sm:h-80 sm:w-80">
                  <ImageWithFallback
                    src="/images/profile.jpg"
                    alt="Mikhail James P. Navarro"
                    width={320}
                    height={320}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          <div className="space-y-6 text-center lg:text-left">
              <p className="text-sm uppercase tracking-[0.45em] text-[#00CFE8]">Hello There, I am</p>
              <h1 className="text-4xl font-bold tracking-tight text-[#F0F2F5] md:text-6xl">
                Mikhail James P. Navarro
              </h1>
              <p className="text-xl font-semibold text-[#00CFE8] md:text-2xl">
                Web Developer & Game Designer
              </p>
              <p className="max-w-xl text-base text-[#9AA5B1] md:text-lg">
                Crafting playful, human-centered digital experiences that merge game sensibilities with product delivery.
                I translate ideas into interactive stories, polished design systems, and measurable outcomes.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  className="group inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-[#1A1D21] transition-all hover:shadow-lg hover:shadow-[#00CFE8]/30"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #00CFE8, #008C9E)',
                  }}
                  href="#projects"
                >
                  View My Work
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium text-[#F0F2F5] transition-all hover:text-[#00CFE8]"
                  style={{
                    borderImage: 'linear-gradient(to right, #1A1D21, #2A2F35, #1A1D21) 1',
                  }}
                  href="#contact"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
