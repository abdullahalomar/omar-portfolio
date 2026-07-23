"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  Clock,
  Code2,
  Check,
  Zap,
  Globe,
  Copy,
} from "lucide-react";

interface ApiPreset {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  description: string;
  headers: Record<string, string>;
  body?: string;
  responseStatus: number;
  statusText: string;
  responseTime: string;
  responseBody: object;
  assertions: { check: string; result: "PASS" | "FAIL"; expected: string }[];
}

export default function ApiTesterWidget() {
  const presets: ApiPreset[] = [
    {
      id: "auth-login",
      name: "User Authentication & JWT Token",
      method: "POST",
      url: "https://api.qa-studio.io/v1/auth/login",
      description: "Validates user credentials, returns JWT bearer token & sets secure HTTP-only cookies.",
      headers: { "Content-Type": "application/json", "X-Api-Key": "qa-sec-token-2026" },
      body: JSON.stringify({ email: "sqa.engineer@company.com", password: "••••••••••••" }, null, 2),
      responseStatus: 200,
      statusText: "OK",
      responseTime: "78ms",
      responseBody: {
        status: "success",
        data: {
          user_id: "usr_982410a",
          role: "SQA_ENGINEER",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          expires_in: 86400,
          permissions: ["READ_TESTS", "EXECUTE_PIPELINE", "DESTRUCTIVE_CLEANUP"],
        },
        meta: { server_timestamp: 1774004200, datacenter: "us-east-1" },
      },
      assertions: [
        { check: "HTTP Status === 200 OK", result: "PASS", expected: "200" },
        { check: "Response JSON Schema Validation", result: "PASS", expected: "Valid JWT schema" },
        { check: "Response Time < 150ms", result: "PASS", expected: "< 150ms (Actual: 78ms)" },
        { check: "Security Header 'Strict-Transport-Security'", result: "PASS", expected: "max-age=31536000" },
      ],
    },
    {
      id: "payment-charge",
      name: "Stripe Payment Transaction Assertion",
      method: "POST",
      url: "https://api.qa-studio.io/v1/payment/charge",
      description: "PCI-DSS compliant payment processing validation with mock Stripe token.",
      headers: { "Authorization": "Bearer eyJhbGci...", "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 4900, currency: "usd", payment_method: "pm_card_visa_sqa" }, null, 2),
      responseStatus: 200,
      statusText: "OK",
      responseTime: "142ms",
      responseBody: {
        status: "succeeded",
        charge_id: "ch_3M091aSqaTest",
        amount_captured: 4900,
        currency: "usd",
        receipt_url: "https://pay.sqa-studio.io/receipts/ch_3M091aSqaTest",
        fraud_details: { risk_level: "normal", score: 0 },
      },
      assertions: [
        { check: "HTTP Status === 200 OK", result: "PASS", expected: "200" },
        { check: "Charge Status === 'succeeded'", result: "PASS", expected: "succeeded" },
        { check: "Zero Fraud Risk Score Assertion", result: "PASS", expected: "risk_level === 'normal'" },
      ],
    },
    {
      id: "sqli-prevention",
      name: "Security Input Sanitization Audit",
      method: "POST",
      url: "https://api.qa-studio.io/v1/user/search",
      description: "OWASP SQL Injection security test payload to verify server parameter sanitization.",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "' OR '1'='1' --", limit: 10 }, null, 2),
      responseStatus: 400,
      statusText: "Bad Request",
      responseTime: "34ms",
      responseBody: {
        error: "INVALID_INPUT_FORMAT",
        message: "Malicious input pattern detected by SQA Security Gate.",
        sanitized_input: "",
        security_event_id: "sec_evt_84109",
      },
      assertions: [
        { check: "HTTP Status === 400 Bad Request", result: "PASS", expected: "400" },
        { check: "SQL Injection Neutralized", result: "PASS", expected: "0 records leaked" },
        { check: "Security Event Logged", result: "PASS", expected: "Event ID generated" },
      ],
    },
    {
      id: "health-check",
      name: "Microservice Cluster Health Check",
      method: "GET",
      url: "https://api.qa-studio.io/v1/healthz",
      description: "Cluster readiness probe checking Redis cache, PostgreSQL DB pool, and S3 status.",
      headers: { "Accept": "application/json" },
      responseStatus: 200,
      statusText: "OK",
      responseTime: "18ms",
      responseBody: {
        status: "UP",
        services: {
          postgresql_primary: { status: "HEALTHY", latency_ms: 3 },
          redis_cluster: { status: "HEALTHY", latency_ms: 1 },
          rabbitmq_events: { font: "HEALTHY", pending_jobs: 0 },
        },
        uptime_seconds: 1482900,
      },
      assertions: [
        { check: "HTTP Status === 200 OK", result: "PASS", expected: "200" },
        { check: "Database Latency < 10ms", result: "PASS", expected: "< 10ms (Actual: 3ms)" },
        { check: "Cluster Readiness Status UP", result: "PASS", expected: "UP" },
      ],
    },
  ];

  const [selectedPresetId, setSelectedPresetId] = useState<string>("auth-login");
  const [activeTab, setActiveTab] = useState<"body" | "headers">("body");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseReady, setResponseReady] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const currentPreset = presets.find((p) => p.id === selectedPresetId) || presets[0];

  const handleSendRequest = () => {
    setIsLoading(true);
    setResponseReady(false);
    setTimeout(() => {
      setIsLoading(false);
      setResponseReady(true);
    }, 400);
  };

  const copyResponseJson = () => {
    navigator.clipboard.writeText(JSON.stringify(currentPreset.responseBody, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api-tester" className="w-full px-4 sm:px-8 max-w-6xl mx-auto my-12">
      <div className="bg-[#f5f5f7] rounded-[36px] p-6 sm:p-12 border border-white/60 shadow-sm">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-sm">
            <Globe className="w-3.5 h-3.5 text-slate-800" />
            <span>API & Security Tester</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Live API Endpoint Assertion Tool
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Test real-world HTTP endpoints with simulated request payloads, response headers, and automated JSON schema validation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-5 space-y-3">
            {presets.map((preset) => {
              const isSelected = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedPresetId(preset.id);
                    setResponseReady(true);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-white border-slate-900 shadow-md"
                      : "bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        preset.method === "POST"
                          ? "bg-slate-900 text-white"
                          : "bg-emerald-600 text-white"
                      }`}
                    >
                      {preset.method}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">{preset.name}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{preset.description}</p>
                </button>
              );
            })}

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-semibold text-slate-700">Request Configuration</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveTab("body")}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                      activeTab === "body" ? "bg-slate-900 text-white font-bold" : "text-slate-500"
                    }`}
                  >
                    Body
                  </button>
                  <button
                    onClick={() => setActiveTab("headers")}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                      activeTab === "headers" ? "bg-slate-900 text-white font-bold" : "text-slate-500"
                    }`}
                  >
                    Headers
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-900 text-white rounded">
                  {currentPreset.method}
                </span>
                <input
                  type="text"
                  readOnly
                  value={currentPreset.url}
                  className="bg-transparent text-xs font-mono text-slate-700 w-full focus:outline-none"
                />
              </div>

              {activeTab === "body" && currentPreset.body ? (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400">JSON Payload:</span>
                  <pre className="p-3 bg-slate-950 text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto max-h-[140px]">
                    {currentPreset.body}
                  </pre>
                </div>
              ) : activeTab === "headers" ? (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400">Headers:</span>
                  <div className="p-3 bg-slate-950 text-slate-200 rounded-xl text-xs font-mono space-y-1">
                    {Object.entries(currentPreset.headers).map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-sky-400">{k}:</span>
                        <span className="text-slate-400 truncate max-w-[180px]">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic p-3 text-center">No Payload Needed</div>
              )}

              <button
                onClick={handleSendRequest}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-xs sm:text-sm text-white bg-[#111111] hover:bg-[#262626] shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                <span>{isLoading ? "Executing..." : "Send Request & Assert"}</span>
              </button>
            </div>

          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[460px]">
              
              <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-medium">
                    Response & Assertions
                  </span>
                </div>

                {responseReady && (
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span
                      className={`px-2 py-0.5 rounded font-bold ${
                        currentPreset.responseStatus === 200
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      }`}
                    >
                      {currentPreset.responseStatus} {currentPreset.statusText}
                    </span>
                    <span className="text-slate-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-400" />
                      {currentPreset.responseTime}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-4 flex-1 bg-slate-950 text-slate-200">
                
                {isLoading ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-400 space-y-2">
                    <Zap className="w-6 h-6 text-emerald-400 animate-bounce" />
                    <span className="text-xs font-mono">Dispatching Request...</span>
                  </div>
                ) : responseReady ? (
                  <>
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                        Assertions:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentPreset.assertions.map((ast, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <div className="truncate">
                              <div className="text-slate-200 font-medium truncate">{ast.check}</div>
                              <div className="text-[10px] text-emerald-400">{ast.expected}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400">Response JSON:</span>
                        <button
                          onClick={copyResponseJson}
                          className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:text-emerald-300"
                        >
                          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copied ? "Copied!" : "Copy JSON"}</span>
                        </button>
                      </div>

                      <pre className="p-4 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto max-h-[220px] border border-slate-800">
                        {JSON.stringify(currentPreset.responseBody, null, 2)}
                      </pre>
                    </div>
                  </>
                ) : (
                  <div className="h-64 flex items-center justify-center text-slate-500 text-xs font-mono">
                    Click &quot;Send Request&quot; to view JSON assertions.
                  </div>
                )}

              </div>

              <div className="bg-slate-900 px-4 py-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex justify-between">
                <span>Mode: JSON Schema Assertion</span>
                <span className="text-emerald-400 font-bold">Passed</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
