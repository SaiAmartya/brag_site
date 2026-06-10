"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Rocket, Trophy, Bot, Sparkles, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Clouds from "./Clouds";

/**
 * Dayflow-style scroll-driven word reveal: the section pins while each word
 * ignites from faint to full ink, with liquid-glass icon chips embedded
 * mid-sentence.
 */

type Token =
  | { word: string; accent?: boolean }
  | { chip: { icon: LucideIcon; label?: string; tint: string } };

const tokens: Token[] = [
  { word: "Anyone" },
  { word: "can" },
  { word: "start" },
  { word: "things." },
  { word: "I" },
  { chip: { icon: Rocket, label: "ship", tint: "text-tangerine" } },
  { word: "them." },
  { word: "From" },
  { chip: { icon: Trophy, label: "competitive math", tint: "text-marmalade" } },
  { word: "to" },
  { chip: { icon: Bot, label: "agentic AI", tint: "text-sunset" } },
  { word: "every" },
  { word: "build" },
  { word: "is" },
  { word: "a" },
  { word: "pursuit" },
  { word: "of" },
  { chip: { icon: Zap, label: "high agency", tint: "text-tangerine" } },
  { word: "owning" },
  { word: "the" },
  { word: "problem" },
  { word: "end" },
  { word: "to" },
  { word: "end," },
  { word: "working" },
  { word: "smarter" },
  { chip: { icon: Sparkles, tint: "text-honey" } },
  { word: "and", accent: true },
  { word: "harder.", accent: true },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="about" ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <Clouds variant="soft" />
        <div className="sun-glow w-[50vw] h-[50vw] -bottom-[25vw] left-1/2 -translate-x-1/2" />

        <div className="container-padding max-w-4xl mx-auto text-center relative z-10 pt-20 md:pt-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-label mb-10 inline-flex"
          >
            The philosophy
          </motion.span>

          <p className="font-display text-[clamp(1.9rem,4.5vw,3.5rem)] text-ink leading-[1.3]">
            {tokens.map((token, i) => (
              <Tok
                key={i}
                token={token}
                progress={scrollYProgress}
                range={tokenRange(i, tokens.length)}
              />
            ))}
          </p>

          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.82, 0.95], [0, 1]) }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <div className="w-12 h-px bg-apricot" />
            <span className="text-honey">✦</span>
            <div className="w-12 h-px bg-apricot" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function tokenRange(i: number, total: number): [number, number] {
  const start = 0.08 + (i / total) * 0.72;
  return [start, start + 1.4 / total];
}

function Tok({
  token,
  progress,
  range,
}: {
  token: Token;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  const y = useTransform(progress, range, [10, 0]);
  const scale = useTransform(progress, range, [0.94, 1]);

  if ("chip" in token) {
    const Icon = token.chip.icon;
    return (
      <motion.span
        style={{ opacity, y, scale }}
        className="glass-pill inline-flex items-center gap-2 align-middle mx-1.5 px-3.5 py-1.5 md:px-4 md:py-2 -translate-y-1"
      >
        <Icon className={`w-[0.8em] h-[0.8em] ${token.chip.tint}`} />
        {token.chip.label && (
          <span className="font-body font-semibold text-cocoa text-[0.45em] uppercase tracking-wide leading-none whitespace-nowrap">
            {token.chip.label}
          </span>
        )}
      </motion.span>
    );
  }

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.28em] ${
        token.accent ? "accent-italic" : ""
      }`}
    >
      {token.word}
    </motion.span>
  );
}
