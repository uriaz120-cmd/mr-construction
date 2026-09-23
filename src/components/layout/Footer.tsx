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
  MessageSquare,
  Code2
} from "lucide-react";
import { SiteSettingsMap } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettingsMap }) {
  const currentYear = new Date().getFullYear();
  const phone = settings.phone || "+92 342 2427006";
  const whatsapp = settings.whatsapp || "+92 342 2427006";
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
                <Link href="/reviews" className="text-slate-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                  <span>Client Reviews & Ratings</span>
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

        {/* Developer Agency Banner (STUNWEB TECHNOLOGIES) */}
        <div className="mt-12 bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-xs text-slate-300">Website Designed & Developed by</span>
                <span className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 tracking-wide">
                  STUNWEB TECHNOLOGIES
                </span>
                <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                  Umar Abbasi
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Grow Your Business Online • High-Performance Modern Websites & Custom Business Software
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/923150111508?text=Hello%20Stunweb%20Technologies,%20I%20saw%20the%20MR.%20Construction%20website%20and%20want%20to%20develop%20a%20website/software."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-emerald-500/20 shrink-0 transform active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact on WhatsApp (03150111508)</span>
          </a>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
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
