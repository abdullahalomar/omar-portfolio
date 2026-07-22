"use client";

import React, { useState } from "react";
import {
  Bug,
  CheckCircle2,
  Filter,
  Plus,
  Search,
  ShieldAlert,
  FileCode,
  Tag,
} from "lucide-react";

type BugSeverity = "Critical" | "High" | "Medium" | "Low";
type BugCategory = "UI/UX" | "API" | "Security" | "Performance";

interface DefectItem {
  id: string;
  title: string;
  severity: BugSeverity;
  category: BugCategory;
  status: "VERIFIED FIXED" | "IN RETEST" | "CLOSED";
  steps: string[];
  rca: string;
  regressionTest: string;
  foundIn: string;
}

export default function BugTrackerBoard() {
  const [defects, setDefects] = useState<DefectItem[]>([
    {
      id: "BUG-1092",
      title: "Race condition in Checkout Coupon validation allows duplicate discounts",
      severity: "Critical",
      category: "API",
      status: "VERIFIED FIXED",
      steps: [
        "1. Send concurrent POST requests to /api/v1/coupon/apply with same code.",
        "2. Observe double deduction in cart calculation payload.",
      ],
      rca: "Database transaction lock missing during coupon count update. Added Redis distributed lock.",
      regressionTest: "cypress/e2e/concurrency-coupon.cy.ts",
      foundIn: "v2.4.0-rc1",
    },
    {
      id: "SEC-402",
      title: "JWT auth token not invalidated upon user logout in mobile web",
      severity: "Critical",
      category: "Security",
      status: "VERIFIED FIXED",
      steps: [
        "1. Log in on mobile Safari & capture Bearer token.",
        "2. Click 'Log Out' & re-send request with cached token.",
      ],
      rca: "Token revocation list was missing Redis TTL eviction. Implemented token blacklisting in API Gateway.",
      regressionTest: "specs/security/jwt-eviction.spec.ts",
      foundIn: "v2.3.8",
    },
    {
      id: "PERF-301",
      title: "LCP degrade above 3.5s on User Dashboard under 500 VUs",
      severity: "High",
      category: "Performance",
      status: "VERIFIED FIXED",
      steps: [
        "1. Launch k6 load script with 500 virtual users.",
        "2. Profile initial render time of /dashboard page.",
      ],
      rca: "Unindexed SQL join on audit_logs table. Created composite index (user_id, created_at).",
      regressionTest: "k6/scenarios/dashboard-load.js",
      foundIn: "v2.4.1",
    },
    {
      id: "UI-884",
      title: "Dark mode theme toggle flickering during SSR hydration",
      severity: "Medium",
      category: "UI/UX",
      status: "CLOSED",
      steps: [
        "1. Reload page with dark mode enabled in localStorage.",
        "2. Observe 50ms white flash before dark stylesheet applies.",
      ],
      rca: "Theme script mounted after hydration. Moved theme initialization into inline head script.",
      regressionTest: "tests/visual/theme-hydration.test.ts",
      foundIn: "v2.4.2",
    },
  ]);

  const [severityFilter, setSeverityFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newSeverity, setNewSeverity] = useState<BugSeverity>("High");
  const [newCategory, setNewCategory] = useState<BugCategory>("API");
  const [newSteps, setNewSteps] = useState("");

  const filteredDefects = defects.filter((d) => {
    const matchesSeverity = severityFilter === "All" || d.severity === severityFilter;
    const matchesCategory = categoryFilter === "All" || d.category === categoryFilter;
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesCategory && matchesSearch;
  });

  const handleAddDefect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newBug: DefectItem = {
      id: `BUG-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTitle,
      severity: newSeverity,
      category: newCategory,
      status: "IN RETEST",
      steps: newSteps ? newSteps.split("\n") : ["1. Trigger edge case in application flow."],
      rca: "Logged via SQA Interactive Demo. Automated test spec auto-generated.",
      regressionTest: `cypress/e2e/${newCategory.toLowerCase()}-auto-spec.cy.ts`,
      foundIn: "v2.5.0-dev",
    };

    setDefects([newBug, ...defects]);
    setModalOpen(false);
    setNewTitle("");
    setNewSteps("");
  };

  return (
    <section id="bug-tracker" className="w-full px-4 sm:px-8 max-w-6xl mx-auto my-12">
      <div className="bg-[#f5f5f7] rounded-[36px] p-6 sm:p-12 border border-white/60 shadow-sm">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-sm">
            <Bug className="w-3.5 h-3.5 text-rose-500" />
            <span>Root Cause Analysis & Defects</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Defect Tracking & Regression Sandbox
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Detailed breakdown of real defects uncovered through automated testing, root cause analyses (RCA), and regression test specs.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 mb-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[180px] sm:min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search bugs or IDs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-xs font-medium text-slate-800 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-400"
              />
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5" />
              <span>Severity:</span>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="bg-slate-50 text-slate-800 text-xs font-medium px-2.5 py-1.5 rounded-xl border border-slate-200 focus:outline-none"
              >
                <option value="All">All Severities</option>
                <option value="Critical">Critical (P0)</option>
                <option value="High">High (P1)</option>
                <option value="Medium">Medium (P2)</option>
              </select>
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-600">
              <Tag className="w-3.5 h-3.5" />
              <span>Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-50 text-slate-800 text-xs font-medium px-2.5 py-1.5 rounded-xl border border-slate-200 focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="UI/UX">UI/UX</option>
                <option value="API">API</option>
                <option value="Security">Security</option>
                <option value="Performance">Performance</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#111111] hover:bg-[#262626] shadow-sm transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Log Defect</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDefects.map((bug) => (
            <div
              key={bug.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                    {bug.id}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-rose-50 text-rose-600 border border-rose-200 font-bold">
                    {bug.severity}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {bug.category}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{bug.status}</span>
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{bug.title}</h3>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1 text-xs">
                <div className="text-[10px] font-semibold text-slate-500 uppercase">Steps to Reproduce:</div>
                {bug.steps.map((st, idx) => (
                  <div key={idx} className="text-slate-700 font-mono text-[11px]">
                    {st}
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs space-y-1">
                <div className="text-[10px] font-semibold text-amber-800 uppercase flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-amber-600" />
                  Root Cause Analysis (RCA):
                </div>
                <p className="text-slate-700 text-[11px] leading-relaxed">{bug.rca}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1 text-slate-700 truncate max-w-[220px]">
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                  <span className="truncate">{bug.regressionTest}</span>
                </span>
                <span>Found in: {bug.foundIn}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredDefects.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs font-mono bg-white rounded-2xl p-6 border border-slate-200">
            No defects found matching current search filter.
          </div>
        )}

      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                <Bug className="w-4 h-4 text-rose-500" />
                <span>Log Simulated Defect</span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddDefect} className="space-y-3 text-xs font-medium text-slate-700">
              <div className="space-y-1">
                <label className="font-semibold">Defect Summary / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Memory leak in WebSocket reconnect loop..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold">Severity</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as BugSeverity)}
                    className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  >
                    <option value="Critical">Critical (P0)</option>
                    <option value="High">High (P1)</option>
                    <option value="Medium">Medium (P2)</option>
                    <option value="Low">Low (P3)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as BugCategory)}
                    className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  >
                    <option value="API">API</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Security">Security</option>
                    <option value="Performance">Performance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold">Steps to Reproduce</label>
                <textarea
                  rows={3}
                  placeholder="1. Open user settings...&#10;2. Click save profile..."
                  value={newSteps}
                  onChange={(e) => setNewSteps(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#111111] text-white font-semibold hover:bg-[#262626]"
                >
                  Save Defect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
