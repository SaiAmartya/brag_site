"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin, Github } from "lucide-react";
import Clouds from "./Clouds";

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
    href: "https://www.linkedin.com/in/sai-amartya-balamurugan-lakshmipraba-537831371/",
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
  { name: "Wins", href: "#achievements" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-28 md:pt-36">
      <Clouds variant="soft" />
      <div className="sun-glow w-[55vw] h-[55vw] -bottom-[30vw] left-1/2 -translate-x-1/2" />

      {/* Big CTA */}
      <div className="container-padding max-w-5xl mx-auto relative z-10 text-center mb-20 md:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="section-label mb-6 inline-flex">Get in touch</span>
          <h2 className="font-display text-display text-ink mb-8 max-w-3xl mx-auto">
            Let&apos;s build something{" "}
            <span className="accent-italic">worth bragging about.</span>
          </h2>
          <a href="mailto:saiamartya19@gmail.com" className="btn btn-sunrise text-base !px-8 !py-4 group">
            Say hello
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>

      {/* Links card */}
      <div className="container-padding max-w-6xl mx-auto relative z-10 pb-10">
        <div className="glass-strong rounded-[2rem] p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-marmalade mb-5 block">
                Connect
              </span>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2.5 text-cocoa hover:text-marmalade transition-colors group"
                    >
                      <link.icon className="w-4 h-4 text-taupe group-hover:text-tangerine transition-colors" />
                      <span className="text-sm font-medium">{link.value}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-marmalade mb-5 block">
                Explore
              </span>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm font-medium text-cocoa hover:text-marmalade transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-leaf rounded-full animate-pulse-dot" />
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-leaf">
                  Open to opportunities
                </span>
              </div>
              <p className="text-sm text-cocoa leading-relaxed">
                Kitchener, Ontario
                <br />
                IB Student @ Cameron Heights C.I.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-padding max-w-6xl mx-auto relative z-10 py-7 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-xs text-taupe font-mono">
          © 2026 Sai Amartya B.L. All rights reserved.
        </span>
        <span className="text-xs text-taupe font-mono flex items-center gap-2">
          Built with Next.js <span className="text-honey">✦</span> v2026.06
        </span>
      </div>
    </footer>
  );
}
