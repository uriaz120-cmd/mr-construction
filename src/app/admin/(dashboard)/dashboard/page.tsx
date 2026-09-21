import React from "react";
import Link from "next/link";
import {
  Briefcase,
  Wrench,
  Image as ImageIcon,
  Mail,
  Building2,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Plus
} from "lucide-react";
import { prisma } from "@/lib/db";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const settings = await getSiteSettings();

  const [
    projectsCount,
    servicesCount,
    galleryCount,
    messagesCount,
    unreadMessagesCount,
    recentMessages,
    recentProjects,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.galleryItem.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contactMessage.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.project.findMany({ take: 3, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            Executive Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Welcome, <strong>{settings.owner_name || "Muhammad Raaziq"}</strong>. Manage your website content, projects, and client inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </Link>
          <Link
            href="/admin/gallery"
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Photo</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Total Projects</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">{projectsCount}</div>
          <p className="text-[11px] text-slate-500">Active & completed across Pakistan</p>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Civil Services</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">{servicesCount}</div>
          <p className="text-[11px] text-slate-500">Published engineering disciplines</p>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Gallery Media</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-heading">{galleryCount}</div>
          <p className="text-[11px] text-slate-500">Site photos & machinery showcase</p>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Client Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-white font-heading">{messagesCount}</span>
            {unreadMessagesCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-600 text-white">
                {unreadMessagesCount} New
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500">Contact & RFQ tender submissions</p>
        </div>
      </div>

      {/* Main Grid: Recent Inquiries & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inquiries */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-base text-white">Recent Client Inquiries</h2>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No messages received yet.</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-xl border transition-colors ${
                    msg.isRead
                      ? "bg-slate-900 border-slate-800"
                      : "bg-slate-900/90 border-orange-500/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{msg.name}</span>
                        {msg.company && (
                          <span className="text-[11px] text-slate-400">({msg.company})</span>
                        )}
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-1">{msg.message}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Shortcuts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h2 className="font-bold text-base text-white border-b border-slate-800 pb-3">
              Content Controls
            </h2>
            <div className="space-y-2">
              <Link
                href="/admin/home"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-slate-200 transition-colors"
              >
                <span>Edit Hero & Key Metrics</span>
                <ArrowRight className="w-4 h-4 text-orange-500" />
              </Link>

              <Link
                href="/admin/projects"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-slate-200 transition-colors"
              >
                <span>Manage N-25 & Highway Projects</span>
                <ArrowRight className="w-4 h-4 text-orange-500" />
              </Link>

              <Link
                href="/admin/organizations"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-slate-200 transition-colors"
              >
                <span>Manage FWO / NLC / DHA Associations</span>
                <ArrowRight className="w-4 h-4 text-orange-500" />
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-slate-200 transition-colors"
              >
                <span>Update Contact, Phone & WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-orange-500" />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-950/40 to-slate-950 border border-orange-500/30 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
              <ShieldCheck className="w-4 h-4" />
              <span>SEO & Schema Active</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              All pages are wired with LocalBusiness schema for Karachi, dynamic sitemaps, and robots indexing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
