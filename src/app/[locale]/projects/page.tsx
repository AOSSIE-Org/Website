"use client";

import React, { useState, useMemo, useCallback, useEffect, useId, useRef } from "react";
import PageWrapper from "@/components/PageWrapper";
import ProjectLogo from "@/components/ProjectLogo";
import {
  getAllProjects,
  getLastActivity,
  getOrganization,
  getProjectStars,
  getRepoStars,
  githubUrl,
  ORGANIZATIONS,
  ORGANIZATION_GITHUB,
  TOPICS,
  THEMES,
  type Organization,
  type Project,
  type Topic,
  type Theme,
} from "@/lib/projectsData";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { getProjectText } from "@/lib/projectTranslations";

/* ------------------------------------------------------------------ */
/* Filtering, sorting and grouping                                     */
/* ------------------------------------------------------------------ */

type Filter<T> = T | "All";

interface Filters {
  organization: Filter<Organization>;
  topic: Filter<Topic>;
  theme: Filter<Theme>;
}
type Dimension = keyof Filters;

const SORT_KEYS = ["stars", "activity", "name", "repos"] as const;
type SortKey = (typeof SORT_KEYS)[number];
type SortDirection = "desc" | "asc";

const GROUP_KEYS = ["none", "organization", "topic", "theme"] as const;
type GroupKey = (typeof GROUP_KEYS)[number];

const DEFAULT_FILTERS: Filters = { organization: "All", topic: "All", theme: "All" };

const ORGANIZATION_MARKS: Record<Organization, string> = {
  AOSSIE: "/brand/icons/aossie_logomark.svg",
  "Stability Nexus": "/brand/icons/stability.svg",
  "Djed Alliance": "/brand/project_svgs/djed_alliance_logo.svg",
};

interface RankedProject {
  project: Project;
  /** Description and overview in the current locale. */
  text: { description: string; about?: string };
  organization: Organization;
  stars: number;
  lastActivity: string;
}

function matchesSearch({ project, text }: RankedProject, query: string) {
  if (!query) return true;
  return (
    project.name.toLowerCase().includes(query) ||
    text.description.toLowerCase().includes(query) ||
    project.description.toLowerCase().includes(query) ||
    project.repositories.some((repo) => repo.fullName.toLowerCase().includes(query))
  );
}

function matchesFilters(item: RankedProject, filters: Filters, skip?: Dimension) {
  const { project } = item;
  return (
    (skip === "organization" || filters.organization === "All" || item.organization === filters.organization) &&
    (skip === "topic" || filters.topic === "All" || project.topics.includes(filters.topic)) &&
    (skip === "theme" || filters.theme === "All" || project.themes.includes(filters.theme))
  );
}

function countBy<T extends string>(pool: RankedProject[], options: readonly T[], has: (p: RankedProject, o: T) => boolean) {
  return {
    All: pool.length,
    ...Object.fromEntries(options.map((o) => [o, pool.filter((p) => has(p, o)).length])),
  } as Record<Filter<T>, number>;
}

function compare(a: RankedProject, b: RankedProject, key: SortKey, direction: SortDirection) {
  // Archived projects always sink to the bottom, whatever the sort
  if (Boolean(a.project.archived) !== Boolean(b.project.archived)) return a.project.archived ? 1 : -1;

  const sign = direction === "desc" ? 1 : -1;
  let primary = 0;
  switch (key) {
    case "stars":
      primary = b.stars - a.stars;
      break;
    case "activity":
      primary = b.lastActivity.localeCompare(a.lastActivity);
      break;
    case "repos":
      primary = b.project.repositories.length - a.project.repositories.length;
      break;
    case "name":
      // "desc" for names means A → Z, the natural reading order
      primary = a.project.name.localeCompare(b.project.name);
      break;
  }
  if (primary !== 0) return primary * sign;
  // Tie-breakers: stars, then name
  return b.stars - a.stars || a.project.name.localeCompare(b.project.name);
}

