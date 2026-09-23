"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

export function FloatingWhatsApp({ whatsappNumber = "+92 342 2427006" }: { whatsappNumber?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("Hello MR. Construction, I would like to inquire about your construction and civil engineering services.");

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Popup Chat Widget */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-lg">
                MR
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight text-white">MR. Construction</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Typically replies within an hour
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 text-xs text-slate-700 max-w-[85%]">
              <p className="font-semibold text-slate-900 mb-1">Welcome to MR. Construction! 🏗️</p>
              <p>How can we assist you with your civil, highway, road, or infrastructure project today?</p>
              <span className="text-[10px] text-slate-400 block text-right mt-1">Karachi Office</span>
            </div>

            <form onSubmit={handleSend} className="pt-2 space-y-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800 resize-none"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start WhatsApp Chat</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        aria-label="Open WhatsApp chat"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
        <MessageSquare className="w-7 h-7" />
        <span className="sr-only">Chat on WhatsApp</span>
      </button>
    </div>
  );
}
