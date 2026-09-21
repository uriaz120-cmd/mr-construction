import React from "react";
import { prisma } from "@/lib/db";
import { ServicesManagerClient } from "@/components/admin/ServicesManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <ServicesManagerClient initialServices={services as any} />
    </div>
  );
}
