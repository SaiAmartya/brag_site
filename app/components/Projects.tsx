"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import Image from "next/image";
import { Tables } from "@/utils/supabase/database.types";

type Project = Tables<"projects">;

const ease = [0.16, 1, 0.3, 1] as const;

/** Pointer-tracking 3D tilt with springy return-to-rest. */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 7);
    rx.set(-py * 7);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Projects({ data }: { data: Project[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="projects" className="relative section overflow-hidden">
      <div className="sun-glow w-[48vw] h-[48vw] top-[5%] -left-[20vw] opacity-75" />
      <div className="sun-glow w-[34vw] h-[34vw] bottom-[8%] -right-[14vw] opacity-65" />
      <div className="cloud cloud-rose animate-drift-b w-[30vw] h-[22vw] top-[30%] -right-[10vw] opacity-55" />
      <div className="cloud cloud-lilac animate-drift-a w-[26vw] h-[18vw] bottom-[15%] -left-[8vw] opacity-45" />

      <div className="container-padding max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="section-label mb-5 inline-flex">The archive</span>
          <h2 className="font-display text-display text-ink mb-5">
            An empire of <span className="accent-italic">experiments.</span>
          </h2>
          <p className="text-body-lg text-cocoa max-w-2xl mx-auto">
            Products, prototypes, and the occasional happy accident.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {data.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function normalizeImageSrc(src: string) {
  if (!src) return "/tech_portfolio_hero_abstract_3d_index_0@4096x2286.jpeg";
  if (src.includes("canary_os_on_device_protection_visualization")) {
    return "/canary_os_on_device_protection.jpeg";
  }
  if (src.startsWith("http") || src.startsWith("data:") || src.startsWith("/")) {
    return src;
  }
  return `/${src}`;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isClassified = project.classified;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay: (index % 2) * 0.1 }}
    >
      <TiltCard className="card-warm rounded-[2rem] p-4 flex flex-col h-full transition-shadow duration-500 hover:shadow-[0_32px_64px_-20px_rgba(187,129,27,0.4)]">
      {/* Image */}
      <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden mb-6">
        <Image
          src={normalizeImageSrc(project.image)}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 92vw, 45vw"
          className={`object-cover transition-transform duration-700 hover:scale-105 ${
            isClassified ? "blur-[3px] saturate-50" : ""
          }`}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/15 to-transparent pointer-events-none" />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span
            className={`chip backdrop-blur-md !text-[0.65rem] font-mono uppercase tracking-wider ${
              project.status === "Shipped" ? "chip-tangerine" : ""
            }`}
          >
            {project.status}
          </span>
          {project.award && (
            <span className="chip backdrop-blur-md !text-[0.65rem] font-mono uppercase tracking-wider !text-marmalade">
              ★ {project.award}
            </span>
          )}
        </div>

        {isClassified && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="glass-pill px-4 py-2 flex items-center gap-2 text-sm font-semibold text-cocoa">
              <Lock className="w-3.5 h-3.5 text-marmalade" />
              Classified
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-3 pb-3 flex flex-col flex-1">
        <p className="font-display italic text-marmalade mb-2">
          {project.tagline}
        </p>
        <h3 className="font-display text-2xl text-ink mb-3 leading-snug">
          {project.name}
        </h3>
        <p className="text-sm text-cocoa leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span key={tech} className="chip !text-[0.7rem]">
              {tech}
            </span>
          ))}
        </div>

        {!isClassified && (project.url || project.github) && (
          <div className="flex items-center gap-3 mt-auto">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sunrise !px-4 !py-2 text-sm group"
              >
                View project
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass !px-4 !py-2 text-sm"
              >
                <Github className="w-3.5 h-3.5" />
                Source
              </a>
            )}
          </div>
        )}
        </div>
      </TiltCard>
    </motion.article>
  );
}
