"use client";

import React, { useState } from "react";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Zap,
  CheckCircle2,
  Coffee,
} from "lucide-react";

export default function PhilosophySection() {
  const pillars = [
    {
      id: "empathy",
      title: "User-Centric Empathy",
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      tagline: "Software isn't tested for machines; it's tested for real humans.",
      description:
        "Every failed checkout button or unhandled API error frustrates a real person. I view SQA through the user's eyes—ensuring intuitive UX, accessibility (WCAG AA), and flawless reliability.",
      highlight: "100% User Experience Empathy",
    },
    {
      id: "shift-left",
      title: "Shift-Left Quality Culture",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      tagline: "Preventing bugs at design phase costs 10x less than fixing in production.",
      description:
        "Instead of waiting until sprint end to test, I collaborate directly with developers and product managers during user story refinement to prevent defects before line 1 of code is committed.",
      highlight: "70% Faster Defect Resolution",
    },
    {
      id: "automation",
      title: "Resilient & Flaky-Free Automation",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      tagline: "Unreliable tests destroy developer trust. Automation must be rock-solid.",
      description:
        "I design Playwright & Cypress frameworks with explicit dynamic waiters, isolated API mocking, and smart retry mechanisms that deliver 0.00% false positive test alerts.",
      highlight: "0.00% Flakiness SLA",
    },
  ];

  const [activePillarId, setActivePillarId] = useState("empathy");
  const activePillar = pillars.find((p) => p.id === activePillarId) || pillars[0];

  return (
    <section id="philosophy" className="w-full px-4 sm:px-8 max-w-6xl mx-auto my-12">
      <div className="bg-[#f5f5f7] rounded-[36px] p-6 sm:p-12 border border-white/60 shadow-sm">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Abdullah Al Omar&apos;s SQA Ethos</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Human-Centric Quality Philosophy
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Behind every automated test script is a human commitment: protecting user trust, reducing developer stress, and empowering businesses to ship fast without fear.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
              Core SQA Pillars
            </h3>

            <div className="space-y-2.5">
              {pillars.map((pillar) => {
                const isSelected = pillar.id === activePillarId;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActivePillarId(pillar.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all border ${
                      isSelected
                        ? "bg-white border-slate-900 shadow-md"
                        : "bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                        {pillar.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{pillar.title}</h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                          {pillar.highlight}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Coffee className="w-4 h-4 text-amber-500" />
                <span>Omar&apos;s Personal Promise</span>
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                &ldquo;Testing is not about saying NO to releases; it is about providing engineering teams with the confidence to say YES to continuous delivery.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-5 shadow-sm relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
                    {activePillar.icon}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Pillar Focus</span>
                    <h3 className="text-lg font-bold text-slate-900">{activePillar.title}</h3>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  {activePillar.highlight}
                </span>
              </div>

              <blockquote className="text-sm sm:text-base font-semibold text-slate-800 border-l-4 border-slate-900 pl-4 py-1 italic">
                &ldquo;{activePillar.tagline}&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {activePillar.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">Proactive Defect Prevention</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">Empathetic User Experience</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
