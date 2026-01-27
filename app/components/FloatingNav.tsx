"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "INTRO" },
  { id: "ventures", label: "VENTURES" },
  { id: "achievements", label: "ACHIEVEMENTS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      setIsVisible(window.scrollY > window.innerHeight * 0.5);

      // Determine active section
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-steel/20 z-[9999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="h-full bg-electric origin-left"
          style={{ scaleX }}
        />
      </motion.div>

      {/* Floating Dots Navigation */}
      <motion.nav
        className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-[999] hidden lg:flex flex-col gap-5"
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
      >
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center gap-3 justify-end py-1"
          >
            <span 
              className={`font-mono text-[10px] tracking-wider transition-all duration-300 ${
                activeSection === section.id 
                  ? "text-electric opacity-100" 
                  : "text-ash/70 opacity-0 group-hover:opacity-100"
              }`}
            >
              {section.label}
            </span>
            <div 
              className={`w-2 h-2 rounded-sm transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-electric scale-110 shadow-[0_0_8px_rgba(0,113,227,0.5)]"
                  : "bg-transparent border border-steel/50 group-hover:border-smoke"
              }`}
            />
          </button>
        ))}
      </motion.nav>
    </>
  );
}
