"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, memo } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const roles = ["IB Student", "Systems Builder", "Technical Founder"];

const badges = [
  "Co-Founder @ TidalTasks",
  "Co-Founder @ Canary OS",
];

// Isolated component for the rotating text to prevent full Hero re-renders
const RoleRotator = memo(function RoleRotator() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden h-7 px-3 flex items-center border border-electric/30 bg-electric/5 backdrop-blur-sm rounded-sm">
      <AnimatePresence mode="wait">
        <motion.span
          key={roleIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-xs text-electric tracking-widest uppercase"
        >
          {roles[roleIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
});

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-void flex flex-col overflow-hidden">
      {/* Background Elements - Optimized */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-10" />
        <Image
          src="/tech_portfolio_hero_abstract_3d_index_0@4096x2286.jpeg"
          alt="Abstract Background"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
          quality={60} // Reduced quality for background image as it's low opacity
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between container-padding py-6 md:py-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4"
        >
          <span className="font-mono text-sm text-smoke tracking-wide">SAI.AMARTYA</span>
          <span className="hidden sm:block w-12 h-px bg-steel/60" />
          <span className="font-mono text-xs text-ash/70 hidden sm:inline">v2026.01</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-6 md:gap-8"
        >
          <a href="#ventures" className="hidden md:block font-mono text-sm text-smoke/80 hover:text-white transition-colors">VENTURES</a>
          <a href="#achievements" className="hidden md:block font-mono text-sm text-smoke/80 hover:text-white transition-colors">ACHIEVEMENTS</a>
          <a href="mailto:saiamartya19@gmail.com" className="btn btn-outline text-xs">CONTACT</a>
        </motion.div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 relative z-10 container-padding flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start pt-10 lg:pt-0 order-2 lg:order-1">
            
            {/* Animated Role Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-flex"
            >
              <RoleRotator />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-[0.9] tracking-tight"
            >
              Building the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-ash to-steel">
                Agentic Future
              </span>
            </motion.h1>

            {/* Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-ash/90 text-base md:text-lg leading-relaxed max-w-xl mb-8 font-light"
            >
              I build systems that matter, connecting complex AI infrastructure to user-centric design.
              <br className="mb-4 block" />
            </motion.p>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {badges.map((badge, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 border border-white/10 bg-white/5 rounded-full text-xs font-mono text-smoke hover:border-electric/50 hover:bg-electric/5 transition-colors cursor-default"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <a 
                href="#ventures" 
                className="group relative px-6 py-3 bg-white text-black font-medium text-sm tracking-wide overflow-hidden"
              >
                <div className="absolute inset-0 bg-electric translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                  EXPLORE VENTURES <ChevronDown className="w-4 h-4" />
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 relative"
          >
            {/* Optimized Glow Effect (Gradient instead of large Blur) */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full pointer-events-none opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(94, 234, 212, 0.4) 0%, rgba(0,0,0,0) 70%)'
              }}
            />
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 will-change-[transform]">
                {/* Static decorative rings instead of infinite animation to reduce GPU load */}
                <div className="absolute inset-0 border border-white/5 rounded-full" />
                <div className="absolute inset-4 border border-dashed border-white/10 rounded-full" />
                
                <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-white/10 bg-black/50 backdrop-blur-sm shadow-2xl">
                  <Image
                    src="/Sai_Amartya.png"
                    alt="Sai Amartya"
                    fill
                    className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
