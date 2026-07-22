"use client";

import React, { useState } from "react";
import {
  Layers,
  Cpu,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Database,
  GitBranch,
} from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: string; experience: string }[];
}

const categories: SkillCategory[] = [
  {
    title: "Test Automation Frameworks",
    icon: <Cpu className="w-4 h-4 text-slate-800" />,
    skills: [
      { name: "Playwright (TS / JS)", level: "Expert", experience: "4+ Yrs" },
      { name: "Cypress E2E", level: "Expert", experience: "5+ Yrs" },
      { name: "Selenium WebDriver", level: "Advanced", experience: "4+ Yrs" },
      { name: "Appium (Mobile)", level: "Advanced", experience: "3+ Yrs" },
      { name: "RestAssured (Java)", level: "Proficient", experience: "2+ Yrs" },
    ],
  },
  {
    title: "API & Performance Testing",
    icon: <Zap className="w-4 h-4 text-slate-800" />,
    skills: [
      { name: "Postman / Newman", level: "Expert", experience: "5+ Yrs" },
      { name: "k6 Load Testing", level: "Advanced", experience: "3+ Yrs" },
      { name: "Apache JMeter", level: "Advanced", experience: "4+ Yrs" },
      { name: "Swagger / OpenAPI", level: "Expert", experience: "5+ Yrs" },
      { name: "OWASP ZAP Audit", level: "Proficient", experience: "2+ Yrs" },
    ],
  },
  {
    title: "DevOps & CI/CD Pipelines",
    icon: <GitBranch className="w-4 h-4 text-slate-800" />,
    skills: [
      { name: "GitHub Actions", level: "Expert", experience: "4+ Yrs" },
      { name: "Jenkins CI", level: "Advanced", experience: "4+ Yrs" },
      { name: "Docker Containerization", level: "Advanced", experience: "3+ Yrs" },
      { name: "SonarQube Quality Gate", level: "Advanced", experience: "3+ Yrs" },
      { name: "Allure Reporting", level: "Expert", experience: "5+ Yrs" },
    ],
  },
  {
    title: "Scripting & Database Auditing",
    icon: <Database className="w-4 h-4 text-slate-800" />,
    skills: [
      { name: "TypeScript / JavaScript", level: "Expert", experience: "5+ Yrs" },
      { name: "Python SQA Scripts", level: "Advanced", experience: "3+ Yrs" },
      { name: "SQL & Relational DBs", level: "Advanced", experience: "4+ Yrs" },
      { name: "Bash & Linux CLI", level: "Advanced", experience: "4+ Yrs" },
    ],
  },
];

