import React from "react";
import { prisma } from "@/lib/db";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { BreadcrumbStructuredData } from "@/lib/schema-org";

export const metadata = {
  title: "Site Photographs & Project Gallery | MR. Construction Pakistan",
  description: "Browse high-resolution photographs of highway construction, asphalt paving, mass earthwork, structural works, and heavy machinery operations across Pakistan.",
  alternates: { canonical: "/gallery" },
};

export const revalidate = 60;

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://mrconstruction.pk" },
          { name: "Gallery", url: "https://mrconstruction.pk/gallery" },
        ]}
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-orange-500/30">
              Visual Documentation
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-heading">
              Site Photographs & Machinery Gallery
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Field photography from active road corridors, earthmoving operations, structural casting, and plant operations.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryClient items={items as any} />
        </div>
      </section>
    </div>
  );
}
