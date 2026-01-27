"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/utils/supabase/database.types";
import { Plus, Pencil, Trash2, X, Save, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

type Project = Tables<"projects">;
type ProjectInsert = TablesInsert<"projects">;
type ProjectUpdate = TablesUpdate<"projects">;

export default function ProjectsTab({ initialData }: { initialData: Project[] }) {
  const [data, setData] = useState<Project[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleEdit = (item: Project) => {
    setFormData(item);
    setEditingId(item.id);
    setIsModalOpen(true);
    setError(null);
  };

  const handleAdd = () => {
    setFormData({
      name: "",
      tagline: "",
      description: "",
      tech: [],
      status: "Shipped",
      award: "",
      url: "",
      github: "",
      image: "",
      classified: false,
    });
    setEditingId(null);
    setIsModalOpen(true);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      if (editingId) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sort_order, created_at, id, ...rest } = formData;
        const updateData: ProjectUpdate = rest;
        const { data: updated, error } = await supabase
          .from("projects")
          .update(updateData)
          .eq("id", editingId)
          .select()
          .single();

        if (error) throw error;
        setData(data.map((item) => (item.id === editingId ? updated : item)));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sort_order, created_at, id, ...rest } = formData;
        const insertData = rest as ProjectInsert;
        const { data: created, error } = await supabase
          .from("projects")
          .insert(insertData)
          .select()
          .single();

        if (error) throw error;
        setData([...data, created]);
      }
      setIsModalOpen(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display text-bone">Manage Projects</h2>
        <button onClick={handleAdd} className="btn btn-primary text-xs py-2 px-4">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="grid gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-void border border-steel/40 p-4 rounded-lg flex justify-between items-center group hover:border-steel transition-colors"
          >
             <div className="flex gap-4 items-center">
              {item.image && (
                <Image
                  src={normalizeImageSrc(item.image)}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-cover rounded bg-steel/20"
                  unoptimized
                />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-bone font-bold">{item.name}</h3>
                  {item.classified && <span className="text-[10px] bg-white/10 text-white px-1.5 py-0.5 rounded border border-white/20">CLASSIFIED</span>}
                </div>
                <p className="text-ash text-xs font-mono">{item.tagline}</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(item)}
                className="p-2 hover:bg-white/10 rounded text-electric transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 hover:bg-white/10 rounded text-coral transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-modal bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-carbon border border-steel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
          >
            <div className="sticky top-0 bg-carbon border-b border-steel p-4 flex justify-between items-center z-10">
              <h3 className="text-lg font-display text-bone">
                {editingId ? "Edit Project" : "New Project"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-ash hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {error && (
                <div className="bg-coral/10 border border-coral/20 text-coral p-3 rounded flex gap-2 items-center text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-ash uppercase">Name</label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-ash uppercase">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline || ""}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-ash uppercase">Description</label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <label className="text-xs font-mono text-ash uppercase">Status</label>
                  <input
                    type="text"
                    value={formData.status || ""}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                    placeholder="Shipped, In Development, etc."
                  />
                </div>
                 <div className="space-y-2">
                  <label className="text-xs font-mono text-ash uppercase">Award</label>
                  <input
                    type="text"
                    value={formData.award || ""}
                    onChange={(e) => setFormData({ ...formData, award: e.target.value })}
                    className="w-full bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-ash uppercase">Project URL</label>
                  <input
                    type="text"
                    value={formData.url || ""}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-ash uppercase">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.github || ""}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-ash uppercase">Image URL</label>
                <input
                  type="text"
                  value={formData.image || ""}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-ash uppercase">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={(formData.tech || []).join(", ")}
                  onChange={(e) => setFormData({ ...formData, tech: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                  className="w-full bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                  placeholder="Next.js, Tailwind, Supabase"
                />
              </div>

              <div className="space-y-2 flex items-center gap-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.classified || false}
                      onChange={(e) => setFormData({ ...formData, classified: e.target.checked })}
                      className="w-4 h-4 bg-void border-steel rounded accent-electric"
                    />
                    <span className="text-sm font-mono text-bone">Classified?</span>
                  </label>
              </div>

            </div>

            <div className="p-4 border-t border-steel flex justify-end gap-2 bg-carbon/50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-ghost px-4"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? <span className="animate-spin mr-2">⟳</span> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function normalizeImageSrc(src: string) {
  if (!src) return "/tech_portfolio_hero_abstract_3d_index_0@4096x2286.jpeg";
  if (src.includes("canary_os_on_device_protection_visualization")) {
    return "/canary_os_on_device_protection.jpeg";
  }
  if (src.startsWith("http") || src.startsWith("data:") || src.startsWith("/")) {
    return src;
  }
  return `/${src}`;
}
