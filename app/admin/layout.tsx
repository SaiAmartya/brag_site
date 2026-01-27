import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if user is an authorized admin
  const { data: adminData, error } = await supabase
    .from("authorized_admins")
    .select("email")
    .eq("email", user.email!)
    .single();

  if (error || !adminData) {
    // User is logged in but not an admin
    return (
      <div className="min-h-screen bg-void flex items-center justify-center text-bone">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-ash mb-6">You are not authorized to view this page.</p>
          <form action="/auth/signout" method="post">
             <button className="btn btn-outline">Sign Out</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void flex flex-col">
      <header className="border-b border-steel bg-carbon/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container-wide py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <span className="font-display text-lg text-bone">Admin Dashboard</span>
             <span className="text-xs font-mono text-ash px-2 py-1 border border-steel rounded bg-void/50">
               {user.email}
             </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-sm font-mono text-ash hover:text-white transition-colors">
              View Site
            </a>
            <form action="/auth/signout" method="post">
               <button className="text-sm font-mono text-coral hover:text-red-400 transition-colors">Sign Out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 container-wide py-8">
        {children}
      </main>
    </div>
  );
}
