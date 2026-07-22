"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="w-full px-4 sm:px-8 max-w-6xl mx-auto pt-2 pb-8">
      {/* Off-white Hero Card matching the reference image layout */}
      <div className="bg-[#f5f5f7] rounded-[36px] sm:rounded-[44px] p-8 sm:p-16 text-center border border-white/60 shadow-sm relative overflow-hidden flex flex-col items-center justify-center min-h-[460px] sm:min-h-[520px]">
        
        {/* Avatar with Name Tag Badge */}
        <div className="relative mb-8 flex justify-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200">
            <Image
              src="/images/omar-portrait.png"
              alt="Abdullah - SQA Engineer"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Floating Pill Tag Badge matching design image */}
          <div className="absolute -top-1 -right-12 sm:-right-16 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800">
            <span>Abdullah</span>
            <span className="text-base">👋</span>
          </div>
        </div>

        {/* Big Minimal Main Headline matching reference image */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-3xl mb-8">
          Building digital products, automated tests, and flawless quality.
        </h1>

        {/* Black Action Pill Button */}
        <div className="flex items-center justify-center">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#262626] text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-3.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <span>Explore Test Suites</span>
            <ArrowUpRight className="w-4 h-4 text-slate-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
