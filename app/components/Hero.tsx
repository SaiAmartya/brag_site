"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { useReducedMotionPreference } from "@/app/lib/useReducedMotionPreference";
import { Fragment, useRef } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import Image from "next/image";
import Clouds from "./Clouds";
import { hero, profile } from "@/app/content/site";

const springCfg = { stiffness: 60, damping: 18, mass: 0.6 };

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionPreference();

  // ── Mouse parallax: normalized -0.5..0.5, layers move at different depths ──
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const glowX = useSpring(useTransform(mx, (v) => v * -50), springCfg);
  const glowY = useSpring(useTransform(my, (v) => v * -30), springCfg);
  const pillsX = useSpring(useTransform(mx, (v) => v * 36), springCfg);
  const pillsY = useSpring(useTransform(my, (v) => v * 24), springCfg);
  const portraitX = useSpring(useTransform(mx, (v) => v * 14), springCfg);
  const portraitY = useSpring(useTransform(my, (v) => v * 10), springCfg);

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // ── Scroll parallax: headline drifts up slower than the page ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-28 md:pt-32 pb-24"
    >
      <Clouds variant="hero" />

      {/* Sun glows - deepest parallax layer */}
      <motion.div
        style={reduceMotion ? undefined : { x: glowX, y: glowY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="sun-glow w-[60vw] h-[60vw] -top-[30vw] left-1/2 -translate-x-1/2" />
        <div className="sun-glow w-[34vw] h-[34vw] top-[16%] -left-[12vw] opacity-70" />
        <div className="sun-glow w-[28vw] h-[28vw] top-[28%] -right-[10vw] opacity-60" />
      </motion.div>

      {/* Drifting glass pills - nearest parallax layer */}
      <motion.div
        style={reduceMotion ? undefined : { x: pillsX, y: pillsY }}
        className="absolute inset-0 pointer-events-none hidden lg:block"
        aria-hidden
      >
        <div className="glass-pill absolute top-[18%] left-[8%] w-28 h-10 opacity-50 animate-float-slow" />
        <div className="glass-pill absolute top-[14%] right-[12%] w-40 h-12 opacity-40 animate-float" />
        <div className="glass-pill absolute bottom-[22%] left-[14%] w-20 h-8 opacity-40 animate-float" />
        <div className="glass-pill absolute top-[46%] right-[6%] w-24 h-9 opacity-30 animate-float-slow" />
      </motion.div>

      <div className="container-padding relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/*
          Entrance animations here are pure CSS so the headline paints with the
          document rather than waiting on hydration, and stops animating
          entirely under prefers-reduced-motion.
        */}
        <motion.div
          style={reduceMotion ? undefined : { y: textY, opacity: textOpacity }}
          className="flex flex-col items-center"
        >
          <div
            className="reveal glass-pill flex items-center gap-2 px-4 py-2 mb-8"
            style={{ animationDelay: "0.15s" }}
          >
            <MapPin className="w-3.5 h-3.5 text-tangerine shrink-0" aria-hidden />
            <span className="text-sm font-medium text-cocoa">{hero.badge}</span>
          </div>

          <h1
            className="reveal font-display text-hero text-ink mb-7 max-w-4xl"
            style={{ animationDelay: "0.28s" }}
          >
            {hero.headlineLead}{" "}
            <span className="accent-italic">{hero.headlineAccent}</span>{" "}
            {hero.headlineTail}
          </h1>

          <p
            className="reveal text-body-lg text-cocoa max-w-2xl mb-10"
            style={{ animationDelay: "0.4s" }}
          >
            {hero.subhead.map((segment, index) =>
              segment.emphasis ? (
                <span key={index} className="font-semibold text-ink">
                  {segment.text}
                </span>
              ) : (
                <Fragment key={index}>{segment.text}</Fragment>
              )
            )}
          </p>

          <div
            className="reveal flex flex-wrap items-center justify-center gap-4 mb-12"
            style={{ animationDelay: "0.52s" }}
          >
            <a href={hero.primaryCta.href} className="btn btn-sunrise">
              {hero.primaryCta.label}
              <ArrowDown className="w-4 h-4" aria-hidden />
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-glass">
              {hero.secondaryCta.label}
            </a>
          </div>
        </motion.div>

        {/* Portrait in liquid glass frame, orbited by stat pills */}
        <motion.div
          style={
            reduceMotion
              ? { animationDelay: "0.7s" }
              : { x: portraitX, y: portraitY, animationDelay: "0.7s" }
          }
          className="reveal relative"
        >
          <motion.div style={reduceMotion ? undefined : { y: portraitScrollY }}>
            <div
              className="glass-strong rounded-[2.5rem] p-3 animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-[2rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-apricot/60 to-peach/40" />
                <Image
                  src={profile.portrait}
                  alt={hero.portraitAlt}
                  fill
                  className="object-cover relative z-10"
                  priority
                  sizes="(max-width: 768px) 224px, 288px"
                />
              </div>
            </div>

            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className={`reveal-pop absolute ${stat.position}`}
                style={{ animationDelay: stat.delay }}
              >
                <div
                  className={`glass-pill px-4 py-2.5 flex items-baseline gap-2 ${stat.float}`}
                >
                  <span className="font-display text-lg text-marmalade leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-cocoa whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
