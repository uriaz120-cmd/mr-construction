import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const organizations = await prisma.organization.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ organizations });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch organizations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getAdminSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const { name, logoUrl, description, websiteUrl, order, isActive } = data;

    if (!name) {
      return NextResponse.json({ error: "Organization name is required" }, { status: 400 });
    }

    const created = await prisma.organization.create({
      data: {
        name,
        logoUrl: logoUrl || null,
        description: description || null,
        websiteUrl: websiteUrl || null,
        order: Number(order) || 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    return NextResponse.json({ success: true, organization: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create organization" }, { status: 500 });
  }
}
