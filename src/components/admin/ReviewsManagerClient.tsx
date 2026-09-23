"use client";

import React, { useState } from "react";
import {
  Star,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Building2,
  Calendar,
  X,
  MessageSquare
} from "lucide-react";

interface Testimonial {
  id: string;
  authorName: string;
  authorTitle?: string | null;
  company?: string | null;
  quote: string;
  rating: number;
  order: number;
  isActive: boolean;
  createdAt: string | Date;
}

export function ReviewsManagerClient({
  initialReviews,
}: {
  initialReviews: Testimonial[];
}) {
  const [reviews, setReviews] = useState<Testimonial[]>(initialReviews);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // New Review Form
  const [formData, setFormData] = useState({
    authorName: "",
    company: "",
    authorTitle: "",
    quote: "",
    rating: 5,
    isActive: true,
  });

  const showNotification = (type: "success" | "error", text: string) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleToggleStatus = async (review: Testimonial) => {
    setLoadingId(review.id);
    try {
      const res = await fetch(`/api/reviews/${review.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !review.isActive }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update review status");

      setReviews((prev) =>
        prev.map((r) => (r.id === review.id ? { ...r, isActive: !review.isActive } : r))
      );
      showNotification(
        "success",
        `Review marked as ${!review.isActive ? "Published" : "Hidden"}`
      );
    } catch (err: any) {
      showNotification("error", err.message || "Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this client review?")) {
      return;
    }

    setLoadingId(id);
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete review");

      setReviews((prev) => prev.filter((r) => r.id !== id));
      showNotification("success", "Review deleted successfully");
    } catch (err: any) {
      showNotification("error", err.message || "Failed to delete review");
    } finally {
      setLoadingId(null);
    }
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create review");

      if (data.review) {
        setReviews((prev) => [data.review, ...prev]);
      }
      setModalOpen(false);
      setFormData({
        authorName: "",
        company: "",
        authorTitle: "",
        quote: "",
        rating: 5,
        isActive: true,
      });
      showNotification("success", "New client testimonial added successfully");
    } catch (err: any) {
      showNotification("error", err.message || "Failed to save review");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white font-heading">
            Client Reviews & Testimonials
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage reviews submitted on the website or publish verified project testimonials.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Notifications */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2.5 animate-in fade-in duration-200 ${
            feedback.type === "success"
              ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-200"
              : "bg-red-950/80 border border-red-500/50 text-red-200"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-slate-950 p-12 rounded-2xl border border-slate-800 text-center text-slate-400">
            <MessageSquare className="w-10 h-10 mx-auto text-slate-600 mb-3" />
            <p className="font-bold text-sm text-white">No reviews found</p>
            <p className="text-xs text-slate-500 mt-1">
              Click &quot;Add Testimonial&quot; to add a new review.
            </p>
          </div>
        ) : (
          reviews.map((r) => (
            <div
              key={r.id}
              className={`p-5 rounded-2xl border transition-all ${
                r.isActive
                  ? "bg-slate-950 border-slate-800"
                  : "bg-slate-950/50 border-slate-850 opacity-70"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  {/* Top Bar: Name, Rating & Status Badge */}
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-bold text-base text-white font-heading">
                      {r.authorName}
                    </h3>
                    <div className="flex items-center gap-0.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[11px] font-bold text-amber-300 ml-1">
                        {r.rating}.0
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        r.isActive
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {r.isActive ? "Published" : "Hidden"}
                    </span>
                  </div>

                  {/* Company / Designation */}
                  {(r.company || r.authorTitle) && (
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>
                        {r.authorTitle ? `${r.authorTitle}, ` : ""}
                        {r.company}
                      </span>
                    </p>
                  )}

                  {/* Quote */}
                  <blockquote className="text-xs sm:text-sm text-slate-300 italic pt-1 border-l-2 border-orange-500 pl-3">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>

                  {/* Date */}
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      Submitted on: {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => handleToggleStatus(r)}
                    disabled={loadingId === r.id}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      r.isActive
                        ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        : "bg-emerald-900/60 text-emerald-300 hover:bg-emerald-800/60"
                    }`}
                    title={r.isActive ? "Hide review from public website" : "Publish review on website"}
                  >
                    {loadingId === r.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : r.isActive ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Publish</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(r.id)}
                    disabled={loadingId === r.id}
                    className="p-2 rounded-lg bg-red-950/60 text-red-400 hover:bg-red-900/60 hover:text-red-200 transition-colors"
                    title="Delete review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Testimonial Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-800 shadow-2xl text-white space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-lg text-white font-heading">
                Add Client Testimonial
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Client / Author Name <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  placeholder="e.g. Engr. Tariq Mahmood"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Frontier Works Organization (FWO)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={formData.authorTitle}
                    onChange={(e) => setFormData({ ...formData, authorTitle: e.target.value })}
                    placeholder="e.g. Project Director"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Star Rating (1 - 5)
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value={5}>5 Stars - Excellent / Outstanding</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Good</option>
                  <option value={2}>2 Stars - Fair</option>
                  <option value={1}>1 Star - Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Testimonial Quote <span className="text-orange-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Enter client testimonial text..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center gap-2 shadow"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Add Testimonial</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
