import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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

    if (!title || !shortDescription || !fullDescription) {
      return NextResponse.json({ error: "Title and descriptions are required" }, { status: 400 });
    }

    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const created = await prisma.service.create({
      data: {
        title,
        slug: finalSlug,
        shortDescription,
        fullDescription,
        icon: icon || "Hammer",
        featuredImage: featuredImage || null,
        featuresListJson: typeof featuresListJson === "string" ? featuresListJson : JSON.stringify(featuresListJson || []),
        equipmentJson: typeof equipmentJson === "string" ? equipmentJson : JSON.stringify(equipmentJson || []),
        order: order || 0,
        isFeatured: isFeatured !== undefined ? isFeatured : true,
        isActive: isActive !== undefined ? isActive : true,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
      },
    });

    return NextResponse.json({ success: true, service: created });
  } catch (error: any) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: error.message || "Failed to create service" }, { status: 500 });
  }
}
