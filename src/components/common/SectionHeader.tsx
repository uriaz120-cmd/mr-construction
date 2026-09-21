import React from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={`max-w-3xl mb-12 ${isCenter ? "mx-auto text-center" : "text-left"}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
            light
              ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
              : "bg-orange-50 text-orange-700 border border-orange-200"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          {badge}
        </div>
      )}
      <h2
        className={`text-3xl sm:text-4xl font-bold tracking-tight ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
