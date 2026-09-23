"use client";

import React, { useState } from "react";
import { Code2, MessageSquare, Sparkles, ExternalLink, X } from "lucide-react";

export function StunwebBadge() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const whatsappUrl =
    "https://wa.me/923150111508?text=Hello%20Stunweb%20Technologies,%20I%20saw%20the%20MR.%20Construction%20website%20and%20want%20to%20inquire%20about%20professional%20website/software%20development.";

  return (
    <aside
      aria-label="Agency developer credit"
      className="fixed bottom-6 left-6 z-40 print:hidden"
    >
      {/* Expanded Card */}
      {isExpanded ? (
        <div className="bg-slate-950 text-white rounded-2xl p-4 shadow-2xl border border-slate-800 w-72 sm:w-80 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white leading-tight">
                  STUNWEB TECHNOLOGIES
                </h4>
                <p className="text-[10px] text-cyan-400 font-semibold">
                  By Umar Abbasi
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
              aria-label="Close developer badge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-1.5 text-[11px] text-slate-300">
            <p className="font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Grow Your Business Online</span>
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              We design and develop high-performance, modern websites and custom software solutions for businesses worldwide.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow transition-all transform active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact on WhatsApp (03150111508)</span>
          </a>
        </div>
      ) : (
        /* Minimized Pill Badge */
        <button
          onClick={() => setIsExpanded(true)}
          className="group flex items-center gap-2 bg-slate-950/95 hover:bg-slate-900 text-white backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          title="Website Designed & Developed by STUNWEB TECHNOLOGIES (Umar Abbasi)"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white">
            <Code2 className="w-3 h-3" />
          </div>
          <span className="text-[11px] font-semibold text-slate-200 group-hover:text-white flex items-center gap-1">
            <span>Built by <strong className="text-cyan-400">STUNWEB</strong></span>
            <span className="text-slate-500 text-[10px] hidden sm:inline">(Umar Abbasi)</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </button>
      )}
    </aside>
  );
}
