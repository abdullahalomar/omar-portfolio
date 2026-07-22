"use client";

import React, { useState } from "react";
import {
  Briefcase,
  ArrowUpRight,
  CheckCircle2,
  Award,
} from "lucide-react";

interface ProjectCase {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  roiStats: { label: string; value: string }[];
  problem: string;
  sqaStrategy: string;
  toolsUsed: string[];
  keyOutcomes: string[];
}

export default function CaseStudies() {
  const projects: ProjectCase[] = [
    {
      id: "fintech-automation",
      title: "FinTech Banking E2E Test Automation Suite",
      subtitle: "Scaled Playwright test framework across 14 micro-frontends with zero flakiness.",
      category: "E2E Test Automation",
      roiStats: [
        { label: "Defect Reduction", value: "99.8%" },
        { label: "CI/CD Speedup", value: "75%" },
        { label: "E2E Specs", value: "1,200+" },
      ],
      problem:
        "Manual regression testing took 4 days before every bi-weekly release, causing release bottlenecks and high defect leakage into production.",
      sqaStrategy:
        "Engineered a parallel Playwright + TypeScript automation architecture inside Docker containers, integrated with GitHub Actions quality gates and Allure HTML reporting.",
      toolsUsed: ["Playwright", "TypeScript", "Docker", "GitHub Actions", "Allure Reports", "Stripe API"],
      keyOutcomes: [
        "Reduced 4-day manual regression cycle down to 18 minutes automated CI run.",
        "Zero P0 critical defects leaked to production over 12 consecutive months.",
        "Created reusable page object models (POM) adopted across 3 agile teams.",
      ],
    },
    {
      id: "api-security",
      title: "Healthcare SaaS API Security & Compliance Audit",
      subtitle: "HIPAA-compliant REST API automated testing pipeline and vulnerability scanner.",
      category: "API & Security Audit",
      roiStats: [
        { label: "Vulnerabilities Found", value: "34" },
        { label: "API Endpoints Covered", value: "100%" },
        { label: "Compliance Pass", value: "HIPAA Valid" },
      ],
      problem:
        "Legacy API endpoints lacked schema validation and OWASP security checks, putting sensitive patient health records at risk.",
      sqaStrategy:
        "Built automated Postman Newman CLI collection sweeps and OWASP ZAP security scans into the PR validation pipeline.",
      toolsUsed: ["Postman", "Newman", "OWASP ZAP", "RestAssured", "Swagger", "Jira"],
      keyOutcomes: [
        "Uncovered and resolved 34 API parameter injection and authorization flaw vulnerabilities prior to audit.",
        "Achieved 100% JSON schema contract coverage across all 82 REST microservices.",
        "Standardized API error response standards across engineering squads.",
      ],
    },
    {
      id: "load-k6",
      title: "Black Friday E-Commerce Load & Stress Benchmark",
      subtitle: "High-throughput performance profiling using k6, JMeter, and Grafana dashboards.",
      category: "Performance Engineering",
      roiStats: [
        { label: "Peak Load Tested", value: "5,000 VUs" },
        { label: "p95 Latency SLA", value: "< 160ms" },
        { label: "Uptime Achieved", value: "99.99%" },
      ],
      problem:
        "Previous Black Friday traffic caused database connection pool starvation and cart timeout errors for 15% of checkout users.",
      sqaStrategy:
        "Simulated peak traffic spikes of 5,000 concurrent virtual users (VUs) using distributed k6 cloud nodes and profiled PostgreSQL query performance.",
      toolsUsed: ["k6", "JMeter", "Grafana", "InfluxDB", "PostgreSQL", "AWS ECS"],
      keyOutcomes: [
        "Identified database connection pool bottleneck; optimized pool size to handle 10k req/sec.",
        "Zero downtime recorded during Black Friday traffic spike processing $4.2M in sales.",
        "Established SLA thresholds integrated directly into CI/CD deployment pipelines.",
      ],
    },
  ];

  const [activeProject, setActiveProject] = useState<ProjectCase | null>(null);

  return (
    <section id="projects" className="w-full px-4 sm:px-8 max-w-6xl mx-auto my-12">
      <div className="bg-[#f5f5f7] rounded-[36px] p-6 sm:p-12 border border-white/60 shadow-sm">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-sm">
            <Briefcase className="w-3.5 h-3.5 text-slate-800" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SQA Projects & Case Studies
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Real-world software quality engineering projects delivering measurable speed, cost savings, and zero-defect deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {proj.category}
                  </span>
                  <Award className="w-4 h-4 text-amber-500" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-slate-700 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{proj.subtitle}</p>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  {proj.roiStats.map((st, i) => (
                    <div key={i} className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-center">
                      <div className="text-sm font-extrabold text-slate-900 font-mono">{st.value}</div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveProject(proj)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full font-semibold text-xs text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all"
              >
                <span>View Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white max-w-xl w-full rounded-3xl p-6 shadow-xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-semibold text-slate-500">{activeProject.category}</span>
                <h3 className="text-lg font-bold text-slate-900">{activeProject.title}</h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="text-slate-400 hover:text-slate-800 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-rose-50/50 p-3.5 rounded-2xl border border-rose-200/60 space-y-1">
                <span className="font-bold text-rose-700 uppercase text-[10px]">The Challenge:</span>
                <p className="leading-relaxed">{activeProject.problem}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="font-bold text-slate-900 uppercase text-[10px]">SQA Strategy:</span>
                <p className="leading-relaxed">{activeProject.sqaStrategy}</p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900 uppercase text-[10px]">Outcomes & Impact:</span>
                <div className="space-y-1.5">
                  {activeProject.keyOutcomes.map((out, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Tech Stack:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.toolsUsed.map((tool, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-mono text-[11px]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setActiveProject(null)}
                className="px-5 py-2 rounded-full bg-[#111111] text-white font-semibold text-xs"
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
