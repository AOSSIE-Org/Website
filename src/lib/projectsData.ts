/**
 * AOSSIE project catalogue.
 *
 * One entry per project (not per repository). Descriptions are sourced from each
 * project's README / GitHub metadata. Discord links point to the project's own
 * channel or #projects thread when one exists (see the Gitcord config in
 * AOSSIE-Org/Gitcord-GithubDiscordBot), otherwise to the relevant server invite.
 *
 * Projects hosted under StabilityNexus and DjedAlliance are part of the AOSSIE
 * umbrella (see AOSSIE-Org/Info › Programs/GoogleSummerOfCode).
 */

import { REPO_STATS } from "./repoStats";

export const TOPICS =["Blockchain", "Artificial Intelligence", "Mobile"] as const;
export type Topic = (typeof TOPICS)[number];

export const THEMES = ["Communication", "Education", "Finance", "Sustainability", "Infrastructure"] as const;
export type Theme = (typeof THEMES)[number];

export const ORGANIZATIONS = ["AOSSIE", "Stability Nexus", "Djed Alliance"] as const;
export type Organization = (typeof ORGANIZATIONS)[number];

export const ORGANIZATION_GITHUB: Record<Organization, string> = {
  AOSSIE: "https://github.com/AOSSIE-Org",
  "Stability Nexus": "https://github.com/StabilityNexus",
  "Djed Alliance": "https://github.com/DjedAlliance",
};

const OWNER_TO_ORGANIZATION: Record<string, Organization> = {
  "AOSSIE-Org": "AOSSIE",
  StabilityNexus: "Stability Nexus",
  DjedAlliance: "Djed Alliance",
};

export interface Repository {
  /** "owner/name" on GitHub */
  fullName: string;
  language?: string;
}

export interface Project {
  slug: string;
  name: string;
  /** One or two sentences, shown on cards. */
  description: string;
  /** Longer overview, shown on the project page. Falls back to `description`. */
  about?: string;
  /** Path to the project's own logo. Projects without one render a monogram. */
  logo?: string;
  /** Logos drawn in a single dark colour that need inverting in dark mode. */
  logoInvertOnDark?: boolean;
  topics: Topic[];
  themes: Theme[];
  repositories: Repository[];
  discordUrl: string;
  websiteUrl?: string;
  archived?: boolean;
}

const AOSSIE_GUILD = "https://discord.com/channels/1022871757289422898";
const STABILITY_NEXUS_GUILD = "https://discord.com/channels/995968619034984528";
export const AOSSIE_DISCORD_INVITE = "https://discord.gg/hjUhu33uAn";
export const STABILITY_NEXUS_DISCORD_INVITE = "https://discord.gg/fuuWX4AbJt";

const aossieChannel = (id: string) => `${AOSSIE_GUILD}/${id}`;
const stabilityChannel = (id: string) => `${STABILITY_NEXUS_GUILD}/${id}`;

