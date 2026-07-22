"use client";

import React, { useState } from "react";
import {
  Calculator,
  DollarSign,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function QaRoiCalculator() {
  const [devCount, setDevCount] = useState<number>(12);
  const [manualHours, setManualHours] = useState<number>(40);
  const [hourlyRate, setHourlyRate] = useState<number>(50);
  const [releasesPerMonth, setReleasesPerMonth] = useState<number>(4);

  // Calculations
  const totalManualHoursYear = manualHours * releasesPerMonth * 12;

  // Automation speedup (80% reduction in regression time)
  const hoursSavedYear = Math.round(totalManualHoursYear * 0.8);
  const annualSavingsDollars = Math.round(hoursSavedYear * hourlyRate);
  const automatedRunDurationMins = Math.round((manualHours * 60) * 0.15); // 85% time cut

  return (
    <section id="roi-calculator" className="py-20 bg-[#060911] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Financial Impact Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Calculate Your App&apos;s <span className="text-gradient-green">QA Automation ROI</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            See how much time and money Abdullah Al Omar&apos;s automated CI/CD test frameworks save your engineering team every year.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border-slate-800 bg-[#0a0f1d] space-y-6 shadow-xl h-full flex flex-col justify-between">
              
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Adjust Your Team Parameters
              </h3>

              <div className="space-y-5">
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>Engineering Team Size:</span>
                    <span className="text-cyan-400 font-bold">{devCount} Developers</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="60"
                    value={devCount}
                    onChange={(e) => setDevCount(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer bg-slate-800 rounded-lg h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>Manual Regression Hours / Release:</span>
                    <span className="text-cyan-400 font-bold">{manualHours} Hours</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="160"
                    value={manualHours}
                    onChange={(e) => setManualHours(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer bg-slate-800 rounded-lg h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>Average Dev Hourly Rate ($):</span>
                    <span className="text-emerald-400 font-bold">${hourlyRate}/hr</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer bg-slate-800 rounded-lg h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>Releases per Month:</span>
                    <span className="text-purple-400 font-bold">{releasesPerMonth} Releases</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={releasesPerMonth}
                    onChange={(e) => setReleasesPerMonth(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer bg-slate-800 rounded-lg h-2"
                  />
                </div>

              </div>

              <div className="p-3 bg-[#050810] rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400">
                Formula based on industry average 80% time reduction via Playwright/Cypress CI pipeline automation.
              </div>

            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border-emerald-500/40 bg-[#0c1424] space-y-6 shadow-2xl h-full flex flex-col justify-between relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">Calculated Financial Savings</span>
                <span className="text-xs font-mono text-slate-400">Omar SQA Impact Model</span>
              </div>

              <div className="space-y-4">
                
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-teal-950/40 to-cyan-950/60 border border-emerald-500/40 text-center space-y-1">
                  <div className="text-xs font-mono text-emerald-300 font-semibold">Estimated Annual Money Saved</div>
                  <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 font-mono tracking-tight">
                    ${annualSavingsDollars.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Direct savings from eliminated manual testing waste
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3.5 bg-[#050810] rounded-xl border border-slate-800 space-y-1">
                    <div className="text-slate-400 text-[10px]">Dev Hours Saved / Year:</div>
                    <div className="text-2xl font-bold text-cyan-400">{hoursSavedYear.toLocaleString()} hrs</div>
                  </div>

                  <div className="p-3.5 bg-[#050810] rounded-xl border border-slate-800 space-y-1">
                    <div className="text-slate-400 text-[10px]">Regression Run Drop:</div>
                    <div className="text-2xl font-bold text-purple-400">{manualHours}h &rarr; {automatedRunDurationMins}m</div>
                  </div>
                </div>

              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01]"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Discuss Automation Strategy with Omar</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
