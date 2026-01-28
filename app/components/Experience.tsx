"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import { Tables } from "@/utils/supabase/database.types";

type Experience = Tables<"experiences">;

export default function Experience({ data }: { data: Experience[] }) {
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
        const totalWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        setScrollRange(totalWidth - viewportWidth);
      };

      calculateRange();
      window.addEventListener("resize", calculateRange);
      return () => window.removeEventListener("resize", calculateRange);
    }
  }, [data]);

  // Transform vertical scroll to horizontal translation with buffer
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0px", `-${scrollRange}px`]);

  if (!data || data.length === 0) return null;

  return (
    <section ref={targetRef} id="experience" className="relative h-[400vh] bg-void py-24 md:py-32">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Section Header */}
        <div className="container-padding max-w-7xl mx-auto w-full mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-xs text-electric tracking-[0.2em] mb-5 block">
              03 — EXPERIENCE
            </span>
            <h2 className="text-display font-display gradient-text leading-tight whitespace-nowrap">
              Roadmap to Success
            </h2>
            <p className="text-body-lg text-smoke/80 max-w-2xl leading-relaxed mt-6">
              Founding startups to leading robotics teams, each role builds high-agency.
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
            
            {data.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
            
            {/* Trailing spacer */}
            <div className="w-[5vw]" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="container-padding max-w-7xl mx-auto w-full mt-12 md:mt-16"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-ash/70 tracking-wide">SCROLL TO EXPLORE</span>
            <div className="flex-1 h-px bg-steel/30" />
            <span className="font-mono text-[11px] text-ash/70 tracking-wide">{data.length} ROLES</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  const imageSrc = experience.image && experience.image.trim() !== "" 
    ? (experience.image.startsWith("http") || experience.image.startsWith("/") ? experience.image : `/${experience.image}`)
    : "/tech_portfolio_hero_abstract_3d_index_0@4096x2286.jpeg";

  return (
    <div
      className="group relative flex-shrink-0 w-[400px] md:w-[500px] h-[500px] rounded-lg overflow-hidden border border-steel/30 bg-void"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-void z-10 opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        <Image
          src={imageSrc}
          alt={experience.role}
          fill
          sizes="(max-width: 768px) 80vw, 500px"
          className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
          unoptimized={!imageSrc.startsWith("/")}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-10">
        {/* Top Badges */}
        <div className="absolute top-8 right-8 flex gap-3">
          <span 
            className={`inline-flex items-center px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded backdrop-blur-md ${
              experience.active 
                ? "bg-electric/20 text-electric border border-electric/30" 
                : "bg-steel/40 text-ash border border-steel/30"
            }`}
          >
            {experience.type}
          </span>
          {experience.active && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded bg-matrix/20 text-matrix border border-matrix/30 backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-matrix rounded-full animate-pulse" />
              ACTIVE
            </span>
          )}
        </div>

        {/* Text Content */}
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {/* Role */}
          <h3 className="text-2xl md:text-3xl font-display text-bone mb-2 leading-tight group-hover:text-electric transition-colors">
            {experience.role}
          </h3>
          
          {/* Organization */}
          <p className="font-mono text-sm text-smoke mb-6">
            {experience.organization}
          </p>

          {/* Meta: Date & Location */}
          <div className="flex items-center gap-5 mb-6 text-ash/70">
            <span className="flex items-center gap-1.5 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              {experience.period}
            </span>
            <span className="flex items-center gap-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5" />
              {experience.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-smoke/90 mb-8 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {experience.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span 
                key={skill} 
                className="px-2.5 py-1 text-[10px] font-mono text-bone/70 uppercase tracking-wide border border-white/10 rounded bg-white/5"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
