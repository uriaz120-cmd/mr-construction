"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { SiteSettingsMap } from "@/lib/types";

export function HomeEditorClient({ initialSettings }: { initialSettings: SiteSettingsMap }) {
  const [settings, setSettings] = useState<SiteSettingsMap>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Alert Notices */}
      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Homepage configuration updated successfully! Live website will refresh.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Hero Section Form */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
          1. Hero Banner Content
        </h2>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Hero Top Badge
          </label>
          <input
            type="text"
            value={settings.hero_badge || ""}
            onChange={(e) => handleChange("hero_badge", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. Leading Infrastructure & Civil Contractor in Pakistan"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Main Headline (H1)
          </label>
          <textarea
            rows={2}
            value={settings.hero_title || ""}
            onChange={(e) => handleChange("hero_title", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. Building Roads. Building Infrastructure. Building Pakistan."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Hero Subheading
          </label>
          <textarea
            rows={3}
            value={settings.hero_subtitle || ""}
            onChange={(e) => handleChange("hero_subtitle", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. MR. Construction provides professional road, highway, building, civil and demolition services across Pakistan."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Primary CTA Button Label
            </label>
            <input
              type="text"
              value={settings.hero_cta_primary || ""}
              onChange={(e) => handleChange("hero_cta_primary", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="View Our Projects"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Secondary CTA Button Label
            </label>
            <input
              type="text"
              value={settings.hero_cta_secondary || ""}
              onChange={(e) => handleChange("hero_cta_secondary", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Request a Quote"
            />
          </div>
        </div>

        <ImageUploader
          label="Hero Background Media / Image"
          value={settings.hero_image || ""}
          onChange={(url) => handleChange("hero_image", url)}
          helperText="High-resolution highway or civil engineering construction site photo (1920x1080 recommended)."
        />
      </div>

      {/* Infrastructure Metrics Bar */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
          2. Key Statistics Counters
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Kilometers of Roads Built
            </label>
            <input
              type="text"
              value={settings.stats_km_roads || ""}
              onChange={(e) => handleChange("stats_km_roads", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="150+"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Heavy Machinery Units
            </label>
            <input
              type="text"
              value={settings.stats_heavy_machinery || ""}
              onChange={(e) => handleChange("stats_heavy_machinery", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="45+"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Completed Projects
            </label>
            <input
              type="text"
              value={settings.stats_projects_completed || ""}
              onChange={(e) => handleChange("stats_projects_completed", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="85+"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Years of Experience
            </label>
            <input
              type="text"
              value={settings.stats_years_experience || ""}
              onChange={(e) => handleChange("stats_years_experience", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="14+"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Homepage Changes</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
