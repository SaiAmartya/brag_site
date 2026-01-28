"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import Image from "next/image";
import { Tables } from "@/utils/supabase/database.types";
import { useRef, useState, useEffect } from "react";

type Project = Tables<"projects">;

export default function Projects({ data }: { data: Project[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Set up scroll progress monitoring for the section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Calculate scroll range on mount and resize
  useEffect(() => {
    if (scrollContainerRef.current) {
      const calculateRange = () => {
        const container = scrollContainerRef.current;
        if (!container) return;
        
        // Calculate the total width of content minus the viewport width
        // We add extra padding to ensure the last card is fully visible
        const totalWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        // The scroll range is how much we need to translate left
        // We ensure we scroll enough to see the end, plus a bit of margin
        setScrollRange(totalWidth - viewportWidth);
      };

      calculateRange();
      window.addEventListener("resize", calculateRange);
      return () => window.removeEventListener("resize", calculateRange);
    }
  }, [data]);

  // Transform vertical scroll to horizontal translation
  // We map 0-1 vertical progress to 0 to -scrollRange horizontal translation
  // We use a buffer [0.1, 0.9] to ensure the first and last cards are fully viewable
  // before and after the scroll
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0px", `-${scrollRange}px`]);

  if (!data || data.length === 0) return null;

  return (
    // Increase height to 400vh to ensure enough scroll distance for the parallax effect
    <section ref={targetRef} id="projects" className="relative h-[400vh] bg-carbon pt-24 md:pt-32 pb-0">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Section Header - Fixed position relative to the sticky container */}
        <div className="container-padding max-w-7xl mx-auto w-full mb-12 md:mb-16">
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
              Empire of Experiments
            </h2>
            <p className="text-body-lg text-smoke/80 max-w-2xl leading-relaxed">
              A growing collection of experiments, products, and explorations.
            </p>
          </motion.div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="w-full relative">
          <motion.div 
            ref={scrollContainerRef}
            style={{ x }}
            className="flex gap-8 px-8 md:px-20 w-max items-center"
          >
            {/* Initial spacer */}
            <div className="w-[5vw]" />
            
            {data.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
            
            {/* Trailing spacer to ensure last card is fully visible and not cut off */}
            <div className="w-[5vw]" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="container-padding max-w-7xl mx-auto w-full mt-12 md:mt-16"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-ash/70 tracking-wide">SCROLL TO EXPLORE</span>
          </div>
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
    <div
      className={`group relative flex-shrink-0 w-[400px] md:w-[500px] h-[500px] rounded-lg overflow-hidden border border-steel/30 bg-void ${
        isClassified ? "opacity-90" : ""
      }`}
    >
      {/* Background Image with Hover Effect */}
      <div className="absolute inset-0">
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
    </div>
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
