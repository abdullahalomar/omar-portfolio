"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  usePortfolioData, 
  Project, 
  BlogPost,
  SpecializationItem,
  ExperienceItem,
  EducationItem
} from "@/context/PortfolioContext";
import CloudinaryImageUploader from "@/components/CloudinaryImageUploader";
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
  ArrowRight,
  Upload,
  Wrench,
  Briefcase,
  GraduationCap
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
    specializations,
    experiences,
    educations,
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
    addSpecialization,
    updateSpecialization,
    deleteSpecialization,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    resetToDefaults,
  } = usePortfolioData();

  // Authentication Lock state
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("admin_authenticated") === "true";
    }
    return false;
  });
  const [passcodeError, setPasscodeError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "profile" | "specializations" | "resume" | "projects" | "blogs" | "skills" | "certs" | "inbox" | "settings"
  >("overview");

  // Save Indicator
  const [savedStatus, setSavedStatus] = useState(false);

  // Specialization Modal State
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
  const [editingSpec, setEditingSpec] = useState<SpecializationItem | null>(null);
  const [specForm, setSpecForm] = useState({
    title: "",
    desc: "",
    projects: "",
    icon: "Wrench",
  });

  // Experience Modal State
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [expForm, setExpForm] = useState({
    period: "",
    role: "",
    company: "",
    description: "",
    skills: "",
  });

  // Education Modal State
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);
  const [eduForm, setEduForm] = useState({
    period: "",
    degree: "",
    institution: "",
    description: "",
  });

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
    thumbnail: "",
    intro: "",
    section1Heading: "",
    section1Body: "",
    conclusion: "",
  });

  const [newSkillForm, setNewSkillForm] = useState({ name: "", category: "Automation", percentage: 90, icon: "" });
  const [newCertForm, setNewCertForm] = useState({ title: "", issuer: "", date: "2024", badge: "Certified" });

  const [cloudNameInput, setCloudNameInput] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cloudinary_cloud_name") || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
    }
    return "demo";
  });

  const [uploadPresetInput, setUploadPresetInput] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cloudinary_upload_preset") || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset";
    }
    return "unsigned_preset";
  });

  const handleSaveCloudinarySettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("cloudinary_cloud_name", cloudNameInput.trim());
      localStorage.setItem("cloudinary_upload_preset", uploadPresetInput.trim());
      triggerSaveNotification();
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "16795200") {
      setIsAuthenticated(true);
      setPasscodeError(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("admin_authenticated", "true");
      }
    } else {
      setPasscodeError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_authenticated");
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
      thumbnail: "",
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
      thumbnail: b.thumbnail || "",
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
      thumbnail: blogForm.thumbnail,
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

  // Handlers for Specialization CRUD
  const openNewSpecModal = () => {
    setEditingSpec(null);
    setSpecForm({ title: "", desc: "", projects: "", icon: "Terminal" });
    setIsSpecModalOpen(true);
  };

  const openEditSpecModal = (s: SpecializationItem) => {
    setEditingSpec(s);
    setSpecForm({ title: s.title, desc: s.desc, projects: s.projects, icon: s.icon || "Wrench" });
    setIsSpecModalOpen(true);
  };

  const handleSaveSpec = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSpec) {
      updateSpecialization(editingSpec.id, specForm);
    } else {
      addSpecialization(specForm);
    }
    setIsSpecModalOpen(false);
    triggerSaveNotification();
  };

  // Handlers for Experience CRUD
  const openNewExpModal = () => {
    setEditingExp(null);
    setExpForm({ period: "2024 - Present", role: "", company: "", description: "", skills: "Playwright, TypeScript" });
    setIsExpModalOpen(true);
  };

  const openEditExpModal = (exp: ExperienceItem) => {
    setEditingExp(exp);
    setExpForm({
      period: exp.period,
      role: exp.role,
      company: exp.company,
      description: exp.description,
      skills: exp.skills ? exp.skills.join(", ") : "",
    });
    setIsExpModalOpen(true);
  };

  const handleSaveExp = (e: React.FormEvent) => {
    e.preventDefault();
    const skillList = expForm.skills.split(",").map((s) => s.trim()).filter(Boolean);
    if (editingExp) {
      updateExperience(editingExp.id, { ...expForm, skills: skillList });
    } else {
      addExperience({ ...expForm, skills: skillList });
    }
    setIsExpModalOpen(false);
    triggerSaveNotification();
  };

  // Handlers for Education CRUD
  const openNewEduModal = () => {
    setEditingEdu(null);
    setEduForm({ period: "2019 - 2023", degree: "", institution: "", description: "" });
    setIsEduModalOpen(true);
  };

  const openEditEduModal = (edu: EducationItem) => {
    setEditingEdu(edu);
    setEduForm({
      period: edu.period,
      degree: edu.degree,
      institution: edu.institution,
      description: edu.description,
    });
    setIsEduModalOpen(true);
  };

  const handleSaveEdu = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEdu) {
      updateEducation(editingEdu.id, eduForm);
    } else {
      addEducation(eduForm);
    }
    setIsEduModalOpen(false);
    triggerSaveNotification();
  };

  // Handlers for Skill & Cert
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillForm.name) return;
    addSkill(newSkillForm);
    setNewSkillForm({ name: "", category: "Automation", percentage: 90, icon: "" });
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
              <label className="text-xs text-slate-400 font-medium">Passcode</label>
              <input
                type="password"
                required
                placeholder="Enter passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
              />
              {passcodeError && (
                <p className="text-xs text-rose-400 pt-1">Incorrect passcode. Please try again.</p>
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
              onClick={() => setActiveTab("specializations")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "specializations" ? "bg-sky-500 text-black font-bold shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Wrench className="w-4 h-4" />
                <span>Specializations</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {specializations.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("resume")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "resume" ? "bg-sky-500 text-black font-bold shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>Education & Exp</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {experiences.length + educations.length}
              </span>
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
            onClick={handleLogout}
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

                  <div className="pt-2">
                    <CloudinaryImageUploader
                      label="Hero Profile Image (Cloudinary)"
                      value={profile.profileImage || ""}
                      onChange={(url) => updateProfile({ profileImage: url })}
                      aspectRatio="square"
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

        {/* TAB: SPECIALIZATIONS */}
        {activeTab === "specializations" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Specializations & Services</h1>
                <p className="text-xs text-slate-400">Manage quality engineering specializations displayed on the homepage.</p>
              </div>

              <button
                onClick={openNewSpecModal}
                className="px-5 py-2.5 rounded-full bg-sky-500 text-black font-bold text-xs flex items-center gap-2 hover:bg-sky-400 transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Specialization</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specializations.map((spec) => (
                <div
                  key={spec.id}
                  className="p-6 rounded-3xl bg-[#111827] border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        Icon: {spec.icon || "Wrench"}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditSpecModal(spec)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${spec.title}"?`)) {
                              deleteSpecialization(spec.id);
                              triggerSaveNotification();
                            }
                          }}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white">{spec.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{spec.desc}</p>
                  </div>

                  {spec.projects && (
                    <div className="text-[11px] font-mono text-emerald-400 pt-2 border-t border-slate-800/80 font-bold">
                      ⚡ {spec.projects}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: EDUCATION & EXPERIENCE */}
        {activeTab === "resume" && (
          <div className="space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Education & Experience</h1>
                <p className="text-xs text-slate-400">Manage work history timeline and academic degrees.</p>
              </div>
            </div>

            {/* Work Experiences Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-sky-400" />
                  <h2 className="text-lg font-bold text-white">Work Experience</h2>
                </div>
                <button
                  onClick={openNewExpModal}
                  className="px-4 py-2 rounded-xl bg-sky-500 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-sky-400 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-3 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                            {exp.period}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold">{exp.company}</span>
                        </div>
                        <h3 className="text-lg font-extrabold text-white">{exp.role}</h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openEditExpModal(exp)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${exp.role} at ${exp.company}"?`)) {
                              deleteExperience(exp.id);
                              triggerSaveNotification();
                            }
                          }}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>

                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Education Section */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-sky-400" />
                  <h2 className="text-lg font-bold text-white">Academic Foundation</h2>
                </div>
                <button
                  onClick={openNewEduModal}
                  className="px-4 py-2 rounded-xl bg-sky-500 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-sky-400 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Education</span>
                </button>
              </div>

              <div className="space-y-4">
                {educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                            {edu.period}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold">{edu.institution}</span>
                        </div>
                        <h3 className="text-lg font-extrabold text-white">{edu.degree}</h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openEditEduModal(edu)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${edu.degree}"?`)) {
                              deleteEducation(edu.id);
                              triggerSaveNotification();
                            }
                          }}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{edu.description}</p>
                  </div>
                ))}
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
            <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-sky-400">Add New Tech Skill</h3>
              <form onSubmit={handleAddSkill} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
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

                  <div>
                    <label className="text-xs text-slate-400">Category</label>
                    <input
                      type="text"
                      value={newSkillForm.category}
                      onChange={(e) => setNewSkillForm({ ...newSkillForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
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
                </div>

                <div>
                  <CloudinaryImageUploader
                    label="Skill Icon / Logo (Cloudinary Image or Emoji)"
                    value={newSkillForm.icon}
                    onChange={(url) => setNewSkillForm({ ...newSkillForm, icon: url })}
                    placeholder="https://res.cloudinary.com/... or 🚀"
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
            </div>

            {/* List Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((s) => (
                <div key={s.id} className="p-4 rounded-2xl bg-[#111827] border border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0f172a] border border-slate-700 flex items-center justify-center text-xl shrink-0 overflow-hidden p-1">
                      {s.icon && (s.icon.startsWith("http") || s.icon.startsWith("/") || s.icon.startsWith("data:")) ? (
                        <img src={s.icon} alt={s.name} className="w-7 h-7 object-contain rounded-md" />
                      ) : (
                        <span>{s.icon || "⚡"}</span>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{s.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{s.category} • {s.percentage}%</div>
                    </div>
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
              <p className="text-xs text-slate-400">Manage Cloudinary credentials, image hosting, and data reset.</p>
            </div>

            {/* Cloudinary Credentials Panel */}
            <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
                <Cloud className="w-4 h-4 text-sky-400" />
                <span>Cloudinary Hosting Configuration</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Configure your Cloudinary Cloud Name and Unsigned Upload Preset to host hero images, blog thumbnails, and skill logos.
              </p>

              <form onSubmit={handleSaveCloudinarySettings} className="space-y-4 pt-1">
                <div>
                  <label className="text-xs text-slate-400">Cloud Name</label>
                  <input
                    type="text"
                    required
                    value={cloudNameInput}
                    onChange={(e) => setCloudNameInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400">Upload Preset (Unsigned)</label>
                  <input
                    type="text"
                    required
                    value={uploadPresetInput}
                    onChange={(e) => setUploadPresetInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Credentials</span>
                </button>
              </form>
            </div>

            {/* Email Notification Panel */}
            <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>Contact Email Notifications & Inbox</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Messages sent via the Contact Section are automatically saved to your <strong className="text-slate-200">Admin Inbox</strong> and forwarded to your email address.
              </p>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-xs text-slate-400">Target Receiver Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfile({ email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-white text-xs mt-1 font-mono focus:outline-none focus:border-sky-500"
                  />
                  <p className="text-[11px] text-slate-500 pt-1">
                    Messages from website visitors will be sent to this email address.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#0f172a] border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-time Admin Inbox Enabled</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    All visitor inquiries appear instantly in your <button type="button" onClick={() => setActiveTab("inbox")} className="text-sky-400 underline">Admin Inbox</button> tab.
                  </p>
                </div>
              </div>
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

              <div className="pt-1">
                <CloudinaryImageUploader
                  label="Blog Thumbnail Image (Cloudinary)"
                  value={blogForm.thumbnail}
                  onChange={(url) => setBlogForm({ ...blogForm, thumbnail: url })}
                  aspectRatio="video"
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

      {/* Specialization Modal */}
      {isSpecModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-md w-full bg-[#111827] border border-slate-800 rounded-3xl p-6 space-y-6 text-slate-100 shadow-2xl">
            <h2 className="text-xl font-extrabold">
              {editingSpec ? "Edit Specialization" : "Add Specialization"}
            </h2>

            <form onSubmit={handleSaveSpec} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Test Automation Frameworks"
                  value={specForm.title}
                  onChange={(e) => setSpecForm({ ...specForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed description of service..."
                  value={specForm.desc}
                  onChange={(e) => setSpecForm({ ...specForm, desc: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Projects / Highlight Metric</label>
                <input
                  type="text"
                  placeholder="e.g. 45+ Frameworks Built"
                  value={specForm.projects}
                  onChange={(e) => setSpecForm({ ...specForm, projects: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Icon</label>
                <select
                  value={specForm.icon}
                  onChange={(e) => setSpecForm({ ...specForm, icon: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                >
                  <option value="Terminal">Terminal</option>
                  <option value="Cpu">Cpu</option>
                  <option value="Gauge">Gauge</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="GitBranch">GitBranch</option>
                  <option value="ShieldAlert">ShieldAlert</option>
                  <option value="Wrench">Wrench</option>
                  <option value="Code">Code</option>
                  <option value="Layers">Layers</option>
                  <option value="Zap">Zap</option>
                  <option value="CheckCircle">CheckCircle</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsSpecModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 text-black font-bold text-xs"
                >
                  Save Specialization
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {isExpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-md w-full bg-[#111827] border border-slate-800 rounded-3xl p-6 space-y-6 text-slate-100 shadow-2xl">
            <h2 className="text-xl font-extrabold">
              {editingExp ? "Edit Work Experience" : "Add Work Experience"}
            </h2>

            <form onSubmit={handleSaveExp} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Time Period</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2023 - Present"
                    value={expForm.period}
                    onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Enterprise QA Labs"
                    value={expForm.company}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400">Role / Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SQA & Automation Engineer"
                  value={expForm.role}
                  onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Responsibilities and achievements..."
                  value={expForm.description}
                  onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Skills / Tools (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Playwright, TypeScript, Docker, JMeter"
                  value={expForm.skills}
                  onChange={(e) => setExpForm({ ...expForm, skills: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsExpModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 text-black font-bold text-xs"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {isEduModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-md w-full bg-[#111827] border border-slate-800 rounded-3xl p-6 space-y-6 text-slate-100 shadow-2xl">
            <h2 className="text-xl font-extrabold">
              {editingEdu ? "Edit Education" : "Add Education"}
            </h2>

            <form onSubmit={handleSaveEdu} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Time Period</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2015 - 2019"
                    value={eduForm.period}
                    onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400">Institution / University</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhaka University of Engineering & Tech"
                    value={eduForm.institution}
                    onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400">Degree / Qualification</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Sc. in Computer Science & Engineering"
                  value={eduForm.degree}
                  onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Major subjects, thesis topic, honors, etc."
                  value={eduForm.description}
                  onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-slate-700 text-xs mt-1"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEduModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 text-black font-bold text-xs"
                >
                  Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