function formatStars(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ProjectsPage() {
  const t = useTranslations("ProjectsPage");
  const tTopics = useTranslations("Topics");
  const tThemes = useTranslations("Themes");
  const locale = useLocale();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showArchived, setShowArchived] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("stars");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [groupBy, setGroupBy] = useState<GroupKey>("none");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const setFilter = <K extends Dimension>(key: K) => (value: Filters[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const ranked = useMemo<RankedProject[]>(
    () =>
      getAllProjects().map((project) => ({
        project,
        text: getProjectText(project, locale),
        organization: getOrganization(project),
        stars: getProjectStars(project),
        lastActivity: getLastActivity(project),
      })),
    [locale]
  );
  const query = searchQuery.toLowerCase().trim();

  const baseFiltered = useMemo(
    () => ranked.filter((p) => (showArchived || !p.project.archived) && matchesSearch(p, query)),
    [ranked, showArchived, query]
  );

  // Per-chip counts apply every filter except the chip's own dimension
  const organizationCounts = useMemo(
    () => countBy(baseFiltered.filter((p) => matchesFilters(p, filters, "organization")), ORGANIZATIONS, (p, o) => p.organization === o),
    [baseFiltered, filters]
  );
  const topicCounts = useMemo(
    () => countBy(baseFiltered.filter((p) => matchesFilters(p, filters, "topic")), TOPICS, (p, tp) => p.project.topics.includes(tp)),
    [baseFiltered, filters]
  );
  const themeCounts = useMemo(
    () => countBy(baseFiltered.filter((p) => matchesFilters(p, filters, "theme")), THEMES, (p, th) => p.project.themes.includes(th)),
    [baseFiltered, filters]
  );

  const visible = useMemo(
    () =>
      baseFiltered
        .filter((p) => matchesFilters(p, filters))
        .sort((a, b) => compare(a, b, sortKey, sortDirection)),
    [baseFiltered, filters, sortKey, sortDirection]
  );

  const groups = useMemo(() => {
    const build = <T extends string>(keys: readonly T[], has: (p: RankedProject, k: T) => boolean, label: (k: T) => string) => {
      const result = keys.map((k) => ({ id: k as string, label: label(k), items: visible.filter((p) => has(p, k)) }));
      return result;
    };
    let result: { id: string; label: string; items: RankedProject[]; mark?: string; href?: string }[];
    switch (groupBy) {
      case "organization":
        result = build(ORGANIZATIONS, (p, o) => p.organization === o, (o) => o).map((g) => ({
          ...g,
          mark: ORGANIZATION_MARKS[g.id as Organization],
          href: ORGANIZATION_GITHUB[g.id as Organization],
        }));
        break;
      case "topic":
        result = [
          ...build(TOPICS, (p, tp) => p.project.topics.includes(tp), (tp) => tTopics(tp)),
          { id: "other", label: t("otherGroup"), items: visible.filter((p) => p.project.topics.length === 0) },
        ];
        break;
      case "theme":
        result = [
          ...build(THEMES, (p, th) => p.project.themes.includes(th), (th) => tThemes(th)),
          { id: "other", label: t("otherGroup"), items: visible.filter((p) => p.project.themes.length === 0) },
        ];
        break;
      default:
        result = [{ id: "all", label: "", items: visible }];
    }
    return result.filter((g) => g.items.length > 0);
  }, [visible, groupBy, t, tTopics, tThemes]);

  const toggleGroup = useCallback((id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const allCollapsed = groups.length > 0 && groups.every((g) => collapsed.has(g.id));
  const toggleAll = () => setCollapsed(allCollapsed ? new Set() : new Set(groups.map((g) => g.id)));

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setFilters(DEFAULT_FILTERS);
    setShowArchived(true);
  }, []);

  const sortLabels: Record<SortKey, string> = {
    stars: t("sortStars"),
    activity: t("sortActivity"),
    name: t("sortName"),
    repos: t("sortRepos"),
  };
  const groupLabels: Record<GroupKey, string> = {
    organization: t("organizationsLabel"),
    topic: t("topicsLabel"),
    theme: t("themesLabel"),
    none: t("groupNone"),
  };
  const directionLabel =
    sortKey === "name"
      ? sortDirection === "desc" ? "A → Z" : "Z → A"
      : sortDirection === "desc" ? t("directionDesc") : t("directionAsc");

  return (
    <PageWrapper>
      <div className="w-full py-12 sm:py-16 px-4 sm:px-10 lg:px-14 max-w-7xl mx-auto flex flex-col gap-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.1]"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-foreground-secondary leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-30 rounded-3xl border border-border bg-background-secondary/60 p-3 sm:p-4 flex flex-col gap-3"
        >
          {/* Search */}
          <div className="relative w-full">
            <svg
              className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-20 rounded-2xl border border-border bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-heading-highlight/60 transition-shadow text-sm [&::-webkit-search-cancel-button]:hidden"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg text-xs font-semibold text-foreground-muted hover:text-foreground hover:bg-hover"
              >
                {t("clearSearch")}
              </button>
            )}
          </div>

          {/* Filters */}
          <FilterRow
            label={t("organizationsLabel")}
            options={["All", ...ORGANIZATIONS]}
            value={filters.organization}
            onChange={setFilter("organization")}
            counts={organizationCounts}
            renderLabel={(v) => (v === "All" ? t("all") : v)}
          />
          <FilterRow
            label={t("topicsLabel")}
            options={["All", ...TOPICS]}
            value={filters.topic}
            onChange={setFilter("topic")}
            counts={topicCounts}
            renderLabel={(v) => (v === "All" ? t("all") : tTopics(v))}
          />
          <FilterRow
            label={t("themesLabel")}
            options={["All", ...THEMES]}
            value={filters.theme}
            onChange={setFilter("theme")}
            counts={themeCounts}
            renderLabel={(v) => (v === "All" ? t("all") : tThemes(v))}
          />

          {/* Sort + group toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 border-t border-border pt-3 px-1">
            <div className="flex flex-wrap items-center gap-2">
              <ToolbarSelect
                label={t("sortBy")}
                value={sortKey}
                onChange={(v) => {
                  setSortKey(v);
                  setSortDirection("desc");
                }}
                options={SORT_KEYS.map((k) => ({ value: k, label: sortLabels[k] }))}
              />
              <button
                type="button"
                onClick={() => setSortDirection((d) => (d === "desc" ? "asc" : "desc"))}
                aria-label={`${t("sortDirection")}: ${directionLabel}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground-secondary transition-colors hover:text-foreground hover:border-foreground/25"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className={`transition-transform duration-300 ${sortDirection === "asc" ? "rotate-180" : ""}`}
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
                <span>{directionLabel}</span>
              </button>
              <ToolbarSelect
                label={t("groupBy")}
                value={groupBy}
                onChange={(v) => {
                  setGroupBy(v);
                  setCollapsed(new Set());
                }}
                options={GROUP_KEYS.map((k) => ({ value: k, label: groupLabels[k] }))}
              />
            </div>

            <div className="flex items-center justify-between lg:justify-end gap-4 lg:ml-auto">
              <p className="text-xs font-medium text-foreground-muted tabular-nums" aria-live="polite">
                {t("resultsCount", { count: visible.length })}
              </p>
              <label className="inline-flex items-center gap-2.5 text-xs font-semibold text-foreground-secondary cursor-pointer select-none">
                <span>{t("showArchived")}</span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={showArchived}
                  onChange={(e) => setShowArchived(e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className="relative h-5 w-9 rounded-full border border-border bg-background-muted transition-colors peer-checked:bg-heading-highlight peer-checked:border-heading-highlight peer-focus-visible:ring-2 peer-focus-visible:ring-heading-highlight/60 after:absolute after:top-0.5 after:left-0.5 after:h-3.5 after:w-3.5 after:rounded-full after:bg-foreground after:transition-transform peer-checked:after:translate-x-4 peer-checked:after:bg-brand-dark"
                />
              </label>
            </div>
          </div>
        </motion.div>

        {/* Groups */}
        {groupBy !== "none" && groups.length > 1 && (
          <div className="-mb-6 flex justify-end">
            <button
              type="button"
              onClick={toggleAll}
              className="text-xs font-semibold text-foreground-secondary hover:text-foreground transition-colors"
            >
              {allCollapsed ? t("expandAll") : t("collapseAll")}
            </button>
          </div>
        )}

        {groups.map((group) => (
          <ProjectGroup
            key={`${groupBy}-${group.id}`}
            label={group.label}
            count={group.items.length}
            mark={group.mark}
            href={group.href}
            hrefLabel={t("githubRepo")}
            collapsible={groupBy !== "none"}
            collapsed={collapsed.has(group.id)}
            onToggle={() => toggleGroup(group.id)}
            toggleLabel={collapsed.has(group.id) ? t("expandGroup", { name: group.label }) : t("collapseGroup", { name: group.label })}
          >
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout" initial={false}>
                {group.items.map((item) => (
                  <motion.li
                    key={item.project.slug}
                    layout="position"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <ProjectCard item={item} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </ProjectGroup>
        ))}

        {/* Empty State */}
        {visible.length === 0 && (
          <div className="py-16 text-center flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border">
            <p className="text-base text-foreground-secondary font-medium">{t("noResults")}</p>
            <button
              type="button"
              onClick={resetFilters}
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

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

interface FilterRowProps<T extends string> {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
  counts: Record<T, number>;
  renderLabel: (value: T) => string;
}

function FilterRow<T extends string>({ label, options, value, onChange, counts, renderLabel }: FilterRowProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <span className="shrink-0 sm:w-28 px-1 text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">
        {label}
      </span>
      <div className="flex gap-1.5 overflow-x-auto sm:flex-wrap -mx-1 px-1 pb-1 sm:pb-0 [scrollbar-width:none]">
        {options.map((option) => {
          const active = value === option;
          const count = counts[option];
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option)}
              disabled={!active && count === 0}
              className={`shrink-0 inline-flex items-center gap-2 h-9 pl-3.5 pr-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ${
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground-secondary border-border hover:text-foreground hover:border-foreground/25"
              }`}
            >
              <span>{renderLabel(option)}</span>
              <span
                className={`min-w-5 px-1.5 py-0.5 rounded-md text-[10px] font-mono tabular-nums ${
                  active ? "bg-background/15 text-background" : "bg-background-muted text-foreground-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ToolbarSelectProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}

/** Theme-aware dropdown (listbox) used for the sort and group controls. */
function ToolbarSelect<T extends string>({ label, value, onChange, options }: ToolbarSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const openMenu = () => {
    setHighlighted(selectedIndex);
    setOpen(true);
  };

  const choose = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (e.key === "Escape" || e.key === "Tab") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => (h + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => (h - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(highlighted);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${highlighted}` : undefined}
        className={`inline-flex h-9 items-center gap-1.5 rounded-xl border bg-background pl-3 pr-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading-highlight/60 ${
          open ? "border-foreground/30" : "border-border hover:border-foreground/25"
        }`}
      >
        <span className="text-foreground-muted">{label}</span>
        <span className="text-foreground">{selected.label}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={`text-foreground-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full z-40 mt-2 min-w-full w-max origin-top-left rounded-2xl border border-border bg-card p-1.5 shadow-xl"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlighted(index)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(index)}
                  className={`flex cursor-pointer items-center justify-between gap-6 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                    index === highlighted ? "bg-hover text-foreground" : "text-foreground-secondary"
                  }`}
                >
                  <span>{option.label}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className={isSelected ? "text-foreground" : "invisible"}
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Group                                                               */
/* ------------------------------------------------------------------ */

interface ProjectGroupProps {
  label: string;
  count: number;
  mark?: string;
  href?: string;
  hrefLabel: string;
  collapsible: boolean;
  collapsed: boolean;
  onToggle: () => void;
  toggleLabel: string;
  children: React.ReactNode;
}

function ProjectGroup({ label, count, mark, href, hrefLabel, collapsible, collapsed, onToggle, toggleLabel, children }: ProjectGroupProps) {
  const contentId = useId();

  if (!collapsible) return <section>{children}</section>;

  return (
    <section aria-label={label} className="flex flex-col gap-5">
      <div className="sticky top-[73px] z-20 -mx-2 px-2 py-2 bg-background/85 backdrop-blur-md flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={!collapsed}
          aria-controls={contentId}
          aria-label={toggleLabel}
          className="group/toggle flex min-w-0 items-center gap-3 sm:gap-4 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading-highlight/60"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground-secondary transition-colors group-hover/toggle:text-foreground group-hover/toggle:border-foreground/25">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className={`transition-transform duration-300 ${collapsed ? "-rotate-90" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
          {mark && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mark} alt="" className="h-7 w-7 shrink-0 object-contain" />
          )}
          <h2 className="truncate text-xl sm:text-2xl font-semibold tracking-tight text-foreground">{label}</h2>
          <span className="shrink-0 px-2 py-0.5 rounded-md text-[11px] font-mono tabular-nums bg-background-muted text-foreground-muted">
            {count}
          </span>
        </button>
        <span aria-hidden className="h-px flex-1 bg-border" />
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-foreground-secondary hover:text-foreground transition-colors"
          >
            <span>{hrefLabel}</span>
            <span aria-hidden className="text-[10px]">↗</span>
          </a>
        )}
      </div>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            id={contentId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

const StarIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.5l2.94 6.1 6.56.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.2 1.2-6.5-4.8-4.6 6.56-.9L12 2.5z" />
  </svg>
);

function ProjectCard({ item }: { item: RankedProject }) {
  const t = useTranslations("ProjectsPage");
  const tTopics = useTranslations("Topics");
  const tThemes = useTranslations("Themes");
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  const { project, organization, stars, text } = item;
  const primaryRepo = project.repositories[0];
  const hasDetails = Boolean(text.about) || project.repositories.length > 1;

  // Spotlight that follows the pointer, set via CSS variables to avoid re-renders
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      onPointerMove={handlePointerMove}
      className={`group relative flex h-full flex-col rounded-3xl border border-border shadow-card transition-colors duration-300 hover:border-foreground/20 ${
        project.archived ? "bg-background-secondary" : "bg-card"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), color-mix(in srgb, var(--heading-highlight) 9%, transparent), transparent 60%)",
        }}
      />

      <div className="relative flex flex-col gap-4 p-6">
        <div className="flex items-start gap-4">
          <ProjectLogo
            project={project}
            className="w-20 h-20 rounded-[22px] shadow-sm transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-3"
            imageClassName="w-[80%] h-[80%]"
            monogramClassName="text-2xl"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-1">
            <h3 className="text-lg font-semibold tracking-tight text-foreground leading-snug">
              <a
                href={githubUrl(primaryRepo)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-4 decoration-foreground/30"
              >
                {project.name}
              </a>
            </h3>
            <p className="text-[11px] font-medium text-foreground-muted">{organization}</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {stars > 0 && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold tabular-nums bg-heading-highlight/15 text-foreground"
                  title={t("starsTitle", { count: stars })}
                >
                  <StarIcon className="h-3 w-3 text-heading-highlight" />
                  {formatStars(stars)}
                </span>
              )}
              {project.archived && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border border-border bg-background-muted text-foreground-muted">
                  {t("archived")}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className={`text-sm leading-relaxed ${project.archived ? "text-foreground-muted" : "text-foreground-secondary"}`}>
          {text.description}
        </p>

        {(project.topics.length > 0 || project.themes.length > 0) && (
          <div className="flex flex-wrap items-center gap-1.5">
            {project.topics.map((tp) => (
              <span
                key={tp}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-heading-highlight/40 bg-heading-highlight/10 text-foreground"
              >
                {tTopics(tp)}
              </span>
            ))}
            {project.themes.map((th) => (
              <span key={th} className="px-2.5 py-1 rounded-lg text-[11px] font-medium border border-border text-foreground-secondary">
                {tThemes(th)}
              </span>
            ))}
          </div>
        )}

        {/* Expandable details: overview and every repository */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={detailsId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-4 pt-1">
                {text.about && <p className="text-sm leading-relaxed text-foreground-secondary">{text.about}</p>}
                <div className="flex flex-col gap-1">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">
                    {t("reposCount", { count: project.repositories.length })}
                  </h4>
                  <ul className="flex flex-col divide-y divide-border">
                    {project.repositories.map((repo) => {
                      const repoStars = getRepoStars(repo);
                      return (
                        <li key={repo.fullName}>
                          <a
                            href={githubUrl(repo)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/repo flex items-center justify-between gap-3 py-2 text-xs"
                          >
                            <span className="min-w-0 truncate font-mono text-foreground-secondary group-hover/repo:text-foreground">
                              {repo.fullName.split("/")[1]}
                            </span>
                            <span className="flex shrink-0 items-center gap-2 text-foreground-muted">
                              {repo.language && <span>{repo.language}</span>}
                              {repoStars > 0 && (
                                <span className="inline-flex items-center gap-0.5 tabular-nums">
                                  <StarIcon className="h-3 w-3" />
                                  {formatStars(repoStars)}
                                </span>
                              )}
                              <span aria-hidden className="transition-transform group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5">
                                ↗
                              </span>
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer links */}
      <div className="relative mt-auto mx-6 py-4 border-t border-border flex items-center gap-1 text-xs font-semibold">
        <a
          href={githubUrl(primaryRepo)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name}: ${t("githubRepo")}`}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 -ml-2.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-hover transition-colors"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/icons/github.svg" alt="" width={14} height={14} className="theme-icon-invert opacity-80" />
          <span>{t("githubRepo")}</span>
        </a>
        <a
          href={project.discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name}: ${t("discordChannel")}`}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-hover transition-colors"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/icons/discord.svg" alt="" width={15} height={15} className="theme-icon-invert opacity-80" />
          <span>{t("discordChannel")}</span>
        </a>
        {project.websiteUrl && (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name}: ${t("website")}`}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-hover transition-colors"
          >
            <span>{t("website")}</span>
            <span aria-hidden className="text-[10px]">↗</span>
          </a>
        )}
        {hasDetails && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={detailsId}
            className="ml-auto inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-1.5 -mr-2.5 text-foreground-secondary hover:text-foreground hover:bg-hover transition-colors"
          >
            <span>{expanded ? t("showLess") : t("showMore")}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        )}
      </div>
    </article>
  );
}
