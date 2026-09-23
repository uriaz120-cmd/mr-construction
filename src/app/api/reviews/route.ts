import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const reviews = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ reviews });
  } catch (error: any) {
    console.error("Fetch reviews error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { authorName, company, authorTitle, quote, rating } = data;

    if (!authorName || !quote) {
      return NextResponse.json(
        { error: "Full Name and Review Message are required" },
        { status: 400 }
      );
    }

    const numericRating = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));

    const newReview = await prisma.testimonial.create({
      data: {
        authorName: authorName.trim(),
        company: company ? company.trim() : null,
        authorTitle: authorTitle ? authorTitle.trim() : null,
        quote: quote.trim(),
        rating: numericRating,
        isActive: true, // Visible by default, admin can manage/hide anytime
      },
    });

    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (error: any) {
    console.error("Create review error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
