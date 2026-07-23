"use client";

import React from "react";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

export default function FixedLeftSidebar() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="w-full">
      <div className="bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#2a2a2a] rounded-[32px] p-6 lg:p-7 shadow-xl dark:shadow-2xl flex flex-col justify-between transition-colors duration-300">
        
        {/* Header Branding Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
              Abdullah<span className="text-sky-500 dark:text-[#38bdf8]">.</span>
            </span>
          </div>
          <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-sky-50 dark:bg-[#38bdf8]/10 text-sky-600 dark:text-[#38bdf8] border border-sky-200 dark:border-[#38bdf8]/20">
            SQA ENGINEER
          </span>
        </div>

        {/* Profile Avatar Frame */}
        <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-[#333333] group bg-slate-100 dark:bg-[#161616]">
          <Image
            src="/abdullah-profile.png"
            alt="Abdullah Al Omar - SQA Engineer"
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-[#111111]/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* Info & Details */}
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Abdullah Al Omar
          </h2>
          <p className="text-sm text-slate-600 dark:text-[#999999] font-medium leading-snug">
            Software Quality Assurance Engineer & Test Automation Specialist
          </p>
          
          <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-[#888888]">
            <MapPin className="w-3.5 h-3.5 text-sky-500 dark:text-[#38bdf8]" />
            <span>Dhaka, Bangladesh &bull; Available Remote</span>
          </div>
        </div>


        {/* Social Links Bar */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-[#2a2a2a] bg-slate-100 dark:bg-[#161616] flex items-center justify-center text-slate-600 dark:text-[#aaaaaa] hover:text-sky-500 dark:hover:text-[#38bdf8] hover:border-sky-500/50 dark:hover:border-[#38bdf8]/50 hover:scale-110 transition-all"
            aria-label="GitHub Profile"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-[#2a2a2a] bg-slate-100 dark:bg-[#161616] flex items-center justify-center text-slate-600 dark:text-[#aaaaaa] hover:text-sky-500 dark:hover:text-[#38bdf8] hover:border-sky-500/50 dark:hover:border-[#38bdf8]/50 hover:scale-110 transition-all"
            aria-label="LinkedIn Profile"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-[#2a2a2a] bg-slate-100 dark:bg-[#161616] flex items-center justify-center text-slate-600 dark:text-[#aaaaaa] hover:text-sky-500 dark:hover:text-[#38bdf8] hover:border-sky-500/50 dark:hover:border-[#38bdf8]/50 hover:scale-110 transition-all"
            aria-label="Twitter Profile"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="mailto:abdullah.sqa@gmail.com"
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-[#2a2a2a] bg-slate-100 dark:bg-[#161616] flex items-center justify-center text-slate-600 dark:text-[#aaaaaa] hover:text-sky-500 dark:hover:text-[#38bdf8] hover:border-sky-500/50 dark:hover:border-[#38bdf8]/50 hover:scale-110 transition-all"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* HIRE ME Button */}
        <button
          onClick={scrollToContact}
          className="w-full py-3.5 px-6 rounded-full bg-sky-500 dark:bg-[#38bdf8] hover:bg-sky-600 dark:hover:bg-[#0ea5e9] text-white dark:text-[#111111] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] active:scale-98 transition-all"
        >
          <Mail className="w-4 h-4" />
          <span>HIRE ME!</span>
        </button>

        {/* Copyright notice */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#2a2a2a]/60 text-center text-[11px] text-slate-400 dark:text-[#666666]">
          &copy; {new Date().getFullYear()} Abdullah Al Omar. All rights reserved.
        </div>
      </div>
    </aside>
  );
}
