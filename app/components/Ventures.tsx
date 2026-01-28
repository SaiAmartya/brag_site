"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Tables } from "@/utils/supabase/database.types";

type Venture = Tables<"ventures">;

export default function Ventures({ data }: { data: Venture[] }) {
  const normalizedData = (data || []).map((venture) => ({
    ...venture,
    image: normalizeImageSrc(venture.image),
  }));

  const isCompact = normalizedData.length <= 2;

  return (
    <section id="ventures" className="relative bg-void pt-32 pb-20 md:py-48">
      <div className="container-padding horizontal-ventures-container">
        <motion.div 
          className="mb-8 md:mb-20 max-w-3xl pt-0 pb-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs text-electric tracking-widest mb-0 block">
            01 — VENTURES
          </span>
          <h2 className="text-title font-display text-bone mb-4">
            Founder's Hub
          </h2>
          <p className="text-body-lg text-smoke/80">
            Active startups building the substrate for an agentic future.
          </p>
        </motion.div>

        {isCompact ? (
          <div className="grid gap-8 md:grid-cols-2">
            {normalizedData.map((venture, index) => (
              <VentureCard key={venture.id} venture={venture} index={index} isCompact />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="flex gap-8 md:gap-12 overflow-x-auto pb-8 pr-8 snap-x snap-mandatory">
              {normalizedData.map((venture, index) => (
                <div key={venture.id} className="snap-start">
                  <VentureCard venture={venture} index={index} />
                </div>
              ))}
              <div className="w-[20vw] flex-shrink-0" />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="font-mono text-[11px] text-ash/70 tracking-wide">SCROLL TO EXPLORE</span>
              <div className="flex-1 h-px bg-steel/40" />
              <span className="font-mono text-[11px] text-ash/70 tracking-wide">{normalizedData.length} VENTURES</span>
            </div>
          </div>
        )}
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

function VentureCard({
  venture,
  index,
  isCompact = false,
}: {
  venture: Venture;
  index: number;
  isCompact?: boolean;
}) {
  return (
    <motion.div
      className={`relative ${
        isCompact ? "h-[520px]" : "w-[88vw] md:w-[70vw] lg:w-[55vw] h-[65vh] min-h-[500px] max-h-[700px]"
      } flex-shrink-0 group rounded-lg overflow-hidden border border-steel/30 bg-void`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        {venture.image && (
          <Image
            src={normalizeImageSrc(venture.image)}
            alt={venture.name}
            fill
            sizes={isCompact ? "(max-width: 768px) 92vw, 48vw" : "(max-width: 768px) 88vw, (max-width: 1024px) 70vw, 55vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
        <span className="font-mono text-xs tracking-widest mb-4 block" style={{ color: venture.color || '#fff' }}>
          {venture.tagline}
        </span>
        <h3 className="text-display font-display text-bone mb-4">
          {venture.name}
        </h3>
        <p className="text-body-lg text-smoke/90 max-w-lg mb-6 md:mb-8">
          {venture.description}
        </p>
        <div className="flex flex-wrap gap-6 md:gap-12 mb-6 md:mb-8">
          {venture.metrics && typeof venture.metrics === "object" &&
            Object.entries(venture.metrics as Record<string, string>).map(([key, value]) => (
              <div key={key} className="min-w-[100px]">
                <span className="font-mono text-[10px] text-ash uppercase tracking-wider block mb-1.5">
                  {key}
                </span>
                <span className="font-display text-lg md:text-xl text-bone">{value}</span>
              </div>
            ))}
        </div>
        {venture.url && (
          <a
            href={venture.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary group/btn"
          >
            EXPLORE PROJECT
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        )}
      </div>

      <div className="absolute top-8 right-8 md:top-12 md:right-12">
        <span className="font-display text-7xl md:text-8xl lg:text-9xl opacity-15" style={{ color: venture.color || '#fff' }}>
          0{index + 1}
        </span>
      </div>
    </motion.div>
  );
}
