"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const sections = [
  { id: "ventures", label: "Ventures" },
  { id: "achievements", label: "Wins" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section.id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-4 left-0 right-0 z-[999] flex justify-center px-4"
    >
      <nav
        className={`glass-pill flex items-center gap-1 pl-5 pr-2 py-2 transition-all duration-500 ${
          scrolled ? "shadow-xl" : ""
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-lg text-ink mr-3 cursor-pointer leading-none"
        >
          Sai<span className="text-tangerine">.</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeSection === section.id
                  ? "bg-white/80 text-marmalade shadow-sm"
                  : "text-cocoa hover:text-ink hover:bg-white/50"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        <a
          href="mailto:saiamartya19@gmail.com"
          className="btn btn-sunrise !px-4 !py-2 text-sm ml-2"
        >
          Say hello
        </a>
      </nav>
    </motion.header>
  );
}
