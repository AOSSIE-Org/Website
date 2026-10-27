import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { generateLocaleMetadata } from "@/i18n/metadata";
import { getMessages } from "@/i18n/messages";

const defaultLocalePath = `/${routing.defaultLocale}`;

// A static export cannot send HTTP redirects, so `/` ships the default
// locale's metadata (for crawlers and link previews) and forwards in the browser.
export async function generateMetadata(): Promise<Metadata> {
  return generateLocaleMetadata(routing.defaultLocale);
}

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${defaultLocalePath}`} />
      <p className="p-8 text-center">
        <a href={defaultLocalePath} className="underline">
          {getMessages(routing.defaultLocale).NotFound.home}
        </a>
      </p>
    </>
  );
}
