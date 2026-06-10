"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import { useRef } from "react";

const marqueeItems = [
  "Agentic AI",
  "High agency",
  "Full-stack ownership",
  "Competitive rigor",
  "Ship fast",
  "Operational excellence",
];

/** Wrap v into [min, max) for a seamless looping track. */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Scroll-velocity-reactive marquee: drifts slowly on its own, then surges
 * (and reverses) with the user's scroll momentum.
 */
export default function MarqueeBanner() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const directionRef = useRef(-1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionRef.current * 2.2 * (delta / 1000);

    const vf = velocityFactor.get();
    if (vf < 0) directionRef.current = 1;
    else if (vf > 0) directionRef.current = -1;

    moveBy += directionRef.current * Math.abs(vf) * (delta / 1000) * 2.2;
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <section className="relative py-10 md:py-14 overflow-hidden">
      <motion.div style={{ x }} className="flex whitespace-nowrap w-max">
        {[...Array(4)].flatMap((_, copy) =>
          marqueeItems.map((item, index) => (
            <span key={`${copy}-${index}`} className="flex items-center">
              <span
                className={`font-display text-3xl md:text-5xl mx-5 md:mx-8 ${
                  index % 2 === 0 ? "accent-italic" : "text-cocoa/40"
                }`}
              >
                {item}
              </span>
              <span className="text-honey text-xl md:text-2xl select-none">✦</span>
            </span>
          ))
        )}
      </motion.div>
    </section>
  );
}
