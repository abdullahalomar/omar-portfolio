"use client";

import React, { useState, useEffect } from "react";
import { 
  Home, 
  User, 
  Briefcase, 
  Wrench, 
  Zap, 
  FolderKanban, 
  BookOpen,
  Mail 
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface FloatingRightNavbarProps {
  isDesktopInColumn?: boolean;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "resume", label: "Resume", icon: Briefcase },
  { id: "services", label: "Specializations", icon: Wrench },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function FloatingRightNavbar({ isDesktopInColumn = false }: FloatingRightNavbarProps) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* Desktop Right Navbar */}
      <nav 
        className={`${
          isDesktopInColumn 
            ? "relative hidden lg:flex" 
            : "fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex"
        } flex-col gap-3.5 bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-md border border-slate-200 dark:border-[#2a2a2a] rounded-full py-5 px-3 shadow-2xl items-center transition-colors duration-300`}
        aria-label="Section Navigation"
      >
        <ThemeToggle />
        <div className="w-6 h-[1px] bg-slate-200 dark:bg-[#2a2a2a] my-1" />

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`group relative p-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "text-[#38bdf8] bg-sky-50 dark:bg-[#38bdf8]/10 scale-110 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                  : "text-slate-500 dark:text-[#888888] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#2a2a2a]"
              }`}
              aria-label={item.label}
            >
              <Icon className="w-4 h-4" />

              {/* Hover Tooltip */}
              <span className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 dark:bg-[#161616] text-[#38bdf8] border border-[#38bdf8]/30 text-xs font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Floating Bottom Bar */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/95 dark:bg-[#1e1e1e]/95 backdrop-blur-lg border border-slate-200 dark:border-[#2a2a2a] rounded-full px-4 py-2.5 shadow-2xl flex items-center gap-2 max-w-[95vw] overflow-x-auto scrollbar-none transition-colors duration-300">
        <ThemeToggle />
        <div className="w-[1px] h-5 bg-slate-200 dark:bg-[#2a2a2a] mx-1" />
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`p-2 rounded-full transition-all ${
                isActive
                  ? "text-[#38bdf8] bg-sky-50 dark:bg-[#38bdf8]/15"
                  : "text-slate-500 dark:text-[#888888] hover:text-slate-900 dark:hover:text-white"
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>
    </>
  );
}
