"use client";

import React, { useState } from "react";
import {
  User,
  Heart,
  Award,
  CheckCircle2,
  Coffee,
  Sparkles,
  MapPin,
  Briefcase,
  Terminal,
  Zap,
} from "lucide-react";

export default function AboutMeSection() {
  const [activeTab, setActiveTab] = useState<"journey" | "philosophy" | "mindset">("journey");

  return (
    <section id="about" className="py-24 bg-[#080c18] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono">
            <User className="w-3.5 h-3.5" />
            <span>About Me Section</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient-cyan">Abdullah Al Omar</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Dedicated SQA Engineer driving zero-defect software releases through user empathy and resilient test frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Clean Profile Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border-slate-800/80 bg-[#0c1222] space-y-6 shadow-xl h-full flex flex-col justify-between">
              
              <div className="flex items-center gap-4 border-b border-slate-800/80 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-emerald-400 p-[2px] shadow-lg shadow-cyan-500/20 shrink-0">
                  <div className="w-full h-full bg-[#080d1a] rounded-[14px] flex items-center justify-center font-extrabold text-cyan-400 text-xl font-mono">
                    AO
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white">Abdullah Al Omar</h3>
                  <p className="text-xs font-mono text-cyan-400 font-medium">SQA Engineer</p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono mt-1">
                    <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                    <span>Dhaka, Bangladesh &bull; Remote Worldwide</span>
                  </div>
                </div>
              </div>

              {/* Personal Fact Pills */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#050810] border border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                    Experience:
                  </span>
                  <span className="text-slate-100 font-bold">5+ Years SQA Experience</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#050810] border border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Certification:
                  </span>
                  <span className="text-slate-100 font-bold">ISTQB CTAE Advanced</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#050810] border border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    Primary Core:
                  </span>
                  <span className="text-slate-100 font-bold">Playwright, Cypress, k6</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#050810] border border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Coffee className="w-3.5 h-3.5 text-rose-400" />
                    Fuel Source:
                  </span>
                  <span className="text-slate-100 font-bold">Espresso & Clean Code</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Tabbed Story & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="flex items-center gap-2 bg-[#050810] p-1.5 rounded-2xl border border-slate-800/80">
              <button
                onClick={() => setActiveTab("journey")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeTab === "journey"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                My SQA Journey
              </button>

              <button
                onClick={() => setActiveTab("philosophy")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeTab === "philosophy"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Testing Philosophy
              </button>

              <button
                onClick={() => setActiveTab("mindset")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeTab === "mindset"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Team Value Add
              </button>
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-8 border-slate-800/80 bg-[#0a0f1d] h-full flex flex-col justify-between space-y-4 shadow-xl">
              
              {activeTab === "journey" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    How I Became an SQA Specialist
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    My passion for SQA stems from a simple belief: <strong className="text-cyan-400">Software should work effortlessly for every single user.</strong> Early in my engineering career, I saw how manual testing bottlenecks delayed great products and caused team burnout.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Over the last 5+ years, I specialized in designing scalable, flaky-free test automation frameworks (Playwright, Cypress, Selenium) and CI/CD quality gates. Today, I help fast-scaling teams ship 75% faster with zero critical defect leaks.
                  </p>
                </div>
              )}

              {activeTab === "philosophy" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-400" />
                    Empathy-Driven Software Quality
                  </h3>
                  <blockquote className="text-xs sm:text-sm text-cyan-200 border-l-4 border-cyan-400 pl-4 py-1 italic">
                    &ldquo;Testing is not about saying NO to releases; it is about providing engineering teams with the confidence to say YES to continuous delivery.&rdquo;
                  </blockquote>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    I advocate for a <strong className="text-emerald-400">Shift-Left Quality Culture</strong>. Instead of catching bugs after code is deployed, I collaborate with product managers and engineers during initial requirement refinement, preventing defects before line 1 of code is committed.
                  </p>
                </div>
              )}

              {activeTab === "mindset" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-emerald-400" />
                    What I Bring To Your Engineering Squad
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 bg-[#050810] rounded-xl border border-slate-800/80 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-slate-100 font-bold">0.00% Flaky Spec SLA</div>
                        <div className="text-[10px] text-slate-400">Deterministic dynamic waiters</div>
                      </div>
                    </div>

                    <div className="p-3 bg-[#050810] rounded-xl border border-slate-800/80 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-slate-100 font-bold">API Security Sweeps</div>
                        <div className="text-[10px] text-slate-400">OWASP Top 10 automated PR gates</div>
                      </div>
                    </div>

                    <div className="p-3 bg-[#050810] rounded-xl border border-slate-800/80 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-slate-100 font-bold">75% Build Acceleration</div>
                        <div className="text-[10px] text-slate-400">Parallel containerized execution</div>
                      </div>
                    </div>

                    <div className="p-3 bg-[#050810] rounded-xl border border-slate-800/80 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-slate-100 font-bold">Quality Engineering</div>
                        <div className="text-[10px] text-slate-400">Mentoring engineers in BDD</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Status: <span className="text-emerald-400 font-bold">Open for SQA Roles</span></span>
                <a href="#contact" className="text-cyan-400 hover:text-cyan-300 font-bold">Contact Omar &rarr;</a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
