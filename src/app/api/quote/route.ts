import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, company, phone, email, projectType, location, budgetRange, estimatedTimeline, message } = data;

    if (!name || !phone || !email || !location || !message) {
      return NextResponse.json(
        { error: "Name, phone, email, location, and project message are required" },
        { status: 400 }
      );
    }

    const created = await prisma.quoteRequest.create({
      data: {
        name: name.trim(),
        company: company ? company.trim() : null,
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        projectType: projectType ? projectType.trim() : "Road & Highway Construction",
        location: location.trim(),
        budgetRange: budgetRange ? budgetRange.trim() : null,
        estimatedTimeline: estimatedTimeline ? estimatedTimeline.trim() : null,
        message: message.trim(),
        status: "Pending",
      },
    });

    return NextResponse.json({ success: true, message: "Quote request received", id: created.id });
  } catch (error: any) {
    console.error("Error creating quote request:", error);
    return NextResponse.json({ error: "Failed to process quote request" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = getAdminSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const quotes = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ quotes });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quote requests" }, { status: 500 });
  }
}
