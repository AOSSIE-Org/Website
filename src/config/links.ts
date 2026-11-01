/** External links and contact addresses. Components import these instead of hard-coding URLs. */

/** GitHub origin, used to build organization, repository and avatar URLs. */
export const GITHUB_URL = 'https://github.com';

export const GITHUB_ORG_URL = `${GITHUB_URL}/AOSSIE-Org`;

/** Invite to the AOSSIE Discord server. */
export const DISCORD_INVITE_URL = 'https://discord.gg/hjUhu33uAn';

/** Documents in the AOSSIE Info repository (brand kit, rules, program guides). */
export const INFO_REPO_URL = `${GITHUB_ORG_URL}/Info/blob/main`;

/** How to apply for Google Summer of Code with AOSSIE. */
export const GSOC_APPLY_URL = `${INFO_REPO_URL}/Programs/GoogleSummerOfCode/GoogleSummerOfCode.md`;

/** Where people can sponsor AOSSIE, linked from the support page. */
export const GITHUB_SPONSORS_URL = `${GITHUB_URL}/sponsors/AOSSIE-Org`;

/** Supporter and partner websites. */
export const GSOC_URL = 'https://summerofcode.withgoogle.com/';
export const STABILITY_NEXUS_URL = 'https://stability.nexus/';
export const DJED_URL = 'https://djed.one/';

/** Official accounts, shown in the hero and footer. */
export const SOCIAL_LINKS = {
  discord: DISCORD_INVITE_URL,
  github: GITHUB_ORG_URL,
  x: 'https://x.com/aossie_org',
  linkedin: 'https://www.linkedin.com/company/aossie/',
  youtube: 'https://www.youtube.com/@AOSSIE-Org',
  telegram: 'https://t.me/+bMWGzaMTMa8xN2Ex',
} as const;

export const CONTACT_EMAIL = 'contact@aossie.org';

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

/** Pre-addressed email for organizations that want to sponsor, partner or collaborate. */
export const PARTNER_MAILTO = `${CONTACT_MAILTO}?subject=${encodeURIComponent('Partnering with AOSSIE')}`;

/** Community inbox linked from the home page hero. */
export const COMMUNITY_EMAIL = 'aossie.oss@gmail.com';

export const COMMUNITY_MAILTO = `mailto:${COMMUNITY_EMAIL}`;
