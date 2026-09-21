"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Save,
  X,
  Loader2,
  AlertCircle,
  ExternalLink,
  Wrench
} from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { DynamicIcon } from "@/lib/icons";
import { ServiceItem } from "@/lib/types";

export function ServicesManagerClient({ initialServices }: { initialServices: ServiceItem[] }) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [featuresText, setFeaturesText] = useState("");
  const [equipmentText, setEquipmentText] = useState("");

  const handleStartCreate = () => {
    setEditingService({
      title: "",
      slug: "",
      icon: "Hammer",
      shortDescription: "",
      fullDescription: "",
      featuredImage: "",
      order: 0,
      isFeatured: true,
      isActive: true,
      metaTitle: "",
      metaDescription: "",
    });
    setFeaturesText("");
    setEquipmentText("");
    setIsCreating(true);
    setError("");
  };

  const handleStartEdit = (srv: ServiceItem) => {
    setEditingService(srv);
    setIsCreating(false);
    setError("");

    if (srv.featuresListJson) {
      try {
        const arr = JSON.parse(srv.featuresListJson);
        setFeaturesText(Array.isArray(arr) ? arr.join("\n") : "");
      } catch (e) {
        setFeaturesText("");
      }
    } else {
      setFeaturesText("");
    }

    if (srv.equipmentJson) {
      try {
        const arr = JSON.parse(srv.equipmentJson);
        setEquipmentText(Array.isArray(arr) ? arr.join("\n") : "");
      } catch (e) {
        setEquipmentText("");
      }
    } else {
      setEquipmentText("");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setSaving(true);
    setError("");

    try {
      const featuresArray = featuresText.split("\n").map((s) => s.trim()).filter(Boolean);
      const equipmentArray = equipmentText.split("\n").map((s) => s.trim()).filter(Boolean);

      const payload = {
        ...editingService,
        featuresListJson: JSON.stringify(featuresArray),
        equipmentJson: JSON.stringify(equipmentArray),
      };

      const url = isCreating ? "/api/services" : `/api/services/${editingService.id}`;
      const method = isCreating ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save service");

      if (isCreating) {
        setServices([...services, data.service]);
        setSuccess("Service created successfully!");
      } else {
        setServices(services.map((s) => (s.id === data.service.id ? data.service : s)));
        setSuccess("Service updated successfully!");
      }

      setTimeout(() => setSuccess(""), 4000);
      setEditingService(null);
    } catch (err: any) {
      setError(err.message || "Failed to process service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");

      setServices(services.filter((s) => s.id !== id));
      setSuccess("Service deleted successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      alert(err.message || "Error deleting service");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">
            Civil Engineering & Construction Services
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage the 10 core construction disciplines, specifications, machinery, and SEO tags.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center shrink-0">
                    <DynamicIcon name={srv.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{srv.title}</h3>
                    <span className="text-[10px] text-slate-500 font-mono">/services/{srv.slug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStartEdit(srv)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(srv.id, srv.title)}
                    className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900 text-red-400 hover:text-red-200 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {srv.shortDescription}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-850 flex items-center justify-between text-xs">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${srv.isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"}`}>
                {srv.isActive ? "Published" : "Draft"}
              </span>
              <a
                href={`/services/${srv.slug}`}
                target="_blank"
                className="text-orange-400 hover:underline flex items-center gap-1"
              >
                <span>View Live Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl my-8">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950 rounded-t-2xl">
              <h3 className="font-bold text-lg text-white font-heading">
                {isCreating ? "Add New Service" : `Edit: ${editingService.title}`}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Service Title <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title || ""}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Lucide Icon Name
                  </label>
                  <input
                    type="text"
                    value={editingService.icon || "Route"}
                    onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    placeholder="Route, Milestone, HardHat, Tractor, Flame..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Short Description (Cards) <span className="text-orange-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingService.shortDescription || ""}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Full Description & Methodology <span className="text-orange-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={editingService.fullDescription || ""}
                  onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Features / Highlights (One per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Heavy Equipment Deployed (One per line)
                </label>
                <textarea
                  rows={3}
                  value={equipmentText}
                  onChange={(e) => setEquipmentText(e.target.value)}
                  placeholder="CAT Motor Graders&#10;Asphalt Pavers"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500 font-mono text-[11px]"
                />
              </div>

              <ImageUploader
                label="Service Header / Showcase Image"
                value={editingService.featuredImage || ""}
                onChange={(url) => setEditingService({ ...editingService, featuredImage: url })}
              />

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
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
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
