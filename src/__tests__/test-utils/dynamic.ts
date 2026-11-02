/**
 * Stand-in for `next/dynamic`, registered in setup.ts: React.lazy with the component's own
 * `loading` placeholder as the Suspense fallback. `holdDynamicImports()` keeps the lazy modules
 * from loading until the returned function is called, so tests can see the placeholders.
 */
import React from "react";

let gate: Promise<void> = Promise.resolve();

export function holdDynamicImports(): () => void {
  let release!: () => void;
  gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  return release;
}

export function releaseDynamicImports() {
  gate = Promise.resolve();
}

export default function dynamic(
  loader: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>,
  options?: { loading?: React.ComponentType },
) {
  const Lazy = React.lazy(async () => {
    await gate;
    return loader();
  });
  return function Dynamic(props: Record<string, unknown>) {
    const fallback = options?.loading ? React.createElement(options.loading) : null;
    return React.createElement(React.Suspense, { fallback }, React.createElement(Lazy, props));
  };
}
