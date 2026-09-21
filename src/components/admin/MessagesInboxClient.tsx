"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MessageSquare,
  Building2,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Search,
  FileText,
  Calculator
} from "lucide-react";
import { ContactMessageItem, QuoteRequestItem } from "@/lib/types";

export function MessagesInboxClient({
  initialMessages,
  initialQuotes,
}: {
  initialMessages: ContactMessageItem[];
  initialQuotes: QuoteRequestItem[];
}) {
  const [activeTab, setActiveTab] = useState<"messages" | "quotes">("messages");
  const [messages, setMessages] = useState<ContactMessageItem[]>(initialMessages);
  const [quotes, setQuotes] = useState<QuoteRequestItem[]>(initialQuotes);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !currentRead }),
      });
      setMessages(messages.map((m) => (m.id === id ? { ...m, isRead: !currentRead } : m)));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
      setMessages(messages.filter((m) => m.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredMessages = messages.filter((m) =>
    searchTerm
      ? m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.company && m.company.toLowerCase().includes(searchTerm.toLowerCase()))
      : true
  );

  const filteredQuotes = quotes.filter((q) =>
    searchTerm
      ? q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.company && q.company.toLowerCase().includes(searchTerm.toLowerCase()))
      : true
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">
            Client Inquiries & Quotation Requests
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Review inbound project submissions, reply via WhatsApp, or manage archive status.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search inquiries..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab("messages")}
          className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "messages"
              ? "border-orange-500 text-orange-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>General Messages ({messages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("quotes")}
          className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "quotes"
              ? "border-orange-500 text-orange-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Tender Quotation Requests ({quotes.length})</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === "messages" ? (
        filteredMessages.length === 0 ? (
          <div className="bg-slate-950 p-12 text-center rounded-2xl border border-slate-800">
            <Mail className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">No contact messages in this view.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMessages.map((msg) => {
              const cleanPhone = msg.phone ? msg.phone.replace(/[^0-9]/g, "") : "";
              return (
                <div
                  key={msg.id}
                  className={`bg-slate-950 rounded-2xl border p-5 space-y-3 transition-colors ${
                    msg.isRead ? "border-slate-800" : "border-orange-500/50 shadow-md"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-sm text-white">{msg.name}</span>
                      {msg.company && (
                        <span className="text-xs text-orange-400 font-medium">
                          • {msg.company}
                        </span>
                      )}
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-600 text-white">
                          New
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {new Date(msg.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 leading-relaxed whitespace-pre-line">
                    {msg.message}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                    <div className="flex flex-wrap items-center gap-4 text-slate-400">
                      <a href={`mailto:${msg.email}`} className="hover:text-white flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-orange-400" />
                        <span>{msg.email}</span>
                      </a>
                      {msg.phone && (
                        <a href={`tel:${msg.phone}`} className="hover:text-white flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-orange-400" />
                          <span>{msg.phone}</span>
                        </a>
                      )}
                      {msg.serviceRequired && (
                        <span className="text-slate-500 font-semibold">
                          Service: {msg.serviceRequired}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {cleanPhone && (
                        <a
                          href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(msg.name)},%20thank%20you%20for%20contacting%20MR.%20Construction.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Reply WhatsApp</span>
                        </a>
                      )}

                      <button
                        onClick={() => handleToggleRead(msg.id, msg.isRead)}
                        className="px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
                      >
                        {msg.isRead ? "Mark Unread" : "Mark Read"}
                      </button>

                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        /* Quotes View */
        filteredQuotes.length === 0 ? (
          <div className="bg-slate-950 p-12 text-center rounded-2xl border border-slate-800">
            <Calculator className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">No tender quote requests logged yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredQuotes.map((q) => {
              const cleanPhone = q.phone.replace(/[^0-9]/g, "");
              return (
                <div key={q.id} className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{q.name}</span>
                      {q.company && <span className="text-xs text-orange-400">• {q.company}</span>}
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(q.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 block font-bold">Type:</span>
                      <span className="text-slate-200 font-semibold">{q.projectType || "Road & Highway"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-bold">Location:</span>
                      <span className="text-slate-200 font-semibold">{q.location || "Pakistan"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-bold">Budget:</span>
                      <span className="text-slate-200 font-semibold">{q.budgetRange || "Standard"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-bold">Timeline:</span>
                      <span className="text-slate-200 font-semibold">{q.estimatedTimeline || "Flexible"}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800 whitespace-pre-line">
                    {q.message}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-400">{q.email} • {q.phone}</span>
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(q.name)},%20this%20is%20MR.%20Construction%20regarding%20your%20project%20quotation%20request.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Reply on WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}
