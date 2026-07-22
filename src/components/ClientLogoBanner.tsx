"use client";

import React from "react";

export default function ClientLogoBanner() {
  const brands = [
    { name: "NATIONAL BANK", style: "font-serif font-black tracking-tighter text-slate-800" },
    { name: "mattered", style: "font-sans font-bold text-slate-800 tracking-tight" },
    { name: "Coca-Cola", style: "font-serif italic font-extrabold text-slate-800" },
    { name: "Adobe", style: "font-sans font-black text-slate-800 tracking-wider uppercase" },
    { name: "SUBWAY", style: "font-sans font-black italic text-slate-800 tracking-wide" },
    { name: "codecademy", style: "font-mono font-bold text-slate-800 tracking-tight" },
  ];

  return (
    <section className="w-full px-4 sm:px-8 max-w-6xl mx-auto my-4">
      <div className="bg-[#f5f5f7] rounded-[28px] sm:rounded-[36px] py-6 sm:py-8 px-6 sm:px-12 border border-white/60 shadow-sm flex flex-wrap items-center justify-between gap-6 sm:gap-10 opacity-90 hover:opacity-100 transition-opacity">
        {brands.map((brand, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer py-1"
          >
            <span className={`text-base sm:text-xl ${brand.style}`}>
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
