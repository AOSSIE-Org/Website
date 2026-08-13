export interface GSoCIdea {
  slug: string;
  title: string;
  year: string;
  category: string;
  description: string;
  techStack: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  mentors: string[];
  githubUrl?: string;
}

export const IDEAS_DATA: GSoCIdea[] = [
  // 2025 Ideas
  {
    slug: 'agora-blockchain',
    title: 'Agora Blockchain',
    year: '2025',
    category: 'Decentralized Governance',
    description: 'Agora Blockchain is a secure, verifiable electronic voting system based on blockchain technology. The goal for 2025 is to implement zero-knowledge vote secrecy, improve consensus scalability, and provide interactive audit tools.',
    techStack: ['Solidity', 'Rust', 'TypeScript', 'Next.js'],
    difficulty: 'Hard',
    mentors: ['Dr. Bruno Woltzenlogel Paleo', 'AOSSIE Mentors Team'],
    githubUrl: 'https://github.com/AOSSIE-Org/Info/blob/main/GSoC-Ideas/2025/AgoraBlockchain.md'
  },
  {
    slug: 'devr-ai',
    title: 'DevR AI',
    year: '2025',
    category: 'AI & Developer Tools',
    description: 'DevR AI is an open-source AI agent ecosystem designed to automate pull request reviews, enforce project coding guidelines, and generate automated test suites for repository maintainers.',
    techStack: ['Python', 'PyTorch', 'LangChain', 'FastAPI'],
    difficulty: 'Medium',
    mentors: ['AOSSIE AI Team'],
    githubUrl: 'https://github.com/AOSSIE-Org/Info/blob/main/GSoC-Ideas/2025/DevrAI.md'
  },
  {
    slug: 'eduaid',
    title: 'EduAid',
    year: '2025',
    category: 'Education & AI',
    description: 'EduAid leverages large language models to assist teachers and students in automatically generating quizzes, flashcards, and summary materials from textbook PDFs and lecture transcripts.',
    techStack: ['React', 'Python', 'HuggingFace', 'Tailwind CSS'],
    difficulty: 'Medium',
    mentors: ['AOSSIE Education Team'],
    githubUrl: 'https://github.com/AOSSIE-Org/Info/blob/main/GSoC-Ideas/2025/EduAid.md'
  },
  {
    slug: 'neurotrack',
    title: 'NeuroTrack',
    year: '2025',
    category: 'Health & ML',
    description: 'NeuroTrack is an open-source machine learning research suite focused on analyzing eye-tracking and motor signals for early detection of neurological fatigue.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'React'],
    difficulty: 'Hard',
    mentors: ['AOSSIE Health Team'],
    githubUrl: 'https://github.com/AOSSIE-Org/Info/blob/main/GSoC-Ideas/2025/NeuroTrack.md'
  },
  {
    slug: 'pictopy',
    title: 'PicToPy 2.0',
    year: '2025',
    category: 'AI & Image Processing',
    description: 'Upgrading PicToPy with modern vector database indexing (ChromaDB) for lightning-fast natural language semantic image search and local facial clustering.',
    techStack: ['Python', 'PyQt5', 'OpenCV', 'ChromaDB'],
    difficulty: 'Medium',
    mentors: ['PicToPy Maintainers'],
    githubUrl: 'https://github.com/AOSSIE-Org/Info/blob/main/GSoC-Ideas/2025/PicToPy.md'
  },
  {
    slug: 'resonate-mobile',
    title: 'Resonate Mobile',
    year: '2025',
    category: 'Mobile & Audio',
    description: 'Building a cross-platform Flutter/React Native mobile client for Resonate, featuring background WebRTC audio playback, low-latency room joining, and local SQLite caching.',
    techStack: ['React Native', 'WebRTC', 'TypeScript', 'Node.js'],
    difficulty: 'Medium',
    mentors: ['Resonate Core Team'],
    githubUrl: 'https://github.com/AOSSIE-Org/Info/blob/main/GSoC-Ideas/2025/Resonate.md'
  },

  // 2024 Ideas
  {
    slug: 'djed-solidity-2024',
    title: 'Djed Solidity Improvements',
    year: '2024',
    category: 'DeFi & Smart Contracts',
    description: 'Refactoring Djed Solidity smart contracts to support gas-optimized reserve calculations, automated liquidations, and multi-collateral asset pools.',
    techStack: ['Solidity', 'Foundry', 'TypeScript'],
    difficulty: 'Hard',
    mentors: ['Stability Nexus Team'],
    githubUrl: 'https://github.com/AOSSIE-Org/Info/blob/main/GSoC-Ideas/2024/Djed.md'
  },
  {
    slug: 'social-street-smart',
    title: 'Social Street Smart',
    year: '2024',
    category: 'AI & Security',
    description: 'A browser extension detecting online misinformation, phishing links, and deceptive social media bots using on-device machine learning classifiers.',
    techStack: ['JavaScript', 'Python', 'WebExtensions API'],
    difficulty: 'Medium',
    mentors: ['AOSSIE Security Team'],
    githubUrl: 'https://github.com/AOSSIE-Org/Info/blob/main/GSoC-Ideas/2024/SocialStreetSmart.md'
  },
  {
    slug: 'carbon-tracker-maps',
    title: 'Carbon Tracker Extension',
    year: '2024',
    category: 'Sustainability',
    description: 'Integrating real-time transit emission factors into Google Maps and OpenStreetMap via browser extension overlays.',
    techStack: ['JavaScript', 'Chart.js', 'HTML5/CSS3'],
    difficulty: 'Easy',
    mentors: ['AOSSIE Sustainability Team'],
    githubUrl: 'https://github.com/AOSSIE-Org/Info/blob/main/GSoC-Ideas/2024/CarbonTracker.md'
  },

  // 2023 Ideas
  {
    slug: 'agora-vote-android',
    title: 'Agora Vote Android',
    year: '2023',
    category: 'Mobile & Governance',
    description: 'Native Android client for participating in Agora election voting sessions with biometrics authentication.',
    techStack: ['Kotlin', 'Android SDK', 'Web3'],
    difficulty: 'Medium',
    mentors: ['Agora Android Team']
  },
  {
    slug: 'p2p-messaging-flutter',
    title: 'P2P Messaging Flutter',
    year: '2023',
    category: 'Mobile & P2P',
    description: 'Cross-platform P2P chat application using LibP2P and Flutter.',
    techStack: ['Flutter', 'Dart', 'LibP2P'],
    difficulty: 'Hard',
    mentors: ['AOSSIE Mobile Team']
  }
];

export function getIdeasByYear(year: string): GSoCIdea[] {
  return IDEAS_DATA.filter((idea) => idea.year === year);
}

export function getAllIdeaYears(): string[] {
  const years = Array.from(new Set(IDEAS_DATA.map((idea) => idea.year)));
  return years.sort((a, b) => b.localeCompare(a));
}
