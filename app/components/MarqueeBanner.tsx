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
import { useReducedMotionPreference } from "@/app/lib/useReducedMotionPreference";
import { useRef } from "react";
import { marqueeItems } from "@/app/content/site";

/** Wrap v into [min, max) for a seamless looping track. */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Scroll-velocity-reactive marquee: drifts slowly on its own, then surges
 * (and reverses) with the user's scroll momentum.
 *
 * The static track is what the server renders and what hydration commits, so
 * the words are held still until matchMedia has explicitly said motion is
 * allowed. Only then is the animated track mounted, so a reduced-motion user
 * never runs the frame loop and never has a transform written at all. Both
 * tracks render the same words in the same type.
 */
export default function MarqueeBanner() {
  // Reads "reduce" on the server and through hydration, so this is true only
  // once a client snapshot has explicitly reported no-preference.
  const motionAllowed = !useReducedMotionPreference();

  return (
    <section className="relative py-10 md:py-14 overflow-hidden" aria-hidden>
      {motionAllowed ? (
        <DriftingTrack />
      ) : (
        <div className="flex whitespace-nowrap w-max">
          <MarqueeWords />
        </div>
      )}
    </section>
  );
}

function DriftingTrack() {
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
    <motion.div style={{ x }} className="flex whitespace-nowrap w-max">
      <MarqueeWords />
    </motion.div>
  );
}

/** Four copies of the word list, so the track is wider than any viewport. */
function MarqueeWords() {
  return (
    <>
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
    </>
  );
}
