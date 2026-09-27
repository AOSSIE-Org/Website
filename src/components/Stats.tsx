"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, AnimatePresence, LayoutGroup, useScroll, type PanInfo } from "framer-motion";
import { useTranslations } from "next-intl";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

// Completed GSoC projects per year (same source as the former About page growth chart)
const PROJECTS_PER_YEAR = [
  { year: 2016, projects: 4 },
  { year: 2017, projects: 8 },
  { year: 2018, projects: 12 },
  { year: 2019, projects: 9 },
  { year: 2020, projects: 9 },
  { year: 2021, projects: 11 },
  { year: 2022, projects: 8 },
  { year: 2023, projects: 6 },
  { year: 2024, projects: 18 },
  { year: 2025, projects: 19 },
  { year: 2026, projects: 22 },
];

// Milestones from the About page journey ("m1".."m6" in the Timeline messages)
const MILESTONES = [
  { year: 2011, key: "m1" },
  { year: 2016, key: "m2" },
  { year: 2017, key: "m4" },
  { year: 2018, key: "m5" },
  { year: 2025, key: "m6" },
] as const;
const TIMELINE_START = 2011;
const TIMELINE_END = 2026;

// Top contributors across Resonate, PictoPy, EduAid, Devr.AI and InPactAI (GitHub contributors API)
const CONTRIBUTORS = [
  "reach2saksham", "rohan-pandeyy", "chandansgowda", "rahulharpal1603", "Aarush-Acharya", "smokeyScraper", "M4dhav",
  "Pranav0-0Aggarwal", "Jibesh10101011", "Rishab87", "Mayank4352", "vrundraval24", "bassamadnan",
  "xkaper001", "AyaNady17", "Hemil36", "ShivamMenda", "jddeep",
];

const SWIPE_THRESHOLD = 50;

