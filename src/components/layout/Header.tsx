"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  HardHat,
  MessageSquare,
  ShieldCheck,
  Clock
} from "lucide-react";
import { SiteSettingsMap } from "@/lib/types";

export function Header({ settings }: { settings: SiteSettingsMap }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Gallery", href: "/gallery" },
    { name: "Associations", href: "/clients" },
    { name: "Contact Us", href: "/contact" },
  ];

  const phone = settings.phone || "+92 342 2427006";
  const whatsapp = settings.whatsapp || "+92 342 2427006";
  const email = settings.email || "info@mrconstruction.pk";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, "");

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Corporate Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Office 133, Hawksbay, Musharaf Colony, Karachi</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span>Mon - Sat: 8:00 AM - 7:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>{phone}</span>
            </a>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20MR.%20Construction,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
            <Link
              href="/admin/dashboard"
              className="text-slate-400 hover:text-slate-200 pl-2 border-l border-slate-700 text-[11px]"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`transition-all duration-200 ${isScrolled ? "py-3" : "py-4"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-slate-900 rounded-lg flex items-center justify-center border-2 border-orange-500 shadow-md group-hover:bg-slate-800 transition-all">
              <HardHat className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-heading">
                  MR.
                </span>
                <span className="text-2xl font-bold tracking-tight text-orange-600 font-heading">
                  CONSTRUCTION
                </span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Civil & Highway Contractor • Pakistan
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-all ${
                    isActive
                      ? "text-orange-600 bg-orange-50 font-bold"
                      : "text-slate-700 hover:text-orange-600 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact?type=quote"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:shadow transition-all"
            >
              <span>Request a Quote</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-md text-base font-medium flex items-center justify-between ${
                    isActive
                      ? "bg-orange-50 text-orange-600 font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex flex-col gap-2 text-sm text-slate-600">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2 py-2 px-3 rounded bg-slate-50 text-slate-800 font-medium"
              >
                <Phone className="w-4 h-4 text-orange-600" />
                <span>Call: {phone}</span>
              </a>
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=Hello%20MR.%20Construction`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 px-3 rounded bg-emerald-50 text-emerald-800 font-semibold"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <Link
              href="/contact?type=quote"
              className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold shadow"
            >
              Request a Quote / Tender Inquiry
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
