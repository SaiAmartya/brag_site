"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin, Github } from "lucide-react";

const links = [
  {
    name: "Email",
    value: "saiamartya19@gmail.com",
    href: "mailto:saiamartya19@gmail.com",
    icon: Mail,
  },
  {
    name: "LinkedIn",
    value: "sai-amartya",
    href: "https://linkedin.com/in/sai-amartya",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    value: "SaiAmartya",
    href: "https://github.com/SaiAmartya",
    icon: Github,
  },
];

const quickLinks = [
  { name: "Ventures", href: "#ventures" },
  { name: "Achievements", href: "#achievements" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

export default function Footer() {
  return (
    <footer className="relative bg-void border-t border-steel/40">
      {/* Main CTA Section - Better spacing */}
      <div className="px-8 md:px-16 lg:px-20 max-w-7xl mx-auto py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-8">
            <h2 className="text-display font-display text-bone leading-tight">
              Ready to engineer
              <br />
              <span className="gradient-electric">the future?</span>
            </h2>
            
            <a
              href="mailto:saiamartya19@gmail.com"
              className="btn btn-primary group"
            >
              GET IN TOUCH
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Links Grid - Better spacing */}
      <div className="border-t border-steel/30">
        <div className="px-8 md:px-16 lg:px-20 max-w-7xl mx-auto py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-16 md:gap-24">
            {/* Contact Links */}
            <div>
              <span className="font-mono text-[10px] text-ash/70 mb-6 block tracking-wider uppercase">
                CONNECT
              </span>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 text-smoke/80 hover:text-white transition-colors group"
                    >
                      <link.icon className="w-4 h-4 opacity-60" />
                      <span className="font-mono text-sm">{link.value}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <span className="font-mono text-[10px] text-ash/70 mb-6 block tracking-wider uppercase">
                NAVIGATION
              </span>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="font-mono text-sm text-smoke/80 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Status */}
            <div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-matrix rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-matrix tracking-wide">
                    AVAILABLE FOR OPPORTUNITIES
                  </span>
                </div>
                <p className="text-sm text-smoke/70 leading-relaxed">
                  Kitchener, Ontario
                  <br />
                  IB Student @ Cameron Heights C.I.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Better spacing */}
      <div className="border-t border-steel/30">
        <div className="px-8 md:px-16 lg:px-20 max-w-7xl mx-auto py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-ash/60">
              © 2026 SAI AMARTYA B.L.
            </span>
            <span className="hidden md:block w-px h-3 bg-steel/40" />
            <span className="font-mono text-[11px] text-ash/60">
              ALL RIGHTS RESERVED
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-ash/60">
              BUILT WITH NEXT.JS
            </span>
            <span className="w-px h-3 bg-steel/40" />
            <span className="font-mono text-[11px] text-electric/80">
              v2026.01
            </span>
          </div>
        </div>
      </div>

      {/* Corner Accents - More subtle */}
      <div className="absolute top-8 right-8 md:right-16 corner-accent bottom-right opacity-30" />
    </footer>
  );
}
