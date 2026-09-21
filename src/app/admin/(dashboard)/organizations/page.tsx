import React from "react";
import { prisma } from "@/lib/db";
import { OrganizationsManagerClient } from "@/components/admin/OrganizationsManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminOrganizationsPage() {
  const organizations = await prisma.organization.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <OrganizationsManagerClient initialOrgs={organizations as any} />
    </div>
  );
}