const codeSnippets = [
  {
    id: "playwright",
    title: "playwright/checkout-e2e.spec.ts",
    lang: "TypeScript",
    code: [
      "import { test, expect } from '@playwright/test';",
      "",
      "test.describe('E2E Checkout & Payment Validation', () => {",
      "  test.beforeEach(async ({ page }) => {",
      "    // Intercept Stripe API Webhook to isolate frontend assertion",
      "    await page.route('**/v1/payment/charge', async (route) => {",
      "      await route.fulfill({",
      "        status: 200,",
      "        contentType: 'application/json',",
      "        body: JSON.stringify({ status: 'succeeded', transactionId: 'txn_984201' }),",
      "      });",
      "    });",
      "    await page.goto('/checkout');",
      "  });",
      "",
      "  test('completes cart payment with zero accessibility defects', async ({ page }) => {",
      "    await expect(page.locator('#order-summary')).toBeVisible();",
      "    await page.fill('[data-testid=\"input-cardholder\"]', 'Abdullah Al Omar SQA');",
      "    await page.click('[data-testid=\"btn-pay-now\"]');",
      "",
      "    // Assert URL redirection & success notification banner",
      "    await expect(page).toHaveURL(/.*order-confirmed/);",
      "    await expect(page.locator('.alert-success')).toContainText('Order #984201 Confirmed');",
      "  });",
      "});",
    ].join("\n"),
  },
  {
    id: "cypress",
    title: "cypress/e2e/api-security-audit.cy.ts",
    lang: "TypeScript",
    code: [
      "describe('API Authentication & Security Constraints', () => {",
      "  const apiEndpoint = '/api/v1/auth/login';",
      "",
      "  it('enforces JWT bearer token expiration and rate limiting', () => {",
      "    cy.request({",
      "      method: 'POST',",
      "      url: apiEndpoint,",
      "      body: { email: 'abdullah.al.omar.sqa@gmail.com', password: 'ValidPassword123!' },",
      "    }).then((response) => {",
      "      expect(response.status).to.eq(200);",
      "      expect(response.body.data).to.have.property('token');",
      "      expect(response.headers).to.have.property('strict-transport-security');",
      "      ",
      "      // Store token for downstream regression specs",
      "      Cypress.env('AUTH_TOKEN', response.body.data.token);",
      "    });",
      "  });",
      "",
      "  it('rejects unauthorized access without valid bearer header', () => {",
      "    cy.request({",
      "      method: 'GET',",
      "      url: '/api/v1/user/private-data',",
      "      failOnStatusCode: false,",
      "    }).its('status').should('eq', 401);",
      "  });",
      "});",
    ].join("\n"),
  },
  {
    id: "k6",
    title: "k6/load-benchmarks.js",
    lang: "JavaScript",
    code: [
      "import http from 'k6/http';",
      "import { check, sleep } from 'k6';",
      "",
      "// Define SLA thresholds for CI/CD Quality Gate",
      "export const options = {",
      "  stages: [",
      "    { duration: '30s', target: 200 },",
      "    { duration: '1m',  target: 500 },",
      "    { duration: '30s', target: 0 },",
      "  ],",
      "  thresholds: {",
      "    http_req_duration: ['p95 under 200ms'],",
      "    http_req_failed:   ['rate under 1%'],",
      "  },",
      "};",
      "",
      "export default function () {",
      "  const res = http.get('https://api.qa-studio.io/v1/healthz');",
      "  check(res, {",
      "    'status is 200': (r) => r.status === 200,",
      "    'latency SLA': (r) => r.timings.duration <= 150,",
      "  });",
      "  sleep(1);",
      "}",
    ].join("\n"),
  },
];

export default function TechStackMatrix() {
  const [activeSnippetId, setActiveSnippetId] = useState("playwright");
  const [copied, setCopied] = useState(false);

  const activeSnippet = codeSnippets.find((s) => s.id === activeSnippetId) || codeSnippets[0];

  const copyCode = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tech-stack" className="w-full px-4 sm:px-8 max-w-6xl mx-auto my-12">
      <div className="bg-[#f5f5f7] rounded-[36px] p-6 sm:p-12 border border-white/60 shadow-sm">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-sm">
            <Layers className="w-3.5 h-3.5 text-slate-800" />
            <span>SQA Skill Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tools & Technical Standards
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Battle-tested expertise across modern test automation frameworks, API profiling tools, and production-grade TypeScript test suites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-xl bg-slate-100 border border-slate-200">{cat.icon}</div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">{cat.title}</h3>
              </div>

              <div className="space-y-2">
                {cat.skills.map((sk, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                  >
                    <span className="text-slate-800 font-medium">{sk.name}</span>
                    <span className="text-[10px] text-slate-700 bg-white px-2 py-0.5 rounded-full border border-slate-200 font-bold shadow-xs">
                      {sk.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          
          <div className="bg-slate-900 px-4 py-3 text-white flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-300" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                Production-Ready SQA Test Specs
              </span>
            </div>

            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
              {codeSnippets.map((snip) => (
                <button
                  key={snip.id}
                  onClick={() => setActiveSnippetId(snip.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeSnippetId === snip.id
                      ? "bg-white text-slate-900 font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {snip.title.split("/")[0]}
                </button>
              ))}
            </div>

            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied Spec!" : "Copy Spec"}</span>
            </button>
          </div>

          <div className="p-6 bg-[#0f172a] font-mono text-xs text-slate-200 overflow-x-auto">
            <div className="text-[11px] text-slate-400 mb-3 border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Spec File: <span className="text-emerald-400">{activeSnippet.title}</span></span>
              <span>Language: <span className="text-amber-300">{activeSnippet.lang}</span></span>
            </div>

            <pre className="leading-relaxed whitespace-pre">
              {activeSnippet.code}
            </pre>
          </div>

          <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-between font-mono">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Flaky-Free Dynamic Waiting & Intercept Routing</span>
            </span>
            <span>Lint: Clean TypeScript (Strict)</span>
          </div>

        </div>

      </div>
    </section>
  );
}
