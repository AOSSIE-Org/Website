"use client";

import React from "react";

/**
 * True 3D Perspective Hub Diagram for AOSSIE
 * 
 * Design System & Dark Mode Integration:
 * - Fully integrated with central semantic color design tokens defined in globals.css.
 * - Supports automatic light and dark mode switching (bg-hub-bg, --hub-grid-stroke, --hub-card-top, --hub-card-border).
 * - SVG icons support adaptive theme inversion via theme-icon-invert.
 */

interface SatelliteConfig {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  rimGradId: string;
  rimTopColor: string;
  rimBottomColor: string;
  lineColor: string;
  flowColor: string;
  nodeColor: string;
  side: "left" | "right";
  defaultSvg: string;
  isInvertible?: boolean;
}

interface LogoTheme {
  rimTopColor: string;
  rimBottomColor: string;
  nodeColor: string;
}

const LOGO_THEMES: Record<string, LogoTheme> = {
  "MoveYourBody_logo.svg": {
    rimTopColor: "#00843D",
    rimBottomColor: "#005A28",
    nodeColor: "#006B31",
  },
  "carbonTracker_logo.svg": {
    rimTopColor: "#829404",
    rimBottomColor: "#4D5702",
    nodeColor: "#667403",
  },
  "chainvoice_logo.svg": {
    rimTopColor: "#25C65E",
    rimBottomColor: "#168C3E",
    nodeColor: "#1DB252",
  },
  "dit_logo.svg": {
    rimTopColor: "#C1AAFF",
    rimBottomColor: "#7E57C2",
    nodeColor: "#9575CD",
  },
  "djed_alliance.svg": {
    rimTopColor: "#F7941D",
    rimBottomColor: "#D27728",
    nodeColor: "#E58523",
  },
  "djed_alliance_logo.svg": {
    rimTopColor: "#F7941D",
    rimBottomColor: "#D27728",
    nodeColor: "#E58523",
  },
  "ellena_logo.svg": {
    rimTopColor: "#8DD789",
    rimBottomColor: "#4F9B4B",
    nodeColor: "#6AB866",
  },
  "fate_logo.svg": {
    rimTopColor: "#3A3D45",
    rimBottomColor: "#1A1C20",
    nodeColor: "#2D3037",
  },
  "minichain_logo.svg": {
    rimTopColor: "#A3B913",
    rimBottomColor: "#5B680A",
    nodeColor: "#7A8B0D",
  },
  "ogh_logo.svg": {
    rimTopColor: "#F43F9E",
    rimBottomColor: "#8B5CF6",
    nodeColor: "#D946EF",
  },
  "pictopy_logo.svg": {
    rimTopColor: "#428AFB",
    rimBottomColor: "#1D4ED8",
    nodeColor: "#3B82F6",
  },
  "rein_logo.svg": {
    rimTopColor: "#E47CDF",
    rimBottomColor: "#7366FF",
    nodeColor: "#A78BFA",
  },
  "resonate_logo.svg": {
    rimTopColor: "#3A3D45",
    rimBottomColor: "#1A1C20",
    nodeColor: "#2D3037",
  },
  "skills_logo.svg": {
    rimTopColor: "#E37A4B",
    rimBottomColor: "#AD4A1E",
    nodeColor: "#C96033",
  },
  "stability_nexus.svg": {
    rimTopColor: "#84CC16",
    rimBottomColor: "#248C22",
    nodeColor: "#3CA92F",
  },
  "stability_nexus_logo.svg": {
    rimTopColor: "#84CC16",
    rimBottomColor: "#248C22",
    nodeColor: "#3CA92F",
  },
  "stablepay_logo.svg": {
    rimTopColor: "#FFC822",
    rimBottomColor: "#FD6724",
    nodeColor: "#F59223",
  },
  "thrubox_logo.svg": {
    rimTopColor: "#3EB03E",
    rimBottomColor: "#145A14",
    nodeColor: "#228B22",
  },
  "tnt_logo.svg": {
    rimTopColor: "#FDE047",
    rimBottomColor: "#CA8A04",
    nodeColor: "#EAB308",
  },
  "zplit_logo.svg": {
    rimTopColor: "#00B643",
    rimBottomColor: "#006425",
    nodeColor: "#008A33",
  },
};

function getLogoTheme(svgPath: string, fallback: SatelliteConfig): LogoTheme {
  const filename = svgPath.split("/").pop() || "";
  return LOGO_THEMES[filename] || {
    rimTopColor: fallback.rimTopColor,
    rimBottomColor: fallback.rimBottomColor,
    nodeColor: fallback.nodeColor,
  };
}

