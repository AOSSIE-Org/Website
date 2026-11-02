/** Legal documents: the Markdown file at the repository root and the localized page that renders it. */
export const LEGAL_DOCUMENTS = {
  privacy: { file: 'PRIVACY.md', path: '/privacy' },
  terms: { file: 'TERMS.md', path: '/terms' },
} as const;

export type LegalDocumentKey = keyof typeof LEGAL_DOCUMENTS;
