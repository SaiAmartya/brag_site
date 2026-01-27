import { createClient } from "@/utils/supabase/server";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const supabase = await createClient();

  const [ventures, achievements, experiences, projects] = await Promise.all([
    supabase.from("ventures").select("*").order("sort_order", { ascending: true }),
    supabase.from("achievements").select("*").order("sort_order", { ascending: true }),
    supabase.from("experiences").select("*").order("sort_order", { ascending: true }),
    supabase.from("projects").select("*").order("sort_order", { ascending: true }),
  ]);

  return (
    <AdminDashboard
      initialVentures={ventures.data || []}
      initialAchievements={achievements.data || []}
      initialExperiences={experiences.data || []}
      initialProjects={projects.data || []}
    />
  );
}
