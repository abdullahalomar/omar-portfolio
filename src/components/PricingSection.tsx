"use client";

import React from "react";
import { Tag, Check, ArrowRight, Sparkles } from "lucide-react";

export default function PricingSection() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const plans = [
    {
      title: "QA & Automation Audit",
      price: "$490",
      period: "per audit",
      popular: false,
      description: "Thorough review of your current test suites, flaky test identification, CI/CD pipeline diagnosis, and performance bottleneck report.",
      features: [
        "Full Code Review of Test Suites",
        "Flaky Test Identification",
        "CI/CD Quality Gate Healthcheck",
        "OWASP Basic Security Scan",
        "Comprehensive PDF Recommendations",
      ],
    },
    {
      title: "Full-Stack Automation Framework",
      price: "$1,850",
      period: "per project",
      popular: true,
      description: "Complete custom Playwright/Selenium & Postman test framework setup integrated directly into your GitHub Actions or Jenkins CI pipeline.",
      features: [
        "Custom Playwright / Cypress Setup",
        "Postman / REST Assured API Suite",
        "GitHub Actions CI/CD Integration",
        "Allure / HTML Test Reports",
        "Parallel Cross-Browser Execution",
        "30 Days Post-Delivery Support",
      ],
    },
    {
      title: "Dedicated SQA Lead Consulting",
      price: "$3,200",
      period: "per month",
      popular: false,
      description: "End-to-end quality assurance engineering for startup or enterprise dev teams. Full ownership of manual & automated testing.",
      features: [
        "Full Test Automation Ownership",
        "Sprint Planning & User Story QA",
        "Load & Performance Benchmark",
        "API & UI Automated Regression",
        "Daily JIRA Bug Tracking & Telemetry",
        "Unlimited Slack / Teams Sync",
      ],
    },
  ];

  return (
    <section id="pricing" className="scroll-mt-12 space-y-8 pt-6">
      {/* Tag */}
      <div className="section-tag">
        <Tag className="w-3.5 h-3.5 text-[#38bdf8]" />
        <span>PRICING</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          QA Services & <span className="text-[#38bdf8]">Packages</span>
        </h2>
        <p className="text-base text-[#999999] max-w-2xl">
          Transparent pricing options tailored for fast-moving software startups and enterprise tech teams.
        </p>
      </div>

      {/* Pricing Tier Panels - High distinction layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`p-6 md:p-8 rounded-3xl flex flex-col justify-between relative transition-all duration-300 ${
              plan.popular
                ? "bg-gradient-to-b from-[#1c2e24] via-[#161616] to-[#161616] border-2 border-[#38bdf8] shadow-[0_0_35px_rgba(56,189,248,0.2)] md:-translate-y-2"
                : "bg-[#141414] border border-[#242424] hover:border-[#38bdf8]/30"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#38bdf8] text-black font-extrabold text-[10px] uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>RECOMMENDED PACKAGE</span>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-2">{plan.title}</h3>
                <p className="text-xs text-[#999999] leading-relaxed">{plan.description}</p>
              </div>

              <div className="pt-4 border-t border-[#2a2a2a] flex items-baseline gap-1.5">
                <span className="text-4xl md:text-5xl font-extrabold text-[#38bdf8] font-mono tracking-tight">{plan.price}</span>
                <span className="text-xs text-[#888888] font-medium">{plan.period}</span>
              </div>

              <ul className="space-y-3 pt-2">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#dddddd]">
                    <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={scrollToContact}
              className={`mt-8 w-full py-3.5 px-4 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                plan.popular
                  ? "bg-[#38bdf8] hover:bg-[#0ea5e9] text-black shadow-[0_0_25px_rgba(56,189,248,0.4)]"
                  : "bg-[#1e1e1e] hover:bg-[#38bdf8] text-white hover:text-black border border-[#2a2a2a]"
              }`}
            >
              <span>CHOOSE PACKAGE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
