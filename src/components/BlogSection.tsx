"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowUpRight, 
  X, 
  User, 
  Tag, 
  Share2, 
  Check 
} from "lucide-react";
import { usePortfolioData, BlogPost } from "@/context/PortfolioContext";

export default function BlogSection() {
  const { blogs } = usePortfolioData();
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const openBlog = (post: BlogPost) => {
    setSelectedBlog(post);
    document.body.style.overflow = "hidden";
  };

  const closeBlog = () => {
    setSelectedBlog(null);
    document.body.style.overflow = "auto";
  };

  const copyArticleLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="blog" className="scroll-mt-12 space-y-8 pt-6">
      {/* Tag */}
      <div className="section-tag">
        <BookOpen className="w-3.5 h-3.5 text-sky-500 dark:text-[#38bdf8]" />
        <span>BLOG & ARTICLES</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-3">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          SQA & Automation <span className="text-sky-500 dark:text-[#38bdf8]">Insights</span>
        </h2>
        <p className="text-base text-slate-600 dark:text-[#999999] max-w-2xl">
          In-depth technical guides, automation frameworks setup, and software quality assurance engineering practices. Click any article to read full details.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <article
            key={post.id}
            onClick={() => openBlog(post)}
            className="group cursor-pointer p-6 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#2a2a2a] hover:border-sky-500/50 dark:hover:border-[#38bdf8]/50 transition-all duration-300 shadow-md hover:shadow-xl dark:shadow-none flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Category & Date */}
              <div className="flex items-center justify-between text-xs">
                <span className="px-3 py-1 rounded-full bg-sky-50 dark:bg-[#38bdf8]/10 text-sky-600 dark:text-[#38bdf8] font-mono font-medium border border-sky-200 dark:border-[#38bdf8]/20">
                  {post.category}
                </span>
                <span className="text-slate-400 dark:text-[#888888] flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-sky-500 dark:text-[#38bdf8]" />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-[#38bdf8] transition-colors leading-snug">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs text-slate-600 dark:text-[#999999] line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            {/* Footer / CTA */}
            <div className="pt-6 mt-4 border-t border-slate-100 dark:border-[#2a2a2a] flex items-center justify-between">
              <span className="text-[11px] text-slate-400 dark:text-[#777777] font-mono">
                {post.date}
              </span>
              <button
                className="text-xs font-semibold text-sky-500 dark:text-[#38bdf8] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                aria-label={`Read ${post.title}`}
              >
                <span>Read Full</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {selectedBlog && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={closeBlog}
        >
          <div 
            className="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#2a2a2a] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6 text-slate-900 dark:text-white scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#2a2a2a] pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-sky-50 dark:bg-[#38bdf8]/10 text-sky-600 dark:text-[#38bdf8] text-xs font-mono font-medium border border-sky-200 dark:border-[#38bdf8]/20">
                  {selectedBlog.category}
                </span>
                <span className="text-xs text-slate-400 dark:text-[#888888] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-sky-500 dark:text-[#38bdf8]" />
                  {selectedBlog.date}
                </span>
                <span className="text-xs text-slate-400 dark:text-[#888888] flex items-center gap-1 ml-2">
                  <Clock className="w-3 h-3 text-sky-500 dark:text-[#38bdf8]" />
                  {selectedBlog.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyArticleLink}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#2a2a2a] text-slate-500 dark:text-[#888888] hover:text-sky-500 dark:hover:text-[#38bdf8] transition-colors"
                  title="Share Article"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-sky-500 dark:text-[#38bdf8]" /> : <Share2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={closeBlog}
                  className="p-2 rounded-full bg-slate-100 dark:bg-[#2a2a2a] text-slate-600 dark:text-white hover:bg-sky-500 dark:hover:bg-[#38bdf8] hover:text-white dark:hover:text-black transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-sky-500 dark:bg-[#38bdf8] text-white dark:text-black font-bold flex items-center justify-center text-sm shadow-md">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{selectedBlog.author}</h4>
                <p className="text-xs text-slate-500 dark:text-[#888888]">{selectedBlog.authorRole}</p>
              </div>
            </div>

            {/* Article Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {selectedBlog.title}
            </h1>

            {/* Article Body */}
            <div className="space-y-6 text-sm text-slate-700 dark:text-[#cccccc] leading-relaxed border-t border-slate-100 dark:border-[#2a2a2a] pt-6">
              <p className="text-base text-slate-800 dark:text-[#e0e0e0] font-medium leading-relaxed italic bg-slate-50 dark:bg-[#161616] p-4 rounded-2xl border-l-4 border-sky-500 dark:border-[#38bdf8]">
                &ldquo;{selectedBlog.content.intro}&rdquo;
              </p>

              {selectedBlog.content.sections.map((section, idx) => (
                <div key={idx} className="space-y-3 pt-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {section.heading}
                  </h3>
                  <p className="leading-relaxed">
                    {section.body}
                  </p>
                  {section.codeSnippet && (
                    <pre className="p-4 rounded-2xl bg-slate-900 text-sky-300 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
                      <code>{section.codeSnippet}</code>
                    </pre>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-slate-200 dark:border-[#2a2a2a] space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Summary & Conclusion</h3>
                <p className="text-slate-700 dark:text-[#cccccc]">
                  {selectedBlog.content.conclusion}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200 dark:border-[#2a2a2a]">
              <Tag className="w-3.5 h-3.5 text-sky-500 dark:text-[#38bdf8]" />
              {selectedBlog.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#252525] text-slate-600 dark:text-[#aaaaaa] text-xs font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
