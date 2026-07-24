import FixedLeftSidebar from "@/components/FixedLeftSidebar";
import FloatingRightNavbar from "@/components/FloatingRightNavbar";
import HeroIntroSection from "@/components/HeroIntroSection";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import SpecializationsSection from "@/components/SpecializationsSection";
import TechSkillsSection from "@/components/TechSkillsSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactFormSection from "@/components/ContactFormSection";

export const metadata = {
  title: "Abdullah Al Omar | SQA Engineer",
  description: "Portfolio of Abdullah Al Omar - Software Quality Assurance Engineer specializing in Playwright, Selenium, Postman, and JMeter.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111] text-slate-900 dark:text-white selection:bg-[#38bdf8] selection:text-black py-4 lg:py-6 px-4 sm:px-6 lg:px-8 xl:px-12 relative font-sans transition-colors duration-300">
      
      {/* Mobile Navigation Bar */}
      <div className="lg:hidden">
        <FloatingRightNavbar />
      </div>

      {/* Main 3-Column Grid Container */}
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* Column 1 (Left): Fixed / Sticky Profile Sidebar */}
          <div className="lg:col-span-4 xl:col-span-4 w-full lg:sticky lg:top-6 self-start z-30">
            <FixedLeftSidebar />
          </div>

          {/* Column 2 (Middle): Main Scrollable Content Area */}
          <main className="lg:col-span-7 xl:col-span-7 w-full space-y-20 lg:space-y-24 pt-2 pb-16">
            <HeroIntroSection />
            <AboutSection />
            <ResumeSection />
            <SpecializationsSection />
            <TechSkillsSection />
            <FeaturedProjectsSection />
            <BlogSection />
            <ContactFormSection />
          </main>

          {/* Column 3 (Right): Sticky Vertical Navbar Dock */}
          <div className="lg:col-span-1 xl:col-span-1 hidden lg:flex justify-center items-center lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] self-start z-40">
            <FloatingRightNavbar isDesktopInColumn={true} />
          </div>

        </div>
      </div>
    </div>
  );
}
