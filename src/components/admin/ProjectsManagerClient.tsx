"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Building2,
  MapPin,
  Save,
  X,
  Loader2,
  AlertCircle,
  ExternalLink,
  Layers
} from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { ProjectItem } from "@/lib/types";

export function ProjectsManagerClient({ initialProjects }: { initialProjects: ProjectItem[] }) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Scope list text & Specs string state for easy editing in modal
  const [scopeText, setScopeText] = useState("");
  const [specsText, setSpecsText] = useState("");
  const [galleryImages, setGalleryImages] = useState<{ imageUrl: string; caption?: string; altText?: string }[]>([]);

  const handleStartCreate = () => {
    setEditingProject({
      title: "",
      slug: "",
      category: "Highway & Road Works",
      clientOrPartner: "",
      partnerRole: "Contractor / Work Partner",
      location: "Karachi, Pakistan",
      status: "Ongoing",
      isFeatured: true,
      isCurrentProject: false,
      startDate: "",
      completionDate: "",
      shortDescription: "",
      fullDescription: "",
      featuredImage: "",
      metaTitle: "",
      metaDescription: "",
      order: 0,
    });
    setScopeText("");
    setSpecsText("");
    setGalleryImages([]);
    setIsCreating(true);
    setError("");
  };

  const handleStartEdit = (proj: ProjectItem) => {
    setEditingProject(proj);
    setIsCreating(false);
    setError("");

    // Parse scope list
    if (proj.scopeListJson) {
      try {
        const arr = JSON.parse(proj.scopeListJson);
        setScopeText(Array.isArray(arr) ? arr.join("\n") : "");
      } catch (e) {
        setScopeText("");
      }
    } else {
      setScopeText("");
    }

    // Parse specs object
    if (proj.specsJson) {
      try {
        const obj = JSON.parse(proj.specsJson);
        setSpecsText(JSON.stringify(obj, null, 2));
      } catch (e) {
        setSpecsText("");
      }
    } else {
      setSpecsText("");
    }

    // Project images
    if (proj.images) {
      setGalleryImages(proj.images.map((img) => ({
        imageUrl: img.imageUrl,
        caption: img.caption || "",
        altText: img.altText || "",
      })));
    } else {
      setGalleryImages([]);
    }
  };

  const handleCloseModal = () => {
    setEditingProject(null);
    setIsCreating(false);
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setSaving(true);
    setError("");

    try {
      // Prepare scope array
      const scopeArray = scopeText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      // Prepare specs object
      let specsParsed = {};
      if (specsText.trim()) {
        try {
          specsParsed = JSON.parse(specsText);
        } catch (e) {
          throw new Error("Specifications must be valid JSON format (e.g. {\"Client\": \"FWO\"})");
        }
      }

      const payload = {
        ...editingProject,
        scopeListJson: JSON.stringify(scopeArray),
        specsJson: JSON.stringify(specsParsed),
        images: galleryImages,
      };

      const url = isCreating ? "/api/projects" : `/api/projects/${editingProject.id}`;
      const method = isCreating ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save project");

      if (isCreating) {
        setProjects([data.project, ...projects]);
        setSuccess("Project created successfully!");
      } else {
        setProjects(projects.map((p) => (p.id === data.project.id ? data.project : p)));
        setSuccess("Project updated successfully!");
      }

      setTimeout(() => setSuccess(""), 4000);
      handleCloseModal();
    } catch (err: any) {
      setError(err.message || "Failed to process project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");

      setProjects(projects.filter((p) => p.id !== id));
      setSuccess("Project deleted successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      alert(err.message || "Error deleting project");
    }
  };

  const handleAddGalleryImage = () => {
    setGalleryImages([...galleryImages, { imageUrl: "", caption: "", altText: "" }]);
  };

  const handleUpdateGalleryImage = (index: number, field: string, val: string) => {
    const next = [...galleryImages];
    next[index] = { ...next[index], [field]: val };
    setGalleryImages(next);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">
            Project Portfolio Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Add, edit, remove projects, manage FWO/NLC/DHA partnerships, and update project photo albums.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Projects Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      proj.status.toLowerCase() === "ongoing"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {proj.status}
                  </span>
                  {proj.isCurrentProject && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-600 text-white">
                      Current Project Spotlight
                    </span>
                  )}
                  {proj.isFeatured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStartEdit(proj)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit Project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id, proj.title)}
                    className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900 text-red-400 hover:text-red-200 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                  <Image
                    src={proj.featuredImage || "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=400&q=80"}
                    alt={proj.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-white text-sm truncate">{proj.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                    <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                    <span className="truncate">{proj.location}</span>
                  </div>
                  {proj.clientOrPartner && (
                    <div className="flex items-center gap-1.5 text-[11px] text-orange-400 font-semibold mt-0.5">
                      <Building2 className="w-3 h-3 shrink-0" />
                      <span className="truncate">{proj.clientOrPartner}</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {proj.shortDescription}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-850 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono text-[10px]">/projects/{proj.slug}</span>
              <a
                href={`/projects/${proj.slug}`}
                target="_blank"
                className="text-orange-400 hover:underline flex items-center gap-1"
              >
                <span>View Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl my-8">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950 rounded-t-2xl">
              <div>
                <h3 className="font-bold text-lg text-white font-heading">
                  {isCreating ? "Add New Project" : `Edit: ${editingProject.title}`}
                </h3>
                <p className="text-xs text-slate-400">Configure project details, partner organization, and photos.</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Project Title <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. N-25 Karachi–Chaman Highway Project"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    URL Slug (Unique)
                  </label>
                  <input
                    type="text"
                    value={editingProject.slug || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500 font-mono text-[11px]"
                    placeholder="n25-karachi-chaman-highway"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={editingProject.category || "Highway & Road Works"}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Highway & Road Works">Highway & Road Works</option>
                    <option value="Road Paving & Dualization">Road Paving & Dualization</option>
                    <option value="Civil Works & Drainage">Civil Works & Drainage</option>
                    <option value="Mass Earthwork & Excavation">Mass Earthwork & Excavation</option>
                    <option value="Demolition & Site Preparation">Demolition & Site Preparation</option>
                    <option value="Building Construction">Building Construction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Project Status
                  </label>
                  <select
                    value={editingProject.status || "Ongoing"}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.location || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. N-25 Highway Corridor (Balochistan / Sindh)"
                  />
                </div>
              </div>

              {/* Partner & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Client / Partner Organization
                  </label>
                  <input
                    type="text"
                    value={editingProject.clientOrPartner || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, clientOrPartner: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. Frontier Works Organization (FWO)"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    MR. Construction Role
                  </label>
                  <input
                    type="text"
                    value={editingProject.partnerRole || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, partnerRole: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. Contractor / Work Partner"
                  />
                </div>
              </div>

              {/* Flags */}
              <div className="flex flex-wrap items-center gap-6 p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isCurrentProject || false}
                    onChange={(e) => setEditingProject({ ...editingProject, isCurrentProject: e.target.checked })}
                    className="w-4 h-4 text-orange-600 rounded bg-slate-800 border-slate-700"
                  />
                  <span className="text-white font-bold">Mark as Current Active Major Project</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isFeatured || false}
                    onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-orange-600 rounded bg-slate-800 border-slate-700"
                  />
                  <span className="text-white font-bold">Feature on Homepage</span>
                </label>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Short Summary (Cards & Previews) <span className="text-orange-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingProject.shortDescription || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Full Project Case Study / Operational Details <span className="text-orange-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={editingProject.fullDescription || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Scope Deliverables (One per line) */}
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Scope Deliverables (Enter one bullet point per line)
                </label>
                <textarea
                  rows={3}
                  value={scopeText}
                  onChange={(e) => setScopeText(e.target.value)}
                  placeholder="Mass cut-and-fill earthworks&#10;Subgrade stabilization & aggregate base&#10;RCC Box Culverts construction"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500 font-mono text-[11px]"
                />
              </div>

              {/* Technical Specifications JSON */}
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Technical Specifications (JSON Key-Value Pairs)
                </label>
                <textarea
                  rows={3}
                  value={specsText}
                  onChange={(e) => setSpecsText(e.target.value)}
                  placeholder={'{\n  "Client": "FWO",\n  "Scope": "Earthwork & Culverts"\n}'}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500 font-mono text-[11px]"
                />
              </div>

              {/* Main Featured Image */}
              <ImageUploader
                label="Primary Featured Project Image *"
                value={editingProject.featuredImage || ""}
                onChange={(url) => setEditingProject({ ...editingProject, featuredImage: url })}
                helperText="Main image displayed on project cards and detail banner."
              />

              {/* Additional Gallery Photos for this Project */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white uppercase tracking-wider">
                    Additional Project Site Photos ({galleryImages.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-orange-400 text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Photo</span>
                  </button>
                </div>

                {galleryImages.map((img, idx) => (
                  <div key={idx} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-400">Photo {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={img.imageUrl}
                        onChange={(e) => handleUpdateGalleryImage(idx, "imageUrl", e.target.value)}
                        placeholder="Image URL or upload path"
                        className="px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 text-white text-[11px]"
                      />
                      <input
                        type="text"
                        value={img.caption || ""}
                        onChange={(e) => handleUpdateGalleryImage(idx, "caption", e.target.value)}
                        placeholder="Caption description"
                        className="px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 text-white text-[11px]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold flex items-center gap-1.5 shadow"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{isCreating ? "Create Project" : "Save Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