/** Deterministic pseudo-random in [0, 1), so server and client render identically. */
function seeded(n: number) {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Counts up to the number inside `value` (e.g. "8K+") once `start` is true. */
function useCountUp(value: string, start: boolean, duration = 1400) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? parseInt(match[2], 10) : 0;
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    if (!start || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCurrent(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, target, duration]);

  return match ? `${match[1]}${current}${match[3]}` : value;
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const iconProps = {
  className: "h-4 w-4",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const LayersIcon = () => (
  <svg {...iconProps}>
    <path d="m12 3-10 5 10 5 10-5-10-5Z" />
    <path d="m2 17 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </svg>
);
const ChartIcon = () => (
  <svg {...iconProps}>
    <path d="M3 3v18h18" />
    <path d="M7 16v-5M12 16V8M17 16v-9" />
  </svg>
);
const UsersIcon = () => (
  <svg {...iconProps}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const CodeIcon = () => (
  <svg {...iconProps}>
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </svg>
);

/** Discord's "Clyde" mark in the brand colour. */
const DiscordLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden>
    <path
      fill="#5865F2"
      fillRule="evenodd"
      d="M18.89 4.34A18.2 18.2 0 0 0 14.53 3c-.19.33-.4.78-.55 1.13a16.9 16.9 0 0 0-4.84 0C8.99 3.78 8.77 3.33 8.59 3a18.1 18.1 0 0 0-4.37 1.34C1.46 8.42.72 12.4 1.09 16.32A18.3 18.3 0 0 0 6.43 19c.43-.58.81-1.2 1.15-1.85a11.8 11.8 0 0 1-1.8-.86l.44-.34a13 13 0 0 0 11.18 0l.44.34c-.58.34-1.18.63-1.81.86.33.65.72 1.27 1.14 1.85a18.2 18.2 0 0 0 5.35-2.68c.46-4.54-.73-8.49-3.12-11.98ZM8.06 13.9c-1.05 0-1.9-.95-1.9-2.11 0-1.17.83-2.12 1.9-2.12 1.05 0 1.92.95 1.9 2.12 0 1.16-.85 2.11-1.9 2.11Zm7 0c-1.04 0-1.9-.95-1.9-2.11 0-1.17.84-2.12 1.9-2.12 1.06 0 1.92.95 1.9 2.12 0 1.16-.83 2.11-1.9 2.11Z"
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Visuals (all sized to fill the square card)                         */
/* ------------------------------------------------------------------ */

function MilestoneTimeline({ active: animate }: { active: boolean }) {
  const t = useTranslations("Timeline");
  const [active, setActive] = useState<number>(MILESTONES.length - 1);
  const span = TIMELINE_END - TIMELINE_START;
  const pos = (year: number) => ((year - TIMELINE_START) / span) * 100;
  const milestone = MILESTONES[active];

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="hidden @[13rem]:block min-h-[2.5rem] text-xs leading-snug line-clamp-2" aria-live="polite">
        <span className="font-mono font-semibold text-foreground">{milestone.year}</span>
        <span className="mx-1.5 text-foreground-muted">·</span>
        <span className="text-foreground-secondary">{t(`${milestone.key}Title`)}</span>
      </p>
      <div className="relative h-8">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
        <div
          className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 origin-left rounded-full bg-linear-to-r from-brand-green to-heading-highlight transition-transform duration-[1600ms] ease-out"
          style={{ transform: `scaleX(${animate ? 1 : 0})` }}
        />
        {Array.from({ length: span + 1 }, (_, i) => TIMELINE_START + i).map((year) => (
          <span
            key={year}
            aria-hidden
            className="absolute top-1/2 h-1.5 w-px -translate-y-1/2 bg-foreground-muted/40"
            style={{ left: `${pos(year)}%` }}
          />
        ))}
        {MILESTONES.map((m, i) => (
          <button
            key={m.key}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={(e) => {
              e.stopPropagation();
              setActive(i);
            }}
            aria-label={`${m.year}: ${t(`${m.key}Title`)}`}
            aria-pressed={active === i}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5 focus-visible:outline-none"
            style={{ left: `${pos(m.year)}%` }}
          >
            <span
              className={cn(
                "block rounded-full border-2 transition-all duration-300",
                active === i
                  ? "h-3.5 w-3.5 border-heading-highlight bg-heading-highlight shadow-[0_0_0_5px_color-mix(in_srgb,var(--heading-highlight)_25%,transparent)]"
                  : "h-2.5 w-2.5 border-foreground-muted bg-card hover:border-foreground"
              )}
            />
          </button>
        ))}
      </div>
      <div className="flex justify-between font-mono text-[10px] text-foreground-muted" aria-hidden>
        <span>{TIMELINE_START}</span>
        <span>{TIMELINE_END}</span>
      </div>
    </div>
  );
}

function ProjectsBarChart({ active: animate }: { active: boolean }) {
  const t = useTranslations("GrowthChart");
  const [active, setActive] = useState(PROJECTS_PER_YEAR.length - 1);
  const max = Math.max(...PROJECTS_PER_YEAR.map((d) => d.projects));
  const point = PROJECTS_PER_YEAR[active];

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <p className="hidden @[13rem]:block text-xs font-medium text-foreground-secondary" aria-live="polite">
        {t("activeLabel", { year: point.year, projects: point.projects })}
      </p>
      <div
        className="flex min-h-0 flex-1 items-end gap-1 @[15rem]:gap-1.5"
        onMouseLeave={() => setActive(PROJECTS_PER_YEAR.length - 1)}
      >
        {PROJECTS_PER_YEAR.map((d, i) => (
          <button
            key={d.year}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={(e) => e.stopPropagation()}
            aria-label={t("activeLabel", { year: d.year, projects: d.projects })}
            className="group/bar flex h-full flex-1 flex-col justify-end focus-visible:outline-none"
          >
            <span
              className={cn(
                "block w-full origin-bottom rounded-t-[4px] transition-[transform,background-color] ease-out",
                active === i ? "bg-heading-highlight" : "bg-foreground/15 group-hover/bar:bg-foreground/30"
              )}
              style={{
                height: `${(d.projects / max) * 100}%`,
                transform: `scaleY(${animate ? 1 : 0})`,
                transitionDuration: "700ms, 200ms",
                transitionDelay: `${i * 60}ms, 0ms`,
              }}
            />
            <span
              aria-hidden
              className={cn(
                "mt-1 hidden @[13rem]:block text-center font-mono text-[9px] transition-colors",
                active === i ? "text-foreground" : "text-foreground-muted"
              )}
            >
              {String(d.year).slice(2)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Avatar bubbles orbiting the Discord logo, positioned on two loose rings
// Avatars sit on a honeycomb around the Discord logo. Offsets are in card-width units (cqw), and the
// spacing is wider than an avatar, so no two photos ever overlap.
const AVATAR_SIZE = 9.5;
const AVATAR_SLOTS = [
  // top row
  ...[-30, -18, -6, 6, 18, 30].map((x) => ({ x, y: -15.5 })),
  // middle row, leaving room for the logo
  ...[-36, -25.5, -15, 15, 25.5, 36].map((x) => ({ x, y: 0 })),
  // bottom row
  ...[-30, -18, -6, 6, 18, 30].map((x) => ({ x, y: 15.5 })),
];
// Middle-row slot nearest the logo goes to the first contributor
const SLOT_ORDER = [8, 9, 1, 3, 14, 16, 7, 10, 0, 2, 4, 5, 12, 13, 15, 17, 6, 11];
const AVATAR_BUBBLES = CONTRIBUTORS.slice(0, AVATAR_SLOTS.length).map((login, i) => ({
  login,
  ...AVATAR_SLOTS[SLOT_ORDER[i]],
  delay: seeded(i + 41) * 3,
  duration: 3 + seeded(i + 51) * 2.5,
}));

function ContributorOrbit({ active: animate }: { active: boolean }) {
  return (
    <div className="relative h-full w-full scale-[0.8] @[13rem]:scale-100">
      {AVATAR_BUBBLES.map((a, i) => (
        <span
          key={a.login}
          className="absolute block overflow-hidden rounded-full border-2 border-card bg-background-muted shadow-sm transition-[opacity,scale] duration-700 ease-out motion-safe:animate-[stat-bob_var(--d)_ease-in-out_infinite]"
          style={
            {
              left: `calc(50% + ${a.x - AVATAR_SIZE / 2}cqw)`,
              top: `calc(50% + ${a.y - AVATAR_SIZE / 2}cqw)`,
              width: `${AVATAR_SIZE}cqw`,
              height: `${AVATAR_SIZE}cqw`,
              opacity: animate ? 1 : 0,
              scale: animate ? "1" : "0.3",
              transitionDelay: animate ? `${i * 40}ms` : "0ms",
              "--d": `${a.duration}s`,
              animationDelay: `${a.delay}s`,
            } as CSSProperties
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://github.com/${a.login}.png?size=64`}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
            title={a.login}
            className="block h-full w-full rounded-full object-cover"
          />
        </span>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex h-[17cqw] w-[17cqw] items-center justify-center rounded-[28%] border border-border bg-card shadow-card transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">
          <DiscordLogo className="h-[62%] w-[62%]" />
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-card bg-brand-green" />
          </span>
        </span>
      </div>
    </div>
  );
}

const HEATMAP_COLUMNS = 18;
const HEATMAP_ROWS = 7;
const HEATMAP_LEVELS = ["bg-background-muted", "bg-brand-green/25", "bg-brand-green/50", "bg-brand-green/75", "bg-brand-green"];
const HEATMAP = Array.from({ length: HEATMAP_COLUMNS * HEATMAP_ROWS }, (_, i) => {
  const col = Math.floor(i / HEATMAP_ROWS);
  // Activity trends upwards over time, like the organization itself
  const v = seeded(i + 7) * 0.75 + (col / HEATMAP_COLUMNS) * 0.45;
  return v < 0.3 ? 0 : v < 0.5 ? 1 : v < 0.7 ? 2 : v < 0.9 ? 3 : 4;
});

function RepositoryHeatmap({ active: animate }: { active: boolean }) {
  return (
    <div
      className="grid w-full grid-flow-col gap-[2px] @[15rem]:gap-[3px]"
      style={{ gridTemplateRows: `repeat(${HEATMAP_ROWS}, minmax(0, 1fr))` }}
      aria-hidden
    >
      {HEATMAP.map((level, i) => {
        const col = Math.floor(i / HEATMAP_ROWS);
        const row = i % HEATMAP_ROWS;
        return (
          <span
            key={i}
            className={cn(
              "aspect-square rounded-[2px] transition-[opacity,transform] duration-500 ease-out hover:scale-150 hover:bg-heading-highlight",
              HEATMAP_LEVELS[level]
            )}
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? undefined : "scale(0.4)",
              transitionDelay: animate ? `${(col + row) * 18}ms` : "0ms",
            }}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section: stacked, swipeable cards that spread into a grid on scroll */
/* ------------------------------------------------------------------ */

type LayoutMode = "stack" | "grid";

interface CardData {
  id: string;
  title: string;
  description: string;
  value: string;
  icon: ReactNode;
  visual: (active: boolean) => ReactNode;
  /** Whether the visual sits at the bottom (charts) or fills the space (orbit). */
  fill?: boolean;
}

function StatCardContent({ card, active }: { card: CardData; active: boolean }) {
  const display = useCountUp(card.value, active);
  return (
    <>
      <div className="flex items-center gap-2 text-foreground-secondary">
        <span className="flex h-7 w-7 @[15rem]:h-8 @[15rem]:w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background-secondary text-foreground transition-colors duration-300 group-hover:border-heading-highlight group-hover:bg-heading-highlight group-hover:text-brand-dark">
          {card.icon}
        </span>
        <h3 className="line-clamp-2 text-[10px] leading-tight @[15rem]:text-xs font-semibold uppercase tracking-wider">{card.title}</h3>
      </div>
      <p className="mt-2 @[15rem]:mt-3 text-3xl @[13rem]:text-4xl @[17rem]:text-5xl font-medium tracking-tight text-foreground tabular-nums">
        <span aria-hidden>{display}</span>
      </p>
      <div className={cn("mt-3 flex min-h-0 flex-1", card.fill ? "items-stretch" : "items-end")}>{card.visual(active)}</div>
    </>
  );
}

export default function Stats() {
  const t = useTranslations("Stats");
  const [layout, setLayout] = useState<LayoutMode>("stack");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [inView, setInView] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => setLayout(latest > 0.4 ? "grid" : "stack"));
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Start the counters and visuals once the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  const cards: CardData[] = [
    {
      id: "1",
      title: t("mainStatTitle"),
      description: t("mainStatDesc"),
      value: t("mainStatValue"),
      icon: <LayersIcon />,
      visual: (active) => <MilestoneTimeline active={active} />,
    },
    {
      id: "2",
      title: t("stat1Label"),
      description: t("stat1Desc"),
      value: t("stat1Value"),
      icon: <ChartIcon />,
      visual: (active) => <ProjectsBarChart active={active} />,
      fill: true,
    },
    {
      id: "3",
      title: t("stat2Label"),
      description: t("stat2Desc"),
      value: t("stat2Value"),
      icon: <UsersIcon />,
      visual: (active) => <ContributorOrbit active={active} />,
      fill: true,
    },
    {
      id: "4",
      title: t("stat3Label"),
      description: t("stat3Desc"),
      value: t("stat3Value"),
      icon: <CodeIcon />,
      visual: (active) => <RepositoryHeatmap active={active} />,
    },
  ];

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipe = Math.abs(offset.x) * velocity.x;
    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
    setIsDragging(false);
  };

  const getStackOrder = () => {
    const reordered = [];
    for (let i = 0; i < cards.length; i++) {
      reordered.push({ ...cards[(activeIndex + i) % cards.length], stackPosition: i });
    }
    return reordered.reverse(); // Top card renders last
  };

  const getLayoutStyles = (stackPosition: number) =>
    layout === "stack"
      ? { top: stackPosition * 10, left: stackPosition * 10, zIndex: cards.length - stackPosition, rotate: (stackPosition - 1) * 2 }
      : { top: 0, left: 0, zIndex: 1, rotate: 0 };

  // One square size for every card, in both the stack and the grid
  const CARD_SIZE = "w-full h-full";
  const GRID_CARD_SIZE =
    "w-full max-w-[min(18rem,calc((100svh-24rem)/2))] lg:max-w-[min(18rem,calc(100svh-22rem))] aspect-square";

  const containerStyles = {
    stack: "relative w-[min(78vw,18rem,calc(100svh-24rem))] aspect-square",
    // The grid is only as wide as its cards, so columns never drift apart on mid-size screens
    grid: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 w-full max-w-[calc(2*min(18rem,(100svh-24rem)/2)+1.25rem)] lg:max-w-[calc(4*min(18rem,100svh-22rem)+4.5rem)] mx-auto justify-items-center",
  };

  const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }));

  return (
    <section ref={sectionRef} className="w-full relative h-[160vh] sm:h-[140vh] bg-background border-b border-border">
      <style>{`
        @keyframes stat-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pt-20 sm:pt-24 pb-6 sm:pb-10 gap-5 sm:gap-8 overflow-hidden">
        {/* Title */}
        <div className="w-full flex flex-col items-center text-center max-w-6xl mx-auto gap-2 sm:gap-4 px-4 sm:px-10 lg:px-14 shrink-0">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.1]">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-lg text-foreground-secondary font-normal max-w-4xl text-center leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards stage */}
        <div className="flex-1 min-h-0 w-full flex items-center justify-center relative px-3 sm:px-10 lg:px-14">
          <div className="w-full flex flex-col items-center">
            <LayoutGroup>
              <motion.div layout className={cn(containerStyles[layout], "mx-auto")}>
                <AnimatePresence mode="popLayout">
                  {displayCards.map((card) => {
                    const styles = getLayoutStyles(card.stackPosition);
                    const isExpanded = expandedCard === card.id;
                    const isTopCard = layout === "stack" && card.stackPosition === 0;
                    const visualsActive = inView && (layout === "grid" || isTopCard);

                    return (
                      <motion.div
                        key={card.id}
                        layoutId={card.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: isExpanded ? 1.04 : 1, x: 0, ...styles }}
                        exit={{ opacity: 0, scale: 0.8, x: -200 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        drag={isTopCard ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.7}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={handleDragEnd}
                        whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                        onClick={() => {
                          if (isDragging) return;
                          setExpandedCard(isExpanded ? null : card.id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setExpandedCard(isExpanded ? null : card.id);
                          }
                          if (layout === "stack" && e.key === "ArrowRight") setActiveIndex((p) => (p + 1) % cards.length);
                          if (layout === "stack" && e.key === "ArrowLeft") setActiveIndex((p) => (p - 1 + cards.length) % cards.length);
                        }}
                        tabIndex={0}
                        role="button"
                        aria-pressed={isExpanded}
                        aria-label={`${card.title}: ${card.value}. ${card.description}`}
                        title={card.description}
                        className={cn(
                          "@container group cursor-pointer rounded-3xl border border-border bg-card overflow-hidden flex flex-col shadow-card select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50",
                          "hover:border-foreground/20 transition-colors duration-200",
                          layout === "stack" ? cn("absolute", CARD_SIZE) : cn("relative", GRID_CARD_SIZE),
                          "p-3.5 @[13rem]:p-5 @[17rem]:p-6",
                          layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing pb-7 @[13rem]:pb-8",
                          isExpanded && "ring-2 ring-heading-highlight/70 border-heading-highlight/50"
                        )}
                      >
                        {/* In the stack, visuals are passive so the card can be dragged */}
                        <div className={cn("flex h-full min-h-0 flex-col", layout === "stack" && "pointer-events-none")}>
                          <StatCardContent card={card} active={visualsActive} />
                        </div>

                        {isTopCard && (
                          <div className="absolute bottom-1.5 left-0 right-0 text-center select-none pointer-events-none">
                            <span className="text-[10px] text-foreground-muted uppercase tracking-wider font-semibold animate-pulse">
                              {t("swipeHint")}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>

            {layout === "stack" && (
              <div className="flex justify-center gap-1.5 mt-12 select-none">
                {cards.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "h-1.5 rounded-full transition-all cursor-pointer",
                      index === activeIndex ? "w-4 bg-foreground" : "w-1.5 bg-foreground-muted/30 hover:bg-foreground-muted/50"
                    )}
                    aria-label={t("goToCard", { index: index + 1 })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
