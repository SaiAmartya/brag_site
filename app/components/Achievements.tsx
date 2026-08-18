"use client";

import { motion, animate, useInView } from "framer-motion";
import { useReducedMotionPreference } from "@/app/lib/useReducedMotionPreference";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { achievements, counters, type AchievementLine } from "@/app/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Achievements() {
  // Group by category, preserving the order categories first appear
  const groups: { category: string; items: AchievementLine[] }[] = [];
  for (const item of achievements) {
    const group = groups.find((g) => g.category === item.category);
    if (group) group.items.push(item);
    else groups.push({ category: item.category, items: [item] });
  }

  return (
    <section
      id="achievements"
      className="relative section scroll-mt-28 overflow-hidden"
      aria-labelledby="achievements-heading"
    >
      <div className="sun-glow w-[46vw] h-[46vw] top-[8%] -left-[20vw] opacity-75" />
      <div className="sun-glow w-[32vw] h-[32vw] bottom-[10%] -right-[14vw] opacity-65" />
      <div className="cloud cloud-lilac animate-drift-b w-[34vw] h-[24vw] top-[5%] -right-[10vw] opacity-55" />
      <div className="cloud cloud-rose animate-drift-c w-[28vw] h-[20vw] bottom-[20%] -left-[8vw] opacity-50" />

      <div className="container-padding max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: sticky header + animated counters */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <span className="section-label mb-5 inline-flex">Proof of work</span>
              <h2
                id="achievements-heading"
                className="font-display text-display text-ink mb-5"
              >
                The receipts, <span className="accent-italic">in writing.</span>
              </h2>
              <p className="text-body-lg text-cocoa mb-10 max-w-md">
                Every line item earned, none of it inherited. Keep the paper.
                You&apos;ll want it later.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-8">
              {counters.map((counter, index) => (
                <motion.div
                  key={counter.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: index * 0.08 }}
                >
                  <span className="font-display text-4xl md:text-5xl text-tangerine block leading-none mb-2">
                    <CountUp
                      to={counter.to}
                      prefix={counter.prefix}
                      suffix={counter.suffix}
                    />
                  </span>
                  <span className="text-sm font-medium text-cocoa">
                    {counter.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: the receipt */}
          <motion.div
            initial={{ opacity: 0, y: 64, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            whileHover={{ rotate: 0, scale: 1.01 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-7 max-w-xl mx-auto w-full lg:mx-0 cursor-default"
          >
            <div className="receipt rounded-t-2xl px-7 py-8 md:px-10 md:py-10 text-[0.8rem] md:text-sm leading-relaxed">
              {/* Header */}
              <div className="text-center mb-6">
                <p
                  className="font-display not-italic text-2xl md:text-3xl text-ink mb-1 tracking-tight"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  SAI AMARTYA B.L.
                </p>
                <p className="uppercase tracking-[0.25em] text-[0.65rem] text-cocoa">
                  Proof-of-work receipt
                </p>
                <p className="text-[0.65rem] text-taupe mt-2">
                  KITCHENER, ON ✦ NO REFUNDS ON EFFORT
                </p>
              </div>

              <hr className="receipt-rule mb-5" />

              {/* Line items, grouped by category */}
              {groups.map((group) => (
                <div key={group.category} className="mb-5">
                  <p className="uppercase tracking-[0.2em] text-[0.65rem] text-marmalade mb-2.5">
                    ** {group.category} **
                  </p>
                  {group.items.map((item) => (
                    <div key={item.id} className="mb-2.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-ink font-medium shrink min-w-0">
                          {item.title}
                        </span>
                        <span className="receipt-dots" />
                        <span className="text-tangerine font-medium whitespace-nowrap">
                          {item.value}
                        </span>
                      </div>
                      <p className="text-[0.68rem] text-taupe uppercase tracking-wide">
                        {item.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              ))}

              <hr className="receipt-rule my-5" />

              {/* Totals */}
              <div className="space-y-1.5 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-cocoa">SUBTOTAL</span>
                  <span className="receipt-dots" />
                  <span className="text-ink">EXCELLENCE</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-cocoa">SLEEP</span>
                  <span className="receipt-dots" />
                  <span className="text-taupe">NOT FOUND</span>
                </div>
                <div className="flex items-baseline gap-2 text-base md:text-lg">
                  <span className="text-ink font-medium">TOTAL</span>
                  <span className="receipt-dots" />
                  <span className="text-tangerine font-medium">PRICELESS</span>
                </div>
              </div>

              {/* Barcode */}
              <div className="barcode w-3/4 mx-auto mb-3 opacity-80" aria-hidden />
              <p className="text-center text-[0.65rem] tracking-[0.3em] text-taupe">
                *** THANK YOU FOR SCROLLING ***
              </p>
            </div>
            <div className="receipt-tear" aria-hidden />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** useLayoutEffect on the client, useEffect on the server (no SSR warning). */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Renders the final value during SSR so the number is correct without
 * JavaScript, and holds it through hydration. It rewinds to zero only once
 * matchMedia has explicitly reported no-preference; the count itself then runs
 * when the section scrolls into view.
 *
 * Under `prefers-reduced-motion` there is no rewind at all: the final value
 * never leaves the screen. Keying the rewind on the preference also means a
 * counter cannot be stranded on zero if that preference resolves or changes
 * after a render.
 *
 * The number that animates is decorative, so assistive technology is given the
 * settled value once rather than a stream of intermediate ones.
 */
function CountUp({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotionPreference();
  const [display, setDisplay] = useState(to);
  const finalValue = `${prefix}${to}${suffix}`;

  useIsomorphicLayoutEffect(() => {
    setDisplay(reduceMotion ? to : 0);
  }, [reduceMotion, to]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduceMotion]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="sr-only">{finalValue}</span>
    </span>
  );
}
