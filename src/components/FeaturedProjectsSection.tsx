"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  FolderKanban, 
  Play, 
  Terminal, 
  Loader2, 
  Code, 
  RotateCcw,
  Wrench,
  CheckCircle2
} from "lucide-react";
import { usePortfolioData } from "@/context/PortfolioContext";
import { motion, AnimatePresence } from "framer-motion";

const projectRunnerData: Record<string, {
  imageUrl: string;
  steps: string[];
  logs: string[];
  successSummary: {
    title: string;
    metrics: string;
  };
}> = {
  "proj-1": {
    imageUrl: "/projects/project-1.png",
    steps: ["Setup", "Build", "E2E Playwright", "Report"],
    logs: [
      "[INFO] Launching Playwright E2E Runner v1.42...",
      "[INFO] Target: Chrome, Firefox, WebKit browsers",
      "[Chromium] Launching browser context...",
      "[Chromium] GET /login -> 200 OK (84ms)",
      "[Chromium] [ASSERT] Login validation: PASSED",
      "[Firefox] GET /cart -> 200 OK (112ms)",
      "[Firefox] [ASSERT] Cart total matching: PASSED",
      "[WebKit] POST /checkout -> 201 Created (142ms)",
      "[WebKit] [ASSERT] Order placement webhooks: PASSED",
      "[SUCCESS] 18/18 E2E Scenarios Passed. Flaky rate: 0.00%"
    ],
    successSummary: {
      title: "Playwright Suite Passed",
      metrics: "18 Tests Run • 0 Failed • 2.14s"
    }
  },
  "proj-2": {
    imageUrl: "/projects/project-2.png",
    steps: ["Setup", "Newman API", "Schema Check", "Report"],
    logs: [
      "[INFO] Initializing Postman API Runner v10.2...",
      "[POST] /api/v1/auth/token -> 200 OK (22ms)",
      "[ASSERT] Token validity and JWT validation: PASSED",
      "[GET] /api/v1/accounts/acc_9921 -> 200 OK (31ms)",
      "[ASSERT] JSON Schema matching OpenAPI spec: PASSED",
      "[POST] /api/v1/transfer -> 200 OK (110ms)",
      "[ASSERT] Transfer idempotency header check: PASSED",
      "[SUCCESS] 350+ API Endpoints Verified. 0 Leaks."
    ],
    successSummary: {
      title: "API Regressions Passed",
      metrics: "350+ API Tests • 0 Failed • 0.82s"
    }
  },
  "proj-3": {
    imageUrl: "/projects/project-3.png",
    steps: ["Setup", "K6 Cluster", "Load Injection", "Telemetry"],
    logs: [
      "[INFO] Starting distributed load test (Target: 10,000 VU)...",
      "[Load] 2,500 Virtual Users active...",
      "[Load] 5,000 Virtual Users active...",
      "[Metrics] RPS: 8,400 RPS | p95 Latency: 120ms (Threshold < 200ms): PASSED",
      "[Load] 10,000 Virtual Users active...",
      "[Metrics] RPS: 15,200 RPS | p95 Latency: 142ms (Threshold < 200ms): PASSED",
      "[Metrics] Error Rate: 0.00% across 50,000 requests.",
      "[SUCCESS] Distributed JMeter load benchmark completed."
    ],
    successSummary: {
      title: "Load Test Completed",
      metrics: "10,000 VUs • 15,200 max RPS • 4.50s"
    }
  }
};

