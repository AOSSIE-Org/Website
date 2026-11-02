/**
 * Browser APIs that jsdom lacks (IntersectionObserver, ResizeObserver, matchMedia, PointerEvent,
 * DragEvent, scrollTo), installed by setup.ts. The observers record their instances so tests can
 * report an element entering the viewport or being resized.
 */
import { vi } from "vitest";

export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  readonly observed: Element[] = [];
  disconnected = false;

  constructor(
    private readonly callback: IntersectionObserverCallback,
    readonly options?: IntersectionObserverInit,
  ) {
    MockIntersectionObserver.instances.push(this);
  }

  observe(el: Element) {
    this.observed.push(el);
  }
  unobserve() {}
  disconnect() {
    this.disconnected = true;
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  /** Reports `targets` (default: everything observed) as intersecting or not. */
  trigger(isIntersecting: boolean, targets: Element[] = this.observed) {
    const entries = targets.map((target) => ({ target, isIntersecting }) as IntersectionObserverEntry);
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

export class MockResizeObserver {
  static instances: MockResizeObserver[] = [];
  readonly observed: Element[] = [];

  constructor(private readonly callback: ResizeObserverCallback) {
    MockResizeObserver.instances.push(this);
  }

  observe(el: Element) {
    this.observed.push(el);
  }
  unobserve() {}
  disconnect() {}

  /** Reports a new content size for every observed element. */
  resize(width: number, height: number) {
    const entries = this.observed.map((target) => ({ target, contentRect: { width, height } }) as ResizeObserverEntry);
    this.callback(entries, this as unknown as ResizeObserver);
  }
}

/** Media queries that currently match; everything else reports `matches: false`. */
export const matchingMedia = new Set<string>();

export function installBrowserMocks() {
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  vi.stubGlobal("ResizeObserver", MockResizeObserver);

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn((query: string) => ({
      matches: matchingMedia.has(query),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  Element.prototype.scrollTo = vi.fn() as unknown as typeof Element.prototype.scrollTo;

  // jsdom has neither event; React listens for them by name, so a MouseEvent subclass is enough
  if (!("PointerEvent" in window)) {
    class PointerEvent extends MouseEvent {}
    vi.stubGlobal("PointerEvent", PointerEvent);
  }
  if (!("DragEvent" in window)) {
    class DragEvent extends MouseEvent {}
    vi.stubGlobal("DragEvent", DragEvent);
  }
}

export function resetBrowserMocks() {
  MockIntersectionObserver.instances = [];
  MockResizeObserver.instances = [];
  matchingMedia.clear();
}
