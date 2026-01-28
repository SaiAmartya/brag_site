"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const marqueeItems = [
  "TECHNICAL FOUNDER-",
  "AGENTIC FUTURE-",
  "HIGH AGENCY-",
  "COMPETITIVE RIGOR-",
  "OPERATIONAL EXCELLENCE-",
  "FULL-STACK OWNERSHIP-",
];

export default function MarqueeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-20 bg-void overflow-hidden border-y border-steel/30"
    >
      {/* First Row - Moving Left - Outlined text */}
      <motion.div 
        className="flex whitespace-nowrap mb-3 md:mb-4"
        style={{ x: x1 }}
      >
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <span
            key={`row1-${index}`}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-transparent mx-6 md:mx-10"
            style={{
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>

      {/* Second Row - Moving Right - Filled text with highlights */}
      <motion.div 
        className="flex whitespace-nowrap"
        style={{ x: x2 }}
      >
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <span
            key={`row2-${index}`}
            className={`font-display text-5xl md:text-7xl lg:text-8xl mx-6 md:mx-10 transition-colors duration-300 ${
              index % 4 === 0 ? "text-electric" : "text-bone/8"
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
