"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle2, Save, X, Loader2, Building2 } from "lucide-react";
import { OrganizationItem } from "@/lib/types";

export function OrganizationsManagerClient({ initialOrgs }: { initialOrgs: OrganizationItem[] }) {
  const [orgs, setOrgs] = useState<OrganizationItem[]>(initialOrgs);
  const [editingOrg, setEditingOrg] = useState<Partial<OrganizationItem> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleStartCreate = () => {
    setEditingOrg({
      name: "",
      logoUrl: "",
      description: "",
      websiteUrl: "",
      order: orgs.length + 1,
      isActive: true,
    });
    setIsCreating(true);
    setError("");
  };

  const handleStartEdit = (org: OrganizationItem) => {
    setEditingOrg(org);
    setIsCreating(false);
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrg || !editingOrg.name) return;

    setSaving(true);
    setError("");

    try {
      const url = isCreating ? "/api/organizations" : `/api/organizations/${editingOrg.id}`;
      const method = isCreating ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingOrg),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save organization");

      if (isCreating) {
        setOrgs([...orgs, data.organization]);
        setSuccess("Organization added successfully!");
      } else {
        setOrgs(orgs.map((o) => (o.id === data.organization.id ? data.organization : o)));
        setSuccess("Organization updated successfully!");
      }

      setTimeout(() => setSuccess(""), 4000);
      setEditingOrg(null);
    } catch (err: any) {
      setError(err.message || "Failed to save organization");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/organizations/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete organization");

      setOrgs(orgs.filter((o) => o.id !== id));
      setSuccess("Organization removed");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      alert(err.message || "Error deleting organization");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">
            Institutional Associations & Clients
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage institutional relationships (FWO, NLC, DHA, developers) and partnership notes.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Organization</span>
        </button>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orgs.map((org) => (
          <div
            key={org.id}
            className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-500 font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStartEdit(org)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(org.id, org.name)}
                    className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900 text-red-400 hover:text-red-200 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white text-sm">{org.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-3">
                  {org.description || "Contracting partner on civil works."}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-850 flex items-center justify-between text-[11px] text-slate-500">
              <span>Display Order: #{org.order}</span>
              <span className={org.isActive ? "text-emerald-400 font-bold" : "text-slate-500"}>
                {org.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingOrg && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950 rounded-t-2xl">
              <h3 className="font-bold text-base text-white font-heading">
                {isCreating ? "Add Organization" : `Edit: ${editingOrg.name}`}
              </h3>
              <button
                onClick={() => setEditingOrg(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Organization Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingOrg.name || ""}
                  onChange={(e) => setEditingOrg({ ...editingOrg, name: e.target.value })}
                  placeholder="e.g. Frontier Works Organization (FWO)"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Partnership Description / Context
                </label>
                <textarea
                  rows={3}
                  value={editingOrg.description || ""}
                  onChange={(e) => setEditingOrg({ ...editingOrg, description: e.target.value })}
                  placeholder="e.g. Work partner on the N-25 Highway project..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingOrg.order || 0}
                    onChange={(e) => setEditingOrg({ ...editingOrg, order: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingOrg.isActive !== false}
                      onChange={(e) => setEditingOrg({ ...editingOrg, isActive: e.target.checked })}
                      className="w-4 h-4 text-orange-600 rounded bg-slate-800 border-slate-700"
                    />
                    <span className="text-white font-bold">Active on Site</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingOrg(null)}
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
                  <span>Save Organization</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
