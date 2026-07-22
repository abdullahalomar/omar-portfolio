"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
  Download,
  Sparkles,
  Check,
  FileCode,
  Cpu,
} from "lucide-react";
import confetti from "canvas-confetti";

interface TestStep {
  name: string;
  type: "PASS" | "FAIL" | "INFO";
  time: string;
  detail: string;
}

interface SuiteOption {
  id: string;
  name: string;
  framework: string;
  category: string;
  totalTests: number;
  durationEst: string;
  steps: TestStep[];
}

export default function InteractiveTestRunner() {
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>("e2e");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<TestStep[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const suites: SuiteOption[] = [
    {
      id: "e2e",
      name: "E2E User Checkout Flow",
      framework: "Playwright + TS",
      category: "End-to-End",
      totalTests: 6,
      durationEst: "2.4s",
      steps: [
        { name: "Launch Chromium Browser (Headless)", type: "INFO", time: "12ms", detail: "Viewport 1280x720, Geolocation: US" },
        { name: "Navigate to /checkout", type: "PASS", time: "140ms", detail: "HTTP 200 OK - Page interactive in 120ms" },
        { name: "Fill Shipping Info Form", type: "PASS", time: "85ms", detail: "Input fields validated without error states" },
        { name: "Apply Promo Code 'SQA2026'", type: "PASS", time: "90ms", detail: "Assert total discount updated to -$20.00" },
        { name: "Submit Stripe Payment Element", type: "PASS", time: "310ms", detail: "Tokenized payload verified via webhook" },
        { name: "Order Confirmation Modal Assert", type: "PASS", time: "65ms", detail: "Assert text 'Order #98421 Confirmed' visible" },
      ],
    },
    {
      id: "api",
      name: "API Security & Schema Regression",
      framework: "Postman / RestAssured",
      category: "API Testing",
      totalTests: 5,
      durationEst: "1.8s",
      steps: [
        { name: "POST /api/v1/auth/login", type: "PASS", time: "75ms", detail: "Assert Bearer JWT token returned with 24h exp" },
        { name: "GET /api/v1/user/profile (Auth Header)", type: "PASS", time: "42ms", detail: "Assert JSON Schema matches IUserProfile type" },
        { name: "POST /api/v1/data (OWASP SQLi Attack)", type: "PASS", time: "110ms", detail: "Assert HTTP 400 Bad Request - Parameter sanitized" },
        { name: "Rate Limit Stress: 50 requests/sec", type: "PASS", time: "320ms", detail: "Assert HTTP 429 Too Many Requests triggered on req #41" },
        { name: "DELETE /api/v1/admin/purge (Unauthorized)", type: "PASS", time: "38ms", detail: "Assert HTTP 403 Forbidden - Security policy intact" },
      ],
    },
    {
      id: "perf",
      name: "Load & Stress Performance Test",
      framework: "k6 / Grafana",
      category: "Performance",
      totalTests: 5,
      durationEst: "3.1s",
      steps: [
        { name: "Spinning up 500 Virtual Users (VUs)", type: "INFO", time: "200ms", detail: "Ramping up load pattern: Linear Step" },
        { name: "Measure p95 Response Time", type: "PASS", time: "410ms", detail: "p95 latency = 134ms (Threshold < 250ms)" },
        { name: "Measure Error Rate under 1k VUs", type: "PASS", time: "890ms", detail: "0.02% HTTP 500 rate (Threshold < 1.0%)" },
        { name: "Check Node Server Memory Profiling", type: "PASS", time: "650ms", detail: "Heap usage stable at 142MB (No leaks)" },
        { name: "Database Pool Connection Stress", type: "PASS", time: "300ms", detail: "Max pool utilization 68% - 0 connection drops" },
      ],
    },
    {
      id: "smoke",
      name: "CI/CD Pre-Deploy Smoke Suite",
      framework: "Cypress",
      category: "Smoke Testing",
      totalTests: 4,
      durationEst: "1.2s",
      steps: [
        { name: "Health Check /healthz", type: "PASS", time: "22ms", detail: "Database connection status: HEALTHY" },
        { name: "Critical DOM Elements Render", type: "PASS", time: "55ms", detail: "Header, Hero CTA, and Footer mounting without error" },
        { name: "CDN Asset Integrity Check", type: "PASS", time: "34ms", detail: "All JS bundles & CSS loaded with 200 OK" },
        { name: "Analytics Tracker Ping Verification", type: "PASS", time: "40ms", detail: "Segment & Mixpanel event payloads dispatched" },
      ],
    },
  ];

  const currentSuite = suites.find((s) => s.id === selectedSuiteId) || suites[0];

  const runSuite = () => {
    setIsRunning(true);
    setLogs([]);
    setProgress(0);
    setIsCompleted(false);

    let currentStep = 0;
    const totalSteps = currentSuite.steps.length;

    const interval = setInterval(() => {
      if (currentStep < totalSteps) {
        const step = currentSuite.steps[currentStep];
        setLogs((prev) => [...prev, step]);
        currentStep++;
        setProgress(Math.round((currentStep / totalSteps) * 100));

        if (logContainerRef.current) {
          logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setIsCompleted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#111111", "#10b981", "#3b82f6"],
        });
      }
    }, 450);
  };

  const resetRunner = () => {
    setIsRunning(false);
    setLogs([]);
    setProgress(0);
    setIsCompleted(false);
  };

  return (
    <section id="interactive-suite" className="w-full px-4 sm:px-8 max-w-6xl mx-auto my-12">
      <div className="bg-[#f5f5f7] rounded-[36px] p-6 sm:p-12 border border-white/60 shadow-sm">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-slate-800" />
            <span>Interactive Test Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Live Test Automation Runner
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Experience Abdullah&apos;s automated test suite in action. Select a framework below to execute real-time browser & API assertions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-4 space-y-3">
            {suites.map((suite) => {
              const isSelected = suite.id === selectedSuiteId;
              return (
                <button
                  key={suite.id}
                  onClick={() => {
                    if (!isRunning) {
                      setSelectedSuiteId(suite.id);
                      resetRunner();
                    }
                  }}
                  disabled={isRunning}
                  className={`w-full text-left p-4 rounded-2xl transition-all border ${
                    isSelected
                      ? "bg-white border-slate-900 shadow-md"
                      : "bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300"
                  } ${isRunning ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {suite.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {suite.durationEst}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-2 mb-1">{suite.name}</h3>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <FileCode className="w-3 h-3 text-slate-600" />
                      {suite.framework}
                    </span>
                    <span>{suite.totalTests} Specs</span>
                  </div>
                </button>
              );
            })}

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={runSuite}
                disabled={isRunning}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-sm ${
                  isRunning
                    ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                    : "bg-[#111111] hover:bg-[#262626] text-white hover:scale-105 active:scale-95"
                }`}
              >
                <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? "animate-spin" : ""}`} />
                <span>{isRunning ? "Running Suite..." : "Execute Test Suite"}</span>
              </button>

              <button
                onClick={resetRunner}
                disabled={isRunning || logs.length === 0}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-40"
                title="Reset Console"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[420px]">
              
              <div className="bg-slate-900 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-200">
                    Console: {currentSuite.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono">
                    {isRunning ? (
                      <span className="text-amber-400 font-bold animate-pulse">RUNNING...</span>
                    ) : isCompleted ? (
                      <span className="text-emerald-400 font-bold">100% PASSED</span>
                    ) : (
                      <span className="text-slate-400">READY</span>
                    )}
                  </span>
                  {isCompleted && (
                    <button
                      onClick={() => setReportModalOpen(true)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-mono hover:bg-emerald-500/30"
                    >
                      <Download className="w-3 h-3" />
                      <span>Report</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="w-full bg-slate-800 h-1 relative overflow-hidden">
                <div
                  className="bg-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div
                ref={logContainerRef}
                className="p-5 font-mono text-xs space-y-3 flex-1 overflow-y-auto max-h-[320px] bg-slate-950 text-slate-200"
              >
                {logs.length === 0 && !isRunning && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12 space-y-2">
                    <Cpu className="w-8 h-8 text-slate-700 animate-pulse" />
                    <p className="text-center text-xs">
                      Click <span className="text-slate-200 font-semibold">&quot;Execute Test Suite&quot;</span> to start test runner assertions.
                    </p>
                  </div>
                )}

                {logs.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 animate-in fade-in slide-in-from-left-2 duration-150"
                  >
                    {log.type === "PASS" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : log.type === "FAIL" ? (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    ) : (
                      <Terminal className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    )}

                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between text-slate-100">
                        <span className="font-semibold">{log.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono bg-slate-800 px-1.5 py-0.5 rounded">
                          {log.time}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px]">{log.detail}</p>
                    </div>
                  </div>
                ))}

                {isRunning && (
                  <div className="flex items-center gap-2 text-emerald-400 pt-2 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Executing step assertions...</span>
                  </div>
                )}

                {isCompleted && (
                  <div className="mt-3 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 space-y-1">
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-400" />
                        TEST SUITE EXECUTED SUCCESSFULLY
                      </span>
                      <span className="text-[10px] bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded font-mono">
                        {currentSuite.totalTests}/{currentSuite.totalTests} PASSED
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-900 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <div>Framework: <span className="text-slate-200">{currentSuite.framework}</span></div>
                <div>Status: <span className="text-emerald-400 font-bold">{logs.length} Passed</span></div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Allure Test Report Summary</span>
              </div>
              <button
                onClick={() => setReportModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-mono">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div>Suite Name: <span className="text-slate-900 font-bold">{currentSuite.name}</span></div>
                <div>Duration: <span className="text-slate-900">{currentSuite.durationEst}</span></div>
                <div>Pass Rate: <span className="text-emerald-600 font-bold">100%</span></div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-500 font-bold text-[10px] uppercase">Step Assertions:</div>
                {currentSuite.steps.map((st, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-100/70 p-2 rounded-lg">
                    <span>✓ {st.name}</span>
                    <span className="text-emerald-600 text-[10px] font-bold">{st.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setReportModalOpen(false)}
                className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
