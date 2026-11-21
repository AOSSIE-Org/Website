import { act, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ScrollToTop from "@/components/ScrollToTop";
import { messages, renderWithIntl } from "./test-utils/render";
import { matchingMedia } from "./test-utils/browser";

const mocks = vi.hoisted(() => ({ lenisScrollTo: vi.fn() }));
let lenisInstance: { scrollTo: typeof mocks.lenisScrollTo } | null = null;

vi.mock("lenis/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("lenis/react")>();
  return { ...actual, useLenis: () => lenisInstance };
});

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value });
}

describe("ScrollToTop", () => {
  beforeEach(() => {
    setScrollY(0);
    lenisInstance = null;
  });

  afterEach(() => {
    setScrollY(0);
    matchingMedia.clear();
    lenisInstance = null;
  });

  it("is hidden near the top and appears after scrolling past the threshold", () => {
    renderWithIntl(<ScrollToTop />);
    expect(screen.queryByRole("button", { name: messages("en").ScrollToTop.label })).toBeNull();

    setScrollY(351);
    act(() => fireEvent.scroll(window));

    expect(screen.getByRole("button", { name: messages("en").ScrollToTop.label })).toBeInTheDocument();
  });

  it("scrolls smoothly to the top when clicked", () => {
    setScrollY(500);
    renderWithIntl(<ScrollToTop />);

    fireEvent.click(screen.getByRole("button", { name: messages("en").ScrollToTop.label }));

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("uses the active Lenis instance when smooth scrolling is enabled", () => {
    lenisInstance = { scrollTo: mocks.lenisScrollTo };
    setScrollY(500);
    renderWithIntl(<ScrollToTop />);

    fireEvent.click(screen.getByRole("button", { name: messages("en").ScrollToTop.label }));

    expect(mocks.lenisScrollTo).toHaveBeenCalledWith(0);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("honours reduced-motion preferences", () => {
    matchingMedia.add("(prefers-reduced-motion: reduce)");
    setScrollY(500);
    renderWithIntl(<ScrollToTop />);

    fireEvent.click(screen.getByRole("button", { name: messages("en").ScrollToTop.label }));

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });

  it("hides again after scrolling back to the top", () => {
    setScrollY(500);
    renderWithIntl(<ScrollToTop />);
    const button = screen.getByRole("button", { name: messages("en").ScrollToTop.label });

    setScrollY(100);
    act(() => fireEvent.scroll(window));

    expect(button).not.toBeInTheDocument();
  });
});
