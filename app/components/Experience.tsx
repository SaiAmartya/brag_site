"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar } from "lucide-react";
import { Tables } from "@/utils/supabase/database.types";

type Experience = Tables<"experiences">;

export default function Experience({ data }: { data: Experience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!data || data.length === 0) return null;

  return (
    <section id="experience" ref={containerRef} className="relative bg-void section">
      {/* Section Header */}
      <div className="container-padding max-w-7xl mx-auto pb-24 md:pb-32 border-b border-steel/40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="font-mono text-xs text-electric tracking-[0.2em] mb-5 block">
            03 — EXPERIENCE
          </span>
          <h2 className="text-display font-display gradient-text leading-tight whitespace-nowrap">
            The Operational Track
          </h2>
          <p className="text-body-lg text-smoke/80 max-w-2xl leading-relaxed mt-6">
            From founding startups to leading robotics teams—each role builds
            the operational muscle required for high-agency execution.
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="relative pt-20 md:pt-32">
        <div className="container-padding max-w-7xl mx-auto relative">
          {/* Center Timeline Line - Only visible on md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px">
            <div className="w-full h-full bg-steel/30" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-electric via-electric to-electric/50"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-px">
            <div className="w-full h-full bg-steel/30" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-electric"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-16 md:space-y-0">
            {data.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: Experience;
  isLeft: boolean;
}

function ExperienceCard({ experience, isLeft }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative md:py-12"
    >
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-16 items-center">
        {/* Left Content / Spacer */}
        {isLeft ? (
          <div className="flex justify-end relative">
            <CardContent experience={experience} alignment="right" />
            {/* Connecting Line (Right) */}
            <div className="absolute top-1/2 -right-8 lg:-right-16 w-8 lg:w-16 h-px bg-steel/30" />
          </div>
        ) : (
          <div /> // Spacer
        )}

        {/* Center Timeline Node - Perfectly Centered */}
        <div className="relative flex items-center justify-center w-4 h-4 z-10">
          <div 
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              experience.active 
                ? "bg-electric border-electric shadow-[0_0_12px_rgba(0,113,227,0.5)] scale-125" 
                : "bg-carbon border-steel/60"
            }`}
          />
        </div>

        {/* Right Content / Spacer */}
        {!isLeft ? (
          <div className="flex justify-start relative">
            <div className="absolute top-1/2 -left-8 lg:-left-16 w-8 lg:w-16 h-px bg-steel/30" />
            <CardContent experience={experience} alignment="left" />
          </div>
        ) : (
          <div /> // Spacer
        )}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden relative pl-12">
        {/* Timeline Node */}
        <div 
          className={`absolute left-8 top-8 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10 ${
            experience.active 
              ? "bg-electric border-electric" 
              : "bg-carbon border-steel/60"
          }`}
        />
        {/* Mobile Connector */}
        <div className="absolute left-8 top-[38px] w-4 h-px bg-steel/30" />
        
        <CardContent experience={experience} alignment="left" />
      </div>
    </motion.div>
  );
}

interface CardContentProps {
  experience: Experience;
  alignment: "left" | "right";
}

function CardContent({ experience, alignment }: CardContentProps) {
  const isRight = alignment === "right";
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`w-full max-w-lg bg-carbon/60 backdrop-blur-md border border-steel/40 hover:border-electric/30 rounded-lg p-8 md:p-10 transition-all duration-300 group ${
        isRight ? "text-right" : "text-left"
      }`}
    >
      {/* Top row: Type badge + Active status */}
      <div className={`flex items-center gap-3 mb-6 ${isRight ? "flex-row-reverse" : ""}`}>
        <span 
          className={`inline-flex items-center px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded ${
            experience.active 
              ? "bg-electric/10 text-electric border border-electric/30" 
              : "bg-steel/20 text-ash border border-steel/30"
          }`}
        >
          {experience.type}
        </span>
        {experience.active && (
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-matrix tracking-wider">
            <span className="w-1.5 h-1.5 bg-matrix rounded-full animate-pulse" />
            ACTIVE
          </span>
        )}
      </div>

      {/* Role */}
      <h3 className="text-xl md:text-2xl font-display text-bone mb-2 leading-tight group-hover:text-electric transition-colors">
        {experience.role}
      </h3>
      
      {/* Organization */}
      <p className="font-mono text-sm text-smoke mb-5">
        {experience.organization}
      </p>

      {/* Meta: Date & Location */}
      <div className={`flex items-center gap-5 mb-6 text-ash/70 ${isRight ? "justify-end" : ""}`}>
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
      <p className="text-sm text-smoke/90 mb-8 leading-relaxed">
        {experience.description}
      </p>

      {/* Skills */}
      <div className={`flex flex-wrap gap-2 ${isRight ? "justify-end" : ""}`}>
        {experience.skills.map((skill) => (
          <span 
            key={skill} 
            className="px-2.5 py-1 text-[10px] font-mono text-ash/80 uppercase tracking-wide border border-steel/30 rounded bg-steel/5"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
