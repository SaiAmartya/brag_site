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

  return (
    <ClientHome
      ventures={ventures.data || []}
      achievements={achievements.data || []}
      experiences={experiences.data || []}
      projects={projects.data || []}
    />
  );
}
