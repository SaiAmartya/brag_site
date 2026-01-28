"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award, Star, Medal, Target, Zap, Crown, Flame, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Tables } from "@/utils/supabase/database.types";

type Achievement = Tables<"achievements">;

const iconMap: Record<string, LucideIcon> = {
  Trophy,
  Award,
  Star,
  Medal,
  Target,
  Zap,
  Crown,
  Flame,
  Rocket
};

const stats = [
  { label: "Competition Rank", value: "Top 1%", sublabel: "School-wide" },
  { label: "Academic Average", value: "98", sublabel: "IB Program" },
  { label: "Contests Participated", value: "10+", sublabel: "Math & CS" },
  { label: "Awards Received", value: "5+", sublabel: "Distinctions" },
];

export default function Achievements({ data }: { data: Achievement[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!data || data.length === 0) return null;

  return (
    <section id="achievements" ref={containerRef} className="relative bg-carbon section">
      {/* Section Header */}
      <div className="container-padding max-w-7xl mx-auto pb-24 md:pb-30 border-b border-steel/40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className=""
        >
          <span className="font-mono text-xs text-electric tracking-[0.2em] mb-5 block">
            02 — COMPETITIVE RIGOR
          </span>
          <h2 className="text-display font-display gradient-text mb-6">
            Some Stats
          </h2>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <div className="border-b border-steel/40 bg-void/30">
        <div className="container-padding max-w-7xl mx-auto py-[70px] text-left">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-left"
              >
                <span className="font-mono text-[10px] text-ash/70 block mb-3 tracking-wider uppercase">
                  {stat.label}
                </span>
                <span className="font-display text-4xl md:text-5xl lg:text-6xl text-bone block mb-2 leading-none">
                  {stat.value}
                </span>
                <span className="font-mono text-xs text-smoke/60 tracking-wide">
                  {stat.sublabel}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="container-padding max-w-7xl mx-auto py-[70px] text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

function AchievementCard({ achievement, index }: AchievementCardProps) {
  const Icon = iconMap[achievement.icon_name] || Star;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="bg-void/50 backdrop-blur-sm p-8 md:p-10 relative group transition-all duration-500 hover:bg-graphite/50 rounded-lg border border-steel/30 hover:border-steel/50 flex flex-col h-full"
    >
      {/* Highlight Border - Top accent */}
      {achievement.highlight && (
        <div 
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-lg"
          style={{ backgroundColor: achievement.color }}
        />
      )}

      {/* Category Tag + Icon Row */}
      <div className="flex items-center justify-between mb-8">
        <span 
          className="inline-flex px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded border"
          style={{ borderColor: `${achievement.color}40`, color: achievement.color }}
        >
          {achievement.category}
        </span>
        <Icon 
          className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ color: achievement.color }}
        />
      </div>

      {/* Value - Large display */}
      <div className="mb-6 flex-grow">
        <span 
          className="font-display text-5xl md:text-6xl block leading-none tracking-tight"
          style={{ color: achievement.color }}
        >
          {achievement.value}
        </span>
      </div>

      <div className="mt-auto">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-display text-bone mb-2 leading-tight">
          {achievement.title}
        </h3>
        
        {/* Subtitle */}
        <p className="font-mono text-xs text-smoke/70 mb-3 tracking-wide">
          {achievement.subtitle}
        </p>
        
        {/* Description */}
        <p className="text-sm text-ash/70 leading-relaxed">
          {achievement.description}
        </p>
      </div>

      {/* Hover Corner Accent */}
      <div 
        className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-500 group-hover:w-8 group-hover:h-8 opacity-50"
        style={{
          borderRight: `2px solid ${achievement.color}`,
          borderBottom: `2px solid ${achievement.color}`,
        }}
      />
    </motion.div>
  );
}
