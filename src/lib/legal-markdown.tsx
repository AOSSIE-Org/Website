import type { ReactNode } from "react";

/**
 * Renders the repository's PRIVACY.md and TERMS.md as page content.
 *
 * Supports only the Markdown those files use: `#`–`###` headings, paragraphs,
 * `*` or `-` lists, **bold**, `code` and [links](url). Links to PRIVACY.md and
 * TERMS.md point to the site's own pages; any other link must be http(s) or
 * mailto, or it is rendered as plain text.
 */

export type LegalBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

/** Site paths that replace links to the repository's legal files. */
export interface LegalLinks {
  privacy: string;
  terms: string;
}

const HEADING = /^(#{1,3})\s+(.+)$/;
const LIST_ITEM = /^[*-]\s+(.+)$/;
const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`/g;
// Same-site paths and fragments, or http(s)/mailto. "//host" and "/\host" are protocol-relative, so they are not paths
const SAFE_HREF = /^(https?:|mailto:|#|\/(?![/\\]))/i;

export function parseLegalMarkdown(source: string): LegalBlock[] {
  const blocks: LegalBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] | null = null;

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    if (list) blocks.push({ type: "list", items: list });
    paragraph = [];
    list = null;
  };

  for (const raw of source.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const heading = HEADING.exec(line);
    if (heading) {
      flush();
      blocks.push({ type: "heading", level: heading[1].length as 1 | 2 | 3, text: heading[2] });
      continue;
    }
    const item = LIST_ITEM.exec(line);
    if (item) {
      if (paragraph.length) flush();
      (list ??= []).push(item[1]);
    } else if (list) {
      list[list.length - 1] += ` ${line}`;
    } else {
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}

export function resolveLegalHref(href: string, links: LegalLinks): string | null {
  const file = href.replace(/^\.\//, "");
  if (file === "PRIVACY.md") return links.privacy;
  if (file === "TERMS.md") return links.terms;
  return SAFE_HREF.test(href) ? href : null;
}

export function renderLegalInline(text: string, links: LegalLinks): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const [whole, bold, label, href, code] = match;
    if (bold !== undefined) {
      nodes.push(<strong key={index}>{renderLegalInline(bold, links)}</strong>);
    } else if (code !== undefined) {
      nodes.push(<code key={index}>{code}</code>);
    } else {
      const target = resolveLegalHref(href, links);
      const external = target !== null && /^https?:/i.test(target);
      nodes.push(
        target === null ? (
          label
        ) : (
          <a
            key={index}
            href={target}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </a>
        ),
      );
    }
    last = index + whole.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function LegalDocument({
  source,
  links,
  className,
}: {
  source: string;
  links: LegalLinks;
  className?: string;
}) {
  return (
    // The documents are English-only, so mark them as English inside translated pages.
    <div lang="en" className={className}>
      {parseLegalMarkdown(source).map((block, i) => {
        if (block.type === "heading") {
          const Tag = `h${block.level}` as const;
          return <Tag key={i}>{renderLegalInline(block.text, links)}</Tag>;
        }
        if (block.type === "list") {
          return (
            <ul key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{renderLegalInline(item, links)}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{renderLegalInline(block.text, links)}</p>;
      })}
    </div>
  );
}
