import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, company, serviceRequired, subject, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    const created = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        company: company ? company.trim() : null,
        serviceRequired: serviceRequired ? serviceRequired.trim() : "General Inquiry",
        subject: subject ? subject.trim() : null,
        message: message.trim(),
      },
    });

    return NextResponse.json({ success: true, message: "Inquiry received", id: created.id });
  } catch (error: any) {
    console.error("Error creating contact message:", error);
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
