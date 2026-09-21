import React from "react";
import { getSiteSettings } from "@/lib/settings";
import { HomeEditorClient } from "@/components/admin/HomeEditorClient";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-black text-white font-heading">
          Homepage & Hero Section Editor
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize headlines, subheadings, CTA buttons, background visuals, and corporate statistics.
        </p>
      </div>

      <HomeEditorClient initialSettings={settings} />
    </div>
  );
}