const SATELLITES: SatelliteConfig[] = [
  {
    id: 1,
    x: 115,
    y: 15,
    w: 120,
    h: 108,
    rimGradId: "rimGrad1",
    rimTopColor: "#3A3D45",
    rimBottomColor: "#1A1C20",
    lineColor: "#ffcd00",
    flowColor: "#22C55E",
    nodeColor: "#2D3037",
    side: "left",
    defaultSvg: "/brand/project_svgs/resonate_logo.svg",
    isInvertible: true,
  },
  {
    id: 2,
    x: 240,
    y: 175,
    w: 120,
    h: 108,
    rimGradId: "rimGrad2",
    rimTopColor: "#F7941D",
    rimBottomColor: "#D27728",
    lineColor: "#ffcd00",
    flowColor: "#22C55E",
    nodeColor: "#E58523",
    side: "left",
    defaultSvg: "/brand/project_svgs/djed_alliance.svg",
  },
  {
    id: 3,
    x: 85,
    y: 300,
    w: 120,
    h: 108,
    rimGradId: "rimGrad3",
    rimTopColor: "#FDE047",
    rimBottomColor: "#CA8A04",
    lineColor: "#22C55E",
    flowColor: "#ffcd00",
    nodeColor: "#EAB308",
    side: "left",
    defaultSvg: "/brand/project_svgs/tnt_logo.svg",
  },
  {
    id: 4,
    x: 965,
    y: 15,
    w: 120,
    h: 108,
    rimGradId: "rimGrad4",
    rimTopColor: "#FFC822",
    rimBottomColor: "#FD6724",
    lineColor: "#ffcd00",
    flowColor: "#22C55E",
    nodeColor: "#F59223",
    side: "right",
    defaultSvg: "/brand/project_svgs/stablepay_logo.svg",
  },
  {
    id: 5,
    x: 840,
    y: 175,
    w: 120,
    h: 108,
    rimGradId: "rimGrad5",
    rimTopColor: "#3A3D45",
    rimBottomColor: "#1A1C20",
    lineColor: "#22C55E",
    flowColor: "#ffcd00",
    nodeColor: "#2D3037",
    side: "right",
    defaultSvg: "/brand/project_svgs/fate_logo.svg",
  },
  {
    id: 6,
    x: 995,
    y: 300,
    w: 120,
    h: 108,
    rimGradId: "rimGrad6",
    rimTopColor: "#84CC16",
    rimBottomColor: "#248C22",
    lineColor: "#22C55E",
    flowColor: "#ffcd00",
    nodeColor: "#3CA92F",
    side: "right",
    defaultSvg: "/brand/project_svgs/stability_nexus.svg",
  },
];

const CENTER = { x: 480, y: 145, w: 240, h: 200 };

// Attachment point on the bottom rim of each satellite box
function startPoint(sat: SatelliteConfig) {
  return { x: sat.x + sat.w / 2, y: sat.y + sat.h + 16 };
}

// Target entry point on the central AOSSIE hub boundary
function endPoint(sat: SatelliteConfig) {
  const targetX = sat.side === "left" ? CENTER.x : CENTER.x + CENTER.w;
  if (sat.id === 1 || sat.id === 4) return { x: targetX, y: CENTER.y + 38 };
  if (sat.id === 2 || sat.id === 5) return { x: targetX, y: CENTER.y + CENTER.h / 2 };
  return { x: targetX, y: CENTER.y + CENTER.h - 38 };
}

