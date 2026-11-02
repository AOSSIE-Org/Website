/** Typings for the parts of @aossie-org/social-share-button the site uses; the package ships plain JavaScript. */
declare module "@aossie-org/social-share-button" {
  /** UI text inside the share dialog. Versions before 1.1.0 ignore it and show English. */
  export interface SocialShareLabels {
    share?: string;
    close?: string;
    copy?: string;
    copied?: string;
    copyFailed?: string;
    urlLabel?: string;
  }

  export interface SocialShareOptions {
    container?: HTMLElement | string | null;
    url?: string;
    title?: string;
    showButton?: boolean;
    platforms?: string[];
    theme?: "light" | "dark";
    labels?: SocialShareLabels;
  }

  export default class SocialShareButton {
    constructor(options?: SocialShareOptions);
    openModal(): void;
    closeModal(): void;
    updateOptions(options: SocialShareOptions): void;
    destroy(): void;
  }
}

interface Window {
  /**
   * Set by the library as it loads. The package is marked `"type": "module"` but assigns
   * `module.exports`, so bundlers that load it as an ES module expose the class only here.
   */
  SocialShareButton?: typeof import("@aossie-org/social-share-button").default;
}
