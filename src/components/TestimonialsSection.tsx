"use client";

import React from "react";
import { MessageSquareQuote, Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Marcus Vance",
      role: "VP of Engineering @ FinTech Pay",
      text: "Abdullah built our entire Playwright and Postman automation framework from scratch. His test suites caught critical payment gateway edge cases before our launch. A true QA powerhouse!",
      rating: 5,
      avatar: "👨‍💻",
    },
    {
      name: "Sarah Jenkins",
      role: "Product Lead @ HealthTech Solutions",
      text: "Working with Abdullah was effortless. He automated our mobile app regression tests with Appium, taking our release cycle from 3 days down to just 2 hours with 100% reliability.",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      name: "David Kim",
      role: "CTO @ E-Commerce Scale Inc",
      text: "His JMeter load testing identified severe database bottlenecks under 15,000 concurrent user spikes. Thanks to Abdullah's performance tuning, our Black Friday sales ran without a single hitch.",
      rating: 5,
      avatar: "👨‍💼",
    },
  ];

  return (
    <section id="testimonials" className="scroll-mt-12 space-y-8 pt-6">
      {/* Tag */}
      <div className="section-tag">
        <MessageSquareQuote className="w-3.5 h-3.5 text-[#38bdf8]" />
        <span>REVIEWS</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Trusted by <span className="text-[#38bdf8]">Clients</span> & Product Managers
        </h2>
        <p className="text-base text-[#999999] max-w-2xl">
          What engineering leaders say about Abdullah Al Omar&apos;s quality engineering work.
        </p>
      </div>

      {/* Testimonials Quote Stream - Distinct quote block design instead of uniform cards */}
      <div className="space-y-6 pt-2">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="relative p-6 md:p-8 rounded-3xl bg-[#141414] border-l-4 border-l-[#38bdf8] border-t border-r border-b border-[#242424] transition-all hover:bg-[#181818] space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#38bdf8]">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#38bdf8]" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-[#38bdf8]/20 group-hover:text-[#38bdf8]/50 transition-colors" />
            </div>

            <p className="text-base text-[#dddddd] leading-relaxed italic font-serif">
              &ldquo;{item.text}&rdquo;
            </p>

            <div className="pt-4 border-t border-[#222222] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center text-xl shrink-0">
                {item.avatar}
              </div>
              <div>
                <h4 className="text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-[#888888]">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
