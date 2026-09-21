import React from "react";
import Link from "next/link";
import {
  HardHat,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { SiteSettingsMap } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettingsMap }) {
  const currentYear = new Date().getFullYear();
  const phone = settings.phone || "+92 300 1234567";
  const whatsapp = settings.whatsapp || "+92 300 1234567";
  const email = settings.email || "info@mrconstruction.pk";
  const address = settings.office_address || "Office 133, Near Police Station, Sector 9-C, Hawksbay, Musharaf Colony, Karachi, Pakistan.";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, "");

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top CTA Bar */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-orange-100 text-xs uppercase tracking-widest font-bold">
              Institutional & Private Contracting
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 text-white">
              Have an Upcoming Infrastructure or Civil Project?
            </h3>
            <p className="text-orange-50 text-sm mt-1 max-w-xl">
              Discuss tender requirements, sub-contracting packages, equipment mobilization, or site engineering across Pakistan.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact?type=quote"
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg text-sm font-bold shadow-lg transition-all"
            >
              Request a Quotation
            </Link>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20MR.%20Construction`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: About Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <HardHat className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-heading">
                  MR.
                </span>
                <span className="text-2xl font-bold tracking-tight text-orange-500 font-heading">
                  CONSTRUCTION
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {settings.footer_about ||
                "MR. Construction provides professional road, highway, building, civil engineering and demolition services across Pakistan with verified experience with leading authorities including FWO, NLC, and DHA."}
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                <span>Founder & CEO: <strong>{settings.owner_name || "Muhammad Raaziq"}</strong></span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Operations Active Across All Pakistan</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                  <span>About MR. Construction</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                  <span>Engineering Services</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                  <span>Project Portfolio</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-slate-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                  <span>Site Photo Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/clients" className="text-slate-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                  <span>Associations & Clients</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                  <span>Contact Head Office</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Services */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Key Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/highway-construction" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Highway & Expressway Works
                </Link>
              </li>
              <li>
                <Link href="/services/road-construction" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Road Paving & Dualization
                </Link>
              </li>
              <li>
                <Link href="/services/building-construction" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Building & Structural Works
                </Link>
              </li>
              <li>
                <Link href="/services/earthwork-excavation" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Mass Earthwork & Excavation
                </Link>
              </li>
              <li>
                <Link href="/services/demolition-works" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Controlled Demolition
                </Link>
              </li>
              <li>
                <Link href="/services/civil-works" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Civil Engineering & Retaining
                </Link>
              </li>
              <li>
                <Link href="/services/asphalt-road-works" className="text-slate-400 hover:text-orange-400 transition-colors">
                  Asphalt Production & Laying
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Registered Office & Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Registered Office
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-1" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20MR.%20Construction`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {whatsapp} (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{settings.working_hours || "Mon - Sat: 8:00 AM - 7:00 PM"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {settings.company_name || "MR. Construction"}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Karachi, Sindh, Pakistan</span>
            <Link href="/admin/login" className="hover:text-slate-400 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
