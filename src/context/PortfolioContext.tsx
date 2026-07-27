"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  availability: string;
  profileImage?: string;
}

export interface HeroData {
  headline1: string;
  headline2: string;
  subtitle: string;
  yearsExp: string;
  suitesCount: string;
  defectRate: string;
  productsCount: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  metrics: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  tags: string[];
  thumbnail?: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      codeSnippet?: string;
    }[];
    conclusion: string;
  };
}

export interface SpecializationItem {
  id: string;
  title: string;
  desc: string;
  projects: string;
  icon: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  percentage: number;
  icon?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

interface PortfolioContextType {
  profile: ProfileData;
  hero: HeroData;
  projects: Project[];
  blogs: BlogPost[];
  skills: Skill[];
  certifications: Certification[];
  messages: ContactMessage[];
  specializations: SpecializationItem[];
  experiences: ExperienceItem[];
  educations: EducationItem[];
  isCloudConnected: boolean;
  
  // Actions
  updateProfile: (data: Partial<ProfileData>) => void;
  updateHero: (data: Partial<HeroData>) => void;
  
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addBlog: (blog: Omit<BlogPost, "id">) => void;
  updateBlog: (id: string, blog: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;
  
  addSkill: (skill: Omit<Skill, "id">) => void;
  deleteSkill: (id: string) => void;
  
  addCertification: (cert: Omit<Certification, "id">) => void;
  deleteCertification: (id: string) => void;
  
  addContactMessage: (msg: Omit<ContactMessage, "id" | "date" | "read">) => void;
  toggleMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  
  addSpecialization: (spec: Omit<SpecializationItem, "id">) => void;
  updateSpecialization: (id: string, spec: Partial<SpecializationItem>) => void;
  deleteSpecialization: (id: string) => void;
  
  addExperience: (exp: Omit<ExperienceItem, "id">) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  
  addEducation: (edu: Omit<EducationItem, "id">) => void;
  updateEducation: (id: string, edu: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  
  resetToDefaults: () => void;
}

const defaultProfile: ProfileData = {
  name: "Abdullah Al Omar",
  title: "Software Quality Assurance Engineer & Test Automation Specialist",
  bio: "I specialize in building bulletproof test automation frameworks, CI/CD quality gates, API regression suites, and high-concurrency performance benchmarks.",
  location: "Dhaka, Bangladesh • Available Remote",
  email: "abdullahalomar048@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  availability: "Open for Freelance & Contract",
  profileImage: "/abdullah-profile.png",
};

const defaultHero: HeroData = {
  headline1: "Say Hi from Abdullah,",
  headline2: "SQA Engineer.",
  subtitle: "I specialize in building bulletproof test automation frameworks, CI/CD quality gates, API regression suites, and high-concurrency performance benchmarks so products deploy faster with zero critical defects.",
  yearsExp: "6",
  suitesCount: "120",
  defectRate: "99.9",
  productsCount: "50",
};

const defaultProjects: Project[] = [
  {
    id: "proj-1",
    title: "E-Commerce Microservices Automation Suite",
    subtitle: "End-to-End Playwright & TypeScript Framework",
    category: "Web & API Automation",
    description: "Designed a cross-browser automated testing framework covering checkout, cart operations, payment gateway webhooks, and session management with parallel worker execution.",
    metrics: "Reduced regression testing time from 14 hours to 22 minutes.",
    tags: ["Playwright", "TypeScript", "Allure Report", "GitHub Actions"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "proj-2",
    title: "FinTech Banking API Quality Gate & Mock Server",
    subtitle: "Postman, Newman & Docker Pipeline",
    category: "API Regression",
    description: "Built automated test suites covering 350+ REST endpoints with automated OAuth2 token refresh, payload JSON schema validation, and custom failure notifications.",
    metrics: "Caught 45+ breaking API contract issues pre-production.",
    tags: ["Postman", "Newman", "Docker", "REST API", "Slack Webhooks"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: "proj-3",
    title: "High-Concurrency Distributed Load Benchmark",
    subtitle: "Apache JMeter & Grafana Telemetry",
    category: "Performance Testing",
    description: "Simulated 50,000+ concurrent virtual users across distributed slave nodes to stress test order placement endpoints during Black Friday sales events.",
    metrics: "Identified DB connection pool bottleneck at 35k RPS.",
    tags: ["JMeter", "InfluxDB", "Grafana", "Distributed Testing"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  }
];

const defaultBlogs: BlogPost[] = [
  {
    id: "playwright-framework-architecture",
    title: "Building Scalable Playwright Frameworks for Enterprise Microservices",
    excerpt: "Learn how to structure end-to-end automation test suites with Page Object Pattern, parallel execution, API mocking, and custom HTML reporting in Playwright.",
    category: "Automation Testing",
    date: "Jul 18, 2026",
    readTime: "6 min read",
    author: "Abdullah Al Omar",
    authorRole: "SQA Lead & Test Specialist",
    tags: ["Playwright", "TypeScript", "POM", "CI/CD"],
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80",
    content: {
      intro: "End-to-End (E2E) testing often becomes flakiness-prone if the framework architecture is not designed for scale. Playwright has revolutionized web automation with native auto-waiting, browser context isolation, and powerful API request interception.",
      sections: [
        {
          heading: "1. Page Object Model (POM) with TypeScript",
          body: "Separating page element locators and action methods from test assertions guarantees long-term maintainability. When UI elements change, updates are confined to single POM classes.",
          codeSnippet: `export class LoginPage {\n  readonly page: Page;\n  readonly usernameInput: Locator;\n  readonly passwordInput: Locator;\n  readonly submitButton: Locator;\n\n  constructor(page: Page) {\n    this.page = page;\n    this.usernameInput = page.getByLabel('Username');\n    this.passwordInput = page.getByLabel('Password');\n    this.submitButton = page.getByRole('button', { name: 'Sign in' });\n  }\n}`
        },
        {
          heading: "2. Parallel Execution & Isolated Browser Contexts",
          body: "Playwright runs tests in parallel across multiple worker threads by default. Each worker gets a fresh browser context, eliminating state leakage and session pollution across test suites."
        }
      ],
      conclusion: "Adopting modular POM architecture and API mocking in Playwright reduces execution times by over 70% while achieving 99.9% test reliability."
    }
  },
  {
    id: "postman-newman-github-actions",
    title: "Shift-Left Quality Gates: Integrating Postman & Newman in GitHub Actions",
    excerpt: "A step-by-step guide to automating API regression suites on every pull request using Newman CLI docker containers and Slack instant notifications.",
    category: "API Testing & DevOps",
    date: "Jun 24, 2026",
    readTime: "5 min read",
    author: "Abdullah Al Omar",
    authorRole: "SQA Lead & Test Specialist",
    tags: ["Postman", "Newman", "GitHub Actions", "REST API"],
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    content: {
      intro: "Waiting for staging deployments before discovering API breaking changes increases bug fix costs by up to 10x. Shift-Left API testing automates collection runs on every pull request.",
      sections: [
        {
          heading: "1. Executing via Newman CLI in Docker",
          body: "Newman allows headless execution of Postman collections in CI environments inside clean alpine docker images for zero environmental drift.",
          codeSnippet: `name: API Quality Gate\non: [pull_request]\njobs:\n  api-test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npx newman run ./api_tests.json`
        }
      ],
      conclusion: "Automating Newman API quality gates guarantees that zero regression bugs slip into production releases."
    }
  }
];

const defaultSkills: Skill[] = [
  { id: "s-1", name: "Playwright & TypeScript", category: "Automation", percentage: 95, icon: "🎭" },
  { id: "s-2", name: "Selenium WebDriver & Java", category: "Automation", percentage: 90, icon: "🌐" },
  { id: "s-3", name: "Postman & Newman CLI", category: "API & Load", percentage: 98, icon: "🚀" },
  { id: "s-4", name: "REST Assured & PyTest", category: "API & Load", percentage: 88, icon: "🐍" },
  { id: "s-5", name: "Apache JMeter & K6", category: "API & Load", percentage: 85, icon: "⚡" },
  { id: "s-6", name: "GitHub Actions & Docker", category: "DevOps & DB", percentage: 92, icon: "🐳" },
];

const defaultCertifications: Certification[] = [
  { id: "c-1", title: "ISTQB Certified Test Automation Engineer (CTAE)", issuer: "ISTQB", date: "2022", badge: "Advanced Level" },
  { id: "c-2", title: "Postman API Automation Specialist", issuer: "Postman Academy", date: "2023", badge: "Certified" },
  { id: "c-3", title: "Apache JMeter Performance Testing Master", issuer: "Blazemeter University", date: "2023", badge: "Professional" },
];

const defaultMessages: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Alex Vance",
    email: "alex@techcorp.com",
    subject: "Automation Framework Consultation",
    message: "Hi Abdullah, we are looking to overhaul our manual QA process into a automated Playwright framework. Are you available for a 3-month contract?",
    date: "Jul 22, 2026",
    read: false,
  }
];

const defaultSpecializations: SpecializationItem[] = [
  {
    id: "spec-1",
    title: "Test Automation Frameworks",
    desc: "Building scalable, maintainable Page Object Model (POM) suites in TypeScript/Python using Playwright, Selenium, and Cypress with zero flaky tests.",
    projects: "45+ Frameworks Built",
    icon: "Terminal",
  },
  {
    id: "spec-2",
    title: "API & Microservices Testing",
    desc: "Automating REST, GraphQL, and gRPC endpoints with Postman, REST Assured, and Karat. Contract validation and automated schema regression.",
    projects: "300+ Endpoints Tested",
    icon: "Cpu",
  },
  {
    id: "spec-3",
    title: "Performance & Load Engineering",
    desc: "Simulating tens of thousands of concurrent users using JMeter & K6. Bottleneck identification, API response latency profiling & Grafana dashboards.",
    projects: "50+ Load Audits",
    icon: "Gauge",
  },
  {
    id: "spec-4",
    title: "Mobile App QA (iOS & Android)",
    desc: "Automating native and hybrid mobile app testing using Appium & BrowserStack across physical devices and emulators.",
    projects: "25+ Apps Certified",
    icon: "Smartphone",
  },
  {
    id: "spec-5",
    title: "CI/CD & Quality Gates",
    desc: "Embedding automated quality checks into GitHub Actions, Jenkins, and GitLab CI pipelines to prevent buggy code from merging into main.",
    projects: "60+ CI Pipelines",
    icon: "GitBranch",
  },
  {
    id: "spec-6",
    title: "Security & Vulnerability QA",
    desc: "Performing OWASP Top 10 security audits, SQL injection prevention checks, XSS payload testing, and API authentication validation.",
    projects: "40+ Security Audits",
    icon: "ShieldAlert",
  },
];

const defaultExperiences: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2023 - Present",
    role: "SQA & Automation Engineer",
    company: "Enterprise QA Labs",
    description: "Spearheaded enterprise Playwright & Cypress automation architecture across 12 microservices. Reduced release regression cycle duration from 5 days to 45 minutes with parallel Docker execution.",
    skills: ["Playwright", "TypeScript", "CI/CD", "Docker", "JMeter", "K8s"],
  },
  {
    id: "exp-2",
    period: "2021 - 2023",
    role: "Automation QA Engineer",
    company: "FinTech Quality Systems",
    description: "Built end-to-end API test suites using Postman and REST Assured for high-volume payment processing systems. Achieved 99.8% test coverage and eliminated critical production leaks.",
    skills: ["Postman", "REST Assured", "Java", "Selenium", "SQL", "Jenkins"],
  },
  {
    id: "exp-3",
    period: "2019 - 2021",
    role: "Software QA Engineer",
    company: "Apex Tech Studios",
    description: "Executed functional, cross-browser, and mobile app testing using Appium & Selenium. Collaborated with dev teams to implement zero-bug bounce release policies.",
    skills: ["Selenium", "Appium", "JIRA", "TestNG", "Git", "BrowserStack"],
  },
];

const defaultEducations: EducationItem[] = [
  {
    id: "edu-1",
    period: "2015 - 2019",
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Dhaka University of Engineering & Technology",
    description: "Focused on Software Engineering, Database Systems, Automated Software Testing, and Operating Systems. Graduated with Honors.",
  },
];

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [hero, setHero] = useState<HeroData>(defaultHero);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [blogs, setBlogs] = useState<BlogPost[]>(defaultBlogs);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [certifications, setCertifications] = useState<Certification[]>(defaultCertifications);
  const [messages, setMessages] = useState<ContactMessage[]>(defaultMessages);
  const [specializations, setSpecializations] = useState<SpecializationItem[]>(defaultSpecializations);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(defaultExperiences);
  const [educations, setEducations] = useState<EducationItem[]>(defaultEducations);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data on mount from Supabase DB or LocalStorage
  useEffect(() => {
    async function loadPortfolioData() {
      if (isSupabaseConfigured && supabase) {
        try {
          const [
            { data: profData },
            { data: heroData },
            { data: projData },
            { data: blogData },
            { data: skillData },
            { data: certData },
            { data: msgData },
          ] = await Promise.all([
            supabase.from("profile").select("*").eq("id", 1).single(),
            supabase.from("hero").select("*").eq("id", 1).single(),
            supabase.from("projects").select("*").order("created_at", { ascending: false }),
            supabase.from("blogs").select("*").order("created_at", { ascending: false }),
            supabase.from("skills").select("*").order("created_at", { ascending: true }),
            supabase.from("certifications").select("*").order("created_at", { ascending: true }),
            supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
          ]);

          if (profData) {
            setProfile({
              name: profData.name,
              title: profData.title,
              bio: profData.bio,
              location: profData.location,
              email: profData.email,
              github: profData.github,
              linkedin: profData.linkedin,
              twitter: profData.twitter,
              availability: profData.availability,
              profileImage: profData.profile_image || profData.profileImage || "/abdullah-profile.png",
            });
          }
          if (heroData) {
            setHero({
              headline1: heroData.headline1,
              headline2: heroData.headline2,
              subtitle: heroData.subtitle,
              yearsExp: heroData.years_exp,
              suitesCount: heroData.suites_count,
              defectRate: heroData.defect_rate,
              productsCount: heroData.products_count,
            });
          }
          if (projData && projData.length > 0) {
            setProjects(
              projData.map((p) => ({
                id: p.id,
                title: p.title,
                subtitle: p.subtitle || "",
                category: p.category,
                description: p.description,
                metrics: p.metrics || "",
                tags: p.tags || [],
                githubUrl: p.github_url || "",
                liveUrl: p.live_url || "",
              }))
            );
          }
          if (blogData && blogData.length > 0) {
            setBlogs(
              blogData.map((b) => ({
                id: b.id,
                title: b.title,
                excerpt: b.excerpt,
                category: b.category,
                date: b.date,
                readTime: b.read_time,
                author: b.author,
                authorRole: b.author_role || "",
                tags: b.tags || [],
                thumbnail: b.thumbnail || "",
                content: b.content,
              }))
            );
          }
          if (skillData && skillData.length > 0) {
            setSkills(
              skillData.map((s) => ({
                id: s.id,
                name: s.name,
                category: s.category,
                percentage: s.percentage,
                icon: s.icon || "",
              }))
            );
          }
          if (certData && certData.length > 0) setCertifications(certData);
          if (msgData && msgData.length > 0) setMessages(msgData);
        } catch (err) {
          console.error("Supabase load fallback to localStorage", err);
        }
      } else {
        // LocalStorage Fallback
        try {
          const savedProfile = localStorage.getItem("portfolio_profile");
          const savedHero = localStorage.getItem("portfolio_hero");
          const savedProjects = localStorage.getItem("portfolio_projects");
          const savedBlogs = localStorage.getItem("portfolio_blogs");
          const savedSkills = localStorage.getItem("portfolio_skills");
          const savedCerts = localStorage.getItem("portfolio_certifications");
          const savedMsgs = localStorage.getItem("portfolio_messages");
          const savedSpecs = localStorage.getItem("portfolio_specializations");
          const savedExps = localStorage.getItem("portfolio_experiences");
          const savedEdus = localStorage.getItem("portfolio_educations");

          if (savedProfile) setProfile(JSON.parse(savedProfile));
          if (savedHero) setHero(JSON.parse(savedHero));
          if (savedProjects) setProjects(JSON.parse(savedProjects));
          if (savedBlogs) setBlogs(JSON.parse(savedBlogs));
          if (savedSkills) setSkills(JSON.parse(savedSkills));
          if (savedCerts) setCertifications(JSON.parse(savedCerts));
          if (savedMsgs) setMessages(JSON.parse(savedMsgs));
          if (savedSpecs) setSpecializations(JSON.parse(savedSpecs));
          if (savedExps) setExperiences(JSON.parse(savedExps));
          if (savedEdus) setEducations(JSON.parse(savedEdus));
        } catch (e) {
          console.error("Failed loading from localStorage", e);
        }
      }
      setIsLoaded(true);
    }

    loadPortfolioData();
  }, []);

