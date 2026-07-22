"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const email = "abdullah.sqa@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="w-full pt-6 pb-4 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Action Pills matching design image */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Email Badge with Copy Button */}
          <div className="inline-flex items-center gap-2 bg-white px-3 sm:px-4 py-1.5 rounded-full border border-slate-200/80 shadow-sm text-xs sm:text-sm text-slate-700 font-medium">
            <span className="truncate max-w-[170px] sm:max-w-none">{email}</span>
            <button
              onClick={handleCopyEmail}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors inline-flex items-center gap-1 cursor-pointer"
              title="Copy Email"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* CV Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 rounded-full border border-slate-200/80 shadow-sm transition-all hover:scale-105"
          >
            <span>CV</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>

        {/* Right Nav Links */}
        <div className="hidden md:flex items-center gap-4 text-xs sm:text-sm font-medium text-slate-600">
          <a
            href="#projects"
            className="hover:text-slate-950 transition-colors"
          >
            Project
          </a>
          <span className="text-slate-300">/</span>
          <a
            href="#blog"
            className="hover:text-slate-950 transition-colors"
          >
            Blog
          </a>
          <span className="text-slate-300">/</span>
          <a
            href="#expertise"
            className="hover:text-slate-950 transition-colors"
          >
            Expertise
          </a>
          <span className="text-slate-300">/</span>
          <a
            href="#contact"
            className="hover:text-slate-950 transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-slate-950"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-lg flex flex-col gap-3 text-sm font-medium text-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-slate-100"
          >
            Project
          </a>
          <a
            href="#blog"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-slate-100"
          >
            Blog
          </a>
          <a
            href="#expertise"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-slate-100"
          >
            Expertise
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-slate-100"
          >
            Contact
          </a>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
