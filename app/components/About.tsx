"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  // Quote section scroll progress
  const { scrollYProgress: quoteProgress } = useScroll({
    target: quoteRef,
    offset: ["start start", "end start"],
  });

  // Quote animations - fade in, hold, fade out
  const quoteOpacity = useTransform(quoteProgress, [0, 0.1, 0.7, 0.9], [0, 1, 1, 0]);
  const quoteScale = useTransform(quoteProgress, [0, 0.1, 0.7, 0.9], [0.95, 1, 1, 0.98]);
  const quoteY = useTransform(quoteProgress, [0, 0.1, 0.7, 0.9], [40, 0, 0, -30]);

  // Background parallax
  const bgY = useTransform(quoteProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="relative bg-void">
      {/* === STICKY QUOTE SECTION === */}
      <div ref={quoteRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Background with subtle parallax */}
          <motion.div 
            className="absolute inset-0 opacity-[0.07] relative"
            style={{ y: bgY }}
          >
            <Image
              src="/tech_portfolio_hero_abstract_3d_index_0@4096x2286.jpeg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              unoptimized
            />
          </motion.div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void py-[15px] px-[21px]" />

          {/* Quote Content */}
          <motion.div
            style={{ opacity: quoteOpacity, scale: quoteScale, y: quoteY }}
            className="relative z-10 max-w-5xl mx-auto container-padding text-center"
          >
            <motion.span 
              className="font-mono text-xs text-electric tracking-[0.3em] mb-10 block"
              style={{ opacity: quoteOpacity }}
            >
              THE PHILOSOPHY
            </motion.span>
            
            <p className="text-[clamp(1.5rem,4vw,3.5rem)] font-display text-bone leading-[1.2] tracking-tight">
              I do not build apps; I engineer{" "}
              <span className="relative inline-block">
                <span className="gradient-electric">systems</span>
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </span>
              . From the abstract beauty of competitive mathematics to the practical 
              complexity of AI-driven operating environments, my work is a pursuit of{" "}
              <span className="gradient-electric">high agency</span> and{" "}
              <span className="gradient-electric">technical sovereignty</span>.
            </p>

            {/* Decorative elements */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <div className="w-12 h-px bg-steel/40" />
              <div className="w-2 h-2 border border-electric/50 rotate-45" />
              <div className="w-12 h-px bg-steel/40" />
            </div>
          </motion.div>

          {/* Corner accents */}
          <div className="absolute top-16 left-8 md:left-16 w-16 h-16">
            <div className="absolute top-0 left-0 w-8 h-px bg-steel/30" />
            <div className="absolute top-0 left-0 w-px h-8 bg-steel/30" />
          </div>
          <div className="absolute bottom-16 right-8 md:right-16 w-16 h-16">
            <div className="absolute bottom-0 right-0 w-8 h-px bg-steel/30" />
            <div className="absolute bottom-0 right-0 w-px h-8 bg-steel/30" />
          </div>
        </div>
        </div>
    </section>
  );
}
