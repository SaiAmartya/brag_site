"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionPreference } from "@/app/lib/useReducedMotionPreference";
import { useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { pillars, type Pillar } from "@/app/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const itemV = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/**
 * "Where I'm building": exactly the two current pillars, with Sai's distinct
 * relationship to each stated on the card itself.
 */
export default function CurrentWork() {
  return (
    <section id="building" className="relative section scroll-mt-28 overflow-clip">
      <div className="sun-glow w-[48vw] h-[48vw] top-0 -right-[20vw] opacity-75" />
      <div className="sun-glow w-[30vw] h-[30vw] bottom-[6%] -left-[14vw] opacity-60" />
      <div className="cloud cloud-rose animate-drift-a w-[36vw] h-[26vw] top-[4%] -left-[12vw] opacity-60" />
      <div className="cloud cloud-lilac animate-drift-b w-[28vw] h-[20vw] bottom-[12%] -right-[8vw] opacity-50" />

      <div className="container-padding max-w-6xl mx-auto relative z-10">
        <motion.div
          className="mb-14 md:mb-20 text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-label mb-5 inline-flex">
            Where I&apos;m building
          </span>
          <h2 className="font-display text-display text-ink mb-5">
            Two rooms, <span className="accent-italic">two jobs.</span>
          </h2>
          <p className="text-body-lg text-cocoa max-w-2xl mx-auto">
            An intern seat at a Y Combinator company, and a company of my own.
          </p>
        </motion.div>

        {/* Sticky-stacked deck: each card pins, the next slides over it */}
        <div className="flex flex-col gap-16 md:gap-24 pb-8">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.id}
              className="md:sticky"
              style={{ top: `${104 + index * 32}px` }}
            >
              <PillarCard pillar={pillar} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionPreference();
  const reversed = index % 2 === 1;

  // Image drifts inside its frame as the card travels through the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease }}
      className="venture-card glass-strong rounded-[2.5rem] p-4 md:p-6 relative"
      aria-labelledby={`pillar-${pillar.id}`}
    >
      <div
        className={`flex flex-col gap-8 md:gap-12 md:items-center ${
          reversed ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Screenshot, framed rather than bled edge to edge */}
        <div className="relative md:w-1/2 shrink-0">
          <div className="screen-frame rounded-[2rem] p-2.5 md:p-3">
            <div className="relative aspect-[16/10] rounded-[1.4rem] overflow-hidden">
              <motion.div
                style={reduceMotion ? undefined : { y: imageY }}
                className="absolute -inset-y-[8%] inset-x-0"
              >
                <Image
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  fill
                  sizes="(max-width: 768px) 88vw, 44vw"
                  className="object-cover object-top"
                />
              </motion.div>
            </div>
          </div>
          <div className="venture-index absolute top-5 left-5 md:top-6 md:left-6">
            <span className="venture-index__label">Now</span>
            <span className="venture-index__num">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Content */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="md:w-1/2 px-2 pb-4 md:px-0 md:pb-0 md:pr-6"
        >
          <motion.p variants={itemV} className="role-kicker mb-3">
            {pillar.role}
          </motion.p>
          <motion.h3
            variants={itemV}
            id={`pillar-${pillar.id}`}
            className="font-display text-title text-ink mb-3"
          >
            {pillar.name}
          </motion.h3>
          <motion.p
            variants={itemV}
            className="font-display italic text-marmalade mb-4"
          >
            {pillar.tagline}
          </motion.p>
          <motion.p
            variants={itemV}
            className="text-cocoa leading-relaxed mb-7 max-w-md"
          >
            {pillar.description}
          </motion.p>

          <motion.div variants={itemV} className="spec-rail mb-8">
            {pillar.specs.map((spec) => (
              <div key={spec.label} className="spec-cell">
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemV} className="flex flex-wrap gap-3">
            <a
              href={pillar.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sunrise group"
            >
              {pillar.urlLabel}
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
            {pillar.secondary && (
              <a
                href={pillar.secondary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass"
              >
                <Github className="w-4 h-4" aria-hidden />
                {pillar.secondary.label}
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  );
}
