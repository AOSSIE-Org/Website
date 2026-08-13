"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function GrowthChart() {
  const t = useTranslations("GrowthChart");

  const chartData = [
    { year: "2016", projects: 4 },
    { year: "2017", projects: 8 },
    { year: "2018", projects: 12 },
    { year: "2019", projects: 9 },
    { year: "2020", projects: 9 },
    { year: "2021", projects: 11 },
    { year: "2022", projects: 8 },
    { year: "2023", projects: 6 },
    { year: "2024", projects: 18 },
    { year: "2025", projects: 22 },
  ];

  const [activePoint, setActivePoint] = useState<{ year: string; projects: number } | null>(null);

  const width = 800;
  const height = 300;
  const padding = 40;

  const maxVal = 25;
  const minVal = 0;

  const points = chartData.map((d, i) => {
    const x = padding + (i / (chartData.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((d.projects - minVal) / (maxVal - minVal)) * (height - 2 * padding);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="w-full p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-md flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">{t("title")}</h3>
          <p className="text-sm text-foreground-secondary">
            {t("subtitle")}
          </p>
        </div>
        {activePoint && (
          <div className="px-4 py-1.5 rounded-xl border border-heading-highlight/30 bg-heading-highlight/10 text-xs font-mono font-semibold text-heading-highlight w-fit">
            {t("activeLabel", { year: activePoint.year, projects: activePoint.projects })}
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px] relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--heading-highlight)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--heading-highlight)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 5, 10, 15, 20, 25].map((val) => {
              const y = height - padding - ((val - minVal) / (maxVal - minVal)) * (height - 2 * padding);
              return (
                <g key={val}>
                  <line
                    x1={padding}
                    y1={y}
                    x2={width - padding}
                    y2={y}
                    stroke="var(--border)"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={padding - 12}
                    y={y + 4}
                    fill="var(--foreground-muted)"
                    fontSize="11"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Area Fill */}
            <path d={areaD} fill="url(#growthGradient)" />

            {/* Line Path */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="#00843D"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Interactive Data Points */}
            {points.map((pt, i) => (
              <g key={i}>
                <line
                  x1={pt.x}
                  y1={height - padding}
                  x2={pt.x}
                  y2={height - padding + 15}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={pt.x}
                  y={height - padding + 20}
                  fill="var(--foreground-secondary)"
                  fontSize="12"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {pt.year}
                </text>

                <motion.circle
                  cx={pt.x}
                  cy={pt.y}
                  r={activePoint?.year === pt.year ? 7 : 5}
                  fill={activePoint?.year === pt.year ? "#FFCD00" : "#00843D"}
                  stroke="var(--background)"
                  strokeWidth="2"
                  tabIndex={0}
                  role="button"
                  aria-label={`${pt.year}: ${pt.projects} projects`}
                  className="cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-heading-highlight"
                  onMouseEnter={() => setActivePoint(pt)}
                  onClick={() => setActivePoint(pt)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActivePoint(pt);
                    }
                  }}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
