"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, Maximize2 } from "lucide-react";
import { ImageLightbox } from "@/components/common/ImageLightbox";

interface Props {
  featuredImage: string;
  title: string;
  images?: {
    id: string;
    imageUrl: string;
    caption?: string | null;
    altText?: string | null;
  }[];
}

export function ProjectGalleryViewer({ featuredImage, title, images = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine featured image with gallery images
  const allImages = [
    { imageUrl: featuredImage, title: title, caption: "Main Project Photo", altText: title },
    ...images.map((img) => ({
      imageUrl: img.imageUrl,
      title: title,
      caption: img.caption,
      altText: img.altText || title,
    })),
  ];

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Featured Main Image */}
      <div
        onClick={() => handleOpen(0)}
        className="group relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 cursor-pointer"
      >
        <Image
          src={featuredImage}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 backdrop-blur-sm border border-slate-700">
            <Maximize2 className="w-4 h-4" />
            <span>Click to View Fullscreen</span>
          </div>
        </div>
      </div>

      {/* Thumbnails if multiple images */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {allImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => handleOpen(idx)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-slate-200 hover:border-orange-500 bg-slate-100 cursor-pointer transition-colors"
            >
              <Image
                src={img.imageUrl}
                alt={img.altText || title}
                fill
                sizes="(max-width: 768px) 33vw, 200px"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
                <Eye className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        images={allImages}
        currentIndex={currentIndex}
        onNavigate={(idx) => setCurrentIndex(idx)}
      />
    </div>
  );
}
