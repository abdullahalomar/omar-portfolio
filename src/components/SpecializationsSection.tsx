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
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-[#10b981] text-xs font-mono font-medium tracking-wider uppercase">
        <Wrench className="w-3.5 h-3.5" />
        <span>SPECIALIZATIONS</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          My <span className="text-emerald-500 dark:text-[#10b981]">Specializations</span>
        </h2>
        <p className="text-base text-slate-600 dark:text-[#999999] max-w-2xl">
          Comprehensive quality engineering solutions designed to automate manual effort, guarantee reliability, and accelerate product velocity.
        </p>
      </div>

      {/* Specializations List */}
      <div className="space-y-6 pt-2">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group p-8 lg:p-10 rounded-[32px] bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#2a2a2a] hover:border-emerald-500/40 dark:hover:border-[#10b981]/40 hover:bg-slate-50/50 dark:hover:bg-[#252525]/50 transition-all duration-300 flex flex-col justify-between min-h-[200px] shadow-sm dark:shadow-none"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-emerald-500 dark:group-hover:text-[#10b981]">
                    {item.title}
                  </h3>
                  <Icon className="w-8 h-8 text-emerald-500 dark:text-[#10b981] transition-transform duration-300 group-hover:scale-110" />
                </div>
                <p className="text-base text-slate-600 dark:text-[#999999] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-8 text-xs font-mono font-semibold tracking-wider text-slate-500 dark:text-[#888888] uppercase">
                {item.projects}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
