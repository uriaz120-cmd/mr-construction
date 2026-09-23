"use client";

import React, { useState } from "react";
import {
  Star,
  CheckCircle2,
  Building2,
  HardHat,
  MessageSquare,
  Send,
  Loader2,
  Sparkles,
  ShieldCheck,
  Award,
  ThumbsUp,
  UserCheck
} from "lucide-react";

interface ReviewItem {
  id: string;
  authorName: string;
  authorTitle?: string | null;
  company?: string | null;
  quote: string;
  rating: number;
  createdAt: string | Date;
}

export function ReviewsClient({ initialReviews }: { initialReviews: ReviewItem[] }) {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [filterRating, setFilterRating] = useState<number | "all">("all");

  // Form State
  const [formData, setFormData] = useState({
    authorName: "",
    company: "",
    authorTitle: "",
    quote: "",
    rating: 5,
  });
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const ratingDescriptions: Record<number, string> = {
    1: "Poor (1/5)",
    2: "Fair (2/5)",
    3: "Good (3/5)",
    4: "Very Good (4/5)",
    5: "Excellent / Outstanding (5/5)",
  };

  const handleRatingClick = (val: number) => {
    setFormData((prev) => ({ ...prev, rating: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setSubmitSuccess(true);
      if (data.review) {
        setReviews((prev) => [data.review, ...prev]);
      }
      setFormData({
        authorName: "",
        company: "",
        authorTitle: "",
        quote: "",
        rating: 5,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === "all") return true;
    return r.rating === filterRating;
  });

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <div className="space-y-16">
      {/* 1. Overview & Trust Rating Metrics Card */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Score */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex flex-col items-center justify-center text-white shadow-xl shadow-orange-500/20 shrink-0">
              <span className="text-4xl sm:text-5xl font-black font-heading leading-none">
                {averageRating}
              </span>
              <div className="flex items-center gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-white text-white" />
                ))}
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2 border border-orange-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Client Satisfaction Record
              </span>
              <h3 className="text-2xl font-bold font-heading text-white">
                Trusted by Partners & Clients
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Based on verified feedback from national infrastructure partners, developers, and institutional contractors across Pakistan.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-800 lg:pl-8">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-orange-500 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold uppercase text-slate-400">Quality Score</span>
              </div>
              <p className="text-2xl font-black text-white font-heading">100%</p>
              <p className="text-[11px] text-slate-400">AASHTO & NHA Standard</p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-amber-500 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-xs font-bold uppercase text-slate-400">Total Reviews</span>
              </div>
              <p className="text-2xl font-black text-white font-heading">{reviews.length}+</p>
              <p className="text-[11px] text-slate-400">Verified Project Reviews</p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 text-emerald-500 mb-1">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-xs font-bold uppercase text-slate-400">On-Time Execution</span>
              </div>
              <p className="text-2xl font-black text-white font-heading">98.5%</p>
              <p className="text-[11px] text-slate-400">Paving & Earthmoving</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Two Column Layout: Reviews Grid + Submit Review Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Reviews List & Filtering (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-black text-slate-900 font-heading">
                Client Testimonials ({filteredReviews.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real feedback from our road, highway, and civil engineering project clients.
              </p>
            </div>

            {/* Rating Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setFilterRating("all")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterRating === "all"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              {[5, 4, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => setFilterRating(num)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    filterRating === num
                      ? "bg-orange-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{num}</span>
                  <Star className="w-3 h-3 fill-current" />
                </button>
              ))}
            </div>
          </div>

          {/* Reviews Cards List */}
          <div className="space-y-5">
            {filteredReviews.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center py-12 text-slate-500">
                <MessageSquare className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
                <p className="font-semibold">No reviews found for this rating filter.</p>
                <button
                  onClick={() => setFilterRating("all")}
                  className="mt-3 text-xs text-orange-600 font-bold hover:underline"
                >
                  View All Reviews
                </button>
              </div>
            ) : (
              filteredReviews.map((item) => (
                <article
                  key={item.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Author info */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm shrink-0 border border-orange-200">
                        {item.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-slate-900 font-heading leading-tight">
                          {item.authorName}
                        </h4>
                        {(item.company || item.authorTitle) && (
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>
                              {item.authorTitle ? `${item.authorTitle}, ` : ""}
                              {item.company}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 shrink-0">
                      <div className="flex items-center gap-0.5">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-amber-900 ml-1">
                        {item.rating}.0
                      </span>
                    </div>
                  </div>

                  {/* Review Quote */}
                  <blockquote className="mt-4 text-slate-700 text-sm leading-relaxed italic relative pl-4 border-l-2 border-orange-500">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  {/* Card Bottom Meta */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      <UserCheck className="w-3 h-3" />
                      Verified Client
                    </span>
                    <time dateTime={new Date(item.createdAt).toISOString()}>
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        {/* Right Column: "Share Your Experience" Interactive Form (5 Cols) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[11px] font-bold uppercase tracking-wider mb-2 border border-orange-500/30">
                  <HardHat className="w-3.5 h-3.5" />
                  Client Feedback
                </span>
                <h3 className="text-2xl font-black font-heading text-white">
                  Share Your Experience
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Have we worked together on a highway, road, or civil project? We appreciate your valuable feedback!
                </p>
              </div>

              {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-800 text-emerald-200 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7 text-emerald-300" />
                  </div>
                  <h4 className="text-base font-bold text-white font-heading">
                    Thank You for Your Review!
                  </h4>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">
                    Your review has been published live on the website! It is now visible in our verified testimonials list.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow"
                  >
                    Submit Another Review
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-950/90 border border-red-500/50 text-red-200 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  {/* Interactive Star Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Rating <span className="text-orange-400">*</span>
                    </label>
                    <div className="flex items-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((starValue) => {
                          const isFilled =
                            (hoverRating !== null ? hoverRating : formData.rating) >= starValue;
                          return (
                            <button
                              key={starValue}
                              type="button"
                              onClick={() => handleRatingClick(starValue)}
                              onMouseEnter={() => setHoverRating(starValue)}
                              onMouseLeave={() => setHoverRating(null)}
                              className="p-1 text-slate-600 hover:scale-125 transition-transform focus:outline-none"
                              aria-label={`Rate ${starValue} stars`}
                            >
                              <Star
                                className={`w-6 h-6 transition-colors ${
                                  isFilled
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-slate-700 hover:text-slate-500"
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                      <span className="text-xs font-semibold text-amber-300 ml-auto">
                        {ratingDescriptions[hoverRating !== null ? hoverRating : formData.rating]}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Full Name <span className="text-orange-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      placeholder="e.g. Engr. Asim Raza"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-600"
                    />
                  </div>

                  {/* Company & Designation Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. FWO / DHA Partner"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Role / Designation
                      </label>
                      <input
                        type="text"
                        value={formData.authorTitle}
                        onChange={(e) => setFormData({ ...formData, authorTitle: e.target.value })}
                        placeholder="e.g. Resident Engineer"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-600"
                      />
                    </div>
                  </div>

                  {/* Review Textarea */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Your Review / Experience <span className="text-orange-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.quote}
                      onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      placeholder="Describe your working experience with MR. Construction regarding machinery mobilization, quality of asphalt/earthwork, project speed..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-600 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 transition-all transform active:scale-95 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Review...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
