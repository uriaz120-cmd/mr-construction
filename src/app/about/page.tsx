import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HardHat,
  ShieldCheck,
  CheckCircle2,
  Award,
  Users,
  Compass,
  Building2,
  MapPin,
  ArrowRight,
  Truck,
  Wrench,
  Target
} from "lucide-react";
import { getSiteSettings } from "@/lib/settings";
import { SectionHeader } from "@/components/common/SectionHeader";
import { BreadcrumbStructuredData } from "@/lib/schema-org";

export const metadata = {
  title: "About MR. Construction | Pakistan Infrastructure & Civil Contractor",
  description: "Learn about MR. Construction, led by Muhammad Raaziq. Heavy civil contracting, highway development, and working associations with FWO, NLC, and DHA across Pakistan.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const ownerName = settings.owner_name || "Muhammad Raaziq";
  const ownerRole = settings.owner_role || "Founder & Chief Executive";

  return (
    <div className="bg-slate-50 min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://mrconstruction.pk" },
          { name: "About Us", url: "https://mrconstruction.pk/about" },
        ]}
      />

      {/* Page Header */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-orange-500/30">
              Corporate Profile & Leadership
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-heading">
              About MR. Construction
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              A premier Pakistani construction and civil engineering contracting firm built on technical precision, heavy equipment mobilization, and robust execution capabilities across Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Leadership Image / Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-2xl p-8 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="w-16 h-16 rounded-xl bg-orange-600 flex items-center justify-center text-white mb-6 shadow-md">
                  <HardHat className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">{ownerName}</h3>
                <p className="text-orange-400 font-semibold text-sm">{ownerRole}</p>
                
                <div className="mt-6 pt-6 border-t border-slate-800 space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>Headquartered in Karachi, Operations Nationwide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>Over a Decade of Civil Contracting Experience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Founder&apos;s Message & Vision
              </span>
              <h2 className="text-3xl font-bold text-slate-900 font-heading">
                &ldquo;Delivering Resilient Infrastructure That Advances Pakistan&rsquo;s Economic Growth&rdquo;
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  At <strong>MR. Construction</strong>, we believe that robust roads, highways, and civil structures form the backbone of national progress. Since inception, our mission has been to provide dependable, high-tonnage engineering contracting that stands up to the harshest environmental and traffic demands.
                </p>
                <p>
                  From partnering with the <strong>Frontier Works Organization (FWO)</strong> on pivotal national corridors like the <strong>N-25 Karachi–Chaman Highway</strong> to executing urban infrastructure with <strong>DHA</strong> and logistics terminals with <strong>NLC</strong>, we operate with uncompromised integrity, safety, and speed.
                </p>
              </div>

              <div className="pt-2">
                <div className="font-heading font-bold text-slate-900 text-lg">{ownerName}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Chief Executive • MR. Construction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values & HSE */}
      <section className="py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Engineering Integrity"
            title="Our Core Operating Principles"
            subtitle="How we maintain engineering quality and safe operations on every project site."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">Technical Precision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Adherence to ASTM, AASHTO, and National Highway Authority specifications across all soil compaction, aggregate grading, and asphalt mix designs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">HSE Site Safety</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Zero-incident workplace policy enforced with daily safety briefings, certified PPE equipment, emergency drills, and structured risk mitigation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">Rapid Fleet Mobilization</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A dedicated, company-managed fleet of excavators, motor graders, tandem vibratory rollers, and asphalt pavers ready for immediate national dispatch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nationwide Operations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-2">
            Coverage Area
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-heading">
            Operational Footprint Across All Pakistan
          </h2>
          <p className="text-slate-600 mt-4 leading-relaxed">
            While based in Karachi, MR. Construction deploys project units to Sindh, Balochistan, Punjab, and federal infrastructure corridors. No location is beyond our mobilization reach.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md transition-all"
            >
              Contact Head Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
