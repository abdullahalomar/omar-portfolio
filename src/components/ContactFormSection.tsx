"use client";

import React, { useState } from "react";
import { Mail, Send, MapPin, CheckCircle2, Phone, Copy, Check } from "lucide-react";
import { usePortfolioData } from "@/context/PortfolioContext";

export default function ContactFormSection() {
  const { profile, addContactMessage } = usePortfolioData();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    addContactMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || "Portfolio Inquiry",
      message: formData.message,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email || "abdullah.sqa@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="scroll-mt-12 space-y-8 pt-6">
      {/* Tag */}
      <div className="section-tag">
        <Mail className="w-3.5 h-3.5 text-sky-500 dark:text-[#38bdf8]" />
        <span>CONTACT</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Let&apos;s Work <span className="text-sky-500 dark:text-[#38bdf8]">Together!</span>
        </h2>
        <p className="text-base text-slate-600 dark:text-[#999999] max-w-2xl">
          Need automated test suites, performance benchmarks, or a dedicated SQA engineer for your project? Send a message and I&apos;ll get back to you within 12 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 border border-slate-200 dark:border-[#2a2a2a] rounded-3xl bg-white dark:bg-[#1e1e1e] space-y-6 shadow-sm dark:shadow-none">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Direct Contact</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#2a2a2a]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-[#38bdf8]/10 text-sky-500 dark:text-[#38bdf8] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-[#888888]">Email Address</div>
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">abdullah.sqa@gmail.com</div>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="p-2 text-slate-400 dark:text-[#888888] hover:text-sky-500 dark:hover:text-[#38bdf8] transition-colors"
                  title="Copy Email"
                >
                  {copied ? <Check className="w-4 h-4 text-sky-500 dark:text-[#38bdf8]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#2a2a2a]">
                <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-[#38bdf8]/10 text-sky-500 dark:text-[#38bdf8] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-[#888888]">Base Location</div>
                  <div className="text-xs font-medium text-slate-900 dark:text-white">Dhaka, Bangladesh (UTC +6)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#2a2a2a]">
                <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-[#38bdf8]/10 text-sky-500 dark:text-[#38bdf8] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 dark:text-[#888888]">Availability</div>
                  <div className="text-xs font-medium text-sky-600 dark:text-[#38bdf8]">Open for Freelance & Contract</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 border border-slate-200 dark:border-[#2a2a2a] rounded-3xl bg-white dark:bg-[#1e1e1e] space-y-4 shadow-sm dark:shadow-none"
          >
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-sky-50 dark:bg-[#38bdf8]/20 text-sky-500 dark:text-[#38bdf8] mx-auto flex items-center justify-center border border-sky-200 dark:border-[#38bdf8]/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Delivered!</h3>
                <p className="text-xs text-slate-600 dark:text-[#999999]">Thank you, Abdullah will get back to you shortly.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-600 dark:text-[#aaaaaa] font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#2a2a2a] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 dark:focus:border-[#38bdf8]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-600 dark:text-[#aaaaaa] font-medium">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#2a2a2a] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 dark:focus:border-[#38bdf8]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-600 dark:text-[#aaaaaa] font-medium">Subject</label>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#2a2a2a] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 dark:focus:border-[#38bdf8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-600 dark:text-[#aaaaaa] font-medium">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#2a2a2a] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 dark:focus:border-[#38bdf8]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-sky-500 dark:bg-[#38bdf8] hover:bg-sky-600 dark:hover:bg-[#0ea5e9] text-white dark:text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND MESSAGE</span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
