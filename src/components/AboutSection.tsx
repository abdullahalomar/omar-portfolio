"use client";

import React from "react";
import { User, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const highlights = [
    {
      title: "Shift-Left Quality Testing",
      desc: "Integrating test automation directly into developer commit workflows and PR quality gates.",
    },
    {
      title: "Resilient Framework Architecture",
      desc: "Designing Page Object Model (POM) and BDD suites with Playwright & Selenium that eliminate flaky tests.",
    },
    {
      title: "High-Concurrency Performance Profiling",
      desc: "Simulating tens of thousands of active virtual users with JMeter & K6 to identify database bottlenecks.",
    },
    {
      title: "End-to-End API Security & Mocking",
      desc: "Validating REST, GraphQL & gRPC endpoints with Postman, REST Assured, and automated contract testing.",
    },
  ];

  return (
    <section id="about" className="scroll-mt-12 space-y-8 pt-6">
      {/* Tag */}
      <div className="section-tag">
        <User className="w-3.5 h-3.5 text-sky-500 dark:text-[#38bdf8]" />
        <span>ABOUT ME</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Every defect caught early saves <span className="text-sky-500 dark:text-[#38bdf8]">10x cost & effort</span> in production.
        </h2>
        <p className="text-base text-slate-600 dark:text-[#999999] leading-relaxed max-w-2xl">
          I am Abdullah Al Omar, a dedicated Software Quality Assurance Engineer. My approach goes beyond manual bug hunting — I engineer scalable test automation frameworks, continuous testing pipelines, and comprehensive quality assurance systems that empower software teams to ship fast with 100% confidence.
        </p>
      </div>

      {/* Feature Stream List */}
      <div className="space-y-4 pt-2">
        {highlights.map((item, idx) => (
          <div 
            key={idx}
            className="group relative p-5 rounded-2xl bg-white dark:bg-[#161616]/80 hover:bg-slate-50 dark:hover:bg-[#1e1e1e] border-l-4 border-l-sky-500/40 dark:border-l-[#38bdf8]/30 hover:border-l-sky-500 dark:hover:border-l-[#38bdf8] border-t border-r border-b border-slate-200 dark:border-[#262626] transition-all duration-300 flex items-start gap-5 shadow-sm dark:shadow-none"
          >
            <div className="text-xl font-mono font-bold text-sky-500/70 dark:text-[#38bdf8]/60 group-hover:text-sky-500 dark:group-hover:text-[#38bdf8] transition-colors shrink-0 pt-0.5">
              0{idx + 1}
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-[#38bdf8] transition-colors flex items-center gap-2">
                <span>{item.title}</span>
                <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#999999] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
