"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineElementProps {
  index: number;
  title: string;
  time: string;
  description: string;
}

export function TimelineElement({ index, title, time, description }: TimelineElementProps) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-10 ml-8 relative group"
    >
      {/* Node Dot */}
      <span className="absolute -left-[41px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-border bg-card group-hover:border-heading-highlight group-hover:bg-heading-highlight/20 transition-all">
        <span className="h-2 w-2 rounded-full bg-heading-highlight" />
      </span>

      {/* Card Content */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-xs group-hover:border-border/80 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-foreground group-hover:text-heading-highlight transition-colors">
            {title}
          </h3>
          <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-heading-highlight/10 text-heading-highlight border border-heading-highlight/20">
            {time}
          </span>
        </div>
        <p className="text-sm text-foreground-secondary leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </motion.li>
  );
}
