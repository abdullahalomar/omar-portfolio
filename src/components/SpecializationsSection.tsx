"use client";

import React from "react";
import { 
  Wrench, 
  Terminal, 
  Cpu, 
  Gauge, 
  Smartphone, 
  GitBranch, 
  ShieldAlert,
  Code,
  Layers,
  Zap,
  CheckCircle
} from "lucide-react";
import { usePortfolioData } from "@/context/PortfolioContext";

const ICON_MAP: Record<string, React.ElementType> = {
  Terminal,
  Cpu,
  Gauge,
  Smartphone,
  GitBranch,
  ShieldAlert,
  Wrench,
  Code,
  Layers,
  Zap,
  CheckCircle,
};

export default function SpecializationsSection() {
  const { specializations } = usePortfolioData();

  return (
    <section id="services" className="scroll-mt-12 space-y-8 pt-6">
      {/* Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-[#10b981] text-xs font-mono font-medium tracking-wider uppercase">
        <Wrench className="w-3.5 h-3.5" />
        <span>SPECIALIZATIONS</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          My <span className="text-emerald-500 dark:text-[#10b981]">Specializations</span>
        </h2>
        <p className="text-base text-slate-600 dark:text-[#999999] max-w-2xl">
          Comprehensive quality engineering solutions designed to automate manual effort, guarantee reliability, and accelerate product velocity.
        </p>
      </div>

      {/* Specializations List */}
      <div className="space-y-6 pt-2">
        {specializations.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || Wrench;
          return (
            <div
              key={item.id}
              className="group p-8 lg:p-10 rounded-[32px] bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#2a2a2a] hover:border-emerald-500/40 dark:hover:border-[#10b981]/40 hover:bg-slate-50/50 dark:hover:bg-[#252525]/50 transition-all duration-300 flex flex-col justify-between min-h-[200px] shadow-sm dark:shadow-none"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-emerald-500 dark:group-hover:text-[#10b981]">
                    {item.title}
                  </h3>
                  <IconComponent className="w-8 h-8 text-emerald-500 dark:text-[#10b981] transition-transform duration-300 group-hover:scale-110" />
                </div>
                <p className="text-base text-slate-600 dark:text-[#999999] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              {item.projects && (
                <div className="mt-8 text-xs font-mono font-semibold tracking-wider text-slate-500 dark:text-[#888888] uppercase">
                  {item.projects}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
