import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import PageWrapper from "@/components/PageWrapper";
import SupportContent from "@/components/SupportContent";
import { generatePageMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "support");
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <PageWrapper>
      <SupportContent />
    </PageWrapper>
  );
}