export const PROJECTS_DATA: Project[] = [
  // ---------------------------------------------------------------- Communication
  {
    slug: "resonate",
    name: "Resonate",
    description: "An open-source, community-driven social voice platform, like Clubhouse or Twitter Spaces.",
    about:
      "Resonate puts voice at the centre of social interaction: live audio rooms for discussions and events, random pair chats, and voice calls. The Flutter app is backed by Appwrite cloud functions and LiveKit for real-time audio.",
    logo: "/brand/project_svgs/resonate_logo.svg",
    logoInvertOnDark: true,
    topics: ["Mobile"],
    themes: ["Communication"],
    repositories: [
      { fullName: "AOSSIE-Org/Resonate", language: "Dart" },
      { fullName: "AOSSIE-Org/Resonate-Backend", language: "JavaScript" },
      { fullName: "AOSSIE-Org/Resonate-Website", language: "TypeScript" },
    ],
    discordUrl: aossieChannel("1317913663360864346"),
    websiteUrl: "https://resonate.aossie.org",
  },
  {
    slug: "rein",
    name: "Rein",
    description: "A cross-platform, LAN-based remote input controller with a browser client for touch and non-touch devices.",
    about:
      "Rein runs a server on the desktop and lets any device on the local network control it from a web browser, with no native client app required. It supports remote input, real-time screen streaming, file transfer and multiple simultaneous clients.",
    logo: "/brand/project_svgs/rein_logo.svg",
    topics: [],
    themes: ["Communication"],
    repositories: [{ fullName: "AOSSIE-Org/Rein", language: "TypeScript" }],
    discordUrl: aossieChannel("1467370739152846899"),
  },
  {
    slug: "ogh",
    name: "Ogh",
    description: "A local-first Android app for live streaming a camera or screen to multiple RTMP/RTMPS destinations at once.",
    about:
      "Ogh captures the screen or camera, mixes the selected audio, encodes once and publishes to one or more RTMP destinations, with YouTube and Twitch integration. It has no ads, analytics, watermarks, accounts or hosted media relay, and works without Google Play Services. The name comes from the Sanskrit ogha, a stream or continuous flow.",
    logo: "/brand/project_svgs/ogh_logo.svg",
    topics: ["Mobile"],
    themes: ["Communication"],
    repositories: [{ fullName: "AOSSIE-Org/Ogh", language: "Kotlin" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },
  {
    slug: "thrubox",
    name: "ThruBox",
    description: "A minimal, self-hostable relay server that acts as an encrypted mailbox, plus a zero-dependency client SDK.",
    about:
      "The ThruBox server stores and relays opaque encrypted payloads between users. It never sees plaintext, since all encryption happens client-side. It ships as a single binary with embedded SQLite, configurable message TTLs, rate limiting and optional API-key auth. The TypeScript client SDK works in Node.js and browsers.",
    logo: "/brand/project_svgs/thrubox_logo.svg",
    topics: [],
    themes: ["Communication", "Infrastructure"],
    repositories: [
      { fullName: "AOSSIE-Org/ThruBox-Server" },
      { fullName: "AOSSIE-Org/ThruBox-Client" },
    ],
    discordUrl: AOSSIE_DISCORD_INVITE,
    websiteUrl: "https://www.npmjs.com/package/@aossie-org/thrubox-client",
  },
  {
    slug: "openpeerchat",
    name: "OpenPeerChat",
    description: "Peer-to-peer messaging that relays messages across nearby devices instead of relying on a central server.",
    about:
      "OpenPeerChat aims for private, censorship-resistant communication that keeps working without internet connectivity, which is useful in remote or disaster-hit areas. Messages hop between nearby devices until they reach their destination. It has Flutter and React Native implementations.",
    logo: "/brand/project_logos/openpeerchat_logo.png",
    topics: ["Mobile"],
    themes: ["Communication"],
    repositories: [
      { fullName: "AOSSIE-Org/OpenPeerChat-flutter", language: "Dart" },
      { fullName: "AOSSIE-Org/OpenPeerChat-react-native", language: "JavaScript" },
    ],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },
  {
    slug: "perspective",
    name: "Perspective",
    description: "Analyses your news or social feed and presents credible counter-narratives from reliable sources.",
    about:
      "Perspective is designed to break the echo chambers created by personalised content algorithms. It surfaces well-reasoned alternative viewpoints and up-to-date facts alongside the content you read, helping you think critically.",
    topics: ["Artificial Intelligence"],
    themes: ["Communication"],
    repositories: [{ fullName: "AOSSIE-Org/Perspective", language: "TypeScript" }],
    discordUrl: aossieChannel("1339226574276268144"),
    websiteUrl: "https://perspective-aossie.vercel.app/",
  },
  {
    slug: "social-street-smart",
    name: "Social Street Smart",
    description: "A browser extension that makes the internet safer by flagging abusive language, fake news, clickbait and malicious sites.",
    about:
      "Social Street Smart combines a Chrome extension with Python APIs and pre-trained models for clickbait, hate-speech and fake-news detection, image disinformation detection and website reputation checks.",
    logo: "/brand/project_logos/socialstreetsmart_logo.png",
    topics: ["Artificial Intelligence"],
    themes: ["Communication"],
    repositories: [
      { fullName: "AOSSIE-Org/Social-Street-Smart", language: "Jupyter Notebook" },
      { fullName: "AOSSIE-Org/social-street-smart-api" },
    ],
    discordUrl: AOSSIE_DISCORD_INVITE,
    websiteUrl: "https://chromewebstore.google.com/detail/social-street-smart/ddjcjpfkmcgpgpjhlmdenmionhbnpagm",
  },
  {
    slug: "monumento",
    name: "Monumento",
    description: "An AR-integrated social app to check in at, explore and share the world's iconic landmarks.",
    about:
      "Monumento lets travellers and history enthusiasts check in to monuments, explore famous sites in AR and connect with people who share their interest in cultural heritage. Built with Flutter and Appwrite.",
    logo: "/brand/project_logos/monumento_logo.png",
    topics: ["Mobile"],
    themes: ["Communication"],
    repositories: [{ fullName: "AOSSIE-Org/Monumento", language: "Dart" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },
  {
    slug: "socialsharebutton",
    name: "SocialShareButton",
    description: "A lightweight, zero-dependency social sharing component that works with any web framework.",
    about:
      "SocialShareButton supports WhatsApp, Facebook, X, LinkedIn, Telegram, Reddit, Email, Pinterest and Discord, auto-detects the current URL and title, and works with React, Preact, Next.js, Qwik, Vue, Angular or plain HTML.",
    logo: "/brand/project_logos/socialsharebutton_logo.png",
    topics: [],
    themes: ["Communication", "Infrastructure"],
    repositories: [{ fullName: "AOSSIE-Org/SocialShareButton", language: "TypeScript" }],
    discordUrl: aossieChannel("1479012884209078365"),
    websiteUrl: "https://social-share-button.aossie.org/",
  },
  {
    slug: "crowdalert",
    name: "CrowdAlert",
    description: "A crowdsourced application for reporting and viewing incidents around the world.",
    topics: ["Mobile"],
    themes: ["Communication"],
    repositories: [
      { fullName: "AOSSIE-Org/CrowdAlert-Mobile", language: "JavaScript" },
      { fullName: "AOSSIE-Org/CrowdAlert-Web", language: "JavaScript" },
      { fullName: "AOSSIE-Org/CrowdAlert", language: "JavaScript" },
    ],
    discordUrl: AOSSIE_DISCORD_INVITE,
    archived: true,
  },

  // ---------------------------------------------------------------- Education
  {
    slug: "eduaid",
    name: "EduAid",
    description: "An AI tool that auto-generates short quizzes from any educational content.",
    about:
      "Self-learners on YouTube and MOOCs often struggle to retain what they watch. EduAid generates multiple-choice, true/false and short-answer quizzes from input text, helping students revise and teachers frame questions quickly. It is available as a web app, desktop app and browser extension.",
    topics: ["Artificial Intelligence"],
    themes: ["Education"],
    repositories: [{ fullName: "AOSSIE-Org/EduAid", language: "JavaScript" }],
    discordUrl: aossieChannel("1317912993786499072"),
  },
  {
    slug: "debateai",
    name: "DebateAI",
    description: "A real-time debating platform where you face human opponents or LLM-powered AI challengers.",
    about:
      "DebateAI helps people sharpen their communication skills through structured debates with opening, cross-examination and closing rounds. Users can debate each other over WebSockets and WebRTC, or practise against AI opponents that adapt their counter-arguments to your input.",
    topics: ["Artificial Intelligence"],
    themes: ["Education", "Communication"],
    repositories: [
      { fullName: "AOSSIE-Org/DebateAI", language: "TypeScript" },
      { fullName: "AOSSIE-Org/DebateAI-LandingPage", language: "TypeScript" },
    ],
    discordUrl: aossieChannel("1312986807914463252"),
  },
  {
    slug: "libred",
    name: "LibrEd",
    description: "A fully local, containerised, agent-driven platform that turns syllabus PDFs into exam-preparation material.",
    about:
      "LibrEd scrapes, classifies and generates study materials from raw syllabus PDFs using local LLMs through Ollama. All processing happens on your machine without external APIs or cloud dependencies, and the whole system runs via Docker Compose.",
    logo: "/brand/project_logos/libred_logo.png",
    topics: ["Artificial Intelligence"],
    themes: ["Education"],
    repositories: [{ fullName: "AOSSIE-Org/LibrEd", language: "Python" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
    websiteUrl: "https://dontcompete.vercel.app",
  },
  {
    slug: "minichain",
    name: "MiniChain",
    description: "A minimal blockchain for education, research and innovation.",
    logo: "/brand/project_svgs/minichain_logo.svg",
    topics: ["Blockchain"],
    themes: ["Education"],
    repositories: [{ fullName: "StabilityNexus/MiniChain", language: "Python" }],
    discordUrl: stabilityChannel("1471163521877410045"),
  },
  {
    slug: "mind-the-word",
    name: "MindTheWord",
    description: "A browser extension that helps you learn a new language by translating a few words on every page you visit.",
    about:
      "Because only a few words on each page are translated, their meaning is easy to infer from context, so vocabulary is picked up naturally while browsing in your native language.",
    topics: ["Mobile"],
    themes: ["Education"],
    repositories: [
      { fullName: "AOSSIE-Org/MindTheWord", language: "JavaScript" },
      { fullName: "AOSSIE-Org/MindTheWord-Mobile", language: "TypeScript" },
    ],
    discordUrl: AOSSIE_DISCORD_INVITE,
    archived: true,
  },
  {
    slug: "starcross",
    name: "Starcross",
    description: "An astronomy app to gaze at stars, planets and constellations based on your actual location.",
    topics: ["Mobile"],
    themes: ["Education"],
    repositories: [
      { fullName: "AOSSIE-Org/starcross", language: "Objective-C" },
      { fullName: "AOSSIE-Org/Starcross-Android", language: "Java" },
    ],
    discordUrl: AOSSIE_DISCORD_INVITE,
    archived: true,
  },
  {
    slug: "aossie-scholar",
    name: "AOSSIE Scholar",
    description: "A Chrome extension that calculates performance-based metrics for researchers from their Google Scholar profile.",
    topics: [],
    themes: ["Education"],
    repositories: [{ fullName: "AOSSIE-Org/Aossie-Scholar", language: "JavaScript" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
    archived: true,
  },

  // ---------------------------------------------------------------- Finance
  {
    slug: "djed",
    name: "Djed",
    description: "A formally verified, crypto-backed autonomous stablecoin protocol.",
    about:
      "Djed keeps a stablecoin pegged through a dual-coin design: a StableCoin that tracks a target price and a ReserveCoin that backs it and absorbs volatility. The Djed Alliance maintains the Solidity contracts, web dashboards and the oracle contracts and off-chain poster that feed prices on-chain.",
    logo: "/brand/project_svgs/djed_alliance_logo.svg",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [
      { fullName: "DjedAlliance/Djed-Solidity", language: "Solidity" },
      { fullName: "DjedAlliance/Djed-Solidity-WebDashboard", language: "JavaScript" },
      { fullName: "DjedAlliance/Djed-Solidity-ERC20BaseCoin-WebUI", language: "TypeScript" },
      { fullName: "DjedAlliance/Oracle-Solidity", language: "Solidity" },
      { fullName: "DjedAlliance/Oracle-Backend", language: "TypeScript" },
      { fullName: "DjedAlliance/Oracle-FormalMethods" },
    ],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
    websiteUrl: "https://djed.one",
  },
  {
    slug: "stablepay",
    name: "StablePay",
    description: "A fully decentralised, client-side-only widget for accepting cryptocurrency and stablecoin payments.",
    about:
      "When embedded in a website, the StablePay widget talks directly to smart contracts, with no intermediary servers. Customers can pay in a chain's native cryptocurrency or in stablecoins backed by it, with automatic conversion between the two. A merchant dashboard shows received payments.",
    logo: "/brand/project_svgs/stablepay_logo.svg",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [
      { fullName: "DjedAlliance/StablePay", language: "JavaScript" },
      { fullName: "DjedAlliance/StablePay-MerchantDashboard", language: "TypeScript" },
      { fullName: "DjedAlliance/StablePay-LandingPage", language: "TypeScript" },
      { fullName: "DjedAlliance/StablePay-MerchantWebsiteDemo", language: "TypeScript" },
    ],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
    websiteUrl: "https://stablepay.stability.nexus/",
  },
  {
    slug: "gluon",
    name: "Gluon",
    description: "An autonomous crypto-backed stablecoin protocol that splits reserves into stable and volatile tokens.",
    about:
      "Inspired by nuclear physics, Gluon splits an existing reserve asset into a stable “neutron” and a volatile “proton” through fission, and merges them back through fusion. It has implementations on EVM chains, Ergo and Solana, plus an SDK and a formalisation in the Rocq (Coq) prover.",
    logo: "/brand/project_logos/gluon_logo.svg",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [
      { fullName: "StabilityNexus/Gluon-EVM", language: "Solidity" },
      { fullName: "StabilityNexus/Gluon-EVM-WebUI", language: "TypeScript" },
      { fullName: "StabilityNexus/Gluon-Ergo-UI", language: "TypeScript" },
      { fullName: "StabilityNexus/Gluon-Ergo-SDK", language: "TypeScript" },
      { fullName: "StabilityNexus/Gluon-Solana", language: "TypeScript" },
      { fullName: "StabilityNexus/Gluon-Formalization-Coq", language: "Rocq" },
      { fullName: "StabilityNexus/Gluon-LandingPage", language: "TypeScript" },
      { fullName: "StabilityNexus/Gluon-PyGluon-Simulator" },
      { fullName: "DjedAlliance/Gluon-Ergo-WebUI" },
      { fullName: "DjedAlliance/Gluon-Ergo-Backend-Contracts" },
    ],
    discordUrl: stabilityChannel("1283781488587837492"),
    websiteUrl: "https://gluon.stability.nexus",
  },
  {
    slug: "fate",
    name: "Fate",
    description: "Decentralised, perpetual prediction pools where users buy and sell bullCoins and bearCoins.",
    about:
      "Fate replaces order books with a dual-vault design so users can speculate on price trends in an always-on market with no expiry. It runs on EVM chains, Sui and Solana, with price feeds from multiple oracle providers.",
    logo: "/brand/project_svgs/fate_logo.svg",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [
      { fullName: "StabilityNexus/Fate-EVM-Frontend", language: "TypeScript" },
      { fullName: "StabilityNexus/Fate-Sui-Frontend", language: "TypeScript" },
      { fullName: "StabilityNexus/Fate-Solana", language: "Rust" },
      { fullName: "StabilityNexus/Fate-Solana-WebUI", language: "TypeScript" },
      { fullName: "StabilityNexus/Fate-LandingPage", language: "TypeScript" },
    ],
    discordUrl: stabilityChannel("1324064370883301386"),
    websiteUrl: "https://evm.fate.stability.nexus/",
  },
  {
    slug: "tectonic",
    name: "Tectonic",
    description: "A stablecoin protocol for EVM chains, with a web UI to explore deployments, EquityCoins and trigger redemptions.",
    logo: "/brand/project_logos/tectonic_logo.png",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [{ fullName: "StabilityNexus/Tectonic-EVM-WebUI", language: "TypeScript" }],
    discordUrl: stabilityChannel("1503320626096635935"),
    websiteUrl: "https://stabilitynexus.github.io/Tectonic-EVM-WebUI/",
  },
  {
    slug: "chainvoice",
    name: "Chainvoice",
    description: "A decentralised invoicing platform for tamper-proof invoice creation, management and payment on-chain.",
    about:
      "Chainvoice uses EVM-compatible smart contracts to automate invoice payment flows and reduce reliance on intermediaries. Users can create invoices, manage payments and track transaction history transparently.",
    logo: "/brand/project_svgs/chainvoice_logo.svg",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [{ fullName: "StabilityNexus/Chainvoice", language: "JavaScript" }],
    discordUrl: stabilityChannel("1328282666335993856"),
    websiteUrl: "https://chainvoice.stability.nexus/",
  },
  {
    slug: "zplit",
    name: "Zplit",
    description: "A privacy-first mobile app for splitting group expenses, with offline use and peer-to-peer sync.",
    about:
      "Zplit handles expense tracking, group management and debt calculation without a central server. Data stays on your device and syncs peer-to-peer over Wi-Fi Direct, Bluetooth or NFC.",
    logo: "/brand/project_svgs/zplit_logo.svg",
    topics: ["Mobile", "Blockchain"],
    themes: ["Finance"],
    repositories: [
      { fullName: "StabilityNexus/Zplit", language: "Dart" },
      { fullName: "AOSSIE-Org/Zplit-Website" },
    ],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },
  {
    slug: "supportusbutton",
    name: "SupportUsButton",
    description: "A configurable, minimalistic “Support Us” component for showcasing sponsors in any frontend.",
    about:
      "SupportUsButton provides tier-based sponsor layouts with logos and links, several built-in themes and Tailwind CSS styling, making it easy to add a professional support page to any project.",
    logo: "/brand/project_logos/supportusbutton_logo.svg",
    topics: [],
    themes: ["Finance", "Infrastructure"],
    repositories: [{ fullName: "AOSSIE-Org/SupportUsButton", language: "TypeScript" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
    websiteUrl: "https://aossie-org.github.io/SupportUsButton/",
  },
  {
    slug: "inpact-ai",
    name: "InPactAI",
    description: "An AI-powered platform that connects content creators, brands and agencies through data-driven insights.",
    about:
      "InPactAI uses generative AI, audience analytics and engagement metrics to match creators with relevant sponsorships, help creators find collaborators with complementary audiences, and help brands measure the return on influencer campaigns.",
    logo: "/brand/project_logos/inpactai_logo.png",
    topics: ["Artificial Intelligence"],
    themes: ["Finance"],
    repositories: [{ fullName: "AOSSIE-Org/InPactAI", language: "TypeScript" }],
    discordUrl: aossieChannel("1345044736515379210"),
  },

  // ---------------------------------------------------------------- Sustainability
  {
    slug: "carbon-tracker",
    name: "CarbonTracker",
    description: "A local-first fitness tracker that also tracks the CO₂ emissions you save by how you travel.",
    about:
      "CarbonTracker tracks activity, trips and transport modes, calculates emissions and savings, and keeps fitness, location and trip data on your device. It supports Health Connect / HealthKit and Wear OS, with a companion watch app in development.",
    logo: "/brand/project_svgs/carbonTracker_logo.svg",
    topics: ["Mobile"],
    themes: ["Sustainability"],
    repositories: [
      { fullName: "AOSSIE-Org/CarbonTracker", language: "Dart" },
      { fullName: "AOSSIE-Org/CarbonTracker-WatchCompanionApp" },
    ],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },
  {
    slug: "carbon-footprint",
    name: "Carbon Footprint",
    description: "Tools that surface the carbon footprint of everyday choices: a maps extension, an API, a mobile app and voice assistants.",
    about:
      "The Carbon Footprint family started as a browser extension that shows emissions in map services, and grew into a universal emissions API, a React Native app, an Amazon Alexa skill and a Google Assistant action.",
    topics: ["Mobile"],
    themes: ["Sustainability"],
    repositories: [
      { fullName: "AOSSIE-Org/CarbonFootprint", language: "JavaScript" },
      { fullName: "AOSSIE-Org/CarbonFootprint-API", language: "JavaScript" },
      { fullName: "AOSSIE-Org/CarbonFootprint-Mobile", language: "JavaScript" },
      { fullName: "AOSSIE-Org/CarbonFootPrint-Alexa", language: "JavaScript" },
      { fullName: "AOSSIE-Org/CarbonAssistant-Function", language: "JavaScript" },
      { fullName: "AOSSIE-Org/CarbonAssistant-Agent" },
    ],
    discordUrl: AOSSIE_DISCORD_INVITE,
    archived: true,
  },

  // ---------------------------------------------------------------- AI tools that run on your device
  {
    slug: "pictopy",
    name: "PictoPy",
    description: "A privacy-first desktop photo gallery with on-device face clustering, object detection and smart search.",
    about:
      "PictoPy brings modern AI photo management to your own machine without cloud uploads. Built with Tauri, React, Rust and a Python backend, it groups faces across your library, tags photos with detected objects and lets you search in plain words, fully offline.",
    logo: "/brand/project_svgs/pictopy_logo.svg",
    topics: ["Artificial Intelligence"],
    themes: [],
    repositories: [
      { fullName: "AOSSIE-Org/PictoPy", language: "Python" },
      { fullName: "AOSSIE-Org/PictoPy-Website", language: "TypeScript" },
    ],
    discordUrl: aossieChannel("1311271974630330388"),
    websiteUrl: "https://pictopy.aossie.org",
  },
  {
    slug: "smartnotes",
    name: "Smart Notes",
    description: "A privacy-focused desktop app for personal knowledge management with local semantic search and RAG.",
    about:
      "Smart Notes combines a markdown editor with local vector search and on-device language models, so you can ask questions about your notes and discover connections between ideas, offline by default.",
    topics: ["Artificial Intelligence"],
    themes: [],
    repositories: [{ fullName: "AOSSIE-Org/SmartNotes" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },
  {
    slug: "moveyourbody",
    name: "MoveYourBody",
    description: "A privacy-first, on-device fitness app with short micro-workouts that adapt to your feedback.",
    about:
      "MoveYourBody schedules two or three 5–7 minute sessions a day and adapts exercises to your feedback and health conditions using rule-based filtering and lightweight semantic matching, all fully offline.",
    logo: "/brand/project_svgs/MoveYourBody_logo.svg",
    topics: ["Artificial Intelligence", "Mobile"],
    themes: [],
    repositories: [{ fullName: "AOSSIE-Org/MoveYourBody", language: "Dart" }],
    discordUrl: aossieChannel("1500966300782956634"),
  },
  {
    slug: "babynest",
    name: "BabyNest",
    description: "An intelligent pregnancy planner that tracks prenatal appointments and gives AI-powered recommendations.",
    about:
      "BabyNest keeps expecting parents organised with trimester-based appointment tracking, country-specific healthcare notifications and personalised guidance.",
    topics: ["Artificial Intelligence", "Mobile"],
    themes: [],
    repositories: [{ fullName: "AOSSIE-Org/BabyNest", language: "JavaScript" }],
    discordUrl: aossieChannel("1339225155481763882"),
  },
  {
    slug: "docpilot",
    name: "DocPilot",
    description: "An EMR app that records, transcribes and analyses doctor–patient conversations with conversational AI.",
    about:
      "DocPilot helps healthcare providers streamline documentation: it transcribes consultations in real time and generates conversation summaries and prescription suggestions.",
    topics: ["Artificial Intelligence", "Mobile"],
    themes: [],
    repositories: [{ fullName: "AOSSIE-Org/DocPilot", language: "Dart" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },
  {
    slug: "neurotrack",
    name: "NeuroTrack",
    description: "An AI-assisted platform supporting the screening and management of neurodevelopmental conditions such as ASD and ADHD.",
    about:
      "NeuroTrack automates preliminary screening assessments and connects patients with qualified therapists through two dedicated apps, one for patients and one for therapists, streamlining assessment, consultation and therapy management.",
    logo: "/brand/project_logos/neurotrack_logo.svg",
    topics: ["Artificial Intelligence", "Mobile"],
    themes: [],
    repositories: [{ fullName: "AOSSIE-Org/NeuroTrack", language: "Dart" }],
    discordUrl: aossieChannel("1347053043711082507"),
  },
  {
    slug: "ai-keyboard",
    name: "AI Keyboard",
    description: "An AI-powered keyboard for mobile devices.",
    topics: ["Artificial Intelligence", "Mobile"],
    themes: [],
    repositories: [{ fullName: "AOSSIE-Org/AI-Keyboard", language: "Dart" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },

  // ---------------------------------------------------------------- Infrastructure
  {
    slug: "open-verifiable-llm",
    name: "OpenVerifiableLLM",
    description: "Fully open, open-weight, open-data LLMs whose training can be independently verified and that run locally.",
    topics: ["Artificial Intelligence"],
    themes: ["Infrastructure"],
    repositories: [{ fullName: "AOSSIE-Org/OpenVerifiableLLM", language: "Python" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },
  {
    slug: "identity-tokens",
    name: "Decentralized Identity Tokens",
    description: "Self-issued, NFT-based identity tokens that anyone can attest to, building an on-chain web of trust.",
    about:
      "Think of it as a passport you issue to yourself, with no government, institution or middleman required. Identity tokens can carry optional metadata, and other token holders can vouch for them on-chain.",
    logo: "/brand/project_svgs/dit_logo.svg",
    topics: ["Blockchain"],
    themes: ["Infrastructure"],
    repositories: [
      { fullName: "StabilityNexus/IdentityTokens-EVM-Contracts", language: "Solidity" },
      { fullName: "StabilityNexus/IdentityTokens-EVM-Frontend", language: "TypeScript" },
    ],
    discordUrl: stabilityChannel("1461697098767532269"),
    websiteUrl: "http://dit.stability.nexus/",
  },
  {
    slug: "tnt",
    name: "TNT",
    description: "Trust Network Tokens: a non-transferable ERC-721 framework for issuing and revoking verifiable trust credentials.",
    about:
      "Organisations deploy their own TNT contract through a factory, issue tokens to users, optionally revoke them, and keep a chain-verifiable registry of trust relationships.",
    logo: "/brand/project_svgs/tnt_logo.svg",
    topics: ["Blockchain"],
    themes: ["Infrastructure"],
    repositories: [{ fullName: "StabilityNexus/TNT", language: "TypeScript" }],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },
  {
    slug: "agora-blockchain",
    name: "Agora Blockchain",
    description: "Tamper-proof elections that bring Agora's voting algorithms on-chain.",
    about:
      "Agora Blockchain takes vote-counting algorithms such as Borda, IRV and Oklahoma onto smart contracts so that ballots cannot be altered by admins, attackers or anyone with database access.",
    topics: ["Blockchain"],
    themes: ["Infrastructure"],
    repositories: [{ fullName: "AOSSIE-Org/Agora-Blockchain", language: "JavaScript" }],
    discordUrl: aossieChannel("1331983948175380581"),
  },
  {
    slug: "agora",
    name: "Agora",
    description: "A library of algorithms for counting votes in elections, with web, mobile and Slack front-ends.",
    about:
      "Agora implements dozens of vote-counting methods in Scala, from Approval, Borda and Condorcet variants to the STV system used in the Australian Capital Territory, alongside a REST API, web frontend, Android and iOS apps, and a Slack integration (Slagora).",
    topics: ["Mobile"],
    themes: ["Infrastructure"],
    repositories: [
      { fullName: "AOSSIE-Org/Agora", language: "Scala" },
      { fullName: "AOSSIE-Org/Agora-Web" },
      { fullName: "AOSSIE-Org/Agora-web-frontend" },
      { fullName: "AOSSIE-Org/Agora-Android", language: "Java" },
      { fullName: "AOSSIE-Org/Agora-iOS", language: "Swift" },
      { fullName: "AOSSIE-Org/Slagora", language: "Scala" },
    ],
    discordUrl: AOSSIE_DISCORD_INVITE,
    archived: true,
  },
  {
    slug: "orgexplorer",
    name: "OrgExplorer",
    description: "An intuitive, browser-only dashboard for exploring large GitHub organisations.",
    about:
      "OrgExplorer maps repository relationships, contributor networks, activity trends and technology distribution, and flags bus-factor risks, running entirely in the browser on GitHub's REST API with no backend.",
    logo: "/brand/project_logos/orgexplorer_logo.png",
    topics: [],
    themes: ["Infrastructure"],
    repositories: [{ fullName: "AOSSIE-Org/OrgExplorer", language: "JavaScript" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
    websiteUrl: "https://orgexplorer.aossie.org/",
  },
  {
    slug: "gitcord",
    name: "Gitcord",
    description: "Local-first Discord ↔ GitHub automation that plans role changes and issue assignments deterministically.",
    about:
      "Gitcord reads GitHub activity and Discord state, then produces reviewable plans for role updates and GitHub assignments. Dry-run and observer modes generate audit reports without changing anything, and a Discord bot provides slash commands for identity linking.",
    logo: "/brand/project_logos/gitcord_logo.png",
    topics: [],
    themes: ["Infrastructure", "Communication"],
    repositories: [{ fullName: "AOSSIE-Org/Gitcord-GithubDiscordBot", language: "Python" }],
    discordUrl: aossieChannel("1465995983791063140"),
  },
  {
    slug: "devr-ai",
    name: "Devr.AI",
    description: "An AI-powered Developer Relations assistant for open-source communities on Discord and GitHub.",
    about:
      "Built on a LangGraph agent architecture, Devr.AI supports contributors, streamlines onboarding and delivers real-time project updates, reducing maintainer workload while improving the contributor experience.",
    logo: "/brand/project_logos/devr_ai_logo.png",
    topics: ["Artificial Intelligence"],
    themes: ["Infrastructure", "Communication"],
    repositories: [{ fullName: "AOSSIE-Org/Devr.AI", language: "Python" }],
    discordUrl: aossieChannel("1345044976794472498"),
    websiteUrl: "https://devr-ai.netlify.app/",
  },
  {
    slug: "skills",
    name: "AOSSIE Skills",
    description: "Local-first AI governance for large organisations: shared agent skills, a Discord Q&A bot and a PR merge-analysis dashboard.",
    about:
      "The Skills ecosystem keeps AI-assisted contributions grounded in each repository's context. It centralises org-wide agent skills and rules, runs SkillBot to answer contributor questions in Discord using repository-specific skills, and provides a dashboard that clusters pull requests semantically to plan merge order and surface conflicts.",
    logo: "/brand/project_logos/skills_logo.png",
    topics: ["Artificial Intelligence"],
    themes: ["Infrastructure"],
    repositories: [
      { fullName: "AOSSIE-Org/Skills", language: "JavaScript" },
      { fullName: "AOSSIE-Org/SkillBot", language: "Python" },
      { fullName: "AOSSIE-Org/PullRequestDashboard", language: "Python" },
    ],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },
  {
    slug: "ell-ena",
    name: "Ell-ena",
    description: "An AI product manager that handles tasks, tickets and meeting notes through a simple chat interface.",
    about:
      "Ell-ena creates tickets, captures meeting transcriptions and keeps the full context of your projects, so teams can manage work by simply talking to it.",
    logo: "/brand/project_svgs/ellena_logo.svg",
    topics: ["Artificial Intelligence", "Mobile"],
    themes: ["Infrastructure"],
    repositories: [{ fullName: "AOSSIE-Org/Ell-ena", language: "Dart" }],
    discordUrl: aossieChannel("1349032611267477586"),
  },
  {
    slug: "codingagent",
    name: "CodingAgent",
    description: "An open-source, model-agnostic CLI coding agent with persistent memory, Git and MCP integration.",
    about:
      "CodingAgent works with any LLM, cloud or local, switched with a single config line. It keeps short-term, long-term and per-project memory across sessions and stays lightweight enough for real engineering workflows.",
    topics: ["Artificial Intelligence"],
    themes: ["Infrastructure"],
    repositories: [{ fullName: "AOSSIE-Org/CodingAgent" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },
  {
    slug: "websift",
    name: "WebSift",
    description: "Converts web pages into formats ready to be consumed by language models.",
    topics: ["Artificial Intelligence"],
    themes: ["Infrastructure"],
    repositories: [{ fullName: "AOSSIE-Org/WebSift" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },
  {
    slug: "bringyourownkey",
    name: "BringYourOwnKey",
    description: "A framework-agnostic library that lets users supply their own LLM API keys to your app, with no proxy required.",
    about:
      "A browser-side widget collects and stores the key locally, and a one-function backend helper reads it from request headers, so your existing frontend and backend architecture stays exactly as it is.",
    topics: ["Artificial Intelligence"],
    themes: ["Infrastructure"],
    repositories: [{ fullName: "AOSSIE-Org/BringYourOwnKey", language: "TypeScript" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },
  {
    slug: "autoinitialissues",
    name: "AutoInitialIssues",
    description: "A GitHub Action that seeds new repositories with well-defined starter issues, from preset banks or AI generation.",
    topics: ["Artificial Intelligence"],
    themes: ["Infrastructure"],
    repositories: [{ fullName: "AOSSIE-Org/AutoInitialIssues", language: "JavaScript" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },
  {
    slug: "idb-backup",
    name: "IndexedDB Import/Export",
    description: "A lightweight TypeScript library to back up and restore IndexedDB databases as type-preserving JSON.",
    topics: [],
    themes: ["Infrastructure"],
    repositories: [{ fullName: "AOSSIE-Org/IndexedDB-Import-Export", language: "TypeScript" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
    websiteUrl: "https://www.npmjs.com/package/@aossie-org/idb-backup",
  },

  // ---------------------------------------------------------------- Stability Nexus
  {
    slug: "bene",
    name: "Bene",
    description: "A trustless fundraising protocol: projects only access funds if they reach their goal, and funders receive Proof-of-Funding tokens.",
    about:
      "Project owners create a funding vault with an exchange rate, a minimum funding goal and a deadline. Funders receive proof-of-funding tokens; if the goal is not met in time, they can get their money back. Bene runs on EVM chains and on Ergo, with a fully client-side interface.",
    logo: "/brand/project_logos/bene_logo.png",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [
      { fullName: "StabilityNexus/Bene-FundRaising-EVM-Contracts" },
      { fullName: "StabilityNexus/Bene-FundRaising-EVM-Frontend" },
      { fullName: "StabilityNexus/BenefactionPlatform-Ergo" },
      { fullName: "StabilityNexus/Bene-LandingPage" },
    ],
    discordUrl: stabilityChannel("1311251432359591967"),
    websiteUrl: "https://bene-evm.stability.nexus/",
  },
  {
    slug: "orb-oracle",
    name: "Orb Oracle",
    description: "Decentralised oracles: browse data feeds, submit values, and deploy base or composed oracles on-chain.",
    about:
      "Orb Oracle lets anyone launch governance-backed base oracles or compose new ones from existing feeds, with time-weighted price intervals tracked on-chain. The Poster service automates value submissions from sources such as Chainlink, Pyth or REST APIs, and the protocol has been formalised in the Rocq prover.",
    logo: "/brand/project_logos/orb_oracle_logo.png",
    topics: ["Blockchain"],
    themes: ["Infrastructure"],
    repositories: [
      { fullName: "StabilityNexus/OrbOracle-EVM-Frontend", language: "TypeScript" },
      { fullName: "StabilityNexus/OrbOracle-Poster", language: "TypeScript" },
      { fullName: "StabilityNexus/OrbOracle-Formalization" },
      { fullName: "StabilityNexus/OrbOracle-Solana" },
    ],
    discordUrl: stabilityChannel("1504406274693922837"),
  },
  {
    slug: "windmill",
    name: "Windmill Exchange",
    description: "An auction-based on-chain exchange where orders are matched by keeper bots along dynamic pricing curves.",
    about:
      "Instead of a central limit order book, Windmill stores buy and sell orders on-chain and lets autonomous keepers match them as Dutch-auction price curves evolve. Keepers earn matching rewards and all settlements happen atomically on-chain.",
    logo: "/brand/project_logos/windmill_logo.png",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [
      { fullName: "StabilityNexus/Windmill-EVM-Contracts" },
      { fullName: "StabilityNexus/Windmill-EVM-WebUI" },
      { fullName: "StabilityNexus/Windmill-EVM-Keeper" },
    ],
    discordUrl: stabilityChannel("1458849723296256050"),
  },
  {
    slug: "maelstrom",
    name: "Maelstrom",
    description: "A decentralised liquidity protocol for ERC-20 tokens with customisable buy and sell pricing curves.",
    logo: "/brand/project_logos/maelstrom_logo.png",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [
      { fullName: "StabilityNexus/Maelstrom-WebUI" },
      { fullName: "StabilityNexus/Maelstrom-Solidity" },
    ],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },
  {
    slug: "hammer-auction-house",
    name: "Hammer Auction House",
    description: "A decentralised auction platform supporting English, Dutch, all-pay and Vickrey auctions for NFTs and tokens.",
    logo: "/brand/project_logos/hammer_logo.png",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [
      { fullName: "StabilityNexus/HammerAuctionHouse-WebUI" },
      { fullName: "StabilityNexus/HammerAuctionHouse-Solidity" },
    ],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },
  {
    slug: "hodlcoin",
    name: "hodlCoin",
    description: "Self-stabilising staking vaults whose price is mathematically proven to always increase.",
    about:
      "Anyone can create a hodlCoin staking vault for an ERC-20 token. Unstaking fees reward vault creators and long-term stakers, and there are implementations for EVM chains and Ergo.",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [{ fullName: "StabilityNexus/hodlCoin-Solidity-WebUI" }],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },
  {
    slug: "karma",
    name: "Karma",
    description: "Decentralised prediction pools with internal oracles.",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [
      { fullName: "StabilityNexus/Karma-EVM-Contracts" },
      { fullName: "StabilityNexus/Karma-EVM-Frontend" },
    ],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },
  {
    slug: "fairfund",
    name: "FairFund",
    description: "Community-driven funding: deploy vaults, deposit funds, vote on proposals and distribute funds transparently.",
    logo: "/brand/project_logos/fairfund_logo.png",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [{ fullName: "StabilityNexus/FairFund" }],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },
  {
    slug: "bountiful",
    name: "Bountiful",
    description: "Fund development through open competition: bounty rewards are released only when a problem is verifiably solved.",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [{ fullName: "StabilityNexus/Bountiful-BountyPlatform-Ergo" }],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },
  {
    slug: "raindrop",
    name: "RainDrop",
    description: "A decentralised token distribution platform for airdrops and token claims.",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [
      { fullName: "StabilityNexus/RainDrop-Frontend" },
      { fullName: "StabilityNexus/RainDrop-Solidity" },
    ],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },
  {
    slug: "clowder",
    name: "Clowder",
    description: "Create and manage Contribution Accounting Tokens (CATs) that track value contributions inside decentralised organisations.",
    topics: ["Blockchain"],
    themes: ["Finance"],
    repositories: [{ fullName: "StabilityNexus/Clowder" }],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },
  {
    slug: "xops",
    name: "XOps",
    description: "A CI/CD-native value transfer engine, shipped as a GitHub Action: merged PRs become signed, on-chain payments.",
    about:
      "A repository event such as a merged pull request produces a payment intent; a human signs it, the workflow settles it on-chain and posts a receipt back. It runs in your own CI, needs no project-operated server, and defaults to a safe dry-run mode.",
    logo: "/brand/project_logos/xops_logo.png",
    topics: ["Blockchain"],
    themes: ["Finance", "Infrastructure"],
    repositories: [{ fullName: "StabilityNexus/GitPay" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
  },
  {
    slug: "walletlink",
    name: "WalletLink",
    description: "A free, SaaS-independent way to connect frontends to EVM wallets, and a drop-in replacement for WalletConnect-based stacks.",
    topics: ["Blockchain"],
    themes: ["Infrastructure"],
    repositories: [{ fullName: "StabilityNexus/WalletLink" }],
    discordUrl: stabilityChannel("1525366355682000948"),
  },
  {
    slug: "vouchme",
    name: "VouchMe",
    description: "A blockchain-based testimonial system for building a transparent, verifiable reputation.",
    logo: "/brand/project_logos/vouchme_logo.png",
    topics: ["Blockchain"],
    themes: ["Infrastructure"],
    repositories: [{ fullName: "StabilityNexus/VouchMe" }],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },
  {
    slug: "treee",
    name: "Treee",
    description: "Document tree plantations, mint them as NFTs and explore nearby green initiatives on a map.",
    about:
      "Treee's mobile app and Solidity contracts provide on-chain verification of planted trees, organisation management and NFT issuance, for transparent and auditable sustainability tracking.",
    logo: "/brand/project_logos/treee_logo.png",
    topics: ["Blockchain", "Mobile"],
    themes: ["Sustainability"],
    repositories: [
      { fullName: "StabilityNexus/Treee" },
      { fullName: "StabilityNexus/Treee-Solidity" },
    ],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },
  {
    slug: "plaza",
    name: "Plaza",
    description: "A map-first, on-chain coordination hub for creating and contributing to location-anchored impact projects.",
    logo: "/brand/project_logos/plaza_logo.png",
    topics: ["Blockchain"],
    themes: ["Sustainability"],
    repositories: [{ fullName: "StabilityNexus/Plaza" }],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },
  {
    slug: "stable-viewpoints",
    name: "Stable Viewpoints",
    description: "An independent publication with well-researched articles on how technology can bring stability to the world.",
    topics: [],
    themes: ["Education", "Communication"],
    repositories: [{ fullName: "StabilityNexus/StableViewpoints" }],
    discordUrl: STABILITY_NEXUS_DISCORD_INVITE,
  },

  // ---------------------------------------------------------------- Research (archived)
  {
    slug: "scavenger",
    name: "Scavenger",
    description: "An automated theorem prover for first-order logic based on the conflict resolution calculus.",
    topics: ["Artificial Intelligence"],
    themes: [],
    repositories: [{ fullName: "AOSSIE-Org/Scavenger" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
    archived: true,
  },
  {
    slug: "skeptik",
    name: "Skeptik",
    description: "Algorithms for compressing formal proofs produced by SAT/SMT solvers and automated theorem provers.",
    topics: [],
    themes: [],
    repositories: [{ fullName: "AOSSIE-Org/Skeptik" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
    archived: true,
  },
  {
    slug: "sensala",
    name: "Sensala",
    description: "A dynamic semantics framework for natural language processing.",
    topics: ["Artificial Intelligence"],
    themes: [],
    repositories: [{ fullName: "AOSSIE-Org/Sensala", language: "Scala" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
    archived: true,
  },
  {
    slug: "computational-philosophy",
    name: "Computational Philosophy",
    description: "Computer-assisted formalisations of ontological proofs in Coq, Isabelle and automated theorem provers.",
    topics: [],
    themes: [],
    repositories: [{ fullName: "AOSSIE-Org/ComputationalPhilosophy" }],
    discordUrl: AOSSIE_DISCORD_INVITE,
    archived: true,
  },
];

export function githubUrl(repo: Repository): string {
  return `https://github.com/${repo.fullName}`;
}

/** The GitHub organization that hosts a project's primary repository. */
export function getOrganization(project: Project): Organization {
  return OWNER_TO_ORGANIZATION[project.repositories[0].fullName.split("/")[0]] ?? "AOSSIE";
}

/** True when `discordUrl` points to the project's own channel rather than a server invite. */
export function hasOwnDiscordChannel(project: Project): boolean {
  return project.discordUrl.includes("/channels/");
}

export function getRepoStars(repo: Repository): number {
  return REPO_STATS[repo.fullName]?.stars ?? 0;
}

/** Total GitHub stars across all of a project's repositories. */
export function getProjectStars(project: Project): number {
  return project.repositories.reduce((sum, repo) => sum + getRepoStars(repo), 0);
}

/** Most recent push (YYYY-MM-DD) to any of a project's repositories. */
export function getLastActivity(project: Project): string {
  return project.repositories.reduce((latest, repo) => {
    const pushed = REPO_STATS[repo.fullName]?.pushedAt ?? "";
    return pushed > latest ? pushed : latest;
  }, "");
}

export function getAllProjects(): Project[] {
  return PROJECTS_DATA;
}
