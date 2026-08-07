"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, useScroll, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProjectItem } from "@/types/project";
import { PROJECTS } from "@/data/projects";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface ProjectCardProps {
  project: ProjectItem;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

// --- Card Dimensions (Squarish 76px x 76px) ---
const CARD_SIZE = 76;

// --- Custom Cursor Dimensions ---
const CURSOR_SIZE = 104;

function ProjectCard({ project, target, onHoverStart, onHoverEnd, onSelectProject }: ProjectCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.repositories.length === 1) {
      window.open(project.repositories[0].url, "_blank", "noopener,noreferrer");
    } else {
      onSelectProject(project);
    }
  };

  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={handleClick}
      style={{
        position: "absolute",
        width: CARD_SIZE,
        height: CARD_SIZE,
      }}
      className="cursor-pointer group select-none pointer-events-auto"
      tabIndex={0}
      role="button"
      aria-label={`View ${project.name} GitHub Repository`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-md border border-border bg-card flex items-center justify-center p-3.5 group-hover:border-foreground/40 group-hover:shadow-lg transition-all">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.src}
          alt={project.name}
          className={`w-full h-full object-contain filter drop-shadow-xs ${
            project.id === "resonate" ? "theme-icon-invert" : ""
          }`}
        />
        {/* Subtle GitHub Icon Badge */}
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background-secondary/90 rounded-full p-0.5 border border-border">
          <svg className="w-2.5 h-2.5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

const DISPLAY_PROJECTS: ProjectItem[] = PROJECTS;
const TOTAL_PROJECTS = DISPLAY_PROJECTS.length;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function Projects() {
  const t = useTranslations("Projects");
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Track Native Window Scroll progress across sectionRef
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Resize Observer for Stage Width/Height
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  // Update introPhase dynamically as user scrolls down/up the website
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.10) {
        setIntroPhase("scatter");
      } else if (latest < 0.22) {
        setIntroPhase("line");
      } else {
        setIntroPhase("circle");
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Extended Circle Stillness Window between 0.22 and 0.65 (morphProgress remains 0)
  // Morph to Bottom Arc occurs between 0.65 and 0.85
  const morphProgress = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  // Rotate Bottom Arc occurs between 0.85 and 0.98
  const scrollRotate = useTransform(scrollYProgress, [0.85, 0.98], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  // Central "View all Projects →" Button Opacity & Scale
  const buttonOpacity = useTransform(scrollYProgress, [0.22, 0.30, 0.62, 0.70], [0, 1, 1, 0]);
  const buttonScale = useTransform(scrollYProgress, [0.22, 0.30, 0.62, 0.70], [0.8, 1, 1, 0.8]);

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  // Custom cursor position (raw pixel coords relative to containerRef)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothCursorX = useSpring(cursorX, { stiffness: 300, damping: 30, mass: 0.6 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 300, damping: 30, mass: 0.6 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);

      cursorX.set(relativeX - CURSOR_SIZE / 2);
      cursorY.set(relativeY - CURSOR_SIZE / 2);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, cursorX, cursorY]);

  const scatterPositions = useMemo(() => {
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed + 1) * 10000;
      return x - Math.floor(x);
    };

    return DISPLAY_PROJECTS.map((_, i) => ({
      x: (pseudoRandom(i * 3 + 1) - 0.5) * 1200,
      y: (pseudoRandom(i * 3 + 2) - 0.5) * 800,
      rotation: (pseudoRandom(i * 3 + 3) - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full relative h-[420vh] bg-background border-b border-border"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center py-10 gap-6 overflow-hidden">
        {/* 1. Section Header & Subtitle */}
        <div className="px-4 sm:px-10 lg:px-14 w-full flex flex-col items-center text-center max-w-5xl mx-auto gap-3 z-10 shrink-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.1]">
            {t("title")}
          </h2>

          <p className="text-base sm:text-lg text-foreground-secondary font-normal max-w-4xl text-center leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 2. Page-Scroll Driven Morph Animation Stage */}
        <div
          ref={containerRef}
          className="w-full relative flex-1 max-h-[550px] sm:max-h-[650px] overflow-hidden flex items-center justify-center cursor-none"
        >
          <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">
            {/* Central "View all Projects →" Button */}
            <motion.div
              style={{ opacity: buttonOpacity, scale: buttonScale }}
              className="absolute z-20 pointer-events-auto"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border bg-background hover:bg-hover text-sm sm:text-base font-semibold text-foreground transition-all shadow-md hover:shadow-lg cursor-pointer group select-none"
              >
                <span>{t("viewAll")}</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>

            {/* Cards Stage */}
            <div className="relative flex items-center justify-center w-full h-full">
              {DISPLAY_PROJECTS.map((project, i) => {
                let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                if (introPhase === "scatter") {
                  target = scatterPositions[i];
                } else if (introPhase === "line") {
                  const lineSpacing = 85;
                  const lineTotalWidth = TOTAL_PROJECTS * lineSpacing;
                  const lineX = i * lineSpacing - lineTotalWidth / 2;
                  target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                } else {
                  const isMobile = containerSize.width < 768;
                  const minDimension = Math.min(containerSize.width, containerSize.height);

                  const circleRadius = Math.min(minDimension * 0.32, 280);
                  const circleAngle = (i / TOTAL_PROJECTS) * 360;
                  const circleRad = (circleAngle * Math.PI) / 180;

                  // Larger squares while resting in the circle formation
                  const circleScale = isMobile ? 1.1 : 1.8;

                  const circlePos = {
                    x: Math.cos(circleRad) * circleRadius,
                    y: Math.sin(circleRad) * circleRadius,
                    rotation: circleAngle + 90,
                    scale: circleScale,
                  };

                  const baseRadius = Math.min(containerSize.width, containerSize.height * 1.4);
                  const arcRadius = baseRadius * (isMobile ? 1.3 : 1.05);

                  const arcApexY = containerSize.height * (isMobile ? 0.38 : 0.28);
                  const arcCenterY = arcApexY + arcRadius;

                  const spreadAngle = isMobile ? 95 : 125;
                  const startAngle = -90 - spreadAngle / 2;
                  const step = spreadAngle / (TOTAL_PROJECTS - 1);

                  const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                  const maxRotation = spreadAngle * 0.75;
                  const boundedRotation = -scrollProgress * maxRotation;

                  const currentArcAngle = startAngle + i * step + boundedRotation;
                  const arcRad = (currentArcAngle * Math.PI) / 180;

                  const arcPos = {
                    x: Math.cos(arcRad) * arcRadius + parallaxValue,
                    y: Math.sin(arcRad) * arcRadius + arcCenterY,
                    rotation: currentArcAngle + 90,
                    scale: isMobile ? 1.3 : 1.6,
                  };

                  target = {
                    x: lerp(circlePos.x, arcPos.x, morphValue),
                    y: lerp(circlePos.y, arcPos.y, morphValue),
                    rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                    scale: lerp(circlePos.scale, arcPos.scale, morphValue),
                    opacity: 1,
                  };
                }

                return (
                  <ProjectCard
                    key={`${project.id}-${i}`}
                    project={project}
                    target={target}
                    onHoverStart={() => setHoveredProject(project)}
                    onHoverEnd={() => setHoveredProject(null)}
                    onSelectProject={(proj) => setSelectedProject(proj)}
                  />
                );
              })}
            </div>

            {/* Custom Sticky Cursor */}
            <motion.div
              className="pointer-events-none absolute top-0 left-0 z-30 flex items-center justify-center rounded-full bg-neutral-500/70 backdrop-blur-sm text-white text-xs font-normal tracking-wide text-center px-2 leading-tight"
              style={{
                x: smoothCursorX,
                y: smoothCursorY,
                width: CURSOR_SIZE,
                height: CURSOR_SIZE,
              }}
              animate={{
                scale: hoveredProject ? 1 : 0,
                opacity: hoveredProject ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              {hoveredProject && `View ${hoveredProject.name}`}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Multi-Repository Popover / Modal Selector */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl flex flex-col gap-5 z-50"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border border-border bg-background flex items-center justify-center p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedProject.src}
                      alt={selectedProject.name}
                      className={`w-full h-full object-contain ${
                        selectedProject.id === "resonate" ? "theme-icon-invert" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground leading-tight">
                      {selectedProject.name}
                    </h3>
                    <p className="text-xs text-foreground-secondary">{selectedProject.category}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full border border-border bg-background-secondary hover:bg-hover flex items-center justify-center text-foreground transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                  {t("repositories")}
                </p>

                {selectedProject.repositories.map((repo, index) => (
                  <a
                    key={index}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-border bg-background-secondary hover:bg-hover transition-all group"
                  >
                    <div className="flex flex-col gap-0.5 max-w-[85%]">
                      <span className="text-sm font-medium text-foreground group-hover:text-heading-highlight transition-colors flex items-center gap-1.5">
                        {repo.name}
                      </span>
                      {repo.description && (
                        <span className="text-xs text-foreground-secondary line-clamp-1">
                          {repo.description}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-foreground-muted group-hover:text-foreground transition-colors">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}