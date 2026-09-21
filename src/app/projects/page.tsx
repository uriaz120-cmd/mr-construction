import React from "react";
import { prisma } from "@/lib/db";
import { ProjectCard } from "@/components/common/ProjectCard";
import { BreadcrumbStructuredData } from "@/lib/schema-org";

export const metadata = {
  title: "Projects & Infrastructure Portfolio | MR. Construction Pakistan",
  description: "Explore the highway, road paving, civil infrastructure, earthwork, and demolition projects completed and ongoing by MR. Construction across Pakistan.",
  alternates: { canonical: "/projects" },
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ isCurrentProject: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://mrconstruction.pk" },
          { name: "Projects", url: "https://mrconstruction.pk/projects" },
        ]}
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-orange-500/30">
              National Project Track Record
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-heading">
              Our Projects & Infrastructure Portfolio
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Proven execution across strategic national highway corridors, defense housing infrastructure, logistics terminals, and specialized demolition works.
            </p>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project as any} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
