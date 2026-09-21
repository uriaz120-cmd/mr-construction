import React from "react";
import { prisma } from "@/lib/db";
import { MessagesInboxClient } from "@/components/admin/MessagesInboxClient";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const [messages, quotes] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-6">
      <MessagesInboxClient
        initialMessages={messages as any}
        initialQuotes={quotes as any}
      />
    </div>
  );
}
