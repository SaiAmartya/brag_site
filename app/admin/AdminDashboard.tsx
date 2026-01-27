"use client";

import { useState } from "react";
import { Tables } from "@/utils/supabase/database.types";
import { motion, AnimatePresence } from "framer-motion";
import VenturesTab from "./components/VenturesTab";
import AchievementsTab from "./components/AchievementsTab";
import ExperiencesTab from "./components/ExperiencesTab";
import ProjectsTab from "./components/ProjectsTab";

interface AdminDashboardProps {
  initialVentures: Tables<"ventures">[];
  initialAchievements: Tables<"achievements">[];
  initialExperiences: Tables<"experiences">[];
  initialProjects: Tables<"projects">[];
}

export default function AdminDashboard({
  initialVentures,
  initialAchievements,
  initialExperiences,
  initialProjects,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"ventures" | "achievements" | "experiences" | "projects">("ventures");

  const tabs = [
    { id: "ventures", label: "Ventures" },
    { id: "achievements", label: "Achievements" },
    { id: "experiences", label: "Experience" },
    { id: "projects", label: "Projects" },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-steel/50 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-mono text-sm tracking-wide rounded-t-md transition-colors relative ${
              activeTab === tab.id
                ? "text-white bg-carbon border-x border-t border-steel/50"
                : "text-ash hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-carbon/30 border border-steel/30 rounded-lg p-6 min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "ventures" && <VenturesTab initialData={initialVentures} />}
            {activeTab === "achievements" && <AchievementsTab initialData={initialAchievements} />}
            {activeTab === "experiences" && <ExperiencesTab initialData={initialExperiences} />}
            {activeTab === "projects" && <ProjectsTab initialData={initialProjects} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
