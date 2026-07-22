"use client";

import React from "react";
import {
  Activity,
  Zap,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

export default function MetricsDashboard() {
  const coverageData = [
    { module: "Authentication & OAuth", percentage: 100, specs: 184 },
    { module: "Checkout & Payment Gateway", percentage: 98, specs: 320 },
    { module: "REST API Endpoint Schemas", percentage: 100, specs: 410 },
    { module: "User Dashboard & Analytics", percentage: 95, specs: 215 },
    { module: "Database Triggers & Sync", percentage: 97, specs: 190 },
  ];

  return (
    <section id="metrics" className="w-full px-4 sm:px-8 max-w-6xl mx-auto my-12">
      <div className="bg-[#f5f5f7] rounded-[36px] p-6 sm:p-12 border border-white/60 shadow-sm">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-sm">
            <Activity className="w-3.5 h-3.5 text-slate-800" />
            <span>Continuous Quality Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SQA Test Coverage & Impact
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Data-driven quality analytics reflecting automated code coverage, defect distribution by severity, and build execution acceleration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5 h-full flex flex-col justify-between">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-slate-800" />
                  <h3 className="text-base font-bold text-slate-900">Automated Test Coverage</h3>
                </div>
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
                  Avg 98.2% Coverage
                </span>
              </div>

              <div className="space-y-4">
                {coverageData.map((item, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-800">
                      <span className="font-semibold">{item.module}</span>
                      <span className="text-slate-900 font-bold">{item.percentage}% ({item.specs} specs)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="bg-slate-900 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
                <span>Total Specs: <span className="text-slate-900 font-bold">1,319</span></span>
                <span>Flakiness Rate: <span className="text-emerald-700 font-bold">0.00%</span></span>
              </div>

            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-bold text-slate-900">Regression Run Duration</h3>
                </div>
                <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">75% Faster</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <div className="text-xs text-slate-500 font-medium">Manual Testing</div>
                  <div className="text-lg font-bold text-rose-600 mt-1">96 Hours</div>
                  <div className="text-[10px] text-slate-400">4 QA Engineers</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-emerald-200 text-center">
                  <div className="text-xs text-slate-500 font-medium">Automated CI</div>
                  <div className="text-lg font-bold text-emerald-600 mt-1">18 Mins</div>
                  <div className="text-[10px] text-slate-400">Parallel Matrix</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Key Quality Indicators (KPIs)
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-600 font-medium">Prod Defect Leakage:</span>
                  <span className="text-emerald-700 font-bold">&lt; 0.2%</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-600 font-medium">Mean Time to Detect (MTTD):</span>
                  <span className="text-slate-900 font-bold">4.2 Minutes</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-600 font-medium">CI Build Pass Confidence:</span>
                  <span className="text-emerald-700 font-bold">99.8%</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
