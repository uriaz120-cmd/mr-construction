"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, CheckCircle2, AlertCircle, Link as LinkIcon } from "lucide-react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
}

export function ImageUploader({ value, onChange, label = "Image", helperText }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [useUrlMode, setUseUrlMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload image");

      onChange(data.url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setUseUrlMode(!useUrlMode)}
          className="text-[11px] text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{useUrlMode ? "Upload File" : "Paste Image URL"}</span>
        </button>
      </div>

      {error && (
        <div className="p-2.5 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {useUrlMode ? (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://images.unsplash.com/... or /uploads/..."
          className="w-full px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
        />
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />

          {value ? (
            <div className="relative group aspect-[16/9] w-full max-w-sm rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
              <Image
                src={value}
                alt="Uploaded media preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-bold shadow hover:bg-orange-700 transition-colors"
                >
                  Change Image
                </button>
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-orange-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-800/50 hover:bg-slate-800"
            >
              {loading ? (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                  <span className="text-xs font-semibold">Uploading & Optimizing...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Upload className="w-6 h-6 text-orange-500" />
                  <span className="text-xs font-semibold text-slate-200">
                    Click to browse and upload image
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Supports JPG, PNG, WEBP (Max 10MB)
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
    </div>
  );
}
