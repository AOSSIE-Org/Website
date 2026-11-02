/**
 * Pass-through stand-in for framer-motion, registered in setup.ts.
 *
 * jsdom has no layout, scroll or pointer-drag engine, so motion components render as their plain
 * DOM element. Animation props are dropped, except that `animate` is exposed as `data-animate`
 * (JSON) so tests can check where a component asked an element to move. `useScroll` returns one
 * shared progress value that tests drive with `scrollYProgress.set(...)`, and `useSpring` follows
 * its source immediately instead of easing towards it.
 */
import React, { forwardRef, type ReactNode } from "react";
import { vi } from "vitest";
import type * as FramerMotion from "framer-motion";

const actual = await vi.importActual<typeof FramerMotion>("framer-motion");

/** Scroll progress returned by every `useScroll()` call. Reset to 0 after each test. */
export const scrollYProgress = actual.motionValue(0);

const MOTION_ONLY_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "transition",
  "variants",
  "whileInView",
  "whileHover",
  "whileTap",
  "whileDrag",
  "whileFocus",
  "viewport",
  "layout",
  "layoutId",
  "drag",
  "dragConstraints",
  "dragElastic",
  "onDragStart",
  "onDragEnd",
  "onAnimationComplete",
]);

/** Drag gesture data a test passes as the drag event's `dataTransfer`. */
export interface TestPanInfo {
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
}

type AnyProps = Record<string, unknown> & { children?: ReactNode; style?: Record<string, unknown> };

function resolveStyle(style: AnyProps["style"]): Record<string, unknown> | undefined {
  if (!style) return undefined;
  return Object.fromEntries(
    Object.entries(style).map(([key, value]) => [key, actual.isMotionValue(value) ? value.get() : value]),
  );
}

function createMotionComponent(tag: string) {
  const Component = forwardRef<Element, AnyProps>(function MotionStub(props, ref) {
    const domProps: AnyProps = {};
    for (const [key, value] of Object.entries(props)) {
      if (!MOTION_ONLY_PROPS.has(key)) domProps[key] = value;
    }
    if (props.animate && typeof props.animate === "object") domProps["data-animate"] = JSON.stringify(props.animate);
    if (props.drag) domProps["data-drag"] = String(props.drag);
    if (props.style) domProps.style = resolveStyle(props.style as Record<string, unknown>);
    // Drag gestures: tests fire HTML drag events whose `dataTransfer` carries the pan info
    const onDragStart = props.onDragStart as (() => void) | undefined;
    const onDragEnd = props.onDragEnd as ((event: Event, info: TestPanInfo) => void) | undefined;
    if (onDragStart) domProps.onDragStart = () => onDragStart();
    if (onDragEnd) {
      domProps.onDragEnd = (e: React.DragEvent) => onDragEnd(e.nativeEvent, e.dataTransfer as unknown as TestPanInfo);
    }
    return React.createElement(tag, { ...domProps, ref });
  });
  return Component;
}

const cache = new Map<string, ReturnType<typeof createMotionComponent>>();

export const motion = new Proxy(
  {},
  {
    get(_target, tag: string) {
      if (!cache.has(tag)) cache.set(tag, createMotionComponent(tag));
      return cache.get(tag);
    },
  },
) as unknown as typeof FramerMotion.motion;

export function AnimatePresence({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

export function LayoutGroup({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

export const useScroll = () => ({
  scrollYProgress,
  scrollY: actual.motionValue(0),
  scrollX: actual.motionValue(0),
  scrollXProgress: actual.motionValue(0),
});

export const useSpring = (source: unknown) => source;

export const { useTransform, useMotionValue, motionValue, isMotionValue } = actual;
