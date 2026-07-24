"use client";

import React from "react";
import { Sparkles, ArrowDownRight, ShieldCheck } from "lucide-react";
import { usePortfolioData } from "@/context/PortfolioContext";

export default function HeroIntroSection() {
  const { hero } = usePortfolioData();

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="scroll-mt-12 lg:min-h-[calc(100vh-4rem)] lg:flex lg:flex-col lg:justify-center space-y-6 lg:space-y-8 py-4 lg:py-0">
      {/* Section Header Tag */}
      <div className="section-tag self-start">
        <Sparkles className="w-3.5 h-3.5 text-sky-500 dark:text-[#38bdf8]" />
        <span>INTRO</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          {hero.headline1}<br />
          <span className="text-sky-500 dark:text-[#38bdf8]">{hero.headline2}</span>
        </h1>
        <p className="text-base md:text-lg text-slate-600 dark:text-[#999999] leading-relaxed max-w-2xl pt-1">
          {hero.subtitle}
        </p>
      </div>

      {/* Action CTA & Badge row */}
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          onClick={scrollToProjects}
          className="group px-7 py-3.5 rounded-full bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#2a2a2a] hover:border-sky-500/50 dark:hover:border-[#38bdf8]/50 text-slate-900 dark:text-white hover:text-sky-500 dark:hover:text-[#38bdf8] font-semibold text-sm flex items-center gap-3 transition-all duration-300 shadow-md dark:shadow-lg"
        >
          <span>Explore Automation Suites</span>
          <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 text-sky-500 dark:text-[#38bdf8]" />
        </button>

        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-[#161616] border border-slate-200 dark:border-[#2a2a2a] text-xs text-slate-600 dark:text-[#aaaaaa]">
          <ShieldCheck className="w-4 h-4 text-sky-500 dark:text-[#38bdf8]" />
          <span>ISO 25010 Software Quality Standards</span>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="pt-4 lg:pt-6">
        <div className="p-5 lg:p-6 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-[#1a1a1a] dark:via-[#161616] dark:to-[#1a1a1a] border border-slate-200 dark:border-[#2a2a2a] relative overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300">
          <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-transparent via-sky-500 dark:via-[#38bdf8] to-transparent" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-[#2a2a2a]">
            <div className="pt-3 md:pt-0 md:px-3 xl:px-4 text-center md:text-left space-y-1">
              <div className="text-2xl md:text-4xl xl:text-5xl font-extrabold text-sky-500 dark:text-[#38bdf8] font-mono tracking-tight flex items-baseline justify-center md:justify-start gap-1">
                <span>{hero.yearsExp}</span>
                <span className="text-lg xl:text-xl text-sky-500 dark:text-[#38bdf8]">+</span>
              </div>
              <div className="text-[11px] xl:text-xs text-slate-500 dark:text-[#888888] font-medium uppercase tracking-wider">
                Years Experience
              </div>
            </div>

            <div className="pt-3 md:pt-0 md:px-4 xl:px-6 text-center md:text-left space-y-1">
              <div className="text-2xl md:text-4xl xl:text-5xl font-extrabold text-sky-500 dark:text-[#38bdf8] font-mono tracking-tight flex items-baseline justify-center md:justify-start gap-1">
                <span>{hero.suitesCount}</span>
                <span className="text-lg xl:text-xl text-sky-500 dark:text-[#38bdf8]">+</span>
              </div>
              <div className="text-[11px] xl:text-xs text-slate-500 dark:text-[#888888] font-medium uppercase tracking-wider">
                Automation Suites
              </div>
            </div>

            <div className="pt-3 md:pt-0 md:px-4 xl:px-6 text-center md:text-left space-y-1">
              <div className="text-2xl md:text-4xl xl:text-5xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight flex items-baseline justify-center md:justify-start gap-1">
                <span>{hero.defectRate}</span>
                <span className="text-lg xl:text-xl text-sky-500 dark:text-[#38bdf8]">%</span>
              </div>
              <div className="text-[11px] xl:text-xs text-slate-500 dark:text-[#888888] font-medium uppercase tracking-wider">
                Defect Detection
              </div>
            </div>

            <div className="pt-3 md:pt-0 md:px-4 xl:px-6 text-center md:text-left space-y-1">
              <div className="text-2xl md:text-4xl xl:text-5xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight flex items-baseline justify-center md:justify-start gap-1">
                <span>{hero.productsCount}</span>
                <span className="text-lg xl:text-xl text-sky-500 dark:text-[#38bdf8]">+</span>
              </div>
              <div className="text-[11px] xl:text-xs text-slate-500 dark:text-[#888888] font-medium uppercase tracking-wider">
                Products Tested
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
