"use client";

import React, { useState } from "react";
import { Zap, CheckCircle2, Layers } from "lucide-react";

export default function TechSkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Automation", "API & Load", "DevOps & DB"];

  const skills = [
    { name: "Playwright", level: "EXPERT", category: "Automation", icon: "🎭", desc: "POM Frameworks, Parallel Execution & WebKit" },
    { name: "Postman & REST", level: "EXPERT", category: "API & Load", icon: "🚀", desc: "API Suites, Newman CLI & Contract Tests" },
    { name: "Python & TypeScript", level: "EXPERT", category: "Automation", icon: "🐍", desc: "Type-Safe Automation & Scripting" },
    { name: "JMeter & K6", level: "PRO", category: "API & Load", icon: "⚡", desc: "20k+ VU Load Tests & Telemetry" },
    { name: "Selenium WebDriver", level: "EXPERT", category: "Automation", icon: "🌐", desc: "Grid 4, Cross-Browser Suites" },
    { name: "Cypress", level: "PRO", category: "Automation", icon: "🌲", desc: "Component & Fast End-to-End QA" },
    { name: "Docker & CI/CD", level: "PRO", category: "DevOps & DB", icon: "🐳", desc: "GitHub Actions & Pipeline Gates" },
    { name: "SQL & DB Testing", level: "EXPERT", category: "DevOps & DB", icon: "🗄️", desc: "Data Integrity & Complex Queries" },
  ];

  const filteredSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  const tagCloud = [
    "Playwright", "Selenium Grid", "Cypress", "Postman", "REST Assured",
    "JMeter", "K6", "Appium", "Docker", "GitHub Actions",
    "Jenkins", "GitLab CI", "Allure Reports", "Grafana", "InfluxDB",
    "TypeScript", "Python", "Java", "SQL", "gRPC / GraphQL"
  ];

  return (
    <section id="skills" className="scroll-mt-12 space-y-8 pt-6">
      {/* Tag */}
      <div className="section-tag">
        <Zap className="w-3.5 h-3.5 text-sky-500 dark:text-[#38bdf8]" />
        <span>SKILLS & STACK</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Tech Stack <span className="text-sky-500 dark:text-[#38bdf8]">& Ecosystem</span>
        </h2>
        <p className="text-base text-slate-600 dark:text-[#999999] max-w-2xl">
          Core testing technologies, frameworks, and continuous delivery tools I leverage to engineer defect-free software.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-slate-200 dark:border-[#222222] pb-4">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-mono text-xs font-semibold transition-all ${
              activeCategory === cat
                ? "bg-sky-500 dark:bg-[#38bdf8] text-white dark:text-black shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                : "bg-white dark:bg-[#161616] text-slate-600 dark:text-[#aaaaaa] hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#2a2a2a] hover:border-sky-500/30 dark:hover:border-[#38bdf8]/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Skill Badge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#222222] hover:border-sky-500/40 dark:hover:border-[#38bdf8]/40 hover:bg-slate-50 dark:hover:bg-[#181818] transition-all duration-300 group flex items-start gap-4 shadow-sm dark:shadow-none"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#2a2a2a] flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 group-hover:border-sky-500/40 dark:group-hover:border-[#38bdf8]/40 transition-all">
              {skill.icon}
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-[#38bdf8] transition-colors truncate">
                  {skill.name}
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-50 dark:bg-[#38bdf8]/10 text-sky-600 dark:text-[#38bdf8] border border-sky-200 dark:border-[#38bdf8]/20 shrink-0">
                  {skill.level}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-[#999999] leading-relaxed">
                {skill.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Ecosystem Tag Cloud */}
      <div className="pt-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-[#888888]">
          <Layers className="w-4 h-4 text-sky-500 dark:text-[#38bdf8]" />
          <span>EVERYDAY TOOLING & FRAMEWORKS</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tagCloud.map((tag, tIdx) => (
            <div
              key={tIdx}
              className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#161616] hover:bg-sky-50 dark:hover:bg-[#38bdf8]/10 border border-slate-200 dark:border-[#2a2a2a] hover:border-sky-500/40 dark:hover:border-[#38bdf8]/40 text-xs font-mono text-slate-700 dark:text-[#cccccc] hover:text-sky-600 dark:hover:text-[#38bdf8] transition-all cursor-default flex items-center gap-1.5 shadow-sm dark:shadow-none"
            >
              <CheckCircle2 className="w-3 h-3 text-sky-500 dark:text-[#38bdf8]" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
