import React from "react";
import { getSiteSettings } from "@/lib/settings";
import { SettingsManagerClient } from "@/components/admin/SettingsManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-black text-white font-heading">
          Website & SEO Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage corporate credentials, registered address, phone, WhatsApp number, and SEO search metadata.
        </p>
      </div>

      <SettingsManagerClient initialSettings={settings} />
    </div>
  );
}
