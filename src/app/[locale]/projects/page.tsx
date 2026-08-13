"use client";

import React, { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import PageWrapper from "@/components/PageWrapper";
import { getAllProjects, getProjectCategories } from "@/lib/projectsData";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations("ProjectsPage");
  const tCat = useTranslations("Categories");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const projects = useMemo(() => getAllProjects(), []);
  const rawCategories = useMemo(() => getProjectCategories(), []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase().trim()));

      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

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

        {/* Search & Category Filter Control Bar */}
        <div className="flex flex-col gap-6 items-center w-full max-w-4xl mx-auto">
          
          {/* Search Input */}
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3.5 pl-11 rounded-2xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-heading-highlight/50 shadow-xs transition-all text-sm"
            />
            <svg
              className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-foreground-muted hover:text-foreground p-1"
              >
                {t("clearSearch")}
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {rawCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-heading-highlight text-brand-dark border-heading-highlight shadow-xs font-bold"
                    : "border-border bg-card text-foreground-secondary hover:bg-hover hover:text-foreground"
                }`}
              >
                {tCat.has(cat as Parameters<typeof tCat>[0]) ? tCat(cat as Parameters<typeof tCat>[0]) : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between p-6 rounded-3xl border border-border bg-card shadow-xs hover:border-heading-highlight/40 hover:shadow-md transition-all"
              >
                <div>
                  {/* Card Top: Logo & Status Badge */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl border border-border bg-background flex items-center justify-center p-2.5 overflow-hidden shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.logo}
                        alt={project.name}
                        className={`w-full h-full object-contain filter drop-shadow-xs ${
                          project.logo.endsWith("resonate_logo.svg") ? "theme-icon-invert" : ""
                        }`}
                      />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold border border-border bg-background-muted text-foreground-secondary">
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-heading-highlight transition-colors mb-1">
                    {project.name}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-heading-highlight/90 uppercase tracking-wider block mb-3">
                    {tCat.has(project.category as Parameters<typeof tCat>[0]) ? tCat(project.category as Parameters<typeof tCat>[0]) : project.category}
                  </span>

                  {/* Short Description */}
                  <p className="text-sm text-foreground-secondary leading-relaxed line-clamp-3 mb-4">
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border border-border/80 bg-background-muted/60 text-foreground-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Links */}
                <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-semibold">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground-secondary hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      <span>{t("githubRepo")}</span>
                      <span className="text-[10px]">↗</span>
                    </a>
                    {project.downloadLink && (
                      <a
                        href={project.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-heading-highlight font-bold hover:underline transition-colors flex items-center gap-1"
                      >
                        <span>Download</span>
                        <span className="text-[10px]">↗</span>
                      </a>
                    )}
                    <a
                      href={project.discordLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground-secondary hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      <span>{t("discordChannel")}</span>
                      <span className="text-[10px]">↗</span>
                    </a>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="px-3.5 py-1.5 rounded-xl border border-border bg-background hover:bg-hover text-foreground transition-all flex items-center gap-1 shadow-2xs group-hover:border-heading-highlight/50"
                  >
                    <span>{t("detailsBtn")}</span>
                    <span className="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty Search Result Fallback */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <p className="text-lg text-foreground-secondary font-medium">
              {t("noResults", { query: searchQuery, category: selectedCategory })}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground hover:bg-hover transition-all"
            >
              {t("resetFilters")}
            </button>
          </div>
        )}

      </div>
    </PageWrapper>
  );
}
