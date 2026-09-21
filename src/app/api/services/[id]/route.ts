import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id },
    });
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });
    return NextResponse.json({ service });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const {
      title,
      slug,
      shortDescription,
      fullDescription,
      icon,
      featuredImage,
      featuresListJson,
      equipmentJson,
      order,
      isFeatured,
      isActive,
      metaTitle,
      metaDescription,
    } = data;

    const updated = await prisma.service.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        shortDescription,
        fullDescription,
        icon,
        featuredImage,
        featuresListJson: typeof featuresListJson === "string" ? featuresListJson : JSON.stringify(featuresListJson || []),
        equipmentJson: typeof equipmentJson === "string" ? equipmentJson : JSON.stringify(equipmentJson || []),
        order: Number(order) || 0,
        isFeatured: Boolean(isFeatured),
        isActive: Boolean(isActive),
        metaTitle,
        metaDescription,
      },
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: error.message || "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.service.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
