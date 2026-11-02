/**
 * Stand-in for @aossie-org/social-share-button (a plain-JS DOM widget), registered in setup.ts.
 * Records each dialog the site creates so tests can check its options and calls.
 */
import { vi } from "vitest";
import type { SocialShareOptions } from "@aossie-org/social-share-button";

export class MockShareDialog {
  static instances: MockShareDialog[] = [];
  /** When true the module exposes no default export, like the ESM build that only sets `window.SocialShareButton`. */
  static exportOnWindowOnly = false;

  openModal = vi.fn();
  closeModal = vi.fn();
  updateOptions = vi.fn();
  destroy = vi.fn();

  constructor(readonly options: SocialShareOptions) {
    MockShareDialog.instances.push(this);
  }
}

export function resetShareDialogs() {
  MockShareDialog.instances = [];
  MockShareDialog.exportOnWindowOnly = false;
  delete (window as { SocialShareButton?: unknown }).SocialShareButton;
}

export const shareModule = {
  get default() {
    return MockShareDialog.exportOnWindowOnly ? undefined : MockShareDialog;
  },
};
