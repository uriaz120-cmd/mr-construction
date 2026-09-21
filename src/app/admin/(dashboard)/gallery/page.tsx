import React from "react";
import { prisma } from "@/lib/db";
import { GalleryManagerClient } from "@/components/admin/GalleryManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <GalleryManagerClient initialItems={items as any} />
    </div>
  );
}
