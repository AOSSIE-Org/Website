import type { Project } from "@/lib/projectsData";

interface ProjectLogoProps {
  project: Pick<Project, "name" | "logo" | "logoInvertOnDark">;
  /** Tailwind size + radius classes for the tile. */
  className?: string;
  /** Tailwind size classes for the logo image inside the tile. */
  imageClassName?: string;
  /** Tailwind text-size class for the monogram fallback. */
  monogramClassName?: string;
}

function monogram(name: string): string {
  const words = name.replace(/[^A-Za-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  // Single word: use its capital letters (e.g. "OpenVerifiableLLM" → "OV"), else the first two letters
  const capitals = name.match(/[A-Z]/g) ?? [];
  if (capitals.length >= 2) return capitals.slice(0, 2).join("");
  return name.slice(0, 2).toUpperCase();
}

/** A project's logo on a neutral tile, or a typographic monogram when it has none. */
export default function ProjectLogo({
  project,
  className = "w-14 h-14 rounded-2xl",
  imageClassName = "w-[72%] h-[72%]",
  monogramClassName = "text-lg",
}: ProjectLogoProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden border border-border bg-background flex items-center justify-center ${className}`}
    >
      {project.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.logo}
          alt=""
          loading="lazy"
          decoding="async"
          className={`${imageClassName} object-contain ${project.logoInvertOnDark ? "theme-icon-invert" : ""}`}
        />
      ) : (
        <span
          aria-hidden
          className={`font-semibold tracking-tight text-foreground-secondary select-none ${monogramClassName}`}
        >
          {monogram(project.name)}
        </span>
      )}
    </div>
  );
}
