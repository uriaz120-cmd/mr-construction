"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Tag } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: {
    imageUrl: string;
    title?: string;
    caption?: string | null;
    category?: string;
    altText?: string | null;
  }[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || !images[currentIndex]) return null;

  const current = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Left */}
      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Navigation Right */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Container */}
      <div className="max-w-5xl w-full flex flex-col items-center max-h-[90vh]">
        <div className="relative w-full h-[65vh] rounded-xl overflow-hidden shadow-2xl bg-black">
          <Image
            src={current.imageUrl}
            alt={current.altText || current.title || "MR. Construction site project photo"}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>

        {/* Caption bar */}
        <div className="w-full mt-4 bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {current.category && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-orange-600 text-white uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {current.category}
                </span>
              )}
              <h4 className="font-bold text-base text-white">
                {current.title || `Site Photo ${currentIndex + 1}`}
              </h4>
            </div>
            {current.caption && (
              <p className="text-xs text-slate-300 max-w-2xl">{current.caption}</p>
            )}
          </div>

          <div className="text-xs text-slate-400 font-mono shrink-0">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}
