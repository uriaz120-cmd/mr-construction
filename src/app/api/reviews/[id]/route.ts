import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getAdminSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const updated = await prisma.testimonial.update({
      where: { id: params.id },
      data: {
        ...(typeof data.isActive === "boolean" && { isActive: data.isActive }),
        ...(data.authorName && { authorName: data.authorName.trim() }),
        ...(typeof data.company !== "undefined" && { company: data.company ? data.company.trim() : null }),
        ...(typeof data.authorTitle !== "undefined" && { authorTitle: data.authorTitle ? data.authorTitle.trim() : null }),
        ...(data.quote && { quote: data.quote.trim() }),
        ...(data.rating && { rating: Math.min(5, Math.max(1, parseInt(data.rating, 10))) }),
        ...(typeof data.order === "number" && { order: data.order }),
      },
    });

    return NextResponse.json({ success: true, review: updated });
  } catch (error: any) {
    console.error("Update review error:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getAdminSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.testimonial.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Review deleted successfully" });
  } catch (error: any) {
    console.error("Delete review error:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
