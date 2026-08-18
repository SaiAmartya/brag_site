"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { navSections, profile } from "@/app/content/site";

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = "";
      for (const section of navSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
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

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-4 left-0 right-0 z-[999] flex justify-center px-4"
    >
      <nav
        aria-label="Sections"
        className={`glass-pill flex items-center gap-1 pl-4 pr-2 py-2 max-w-full transition-all duration-500 ${
          scrolled ? "shadow-xl" : ""
        }`}
      >
        <a
          href="#hero"
          className="font-display text-lg text-ink mr-2 md:mr-3 leading-none shrink-0 px-1"
        >
          Sai<span className="text-tangerine">.</span>
          <span className="sr-only">Back to top</span>
        </a>

        <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={activeSection === section.id ? "true" : undefined}
              className={`px-3 lg:px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeSection === section.id
                  ? "bg-white/80 text-marmalade shadow-sm"
                  : "text-cocoa hover:text-ink hover:bg-white/50"
              }`}
            >
              {section.label}
            </a>
          ))}
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="btn btn-sunrise !px-4 !py-2 text-sm ml-2 shrink-0"
        >
          Say hello
        </a>
      </nav>
    </motion.header>
  );
}
