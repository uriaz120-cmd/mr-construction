"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, CheckCircle2, Save, X, Loader2, Tag } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { GalleryItemType } from "@/lib/types";

export function GalleryManagerClient({ initialItems }: { initialItems: GalleryItemType[] }) {
  const [items, setItems] = useState<GalleryItemType[]>(initialItems);
  const [editingItem, setEditingItem] = useState<Partial<GalleryItemType>>({
    title: "",
    caption: "",
    altText: "",
    category: "Highway Projects",
    imageUrl: "",
    order: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleStartCreate = () => {
    setEditingItem({
      title: "",
      caption: "",
      altText: "",
      category: "Highway Projects",
      imageUrl: "",
      order: items.length + 1,
    });
    setIsCreating(true);
    setIsModalOpen(true);
    setError("");
  };

  const handleStartEdit = (item: GalleryItemType) => {
    setEditingItem(item);
    setIsCreating(false);
    setIsModalOpen(true);
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.imageUrl || !editingItem.title) {
      setError("Title and Image are required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const url = isCreating ? "/api/gallery" : `/api/gallery/${editingItem.id}`;
      const method = isCreating ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save photo");

      if (isCreating) {
        setItems([...items, data.item]);
        setSuccess("Photo added to gallery successfully!");
      } else {
        setItems(items.map((i) => (i.id === data.item.id ? data.item : i)));
        setSuccess("Photo updated successfully!");
      }

      setTimeout(() => setSuccess(""), 4000);
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to save photo");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}" from gallery?`)) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");

      setItems(items.filter((i) => i.id !== id));
      setSuccess("Photo removed from gallery");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      alert(err.message || "Error deleting photo");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">
            Site Photographs & Media Gallery
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Upload machinery, highway corridor, and site operations photos with category tagging.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Photograph</span>
        </button>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between group shadow-sm"
          >
            <div className="relative aspect-[16/10] bg-slate-900">
              <Image src={item.imageUrl} alt={item.altText || item.title} fill className="object-cover" />
              <div className="absolute top-2 left-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900/90 text-orange-400 border border-slate-700 flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5" />
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="font-bold text-white text-xs truncate">{item.title}</h3>
                {item.caption && <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{item.caption}</p>}
              </div>

              <div className="pt-3 border-t border-slate-850 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleStartEdit(item)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900 text-red-400 hover:text-red-200 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950 rounded-t-2xl">
              <h3 className="font-bold text-base text-white font-heading">
                {isCreating ? "Upload Site Photograph" : "Edit Photo Metadata"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <ImageUploader
                label="Site Photo *"
                value={editingItem.imageUrl || ""}
                onChange={(url) => setEditingItem({ ...editingItem, imageUrl: url })}
              />

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Photo Title <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. N-25 Highway Earthworks & Alignment"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Category Tag
                </label>
                <select
                  value={editingItem.category || "Highway Projects"}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Highway Projects">Highway Projects</option>
                  <option value="Road Construction">Road Construction</option>
                  <option value="Machinery">Machinery & Plant</option>
                  <option value="Building Construction">Building Construction</option>
                  <option value="Site Work">Site Work</option>
                  <option value="Completed Projects">Completed Projects</option>
                  <option value="Team">Team & Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  value={editingItem.caption || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  placeholder="Brief description of machinery or operation depicted..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  SEO Alt Text
                </label>
                <input
                  type="text"
                  value={editingItem.altText || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, altText: e.target.value })}
                  placeholder="Descriptive text for Google Image search indexing"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold flex items-center gap-1.5 shadow"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Photo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
