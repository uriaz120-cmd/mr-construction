import React, { Suspense } from "react";
import { getSiteSettings } from "@/lib/settings";
import { ContactClient } from "@/components/contact/ContactClient";
import { BreadcrumbStructuredData } from "@/lib/schema-org";

export const metadata = {
  title: "Contact Head Office Karachi | MR. Construction Pakistan",
  description: "Get in touch with MR. Construction (Muhammad Raaziq). Office 133, Near Police Station, Sector 9-C, Hawksbay, Musharaf Colony, Karachi. Phone, WhatsApp, and RFQ tendering inquiries.",
  alternates: { canonical: "/contact" },
};

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="bg-slate-50 min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://mrconstruction.pk" },
          { name: "Contact Us", url: "https://mrconstruction.pk/contact" },
        ]}
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-orange-500/30">
              Get in Touch with Management
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-heading">
              Contact MR. Construction
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Reach our registered Karachi head office for project quotations, civil sub-contracting inquiries, or machinery mobilization.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-12">Loading contact options...</div>}>
            <ContactClient settings={settings} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
