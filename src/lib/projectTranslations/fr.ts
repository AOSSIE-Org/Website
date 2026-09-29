import type { ProjectText } from "./types";

/** French project text, keyed by project slug. */
const fr: Record<string, ProjectText> = {
  resonate: {
    description: "Une plateforme sociale vocale open source et communautaire, dans l'esprit de Clubhouse ou de Twitter Spaces.",
    about: "Resonate place la voix au cœur des échanges sociaux : salons audio en direct pour les discussions et les événements, conversations aléatoires en tête-à-tête et appels vocaux. L'application Flutter s'appuie sur les fonctions cloud d'Appwrite et sur LiveKit pour l'audio en temps réel.",
  },
  rein: {
    description: "Un contrôleur d'entrée à distance multiplateforme fonctionnant en réseau local, avec un client web pour les appareils tactiles ou non.",
    about: "Rein exécute un serveur sur l'ordinateur et permet à n'importe quel appareil du réseau local de le piloter depuis un navigateur web, sans application native. Il prend en charge la saisie à distance, la diffusion de l'écran en temps réel, le transfert de fichiers et plusieurs clients simultanés.",
  },
  ogh: {
    description: "Une application Android local-first pour diffuser en direct la caméra ou l'écran vers plusieurs destinations RTMP/RTMPS à la fois.",
    about: "Ogh capture l'écran ou la caméra, mixe l'audio choisi, encode une seule fois et diffuse vers une ou plusieurs destinations RTMP, avec une intégration YouTube et Twitch. Sans publicité, sans statistiques d'usage, sans filigrane, sans compte et sans relais multimédia hébergé, elle fonctionne aussi sans les services Google Play. Son nom vient du sanskrit ogha, qui signifie courant ou flux continu.",
  },
  thrubox: {
    description: "Un serveur relais minimaliste et auto-hébergeable qui fait office de boîte aux lettres chiffrée, accompagné d'un SDK client sans dépendance.",
    about: "Le serveur ThruBox stocke et relaie entre utilisateurs des contenus chiffrés opaques. Il ne voit jamais le texte en clair, car tout le chiffrement a lieu côté client. Il est livré sous forme d'un binaire unique avec SQLite intégré, une durée de vie des messages configurable, une limitation du débit et une authentification facultative par clé d'API. Le SDK client TypeScript fonctionne dans Node.js et dans les navigateurs.",
  },
  openpeerchat: {
    description: "Une messagerie pair-à-pair qui relaie les messages d'un appareil proche à l'autre au lieu de dépendre d'un serveur central.",
    about: "OpenPeerChat vise une communication privée et résistante à la censure, qui continue de fonctionner sans connexion Internet, ce qui est précieux dans les zones isolées ou sinistrées. Les messages passent d'un appareil proche à l'autre jusqu'à leur destination. Il en existe des implémentations en Flutter et en React Native.",
  },
  perspective: {
    description: "Analyse votre fil d'actualité ou vos réseaux sociaux et vous présente des points de vue contradictoires crédibles, issus de sources fiables.",
    about: "Perspective est conçu pour briser les bulles de filtres créées par les algorithmes de contenu personnalisé. Il fait apparaître, à côté de ce que vous lisez, des points de vue alternatifs bien argumentés et des faits à jour, pour vous aider à exercer votre esprit critique.",
  },
  "social-street-smart": {
    description: "Une extension de navigateur qui rend Internet plus sûr en signalant les propos injurieux, les fausses informations, les pièges à clics et les sites malveillants.",
    about: "Social Street Smart associe une extension Chrome à des API Python et à des modèles préentraînés pour détecter les pièges à clics, les discours haineux et les fausses informations, repérer la désinformation par l'image et vérifier la réputation des sites web.",
  },
  monumento: {
    description: "Une application sociale intégrant la réalité augmentée pour signaler sa visite, explorer et partager les monuments emblématiques du monde entier.",
    about: "Monumento permet aux voyageurs et aux passionnés d'histoire de signaler leur passage sur des monuments, d'explorer des sites célèbres en réalité augmentée et d'échanger avec des personnes qui partagent leur intérêt pour le patrimoine culturel. Développée avec Flutter et Appwrite.",
  },
  socialsharebutton: {
    description: "Un composant de partage sur les réseaux sociaux léger et sans dépendance, compatible avec n'importe quel framework web.",
    about: "SocialShareButton prend en charge WhatsApp, Facebook, X, LinkedIn, Telegram, Reddit, l'e-mail, Pinterest et Discord, détecte automatiquement l'URL et le titre de la page, et fonctionne avec React, Preact, Next.js, Qwik, Vue, Angular ou du HTML simple.",
  },
  crowdalert: {
    description: "Une application participative pour signaler et consulter des incidents partout dans le monde.",
  },
  eduaid: {
    description: "Un outil d'IA qui génère automatiquement de courts quiz à partir de n'importe quel contenu pédagogique.",
    about: "Les autodidactes qui apprennent sur YouTube ou via des MOOC ont souvent du mal à retenir ce qu'ils regardent. EduAid génère à partir d'un texte des quiz à choix multiples, vrai/faux ou à réponse courte, pour aider les élèves à réviser et les enseignants à formuler rapidement leurs questions. Il est disponible en application web, en application de bureau et en extension de navigateur.",
  },
  debateai: {
    description: "Une plateforme de débat en temps réel où vous affrontez des adversaires humains ou des challengers IA propulsés par des LLM.",
    about: "DebateAI aide chacun à affûter ses compétences oratoires grâce à des débats structurés en trois temps : exposé d'ouverture, contre-interrogatoire et conclusion. Les utilisateurs peuvent débattre entre eux via WebSockets et WebRTC, ou s'entraîner face à des adversaires IA qui adaptent leurs contre-arguments à vos propos.",
  },
  libred: {
    description: "Une plateforme entièrement locale, conteneurisée et pilotée par des agents, qui transforme des programmes d'examen au format PDF en supports de révision.",
    about: "LibrEd extrait, classe et génère des supports d'étude à partir de programmes bruts au format PDF, grâce à des LLM locaux exécutés via Ollama. Tout le traitement a lieu sur votre machine, sans API externe ni dépendance au cloud, et l'ensemble du système s'exécute avec Docker Compose.",
  },
  minichain: {
    description: "Une blockchain minimaliste pour l'enseignement, la recherche et l'innovation.",
  },
  "mind-the-word": {
    description: "Une extension de navigateur qui vous aide à apprendre une nouvelle langue en traduisant quelques mots de chaque page que vous visitez.",
    about: "Comme seuls quelques mots par page sont traduits, leur sens se devine facilement grâce au contexte : vous enrichissez ainsi naturellement votre vocabulaire tout en naviguant dans votre langue maternelle.",
  },
  starcross: {
    description: "Une application d'astronomie pour observer les étoiles, les planètes et les constellations en fonction de votre position réelle.",
  },
  "aossie-scholar": {
    description: "Une extension Chrome qui calcule des indicateurs de performance pour les chercheurs à partir de leur profil Google Scholar.",
  },
  djed: {
    description: "Un protocole de stablecoin autonome, adossé à des cryptomonnaies et formellement vérifié.",
    about: "Djed maintient l'arrimage d'un stablecoin grâce à une conception à deux jetons : un StableCoin qui suit un prix cible et un ReserveCoin qui le garantit et absorbe la volatilité. La Djed Alliance maintient les contrats Solidity, les tableaux de bord web, ainsi que les contrats d'oracle et le service hors chaîne qui publie les prix sur la chaîne.",
  },
  stablepay: {
    description: "Un widget entièrement décentralisé, exécuté uniquement côté client, pour accepter des paiements en cryptomonnaies et en stablecoins.",
    about: "Intégré à un site web, le widget StablePay communique directement avec les contrats intelligents, sans serveur intermédiaire. Les clients peuvent payer dans la cryptomonnaie native d'une chaîne ou dans des stablecoins adossés à celle-ci, avec une conversion automatique entre les deux. Un tableau de bord marchand affiche les paiements reçus.",
  },
  gluon: {
    description: "Un protocole de stablecoin autonome adossé à des cryptomonnaies, qui scinde les réserves en jetons stables et en jetons volatils.",
    about: "Inspiré de la physique nucléaire, Gluon scinde par fission un actif de réserve existant en un « neutron » stable et un « proton » volatil, puis les réunit par fusion. Il dispose d'implémentations sur les chaînes EVM, Ergo et Solana, d'un SDK et d'une formalisation dans l'assistant de preuve Rocq (Coq).",
  },
  fate: {
    description: "Des pools de prédiction décentralisés et perpétuels, où les utilisateurs achètent et vendent des bullCoins et des bearCoins.",
    about: "Fate remplace les carnets d'ordres par une conception à double coffre, afin que les utilisateurs puissent spéculer sur les tendances des prix sur un marché ouvert en permanence et sans échéance. Il fonctionne sur les chaînes EVM, Sui et Solana, avec des flux de prix provenant de plusieurs fournisseurs d'oracles.",
  },
  tectonic: {
    description: "Un protocole de stablecoin pour les chaînes EVM, avec une interface web pour explorer les déploiements et les EquityCoins, et déclencher des rachats.",
  },
  chainvoice: {
    description: "Une plateforme de facturation décentralisée pour créer, gérer et régler des factures infalsifiables sur la chaîne.",
    about: "Chainvoice utilise des contrats intelligents compatibles EVM pour automatiser le paiement des factures et réduire le recours aux intermédiaires. Les utilisateurs peuvent créer des factures, gérer les paiements et suivre l'historique des transactions en toute transparence.",
  },
  zplit: {
    description: "Une application mobile respectueuse de la vie privée pour partager les dépenses de groupe, utilisable hors ligne avec synchronisation pair-à-pair.",
    about: "Zplit gère le suivi des dépenses, la gestion des groupes et le calcul des dettes sans serveur central. Les données restent sur votre appareil et se synchronisent en pair-à-pair via Wi-Fi Direct, Bluetooth ou NFC.",
  },
  supportusbutton: {
    description: "Un composant « Soutenez-nous » minimaliste et configurable pour mettre en avant vos sponsors dans n'importe quel frontend.",
    about: "SupportUsButton propose des présentations des sponsors par niveau, avec logos et liens, plusieurs thèmes intégrés et un style Tailwind CSS, pour ajouter facilement une page de soutien professionnelle à n'importe quel projet.",
  },
  "inpact-ai": {
    description: "Une plateforme propulsée par l'IA qui met en relation créateurs de contenu, marques et agences grâce à des analyses fondées sur les données.",
    about: "InPactAI s'appuie sur l'IA générative, l'analyse d'audience et les indicateurs d'engagement pour proposer aux créateurs des partenariats pertinents, les aider à trouver des collaborateurs aux audiences complémentaires et permettre aux marques de mesurer le retour sur investissement de leurs campagnes d'influence.",
  },
  "carbon-tracker": {
    description: "Un suivi d'activité physique local-first qui mesure aussi les émissions de CO₂ que vous évitez grâce à vos modes de déplacement.",
    about: "CarbonTracker enregistre l'activité, les trajets et les modes de transport, calcule les émissions et les économies réalisées, et conserve les données de forme physique, de localisation et de trajet sur votre appareil. Il prend en charge Health Connect / HealthKit et Wear OS, et une application compagnon pour montre est en cours de développement.",
  },
  "carbon-footprint": {
    description: "Des outils qui révèlent l'empreinte carbone de nos choix quotidiens : une extension pour les cartes, une API, une application mobile et des assistants vocaux.",
    about: "La famille Carbon Footprint a commencé avec une extension de navigateur qui affiche les émissions dans les services de cartographie, avant de s'étendre à une API universelle de calcul des émissions, une application React Native, une skill Amazon Alexa et une action Google Assistant.",
  },
  pictopy: {
    description: "Une galerie photo de bureau respectueuse de la vie privée, avec regroupement des visages, détection d'objets et recherche intelligente, le tout sur l'appareil.",
    about: "PictoPy apporte la gestion de photos moderne par IA sur votre propre machine, sans envoi vers le cloud. Développé avec Tauri, React, Rust et un backend Python, il regroupe les visages dans toute votre bibliothèque, étiquette les photos selon les objets détectés et permet de les rechercher en langage courant, entièrement hors ligne.",
  },
  smartnotes: {
    description: "Une application de bureau respectueuse de la vie privée pour gérer vos connaissances personnelles, avec recherche sémantique et RAG en local.",
    about: "Smart Notes associe un éditeur Markdown à une recherche vectorielle locale et à des modèles de langage exécutés sur l'appareil : vous pouvez interroger vos notes et découvrir des liens entre vos idées, hors ligne par défaut.",
  },
  moveyourbody: {
    description: "Une application de remise en forme respectueuse de la vie privée, exécutée sur l'appareil, avec de courtes micro-séances qui s'adaptent à vos retours.",
    about: "MoveYourBody planifie deux ou trois séances de 5 à 7 minutes par jour et adapte les exercices à vos retours et à votre état de santé grâce à un filtrage à base de règles et à une correspondance sémantique légère, entièrement hors ligne.",
  },
  babynest: {
    description: "Un planificateur de grossesse intelligent qui suit les rendez-vous prénataux et propose des recommandations fondées sur l'IA.",
    about: "BabyNest aide les futurs parents à s'organiser grâce au suivi des rendez-vous par trimestre, à des notifications de santé propres à chaque pays et à des conseils personnalisés.",
  },
  docpilot: {
    description: "Une application de dossier médical électronique qui enregistre, transcrit et analyse les échanges entre médecin et patient grâce à l'IA conversationnelle.",
    about: "DocPilot aide les professionnels de santé à alléger leur travail de documentation : il transcrit les consultations en temps réel et génère des résumés des échanges ainsi que des suggestions de prescription.",
  },
  neurotrack: {
    description: "Une plateforme assistée par l'IA pour le dépistage et la prise en charge des troubles du neurodéveloppement comme le TSA et le TDAH.",
    about: "NeuroTrack automatise les évaluations de dépistage préliminaires et met les patients en relation avec des thérapeutes qualifiés grâce à deux applications dédiées, l'une pour les patients, l'autre pour les thérapeutes, afin de simplifier l'évaluation, la consultation et le suivi thérapeutique.",
  },
  "ai-keyboard": {
    description: "Un clavier propulsé par l'IA pour appareils mobiles.",
  },
  "open-verifiable-llm": {
    description: "Des LLM entièrement ouverts (poids et données ouverts), dont l'entraînement peut être vérifié de manière indépendante et qui s'exécutent en local.",
  },
  "identity-tokens": {
    description: "Des jetons d'identité auto-émis, fondés sur des NFT, que chacun peut attester, pour bâtir un réseau de confiance sur la chaîne.",
    about: "Imaginez un passeport que vous vous délivrez vous-même, sans gouvernement, institution ni intermédiaire. Les jetons d'identité peuvent contenir des métadonnées facultatives, et les autres détenteurs de jetons peuvent s'en porter garants sur la chaîne.",
  },
  tnt: {
    description: "Trust Network Tokens : un framework ERC-721 de jetons non transférables pour émettre et révoquer des attestations de confiance vérifiables.",
    about: "Les organisations déploient leur propre contrat TNT via une factory, émettent des jetons pour leurs utilisateurs, les révoquent si nécessaire et tiennent un registre des relations de confiance vérifiable sur la chaîne.",
  },
  "agora-blockchain": {
    description: "Des élections infalsifiables qui portent les algorithmes de vote d'Agora sur la chaîne.",
    about: "Agora Blockchain transpose dans des contrats intelligents des algorithmes de dépouillement comme Borda, IRV et Oklahoma, afin que les bulletins ne puissent être modifiés ni par les administrateurs, ni par des attaquants, ni par quiconque a accès à la base de données.",
  },
  agora: {
    description: "Une bibliothèque d'algorithmes de dépouillement des votes, avec des interfaces web, mobile et Slack.",
    about: "Agora implémente en Scala des dizaines de méthodes de dépouillement, du vote par approbation aux variantes de Borda et de Condorcet, jusqu'au système STV utilisé dans le Territoire de la capitale australienne, ainsi qu'une API REST, une interface web, des applications Android et iOS et une intégration Slack (Slagora).",
  },
  orgexplorer: {
    description: "Un tableau de bord intuitif, entièrement dans le navigateur, pour explorer les grandes organisations GitHub.",
    about: "OrgExplorer cartographie les relations entre dépôts, les réseaux de contributeurs, les tendances d'activité et la répartition des technologies, et signale les risques liés au bus factor. Il s'exécute entièrement dans le navigateur à partir de l'API REST de GitHub, sans backend.",
  },
  gitcord: {
    description: "Une automatisation Discord ↔ GitHub local-first qui planifie de façon déterministe les changements de rôles et l'attribution des issues.",
    about: "Gitcord lit l'activité GitHub et l'état de Discord, puis produit des plans vérifiables pour la mise à jour des rôles et les attributions sur GitHub. Les modes simulation et observateur génèrent des rapports d'audit sans rien modifier, et un bot Discord propose des commandes slash pour lier les identités.",
  },
  "devr-ai": {
    description: "Un assistant de relations développeurs propulsé par l'IA pour les communautés open source sur Discord et GitHub.",
    about: "Reposant sur une architecture d'agents LangGraph, Devr.AI accompagne les contributeurs, simplifie leur intégration et diffuse l'actualité des projets en temps réel, ce qui allège la charge des mainteneurs tout en améliorant l'expérience des contributeurs.",
  },
  skills: {
    description: "Une gouvernance de l'IA local-first pour les grandes organisations : skills d'agents partagées, bot de questions-réponses sur Discord et tableau de bord d'analyse des fusions de PR.",
    about: "L'écosystème Skills ancre les contributions assistées par l'IA dans le contexte propre à chaque dépôt. Il centralise les skills et les règles d'agents de toute l'organisation, fait tourner SkillBot pour répondre aux questions des contributeurs sur Discord à l'aide de skills propres à chaque dépôt, et fournit un tableau de bord qui regroupe sémantiquement les pull requests pour planifier l'ordre des fusions et faire ressortir les conflits.",
  },
  "ell-ena": {
    description: "Une IA chef de produit qui gère tâches, tickets et comptes rendus de réunion via une simple interface de discussion.",
    about: "Ell-ena crée des tickets, enregistre les transcriptions de réunions et garde en mémoire tout le contexte de vos projets : les équipes peuvent ainsi gérer leur travail simplement en lui parlant.",
  },
  codingagent: {
    description: "Un agent de programmation en ligne de commande, open source et indépendant du modèle, avec mémoire persistante et intégration Git et MCP.",
    about: "CodingAgent fonctionne avec n'importe quel LLM, dans le cloud ou en local, qu'on change en modifiant une seule ligne de configuration. Il conserve d'une session à l'autre une mémoire à court terme, à long terme et propre à chaque projet, tout en restant assez léger pour de vrais flux de travail d'ingénierie.",
  },
  websift: {
    description: "Convertit les pages web dans des formats directement exploitables par les modèles de langage.",
  },
  bringyourownkey: {
    description: "Une bibliothèque indépendante de tout framework qui permet aux utilisateurs de fournir leurs propres clés d'API de LLM à votre application, sans proxy.",
    about: "Un widget côté navigateur recueille la clé et la stocke localement, et une fonction utilitaire unique côté backend la lit dans les en-têtes des requêtes : l'architecture existante de votre frontend et de votre backend reste strictement inchangée.",
  },
  autoinitialissues: {
    description: "Une GitHub Action qui alimente les nouveaux dépôts en issues de démarrage bien définies, issues de banques prédéfinies ou générées par IA.",
  },
  "idb-backup": {
    description: "Une bibliothèque TypeScript légère pour sauvegarder et restaurer des bases IndexedDB au format JSON en préservant les types.",
  },
  bene: {
    description: "Un protocole de financement participatif sans tiers de confiance : les projets n'accèdent aux fonds que s'ils atteignent leur objectif, et les contributeurs reçoivent des jetons Proof-of-Funding.",
    about: "Les porteurs de projet créent un coffre de financement avec un taux de change, un objectif minimal et une date limite. Les contributeurs reçoivent des jetons de preuve de financement ; si l'objectif n'est pas atteint à temps, ils peuvent récupérer leur argent. Bene fonctionne sur les chaînes EVM et sur Ergo, avec une interface entièrement côté client.",
  },
  "orb-oracle": {
    description: "Des oracles décentralisés : parcourez les flux de données, soumettez des valeurs et déployez sur la chaîne des oracles de base ou composés.",
    about: "Orb Oracle permet à chacun de lancer des oracles de base adossés à une gouvernance ou d'en composer de nouveaux à partir de flux existants, avec des intervalles de prix pondérés dans le temps suivis sur la chaîne. Le service Poster automatise la soumission de valeurs provenant de sources comme Chainlink, Pyth ou des API REST, et le protocole a été formalisé dans l'assistant de preuve Rocq.",
  },
  windmill: {
    description: "Une plateforme d'échange sur la chaîne fondée sur des enchères, où des bots keepers apparient les ordres le long de courbes de prix dynamiques.",
    about: "Au lieu d'un carnet d'ordres central, Windmill stocke les ordres d'achat et de vente sur la chaîne et laisse des keepers autonomes les apparier à mesure qu'évoluent les courbes de prix d'enchères hollandaises. Les keepers perçoivent des récompenses d'appariement, et tous les règlements s'effectuent de manière atomique sur la chaîne.",
  },
  maelstrom: {
    description: "Un protocole de liquidité décentralisé pour les jetons ERC-20, avec des courbes de prix d'achat et de vente personnalisables.",
  },
  "hammer-auction-house": {
    description: "Une plateforme d'enchères décentralisée prenant en charge les enchères anglaises, hollandaises, à paiement universel et de Vickrey pour les NFT et les jetons.",
  },
  hodlcoin: {
    description: "Des coffres de staking autostabilisés dont le prix, mathématiquement démontré, ne peut qu'augmenter.",
    about: "Chacun peut créer un coffre de staking hodlCoin pour un jeton ERC-20. Les frais de retrait récompensent les créateurs de coffres et les stakers de long terme, et il existe des implémentations pour les chaînes EVM et Ergo.",
  },
  karma: {
    description: "Des pools de prédiction décentralisés dotés d'oracles internes.",
  },
  fairfund: {
    description: "Un financement porté par la communauté : déployez des coffres, déposez des fonds, votez sur des propositions et distribuez les fonds en toute transparence.",
  },
  bountiful: {
    description: "Financez le développement par la mise en concurrence ouverte : les primes ne sont versées que lorsqu'un problème est résolu de façon vérifiable.",
  },
  raindrop: {
    description: "Une plateforme décentralisée de distribution de jetons pour les airdrops et les réclamations de jetons.",
  },
  clowder: {
    description: "Créez et gérez des Contribution Accounting Tokens (CAT) qui comptabilisent les contributions au sein des organisations décentralisées.",
  },
  xops: {
    description: "Un moteur de transfert de valeur natif CI/CD, fourni sous forme de GitHub Action : les PR fusionnées deviennent des paiements signés sur la chaîne.",
    about: "Un événement du dépôt, comme la fusion d'une pull request, produit une intention de paiement ; une personne la signe, le workflow la règle sur la chaîne puis publie un reçu en retour. Il s'exécute dans votre propre CI, ne nécessite aucun serveur exploité par le projet et fonctionne par défaut en mode simulation, sans risque.",
  },
  walletlink: {
    description: "Une solution gratuite et indépendante de tout SaaS pour connecter des frontends aux portefeuilles EVM, qui remplace directement les solutions basées sur WalletConnect.",
  },
  vouchme: {
    description: "Un système de témoignages sur la blockchain pour bâtir une réputation transparente et vérifiable.",
  },
  treee: {
    description: "Documentez vos plantations d'arbres, frappez-les en NFT et découvrez sur une carte les initiatives vertes près de chez vous.",
    about: "L'application mobile et les contrats Solidity de Treee assurent la vérification sur la chaîne des arbres plantés, la gestion des organisations et l'émission de NFT, pour un suivi de la durabilité transparent et vérifiable.",
  },
  plaza: {
    description: "Un espace de coordination sur la chaîne, centré sur la carte, pour créer des projets à impact ancrés dans un lieu et y contribuer.",
  },
  "stable-viewpoints": {
    description: "Une publication indépendante proposant des articles rigoureusement documentés sur la façon dont la technologie peut apporter de la stabilité au monde.",
  },
  scavenger: {
    description: "Un démonstrateur automatique de théorèmes pour la logique du premier ordre, fondé sur le calcul de résolution de conflits.",
  },
  skeptik: {
    description: "Des algorithmes de compression des preuves formelles produites par les solveurs SAT/SMT et les démonstrateurs automatiques de théorèmes.",
  },
  sensala: {
    description: "Un framework de sémantique dynamique pour le traitement automatique du langage naturel.",
  },
  "computational-philosophy": {
    description: "Des formalisations assistées par ordinateur de preuves ontologiques dans Coq, Isabelle et des démonstrateurs automatiques de théorèmes.",
  },
};

export default fr;
