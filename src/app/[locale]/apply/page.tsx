"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ApplyPage() {
  const t = useTranslations("ApplyPage");

  const steps = [
    {
      step: "01",
      title: t("s1Title"),
      description: t("s1Desc"),
      actionLabel: t("s1Action"),
      actionUrl: "https://discord.gg/hjUhu33uAn",
    },
    {
      step: "02",
      title: t("s2Title"),
      description: t("s2Desc"),
      actionLabel: t("s2Action"),
      actionUrl: "https://github.com/AOSSIE-Org",
    },
    {
      step: "03",
      title: t("s3Title"),
      description: t("s3Desc"),
      actionLabel: t("s3Action"),
      actionUrl: "/programs",
    },
    {
      step: "04",
      title: t("s4Title"),
      description: t("s4Desc"),
      actionLabel: t("s4Action"),
      actionUrl: "https://discord.gg/hjUhu33uAn",
    },
    {
      step: "05",
      title: t("s5Title"),
      description: t("s5Desc"),
      actionLabel: t("s5Action"),
      actionUrl: "https://summerofcode.withgoogle.com",
    },
  ];

  return (
    <PageWrapper>
      <div className="w-full py-12 sm:py-16 px-4 sm:px-10 lg:px-14 max-w-5xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
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

        {/* Timeline Steps Stack */}
        <div className="flex flex-col gap-6">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-heading-highlight/40 transition-all"
            >
              <div className="flex items-start gap-5">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-heading-highlight bg-heading-highlight/10 border border-heading-highlight/20 px-3.5 py-1.5 rounded-2xl shrink-0">
                  {item.step}
                </span>

                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>

              {item.actionUrl.startsWith("/") ? (
                <Link
                  href={item.actionUrl}
                  className="px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-hover text-xs font-semibold text-foreground transition-all shrink-0 flex items-center gap-1.5 shadow-2xs w-full md:w-auto justify-center"
                >
                  <span>{item.actionLabel}</span>
                  <span>→</span>
                </Link>
              ) : (
                <a
                  href={item.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-hover text-xs font-semibold text-foreground transition-all shrink-0 flex items-center gap-1.5 shadow-2xs w-full md:w-auto justify-center"
                >
                  <span>{item.actionLabel}</span>
                  <span>↗</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </PageWrapper>
  );
}
