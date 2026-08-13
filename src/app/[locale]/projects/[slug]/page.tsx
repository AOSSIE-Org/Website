import React from "react";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import PageWrapper from "@/components/PageWrapper";
import { getAllProjects, getProjectBySlug } from "@/lib/projectsData";
import { setRequestLocale, getTranslations } from "next-intl/server";

export function generateStaticParams() {
  const projects = getAllProjects();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }

  return params;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "ProjectDetail" });

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageWrapper>
      <div className="w-full py-12 sm:py-16 px-4 sm:px-10 lg:px-14 max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Back Link */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground-secondary hover:text-foreground transition-colors group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            <span>{t("backLink")}</span>
          </Link>
        </div>

        {/* Project Main Hero Header Card */}
        <div className="p-8 sm:p-10 rounded-3xl border border-border bg-card shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border border-border bg-background p-4 flex items-center justify-center shrink-0 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.logo}
                alt={project.name}
                className={`w-full h-full object-contain filter drop-shadow-xs ${
                  project.logo.endsWith("resonate_logo.svg") ? "theme-icon-invert" : ""
                }`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-heading-highlight/10 text-heading-highlight border border-heading-highlight/20 uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold border border-border bg-background-muted text-foreground-secondary">
                  {project.status}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {project.name}
              </h1>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial px-5 py-3 rounded-xl border border-border bg-background hover:bg-hover text-sm font-semibold text-foreground transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>{t("githubRepo")}</span>
              <span className="text-xs">↗</span>
            </a>
            {project.downloadLink && (
              <a
                href={project.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial px-5 py-3 rounded-xl border border-heading-highlight/30 bg-heading-highlight/10 hover:bg-heading-highlight/20 text-heading-highlight text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Download / Releases</span>
                <span className="text-xs">↗</span>
              </a>
            )}
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial px-5 py-3 rounded-xl bg-heading-highlight text-brand-dark hover:opacity-90 text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>{t("liveSite")}</span>
                <span className="text-xs">↗</span>
              </a>
            )}
          </div>

        </div>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Column: Overview & Features (Col 1-8) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Overview */}
            <div className="p-8 rounded-3xl border border-border bg-card shadow-xs flex flex-col gap-4">
              <h2 className="text-xl font-bold text-foreground">{t("overviewTitle")}</h2>
              <p className="text-base text-foreground-secondary leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Key Features */}
            <div className="p-8 rounded-3xl border border-border bg-card shadow-xs flex flex-col gap-4">
              <h2 className="text-xl font-bold text-foreground">{t("featuresTitle")}</h2>
              <ul className="grid grid-cols-1 gap-3">
                {project.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-heading-highlight/10 text-heading-highlight border border-heading-highlight/20 flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar Column: Tech Stack & Community Info (Col 9-12) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Tech Stack Card */}
            <div className="p-6 rounded-3xl border border-border bg-card shadow-xs flex flex-col gap-4">
              <h3 className="text-base font-bold text-foreground">{t("techTitle")}</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl border border-border bg-background-muted text-xs font-mono font-medium text-foreground-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Community & Mentorship */}
            <div className="p-6 rounded-3xl border border-border bg-card shadow-xs flex flex-col gap-4">
              <h3 className="text-base font-bold text-foreground">{t("getInvolvedTitle")}</h3>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                {t("getInvolvedDesc")}
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={project.discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-hover text-xs font-semibold text-foreground transition-all flex items-center justify-between"
                >
                  <span>{t("joinDiscord")}</span>
                  <span>↗</span>
                </a>
                <a
                  href={`${project.githubLink}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-hover text-xs font-semibold text-foreground transition-all flex items-center justify-between"
                >
                  <span>{t("browseIssues")}</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </PageWrapper>
  );
}
