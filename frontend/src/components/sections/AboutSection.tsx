'use client';

import { MouseEvent, useState } from "react";
import clsx from "clsx";

import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { AnimatePresence, motion } from "framer-motion";
import { useSectionPadding, useBreakpoints } from "@/hooks/useBreakpoints";
import ElectricBorder from "@/components/ElectricBorder";

export default function AboutSection() {
  const { padding, minHeight } = useSectionPadding();
  const { isShort } = useBreakpoints();
  const [showPreview, setShowPreview] = useState(false);
  const [profileCardHovered, setProfileCardHovered] = useState(false);
  const [cardTilt, setCardTilt] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });
  const [logoOffset, setLogoOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const profileImage = {
    src: "/images/jesus_christ_is_king.jpeg",
    alt: "Portrait of Mikhail standing beside text declaring Jesus Christ is King",
    width: 320,
    height: 384,
  };

  const overlayImage = {
    src: "/images/cit_u_logo.png",
    alt: "Cebu Institute of Technology University logo",
    width: 512,
    height: 512,
  };

  const handlePreviewOpen = () => setShowPreview(true);

  const handlePreviewClose = () => {
    setShowPreview(false);
    setCardTilt({ rotateX: 0, rotateY: 0 });
    setLogoOffset({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  };

  const handleCardMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const rotateY = ((offsetX - centerX) / centerX) * 8;
    const rotateX = ((offsetY - centerY) / centerY) * -8;

    setCardTilt({ rotateX, rotateY });
    setLogoOffset({
      x: ((offsetX - centerX) / centerX) * 18,
      y: ((offsetY - centerY) / centerY) * 18,
    });
    setGlarePosition({
      x: (offsetX / bounds.width) * 100,
      y: (offsetY / bounds.height) * 100,
    });
  };

  const infoCards: InfoCardProps[] = [
    {
      id: "who",
      heading: "Who I Am",
      summary:
        "Aspiring developer with a passion for innovative web design, focused on building scalable systems and solid project management. Curious and eager to learn, I am keen to contribute to forward-thinking web solutions.",
    },
    {
      id: "what",
      heading: "What I Do",
      summary:
        "I build web and mobile applications, as well as games, with a focus on functionality and user experience. From production platforms to creative projects, I strive to deliver work that is both technical and thoughtful.",
    },
    {
      id: "beyond",
      heading: "Beyond Code",
      summary:
        "As for my hobbies outside of the programming, I enjoy most of time reading books, play various type of video games or doing other extra curricular activities that improve or developing my skills.",
    },
  ];

  return (
    <section
      className={clsx(
        "flex w-full",
        padding,
        "items-center justify-center" // Always center since we are scaling to fit
      )}
      style={{ minHeight }}
    >
      <div
        className={clsx(
          "mx-auto flex w-full flex-col px-4 sm:px-10 transition-transform duration-300 ease-out",
          !isShort ? "max-w-6xl justify-center" : "max-w-[90%] scale-90 origin-center" // Scale down on short screens
        )}
      >
        <header className="mb-8 space-y-2.5 text-center sm:mb-12 sm:space-y-3">
          <p className="text-xs uppercase tracking-[0.45em] text-victus-blue sm:text-sm">Get to know me</p>
          <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl md:text-4xl">About Me</h2>
          <p className="mx-auto max-w-3xl text-sm text-text-secondary md:text-base">
            Introduction
          </p>
        </header>

        <div
          className={clsx(
            "flex w-full flex-col gap-6 sm:gap-8",
            "lg:flex-row lg:gap-12", // Always allow side-by-side on large screens
            !isShort ? "max-w-6xl h-full lg:items-stretch" : "items-start" // Only constrain height/width if NOT short
          )}
        >
          {/* Left Side - Profile Card */}
          <div
            className="hidden w-full max-w-md flex-col lg:flex"
            onMouseEnter={() => setProfileCardHovered(true)}
            onMouseLeave={() => setProfileCardHovered(false)}
          >
            <ElectricBorder
              color="#38bdf8"
              speed={profileCardHovered ? 1.5 : 0}
              chaos={1.2}
              thickness={2}
              className={`w-full h-full rounded-3xl ${!profileCardHovered ? 'eb-hidden' : ''}`}
              style={{}}
            >
              <div className={clsx(
                "relative flex h-full flex-col rounded-3xl border border-text-secondary/20 bg-mica-light/60",
                isShort ? "gap-4 p-5" : "gap-6 p-8"
              )}>
                <div className={clsx(
                  "flex flex-col lg:flex-row lg:items-start",
                  isShort ? "gap-4 lg:gap-6" : "gap-6 lg:gap-10"
                )}>
                  <div className="space-y-4 lg:flex-[0.8] lg:pr-1 ">
                    <h3 className="text-2xl font-semibold text-text-primary">Mikhail</h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      Graduate of the Bachelor of Science in Information Technology program at Cebu Institute of Technology - University, with experience in web, game, and mobile development.
                      Currently broadening skills in backend and frontend design.
                    </p>
                  </div>

                  <motion.div
                    className={clsx(
                      "mx-auto flex w-full aspect-[3/4] flex-shrink-0 items-center justify-center overflow-visible rounded-[36px] cursor-pointer lg:flex-[0.7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-victus-blue/60",
                      isShort ? "max-w-[10rem]" : "max-w-[14rem]"
                    )}
                    style={{ transformPerspective: 1100, rotateX: cardTilt.rotateX, rotateY: cardTilt.rotateY }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    onMouseEnter={(event) => {
                      handlePreviewOpen();
                      handleCardMouseMove(event);
                    }}
                    onMouseLeave={handlePreviewClose}
                    onMouseMove={handleCardMouseMove}
                    onFocus={handlePreviewOpen}
                    onBlur={handlePreviewClose}
                    onTouchStart={handlePreviewOpen}
                    onTouchEnd={handlePreviewClose}
                    onTouchCancel={handlePreviewClose}
                    role="button"
                    tabIndex={0}
                    aria-label="Preview profile portrait"
                  >
                    <div className="relative h-full w-full">
                      <motion.div
                        className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-mica-dark/85 via-mica-dark/55 to-mica-dark/65 shadow-[0_28px_55px_rgba(0,0,0,0.45)]"
                        animate={{ boxShadow: showPreview ? "0 32px 75px rgba(0, 207, 232, 0.3)" : "0 28px 55px rgba(0, 0, 0, 0.45)" }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <ImageWithFallback
                          src={profileImage.src}
                          alt={profileImage.alt}
                          width={profileImage.width}
                          height={profileImage.height}
                          className="h-full w-full object-cover"
                        />

                        <AnimatePresence>
                          {showPreview && (
                            <motion.div
                              key="card-blur"
                              className="pointer-events-none absolute inset-0 rounded-2xl bg-mica-dark/25 backdrop-blur-md"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: .8 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                            />
                          )}
                        </AnimatePresence>

                        <motion.div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${showPreview ? 0.42 : 0.18}), transparent 62%)`,
                          }}
                          animate={{ opacity: showPreview ? 1 : 0.7 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        />

                        <motion.div
                          className="pointer-events-none absolute inset-x-6 bottom-4 h-8 rounded-full bg-victus-blue/35 blur-3xl"
                          animate={{ opacity: showPreview ? 0.55 : 0.18, scale: showPreview ? 1.1 : 0.9 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      </motion.div>

                      <AnimatePresence>
                        {showPreview && (
                          <motion.div
                            key="cit-logo"
                            className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                            initial={{ opacity: 0, scale: 0.82, y: 28 }}
                            animate={{
                              opacity: 1,
                              scale: 2.7,
                              x: logoOffset.x * 0.45,
                              y: logoOffset.y * 0.45 - 24,
                            }}
                            exit={{ opacity: 0, scale: 0.78, y: 32 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                          >
                            <ImageWithFallback
                              src={overlayImage.src}
                              alt={overlayImage.alt}
                              width={overlayImage.width}
                              height={overlayImage.height}
                              className="h-auto w-64 drop-shadow-[0_25px_55px_rgba(0,207,232,0.5)] md:w-64"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>

                <div className={clsx(
                  "border-t border-text-secondary/20",
                  isShort ? "space-y-2 pt-4" : "space-y-3 pt-6"
                )}>
                  <p className="text-xs uppercase tracking-[0.2em] text-victus-blue">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-victus-blue/30 bg-mica-dark/40 px-3 py-1 text-xs text-victus-blue">Game Development</span>
                    <span className="rounded-full border border-victus-blue/30 bg-mica-dark/40 px-3 py-1 text-xs text-victus-blue">Mobile Development</span>
                    <span className="rounded-full border border-victus-blue/30 bg-mica-dark/40 px-3 py-1 text-xs text-victus-blue">Web Development</span>
                    <span className="rounded-full border border-victus-blue/30 bg-mica-dark/40 px-3 py-1 text-xs text-victus-blue">UI/UX Design</span>
                  </div>
                </div>

              </div>
            </ElectricBorder>
          </div>

          {/* Right Side - Content Sections */}
          <div className="flex h-full w-full flex-col justify-center gap-4 sm:gap-5 lg:justify-between">
            {infoCards.map((item) => (
              <InfoCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div >
    </section >
  );
}

type InfoCardProps = {
  id: string;
  heading: string;
  summary: string;
};

function InfoCard({ heading, summary }: InfoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group flex w-full h-full flex-col items-center rounded-2xl overflow-hidden"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ElectricBorder
        color="#38bdf8"
        speed={isHovered ? 1.5 : 0}
        chaos={1.2}
        thickness={2}
        className={`w-full h-full rounded-2xl ${!isHovered ? 'eb-hidden' : ''}`}
        style={{}}
      >
        <div className="flex w-full h-full flex-col items-center border border-text-secondary/20 bg-mica-light/60 p-5 text-center sm:p-6 lg:items-start lg:text-left rounded-2xl">
          <h3 className="mb-2.5 w-full text-base font-semibold text-victus-blue sm:text-lg">{heading}</h3>
          <p className="w-full text-xs leading-relaxed text-text-secondary sm:text-sm">{summary}</p>
        </div>
      </ElectricBorder>
    </motion.div>
  );
}
