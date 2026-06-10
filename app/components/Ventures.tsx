"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Tables } from "@/utils/supabase/database.types";

type Venture = Tables<"ventures">;

const ease = [0.16, 1, 0.3, 1] as const;

export default function Ventures({ data }: { data: Venture[] }) {
  return (
    <section id="ventures" className="relative section overflow-clip">
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
          <span className="section-label mb-5 inline-flex">The ventures</span>
          <h2 className="font-display text-display text-ink mb-5">
            Two startups, <span className="accent-italic">one mission.</span>
          </h2>
          <p className="text-body-lg text-cocoa max-w-2xl mx-auto">
            Active companies building the substrate for an agentic future.
            Shipped, used, and growing.
          </p>
        </motion.div>

        {/* Sticky-stacked deck: each card pins, the next slides over it */}
        <div className="flex flex-col gap-16 md:gap-24 pb-8">
          {data.map((venture, index) => (
            <div
              key={venture.id}
              className="md:sticky"
              style={{ top: `${104 + index * 32}px` }}
            >
              <VentureCard venture={venture} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function normalizeImageSrc(src: string | null) {
  if (!src) return "/tech_portfolio_hero_abstract_3d_index_0@4096x2286.jpeg";
  if (src.includes("canary_os_on_device_protection_visualization")) {
    return "/canary_os_on_device_protection.jpeg";
  }
  if (src.startsWith("http") || src.startsWith("data:") || src.startsWith("/")) {
    return src;
  }
  return `/${src}`;
}

function VentureCard({ venture, index }: { venture: Venture; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const reversed = index % 2 === 1;

  // Image drifts inside its frame as the card travels through the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease }}
      className="glass-strong rounded-[2.5rem] p-4 md:p-6 relative"
    >
      <div
        className={`flex flex-col gap-8 md:gap-12 md:items-center ${
          reversed ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Image with internal parallax */}
        <div className="relative md:w-1/2 aspect-[4/3] rounded-[2rem] overflow-hidden shrink-0">
          <motion.div style={{ y: imageY }} className="absolute -inset-y-[12%] inset-x-0">
            <Image
              src={normalizeImageSrc(venture.image)}
              alt={venture.name}
              fill
              sizes="(max-width: 768px) 92vw, 45vw"
              className="object-cover"
              unoptimized
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent pointer-events-none" />
          <span className="absolute top-4 left-4 chip-tangerine chip backdrop-blur-md">
            Venture {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div className="md:w-1/2 px-2 pb-4 md:px-0 md:pb-0 md:pr-6">
          <p className="font-display italic text-lg text-marmalade mb-3">
            {venture.tagline}
          </p>
          <h3 className="font-display text-title text-ink mb-4">
            {venture.name}
          </h3>
          <p className="text-cocoa leading-relaxed mb-7">
            {venture.description}
          </p>

          {venture.metrics && typeof venture.metrics === "object" && (
            <div className="flex flex-wrap gap-3 mb-8">
              {Object.entries(venture.metrics as Record<string, string>).map(
                ([key, value]) => (
                  <div key={key} className="card-warm flex flex-col items-start py-2.5 px-4 rounded-2xl">
                    <span className="font-display text-base text-ink leading-tight">
                      {value}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-wider text-taupe font-mono">
                      {key}
                    </span>
                  </div>
                )
              )}
            </div>
          )}

          {venture.url && (
            <a
              href={venture.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sunrise group"
            >
              Visit {venture.name}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
