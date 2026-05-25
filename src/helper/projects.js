import DefaultLogo from '@/images/default.png'
import AgoraLogo from '@/images/Agora.png'
import Djed from '@/images/Djed.svg'
import SSSLogo from '@/images/SSS.png'
import ResonateLogo from '@/images/Resonate.png'
import PictoPy from '@/images/Pictopy.png'
import MonumentoLogo from '@/images/monumento.png'
import CarbonLogo from '@/images/Carbon.png'
import ScholarLogo from '@/images/scholar.png'
import StabilityNexusLogo from '@/images/StabilityNexus.png'
import DjedAllianceLogo from '@/images/DjedAlliance.png'
import DevrAILogo from '@/images/DevrAILogo.png'
import EllenaLogo from '@/images/EllenaLogo.svg'
import LibrEdLogo from '@/images/LibrEdLogo.png'
import MindTheWordLogo from '@/images/MindTheWordLogo.png'
import NeuroTrackLogo from '@/images/NeuroTrackLogo.svg'
import OpenChatLogo from '@/images/OpenChatLogo.svg'
import OrgExplorerLogo from '@/images/OrgExplorerLogo.svg'
import ReinLogo from '@/images/ReinLogo.svg'
import SkeptikLogo from '@/images/SkeptikLogo.png'
import StarcrossLogo from '@/images/StarcrossLogo.png'

