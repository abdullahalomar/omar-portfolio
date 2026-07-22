import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdullah | SQA Engineer Portfolio",
  description:
    "Portfolio of Abdullah - Software Quality Assurance (SQA) & Test Automation Specialist. Test Automation, API Testing, Performance Engineering & CI/CD Quality Gates.",
  keywords: [
    "Abdullah",
    "SQA Engineer",
    "Software Quality Assurance",
    "Automation Test Engineer",
    "Playwright",
    "Cypress",
    "Selenium",
    "Postman API",
    "k6 Performance",
  ],
  authors: [{ name: "Abdullah" }],
  openGraph: {
    title: "Abdullah - SQA Engineer Portfolio",
    description: "Building digital products, automated tests, and flawless quality.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${inter.variable} ${plusJakartaSans.variable} ${firaCode.variable}`}
    >
      <body className="bg-slate-50 dark:bg-[#111111] text-slate-900 dark:text-white antialiased selection:bg-[#38bdf8] selection:text-black min-h-screen transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
