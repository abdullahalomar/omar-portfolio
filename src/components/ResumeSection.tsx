"use client";

import React from "react";
import { Briefcase, GraduationCap, Building2 } from "lucide-react";

export default function ResumeSection() {
  const experiences = [
    {
      period: "2023 - Present",
      role: "Lead SQA & Automation Engineer",
      company: "Enterprise QA Labs",
      description: "Spearheaded enterprise Playwright & Cypress automation architecture across 12 microservices. Reduced release regression cycle duration from 5 days to 45 minutes with parallel Docker execution.",
      skills: ["Playwright", "TypeScript", "CI/CD", "Docker", "JMeter", "K8s"],
    },
    {
      period: "2021 - 2023",
      role: "Senior Automation QA Engineer",
      company: "FinTech Quality Systems",
      description: "Built end-to-end API test suites using Postman and REST Assured for high-volume payment processing systems. Achieved 99.8% test coverage and eliminated critical production leaks.",
      skills: ["Postman", "REST Assured", "Java", "Selenium", "SQL", "Jenkins"],
    },
    {
      period: "2019 - 2021",
      role: "Software QA Engineer",
      company: "Apex Tech Studios",
      description: "Executed functional, cross-browser, and mobile app testing using Appium & Selenium. Collaborated with dev teams to implement zero-bug bounce release policies.",
      skills: ["Selenium", "Appium", "JIRA", "TestNG", "Git", "BrowserStack"],
    },
  ];

  const education = [
    {
      period: "2015 - 2019",
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "Dhaka University of Engineering & Technology",
      description: "Focused on Software Engineering, Database Systems, Automated Software Testing, and Operating Systems. Graduated with Honors.",
    },
  ];

  return (
    <section id="resume" className="scroll-mt-12 space-y-8 pt-6">
      {/* Tag */}
      <div className="section-tag">
        <Briefcase className="w-3.5 h-3.5 text-sky-500 dark:text-[#38bdf8]" />
        <span>RESUME</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Education & <span className="text-sky-500 dark:text-[#38bdf8]">Experience</span>
        </h2>
      </div>

      {/* Experience Timeline Stream */}
      <div className="relative border-l-2 border-slate-200 dark:border-[#2a2a2a] ml-4 pl-6 md:pl-8 space-y-10">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative group">
            {/* Glowing timeline node dot */}
            <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-slate-50 dark:bg-[#111111] border-2 border-sky-500 dark:border-[#38bdf8] group-hover:bg-sky-500 dark:group-hover:bg-[#38bdf8] group-hover:scale-125 transition-all shadow-[0_0_12px_rgba(56,189,248,0.6)]" />

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-[#38bdf8] px-3 py-0.5 rounded-full bg-sky-50 dark:bg-[#38bdf8]/10 border border-sky-200 dark:border-[#38bdf8]/30">
                  {exp.period}
                </span>
                <span className="text-xs text-slate-600 dark:text-[#aaaaaa] font-medium flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-sky-500 dark:text-[#38bdf8]" />
                  {exp.company}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-[#38bdf8] transition-colors">
                {exp.role}
              </h3>

              <p className="text-sm text-slate-600 dark:text-[#999999] leading-relaxed max-w-2xl">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {exp.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-[#cccccc] border border-slate-200 dark:border-[#2a2a2a] hover:border-sky-500/40 dark:hover:border-[#38bdf8]/40 transition-colors"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Education Block */}
      <div className="pt-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-sky-500 dark:text-[#38bdf8]" />
          <span>Academic Foundation</span>
        </h3>

        <div className="relative border-l-2 border-slate-200 dark:border-[#2a2a2a] ml-4 pl-6 md:pl-8 space-y-6">
          {education.map((edu, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-slate-50 dark:bg-[#111111] border-2 border-sky-500 dark:border-[#38bdf8] group-hover:bg-sky-500 dark:group-hover:bg-[#38bdf8] transition-all" />

              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-sky-600 dark:text-[#38bdf8] px-3 py-0.5 rounded-full bg-sky-50 dark:bg-[#38bdf8]/10 border border-sky-200 dark:border-[#38bdf8]/30">
                    {edu.period}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-[#aaaaaa] font-medium">{edu.institution}</span>
                </div>
                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">{edu.degree}</h4>
                <p className="text-sm text-slate-600 dark:text-[#999999] max-w-2xl leading-relaxed">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
