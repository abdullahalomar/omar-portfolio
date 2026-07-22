"use client";

import React from "react";
import { 
  Wrench, 
  Terminal, 
  Cpu, 
  Gauge, 
  Smartphone, 
  GitBranch, 
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";

export default function SpecializationsSection() {
  const services = [
    {
      icon: Terminal,
      title: "Test Automation Frameworks",
      desc: "Building scalable, maintainable Page Object Model (POM) suites in TypeScript/Python using Playwright, Selenium, and Cypress with zero flaky tests.",
      projects: "45+ Frameworks Built",
    },
    {
      icon: Cpu,
      title: "API & Microservices Testing",
      desc: "Automating REST, GraphQL, and gRPC endpoints with Postman, REST Assured, and Karat. Contract validation and automated schema regression.",
      projects: "300+ Endpoints Tested",
    },
    {
      icon: Gauge,
      title: "Performance & Load Engineering",
      desc: "Simulating tens of thousands of concurrent users using JMeter & K6. Bottleneck identification, API response latency profiling & Grafana dashboards.",
      projects: "50+ Load Audits",
    },
    {
      icon: Smartphone,
      title: "Mobile App QA (iOS & Android)",
      desc: "Automating native and hybrid mobile app testing using Appium & BrowserStack across physical devices and emulators.",
      projects: "25+ Apps Certified",
    },
    {
      icon: GitBranch,
      title: "CI/CD & Quality Gates",
      desc: "Embedding automated quality checks into GitHub Actions, Jenkins, and GitLab CI pipelines to prevent buggy code from merging into main.",
      projects: "60+ CI Pipelines",
    },
    {
      icon: ShieldAlert,
      title: "Security & Vulnerability QA",
      desc: "Performing OWASP Top 10 security audits, SQL injection prevention checks, XSS payload testing, and API authentication validation.",
      projects: "40+ Security Audits",
    },
  ];

  return (
    <section id="services" className="scroll-mt-12 space-y-8 pt-6">
      {/* Tag */}
      <div className="section-tag">
        <Wrench className="w-3.5 h-3.5 text-sky-500 dark:text-[#38bdf8]" />
        <span>SPECIALIZATIONS</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Key <span className="text-sky-500 dark:text-[#38bdf8]">Specializations</span>
        </h2>
        <p className="text-base text-slate-600 dark:text-[#999999] max-w-2xl">
          Comprehensive quality engineering solutions designed to automate manual effort, guarantee reliability, and accelerate product velocity.
        </p>
      </div>

      {/* Specializations Matrix */}
      <div className="space-y-4 pt-2">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group py-6 px-6 rounded-2xl bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-[#1a1a1a] border border-slate-200 dark:border-[#222222] hover:border-sky-500/40 dark:hover:border-[#38bdf8]/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-sm dark:shadow-none"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-[#38bdf8]/10 text-sky-500 dark:text-[#38bdf8] flex items-center justify-center shrink-0 border border-sky-200 dark:border-[#38bdf8]/20 group-hover:bg-sky-500 dark:group-hover:bg-[#38bdf8] group-hover:text-white dark:group-hover:text-black transition-all">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-sky-500 dark:text-[#38bdf8] font-bold">0{idx + 1}.</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-[#38bdf8] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-[#999999] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-[#222222]">
                <span className="text-xs font-mono text-slate-600 dark:text-[#aaaaaa] px-3 py-1 rounded-full bg-slate-100 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#2a2a2a]">
                  {item.projects}
                </span>

                <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-[#1c1c1c] group-hover:bg-sky-500 dark:group-hover:bg-[#38bdf8] text-slate-500 dark:text-[#888888] group-hover:text-white dark:group-hover:text-black flex items-center justify-center transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
