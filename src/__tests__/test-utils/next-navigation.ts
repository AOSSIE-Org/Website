/**
 * Stand-in for `next/navigation`, registered in setup.ts. next-intl's navigation helpers
 * (`@/i18n/navigation`) run for real on top of it, so tests see the locale-prefixed URLs the
 * site would navigate to. Set `navigation.pathname` to the URL the page is rendered at.
 */
import { vi } from "vitest";

export const navigation = {
  /** Full browser path, including the locale prefix (e.g. "/en/about"). */
  pathname: "/en",
  params: { locale: "en" } as Record<string, string>,
};

export const router = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
};

export function resetNavigation() {
  navigation.pathname = "/en";
  navigation.params = { locale: "en" };
  Object.values(router).forEach((fn) => fn.mockReset());
}

export const useRouter = () => router;
export const usePathname = () => navigation.pathname;
export const useParams = () => navigation.params;
export const useSearchParams = () => new URLSearchParams();
export const useSelectedLayoutSegment = () => null;
export const useSelectedLayoutSegments = () => [];

/** Next.js throws to stop rendering; the message carries the target so tests can assert it. */
export const redirect = vi.fn((url: string) => {
  throw new Error(`NEXT_REDIRECT:${url}`);
});
export const permanentRedirect = vi.fn((url: string) => {
  throw new Error(`NEXT_REDIRECT:${url}`);
});
export const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});

export const RedirectType = { push: "push", replace: "replace" } as const;
