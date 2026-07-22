"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Clock,
  ArrowRight,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: {
    intro: string;
    keyPoints: string[];
    codeSnippet?: string;
    takeaway: string;
  };
}

export default function BlogSection() {
  const posts: BlogPost[] = [
    {
      id: "playwright-speed",
      title: "How I Cut a 96-Hour Manual Regression to 18 Mins with Playwright",
      excerpt:
        "Step-by-step breakdown of containerized test matrix execution, async route mocking, and POM isolation.",
      category: "Test Automation",
      readTime: "5 min read",
      date: "July 2026",
      content: {
        intro:
          "Manual regression testing used to take 4 full days before every bi-weekly production release. In this article, I explain how we engineered a parallel Playwright + TypeScript test architecture running inside Docker containers.",
        keyPoints: [
          "1. Eliminating network latency through page.route() API request mocking.",
          "2. Sharding test suites across 8 parallel GitHub Actions matrix runners.",
          "3. Implementing strict atomic test state setup via direct database seeding.",
          "4. Auto-generating interactive Allure HTML reports with trace screenshots.",
        ],
        codeSnippet: `// playwright.config.ts - Parallel Sharding
export default defineConfig({
  fullyParallel: true,
  workers: process.env.CI ? 8 : undefined,
  use: {
    trace: 'retain-on-failure',
    video: 'on-first-retry',
  },
});`,
        takeaway:
          "Result: 96 hours of manual testing replaced by an 18-minute CI build run with 0.00% flaky test failures.",
      },
    },
    {
      id: "cypress-flakiness",
      title: "Stop Writing Flaky Cypress Tests: 5 Dynamic Waiting Patterns",
      excerpt:
        "Hardcoded cy.wait(5000) is ruining your CI builds. Here is how to use dynamic route aliases and assertion retries.",
      category: "Cypress SQA",
      readTime: "6 min read",
      date: "June 2026",
      content: {
        intro:
          "Flaky tests destroy developer trust in automated test pipelines. The #1 culprit is hardcoded sleep timers. In this article, I share 5 dynamic waiting patterns I use in Cypress.",
        keyPoints: [
          "1. Intercepting API routes with cy.intercept() and aliasing requests.",
          "2. Waiting on network response status: cy.wait('@getProfile').its('response.statusCode').should('eq', 200).",
          "3. Utilizing built-in Cypress assertion retry-ability instead of arbitrary sleeps.",
          "4. Setting custom assertion timeouts per flaky DOM element.",
        ],
        codeSnippet: `// Correct Dynamic Waiting Pattern
cy.intercept('GET', '/api/v1/users/*').as('getUser');
cy.visit('/dashboard');
cy.wait('@getUser').its('response.statusCode').should('eq', 200);
cy.get('[data-testid="user-profile"]').should('be.visible');`,
        takeaway:
          "Eliminating cy.wait() timers reduced test suite duration by 40% and eliminated false-positive build failures.",
      },
    },
    {
      id: "owasp-ci-security",
      title: "Automating OWASP Security Audits in GitHub Actions PR Sweeps",
      excerpt:
        "How to catch SQL injection and JWT authentication flaws automatically before code reaches staging.",
      category: "Security Testing",
      readTime: "7 min read",
      date: "May 2026",
      content: {
        intro:
          "Security testing shouldn't be performed once a year during external audits. In this article, I demonstrate how to integrate OWASP ZAP and Postman Newman security suites into every pull request.",
        keyPoints: [
          "1. Running automated DAST security scans on feature preview URLs.",
          "2. Fuzzing API parameters with malicious SQL injection and XSS payloads.",
          "3. Validating JWT token revocation and authorization header boundaries.",
          "4. Blocking PR merge automatically if CVSS score exceeds 7.0.",
        ],
        codeSnippet: `# .github/workflows/security-audit.yml
- name: OWASP ZAP Baseline Scan
  uses: zaproxy/action-baseline@v0.12.0
  with:
    target: 'https://staging-api.qa-studio.io'
    fail_action: true`,
        takeaway:
          "Uncovered 34 security vulnerabilities prior to production release, achieving 100% compliance audit readiness.",
      },
    },
  ];

  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="w-full px-4 sm:px-8 max-w-6xl mx-auto my-12">
      <div className="bg-[#f5f5f7] rounded-[36px] p-6 sm:p-12 border border-white/60 shadow-sm">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-slate-800" />
            <span>Blog & Technical Articles</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SQA Engineering Blog
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            In-depth technical articles on test automation architecture, flaky test elimination, and CI/CD quality engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-5 hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                    {post.category}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-600" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">{post.date}</span>
                <button
                  onClick={() => setActivePost(post)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-slate-700">{activePost.category}</span>
                  <span>&bull;</span>
                  <span>{activePost.readTime}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {activePost.title}
                </h3>
              </div>
              <button
                onClick={() => setActivePost(null)}
                className="text-slate-400 hover:text-slate-800 text-2xl font-bold p-1"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              <p>{activePost.content.intro}</p>

              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs">
                <span className="text-slate-900 font-bold uppercase text-[11px]">Key Technical Takeaways:</span>
                {activePost.content.keyPoints.map((pt, idx) => (
                  <div key={idx} className="text-slate-700">
                    {pt}
                  </div>
                ))}
              </div>

              {activePost.content.codeSnippet && (
                <div className="space-y-1 font-mono text-xs">
                  <span className="text-slate-500 text-[11px]">Code Snippet Pattern:</span>
                  <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl overflow-x-auto">
                    {activePost.content.codeSnippet}
                  </pre>
                </div>
              )}

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 font-medium text-xs">
                {activePost.content.takeaway}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setActivePost(null)}
                className="px-5 py-2 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Close Article Reader
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
