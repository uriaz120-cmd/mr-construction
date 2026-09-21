import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { images: { orderBy: { order: "asc" } } },
    });
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json({ project });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
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

    if (isCurrentProject) {
      await prisma.project.updateMany({
        where: { isCurrentProject: true, NOT: { id: params.id } },
        data: { isCurrentProject: false },
      });
    }

    const updated = await prisma.project.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        category,
        clientOrPartner: clientOrPartner || null,
        partnerRole: partnerRole || null,
        location,
        status,
        isFeatured: Boolean(isFeatured),
        isCurrentProject: Boolean(isCurrentProject),
        startDate: startDate || null,
        completionDate: completionDate || null,
        shortDescription,
        fullDescription,
        scopeListJson: typeof scopeListJson === "string" ? scopeListJson : JSON.stringify(scopeListJson || []),
        specsJson: typeof specsJson === "string" ? specsJson : JSON.stringify(specsJson || {}),
        featuredImage,
        metaTitle,
        metaDescription,
        order: Number(order) || 0,
      },
    });

    if (Array.isArray(images)) {
      // Re-sync project images
      await prisma.projectImage.deleteMany({ where: { projectId: params.id } });
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (img.imageUrl) {
          await prisma.projectImage.create({
            data: {
              projectId: params.id,
              imageUrl: img.imageUrl,
              caption: img.caption || null,
              altText: img.altText || null,
              order: img.order !== undefined ? img.order : i,
            },
          });
        }
      }
    }

    const full = await prisma.project.findUnique({
      where: { id: params.id },
      include: { images: true },
    });

    return NextResponse.json({ success: true, project: full });
  } catch (error: any) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: error.message || "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.project.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
