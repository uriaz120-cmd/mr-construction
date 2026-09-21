import React from "react";
import { prisma } from "@/lib/db";
import { ProjectsManagerClient } from "@/components/admin/ProjectsManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { images: true },
    orderBy: [{ isCurrentProject: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <ProjectsManagerClient initialProjects={projects as any} />
    </div>
  );
}
