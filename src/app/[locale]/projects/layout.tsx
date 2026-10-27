import type { Metadata } from "next";
import type { ReactNode } from "react";
import { generatePageMetadata } from "@/i18n/metadata";

// The page is a client component, so its metadata is declared here
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "projects");
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
