"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence, LayoutGroup, useScroll, type PanInfo } from "framer-motion";
import { useTranslations } from "next-intl";

export type LayoutMode = "stack" | "grid";

export interface CardData {
  id: string;
  title: string;
  description: string;
  value: string;
  icon?: ReactNode;
}

// --- Inline SVG Icons ---
const LayersIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-10 5 10 5 10-5-10-5Z" />
    <path d="m2 17 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </svg>
);

const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H9a2 2 0 0 0-2 2v2h10V4a2 2 0 0 0-2-2Z" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
    <path d="M12 11h.01" />
    <path d="M3 13a20 20 0 0 0 18 0" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </svg>
);

const SWIPE_THRESHOLD = 50;

function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Stats() {
  const t = useTranslations("Stats");
  const [layout, setLayout] = useState<LayoutMode>("stack");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.40) {
        setLayout("grid");
      } else {
        setLayout("stack");
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const cards: CardData[] = [
    {
      id: "1",
      title: t("mainStatTitle"),
      description: t("mainStatDesc"),
      value: t("mainStatValue"),
      icon: <LayersIcon className="h-5 w-5" />,
    },
    {
      id: "2",
      title: t("stat1Label"),
      description: t("stat1Desc"),
      value: t("stat1Value"),
      icon: <BriefcaseIcon className="h-5 w-5" />,
    },
    {
      id: "3",
      title: t("stat2Label"),
      description: t("stat2Desc"),
      value: t("stat2Value"),
      icon: <UsersIcon className="h-5 w-5" />,
    },
    {
      id: "4",
      title: t("stat3Label"),
      description: t("stat3Desc"),
      value: t("stat3Value"),
      icon: <CodeIcon className="h-5 w-5" />,
    },
  ];

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipe = Math.abs(offset.x) * velocity.x;

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      // Swiped left - go to next card
      setActiveIndex((prev) => (prev + 1) % cards.length);
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      // Swiped right - go to previous card
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
    setIsDragging(false);
  };

  const getStackOrder = () => {
    const reordered = [];
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length;
      reordered.push({ ...cards[index], stackPosition: i });
    }
    return reordered.reverse(); // Reverse so top card renders last (on top)
  };

  const getLayoutStyles = (stackPosition: number) => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 8,
          left: stackPosition * 8,
          zIndex: cards.length - stackPosition,
          rotate: (stackPosition - 1) * 2,
        };
      case "grid":
      default:
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        };
    }
  };

  const containerStyles = {
    stack: "relative w-64 h-56 sm:w-68 sm:h-60",
    grid: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 w-full max-w-6xl mx-auto justify-items-center justify-center",
  };

  const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }));

  return (
    <section ref={sectionRef} className="w-full relative h-[140vh] sm:h-[120vh] bg-background border-b border-border">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pt-12 sm:pt-24 pb-6 sm:pb-10 gap-4 sm:gap-8 overflow-hidden">
        {/* Title */}
        <div className="w-full flex flex-col items-center text-center max-w-6xl mx-auto gap-2 sm:gap-4 px-4 sm:px-10 lg:px-14 shrink-0">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.1]">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-lg text-foreground-secondary font-normal max-w-4xl text-center leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards Stage Container */}
        <div className="flex-1 w-full flex items-center justify-center relative px-3 sm:px-10 lg:px-14">
          <div className="w-full flex flex-col items-center">
            {/* Cards Container */}
            <LayoutGroup>
              <motion.div layout className={cn(containerStyles[layout], "mx-auto")}>
                <AnimatePresence mode="popLayout">
                  {displayCards.map((card) => {
                    const styles = getLayoutStyles(card.stackPosition);
                    const isExpanded = expandedCard === card.id;
                    const isTopCard = layout === "stack" && card.stackPosition === 0;

                    return (
                      <motion.div
                        key={card.id}
                        layoutId={card.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          scale: isExpanded ? 1.05 : 1,
                          x: 0,
                          ...styles,
                        }}
                        exit={{ opacity: 0, scale: 0.8, x: -200 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
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
                            if (isDragging) return;
                            setExpandedCard(isExpanded ? null : card.id);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-pressed={isExpanded}
                        aria-label={t("cardAriaLabel", { title: card.title, value: card.value })}
                        className={cn(
                          "cursor-pointer rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between shadow-md select-none focus:outline-none focus:ring-2 focus:ring-foreground/50",
                          "hover:border-brand-yellow/50 transition-colors duration-200",
                          layout === "stack"
                            ? "absolute w-64 h-56 sm:w-68 sm:h-60 p-5 sm:p-6"
                            : "relative w-full max-w-[280px] h-36 sm:h-60 p-3.5 sm:p-6",
                          layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing",
                          isExpanded && "ring-2 ring-brand-yellow/70 border-brand-yellow/50",
                        )}
                      >
                        <div className="flex items-start gap-2.5 sm:gap-4">
                          {card.icon && (
                            <div className="flex h-8 w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-background-secondary text-foreground border border-border">
                              {card.icon}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <span className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground block mb-0.5">
                              {card.value}
                            </span>
                            <h3 className="font-semibold text-foreground text-xs sm:text-base leading-tight sm:leading-snug break-words">
                              {card.title}
                            </h3>
                          </div>
                        </div>

                        {isTopCard && (
                          <div className="absolute bottom-2 left-0 right-0 text-center select-none pointer-events-none">
                            <span className="text-[10px] text-foreground-muted uppercase tracking-wider font-semibold animate-pulse">{t("swipeHint")}</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>

            {layout === "stack" && cards.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-14 select-none">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "h-1.5 rounded-full transition-all cursor-pointer",
                      index === activeIndex ? "w-4 bg-foreground" : "w-1.5 bg-foreground-muted/30 hover:bg-foreground-muted/50"
                    )}
                    aria-label={`Go to card ${index + 1}`}
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
