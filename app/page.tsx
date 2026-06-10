import { createClient } from "@/utils/supabase/server";
import ClientHome from "./ClientHome";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const supabase = await createClient();

  const [ventures, achievements, experiences, projects] = await Promise.all([
    supabase.from("ventures").select("*").order("sort_order", { ascending: true }),
    supabase.from("achievements").select("*").order("sort_order", { ascending: true }),
    supabase.from("experiences").select("*").order("sort_order", { ascending: true }),
    supabase.from("projects").select("*").order("sort_order", { ascending: true }),
  ]);

  const dbExperiences = experiences.data || [];
  const activeExperiences = dbExperiences.filter((e) => e.active);
  const inactiveExperiences = dbExperiences.filter((e) => !e.active);

  const finalExperiences = [
    ...activeExperiences,
    {
      id: "steam-ic-2026-exp",
      role: "STEAM IC winner",
      organization: "STEAM IC",
      location: "Global",
      period: "Oct 2025 - May 2026",
      type: "program",
      description: "Won 2nd @ STEAM ICAC 2026 in the Computer Sciences category. Built a perceptually guided video compression pipeline achieving 4-6x improvement over H.265 using saliency-aware foreground-background segmentation.",
      skills: ["Computer Vision", "Video Compression", "Python"],
      active: false,
      sort_order: -1,
      created_at: new Date().toISOString(),
    },
    ...inactiveExperiences,
  ];

  const dbAchievements = achievements.data || [];
  const cccIndex = dbAchievements.findIndex((a) => a.title.includes("CCC"));
  const steamAchievement = {
    id: "steam-ic-2026-ach",
    title: "STEAM ICAC",
    subtitle: "2nd Place",
    value: "2026",
    description: "Computer Sciences category",
    category: "Computing",
    icon_name: "Award",
    highlight: true,
    color: "amber",
    sort_order: -1,
    created_at: new Date().toISOString(),
  };

  const finalAchievements = [...dbAchievements];
  if (cccIndex !== -1) {
    finalAchievements.splice(cccIndex, 0, steamAchievement);
  } else {
    finalAchievements.unshift(steamAchievement);
  }

  const finalProjects = [
    {
      id: "steam-ic-2026-proj",
      name: "Saliency-Aware Video Compression",
      tagline: "4-6x compression improvement over H.265",
      description: "A perceptually guided video compression pipeline using foreground-background video segmentation to achieve massive compression for surveillance footage.",
      tech: ["Computer Vision", "Python"],
      status: "Archived",
      award: "2nd Place @ STEAM ICAC 2026",
      url: "https://steaminnovationchallenge.org/",
      github: "https://github.com/SaiAmartya/steam-icac-2026",
      image: "Steam_ic_project.png",
      classified: false,
      sort_order: -1,
      created_at: new Date().toISOString(),
    },
    ...(projects.data || []),
  ];

  return (
    <ClientHome
      ventures={ventures.data || []}
      achievements={finalAchievements}
      experiences={finalExperiences}
      projects={finalProjects}
    />
  );
}
