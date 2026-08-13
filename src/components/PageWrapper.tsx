"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="w-full min-h-screen bg-outer-bg flex justify-center text-foreground font-sans transition-colors duration-200">
      <div className="w-full max-w-[1440px] flex flex-col min-h-screen">
        
        {/* Sticky Navbar Row */}
        <div className="sticky top-0 z-50 w-full bg-nav-bg backdrop-blur-md border-b border-x border-border">
          <div className="flex w-full min-w-0">
            <div className="w-5 sm:w-12 md:w-16 lg:w-20 shrink-0 bg-background" />
            <div className="flex-1 min-w-0 bg-background">
              <Navbar />
            </div>
            <div className="w-5 sm:w-12 md:w-16 lg:w-20 shrink-0 bg-background" />
          </div>
        </div>

        {/* Content Body with Slanted Edge Lines */}
        <div className="flex-1 flex w-full min-w-0">
          <div className="w-5 sm:w-12 md:w-16 lg:w-20 shrink-0 slanted-bg-pattern border-x border-border" />
          
          <div className="flex-1 min-w-0 bg-background border-r border-border flex flex-col justify-between">
            <main className="flex-1 min-w-0 flex flex-col">
              {children}
            </main>
            <Footer />
          </div>

          <div className="w-5 sm:w-12 md:w-16 lg:w-20 shrink-0 slanted-bg-pattern border-r border-border" />
        </div>

      </div>
    </div>
  );
}