// Connector path: Non-intersecting 3-lane parallel routing
function connectorPath(sat: SatelliteConfig) {
  const start = startPoint(sat);
  const end = endPoint(sat);
  const isLeft = sat.side === "left";
  const dirX = isLeft ? 1 : -1;
  const r = 4; // sharp/tight corner radius for line elbows

  if (sat.id === 1 || sat.id === 4) {
    const leg1Y = 152;
    const trunkX = isLeft ? CENTER.x - 20 : CENTER.x + CENTER.w + 20;

    return (
      `M ${start.x} ${start.y} ` +
      `L ${start.x} ${leg1Y - r} ` +
      `Q ${start.x} ${leg1Y} ${start.x + dirX * r} ${leg1Y} ` +
      `L ${trunkX - dirX * r} ${leg1Y} ` +
      `Q ${trunkX} ${leg1Y} ${trunkX} ${leg1Y + r} ` +
      `L ${trunkX} ${end.y - r} ` +
      `Q ${trunkX} ${end.y} ${trunkX + dirX * r} ${end.y} ` +
      `L ${end.x} ${end.y}`
    );
  }

  if (sat.id === 2 || sat.id === 5) {
    const leg1Y = start.y + 22;
    const trunkX = isLeft ? CENTER.x - 40 : CENTER.x + CENTER.w + 40;

    return (
      `M ${start.x} ${start.y} ` +
      `L ${start.x} ${leg1Y - r} ` +
      `Q ${start.x} ${leg1Y} ${start.x + dirX * r} ${leg1Y} ` +
      `L ${trunkX - dirX * r} ${leg1Y} ` +
      `Q ${trunkX} ${leg1Y} ${trunkX} ${leg1Y - r} ` +
      `L ${trunkX} ${end.y + r} ` +
      `Q ${trunkX} ${end.y} ${trunkX + dirX * r} ${end.y} ` +
      `L ${end.x} ${end.y}`
    );
  }

  if (sat.id === 3 || sat.id === 6) {
    const leg1Y = 440;
    const trunkX = isLeft ? CENTER.x - 24 : CENTER.x + CENTER.w + 24;

    return (
      `M ${start.x} ${start.y} ` +
      `L ${start.x} ${leg1Y - r} ` +
      `Q ${start.x} ${leg1Y} ${start.x + dirX * r} ${leg1Y} ` +
      `L ${trunkX - dirX * r} ${leg1Y} ` +
      `Q ${trunkX} ${leg1Y} ${trunkX} ${leg1Y - r} ` +
      `L ${trunkX} ${end.y + r} ` +
      `Q ${trunkX} ${end.y} ${trunkX + dirX * r} ${end.y} ` +
      `L ${end.x} ${end.y}`
    );
  }

  return "";
}

export interface HubDiagram3DProps {
  logos?: (string | undefined)[];
  centerLogo?: string;
}

