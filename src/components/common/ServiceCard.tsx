import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { DynamicIcon } from "@/lib/icons";
import { ServiceItem } from "@/lib/types";

export function ServiceCard({ service }: { service: ServiceItem }) {
  let features: string[] = [];
  if (service.featuresListJson) {
    try {
      features = JSON.parse(service.featuresListJson);
    } catch (e) {
      features = [];
    }
  }

  return (
    <div className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Featured Image if available */}
      {service.featuredImage && (
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
          <Image
            src={service.featuredImage}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          
          <div className="absolute bottom-3 left-4">
            <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-lg border-2 border-white/20">
              <DynamicIcon name={service.icon} className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {!service.featuredImage && (
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-2 border border-orange-200">
              <DynamicIcon name={service.icon} className="w-6 h-6" />
            </div>
          )}

          <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
            <Link href={`/services/${service.slug}`}>
              {service.title}
            </Link>
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
            {service.shortDescription}
          </p>

          {features.length > 0 && (
            <ul className="space-y-1.5 pt-2">
              {features.slice(0, 3).map((feat, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span className="line-clamp-1">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={`/services/${service.slug}`}
            className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition-colors"
          >
            <span>Read Specifications</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
