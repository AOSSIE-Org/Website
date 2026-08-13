"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";
import { GrowthChart } from "@/components/about/GrowthChart";
import { Timeline } from "@/components/about/Timeline";
import { Team } from "@/components/about/Team";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  const stats = [
    { value: "10+", label: t("stats.years") },
    { value: "20+", label: t("stats.projectsPerYear") },
    { value: "203+", label: t("stats.repositories") },
    { value: "88+", label: t("stats.mentors") },
    { value: "450+", label: t("stats.contributors") },
    { value: "8,000+", label: t("stats.communityMembers") },
  ];

  return (
    <PageWrapper>
      <div className="w-full py-12 sm:py-16 px-4 sm:px-10 lg:px-14 max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header Hero */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-heading-highlight/30 bg-heading-highlight/10 text-xs font-semibold text-heading-highlight uppercase tracking-wider"
          >
            {t("badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-foreground-secondary leading-relaxed max-w-3xl"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-border bg-card shadow-xs text-center flex flex-col items-center justify-center hover:border-heading-highlight/40 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-heading-highlight mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-foreground-muted font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Interactive Growth Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <GrowthChart />
        </motion.div>

        {/* Timeline Section */}
        <Timeline />

        {/* Team Section */}
        <Team />

      </div>
    </PageWrapper>
  );
}
