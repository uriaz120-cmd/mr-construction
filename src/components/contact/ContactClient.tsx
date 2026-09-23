"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Building2,
  FileText,
  Calculator,
  HardHat,
  ExternalLink
} from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SiteSettingsMap } from "@/lib/types";

export function ContactClient({ settings }: { settings: SiteSettingsMap }) {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") === "quote" ? "quote" : "message";
  const [activeTab, setActiveTab] = useState<"message" | "quote">(initialType);

  useEffect(() => {
    if (searchParams.get("type") === "quote") {
      setActiveTab("quote");
    }
  }, [searchParams]);

  const phone = settings.phone || "+92 342 2427006";
  const whatsapp = settings.whatsapp || "+92 342 2427006";
  const email = settings.email || "info@mrconstruction.pk";
  const address = settings.office_address || "Office 133, Near Police Station, Sector 9-C, Hawksbay, Musharaf Colony, Karachi, Pakistan.";
  const ownerName = settings.owner_name || "Muhammad Raaziq";
  const mapEmbed = settings.google_maps_embed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.049405629167!2d66.8963874!3d24.8914835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb313000ea6c841%3A0x4091ae8bb35e5c46!2sMR.Construction%20Company!5e0!3m2!1sen!2spk!4v1710000000000!5m2!1sen!2spk";

  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, "");

  return (
    <div className="space-y-12">
      {/* Contact Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Office Location */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 font-heading">Registered Office</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{address}</p>
          <div className="text-[11px] font-bold text-orange-600">Karachi, Sindh, Pakistan</div>
        </div>

        {/* Telephone */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 font-heading">Direct Telephone</h3>
          <a
            href={`tel:${cleanPhone}`}
            className="text-sm font-bold text-slate-900 hover:text-orange-600 block transition-colors"
          >
            {phone}
          </a>
          <p className="text-xs text-slate-500">Mon - Sat: 8:00 AM - 7:00 PM</p>
        </div>

        {/* WhatsApp */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 font-heading">WhatsApp Direct</h3>
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=Hello%20MR.%20Construction`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 block transition-colors"
          >
            {whatsapp}
          </a>
          <p className="text-xs text-slate-500">Instant Field Messaging</p>
        </div>

        {/* Executive Management */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-orange-300 shadow-sm">
            <Image
              src="/images/muhammad-raaziq-ceo.jpg"
              alt={ownerName}
              fill
              className="object-cover object-top"
            />
          </div>
          <h3 className="font-bold text-base text-slate-900 font-heading">Executive Leadership</h3>
          <p className="text-sm font-bold text-slate-900">{ownerName}</p>
          <p className="text-xs text-slate-500">Founder & Chief Executive</p>
        </div>
      </div>

      {/* Interactive Tabs: Send Message vs Request a Quote */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setActiveTab("message")}
            className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === "message"
                ? "border-orange-600 text-orange-600 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Send a Message / General Inquiry</span>
          </button>
          <button
            onClick={() => setActiveTab("quote")}
            className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === "quote"
                ? "border-orange-600 text-orange-600 bg-slate-900 text-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Request a Project Quotation (RFQ)</span>
          </button>
        </div>

        <div className="p-4 sm:p-8">
          {activeTab === "message" ? <ContactForm /> : <QuoteForm />}
        </div>
      </div>

      {/* Embedded Google Map */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-600 shrink-0" />
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-heading">
                MR. Construction Company • Head Office
              </h3>
              <p className="text-xs text-slate-500">
                Sector 9-C, Near Police Station, Hawksbay, Musharaf Colony, Karachi
              </p>
            </div>
          </div>
          <a
            href="https://maps.app.goo.gl/Mn48vbfQteN3Af1h7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors shrink-0 shadow-sm"
          >
            <span>Get Directions / Open in Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="w-full h-96 sm:h-[450px] relative bg-slate-100">
          <iframe
            src={mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MR. Construction Karachi Office Map"
          />
        </div>
      </div>
    </div>
  );
}
