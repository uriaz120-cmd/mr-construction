import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  HardHat,
  ShieldCheck,
  Building2,
  Trophy,
  Truck,
  Layers,
  MapPin,
  Clock,
  PhoneCall,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { prisma } from "@/lib/db";
import { getSiteSettings } from "@/lib/settings";
import { ProjectCard } from "@/components/common/ProjectCard";
import { ServiceCard } from "@/components/common/ServiceCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DynamicIcon } from "@/lib/icons";

export const revalidate = 60; // ISR 60 seconds

export default async function HomePage() {
  const settings = await getSiteSettings();

  // Load active services
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    take: 6,
  });

  // Load featured projects
  const projects = await prisma.project.findMany({
    where: { isFeatured: true },
    orderBy: { order: "asc" },
    take: 3,
  });

  // Load current active project
  const currentProject = await prisma.project.findFirst({
    where: { isCurrentProject: true },
    include: { images: true },
  });

  // Load partner organizations
  const organizations = await prisma.organization.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  const whatsapp = settings.whatsapp || "+92 342 2427006";
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, "");

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-slate-950 text-white overflow-hidden">
        {/* Background Image with Dark Engineering Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={
              settings.hero_image ||
              "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=2000&q=85"
            }
            alt="MR. Construction Road & Civil Infrastructure Pakistan"
            fill
            priority
            className="object-cover object-center brightness-[0.38] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>{settings.hero_badge || "Civil, Highway & Infrastructure Contractor • Pakistan"}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight font-heading drop-shadow-sm">
              {settings.hero_title || "Building Roads. Building Infrastructure. Building Pakistan."}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              {settings.hero_subtitle ||
                "MR. Construction provides professional road, highway, building, civil and demolition services across Pakistan with an established track record on strategic national corridors."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/projects"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-7 py-3.5 rounded-xl text-base shadow-lg shadow-orange-600/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <span>{settings.hero_cta_primary || "View Our Projects"}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/contact"
                className="bg-slate-800/90 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600 font-bold px-7 py-3.5 rounded-xl text-base backdrop-blur-sm flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Contact Us</span>
              </Link>

              <a
                href={`https://wa.me/${cleanWhatsapp}?text=Hello%20MR.%20Construction`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold px-5 py-3.5 rounded-xl text-base flex items-center gap-2 transition-all shadow-md"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Govt & Corporate Grade</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Heavy Machinery Fleet</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>FWO / NLC / DHA Associations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFRASTRUCTURE STATS BAR */}
      <section className="bg-slate-900 border-y border-slate-800 text-white py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="text-center pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-500 font-heading">
                {settings.stats_km_roads || "150+"}
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-slate-400 mt-1">
                Kilometers of Roads Built
              </div>
            </div>

            <div className="text-center pt-4 md:pt-0 md:pl-8">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading">
                {settings.stats_heavy_machinery || "45+"}
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-slate-400 mt-1">
                Heavy Equipment Fleet
              </div>
            </div>

            <div className="text-center pt-4 md:pt-0 md:pl-8">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-500 font-heading">
                {settings.stats_projects_completed || "85+"}
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-slate-400 mt-1">
                Completed Civil Projects
              </div>
            </div>

            <div className="text-center pt-4 md:pt-0 md:pl-8">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading">
                {settings.stats_years_experience || "14+"}
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-slate-400 mt-1">
                Years of Excellence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURRENT MAJOR PROJECT SPOTLIGHT (N-25 Karachi–Chaman Highway) */}
      {currentProject && (
        <section className="py-20 bg-slate-100 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Visual */}
                <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full">
                  <Image
                    src={currentProject.featuredImage}
                    alt={currentProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />
                  <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>Current Active Project</span>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                  <div>
                    {currentProject.clientOrPartner && (
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
                        <Building2 className="w-4 h-4" />
                        <span>
                          {currentProject.partnerRole ? `${currentProject.partnerRole} with ` : "In Partnership with "}
                          {currentProject.clientOrPartner}
                        </span>
                      </div>
                    )}

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
                      {currentProject.title}
                    </h2>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span>{currentProject.location}</span>
                    </div>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                      {currentProject.shortDescription}
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-800">
                      <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                        <span className="text-[11px] text-slate-400 block font-semibold">Working Partner</span>
                        <span className="text-sm font-bold text-white">Frontier Works Org (FWO)</span>
                      </div>
                      <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                        <span className="text-[11px] text-slate-400 block font-semibold">Corridor Status</span>
                        <span className="text-sm font-bold text-emerald-400">Ongoing Active Execution</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/projects/${currentProject.slug}`}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-lg text-sm flex items-center gap-2 shadow-lg transition-all"
                    >
                      <span>View Full Project Case Study</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. ABOUT SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visuals */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80"
                  alt="MR. Construction Civil Engineering Works"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Float Card */}
              <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-5 rounded-xl shadow-xl border border-slate-800 max-w-xs hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center font-bold">
                    <HardHat className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Muhammad Raaziq</h4>
                    <p className="text-xs text-orange-400">Founder & Chief Executive</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 mt-2 border-t border-slate-800 pt-2">
                  Leading major highway, earthwork, and civil developments across Pakistan.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeader
                align="left"
                badge="About MR. Construction"
                title="Engineering Strength, Reliability & Execution Across Pakistan"
                subtitle="Dedicated to delivering heavy infrastructure, high-grade highways, arterial roadways, and complex civil engineering projects."
              />

              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  <strong>MR. Construction</strong>, under the leadership of <strong>Muhammad Raaziq</strong>, is a premier contracting firm operating across Pakistan. From our registered head office in Karachi to remote highway corridors in Balochistan and Sindh, we mobilize advanced machinery fleets, certified operators, and experienced civil engineers.
                </p>
                <p>
                  Our institutional credibility is reinforced through successful working associations with leading organizations including the <strong>Frontier Works Organization (FWO)</strong>, <strong>National Logistics Cell (NLC)</strong>, and <strong>Defence Housing Authority (DHA)</strong>.
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase block">Head Office</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">Office 133, Hawksbay, Karachi</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase block">Service Area</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">All Pakistan (National Coverage)</p>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/about"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-lg text-sm flex items-center gap-2 transition-all shadow-md"
                >
                  <span>Read More About Us</span>
                  <ArrowRight className="w-4 h-4 text-orange-400" />
                </Link>
                <Link
                  href="/clients"
                  className="text-slate-700 hover:text-orange-600 font-bold text-sm px-4 py-3.5 transition-colors"
                >
                  View Associations & Clients
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Core Capabilities"
            title="Comprehensive Construction & Civil Engineering Services"
            subtitle="Equipped with heavy road-building plants, modern earthmoving machinery, and engineering oversight."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service as any} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md transition-all"
            >
              <span>Explore All 10 Construction Services</span>
              <ArrowRight className="w-4 h-4 text-orange-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FEATURED PROJECTS SECTION */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-orange-50 text-orange-700 border border-orange-200">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Track Record & Portfolio
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
                Featured Infrastructure Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project as any} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLIENTS & ASSOCIATIONS SECTION (FWO, NLC, DHA) */}
      <section className="py-16 bg-slate-950 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-orange-400 font-bold block mb-2">
              Working Associations & Past Experience
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Trusted by Pakistan&apos;s Leading Organizations & Developers
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col items-center text-center space-y-4 hover:border-orange-500/50 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center font-bold text-orange-500 text-xl border border-slate-700 shadow">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">{org.name}</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {org.description || "Contracting partner on civil and infrastructure works."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. REQUEST A QUOTE / RFQ CTA SECTION */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6 text-white">
              <span className="text-orange-400 text-xs font-bold uppercase tracking-widest block">
                Tenders & Subcontracting
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight">
                Ready to Mobilize for Your Next Civil or Highway Project?
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Connect with Muhammad Raaziq and the MR. Construction management team for immediate mobilization, machinery deployment, or joint tender bidding across Pakistan.
              </p>

              <div className="space-y-4 pt-4 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Rapid Heavy Machinery Mobilization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>NHA / FWO / DHA Quality Compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Strict HSE Zero-Incident Site Standards</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20MR.%20Construction`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg text-sm shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  Quick Tender / Project Inquiry
                </h3>
                <Link
                  href="/contact?type=quote"
                  className="block w-full text-center bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-base mb-4"
                >
                  Open Full Estimation & RFQ Form
                </Link>
                <p className="text-xs text-slate-400 text-center">
                  Direct submission to Head Office Estimations Department (Karachi).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
