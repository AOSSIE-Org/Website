import { GSOC_URL, STABILITY_NEXUS_URL } from './links';

/** The localized page that explains how to support AOSSIE, linked from the footer. */
export const SUPPORT_PAGE = { path: '/support' } as const;

/**
 * Organizations listed as supporters on the support page. The names are proper nouns and are not
 * translated. No sponsorship tier is given, as none is claimed.
 */
export const SUPPORTERS: { name: string; link: string }[] = [
  { name: 'Google Summer of Code', link: GSOC_URL },
  { name: 'Stability Nexus', link: STABILITY_NEXUS_URL },
];
