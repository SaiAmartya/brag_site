"use client";

import { useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import FloatingNav from "./components/FloatingNav";
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
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <CustomCursor />
      <FloatingNav />
      
      <SmoothScroll>
        <main className="relative bg-void">
          {/* Grain Overlay */}
          <div className="grain" />
          
          {/* Hero Section with Parallax */}
          <section id="hero">
            <Hero />
          </section>
          
          {/* Horizontal Scroll Ventures */}
          {ventures && ventures.length > 0 && (
            <Ventures data={ventures} />
          )}
          
          {/* Marquee Banner */}
          <MarqueeBanner />
          
          {/* Achievements - Proof of Work */}
          {achievements && achievements.length > 0 && <Achievements data={achievements} />}
          
          {/* About - Philosophy */}
          <About />
          
          {/* Experience - The Operational Track */}
          {experiences && experiences.length > 0 && <Experience data={experiences} />}
          
          {/* Projects - The Empire */}
          {projects && projects.length > 0 && <Projects data={projects} />}
          
          {/* Footer */}
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
