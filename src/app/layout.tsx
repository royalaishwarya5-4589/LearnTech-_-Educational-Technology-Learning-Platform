import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import { AuthProvider } from "@/components/Auth/AuthProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AITutorProvider } from "@/components/AITutor/AITutorContext";
import { AITutorLauncher } from "@/components/AITutor/AITutorLauncher";
import { AITutorPanel } from "@/components/AITutor/AITutorPanel";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "LearnTech | Educational Technology Learning Platform",
  description: "Learn technology from absolute beginner level to advanced mastery through structured learning paths, active practice, and curated resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');if(s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <AITutorProvider>
              <div className="page-container">
                <Header />
                <main className="main-content">
                  <div className="page-transition-wrapper">{children}</div>
                </main>
                <Footer />
                <AITutorLauncher />
                <AITutorPanel />
              </div>
            </AITutorProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
