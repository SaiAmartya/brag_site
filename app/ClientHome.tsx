"use client";

import { MotionConfig } from "framer-motion";
import SmoothScroll from "./components/SmoothScroll";
import FloatingNav from "./components/FloatingNav";
import { Atmosphere } from "./components/Clouds";
import Hero from "./components/Hero";
import MarqueeBanner from "./components/MarqueeBanner";
import CurrentWork from "./components/CurrentWork";
import FblaFeature from "./components/FblaFeature";
import Achievements from "./components/Achievements";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function ClientHome() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <FloatingNav />
      <Atmosphere />

      <SmoothScroll>
        <main id="main" className="relative">
          <div className="grain" />

          <Hero />
          <CurrentWork />
          <MarqueeBanner />
          <FblaFeature />
          <Achievements />
          <About />
          <Experience />
          <Projects />
          <Footer />
        </main>
      </SmoothScroll>
    </MotionConfig>
  );
}
