"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full bg-slate-100 dark:bg-[#1e1e1e] border border-slate-300 dark:border-[#2a2a2a] text-amber-500 dark:text-[#38bdf8] hover:scale-110 active:scale-95 transition-all shadow-md flex items-center justify-center shrink-0"
      aria-label="Toggle Light and Dark Mode"
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-sky-600 fill-sky-600" />
      )}
    </button>
  );
}
