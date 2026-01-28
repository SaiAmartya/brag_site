"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "@/utils/supabase/database.types";
import { Plus, Pencil, Trash2, X, Save, AlertCircle, GripVertical } from "lucide-react";
import { motion, Reorder } from "framer-motion";

type Achievement = Tables<"achievements">;
type AchievementInsert = TablesInsert<"achievements">;
type AchievementUpdate = TablesUpdate<"achievements">;

export default function AchievementsTab({ initialData }: { initialData: Achievement[] }) {
  const [data, setData] = useState<Achievement[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Achievement>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasOrderChanged, setHasOrderChanged] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const supabase = createClient();

  const handleReorder = (newOrder: Achievement[]) => {
    setData(newOrder);
    setHasOrderChanged(true);
  };

  const saveOrder = async () => {
    setIsSavingOrder(true);
    setError(null);
    try {
      const updates = data.map((item, index) => ({
        id: item.id,
        sort_order: index,
      }));

      await Promise.all(
        updates.map((update) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          supabase.from("achievements").update({ sort_order: update.sort_order } as any).eq("id", update.id)
        )
      );
      setHasOrderChanged(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error saving order";
      setError(message);
    } finally {
      setIsSavingOrder(false);
    }
  };

  const handleEdit = (item: Achievement) => {
    setFormData(item);
    setEditingId(item.id);
    setIsModalOpen(true);
    setError(null);
  };

  const handleAdd = () => {
    setFormData({
      title: "",
      subtitle: "",
      value: "",
      description: "",
      category: "",
      icon_name: "Trophy",
      highlight: false,
      color: "#00FF88",
    });
    setEditingId(null);
    setIsModalOpen(true);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;

    const { error } = await supabase.from("achievements").delete().eq("id", id);
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
        const updateData: AchievementUpdate = rest;
        const { data: updated, error } = await supabase
          .from("achievements")
          .update(updateData)
          .eq("id", editingId)
          .select()
          .single();

        if (error) throw error;
        setData(data.map((item) => (item.id === editingId ? updated : item)));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sort_order, created_at, id, ...rest } = formData;
        const insertData = rest as AchievementInsert;
        const { data: created, error } = await supabase
          .from("achievements")
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
        <h2 className="text-xl font-display text-bone">Manage Achievements</h2>
        <div className="flex gap-2">
          {hasOrderChanged && (
            <button
              onClick={saveOrder}
              disabled={isSavingOrder}
              className="btn bg-electric/10 text-electric border border-electric/20 hover:bg-electric/20 text-xs py-2 px-4 transition-colors flex items-center"
            >
              {isSavingOrder ? (
                <span className="animate-spin mr-2">⟳</span>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Order
            </button>
          )}
          <button onClick={handleAdd} className="btn btn-primary text-xs py-2 px-4">
            <Plus className="w-4 h-4" /> Add Achievement
          </button>
        </div>
      </div>

      <Reorder.Group axis="y" values={data} onReorder={handleReorder} className="space-y-4">
        {data.map((item) => (
          <Reorder.Item
            key={item.id}
            value={item}
            className="bg-void border border-steel/40 p-4 rounded-lg flex justify-between items-center group hover:border-steel transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="cursor-grab active:cursor-grabbing text-ash/30 hover:text-ash/60 transition-colors">
                <GripVertical className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-bone font-bold">{item.title}</h3>
                  {item.highlight && (
                    <span className="text-[10px] bg-electric/20 text-electric px-1.5 py-0.5 rounded border border-electric/30">
                      HIGHLIGHT
                    </span>
                  )}
                </div>
                <p className="text-ash text-xs font-mono">
                  {item.category} • {item.value}
                </p>
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
          </Reorder.Item>
        ))}
      </Reorder.Group>

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
                {editingId ? "Edit Achievement" : "New Achievement"}
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
                  <label className="text-xs font-mono text-ash uppercase">Title</label>
                  <input
                    type="text"
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-ash uppercase">Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle || ""}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-ash uppercase">Value</label>
                  <input
                    type="text"
                    value={formData.value || ""}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-ash uppercase">Category</label>
                  <input
                    type="text"
                    value={formData.category || ""}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-ash uppercase">Icon Name</label>
                  <input
                    type="text"
                    value={formData.icon_name || ""}
                    onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                    className="w-full bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                    placeholder="e.g. Trophy"
                  />
                </div>
                 <div className="space-y-2">
                  <label className="text-xs font-mono text-ash uppercase">Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.color || "#ffffff"}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="h-10 w-10 bg-void border border-steel rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.color || ""}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="flex-1 bg-void border border-steel rounded p-2 text-bone focus:border-electric outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2 flex items-end pb-2">
                   <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.highlight || false}
                        onChange={(e) => setFormData({ ...formData, highlight: e.target.checked })}
                        className="w-4 h-4 bg-void border-steel rounded accent-electric"
                      />
                      <span className="text-sm font-mono text-bone">Highlight?</span>
                   </label>
                </div>
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
