import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { images: true },
      orderBy: [{ isCurrentProject: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
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
      category,
      clientOrPartner,
      partnerRole,
      location,
      status,
      isFeatured,
      isCurrentProject,
      startDate,
      completionDate,
      shortDescription,
      fullDescription,
      scopeListJson,
      specsJson,
      featuredImage,
      metaTitle,
      metaDescription,
      order,
      images, // array of { imageUrl, caption, altText, order }
    } = data;

    if (!title || !location || !shortDescription || !fullDescription || !featuredImage) {
      return NextResponse.json(
        { error: "Title, location, descriptions, and featured image are required" },
        { status: 400 }
      );
    }

    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    // If marked as isCurrentProject, unmark previous ones
    if (isCurrentProject) {
      await prisma.project.updateMany({
        where: { isCurrentProject: true },
        data: { isCurrentProject: false },
      });
    }

    const created = await prisma.project.create({
      data: {
        title,
        slug: finalSlug,
        category: category || "Road & Civil Works",
        clientOrPartner: clientOrPartner || null,
        partnerRole: partnerRole || null,
        location,
        status: status || "Ongoing",
        isFeatured: Boolean(isFeatured),
        isCurrentProject: Boolean(isCurrentProject),
        startDate: startDate || null,
        completionDate: completionDate || null,
        shortDescription,
        fullDescription,
        scopeListJson: typeof scopeListJson === "string" ? scopeListJson : JSON.stringify(scopeListJson || []),
        specsJson: typeof specsJson === "string" ? specsJson : JSON.stringify(specsJson || {}),
        featuredImage,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        order: Number(order) || 0,
      },
    });

    if (Array.isArray(images) && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (img.imageUrl) {
          await prisma.projectImage.create({
            data: {
              projectId: created.id,
              imageUrl: img.imageUrl,
              caption: img.caption || null,
              altText: img.altText || null,
              order: img.order !== undefined ? img.order : i,
            },
          });
        }
      }
    }

    const fullProject = await prisma.project.findUnique({
      where: { id: created.id },
      include: { images: true },
    });

    return NextResponse.json({ success: true, project: fullProject });
  } catch (error: any) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 500 });
  }
}
