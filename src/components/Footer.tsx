"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-8 max-w-6xl mx-auto py-8 text-xs sm:text-sm text-slate-500 font-medium border-t border-slate-300/60">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} Abdullah. All rights reserved.
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-slate-300">/</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            GitHub
          </a>
          <span className="text-slate-300">/</span>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            Twitter
          </a>
          <span className="text-slate-300">/</span>
          <a
            href="https://medium.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            Medium
          </a>
        </div>
      </div>
    </footer>
  );
}
