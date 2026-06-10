"use client";

import SmoothScroll from "./components/SmoothScroll";
import FloatingNav from "./components/FloatingNav";
import { Atmosphere } from "./components/Clouds";
import Hero from "./components/Hero";
import MarqueeBanner from "./components/MarqueeBanner";
import Ventures from "./components/Ventures";
import Achievements from "./components/Achievements";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { Tables } from "@/utils/supabase/database.types";

interface ClientHomeProps {
  ventures: Tables<"ventures">[];
  achievements: Tables<"achievements">[];
  experiences: Tables<"experiences">[];
  projects: Tables<"projects">[];
}

export default function ClientHome({
  ventures,
  achievements,
  experiences,
  projects,
}: ClientHomeProps) {
  return (
    <>
      <FloatingNav />
      <Atmosphere />

      <SmoothScroll>
        <main className="relative">
          <div className="grain" />

          <section id="hero">
            <Hero />
          </section>

          {ventures && ventures.length > 0 && <Ventures data={ventures} />}

          <MarqueeBanner />

          {achievements && achievements.length > 0 && (
            <Achievements data={achievements} />
          )}

          <About />

          {experiences && experiences.length > 0 && (
            <Experience data={experiences} />
          )}

          {projects && projects.length > 0 && <Projects data={projects} />}

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
