import type { Project } from "../projectsData";
import type { ProjectText } from "./types";
import zh from "./zh";
import hi from "./hi";
import es from "./es";
import fr from "./fr";
import ar from "./ar";
import bn from "./bn";
import pt from "./pt";
import ru from "./ru";
import ur from "./ur";
import sw from "./sw";
import ha from "./ha";
import mi from "./mi";

export type { ProjectText };

/**
 * Translations of project card text, keyed by locale and project slug.
 * English lives in `projectsData.ts`; any missing entry falls back to it.
 */
export const PROJECT_TRANSLATIONS: Record<string, Record<string, ProjectText>> = {
  zh,
  hi,
  es,
  fr,
  ar,
  bn,
  pt,
  ru,
  ur,
  sw,
  ha,
  mi,
};

/** The project's description and overview in the given locale, falling back to English. */
export function getProjectText(project: Project, locale: string): ProjectText {
  const localized = PROJECT_TRANSLATIONS[locale]?.[project.slug];
  return {
    description: localized?.description ?? project.description,
    about: localized?.about ?? project.about,
  };
}
