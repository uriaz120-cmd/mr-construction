"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, AlertCircle, Loader2, Globe, Phone, MapPin, Search } from "lucide-react";
import { SiteSettingsMap } from "@/lib/types";

export function SettingsManagerClient({ initialSettings }: { initialSettings: SiteSettingsMap }) {
  const [settings, setSettings] = useState<SiteSettingsMap>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
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
      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Website settings & SEO parameters saved successfully!</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* General Corporate Identity */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Globe className="w-4 h-4 text-orange-500" />
          <span>Corporate Identity & Leadership</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={settings.company_name || ""}
              onChange={(e) => handleChange("company_name", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Owner / CEO Name
            </label>
            <input
              type="text"
              value={settings.owner_name || ""}
              onChange={(e) => handleChange("owner_name", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Footer Summary / Mission Note
          </label>
          <textarea
            rows={2}
            value={settings.footer_about || ""}
            onChange={(e) => handleChange("footer_about", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Contact Channels (Phone, WhatsApp, Email, Karachi Office) */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Phone className="w-4 h-4 text-orange-500" />
          <span>Direct Contact Channels & Floating WhatsApp</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Primary Phone Number
            </label>
            <input
              type="text"
              value={settings.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="+92 300 1234567"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              WhatsApp Number (Updates Floating Widget)
            </label>
            <input
              type="text"
              value={settings.whatsapp || ""}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="+92 300 1234567"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Official Email
            </label>
            <input
              type="email"
              value={settings.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="info@mrconstruction.pk"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Registered Head Office Address
          </label>
          <input
            type="text"
            value={settings.office_address || ""}
            onChange={(e) => handleChange("office_address", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Office 133, Near Police Station, Sector 9-C, Hawksbay, Musharaf Colony, Karachi, Pakistan."
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Google Maps Embed URL / Iframe src
          </label>
          <input
            type="text"
            value={settings.google_maps_embed || ""}
            onChange={(e) => handleChange("google_maps_embed", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-[11px]"
          />
        </div>
      </div>

      {/* SEO & Search Engine Optimization */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Search className="w-4 h-4 text-orange-500" />
          <span>Global Search Engine Optimization (SEO) & Local Meta</span>
        </h2>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Global Site Title Tag
          </label>
          <input
            type="text"
            value={settings.meta_title || ""}
            onChange={(e) => handleChange("meta_title", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Meta Description (Google Snippet)
          </label>
          <textarea
            rows={2}
            value={settings.meta_description || ""}
            onChange={(e) => handleChange("meta_description", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Target Keywords (Comma-separated)
          </label>
          <input
            type="text"
            value={settings.meta_keywords || ""}
            onChange={(e) => handleChange("meta_keywords", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-850 border border-slate-750 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Configurations...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Website & SEO Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
