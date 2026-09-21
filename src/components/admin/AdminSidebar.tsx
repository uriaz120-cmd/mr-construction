"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Briefcase,
  Wrench,
  Image as ImageIcon,
  Building2,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  HardHat,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { TokenPayload } from "@/lib/auth";

export function AdminSidebar({ session }: { session: TokenPayload }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Hero & Homepage", href: "/admin/home", icon: Home },
    { name: "Projects Portfolio", href: "/admin/projects", icon: Briefcase },
    { name: "Civil Services", href: "/admin/services", icon: Wrench },
    { name: "Photo Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Organizations (FWO/NLC/DHA)", href: "/admin/organizations", icon: Building2 },
    { name: "Messages & RFQs", href: "/admin/messages", icon: Mail },
    { name: "Website & SEO Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-orange-600 flex items-center justify-center text-white">
            <HardHat className="w-5 h-5" />
          </div>
          <span className="font-bold text-white font-heading text-lg">MR. Construction CMS</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Desktop & Mobile Drawer */}
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-full md:w-72 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 p-5 z-40`}
      >
        <div className="space-y-6">
          {/* Logo & Info */}
          <div className="hidden md:flex items-center gap-3 pb-5 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-black text-white font-heading text-lg leading-none">
                MR. CMS
              </h2>
              <p className="text-[11px] text-orange-400 font-semibold mt-1">
                Admin Control Center
              </p>
            </div>
          </div>

          {/* User Status */}
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-orange-400 text-xs">
              MR
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{session.name || "Muhammad Raaziq"}</p>
              <p className="text-[10px] text-slate-400 font-mono">@{session.username}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2 mt-6">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-orange-500" />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
