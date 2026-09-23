import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  CheckCircle2,
  Truck,
  ArrowRight,
  HardHat,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  Building2,
  ChevronRight
} from "lucide-react";
import { prisma } from "@/lib/db";
import { getSiteSettings } from "@/lib/settings";
import { DynamicIcon } from "@/lib/icons";
import { BreadcrumbStructuredData } from "@/lib/schema-org";
import { ContactForm } from "@/components/forms/ContactForm";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  });

  if (!service) return { title: "Service Not Found" };

  return {
    title: service.metaTitle || `${service.title} | MR. Construction Pakistan`,
    description: service.metaDescription || service.shortDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | MR. Construction Pakistan`,
      description: service.shortDescription,
      images: service.featuredImage ? [service.featuredImage] : [],
    },
  };
}

export const revalidate = 60;

export default async function ServiceDetailPage({ params }: Props) {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  });

  if (!service) notFound();

  const settings = await getSiteSettings();
  const whatsapp = settings.whatsapp || "+92 342 2427006";
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, "");

  let features: string[] = [];
  if (service.featuresListJson) {
    try {
      features = JSON.parse(service.featuresListJson);
    } catch (e) {
      features = [];
    }
  }

  let equipment: string[] = [];
  if (service.equipmentJson) {
    try {
      equipment = JSON.parse(service.equipmentJson);
    } catch (e) {
      equipment = [];
    }
  }

  // Load other services for sidebar navigation
  const otherServices = await prisma.service.findMany({
    where: { isActive: true, NOT: { id: service.id } },
    select: { id: true, slug: true, title: true, icon: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://mrconstruction.pk" },
          { name: "Services", url: "https://mrconstruction.pk/services" },
          { name: service.title, url: `https://mrconstruction.pk/services/${service.slug}` },
        ]}
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/services" className="hover:underline">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300">{service.title}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center text-white shrink-0 shadow-lg">
              <DynamicIcon name={service.icon} className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading">
                {service.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-8 space-y-10">
              {/* Featured Visual */}
              {service.featuredImage && (
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
                  <Image
                    src={service.featuredImage}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Detailed Overview */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  Service Overview & Engineering Methodology
                </h2>
                <div className="text-slate-600 text-base leading-relaxed space-y-4">
                  {service.fullDescription.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Key Features & Deliverables */}
              {features.length > 0 && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-orange-600" />
                    <span>Technical Capabilities & Deliverables</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-slate-800">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Machinery & Equipment Used */}
              {equipment.length > 0 && (
                <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
                  <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                    <Truck className="w-5 h-5 text-orange-500" />
                    <span>Dedicated Heavy Equipment Deployed</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {equipment.map((eq, i) => (
                      <div key={i} className="bg-slate-800/80 p-3.5 rounded-lg border border-slate-700 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className="text-sm text-slate-200 font-medium">{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dedicated Inquiry Form */}
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Other Services Navigation */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                  All Construction Disciplines
                </h3>
                <div className="space-y-1">
                  {otherServices.map((item) => (
                    <Link
                      key={item.id}
                      href={`/services/${item.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-orange-50 text-slate-700 hover:text-orange-600 text-sm font-medium transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <DynamicIcon name={item.icon} className="w-4 h-4 text-orange-500" />
                        <span>{item.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Direct Support Card */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-lg text-white font-heading">
                  Need a Direct Technical Assessment?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Speak directly with Muhammad Raaziq and our senior engineering team regarding project feasibility or machinery mobilization.
                </p>
                <div className="pt-2 space-y-2">
                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=Hello%20MR.%20Construction,%20I%20am%20inquiring%20about%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 shadow transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                  <Link
                    href="/contact?type=quote"
                    className="block text-center w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs shadow transition-all"
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
