import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { BreadcrumbStructuredData } from "@/lib/schema-org";
import { SectionHeader } from "@/components/common/SectionHeader";

export const metadata = {
  title: "Working Associations & Institutional Experience | MR. Construction",
  description: "Learn about MR. Construction's experience and working associations with Frontier Works Organization (FWO), National Logistics Cell (NLC), and Defence Housing Authority (DHA).",
  alternates: { canonical: "/clients" },
};

export const revalidate = 60;

export default async function ClientsPage() {
  const organizations = await prisma.organization.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://mrconstruction.pk" },
          { name: "Associations", url: "https://mrconstruction.pk/clients" },
        ]}
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-orange-500/30">
              Institutional Track Record
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-heading">
              Previous & Current Working Associations
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Demonstrated contracting performance on high-standard national infrastructure and defense engineering initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Associations Breakdown */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 text-orange-500 flex items-center justify-center font-bold text-2xl shadow-md border border-slate-800">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 font-heading">
                    {org.name}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {org.description || "Contractor and civil works associate."}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Contracting Association</span>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance & Accuracy Disclaimer */}
          <div className="bg-slate-100 border border-slate-300/80 rounded-2xl p-6 text-slate-600 text-xs leading-relaxed max-w-4xl mx-auto text-center">
            <p>
              <strong>Corporate Governance Note:</strong> MR. Construction presents its working relationships with organizations such as Frontier Works Organization (FWO), National Logistics Cell (NLC), and Defence Housing Authority (DHA) strictly in its designated capacity as a contractor, work partner, or subcontractor. MR. Construction does not assert direct organizational ownership or exclusive government affiliation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
