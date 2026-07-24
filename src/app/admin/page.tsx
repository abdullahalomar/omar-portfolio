"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  usePortfolioData, 
  Project, 
  BlogPost 
} from "@/context/PortfolioContext";
import { 
  LayoutDashboard, 
  User, 
  FolderKanban, 
  BookOpen, 
  Zap, 
  Award, 
  Inbox, 
  Settings, 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Check, 
  ExternalLink, 
  RotateCcw, 
  Mail, 
  Eye, 
  EyeOff,
  Cloud,
  ArrowRight
} from "lucide-react";

export default function AdminPage() {
  const {
    profile,
    hero,
    projects,
    blogs,
    skills,
    certifications,
    messages,
    isCloudConnected,
    updateProfile,
    updateHero,
    addProject,
    updateProject,
    deleteProject,
    addBlog,
    updateBlog,
    deleteBlog,
    addSkill,
    deleteSkill,
    addCertification,
    deleteCertification,
    toggleMessageRead,
    deleteMessage,
    resetToDefaults,
  } = usePortfolioData();

  // Authentication Lock state
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "profile" | "projects" | "blogs" | "skills" | "certs" | "inbox" | "settings"
  >("overview");

  // Save Indicator
  const [savedStatus, setSavedStatus] = useState(false);

  // Modal / Form States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    subtitle: "",
    category: "",
    description: "",
    metrics: "",
    tags: "",
    githubUrl: "",
    liveUrl: "",
  });

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    category: "",
    readTime: "5 min read",
    tags: "",
    intro: "",
    section1Heading: "",
    section1Body: "",
    section1Code: "",
    conclusion: "",
  });

  const [newSkillForm, setNewSkillForm] = useState({ name: "", category: "Automation", percentage: 90 });
  const [newCertForm, setNewCertForm] = useState({ title: "", issuer: "", date: "2024", badge: "Certified" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "1234" || passcode === "admin") {
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const triggerSaveNotification = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  // Handlers for Project CRUD
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: "",
      subtitle: "",
      category: "Web & API Automation",
      description: "",
      metrics: "",
      tags: "Playwright, TypeScript, CI/CD",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    });
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (p: Project) => {
    setEditingProject(p);
    setProjectForm({
      title: p.title,
      subtitle: p.subtitle,
      category: p.category,
      description: p.description,
      metrics: p.metrics,
      tags: p.tags.join(", "),
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = projectForm.tags.split(",").map((t) => t.trim()).filter(Boolean);

    if (editingProject) {
      updateProject(editingProject.id, {
        ...projectForm,
        tags: tagArray,
      });
    } else {
      addProject({
        ...projectForm,
        tags: tagArray,
      });
    }
    setIsProjectModalOpen(false);
    triggerSaveNotification();
  };

  // Handlers for Blog CRUD
  const openNewBlogModal = () => {
    setEditingBlog(null);
    setBlogForm({
      title: "",
      excerpt: "",
      category: "Automation Testing",
      readTime: "5 min read",
      tags: "Playwright, TypeScript, SQA",
      intro: "",
      section1Heading: "1. Core Framework Setup",
      section1Body: "",
      section1Code: "",
      conclusion: "",
    });
    setIsBlogModalOpen(true);
  };

  const openEditBlogModal = (b: BlogPost) => {
    setEditingBlog(b);
    setBlogForm({
      title: b.title,
      excerpt: b.excerpt,
      category: b.category,
      readTime: b.readTime,
      tags: b.tags.join(", "),
      intro: b.content.intro,
      section1Heading: b.content.sections[0]?.heading || "1. Overview",
      section1Body: b.content.sections[0]?.body || "",
      section1Code: b.content.sections[0]?.codeSnippet || "",
      conclusion: b.content.conclusion,
    });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = blogForm.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    const blogData: Omit<BlogPost, "id"> = {
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      category: blogForm.category,
      date: dateStr,
      readTime: blogForm.readTime,
      author: profile.name,
      authorRole: "SQA Lead",
      tags: tagArray,
      content: {
        intro: blogForm.intro,
        sections: [
          {
            heading: blogForm.section1Heading,
            body: blogForm.section1Body,
            codeSnippet: blogForm.section1Code ? blogForm.section1Code : undefined,
          },
        ],
        conclusion: blogForm.conclusion,
      },
    };

    if (editingBlog) {
      updateBlog(editingBlog.id, blogData);
    } else {
      addBlog(blogData);
    }
    setIsBlogModalOpen(false);
    triggerSaveNotification();
  };

  // Handlers for Skill & Cert
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillForm.name) return;
    addSkill(newSkillForm);
    setNewSkillForm({ name: "", category: "Automation", percentage: 90 });
    triggerSaveNotification();
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertForm.title) return;
    addCertification(newCertForm);
    setNewCertForm({ title: "", issuer: "", date: "2024", badge: "Certified" });
    triggerSaveNotification();
  };

  // Passcode Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-4 font-sans relative">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#1e293b] border border-slate-700 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold tracking-tight">Portfolio Admin Access</h1>
            <p className="text-xs text-slate-400">
              Enter your passcode to manage website content and view inbox messages.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs text-slate-400 font-medium">Passcode (Default: 1234)</label>
              <input
                type="password"
                required
                placeholder="Enter passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
              />
              {passcodeError && (
                <p className="text-xs text-rose-400 pt-1">Incorrect passcode. Try 1234.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <Unlock className="w-4 h-4" />
              <span>UNLOCK DASHBOARD</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800">
            <Link href="/" className="text-xs text-sky-400 hover:underline flex items-center justify-center gap-1">
              <span>Back to Public Website</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#111827] border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold">
                A
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight">Admin Console</h2>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <Cloud className={`w-3 h-3 ${isCloudConnected ? "text-emerald-400" : "text-sky-400"}`} />
                  <span className={isCloudConnected ? "text-emerald-400 font-bold" : "text-sky-400 font-mono"}>
                    {isCloudConnected ? "Supabase Cloud" : "LocalStorage"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "overview" ? "bg-sky-500 text-black font-bold shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "profile" ? "bg-sky-500 text-black font-bold shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile & Hero</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "projects" ? "bg-sky-500 text-black font-bold shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderKanban className="w-4 h-4" />
                <span>Projects</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "blogs" ? "bg-sky-500 text-black font-bold shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>Blogs</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {blogs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("skills")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "skills" ? "bg-sky-500 text-black font-bold shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Tech Skills</span>
            </button>

            <button
              onClick={() => setActiveTab("certs")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "certs" ? "bg-sky-500 text-black font-bold shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certifications</span>
            </button>

            <button
              onClick={() => setActiveTab("inbox")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "inbox" ? "bg-sky-500 text-black font-bold shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Inbox</span>
              </div>
              {unreadMessagesCount > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono font-bold animate-pulse">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "settings" ? "bg-sky-500 text-black font-bold shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Action Link Footer */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full py-2 text-slate-500 hover:text-rose-400 text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto max-h-screen">
        {/* Top Notification Bar */}
        {savedStatus && (
          <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-500 text-black font-bold text-xs shadow-xl flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4" />
            <span>Changes saved live to portfolio!</span>
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">System Overview</h1>
                <p className="text-xs text-slate-400">Welcome back, {profile.name}. Manage all website content in real time.</p>
              </div>

              <Link
                href="/"
                target="_blank"
                className="px-4 py-2 rounded-full bg-sky-500 text-black text-xs font-bold flex items-center gap-2 hover:bg-sky-400 transition-colors"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Projects</div>
                <div className="text-3xl font-extrabold text-sky-400 font-mono">{projects.length}</div>
                <div className="text-[11px] text-slate-500">Active portfolio automation suites</div>
              </div>

              <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Articles</div>
                <div className="text-3xl font-extrabold text-sky-400 font-mono">{blogs.length}</div>
                <div className="text-[11px] text-slate-500">Published SQA technical blogs</div>
              </div>

              <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Skills</div>
                <div className="text-3xl font-extrabold text-sky-400 font-mono">{skills.length}</div>
                <div className="text-[11px] text-slate-500">Technical automation proficiencies</div>
              </div>

              <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Inbox Messages</div>
                <div className="text-3xl font-extrabold text-rose-400 font-mono">{messages.length}</div>
                <div className="text-[11px] text-slate-500">{unreadMessagesCount} unread client inquiries</div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Quick Content Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={openNewProjectModal}
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-semibold text-xs flex items-center gap-2 transition-all border border-slate-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Project</span>
                </button>

                <button
                  onClick={openNewBlogModal}
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-semibold text-xs flex items-center gap-2 transition-all border border-slate-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Blog Post</span>
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 transition-all border border-slate-700"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Update Profile Info</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE & HERO */}
        {activeTab === "profile" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Profile & Hero Editor</h1>
              <button
                onClick={triggerSaveNotification}
                className="px-5 py-2.5 rounded-full bg-sky-500 text-black font-bold text-xs flex items-center gap-2 hover:bg-sky-400 transition-colors shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Live Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Details Form */}
              <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-sky-400 border-b border-slate-800 pb-3">
                  Sidebar & Bio Settings
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400">Job Title / Subhead</label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => updateProfile({ title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400">Location & Availability</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => updateProfile({ location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400">Contact Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => updateProfile({ email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Hero & Metrics Form */}
              <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-sky-400 border-b border-slate-800 pb-3">
                  Hero Section & Counter Badges
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400">Hero Headline Line 1</label>
                    <input
                      type="text"
                      value={hero.headline1}
                      onChange={(e) => updateHero({ headline1: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400">Hero Headline Line 2</label>
                    <input
                      type="text"
                      value={hero.headline2}
                      onChange={(e) => updateHero({ headline2: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400">Hero Subtitle Paragraph</label>
                    <textarea
                      rows={3}
                      value={hero.subtitle}
                      onChange={(e) => updateHero({ subtitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[11px] text-slate-400">Years Experience</label>
                      <input
                        type="text"
                        value={hero.yearsExp}
                        onChange={(e) => updateHero({ yearsExp: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400">Automation Suites</label>
                      <input
                        type="text"
                        value={hero.suitesCount}
                        onChange={(e) => updateHero({ suitesCount: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400">Defect Detection %</label>
                      <input
                        type="text"
                        value={hero.defectRate}
                        onChange={(e) => updateHero({ defectRate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400">Products Tested</label>
                      <input
                        type="text"
                        value={hero.productsCount}
                        onChange={(e) => updateHero({ productsCount: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Featured Projects</h1>
                <p className="text-xs text-slate-400">Manage automation project portfolios and case studies.</p>
              </div>

              <button
                onClick={openNewProjectModal}
                className="px-5 py-2.5 rounded-full bg-sky-500 text-black font-bold text-xs flex items-center gap-2 hover:bg-sky-400 transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="p-6 rounded-3xl bg-[#111827] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] font-mono">
                        {p.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{p.title}</h3>
                    <p className="text-xs text-slate-400">{p.description}</p>
                    <div className="text-xs text-emerald-400 font-mono">Metric: {p.metrics}</div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => openEditProjectModal(p)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors"
                      title="Edit Project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this project?")) {
                          deleteProject(p.id);
                          triggerSaveNotification();
                        }
                      }}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BLOGS */}
        {activeTab === "blogs" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Blog & Articles</h1>
                <p className="text-xs text-slate-400">Publish and manage technical SQA articles.</p>
              </div>

              <button
                onClick={openNewBlogModal}
                className="px-5 py-2.5 rounded-full bg-sky-500 text-black font-bold text-xs flex items-center gap-2 hover:bg-sky-400 transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Create Blog</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="p-6 rounded-3xl bg-[#111827] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px]">
                        {b.category}
                      </span>
                      <span>{b.date}</span>
                      <span>{b.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{b.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{b.excerpt}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => openEditBlogModal(b)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors"
                      title="Edit Blog"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this blog?")) {
                          deleteBlog(b.id);
                          triggerSaveNotification();
                        }
                      }}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Delete Blog"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SKILLS */}
        {activeTab === "skills" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Tech Skills & Proficiency</h1>
              <p className="text-xs text-slate-400">Add or remove technical tools and mastery levels.</p>
            </div>

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} className="p-6 rounded-3xl bg-[#111827] border border-slate-800 flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-slate-400">Tool / Skill Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cypress & JavaScript"
                  value={newSkillForm.name}
                  onChange={(e) => setNewSkillForm({ ...newSkillForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="w-44">
                <label className="text-xs text-slate-400">Category</label>
                <input
                  type="text"
                  value={newSkillForm.category}
                  onChange={(e) => setNewSkillForm({ ...newSkillForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="w-32">
                <label className="text-xs text-slate-400">Proficiency %</label>
                <input
                  type="number"
                  min={10}
                  max={100}
                  value={newSkillForm.percentage}
                  onChange={(e) => setNewSkillForm({ ...newSkillForm, percentage: parseInt(e.target.value) || 90 })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-sky-500 text-black font-bold text-xs hover:bg-sky-400 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </form>

            {/* List Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((s) => (
                <div key={s.id} className="p-4 rounded-2xl bg-[#111827] border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-white">{s.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{s.category} • {s.percentage}%</div>
                  </div>

                  <button
                    onClick={() => {
                      deleteSkill(s.id);
                      triggerSaveNotification();
                    }}
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CERTS */}
        {activeTab === "certs" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Certifications</h1>
              <p className="text-xs text-slate-400">Manage certifications and qualifications.</p>
            </div>

            <form onSubmit={handleAddCert} className="p-6 rounded-3xl bg-[#111827] border border-slate-800 flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-slate-400">Certification Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Certified DevOps Specialist"
                  value={newCertForm.title}
                  onChange={(e) => setNewCertForm({ ...newCertForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="w-48">
                <label className="text-xs text-slate-400">Issuer</label>
                <input
                  type="text"
                  value={newCertForm.issuer}
                  onChange={(e) => setNewCertForm({ ...newCertForm, issuer: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-sky-500 text-black font-bold text-xs hover:bg-sky-400 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-[#111827] border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-white">{c.title}</div>
                    <div className="text-[10px] text-sky-400 font-mono">{c.issuer} ({c.date})</div>
                  </div>

                  <button
                    onClick={() => {
                      deleteCertification(c.id);
                      triggerSaveNotification();
                    }}
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: INBOX */}
        {activeTab === "inbox" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Visitor Contact Messages</h1>
              <p className="text-xs text-slate-400">Messages submitted through the contact form on your portfolio.</p>
            </div>

            {messages.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#111827] border border-slate-800 text-slate-500 space-y-2">
                <Inbox className="w-8 h-8 mx-auto text-slate-600" />
                <p className="text-xs">No client messages received yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-6 rounded-3xl bg-[#111827] border ${
                      !m.read ? "border-sky-500/50 bg-sky-950/10" : "border-slate-800"
                    } space-y-3`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-white">{m.name}</span>
                        <span className="text-xs text-sky-400 font-mono">{m.email}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">{m.date}</span>
                    </div>

                    <div className="text-xs font-semibold text-slate-300">Subject: {m.subject}</div>
                    <p className="text-xs text-slate-400 leading-relaxed bg-[#0f172a] p-4 rounded-2xl border border-slate-800">
                      {m.message}
                    </p>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => toggleMessageRead(m.id)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1.5"
                      >
                        {m.read ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-sky-400" />}
                        <span>{m.read ? "Mark Unread" : "Mark Read"}</span>
                      </button>

                      <a
                        href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                        className="px-3 py-1.5 rounded-xl bg-sky-500 text-black font-bold text-[11px] flex items-center gap-1.5 hover:bg-sky-400"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reply Email</span>
                      </a>

                      <button
                        onClick={() => deleteMessage(m.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 8: SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-8 max-w-xl">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">System Settings</h1>
              <p className="text-xs text-slate-400">Reset default content or manage passcode settings.</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>Restore Default Portfolio Content</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If you made edits and want to revert back to the original initial portfolio data, click below. This clears custom local storage.
              </p>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to reset all portfolio data to default?")) {
                    resetToDefaults();
                    alert("Portfolio reset to default data!");
                  }
                }}
                className="px-5 py-2.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white font-bold text-xs transition-all"
              >
                Reset To Default Data
              </button>
            </div>
          </div>
        )}
      </main>

      {/* PROJECT MODAL */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#111827] border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 text-white shadow-2xl">
            <h3 className="text-lg font-bold">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400">Project Title</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Category Tag</label>
                <input
                  type="text"
                  required
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Description</label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Key Metric / Result</label>
                <input
                  type="text"
                  value={projectForm.metrics}
                  onChange={(e) => setProjectForm({ ...projectForm, metrics: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Tech Tags (comma separated)</label>
                <input
                  type="text"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 text-black font-bold text-xs"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG MODAL */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#111827] border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 text-white shadow-2xl">
            <h3 className="text-lg font-bold">
              {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
            </h3>

            <form onSubmit={handleSaveBlog} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400">Blog Title</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Category</label>
                  <input
                    type="text"
                    required
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400">Reading Time</label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400">Short Excerpt</label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Intro Paragraph</label>
                <textarea
                  rows={3}
                  required
                  value={blogForm.intro}
                  onChange={(e) => setBlogForm({ ...blogForm, intro: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Section 1 Body Content</label>
                <textarea
                  rows={4}
                  required
                  value={blogForm.section1Body}
                  onChange={(e) => setBlogForm({ ...blogForm, section1Body: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Optional Code Snippet</label>
                <textarea
                  rows={3}
                  value={blogForm.section1Code}
                  onChange={(e) => setBlogForm({ ...blogForm, section1Code: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1 font-mono text-sky-300"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Conclusion Paragraph</label>
                <textarea
                  rows={2}
                  value={blogForm.conclusion}
                  onChange={(e) => setBlogForm({ ...blogForm, conclusion: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Tags (comma separated)</label>
                <input
                  type="text"
                  value={blogForm.tags}
                  onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 text-black font-bold text-xs"
                >
                  Save Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
