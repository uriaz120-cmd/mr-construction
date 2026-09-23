"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Calculator } from "lucide-react";

export function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    projectType: "Road & Highway Construction",
    location: "",
    budgetRange: "PKR 10 Million - 50 Million",
    estimatedTimeline: "1 - 3 Months",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit quote request.");
      }

      setStatus("success");
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        projectType: "Road & Highway Construction",
        location: "",
        budgetRange: "PKR 10 Million - 50 Million",
        estimatedTimeline: "1 - 3 Months",
        message: "",
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-orange-600/20 text-orange-500 border border-orange-500/30 flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white font-heading">
            Request a Project Quotation
          </h3>
          <p className="text-xs text-slate-400">
            For Government Tenders, Corporate Infrastructure & Civil Packages
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-6">
        Provide project scope specifications to receive a detailed BOQ estimate, machinery deployment schedule, and contractor quotation.
      </p>

      {status === "success" && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="font-bold block">Tender Quotation Request Logged!</strong>
            Our estimation and planning engineering department will analyze your parameters and provide an official quotation.
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-sm font-medium">{errorMessage}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Contact Person <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g. Tariq Mehmood"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Company / Organization
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g. National Logistics / Developer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Direct Phone / WhatsApp <span className="text-orange-400">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g. +92 342 2427006"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Email Address <span className="text-orange-400">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g. procurement@company.pk"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Project Category
            </label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="Highway & Expressway Works">Highway & Expressway Works</option>
              <option value="Road Construction & Asphalt Paving">Road Construction & Asphalt Paving</option>
              <option value="Civil Engineering & Structures">Civil Engineering & Structures</option>
              <option value="Earthwork & Mass Excavation">Earthwork & Mass Excavation</option>
              <option value="Controlled Demolition">Controlled Demolition</option>
              <option value="Commercial / Industrial Building">Commercial / Industrial Building</option>
              <option value="Machinery & Plant Rental">Machinery & Plant Rental</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Site Location (City / Province) <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g. Karachi / Balochistan / CPEC Corridor"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Estimated Budget Scope
            </label>
            <select
              value={formData.budgetRange}
              onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="Under PKR 10 Million">Under PKR 10 Million</option>
              <option value="PKR 10 Million - 50 Million">PKR 10 Million - 50 Million</option>
              <option value="PKR 50 Million - 200 Million">PKR 50 Million - 200 Million</option>
              <option value="PKR 200 Million+">PKR 200 Million+</option>
              <option value="Tender / BOQ Based">Tender / BOQ Based</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Target Execution Timeline
            </label>
            <select
              value={formData.estimatedTimeline}
              onChange={(e) => setFormData({ ...formData, estimatedTimeline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="Immediate (Within 30 Days)">Immediate (Within 30 Days)</option>
              <option value="1 - 3 Months">1 - 3 Months</option>
              <option value="3 - 6 Months">3 - 6 Months</option>
              <option value="6 - 12 Months">6 - 12 Months</option>
              <option value="1 Year+ Multi-phase">1 Year+ Multi-phase</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            BOQ Specifications & Project Scope <span className="text-orange-400">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
            placeholder="Please specify pavement length/width, cut & fill volumes, concrete grades, site conditions, or tender references..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing Quotation Request...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit RFQ for Engineering Review</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
