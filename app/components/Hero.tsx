"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const roles = ["IB Student", "Systems Builder", "Technical Founder"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="relative min-h-screen bg-void"
    >
      <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 grid-overlay opacity-40" />
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
          <Image
            src="/tech_portfolio_hero_abstract_3d_index_0@4096x2286.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            unoptimized
          />
        </div>

        {/* Top Navigation Bar */}
        <nav className="relative z-20 flex items-center justify-between container-padding py-8 md:py-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <span className="font-mono text-sm text-smoke tracking-wide">SAI.AMARTYA</span>
            <span className="hidden sm:block w-12 h-px bg-steel/60" />
            <span className="font-mono text-xs text-ash/70 hidden sm:inline">v2026.01</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-6 md:gap-8"
          >
            <a href="#ventures" className="hidden md:block font-mono text-sm text-smoke/80 hover:text-white transition-colors">
              VENTURES
            </a>
            <a href="#achievements" className="hidden md:block font-mono text-sm text-smoke/80 hover:text-white transition-colors">
              ACHIEVEMENTS
            </a>
            <a href="#experience" className="hidden lg:block font-mono text-sm text-smoke/80 hover:text-white transition-colors">
              EXPERIENCE
            </a>
            <a 
              href="mailto:saiamartya19@gmail.com"
              className="btn btn-outline text-xs"
            >
              CONTACT
            </a>
          </motion.div>
        </nav>

        {/* Main Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-8 md:px-16 lg:px-20 py-12 md:py-16">
          <motion.div className="w-full text-center">
            {/* Animated Roles - Sharp Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 md:mb-10 flex justify-center"
            >
              <div className="relative overflow-hidden h-8 px-[10px] gap-0 flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-xs md:text-sm text-electric tracking-[0.2em] uppercase whitespace-nowrap"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Name - Centered & No Clipping */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-hero font-display gradient-text mb-6 md:mb-8 leading-[0.9] tracking-tight whitespace-nowrap"
            >
              SAI AMARTYA
            </motion.h1>

          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="relative z-10 border-t border-steel/40"
        >
          <div className="container-padding py-8 md:py-10 flex items-center justify-between">
            <div className="flex items-center gap-8 md:gap-16 lg:gap-20">
              <StatItem label="VENTURES" value="02" />
              <StatItem label="PROJECTS" value="06+" />
              <StatItem label="AWARDS" value="05" />
            </div>
            
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 cursor-pointer group"
              onClick={() => {
                document.getElementById("ventures")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="font-mono text-[11px] text-ash/70 group-hover:text-ash transition-colors tracking-wide">SCROLL TO EXPLORE</span>
              <ChevronDown className="w-4 h-4 text-ash/60 group-hover:text-ash transition-colors" />
            </motion.div>
          </div>
        </motion.div>

        {/* Corner Accents */}
        <div className="absolute top-24 left-8 md:left-12 corner-accent top-left opacity-40" />
        <div className="absolute bottom-24 right-8 md:right-12 corner-accent bottom-right opacity-40" />
      </div>
    </motion.section>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] md:text-xs text-ash/70 tracking-wide">{label}</span>
      <span className="font-display text-xl md:text-2xl lg:text-3xl text-bone">{value}</span>
    </div>
  );
}
