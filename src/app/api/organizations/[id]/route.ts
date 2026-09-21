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
    const { name, logoUrl, description, websiteUrl, order, isActive } = data;

    const updated = await prisma.organization.update({
      where: { id: params.id },
      data: {
        name,
        logoUrl,
        description,
        websiteUrl,
        order: Number(order) || 0,
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json({ success: true, organization: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update organization" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.organization.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Organization deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete organization" }, { status: 500 });
  }
}
