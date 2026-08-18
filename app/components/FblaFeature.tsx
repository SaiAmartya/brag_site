"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionPreference } from "@/app/lib/useReducedMotionPreference";
import { useRef } from "react";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { fbla, type GalleryImage } from "@/app/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The FBLA NLC 2026 feature: an editorial photo spread built from the four
 * original photographs. Everything is static content in the document, so it
 * reads fine without JavaScript, without motion, and to a screen reader.
 */
export default function FblaFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionPreference();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const leadY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="fbla"
      ref={sectionRef}
      className="relative section scroll-mt-28 overflow-clip"
      aria-labelledby="fbla-heading"
    >
      <div className="sun-glow w-[52vw] h-[52vw] top-[2%] -left-[22vw] opacity-80" />
      <div className="sun-glow w-[34vw] h-[34vw] bottom-[4%] -right-[16vw] opacity-65" />
      <div className="cloud cloud-peach animate-drift-c w-[38vw] h-[26vw] top-[8%] -right-[12vw] opacity-60" />

      <div className="container-padding max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start lg:items-center mb-10 md:mb-14">
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="section-label mb-5 inline-flex">{fbla.label}</span>
            <h2
              id="fbla-heading"
              className="font-display text-display text-ink mb-6"
            >
              {fbla.headingLead}{" "}
              <span className="accent-italic">{fbla.headingAccent}</span>
            </h2>
            {fbla.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-body-lg text-cocoa mb-4 max-w-xl last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            className="lg:col-span-6 w-full"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <div className="glass-strong rounded-[2rem] p-6 md:p-7">
              <p className="flex items-center gap-2.5 mb-5">
                <span className="icon-tile !w-9 !h-9 !rounded-xl shrink-0">
                  <Trophy className="w-4 h-4" aria-hidden />
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-marmalade">
                  FBLA Glass Award
                </span>
              </p>
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                {fbla.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-1.5">
                    <dt className="spec-label">{fact.label}</dt>
                    <dd className="spec-value">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>

        {/* Editorial spread: one lead frame, three supporting frames */}
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="m-0"
        >
          <div className="photo-frame rounded-[2rem] p-2.5 md:p-3 mb-5 md:mb-6">
            <div className="relative aspect-[3/2] rounded-[1.5rem] overflow-hidden">
              <motion.div
                style={reduceMotion ? undefined : { y: leadY }}
                className="absolute -inset-y-[6%] inset-x-0"
              >
                <Image
                  src={fbla.gallery.lead.src}
                  alt={fbla.gallery.lead.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 76vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
            <figcaption className="photo-caption">
              {fbla.gallery.lead.caption}
            </figcaption>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {fbla.gallery.supporting.map((photo, index) => (
              <SupportingPhoto key={photo.src} photo={photo} index={index} />
            ))}
          </div>
        </motion.figure>
      </div>
    </section>
  );
}

function SupportingPhoto({
  photo,
  index,
}: {
  photo: GalleryImage;
  index: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease, delay: index * 0.08 }}
      className="photo-frame rounded-[1.75rem] p-2.5 m-0"
    >
      <div className="relative aspect-[3/4] rounded-[1.25rem] overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 92vw, 30vw"
          className="object-cover"
        />
      </div>
      <figcaption className="photo-caption">{photo.caption}</figcaption>
    </motion.figure>
  );
}
