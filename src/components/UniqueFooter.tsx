"use client";

import React from "react";
import {
  ArrowUp,
  Mail,
  MapPin,
  Activity,
} from "lucide-react";

export default function UniqueFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#04060d] border-t border-slate-800/80 pt-16 pb-10 text-slate-400 font-mono text-xs relative overflow-hidden">
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-emerald-400 p-[2px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center font-extrabold text-cyan-400 text-sm">
                  AO
                </div>
              </div>
              <div>
                <div className="font-extrabold text-slate-100 text-base">Abdullah Al Omar</div>
                <div className="text-xs text-cyan-400">Senior SQA & Automation Test Architect</div>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Dedicated to safeguarding human user experiences, eliminating flaky test automation, and establishing zero-defect CI/CD quality gates for software teams worldwide.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/30 w-fit">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>🟢 Quality Systems Operational &bull; Available for Hire</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-200 tracking-wider">
              Portfolio Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <a href="#hero" className="hover:text-cyan-400 transition-colors">01. Hero Banner</a>
              <a href="#blog" className="hover:text-cyan-400 transition-colors">02. Blog Guides</a>
              <a href="#about" className="hover:text-cyan-400 transition-colors">03. About Omar</a>
              <a href="#projects" className="hover:text-cyan-400 transition-colors">04. Projects</a>
              <a href="#expertise" className="hover:text-cyan-400 transition-colors">05. Expertise</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">06. Contact Me</a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-200 tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href="mailto:abdullah.al.omar.sqa@gmail.com" className="hover:text-cyan-300 text-slate-300 truncate">
                  abdullah.al.omar.sqa@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} Abdullah Al Omar. Built with Next.js 14 & Tailwind CSS.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all font-mono text-xs shadow-lg"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

      </div>
    </footer>
  );
}
