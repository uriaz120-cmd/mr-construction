import React from "react";
import { prisma } from "@/lib/db";
import { ServiceCard } from "@/components/common/ServiceCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BreadcrumbStructuredData } from "@/lib/schema-org";

export const metadata = {
  title: "Civil Engineering & Road Construction Services | MR. Construction Pakistan",
  description: "Explore the comprehensive civil engineering, highway paving, asphalt laying, earthwork, controlled demolition, and subgrade stabilization services of MR. Construction.",
  alternates: { canonical: "/services" },
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://mrconstruction.pk" },
          { name: "Services", url: "https://mrconstruction.pk/services" },
        ]}
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-orange-500/30">
              Our Capabilities & Disciplines
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-heading">
              Construction & Civil Engineering Services
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Full-spectrum civil infrastructure solutions engineered to NHA, ASTM, and AASHTO standards across Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service as any} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
