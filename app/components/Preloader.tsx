"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99999] bg-void flex items-center justify-center"
        >
          <div className="text-center">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="font-display text-4xl md:text-6xl text-bone">
                SAI AMARTYA
              </span>
            </motion.div>

            {/* Loading Bar */}
            <div className="w-64 h-px bg-steel mx-auto mb-4">
              <motion.div
                className="h-full bg-electric"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-mono text-xs text-ash"
            >
              INITIALIZING SYSTEMS — {Math.min(Math.round(progress), 100)}%
            </motion.div>
          </div>

          {/* Corner Elements */}
          <div className="absolute top-8 left-8 corner-accent top-left" />
          <div className="absolute bottom-8 right-8 corner-accent bottom-right" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
