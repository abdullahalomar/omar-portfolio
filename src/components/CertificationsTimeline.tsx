"use client";

import React from "react";
import {
  Award,
  CheckCircle2,
  Quote,
  Star,
  Building2,
} from "lucide-react";
import { usePortfolioData } from "@/context/PortfolioContext";

export default function CertificationsTimeline() {
  const { certifications, profile } = usePortfolioData();

  const defaultCerts = [
    {
      title: "ISTQB Certified Test Automation Engineer (CTAE)",
      issuer: "International Software Testing Qualifications Board",
      date: "Issued 2022",
      badge: "Advanced Level",
    },
    {
      title: "Postman API Automation Specialist",
      issuer: "Postman Academy",
      date: "Issued 2023",
      badge: "Verified Expert",
    },
    {
      title: "AWS DevOps & SQA Cloud Specialist",
      issuer: "Amazon Web Services",
      date: "Issued 2024",
      badge: "Cloud Certified",
    },
  ];

  const mappedContextCerts = certifications.map((c) => ({
    title: c.title,
    issuer: c.issuer,
    date: `Issued ${c.date}`,
    badge: c.badge || "Certified",
  }));

  const displayCerts = mappedContextCerts.length > 0 ? mappedContextCerts : defaultCerts;

  const experiences = [
    {
      role: "SQA & Test Automation Lead",
      company: "TechCorp Global",
      period: "2023 - Present",
      location: "Remote",
      achievements: [
        "Architected enterprise-wide Playwright + TypeScript E2E test suite covering 14 micro-frontends.",
        "Reduced regression run duration from 96 hours manual effort down to 18 minutes parallel CI execution.",
        "Mentored a team of 8 SQA engineers in BDD patterns, API mocking, and Docker containerized testing.",
      ],
    },
    {
      role: "Software Quality Assurance Engineer",
      company: "DataScale Cloud Systems",
      period: "2021 - 2023",
      location: "Dhaka, Bangladesh",
      achievements: [
        "Built automated Postman Newman API security sweep integrated into GitHub Actions PR quality gates.",
        "Executed k6 load profiling simulating 5,000 virtual users during major product feature rollouts.",
        "Maintained 0.00% flaky test spec rate across 1,000+ daily Cypress test executions.",
      ],
    },
  ];

  const testimonials = [
    {
      quote:
        `${profile.name || "Abdullah"} revolutionized our software release strategy. Before joining, every release was stressful with unexpected bugs. Now our releases are automated, reliable, and completely stress-free.`,
      author: "Marcus Vance",
      title: "VP of Engineering at TechCorp Global",
    },
    {
      quote:
        `${profile.name || "Abdullah"} writes test automation code cleaner than most senior developers write application code! The Playwright framework designed by him is the golden standard across our entire organization.`,
      author: "Sarah Jenkins",
      title: "Chief Technology Officer at DataScale",
    },
  ];

  return (
    <section className="py-20 bg-[#090d16] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Recognized Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Industry <span className="text-gradient-cyan">Certifications & Leadership</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {displayCerts.map((c, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 border-slate-800 hover:border-amber-500/40 transition-all bg-[#0c1222] space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30 font-bold">
                  {c.badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug">{c.title}</h3>
              <p className="text-xs text-slate-400 font-mono">{c.issuer}</p>
              <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800">
                {c.date}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono">
              <Building2 className="w-3.5 h-3.5" />
              <span>Career Trajectory</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Professional <span className="text-gradient-cyan">Work History</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              5+ years leading software quality engineering teams, establishing automated CI/CD quality gates, and eliminating production defect leakage.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-10 space-y-2 group">
                <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-[#090d16] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>

                <div className="glass-card rounded-2xl p-6 border-slate-800 bg-[#0c1222] space-y-3 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <span className="text-xs font-mono text-cyan-400">{exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-mono">
              <Quote className="w-3.5 h-3.5" />
              <span>Engineering Endorsements</span>
            </div>
            <h2 className="text-2xl font-bold text-white">What Leaders Say About My SQA Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 border-slate-800 bg-[#0a0f1d] space-y-4 shadow-xl">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-sm font-bold text-white">{t.author}</div>
                  <div className="text-xs text-cyan-400 font-mono">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
