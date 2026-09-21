import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const { title, caption, altText, category, imageUrl, projectId, order } = data;

    const updated = await prisma.galleryItem.update({
      where: { id: params.id },
      data: {
        title,
        caption,
        altText,
        category,
        imageUrl,
        projectId,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update gallery item" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.galleryItem.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Gallery item deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
