"use client";

import React, { useRef } from "react";
import { TimelineElement } from "./TimelineElement";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

export function Timeline() {
  const t = useTranslations("Timeline");
  const containerRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const milestones = [
    { title: t("m1Title"), time: "2011", description: t("m1Desc") },
    { title: t("m2Title"), time: "2016", description: t("m2Desc") },
    { title: t("m3Title"), time: "2016", description: t("m3Desc") },
    { title: t("m4Title"), time: "2017", description: t("m4Desc") },
    { title: t("m5Title"), time: "2020", description: t("m5Desc") },
    { title: t("m6Title"), time: "2022", description: t("m6Desc") },
    { title: t("m7Title"), time: "2025–2026", description: t("m7Desc") },
  ];

  return (
    <div className="py-12 w-full" id="timeline">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mt-3 text-base text-foreground-secondary max-w-xl mx-auto">
          {t("subtitle")}
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto px-4 relative">
        <ol ref={containerRef} className="relative border-l-2 border-border ml-4 sm:ml-6">
          {/* Animated line fill */}
          <motion.div
            className="absolute left-[-2px] top-0 w-[2px] rounded-full origin-top bg-heading-highlight"
            style={{ height: lineHeight, opacity: lineOpacity }}
          />

          {/* Traveling glow dot */}
          <motion.div
            className="absolute -left-[8px] w-3.5 h-3.5 rounded-full z-10 bg-heading-highlight shadow-md"
            style={{ top: glowY }}
          >
            <motion.span
              animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-heading-highlight/60"
            />
          </motion.div>

          {milestones.map((milestone, idx) => (
            <TimelineElement
              key={idx}
              index={idx}
              title={milestone.title}
              time={milestone.time}
              description={milestone.description}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
