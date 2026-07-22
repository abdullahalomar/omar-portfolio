import FixedLeftSidebar from "@/components/FixedLeftSidebar";
import FloatingRightNavbar from "@/components/FloatingRightNavbar";
import HeroIntroSection from "@/components/HeroIntroSection";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import SpecializationsSection from "@/components/SpecializationsSection";
import TechSkillsSection from "@/components/TechSkillsSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import ContactFormSection from "@/components/ContactFormSection";

export const metadata = {
  title: "Abdullah Al Omar | Senior SQA Engineer & Automation Lead",
  description: "Portfolio of Abdullah Al Omar - Senior Software Quality Assurance Engineer & Test Automation Specialist specializing in Playwright, Selenium, Postman, and JMeter.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111] text-slate-900 dark:text-white selection:bg-[#38bdf8] selection:text-black py-6 px-4 sm:px-6 lg:px-12 relative font-sans transition-colors duration-300">
      {/* Floating Vertical Right Navigation Bar */}
      <FloatingRightNavbar />

      {/* Main Grid Container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Fixed / Sticky Profile Sidebar */}
          <div className="lg:col-span-4 xl:col-span-4 w-full lg:sticky lg:top-8 self-start z-30">
            <FixedLeftSidebar />
          </div>

          {/* Middle/Right Column: Main Scrollable Content Area */}
          <main className="lg:col-span-8 xl:col-span-8 w-full space-y-24 pt-2 pb-16">
            <HeroIntroSection />
            <AboutSection />
            <ResumeSection />
            <SpecializationsSection />
            <TechSkillsSection />
            <FeaturedProjectsSection />
            <ContactFormSection />
          </main>

        </div>
      </div>
    </div>
  );
}
