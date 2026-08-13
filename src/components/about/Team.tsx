"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Team() {
  const t = useTranslations("Team");

  const roles = [
    { title: t("r1Title"), count: "15+", description: t("r1Desc") },
    { title: t("r2Title"), count: "88+", description: t("r2Desc") },
    { title: t("r3Title"), count: "450+", description: t("r3Desc") },
    { title: t("r4Title"), count: "8,000+", description: t("r4Desc") },
  ];

  return (
    <div className="py-12 w-full" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-foreground-secondary leading-relaxed font-normal">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl border border-border bg-card shadow-xs hover:border-heading-highlight/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-heading-highlight mb-2">
                  {role.count}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {role.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
