"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import Image from "next/image";
import { Tables } from "@/utils/supabase/database.types";

type Project = Tables<"projects">;

export default function Projects({ data }: { data: Project[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="projects" className="relative bg-carbon overflow-hidden section">
      {/* Section Header */}
      <div className="container-padding max-w-7xl mx-auto pb-24 md:pb-32 border-b border-steel/40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-xs text-electric tracking-[0.2em] mb-5 block">
            04 — PROJECT ARCHIVE
          </span>
          <h2 className="text-display font-display gradient-text mb-6">
            The Empire
          </h2>
          <p className="text-body-lg text-smoke/80 max-w-2xl leading-relaxed">
            A growing collection of experiments, products, and explorations. 
            Each project is a node in an expanding network of systems.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Projects */}
      <div className="relative py-20 md:py-32">
        <div className="flex gap-8 px-8 md:px-16 lg:px-20 overflow-x-auto pb-6 snap-x snap-mandatory">
          {data.map((project, index) => (
            <div key={project.id} className="snap-start">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
          {/* Padding Card */}
          <div className="w-[10vw]" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="container-padding max-w-7xl mx-auto pb-12">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] text-ash/70 tracking-wide">SCROLL TO EXPLORE</span>
          <div className="flex-1 h-px bg-steel/30" />
          <span className="font-mono text-[11px] text-ash/70 tracking-wide">{data.length} PROJECTS</span>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const isClassified = project.classified;
  const imageSrc = normalizeImageSrc(project.image);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative flex-shrink-0 w-[400px] md:w-[500px] h-[500px] rounded-lg overflow-hidden border border-steel/30 ${
        isClassified ? "opacity-90" : ""
      }`}
    >
      {/* Background Image with Hover Effect */}
      <div className="absolute inset-0 relative">
        <div className="absolute inset-0 bg-void z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        <Image
          src={imageSrc}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 80vw, 500px"
          className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
          unoptimized
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-10">
        {/* Top Badges */}
        <div className="absolute top-8 right-8 flex flex-col items-end gap-3">
          <span 
            className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wide rounded backdrop-blur-md ${
              project.status === "Shipped" 
                ? "bg-electric/20 text-electric border border-electric/30" 
                : "bg-steel/40 text-ash border border-steel/30"
            }`}
          >
            {project.status}
          </span>
          {project.award && (
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wide rounded bg-amber/20 text-amber border border-amber/30 backdrop-blur-md">
              ★ {project.award}
            </span>
          )}
        </div>

        {/* Text Content */}
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="font-mono text-xs text-electric tracking-widest mb-3 block">
            {project.tagline}
          </span>
          
          <h3 className="text-3xl font-display text-bone mb-4 flex items-center gap-3">
            {project.name}
            {isClassified && <Lock className="w-5 h-5 text-ash/50" />}
          </h3>
          
          <p className="text-smoke/90 leading-relaxed mb-6 max-w-sm">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <span 
                key={tech} 
                className="px-2.5 py-1 text-[10px] font-mono text-bone/70 uppercase tracking-wide border border-white/10 rounded bg-white/5"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          {!isClassified && (
            <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-white hover:text-electric transition-colors"
                >
                  VIEW PROJECT
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-white hover:text-electric transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  CODE SOURCE
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
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
