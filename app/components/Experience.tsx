"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Rocket,
  HeartHandshake,
  Zap,
  Cpu,
  GraduationCap,
  Store,
  Briefcase,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { experiences, type ExperienceItem } from "@/app/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

const typeIcons: Record<string, LucideIcon> = {
  startup: Rocket,
  volunteer: HeartHandshake,
  program: Zap,
  extracurricular: Cpu,
  business: Store,
  school: GraduationCap,
  academic: GraduationCap,
};

export default function Experience() {
  const railRef = useRef<HTMLDivElement>(null);

  // The rail draws itself as you scroll through the list
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.7", "end 0.65"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  const current = experiences.filter((e) => e.active);
  const completed = experiences.filter((e) => !e.active);

  return (
    <section
      id="experience"
      className="relative section scroll-mt-28 overflow-clip"
      aria-labelledby="experience-heading"
    >
      {/* Abstract backdrop */}
      <div className="sun-glow w-[44vw] h-[44vw] top-[12%] -right-[18vw] opacity-70" />
      <div className="sun-glow w-[30vw] h-[30vw] bottom-[8%] -left-[12vw] opacity-60" />
      <div className="cloud cloud-lilac animate-drift-a w-[30vw] h-[22vw] top-[40%] -right-[8vw] opacity-50" />

      <div className="container-padding max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <span className="section-label mb-5 inline-flex">
                The track record
              </span>
              <h2
                id="experience-heading"
                className="font-display text-display text-ink mb-5"
              >
                Where the hours <span className="accent-italic">went.</span>
              </h2>
              <p className="text-body-lg text-cocoa max-w-sm">
                Shipping at a YC company, co-founding my own, competing, and
                coaching kids. Every role compounds.
              </p>
            </motion.div>
          </div>

          {/* Rail + cards */}
          <div ref={railRef} className="lg:col-span-8 relative pl-8 md:pl-12">
            <div className="absolute left-1 md:left-2 top-2 bottom-2 w-px bg-apricot/40" />
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute left-1 md:left-2 top-2 bottom-2 w-[2px] origin-top bg-gradient-to-b from-honey via-tangerine to-sunset"
              aria-hidden
            />

            <div className="flex flex-col gap-6">
              <RailHeading>Now</RailHeading>
              {current.map((exp, index) => (
                <ExperienceCard key={exp.id} experience={exp} index={index} />
              ))}

              <RailHeading>Completed</RailHeading>
              {completed.map((exp, index) => (
                <ExperienceCard key={exp.id} experience={exp} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RailHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h3
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease }}
      className="section-label mt-4 first:mt-0"
    >
      {children}
    </motion.h3>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index: number;
}) {
  const iconKey = Object.keys(typeIcons).find((k) =>
    experience.type.toLowerCase().includes(k)
  );
  const Icon = iconKey ? typeIcons[iconKey] : Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay: (index % 3) * 0.05 }}
      className="relative"
    >
      {/* Rail dot */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
        className="absolute -left-[1.95rem] md:-left-[2.7rem] top-9 w-3 h-3 rounded-full bg-gradient-to-b from-honey to-tangerine border-2 border-cream shadow-[0_0_0_4px_rgba(255,184,92,0.25)]"
        aria-hidden
      />

      <div className="backdrop-blur-2xl backdrop-saturate-[1.2] bg-white/40 border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_24px_rgba(0,0,0,0.04)] rounded-3xl p-6 md:p-7 relative overflow-hidden transition-all duration-300 hover:bg-white/50 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_32px_rgba(0,0,0,0.06)]">
        {/* Subtle glass reflection overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/0 to-white/30 pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10">
          {/* Header row: icon tile + role/org + period */}
          <div className="flex items-start gap-4 mb-4">
            <span className="icon-tile shrink-0" aria-hidden>
              <Icon className="w-5 h-5" />
            </span>

            <div className="min-w-0 flex-1">
              <h4 className="font-display text-xl md:text-2xl text-ink leading-snug">
                {experience.role}
              </h4>
              <p className="font-semibold text-marmalade text-sm md:text-base">
                {experience.organization}
              </p>
            </div>

            <div className="hidden sm:flex flex-col items-end gap-1.5 shrink-0">
              <span className="chip !bg-white/70 !text-[0.7rem] whitespace-nowrap">
                {experience.period}
              </span>
              {experience.active ? (
                <span
                  className="chip !text-[0.62rem] font-mono uppercase tracking-wider !text-leaf !border-leaf/25"
                  style={{ background: "rgba(62,155,79,0.12)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-leaf animate-pulse-dot"
                    aria-hidden
                  />
                  Active
                </span>
              ) : (
                <span className="chip !bg-white/50 !text-[0.62rem] font-mono uppercase tracking-wider !text-taupe">
                  Completed
                </span>
              )}
            </div>
          </div>

          {/* Meta (mobile shows period and status here) */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3 text-taupe text-xs md:text-sm">
            <span className="sm:hidden">{experience.period}</span>
            <span
              className={`sm:hidden uppercase tracking-wider font-mono text-[0.65rem] ${
                experience.active ? "text-leaf" : "text-taupe"
              }`}
            >
              {experience.active ? "Active" : "Completed"}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" aria-hidden />
              {experience.location}
            </span>
            <span className="uppercase tracking-wider font-mono text-[0.65rem] text-marmalade">
              {experience.type}
            </span>
          </div>

          <p className="text-sm md:text-[0.92rem] text-cocoa leading-relaxed mb-4">
            {experience.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span key={skill} className="chip !bg-white/60 !text-[0.7rem]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