  // Sync to LocalStorage as cache fallback
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("portfolio_profile", JSON.stringify(profile));
      localStorage.setItem("portfolio_hero", JSON.stringify(hero));
      localStorage.setItem("portfolio_projects", JSON.stringify(projects));
      localStorage.setItem("portfolio_blogs", JSON.stringify(blogs));
      localStorage.setItem("portfolio_skills", JSON.stringify(skills));
      localStorage.setItem("portfolio_certifications", JSON.stringify(certifications));
      localStorage.setItem("portfolio_messages", JSON.stringify(messages));
      localStorage.setItem("portfolio_specializations", JSON.stringify(specializations));
      localStorage.setItem("portfolio_experiences", JSON.stringify(experiences));
      localStorage.setItem("portfolio_educations", JSON.stringify(educations));
    } catch (e) {
      console.error("Failed caching to localStorage", e);
    }
  }, [profile, hero, projects, blogs, skills, certifications, messages, specializations, experiences, educations, isLoaded]);

  const updateProfile = async (data: Partial<ProfileData>) => {
    const updated = { ...profile, ...data };
    setProfile(updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from("profile").upsert({
        id: 1,
        name: updated.name,
        title: updated.title,
        bio: updated.bio,
        location: updated.location,
        email: updated.email,
        github: updated.github,
        linkedin: updated.linkedin,
        twitter: updated.twitter,
        availability: updated.availability,
        profile_image: updated.profileImage,
      });
    }
  };

  const updateHero = async (data: Partial<HeroData>) => {
    const updated = { ...hero, ...data };
    setHero(updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from("hero").upsert({
        id: 1,
        headline1: updated.headline1,
        headline2: updated.headline2,
        subtitle: updated.subtitle,
        years_exp: updated.yearsExp,
        suites_count: updated.suitesCount,
        defect_rate: updated.defectRate,
        products_count: updated.productsCount,
      });
    }
  };

  const addProject = async (p: Omit<Project, "id">) => {
    const newProj: Project = { ...p, id: "proj-" + Date.now() };
    setProjects((prev) => [newProj, ...prev]);

    if (isSupabaseConfigured && supabase) {
      await supabase.from("projects").insert({
        id: newProj.id,
        title: newProj.title,
        subtitle: newProj.subtitle,
        category: newProj.category,
        description: newProj.description,
        metrics: newProj.metrics,
        tags: newProj.tags,
        github_url: newProj.githubUrl,
        live_url: newProj.liveUrl,
      });
    }
  };

  const updateProject = async (id: string, p: Partial<Project>) => {
    setProjects((prev) => prev.map((item) => (item.id === id ? { ...item, ...p } : item)));

    if (isSupabaseConfigured && supabase) {
      const target = projects.find((item) => item.id === id);
      if (target) {
        const merged = { ...target, ...p };
        await supabase.from("projects").update({
          title: merged.title,
          subtitle: merged.subtitle,
          category: merged.category,
          description: merged.description,
          metrics: merged.metrics,
          tags: merged.tags,
          github_url: merged.githubUrl,
          live_url: merged.liveUrl,
        }).eq("id", id);
      }
    }
  };

  const deleteProject = async (id: string) => {
    setProjects((prev) => prev.filter((item) => item.id !== id));
    if (isSupabaseConfigured && supabase) {
      await supabase.from("projects").delete().eq("id", id);
    }
  };

  const addBlog = async (b: Omit<BlogPost, "id">) => {
    const newB: BlogPost = { ...b, id: "blog-" + Date.now() };
    setBlogs((prev) => [newB, ...prev]);

    if (isSupabaseConfigured && supabase) {
      await supabase.from("blogs").insert({
        id: newB.id,
        title: newB.title,
        excerpt: newB.excerpt,
        category: newB.category,
        date: newB.date,
        read_time: newB.readTime,
        author: newB.author,
        author_role: newB.authorRole,
        tags: newB.tags,
        content: newB.content,
        thumbnail: newB.thumbnail,
      });
    }
  };

  const updateBlog = async (id: string, b: Partial<BlogPost>) => {
    setBlogs((prev) => prev.map((item) => (item.id === id ? { ...item, ...b } : item)));

    if (isSupabaseConfigured && supabase) {
      const target = blogs.find((item) => item.id === id);
      if (target) {
        const merged = { ...target, ...b };
        await supabase.from("blogs").update({
          title: merged.title,
          excerpt: merged.excerpt,
          category: merged.category,
          date: merged.date,
          read_time: merged.readTime,
          author: merged.author,
          author_role: merged.authorRole,
          tags: merged.tags,
          content: merged.content,
          thumbnail: merged.thumbnail,
        }).eq("id", id);
      }
    }
  };

  const deleteBlog = async (id: string) => {
    setBlogs((prev) => prev.filter((item) => item.id !== id));
    if (isSupabaseConfigured && supabase) {
      await supabase.from("blogs").delete().eq("id", id);
    }
  };

  const addSkill = async (s: Omit<Skill, "id">) => {
    const newS: Skill = { ...s, id: "skill-" + Date.now() };
    setSkills((prev) => [...prev, newS]);

    if (isSupabaseConfigured && supabase) {
      await supabase.from("skills").insert({
        id: newS.id,
        name: newS.name,
        category: newS.category,
        percentage: newS.percentage,
        icon: newS.icon,
      });
    }
  };

  const deleteSkill = async (id: string) => {
    setSkills((prev) => prev.filter((item) => item.id !== id));
    if (isSupabaseConfigured && supabase) {
      await supabase.from("skills").delete().eq("id", id);
    }
  };

  const addCertification = async (c: Omit<Certification, "id">) => {
    const newC: Certification = { ...c, id: "cert-" + Date.now() };
    setCertifications((prev) => [...prev, newC]);

    if (isSupabaseConfigured && supabase) {
      await supabase.from("certifications").insert(newC);
    }
  };

  const deleteCertification = async (id: string) => {
    setCertifications((prev) => prev.filter((item) => item.id !== id));
    if (isSupabaseConfigured && supabase) {
      await supabase.from("certifications").delete().eq("id", id);
    }
  };

  const addContactMessage = async (msg: Omit<ContactMessage, "id" | "date" | "read">) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: "msg-" + Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      read: false,
    };
    setMessages((prev) => [newMsg, ...prev]);

    if (isSupabaseConfigured && supabase) {
      await supabase.from("contact_messages").insert(newMsg);
    }
  };

  const toggleMessageRead = async (id: string) => {
    const updated = messages.map((item) => (item.id === id ? { ...item, read: !item.read } : item));
    setMessages(updated);

    if (isSupabaseConfigured && supabase) {
      const target = updated.find((m) => m.id === id);
      if (target) {
        await supabase.from("contact_messages").update({ read: target.read }).eq("id", id);
      }
    }
  };

  const deleteMessage = async (id: string) => {
    setMessages((prev) => prev.filter((item) => item.id !== id));
    if (isSupabaseConfigured && supabase) {
      await supabase.from("contact_messages").delete().eq("id", id);
    }
  };

  const addSpecialization = async (spec: Omit<SpecializationItem, "id">) => {
    const newSpec: SpecializationItem = { ...spec, id: "spec-" + Date.now() };
    setSpecializations((prev) => [...prev, newSpec]);
  };

  const updateSpecialization = async (id: string, spec: Partial<SpecializationItem>) => {
    setSpecializations((prev) => prev.map((item) => (item.id === id ? { ...item, ...spec } : item)));
  };

  const deleteSpecialization = async (id: string) => {
    setSpecializations((prev) => prev.filter((item) => item.id !== id));
  };

  const addExperience = async (exp: Omit<ExperienceItem, "id">) => {
    const newExp: ExperienceItem = { ...exp, id: "exp-" + Date.now() };
    setExperiences((prev) => [newExp, ...prev]);
  };

  const updateExperience = async (id: string, exp: Partial<ExperienceItem>) => {
    setExperiences((prev) => prev.map((item) => (item.id === id ? { ...item, ...exp } : item)));
  };

  const deleteExperience = async (id: string) => {
    setExperiences((prev) => prev.filter((item) => item.id !== id));
  };

  const addEducation = async (edu: Omit<EducationItem, "id">) => {
    const newEdu: EducationItem = { ...edu, id: "edu-" + Date.now() };
    setEducations((prev) => [...prev, newEdu]);
  };

  const updateEducation = async (id: string, edu: Partial<EducationItem>) => {
    setEducations((prev) => prev.map((item) => (item.id === id ? { ...item, ...edu } : item)));
  };

  const deleteEducation = async (id: string) => {
    setEducations((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefaults = () => {
    setProfile(defaultProfile);
    setHero(defaultHero);
    setProjects(defaultProjects);
    setBlogs(defaultBlogs);
    setSkills(defaultSkills);
    setCertifications(defaultCertifications);
    setMessages(defaultMessages);
    setSpecializations(defaultSpecializations);
    setExperiences(defaultExperiences);
    setEducations(defaultEducations);
    localStorage.clear();
  };

  return (
    <PortfolioContext.Provider
      value={{
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
        isCloudConnected: isSupabaseConfigured,
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
        addContactMessage,
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolioData must be used within a PortfolioProvider");
  }
  return context;
}
