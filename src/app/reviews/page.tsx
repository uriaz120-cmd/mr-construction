import React from "react";
import { prisma } from "@/lib/db";
import { ReviewsClient } from "@/components/reviews/ReviewsClient";
import { BreadcrumbStructuredData } from "@/lib/schema-org";

export const metadata = {
  title: "Client Reviews & Testimonials | MR. Construction Pakistan",
  description: "Read verified reviews and client experiences from contractors, government infrastructure authorities, and private developers working with MR. Construction.",
  alternates: { canonical: "/reviews" },
};

export const revalidate = 30; // Revalidate every 30 seconds

export default async function ReviewsPage() {
  const reviews = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://mrconstruction.pk" },
          { name: "Reviews", url: "https://mrconstruction.pk/reviews" },
        ]}
      />

      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-orange-500/30">
              Verified Client Feedback
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-heading">
              Client Reviews & Testimonials
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Read how MR. Construction delivers civil engineering excellence, heavy equipment reliability, and strict adherence to NHA and AASHTO standards across Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* Main Reviews Container */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewsClient initialReviews={reviews} />
        </div>
      </section>
    </div>
  );
}
