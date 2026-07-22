"use client";

import React, { useState } from "react";
import { Terminal, Globe, Bug, Calculator, Sparkles } from "lucide-react";
import InteractiveTestRunner from "./InteractiveTestRunner";
import ApiTesterWidget from "./ApiTesterWidget";
import BugTrackerBoard from "./BugTrackerBoard";
import QaRoiCalculator from "./QaRoiCalculator";

type TabId = "runner" | "api" | "bugs" | "roi";

interface TabItem {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  tagline: string;
}

export default function SqaInteractiveStudio() {
  const [activeTab, setActiveTab] = useState<TabId>("runner");

  const tabs: TabItem[] = [
    {
      id: "runner",
      label: "Live Test Suite Runner",
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      tagline: "Run automated Playwright/Cypress suites in real-time",
    },
    {
      id: "api",
      label: "API Assertion Tester",
      icon: <Globe className="w-4 h-4 text-emerald-400" />,
      tagline: "Test HTTP endpoints & JSON schema validation",
    },
    {
      id: "bugs",
      label: "Bug Board & RCA",
      icon: <Bug className="w-4 h-4 text-rose-400" />,
      tagline: "Inspect real defects & root cause analyses",
    },
    {
      id: "roi",
      label: "QA ROI Calculator",
      icon: <Calculator className="w-4 h-4 text-purple-400" />,
      tagline: "Calculate annual financial savings from automation",
    },
  ];

  return (
    <section id="test-sandbox" className="py-24 bg-[#070a14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Quality Engineering Studio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            SQA Live <span className="text-gradient-cyan">Interactive Sandbox</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Switch tabs below to test automated suites, send live API requests, inspect defect root causes, or calculate your team&apos;s QA ROI.
          </p>
        </div>

        {/* Clean Tabbed Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-[#0a0f1e] border border-slate-800/80 max-w-4xl mx-auto shadow-xl">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Studio Component View */}
        <div className="transition-all duration-300">
          {activeTab === "runner" && <InteractiveTestRunner />}
          {activeTab === "api" && <ApiTesterWidget />}
          {activeTab === "bugs" && <BugTrackerBoard />}
          {activeTab === "roi" && <QaRoiCalculator />}
        </div>

      </div>
    </section>
  );
}
