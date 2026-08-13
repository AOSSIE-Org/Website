"use client";

import React, { useState, useMemo } from "react";
import PageWrapper from "@/components/PageWrapper";
import { Link } from "@/i18n/navigation";
import { getAllIdeaYears, getIdeasByYear } from "@/lib/ideasData";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ProgramsPage() {
  const t = useTranslations("ProgramsPage");

  const years = useMemo(() => getAllIdeaYears(), []);
  const [selectedYear, setSelectedYear] = useState(years[0] || "2025");

  const currentIdeas = useMemo(() => getIdeasByYear(selectedYear), [selectedYear]);

  return (
    <PageWrapper>
      <div className="w-full py-12 sm:py-16 px-4 sm:px-10 lg:px-14 max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-heading-highlight/30 bg-heading-highlight/10 text-xs font-semibold text-heading-highlight uppercase tracking-wider"
          >
            {t("badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-foreground-secondary leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Year Tabs & Apply CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-6">
          {/* Year Pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-foreground-muted mr-2">{t("yearLabel")}</span>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  selectedYear === year
                    ? "bg-heading-highlight text-brand-dark border-heading-highlight font-bold shadow-xs"
                    : "border-border bg-card text-foreground-secondary hover:bg-hover"
                }`}
              >
                GSoC {year}
              </button>
            ))}
          </div>

          {/* How to Apply Button */}
          <Link
            href="/apply"
            className="px-5 py-2.5 rounded-xl border border-border bg-background hover:bg-hover text-xs font-bold text-foreground transition-all shadow-xs flex items-center gap-2 group"
          >
            <span>{t("applyGuideBtn")}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {currentIdeas.map((idea) => (
              <motion.div
                key={idea.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-xs flex flex-col justify-between gap-6 hover:border-heading-highlight/40 transition-all"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-heading-highlight/10 text-heading-highlight border border-heading-highlight/20 uppercase tracking-wider">
                      {idea.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${
                        idea.difficulty === "Easy"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : idea.difficulty === "Medium"
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {idea.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {idea.title}
                  </h3>

                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {idea.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {idea.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border border-border bg-background-muted text-foreground-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mentors & Actions */}
                <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="text-foreground-muted">
                    <span className="font-semibold text-foreground-secondary">{t("mentorsLabel")}</span>{" "}
                    {idea.mentors.join(", ")}
                  </div>

                  {idea.githubUrl && (
                    <a
                      href={idea.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl border border-border bg-background hover:bg-hover text-foreground font-semibold transition-all flex items-center gap-1 shadow-2xs shrink-0"
                    >
                      <span>{t("fullSpecBtn")}</span>
                      <span className="text-[10px]">↗</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {currentIdeas.length === 0 && (
          <div className="py-20 text-center text-foreground-secondary font-medium">
            {t("noIdeas", { year: selectedYear })}
          </div>
        )}

      </div>
    </PageWrapper>
  );
}