export default function FeaturedProjectsSection() {
  const { projects } = usePortfolioData();

  const [runningState, setRunningState] = useState<Record<string, {
    status: "idle" | "running" | "completed";
    currentStep: number;
    logs: string[];
    progress: number;
  }>>({
    "proj-1": { status: "idle", currentStep: 0, logs: [], progress: 0 },
    "proj-2": { status: "idle", currentStep: 0, logs: [], progress: 0 },
    "proj-3": { status: "idle", currentStep: 0, logs: [], progress: 0 },
  });

  const intervalsRef = useRef<Record<string, NodeJS.Timeout>>({});

  const startTest = (projId: string) => {
    if (intervalsRef.current[projId]) {
      clearInterval(intervalsRef.current[projId]);
    }

    const data = projectRunnerData[projId];
    if (!data) return;

    setRunningState((prev) => ({
      ...prev,
      [projId]: { status: "running", currentStep: 0, logs: [], progress: 0 }
    }));

    let logIndex = 0;
    const totalLogs = data.logs.length;
    const totalSteps = data.steps.length;

    const interval = setInterval(() => {
      setRunningState((prev) => {
        const currentProj = prev[projId];
        if (logIndex < totalLogs) {
          const nextLogs = [...currentProj.logs, data.logs[logIndex]];
          const stepIndex = Math.min(
            Math.floor((logIndex / totalLogs) * totalSteps),
            totalSteps - 1
          );
          const nextProgress = Math.floor(((logIndex + 1) / totalLogs) * 100);
          logIndex++;
          return {
            ...prev,
            [projId]: {
              ...currentProj,
              logs: nextLogs,
              currentStep: stepIndex,
              progress: nextProgress
            }
          };
        } else {
          clearInterval(intervalsRef.current[projId]);
          return {
            ...prev,
            [projId]: {
              ...currentProj,
              status: "completed",
              progress: 100,
              currentStep: totalSteps - 1
            }
          };
        }
      });
    }, 450);

    intervalsRef.current[projId] = interval;
  };

  const resetTest = (projId: string) => {
    if (intervalsRef.current[projId]) {
      clearInterval(intervalsRef.current[projId]);
    }
    setRunningState((prev) => ({
      ...prev,
      [projId]: { status: "idle", currentStep: 0, logs: [], progress: 0 }
    }));
  };

  useEffect(() => {
    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, []);

  return (
    <section id="projects" className="scroll-mt-12 space-y-8 pt-6">
      {/* Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-[#10b981] text-xs font-mono font-medium tracking-wider uppercase">
        <FolderKanban className="w-3.5 h-3.5" />
        <span>PORTFOLIO</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Featured <span className="text-emerald-500 dark:text-[#10b981]">Projects</span> & Sandbox
        </h2>
        <p className="text-base text-slate-600 dark:text-[#999999] max-w-2xl">
          Real-world automation frameworks, CI pipelines, and performance benchmarks designed for enterprise reliability. Click "Run Live Test" on any card to see it in action.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="space-y-8 pt-2">
        {projects.map((proj) => {
          const runner = projectRunnerData[proj.id] || projectRunnerData["proj-1"];
          const state = runningState[proj.id] || { status: "idle", currentStep: 0, logs: [], progress: 0 };
          const isInteractive = state.status !== "idle";

          return (
            <div
              key={proj.id}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 lg:p-10 rounded-[32px] bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#2a2a2a] relative overflow-hidden shadow-sm dark:shadow-none transition-colors duration-300"
            >
              {/* Left Column: Project Info */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-[#10b981] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight transition-colors group-hover:text-emerald-500 dark:group-hover:text-[#10b981]">
                    {proj.title}
                  </h3>

                  {/* ROI / Impact metrics callout box */}
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 text-emerald-800 dark:text-emerald-400/90 text-xs leading-relaxed font-semibold font-mono">
                    📈 IMPACT: {proj.metrics}
                  </div>

                  <p className="text-sm md:text-base text-slate-600 dark:text-[#999999] leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#252525] text-slate-700 dark:text-[#aaaaaa] border border-slate-200 dark:border-[#333]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (state.status === "running") return;
                      if (state.status === "completed") resetTest(proj.id);
                      else startTest(proj.id);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 dark:bg-[#10b981] dark:hover:bg-[#059669] text-white dark:text-black font-bold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  >
                    {state.status === "running" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Executing Suite...</span>
                      </>
                    ) : state.status === "completed" ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Sandbox</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Run Live Test</span>
                      </>
                    )}
                  </button>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-[#252525] dark:hover:bg-[#2e2e2e] text-slate-900 dark:text-white font-semibold text-xs border border-slate-200 dark:border-[#333] transition-all"
                  >
                    <Code className="w-4 h-4" />
                    <span>Repository</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Sandbox Screen Panel */}
              <div className="lg:col-span-7 relative h-[300px] lg:h-auto min-h-[300px] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#151515] border border-slate-200 dark:border-[#2a2a2a] transition-all duration-300">
                <AnimatePresence mode="wait">
                  {!isInteractive ? (
                    <motion.div
                      key="mockup"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center"
                      onClick={() => startTest(proj.id)}
                    >
                      <img 
                        src={runner.imageUrl} 
                        alt={proj.title}
                        className="object-cover object-center w-full h-full select-none"
                      />
                      {/* Play overlay button on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-500 dark:bg-[#10b981] text-white dark:text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Play className="w-6 h-6 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="terminal"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="absolute inset-0 bg-[#0d0d0d] p-5 flex flex-col justify-between font-mono text-xs text-slate-300"
                    >
                      {/* Terminal Stepper Header */}
                      <div className="border-b border-zinc-800 pb-3 mb-3 shrink-0">
                        <div className="flex items-center justify-between text-zinc-500 mb-2">
                          <span className="flex items-center gap-1.5 text-[10px]">
                            <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                            AUTOMATED SUITE RUNNER
                          </span>
                          <span className="text-[10px] font-bold text-emerald-500">{state.progress}%</span>
                        </div>

                        {/* Pipeline Progress Indicator */}
                        <div className="flex items-center justify-between gap-1 pt-1 overflow-x-auto">
                          {runner.steps.map((step, sIdx) => {
                            const isActive = state.currentStep === sIdx && state.status === "running";
                            const isDone = state.currentStep > sIdx || state.status === "completed";
                            return (
                              <React.Fragment key={step}>
                                <div className="flex items-center gap-1 shrink-0">
                                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                                    isDone 
                                      ? "bg-emerald-500 text-white dark:bg-[#10b981] dark:text-black" 
                                      : isActive 
                                      ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500 animate-pulse" 
                                      : "bg-[#1e1e1e] text-zinc-600 border border-zinc-800"
                                  }`}>
                                    {isDone ? "✓" : sIdx + 1}
                                  </div>
                                  <span className={`text-[9px] ${
                                    isDone 
                                      ? "text-emerald-500 dark:text-[#10b981]" 
                                      : isActive 
                                      ? "text-slate-100 font-bold" 
                                      : "text-zinc-600"
                                  }`}>
                                    {step}
                                  </span>
                                </div>
                                {sIdx < runner.steps.length - 1 && (
                                  <div className={`h-[1px] flex-1 min-w-[10px] ${isDone ? "bg-emerald-500/40" : "bg-zinc-800"}`} />
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>

                      {/* Logs Output */}
                      <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 select-none scrollbar-thin scrollbar-thumb-zinc-800">
                        {state.logs.map((log, lIdx) => (
                          <div key={lIdx} className="flex items-start gap-2 leading-relaxed text-[11px]">
                            <span className="text-emerald-500 select-none">&gt;</span>
                            <span className={log.includes("SUCCESS") || log.includes("PASSED") ? "text-emerald-400 font-semibold" : "text-zinc-300"}>
                              {log}
                            </span>
                          </div>
                        ))}
                        {state.status === "running" && (
                          <div className="flex items-center gap-1.5 text-emerald-500 font-bold animate-pulse text-[11px]">
                            <span>&gt;</span>
                            <span className="w-1.5 h-3 bg-emerald-500" />
                          </div>
                        )}
                      </div>

                      {/* Success HUD */}
                      {state.status === "completed" && (
                        <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between bg-emerald-950/20 -mx-5 -mb-5 p-4 rounded-b-2xl shrink-0">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            <div>
                              <div className="text-[11px] font-bold text-white uppercase tracking-wider">{runner.successSummary.title}</div>
                              <div className="text-[9px] text-zinc-400">{runner.successSummary.metrics}</div>
                            </div>
                          </div>

                          <button
                            onClick={() => resetTest(proj.id)}
                            className="px-3 py-1 rounded bg-[#1c1c1c] hover:bg-[#252525] text-zinc-400 hover:text-white border border-zinc-800 transition-all text-[10px]"
                          >
                            Close Terminal
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
