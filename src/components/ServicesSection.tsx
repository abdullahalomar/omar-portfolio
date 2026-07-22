"use client";

import React from "react";
import { Monitor, Smartphone, Palette, Code2 } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: <Monitor className="w-6 h-6 text-slate-800 stroke-[1.75]" />,
      title: "Test Automation (E2E & UI)",
      description: "Designing flaky-free automated test suites using Playwright, Cypress, and Selenium for flawless digital experiences.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-slate-800 stroke-[1.75]" />,
      title: "API & Microservices Testing",
      description: "Validating REST, GraphQL, and microservice APIs with Postman, REST Assured, and automated security assertion scripts.",
    },
    {
      icon: <Palette className="w-6 h-6 text-slate-800 stroke-[1.75]" />,
      title: "Performance & Stress Testing",
      description: "Executing high-concurrency load benchmarks with JMeter and k6 to isolate backend bottlenecks before launch.",
    },
    {
      icon: <Code2 className="w-6 h-6 text-slate-800 stroke-[1.75]" />,
      title: "CI/CD Quality Gates & DevOps",
      description: "Integrating automated test runners directly into GitHub Actions, Jenkins, and Docker deployment pipelines.",
    },
  ];

  return (
    <section id="expertise" className="w-full px-4 sm:px-8 max-w-6xl mx-auto my-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
          Collaborate with brands and agencies to create impactful results.
        </h2>

        {/* Center Pill Badge matching reference image */}
        <div className="inline-block bg-white px-5 py-1.5 rounded-full border border-slate-200 shadow-sm font-semibold text-xs sm:text-sm text-slate-700">
          Services
        </div>
      </div>

      {/* 4-Column Service Cards matching reference image layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-[#f5f5f7] rounded-[24px] p-6 sm:p-7 border border-white/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="p-3 bg-white rounded-2xl w-fit border border-slate-200/60 shadow-sm mb-5">
                {service.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
