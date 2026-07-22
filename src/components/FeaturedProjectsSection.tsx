"use client";

import React, { useState } from "react";
import { 
  FolderKanban, 
  Play, 
  Terminal, 
  Loader2
} from "lucide-react";

export default function FeaturedProjectsSection() {
  const [activeTest, setActiveTest] = useState<string>("api-suite");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testLogs, setTestLogs] = useState<string[]>([]);
  const [testStats, setTestStats] = useState({ passed: 0, failed: 0, totalTime: "0.00s" });

  const runTestSimulation = (suiteKey: string) => {
    setIsRunning(true);
    setTestLogs([]);

    const suites: Record<string, { name: string; logs: string[]; passed: number; time: string }> = {
      "api-suite": {
        name: "FinTech Payment Gateway API Regression",
        logs: [
          "[INFO] Initializing Postman API Runner v10.2...",
          "[POST] /api/v1/auth/token -> 200 OK (42ms)",
          "[ASSERT] Bearer token JWT valid: PASSED",
          "[POST] /api/v1/checkout/stripe -> 201 Created (120ms)",
          "[ASSERT] Double charge idempotency check: PASSED",
          "[GET] /api/v1/transactions/tx_8891 -> 200 OK (35ms)",
          "[SUCCESS] 24/24 API Endpoints Verified. 0 Leaks Detected."
        ],
        passed: 24,
        time: "0.82s"
      },
      "e2e-suite": {
        name: "E-Commerce Checkout Playwright Suite",
        logs: [
          "[INFO] Launching Chromium, Firefox, WebKit browsers...",
          "[TEST] Adding item to cart & applying discount code...",
          "[ASSERT] Cart total calculation match: PASSED",
          "[TEST] Guest checkout form validation & credit card stripe element...",
          "[ASSERT] Order confirmation page URL redirected: PASSED",
          "[SUCCESS] 18/18 E2E Scenarios Passed. Flaky test rate: 0.00%"
        ],
        passed: 18,
        time: "2.14s"
      },
      "load-suite": {
        name: "JMeter 10,000 Virtual Users Load Benchmark",
        logs: [
          "[INFO] K6 / JMeter load test starting (Target: 10,000 VU)...",
          "[METRIC] 5,000 RPS achieved on Kubernetes Cluster...",
          "[METRIC] p95 Latency: 142ms (Threshold < 200ms): PASSED",
          "[METRIC] Error Rate: 0.00% across 50,000 HTTP requests",
          "[SUCCESS] System certified for Black Friday traffic spike!"
        ],
        passed: 50,
        time: "4.50s"
      }
    };

    const targetSuite = suites[suiteKey] || suites["api-suite"];
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < targetSuite.logs.length) {
        const line = targetSuite.logs[stepIndex];
        setTestLogs((prev) => [...prev, line]);
        stepIndex++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setTestStats({
          passed: targetSuite.passed,
          failed: 0,
          totalTime: targetSuite.time
        });
      }
    }, 400);
  };

  const projects = [
    {
      title: "FinTech Banking API Test Framework",
      desc: "Comprehensive automated API regression suite in Postman & REST Assured validating 150+ financial microservice endpoints.",
      tags: ["Postman", "REST Assured", "Java", "Docker"],
      stats: "150+ API Endpoints",
      link: "https://github.com",
    },
    {
      title: "Global E-Commerce Playwright E2E Suite",
      desc: "Cross-browser end-to-end automation framework executing parallel tests across Chromium, Firefox, and WebKit on GitHub Actions.",
      tags: ["Playwright", "TypeScript", "CI/CD", "Allure"],
      stats: "500+ Parallel Tests",
      link: "https://github.com",
    },
    {
      title: "Healthcare App Load & JMeter Benchmark",
      desc: "Distributed performance engineering simulating 20,000 concurrent patient portal sessions with real-time Grafana telemetry.",
      tags: ["JMeter", "K6", "Grafana", "InfluxDB"],
      stats: "20k VU Simulated",
      link: "https://github.com",
    },
  ];

  return (
    <section id="projects" className="scroll-mt-12 space-y-8 pt-6">
      {/* Tag */}
      <div className="section-tag">
        <FolderKanban className="w-3.5 h-3.5 text-sky-500 dark:text-[#38bdf8]" />
        <span>PORTFOLIO</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Featured <span className="text-sky-500 dark:text-[#38bdf8]">Projects</span> & Test Suites
        </h2>
        <p className="text-base text-slate-600 dark:text-[#999999] max-w-2xl">
          Real-world automation frameworks, CI pipelines, and performance benchmarks designed for enterprise reliability.
        </p>
      </div>

      {/* Projects Showcase Stream */}
      <div className="space-y-4">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#222222] hover:border-sky-500/40 dark:hover:border-[#38bdf8]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group shadow-sm dark:shadow-none"
          >
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-sky-600 dark:text-[#38bdf8] bg-sky-50 dark:bg-[#38bdf8]/10 px-2.5 py-0.5 rounded border border-sky-200 dark:border-[#38bdf8]/20">
                  {proj.stats}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-[#38bdf8] transition-colors">
                {proj.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-[#999999] leading-relaxed">
                {proj.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {proj.tags.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1c1c1c] text-slate-700 dark:text-[#aaaaaa] border border-slate-200 dark:border-[#2a2a2a]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 pt-2 md:pt-0">
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1e1e1e] hover:bg-sky-500 dark:hover:bg-[#38bdf8] text-slate-900 dark:text-white hover:text-white dark:hover:text-black font-mono font-bold text-xs border border-slate-200 dark:border-[#2a2a2a] transition-all"
              >
                <span>CODE REPO</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive SQA Test Runner Widget */}
      <div className="p-6 md:p-8 border border-sky-500/30 dark:border-[#38bdf8]/30 rounded-3xl bg-white dark:bg-[#161616] shadow-lg dark:shadow-none relative overflow-hidden space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-[#2a2a2a] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-[#38bdf8]/15 text-sky-500 dark:text-[#38bdf8] flex items-center justify-center border border-sky-200 dark:border-[#38bdf8]/30">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Interactive Live Test Execution Sandbox</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-[#38bdf8]/20 text-sky-600 dark:text-[#38bdf8]">LIVE</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#888888]">Run simulated automated suites directly from your browser</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={activeTest}
              onChange={(e) => setActiveTest(e.target.value)}
              className="bg-slate-100 dark:bg-[#1e1e1e] border border-slate-300 dark:border-[#333333] text-slate-900 dark:text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-sky-500 dark:focus:border-[#38bdf8]"
            >
              <option value="api-suite">FinTech Postman API Suite</option>
              <option value="e2e-suite">Playwright E2E Checkout Suite</option>
              <option value="load-suite">K6 10k VU Load Benchmark</option>
            </select>

            <button
              onClick={() => runTestSimulation(activeTest)}
              disabled={isRunning}
              className="px-4 py-2 rounded-lg bg-sky-500 dark:bg-[#38bdf8] hover:bg-sky-600 dark:hover:bg-[#0ea5e9] text-white dark:text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)] disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Suite</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Terminal Window */}
        <div className="bg-slate-900 dark:bg-[#0b0b0b] border border-slate-800 dark:border-[#262626] rounded-xl p-4 font-mono text-xs text-slate-200 dark:text-slate-300 min-h-[160px] max-h-[220px] overflow-y-auto space-y-1 shadow-inner">
          {testLogs.length === 0 && !isRunning && (
            <div className="text-slate-500 dark:text-[#666666] italic pt-8 text-center">
              Click &quot;Run Suite&quot; to launch live automated assertion tests...
            </div>
          )}
          {testLogs.map((log, lIdx) => (
            <div key={lIdx} className="flex items-center gap-2">
              <span className="text-sky-400 dark:text-[#38bdf8]">&gt;</span>
              <span className={log.includes("PASSED") || log.includes("SUCCESS") ? "text-sky-400 dark:text-[#38bdf8] font-semibold" : "text-slate-300"}>
                {log}
              </span>
            </div>
          ))}
        </div>

        {/* Test Execution Summary Telemetry */}
        {testStats.passed > 0 && (
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-200 dark:border-[#2a2a2a]">
            <div className="text-center">
              <div className="text-xs text-slate-500 dark:text-[#888888]">Passed Assertions</div>
              <div className="text-xl font-bold font-mono text-sky-500 dark:text-[#38bdf8]">{testStats.passed}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-500 dark:text-[#888888]">Defects Found</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">0</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-500 dark:text-[#888888]">Total Execution Time</div>
              <div className="text-xl font-bold font-mono text-sky-500 dark:text-[#38bdf8]">{testStats.totalTime}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
