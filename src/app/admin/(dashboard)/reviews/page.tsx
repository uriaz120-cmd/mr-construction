import React from "react";
import { prisma } from "@/lib/db";
import { ReviewsManagerClient } from "@/components/admin/ReviewsManagerClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Client Reviews Management | MR. Construction Admin",
};

export default async function AdminReviewsPage() {
  const reviews = await prisma.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return <ReviewsManagerClient initialReviews={reviews} />;
}
