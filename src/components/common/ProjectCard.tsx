import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Building2, Calendar, CheckCircle2, Clock } from "lucide-react";
import { ProjectItem } from "@/lib/types";

export function ProjectCard({ project }: { project: ProjectItem }) {
  const isOngoing = project.status.toLowerCase() === "ongoing";
  const isCompleted = project.status.toLowerCase() === "completed";

  return (
    <div className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={project.featuredImage || "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=800&q=80"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm flex items-center gap-1 ${
              isOngoing
                ? "bg-amber-500 text-slate-950"
                : isCompleted
                ? "bg-emerald-600 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {isOngoing ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
            {project.status}
          </span>
          {project.isCurrentProject && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-600 text-white shadow-sm">
              Current Project
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-900/80 text-orange-400 border border-slate-700/50 backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {project.clientOrPartner && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-700">
              <Building2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span>{project.partnerRole ? `${project.partnerRole} with ` : ""}{project.clientOrPartner}</span>
            </div>
          )}

          <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{project.location}</span>
          </div>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-bold text-slate-900 group-hover:text-orange-600 flex items-center gap-1.5 transition-colors"
          >
            <span>View Project Details</span>
            <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
          </Link>
          {project.completionDate && (
            <span className="text-xs text-slate-400 font-medium">
              {project.completionDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
