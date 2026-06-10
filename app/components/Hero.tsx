"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { useRef } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import Image from "next/image";
import Clouds from "./Clouds";

const floatingStats = [
  { value: "200+", label: "users on TidalTasks", position: "top-2 -left-4 md:-left-16", delay: 1.1, float: "animate-float" },
  { value: "98/100", label: "IB average", position: "top-1/3 -right-2 md:-right-20", delay: 1.3, float: "animate-float-slow" },
  { value: "2", label: "active startups", position: "bottom-8 -left-2 md:-left-12", delay: 1.5, float: "animate-float-slow" },
  { value: "25M+", label: "organic impressions", position: "-bottom-4 right-0 md:-right-10", delay: 1.7, float: "animate-float" },
];

const ease = [0.16, 1, 0.3, 1] as const;
const springCfg = { stiffness: 60, damping: 18, mass: 0.6 };

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

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
      ref={sectionRef}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-32 md:pt-40 pb-24"
    >
      <Clouds variant="hero" />

      {/* Sun glows - deepest parallax layer */}
      <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0 pointer-events-none">
        <div className="sun-glow w-[60vw] h-[60vw] -top-[30vw] left-1/2 -translate-x-1/2" />
        <div className="sun-glow w-[34vw] h-[34vw] top-[16%] -left-[12vw] opacity-70" />
        <div className="sun-glow w-[28vw] h-[28vw] top-[28%] -right-[10vw] opacity-60" />
      </motion.div>

      {/* Drifting glass pills - nearest parallax layer */}
      <motion.div style={{ x: pillsX, y: pillsY }} className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="glass-pill absolute top-[18%] left-[8%] w-28 h-10 opacity-50 animate-float-slow" />
        <div className="glass-pill absolute top-[14%] right-[12%] w-40 h-12 opacity-40 animate-float" />
        <div className="glass-pill absolute bottom-[22%] left-[14%] w-20 h-8 opacity-40 animate-float" />
        <div className="glass-pill absolute top-[46%] right-[6%] w-24 h-9 opacity-30 animate-float-slow" />
      </motion.div>

      <div className="container-padding relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="flex flex-col items-center">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="glass-pill flex items-center gap-2 px-4 py-2 mb-8"
          >
            <MapPin className="w-3.5 h-3.5 text-tangerine" />
            <span className="text-sm font-medium text-cocoa">
              Kitchener, Ontario · IB student & technical founder
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
            className="font-display text-hero text-ink mb-7 max-w-4xl"
          >
            Building the <span className="accent-italic">agentic</span> future,
            one system at a time.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="text-body-lg text-cocoa max-w-2xl mb-10"
          >
            I&apos;m Sai Amartya, co-founder of{" "}
            <span className="font-semibold text-ink">TidalTasks AI</span> and{" "}
            <span className="font-semibold text-ink">Canary OS</span>. I build AI
            systems people actually use, and I ship them fast.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.75 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <a href="#ventures" className="btn btn-sunrise">
              See what I&apos;m building
              <ArrowDown className="w-4 h-4" />
            </a>
            <a href="mailto:saiamartya19@gmail.com" className="btn btn-glass">
              Say hello
            </a>
          </motion.div>
        </motion.div>

        {/* Portrait in liquid glass frame, orbited by stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.9 }}
          style={{ x: portraitX, y: portraitY }}
          className="relative"
        >
          <motion.div style={{ y: portraitScrollY }}>
            <div className="glass-strong rounded-[2.5rem] p-3 animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-[2rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-apricot/60 to-peach/40" />
                <Image
                  src="/Sai_Amartya.png"
                  alt="Sai Amartya"
                  fill
                  className="object-cover relative z-10"
                  priority
                  sizes="(max-width: 768px) 224px, 288px"
                />
              </div>
            </div>

            {floatingStats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: stat.delay }}
                className={`absolute ${stat.position}`}
              >
                <div className={`glass-pill px-4 py-2.5 flex items-baseline gap-2 ${stat.float}`}>
                  <span className="font-display text-lg text-marmalade leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-cocoa whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