const projects = [
  {
    slug: 'pictopy',
    name: 'PictoPy',
    description: 'PictoPy is a modern desktop app designed to transform the handling of digital photos. It facilitates efficient gallery management with a robust focus on privacy.',
    link: { href: 'https://github.com/AOSSIE-Org/PictoPy', label: 'PictoPy' },
    logo: PictoPy,
    status: 'production',
    category: 'Ready to download',
    downloadLink: 'https://github.com/AOSSIE-Org/PictoPy/releases',
    githubLink: 'https://github.com/AOSSIE-Org/PictoPy',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'agora-vote-android',
    name: 'Agora Vote Android',
    description: 'This application uses Agora Web API as backend application. It allows for elections to be held by using multiple algorithms.',
    link: {
      href: 'https://gitlab.com/aossie/agora-android',
      label: 'Agora-Android',
    },
    logo: AgoraLogo,
    status: 'production',
    category: 'Ready to download',
    downloadLink: 'https://gitlab.com/aossie/agora-android/-/releases',
    githubLink: 'https://gitlab.com/aossie/agora-android',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'djed',
    name: 'Djed',
    description: 'Djed is a Formally Verified Crypto-Backed Algorithmic Stablecoin Protocol.',
    link: { href: 'https://github.com/AOSSIE-Org/Djed-Solidity-WebDashboard', label: 'Djed' },
    logo: Djed,
    status: 'ongoing',
    category: 'Production ready',
    downloadLink: 'https://github.com/AOSSIE-Org/Djed-Solidity-WebDashboard',
    githubLink: 'https://github.com/AOSSIE-Org/Djed-Solidity-WebDashboard',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'devr-ai',
    name: 'Devr.AI',
    description:
      'An open-source AI-powered platform designed to automate and enhance developer relations. It leverages Generative AI and agentic workflows to streamline community engagement and outreach.',
    link: { href: 'https://github.com/AOSSIE-Org/Devr.AI', label: 'Devr.AI' },
    logo: DevrAILogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/Devr.AI',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'rein',
    name: 'Rein',
    description:
      'A cross-platform LAN-based remote input controller that allows users to control devices over a local network seamlessly.',
    link: { href: 'https://github.com/AOSSIE-Org/Rein', label: 'Rein' },
    logo: ReinLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/Rein',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'open-verifiable-llm',
    name: 'OpenVerifiableLLM',
    description:
      'Local Fully Open, Open-Weight, Open-Data, Verifiable LLMs. A project focused on building transparent and trustworthy large language models.',
    link: { href: 'https://github.com/AOSSIE-Org/OpenVerifiableLLM', label: 'OpenVerifiableLLM' },
    logo: DefaultLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/OpenVerifiableLLM',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'libred',
    name: 'LibrEd',
    description:
      'A self-learning assistant that helps users learn and study more effectively using AI-powered tools and personalized learning paths.',
    link: { href: 'https://github.com/AOSSIE-Org/LibrEd', label: 'LibrEd' },
    logo: LibrEdLogo,
    status: 'production',
    category: 'Ready to download',
    downloadLink: 'https://github.com/AOSSIE-Org/LibrEd/releases',
    githubLink: 'https://github.com/AOSSIE-Org/LibrEd',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'websift',
    name: 'WebSift',
    description:
      'A tool to convert webpages to MML-ready formats, enabling seamless extraction and transformation of web content for machine learning pipelines.',
    link: { href: 'https://github.com/AOSSIE-Org/WebSift', label: 'WebSift' },
    logo: DefaultLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/WebSift',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'inpact-ai',
    name: 'InPactAI',
    description:
      'An open-source AI-powered platform designed to connect content creators, brands, and agencies through data-driven insights leveraging Generative AI.',
    link: { href: 'https://github.com/AOSSIE-Org/InPactAI', label: 'InPactAI' },
    logo: DefaultLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/InPactAI',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'babynest',
    name: 'BabyNest',
    description:
      'A comprehensive baby care and tracking application that helps parents monitor and manage their baby\'s daily activities, milestones, and health.',
    link: { href: 'https://github.com/AOSSIE-Org/BabyNest', label: 'BabyNest' },
    logo: DefaultLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/BabyNest',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'smartnotes',
    name: 'SmartNotes',
    description:
      'An intelligent note-taking application that leverages AI to help users organize, search, and manage their notes more effectively.',
    link: { href: 'https://github.com/AOSSIE-Org/SmartNotes', label: 'SmartNotes' },
    logo: DefaultLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/SmartNotes',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'orgexplorer',
    name: 'OrgExplorer',
    description:
      'An intuitive dashboard to explore large GitHub organizations, providing insights into repositories, contributors, and activity metrics.',
    link: { href: 'https://github.com/AOSSIE-Org/OrgExplorer', label: 'OrgExplorer' },
    logo: OrgExplorerLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/OrgExplorer',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'ell-ena',
    name: 'Ell-ena',
    description:
      'A smart AI product manager that streamlines task, project, and meeting management through a simple chat interface.',
    link: { href: 'https://github.com/AOSSIE-Org/Ell-ena', label: 'Ell-ena' },
    logo: EllenaLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/Ell-ena',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'zplit',
    name: 'Zplit',
    description:
      'A payment splitting app that makes it easy to divide expenses among groups, track balances, and settle debts.',
    link: { href: 'https://github.com/AOSSIE-Org/Zplit', label: 'Zplit' },
    logo: DefaultLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/Zplit',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'docpilot',
    name: 'DocPilot',
    description:
      'A new age EMR (Electronic Medical Records) application using conversational AI at its best, streamlining healthcare documentation.',
    link: { href: 'https://github.com/AOSSIE-Org/DocPilot', label: 'DocPilot' },
    logo: DefaultLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/DocPilot',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'perspective',
    name: 'Perspective',
    description:
      'A tool for analyzing and understanding different perspectives on topics, enabling balanced and informed viewpoints.',
    link: { href: 'https://github.com/AOSSIE-Org/Perspective', label: 'Perspective' },
    logo: DefaultLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/Perspective',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'neurotrack',
    name: 'NeuroTrack',
    description:
      'A neuroscience-focused tracking application for monitoring and analyzing neural activity and cognitive performance.',
    link: { href: 'https://github.com/AOSSIE-Org/NeuroTrack', label: 'NeuroTrack' },
    logo: NeuroTrackLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/NeuroTrack',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'codingagent',
    name: 'CodingAgent',
    description:
      'An AI-powered coding agent that assists developers with code generation, debugging, and software development tasks.',
    link: { href: 'https://github.com/AOSSIE-Org/CodingAgent', label: 'CodingAgent' },
    logo: DefaultLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/CodingAgent',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'starcross',
    name: 'Starcross',
    description:
      'An astronomy application that helps users explore and identify celestial objects, constellations, and astronomical events.',
    link: { href: 'https://github.com/AOSSIE-Org/starcross', label: 'Starcross' },
    logo: StarcrossLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/starcross',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'carbon-footprint',
    name: 'CarbonFootprint',
    description:
      'A browser extension that helps users track and reduce their carbon footprint by displaying CO2 emissions for various activities.',
    link: { href: 'https://github.com/AOSSIE-Org/CarbonFootprint', label: 'CarbonFootprint' },
    logo: CarbonLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/CarbonFootprint',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'mind-the-word',
    name: 'MindTheWord',
    description:
      'A browser extension for language learning that randomly translates words on webpages to help users learn new languages while browsing.',
    link: { href: 'https://github.com/AOSSIE-Org/MindTheWord', label: 'MindTheWord' },
    logo: MindTheWordLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/MindTheWord',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'aossie-scholar',
    name: 'Aossie Scholar',
    description:
      'An academic search and research tool that helps scholars discover, organize, and analyze academic papers and publications.',
    link: { href: 'https://github.com/AOSSIE-Org/Aossie-Scholar', label: 'Aossie-Scholar' },
    logo: ScholarLogo,
    status: 'ongoing',
    category: 'Production ready',
    githubLink: 'https://github.com/AOSSIE-Org/Aossie-Scholar',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    
  slug: 'agora-blockchain',
  name: 'Agora Blockchain',
    description:
      'There isn’t just one voting algorithm, there’s hundreds. Therefore, we developed Agora to allow for democratic elections using any algorithm.',
    link: {
      href: 'https://github.com/AOSSIE-Org/Agora-Blockchain',
      label: 'Agora',
    },
    logo: AgoraLogo,
    status: 'ongoing',
    category: 'Ongoing'
  },
  {
  slug: 'eduaid',
  name: 'EduAid',
    description:
      'An online tool that can generate short quizzes on input educational content can be of great use to teachers and students alike as it can help retain important information, frame questions and quickly revise large chunks of content.',
    link: { href: 'https://github.com/AOSSIE-Org/EduAid', label: 'EduAid' },
    logo: DefaultLogo,
    status: 'ongoing',
    category: 'Ongoing'
  },
  {
  slug: 'openchat',
  name: 'OpenChat',
    description:
      'a decentralised platform for secure and private messaging and file sharing built on top of blockchain',
    link: { href: '/projects/openchat', label: 'OpenChat' },
    logo: OpenChatLogo,
    status: 'ongoing',
    category: 'Ongoing'
  },
  
    {
  slug: 'resonate',
  name: 'Resonate',
    description:
      'With the rising popularity of social voice platforms such as Clubhouse, it is high time for an Open Source alternative. A platform like this would not only enhance credibility within the open-source community but also attract more users and foster growth.  ',
    link: { href: 'https://github.com/AOSSIE-Org/Resonate', label: 'Resonate' },
    logo: ResonateLogo,
    status: 'ongoing',
    category: 'Ongoing'
  },
  {
  slug: 'monumento',
  name: 'Monumento',
    description:
      'Monumento is an AR-integrated social app that transforms how you connect with the world’s most iconic landmarks. Through Monumento, you can check in to popular monuments, explore famous sites, and discover new people, all within a social platform.',
    link: { href: 'https://github.com/AOSSIE-Org/Monumento', label: 'Monumento' },
    logo: MonumentoLogo,
    status: 'ongoing',
    category: 'Ongoing'
  },
  
    {
  slug: 'social-street-smart',
  name: 'Social Street Smart',
    description:
      'With the adevent of Internet, the problems faced by the people have also grown. These include abusive languages.',
    link: {
      href: 'https://github.com/AOSSIE-Org/Social-Street-Smart',
      label: 'Social-Street-Smart',
    },
    logo: SSSLogo,
    status: 'ongoing',
    category: 'Ongoing'
  },

  // ── Additional AOSSIE-Org projects ──────────────────────────────────────
  {
    slug: 'agora-web',
    name: 'Agora Web',
    description:
      'The Agora Web application provides a web interface for running elections using a variety of voting algorithms, built on top of the Agora API.',
    link: { href: 'https://github.com/AOSSIE-Org/Agora-Web', label: 'Agora-Web' },
    logo: AgoraLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/AOSSIE-Org/Agora-Web',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'agora-ios',
    name: 'Agora iOS',
    description:
      'An iOS application for conducting elections using multiple voting algorithms, powered by the Agora Web API backend.',
    link: { href: 'https://github.com/AOSSIE-Org/Agora-iOS', label: 'Agora-iOS' },
    logo: AgoraLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/AOSSIE-Org/Agora-iOS',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'openchat-flutter',
    name: 'OpenPeerChat (Flutter)',
    description:
      'A decentralised peer-to-peer chat application built with Flutter, enabling secure and private messaging without a central server.',
    link: { href: 'https://github.com/AOSSIE-Org/OpenPeerChat-flutter', label: 'OpenPeerChat-flutter' },
    logo: OpenChatLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/AOSSIE-Org/OpenPeerChat-flutter',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'openchat-react-native',
    name: 'OpenPeerChat (React Native)',
    description:
      'A React Native implementation of the decentralised peer-to-peer OpenPeerChat platform for secure and private messaging.',
    link: { href: 'https://github.com/AOSSIE-Org/OpenPeerChat-react-native', label: 'OpenPeerChat-react-native' },
    logo: OpenChatLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/AOSSIE-Org/OpenPeerChat-react-native',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'skeptik',
    name: 'Skeptik',
    description:
      'A library and tool for proof compression. Given a proof of a theorem, Skeptik attempts to find a smaller proof of the same theorem.',
    link: { href: 'https://github.com/AOSSIE-Org/Skeptik', label: 'Skeptik' },
    logo: SkeptikLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/AOSSIE-Org/Skeptik',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'sensala',
    name: 'Sensala',
    description:
      'A dynamic semantics computational linguistics system that interprets natural language sentences using formal semantic techniques.',
    link: { href: 'https://github.com/AOSSIE-Org/Sensala', label: 'Sensala' },
    logo: DefaultLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/AOSSIE-Org/Sensala',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'carbon-footprint-api',
    name: 'CarbonFootprint API',
    description:
      'The backend API powering the CarbonFootprint project, providing carbon emission data and calculations for various activities and services.',
    link: { href: 'https://github.com/AOSSIE-Org/CarbonFootprint-API', label: 'CarbonFootprint-API' },
    logo: CarbonLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/AOSSIE-Org/CarbonFootprint-API',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'carbon-footprint-mobile',
    name: 'CarbonFootprint Mobile',
    description:
      'A mobile application that helps users track and reduce their carbon footprint by monitoring CO2 emissions from everyday activities.',
    link: { href: 'https://github.com/AOSSIE-Org/CarbonFootprint-Mobile', label: 'CarbonFootprint-Mobile' },
    logo: CarbonLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/AOSSIE-Org/CarbonFootprint-Mobile',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'crowdalert-web',
    name: 'CrowdAlert Web',
    description:
      'A crowdsourced incident reporting web platform that allows users to report and view real-time incidents happening around them.',
    link: { href: 'https://github.com/AOSSIE-Org/CrowdAlert-Web', label: 'CrowdAlert-Web' },
    logo: DefaultLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/AOSSIE-Org/CrowdAlert-Web',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'debateai',
    name: 'DebateAI',
    description:
      'An AI-powered debate platform that helps users practice and improve their debate skills through structured argumentation and feedback.',
    link: { href: 'https://github.com/AOSSIE-Org/DebateAI', label: 'DebateAI' },
    logo: DefaultLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/AOSSIE-Org/DebateAI',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },

  // ── StabilityNexus projects ──────────────────────────────────────────────
  {
    slug: 'hodlcoin-solidity',
    name: 'hodlCoin (Solidity)',
    description:
      'A decentralised staking platform on EVM chains where users stake tokens to mint hodlTokens. The exchange rate rises as more tokens are staked.',
    link: { href: 'https://github.com/StabilityNexus/hodlCoin-Solidity-WebUI', label: 'hodlCoin-Solidity-WebUI' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/hodlCoin-Solidity-WebUI',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'fairfund',
    name: 'FairFund',
    description:
      'A decentralised funding platform built on Solidity that enables transparent, community-governed allocation of funds to projects and contributors.',
    link: { href: 'https://github.com/StabilityNexus/FairFund', label: 'FairFund' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/FairFund',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'gluon-ergo-sdk',
    name: 'Gluon Ergo SDK',
    description:
      'A TypeScript SDK for interacting with the Gluon protocol on the Ergo blockchain, enabling developers to build applications using Gluon\'s gold-backed stablecoin system.',
    link: { href: 'https://github.com/StabilityNexus/Gluon-Ergo-SDK', label: 'Gluon-Ergo-SDK' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/Gluon-Ergo-SDK',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'gluon-solidity',
    name: 'Gluon (Solidity)',
    description:
      'A Solidity-based implementation of the Gluon protocol providing a gold-backed stablecoin system on EVM-compatible blockchains.',
    link: { href: 'https://github.com/StabilityNexus/Gluon-Solidity-WebUI', label: 'Gluon-Solidity-WebUI' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/Gluon-Solidity-WebUI',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'gluon-ergo-ui',
    name: 'Gluon Ergo UI',
    description:
      'The web user interface for the Gluon protocol deployed on the Ergo blockchain, providing access to gold-backed stablecoin operations.',
    link: { href: 'https://github.com/StabilityNexus/Gluon-Ergo-UI', label: 'Gluon-Ergo-UI' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/Gluon-Ergo-UI',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'benefaction-platform-ergo',
    name: 'Benefaction Platform (Ergo)',
    description:
      'A decentralised fundraising and benefaction platform built on the Ergo blockchain, enabling transparent community-driven funding campaigns.',
    link: { href: 'https://github.com/StabilityNexus/BenefactionPlatform-Ergo', label: 'BenefactionPlatform-Ergo' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/BenefactionPlatform-Ergo',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'bene-fundraising-evm',
    name: 'Bene FundRaising (EVM)',
    description:
      'An EVM-based decentralised fundraising platform allowing projects to raise funds transparently through smart contracts.',
    link: { href: 'https://github.com/StabilityNexus/Bene-FundRaising-EVM-Frontend', label: 'Bene-FundRaising-EVM' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/Bene-FundRaising-EVM-Frontend',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'clowder',
    name: 'Clowder',
    description:
      'A decentralised platform for organising and managing open-source contributor communities, built on StabilityNexus infrastructure.',
    link: { href: 'https://github.com/StabilityNexus/Clowder', label: 'Clowder' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/Clowder',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'treee',
    name: 'Treee',
    description:
      'A blockchain-based platform for planting and tracking trees, enabling transparent environmental impact verification and carbon credit generation.',
    link: { href: 'https://github.com/StabilityNexus/Treee', label: 'Treee' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/Treee',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'hammer-auction-house',
    name: 'Hammer Auction House',
    description:
      'A decentralised on-chain auction house built with Solidity, enabling transparent and trustless bidding for digital and tokenised assets.',
    link: { href: 'https://github.com/StabilityNexus/HammerAuctionHouse-WebUI', label: 'HammerAuctionHouse-WebUI' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/HammerAuctionHouse-WebUI',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'raindrop',
    name: 'RainDrop',
    description:
      'A decentralised token distribution and airdrop platform built on Solidity, enabling fair and transparent token drops to community members.',
    link: { href: 'https://github.com/StabilityNexus/RainDrop-Frontend', label: 'RainDrop-Frontend' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/RainDrop-Frontend',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'fate-evm',
    name: 'Fate (EVM)',
    description:
      'A prediction market and fate-based gaming platform on EVM chains, enabling decentralised wagering and outcome resolution via smart contracts.',
    link: { href: 'https://github.com/StabilityNexus/Fate-EVM-Frontend', label: 'Fate-EVM-Frontend' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/Fate-EVM-Frontend',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'hackhub',
    name: 'HackHub',
    description:
      'A decentralised hackathon hosting and management platform built on Solidity, providing on-chain prize distribution and project submission tracking.',
    link: { href: 'https://github.com/StabilityNexus/HackHub-WebUI', label: 'HackHub-WebUI' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/HackHub-WebUI',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'maelstrom',
    name: 'Maelstrom',
    description:
      'A decentralised vortex-style liquidity and swapping protocol built on Solidity, offering novel AMM mechanics for DeFi participants.',
    link: { href: 'https://github.com/StabilityNexus/Maelstrom-WebUI', label: 'Maelstrom-WebUI' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/Maelstrom-WebUI',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'chainvoice',
    name: 'Chainvoice',
    description:
      'A blockchain-based invoicing and payment platform that enables transparent, immutable invoice management and settlement on-chain.',
    link: { href: 'https://github.com/StabilityNexus/Chainvoice', label: 'Chainvoice' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/Chainvoice',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'plaza',
    name: 'Plaza',
    description:
      'A decentralised marketplace built on blockchain technology, enabling peer-to-peer trading of digital assets and services without intermediaries.',
    link: { href: 'https://github.com/StabilityNexus/Plaza', label: 'Plaza' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/Plaza',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'vouchme',
    name: 'VouchMe',
    description:
      'A decentralised reputation and vouching system that allows community members to vouch for each other on-chain, building trust without central authority.',
    link: { href: 'https://github.com/StabilityNexus/VouchMe', label: 'VouchMe' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/VouchMe',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'destiny-evm',
    name: 'Destiny (EVM)',
    description:
      'A decentralised on-chain destiny and outcome determination protocol on EVM chains, leveraging verifiable randomness for fair result generation.',
    link: { href: 'https://github.com/StabilityNexus/Destiny-EVM', label: 'Destiny-EVM' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/Destiny-EVM',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'tnt',
    name: 'TNT',
    description:
      'A decentralised token and NFT toolkit built on StabilityNexus infrastructure, providing utilities for token creation, management and distribution.',
    link: { href: 'https://github.com/StabilityNexus/TNT', label: 'TNT' },
    logo: StabilityNexusLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/StabilityNexus/TNT',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },

  // ── DjedAlliance projects ────────────────────────────────────────────────
  {
    slug: 'gluon-ergo-webui',
    name: 'Gluon Ergo WebUI',
    description:
      'The web dashboard for the Gluon protocol on Ergo, a gold-backed stablecoin system that lets users mint GAU (gold) and GAUC (counter) tokens.',
    link: { href: 'https://github.com/DjedAlliance/Gluon-Ergo-WebUI', label: 'Gluon-Ergo-WebUI' },
    logo: DjedAllianceLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/DjedAlliance/Gluon-Ergo-WebUI',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'djed-solidity',
    name: 'Djed Solidity',
    description:
      'The Solidity smart contract implementation of the Djed algorithmic stablecoin protocol, deployable on any EVM-compatible blockchain.',
    link: { href: 'https://github.com/DjedAlliance/Djed-Solidity', label: 'Djed-Solidity' },
    logo: Djed,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/DjedAlliance/Djed-Solidity',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'oracle-solidity',
    name: 'Oracle Solidity',
    description:
      'A Solidity-based price oracle system for the DjedAlliance ecosystem, providing reliable on-chain price feeds for stablecoin protocol collateral management.',
    link: { href: 'https://github.com/DjedAlliance/Oracle-Solidity', label: 'Oracle-Solidity' },
    logo: DjedAllianceLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/DjedAlliance/Oracle-Solidity',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'oracle-backend',
    name: 'Oracle Backend',
    description:
      'The backend service for the DjedAlliance oracle system, responsible for fetching, aggregating, and submitting price data on-chain.',
    link: { href: 'https://github.com/DjedAlliance/Oracle-Backend', label: 'Oracle-Backend' },
    logo: DjedAllianceLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/DjedAlliance/Oracle-Backend',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'stablepay',
    name: 'StablePay',
    description:
      'A decentralised payment platform that allows merchants and users to transact using stablecoins, providing price-stable crypto payments.',
    link: { href: 'https://github.com/DjedAlliance/StablePay', label: 'StablePay' },
    logo: DjedAllianceLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/DjedAlliance/StablePay',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
  {
    slug: 'gluon-ergo-backend-contracts',
    name: 'Gluon Ergo Backend Contracts',
    description:
      'The Ergo ErgoScript smart contracts powering the Gluon gold-backed stablecoin protocol backend on the Ergo blockchain.',
    link: { href: 'https://github.com/DjedAlliance/Gluon-Ergo-Backend-Contracts', label: 'Gluon-Ergo-Backend-Contracts' },
    logo: DjedAllianceLogo,
    status: 'ongoing',
    category: 'Ongoing',
    githubLink: 'https://github.com/DjedAlliance/Gluon-Ergo-Backend-Contracts',
    discordLink: 'https://discord.gg/xnmAPS7zqB',
  },
]


export default projects
