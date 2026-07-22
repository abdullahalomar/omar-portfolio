"use client";

import React, { useState } from "react";
import { Mail, MessageCircle, Check } from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "abdullah.sqa@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full px-4 sm:px-8 max-w-6xl mx-auto my-12">
      {/* Contact Card matching exact design structure in user image */}
      <div className="bg-[#f5f5f7] rounded-[36px] sm:rounded-[44px] p-8 sm:p-16 text-center border border-white/60 shadow-sm relative overflow-hidden flex flex-col items-center justify-center min-h-[380px] sm:min-h-[420px]">
        
        {/* Circle Icon Badge (Handshake / Mail) */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm mb-6">
          {/* Handshake SVG icon */}
          <svg
            className="w-7 h-7 text-slate-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M7 11.5V14m0-2.5l-3-3m3 3l3 3m-3-3l3-3m7.5 5.5V14m0-2.5l3-3m-3 3l-3 3m3-3l-3-3M5 19.5h14a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Big Headline matching reference image */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-2xl mb-8">
          Tell me about your next project
        </h2>

        {/* Action Buttons matching reference image */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Dark Black Email Pill Button */}
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#262626] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md transition-all hover:scale-105"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Email Copied!</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-slate-300" />
                <span>Email Me</span>
              </>
            )}
          </button>

          {/* Light White WhatsApp / Call Pill Button */}
          <a
            href="https://wa.me/8801700000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs sm:text-sm px-6 py-3 rounded-full border border-slate-200 shadow-sm transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
