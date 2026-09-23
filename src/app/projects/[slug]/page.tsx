import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Truck,
  MessageSquare
} from "lucide-react";
import { prisma } from "@/lib/db";
import { getSiteSettings } from "@/lib/settings";
import { BreadcrumbStructuredData, ProjectStructuredData } from "@/lib/schema-org";
import { ProjectGalleryViewer } from "@/components/projects/ProjectGalleryViewer";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.metaTitle || `${project.title} | MR. Construction Pakistan`,
    description: project.metaDescription || project.shortDescription,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | MR. Construction Pakistan`,
      description: project.shortDescription,
      images: [project.featuredImage],
    },
  };
}

export const revalidate = 60;

export default async function ProjectDetailPage({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!project) notFound();

  const settings = await getSiteSettings();
  const whatsapp = settings.whatsapp || "+92 342 2427006";
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, "");

  let scopeList: string[] = [];
  if (project.scopeListJson) {
    try {
      scopeList = JSON.parse(project.scopeListJson);
    } catch (e) {
      scopeList = [];
    }
  }

  let specsObj: Record<string, string> = {};
  if (project.specsJson) {
    try {
      specsObj = JSON.parse(project.specsJson);
    } catch (e) {
      specsObj = {};
    }
  }

  const isOngoing = project.status.toLowerCase() === "ongoing";

  return (
    <div className="bg-slate-50 min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://mrconstruction.pk" },
          { name: "Projects", url: "https://mrconstruction.pk/projects" },
          { name: project.title, url: `https://mrconstruction.pk/projects/${project.slug}` },
        ]}
      />

      <ProjectStructuredData
        title={project.title}
        description={project.shortDescription}
        image={project.featuredImage}
        location={project.location}
        status={project.status}
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/projects" className="hover:underline">Projects</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300">{project.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isOngoing ? "bg-amber-500 text-slate-950" : "bg-emerald-600 text-white"
              }`}
            >
              {project.status} Project
            </span>
            {project.isCurrentProject && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-600 text-white">
                Featured Ongoing Corridor
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              {project.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mt-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>{project.location}</span>
            </div>
            {project.clientOrPartner && (
              <div className="flex items-center gap-1.5 text-orange-400 font-bold">
                <Building2 className="w-4 h-4" />
                <span>
                  {project.partnerRole ? `${project.partnerRole} with ` : "Partner: "}
                  {project.clientOrPartner}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-10">
              {/* Project Interactive Gallery */}
              <ProjectGalleryViewer
                featuredImage={project.featuredImage}
                title={project.title}
                images={project.images}
              />

              {/* Scope & Description */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  Project Scope & Operational Details
                </h2>
                <div className="text-slate-600 text-base leading-relaxed space-y-4">
                  {project.fullDescription.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Scope Deliverables */}
              {scopeList.length > 0 && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-orange-600" />
                    <span>Contract Scope & Key Milestones</span>
                  </h3>
                  <div className="space-y-3">
                    {scopeList.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-slate-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Technical Specifications Sheet */}
              {Object.keys(specsObj).length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-base text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                    Project Specifications
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(specsObj).map(([key, val]) => (
                      <div key={key} className="flex flex-col border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                        <span className="text-xs font-bold text-slate-500 uppercase">{key}</span>
                        <span className="text-sm font-semibold text-slate-900 mt-0.5">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Partnership Notice */}
              {project.clientOrPartner && (
                <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                    <Building2 className="w-4 h-4 text-orange-500" />
                    <span>Working Association</span>
                  </div>
                  <h4 className="font-bold text-base text-white">
                    {project.clientOrPartner}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    MR. Construction executes this project strictly in its designated capacity as a contractor / work partner, adhering to all contract guidelines.
                  </p>
                </div>
              )}

              {/* Inquiry CTA */}
              <div className="bg-gradient-to-br from-orange-600 to-amber-600 text-white p-6 rounded-2xl shadow-xl space-y-4">
                <h4 className="font-bold text-lg text-white font-heading">
                  Inquire About Similar Contracting
                </h4>
                <p className="text-xs text-orange-100 leading-relaxed">
                  Have a road, highway, or civil package requiring high-tonnage mobilization?
                </p>
                <div className="pt-2 space-y-2">
                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=Hello%20MR.%20Construction,%20I%20am%20inquiring%20about%20project%20contracting%20similar%20to%20${encodeURIComponent(project.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 shadow transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Technical Inquiry</span>
                  </a>
                  <Link
                    href="/contact?type=quote"
                    className="block text-center w-full bg-white text-slate-900 hover:bg-slate-100 font-bold py-2.5 px-4 rounded-lg text-xs shadow transition-all"
                  >
                    Request Tender BOQ Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