export default function HubDiagram3D({ logos = [], centerLogo }: HubDiagram3DProps) {
  return (
    <div
      className="w-full relative overflow-hidden bg-hub-bg transition-colors duration-200"
      style={{
        perspective: "1400px",
        WebkitPerspective: "1400px",
      }}
    >
      <style>{`
        .hub-wire-base {
          fill: none;
          stroke-width: 2px;
          stroke-linecap: round;
          stroke-linejoin: round;
          opacity: 0.9;
        }

        .hub-wire-flow {
          fill: none;
          stroke-width: 2.4px;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 130 260;
          animation: yellowWirePulse 1.6s linear infinite;
        }

        @keyframes yellowWirePulse {
          from { stroke-dashoffset: 390; }
          to { stroke-dashoffset: 0; }
        }

        .hub-box { animation: hub-box-breathe 3.4s ease-in-out infinite; }
        @keyframes hub-box-breathe {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hub-wire-base,.hub-wire-flow,.hub-box { animation:none !important; }
        }
      `}</style>

      {/* 3D Scene Wrapper tilted gently towards the screen (28deg tilt) */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1200 / 450",
          position: "relative",
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transform: "rotateX(28deg)",
          transformOrigin: "50% 50%",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 450"
          className="block w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Semantic Floor grid lines matching the design system */}
            <pattern
              id="hubFloorGrid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 48 0 H 0 V 48" fill="none" stroke="var(--hub-grid-stroke)" strokeWidth="1" />
            </pattern>

            {/* Hub central 3D rim gradient (Yellow to Green with depth shading) */}
            <linearGradient id="centerRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffcd00" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="75%" stopColor="#4CAF3D" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>

            {/* Hub central top border gradient (Mix Yellowish-Green from Design System) */}
            <linearGradient id="centerBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--hub-center-border-start)" />
              <stop offset="40%" stopColor="var(--hub-center-border-mid1)" />
              <stop offset="75%" stopColor="var(--hub-center-border-mid2)" />
              <stop offset="100%" stopColor="var(--hub-center-border-end)" />
            </linearGradient>

            {/* Satellite 3D Rim Depth Gradients */}
            {SATELLITES.map((sat, i) => {
              const svgPath = logos[i] || sat.defaultSvg;
              const theme = getLogoTheme(svgPath, sat);
              return (
                <linearGradient
                  key={sat.rimGradId}
                  id={sat.rimGradId}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={theme.rimTopColor} />
                  <stop offset="100%" stopColor={theme.rimBottomColor} />
                </linearGradient>
              );
            })}
          </defs>

          {/* Background floor grid */}
          <rect width="1200" height="450" fill="url(#hubFloorGrid)" opacity="0.8" />

          {/* Connector Paths (Drawn BEFORE cuboids so lines never overlap cuboid tops) */}
          {SATELLITES.map((sat, i) => {
            const start = startPoint(sat);
            const path = connectorPath(sat);
            const delay = (i * 0.35).toFixed(2);
            const svgPath = logos[i] || sat.defaultSvg;
            const theme = getLogoTheme(svgPath, sat);

            return (
              <g key={`group-path-${sat.id}`}>
                {/* Thin 2px base wire with exact color matching design system */}
                <path d={path} className="hub-wire-base" stroke={sat.lineColor} />

                {/* Signal flow pulse gliding along wire */}
                <path
                  d={path}
                  className="hub-wire-flow"
                  stroke={sat.flowColor}
                  style={{ animationDelay: `${delay}s` }}
                />

                {/* Satellite bottom attachment node button matching side edge face color */}
                <circle cx={start.x} cy={start.y} r="4.5" fill={theme.nodeColor} />
              </g>
            );
          })}

          {/* Satellite 3D Slabs with Layered Depth */}
          {SATELLITES.map((sat, i) => {
            const svgPath = logos[i] || sat.defaultSvg;

            return (
              <g
                key={`sat-box-${sat.id}`}
                className="hub-box"
                style={{ animationDelay: `${(i * 0.35).toFixed(2)}s` }}
              >
                {/* Ambient soft ground shadow */}
                <ellipse
                  cx={sat.x + sat.w / 2}
                  cy={sat.y + sat.h + 24}
                  rx={sat.w * 0.55}
                  ry="14"
                  fill="#000000"
                  opacity="0.08"
                  filter="blur(10px)"
                />

                {/* Core ground drop shadow */}
                <ellipse
                  cx={sat.x + sat.w / 2}
                  cy={sat.y + sat.h + 20}
                  rx={sat.w * 0.46}
                  ry="8"
                  fill="#000000"
                  opacity="0.14"
                  filter="blur(5px)"
                />

                {/* 3D Side & Vertical Wall Extrusion */}
                <rect
                  x={sat.x}
                  y={sat.y}
                  width={sat.w}
                  height={sat.h + 16}
                  rx="12"
                  fill={`url(#${sat.rimGradId})`}
                />

                {/* Top Semantic Surface (var(--hub-card-top) and var(--hub-card-border)) */}
                <rect
                  x={sat.x}
                  y={sat.y}
                  width={sat.w}
                  height={sat.h}
                  rx="12"
                  fill="var(--hub-card-top)"
                  stroke="var(--hub-card-border)"
                  strokeWidth="1.8"
                />

                {/* Project SVG Icon (warped natively by 3D perspective plane) */}
                <image
                  href={svgPath}
                  x={sat.x + (sat.w - 74) / 2}
                  y={sat.y + (sat.h - 74) / 2}
                  width="74"
                  height="74"
                  preserveAspectRatio="xMidYMid meet"
                  className={svgPath.endsWith("resonate_logo.svg") ? "theme-icon-invert" : undefined}
                />
              </g>
            );
          })}

          {/* Central 3D AOSSIE Hub Box with Deep 3D Extrusion */}
          <g className="hub-box" style={{ animationDelay: "0.2s" }}>
            {/* Ambient soft shadow under hub */}
            <ellipse
              cx={CENTER.x + CENTER.w / 2}
              cy={CENTER.y + CENTER.h + 30}
              rx={CENTER.w * 0.56}
              ry="18"
              fill="#22C55E"
              opacity="0.20"
              filter="blur(16px)"
            />

            {/* Core ground shadow under hub */}
            <ellipse
              cx={CENTER.x + CENTER.w / 2}
              cy={CENTER.y + CENTER.h + 24}
              rx={CENTER.w * 0.48}
              ry="10"
              fill="#000000"
              opacity="0.15"
              filter="blur(6px)"
            />

            {/* 3D Bottom & Vertical Side Wall Extrusion (Yellow-to-Green 3D Rim) */}
            <rect
              x={CENTER.x}
              y={CENTER.y}
              width={CENTER.w}
              height={CENTER.h + 22}
              rx="18"
              fill="url(#centerRimGrad)"
            />

            {/* Top Semantic Surface with Yellowish-Green Gradient Border */}
            <rect
              x={CENTER.x}
              y={CENTER.y}
              width={CENTER.w}
              height={CENTER.h}
              rx="18"
              fill="var(--hub-card-top)"
              stroke="url(#centerBorderGrad)"
              strokeWidth="2.5"
            />

            {/* Central AOSSIE Logo SVG (Exact 1126:1209 aspect ratio, 0 stretching) */}
            <image
              href={centerLogo || "/brand/icons/aossie_logo.svg"}
              x={CENTER.x + (CENTER.w - 144) / 2}
              y={CENTER.y + (CENTER.h - 155) / 2}
              width="144"
              height="155"
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
