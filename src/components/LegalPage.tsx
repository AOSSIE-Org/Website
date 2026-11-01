import fs from "fs";
import path from "path";
import { getTranslations } from "next-intl/server";
import PageWrapper from "@/components/PageWrapper";
import { LegalDocument } from "@/lib/legal-markdown";
import { LEGAL_DOCUMENTS, type LegalDocumentKey } from "@/config/legal";
import { defaultLanguage } from "@/config/languages";
import { getPathname } from "@/i18n/navigation";

/** Typography for the rendered Markdown, which has no classes of its own. */
const PROSE = [
  "text-base leading-relaxed text-foreground-secondary",
  "[&_h1]:mb-8 [&_h1]:text-4xl sm:[&_h1]:text-5xl [&_h1]:font-medium [&_h1]:tracking-tight [&_h1]:leading-[1.1] [&_h1]:text-foreground",
  "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-foreground",
  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground",
  "[&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:ps-6 [&_li]:my-2 [&_li]:ps-1 [&_li]:marker:text-foreground-muted",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
  "[&_a]:rounded-sm [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:decoration-heading-highlight [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a]:transition-colors",
  "[&_a:hover]:decoration-foreground [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-heading-highlight",
  "[&_code]:rounded-md [&_code]:border [&_code]:border-border [&_code]:bg-background-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-foreground",
].join(" ");

/** Renders PRIVACY.md or TERMS.md from the repository root, read at build time. */
export default async function LegalPage({ locale, document }: { locale: string; document: LegalDocumentKey }) {
  const t = await getTranslations({ locale, namespace: "Legal" });
  const source = fs.readFileSync(path.join(process.cwd(), LEGAL_DOCUMENTS[document].file), "utf8");
  const links = {
    privacy: getPathname({ href: LEGAL_DOCUMENTS.privacy.path, locale }),
    terms: getPathname({ href: LEGAL_DOCUMENTS.terms.path, locale }),
  };

  return (
    <PageWrapper>
      <article className="w-full max-w-3xl mx-auto px-4 sm:px-10 lg:px-14 pt-16 pb-24 sm:pt-24 sm:pb-32">
        {locale !== defaultLanguage && (
          <p role="note" className="mb-10 rounded-xl border border-border bg-background-secondary px-4 py-3 text-sm text-foreground-secondary">
            {t("englishOnly")}
          </p>
        )}
        {/* The document is English, so it keeps a left-to-right layout on RTL locales */}
        <div dir="ltr">
          <LegalDocument source={source} links={links} className={PROSE} />
        </div>
      </article>
    </PageWrapper>
  );
}
