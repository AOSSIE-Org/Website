import type { ProjectText } from "./types";

/** Portuguese project text, keyed by project slug. */
const pt: Record<string, ProjectText> = {
  resonate: {
    description: "Uma plataforma social de voz de código aberto e mantida pela comunidade, no estilo do Clubhouse ou do Twitter Spaces.",
    about: "O Resonate coloca a voz no centro da interação social: salas de áudio ao vivo para discussões e eventos, conversas aleatórias em dupla e chamadas de voz. O aplicativo em Flutter usa funções em nuvem do Appwrite e o LiveKit para áudio em tempo real.",
  },
  rein: {
    description: "Um controlador de entrada remota multiplataforma baseado em LAN, com cliente no navegador para dispositivos com e sem tela sensível ao toque.",
    about: "O Rein roda um servidor no computador e permite que qualquer dispositivo da rede local o controle pelo navegador, sem precisar de um aplicativo nativo. Ele oferece entrada remota, transmissão de tela em tempo real, transferência de arquivos e vários clientes simultâneos.",
  },
  ogh: {
    description: "Um aplicativo Android local-first para transmitir ao vivo a câmera ou a tela para vários destinos RTMP/RTMPS ao mesmo tempo.",
    about: "O Ogh captura a tela ou a câmera, mixa o áudio selecionado, codifica uma única vez e publica em um ou mais destinos RTMP, com integração ao YouTube e à Twitch. Não tem anúncios, análises, marcas d'água, contas nem retransmissão de mídia hospedada, e funciona sem o Google Play Services. O nome vem do sânscrito ogha, que significa correnteza ou fluxo contínuo.",
  },
  thrubox: {
    description: "Um servidor de retransmissão minimalista e auto-hospedável que funciona como caixa postal criptografada, com um SDK cliente sem dependências.",
    about: "O servidor ThruBox armazena e retransmite entre usuários conteúdos criptografados e opacos. Ele nunca vê o texto original, pois toda a criptografia acontece no cliente. É distribuído como um único binário com SQLite embutido, TTL de mensagens configurável, limitação de taxa e autenticação opcional por chave de API. O SDK cliente em TypeScript funciona no Node.js e nos navegadores.",
  },
  openpeerchat: {
    description: "Mensagens ponto a ponto que são retransmitidas entre dispositivos próximos em vez de depender de um servidor central.",
    about: "O OpenPeerChat busca oferecer uma comunicação privada e resistente à censura que continua funcionando sem conexão à internet, algo útil em regiões remotas ou atingidas por desastres. As mensagens passam de um dispositivo próximo a outro até chegarem ao destino. Há implementações em Flutter e React Native.",
  },
  perspective: {
    description: "Analisa seu feed de notícias ou de redes sociais e apresenta contranarrativas confiáveis de fontes seguras.",
    about: "O Perspective foi criado para romper as bolhas geradas pelos algoritmos de conteúdo personalizado. Ele mostra pontos de vista alternativos bem fundamentados e fatos atualizados junto ao conteúdo que você lê, ajudando você a pensar de forma crítica.",
  },
  "social-street-smart": {
    description: "Uma extensão de navegador que torna a internet mais segura ao sinalizar linguagem abusiva, notícias falsas, clickbait e sites maliciosos.",
    about: "O Social Street Smart combina uma extensão para Chrome com APIs em Python e modelos pré-treinados para detectar clickbait, discurso de ódio e notícias falsas, identificar desinformação em imagens e verificar a reputação de sites.",
  },
  monumento: {
    description: "Um aplicativo social com realidade aumentada para fazer check-in, explorar e compartilhar os marcos mais icônicos do mundo.",
    about: "O Monumento permite que viajantes e entusiastas de história façam check-in em monumentos, explorem locais famosos em RA e se conectem com pessoas que compartilham o interesse pelo patrimônio cultural. Desenvolvido com Flutter e Appwrite.",
  },
  socialsharebutton: {
    description: "Um componente leve de compartilhamento em redes sociais, sem dependências, que funciona com qualquer framework web.",
    about: "O SocialShareButton oferece suporte a WhatsApp, Facebook, X, LinkedIn, Telegram, Reddit, e-mail, Pinterest e Discord, detecta automaticamente a URL e o título da página e funciona com React, Preact, Next.js, Qwik, Vue, Angular ou HTML puro.",
  },
  crowdalert: { description: "Um aplicativo colaborativo para relatar e visualizar incidentes ao redor do mundo." },
  eduaid: {
    description: "Uma ferramenta de IA que gera automaticamente questionários curtos a partir de qualquer conteúdo educacional.",
    about: "Quem estuda por conta própria no YouTube e em MOOCs muitas vezes tem dificuldade em reter o que assiste. O EduAid gera questionários de múltipla escolha, verdadeiro ou falso e respostas curtas a partir de um texto, ajudando estudantes a revisar e professores a elaborar perguntas rapidamente. Está disponível como aplicativo web, aplicativo para desktop e extensão de navegador.",
  },
  debateai: {
    description: "Uma plataforma de debates em tempo real em que você enfrenta oponentes humanos ou desafiantes de IA baseados em LLMs.",
    about: "O DebateAI ajuda as pessoas a aprimorar suas habilidades de comunicação por meio de debates estruturados, com rodadas de abertura, contrainterrogatório e encerramento. Os usuários podem debater entre si via WebSockets e WebRTC ou treinar contra oponentes de IA que adaptam seus contra-argumentos ao que você diz.",
  },
  libred: {
    description: "Uma plataforma totalmente local, em contêineres e movida por agentes, que transforma PDFs de ementas em material de preparação para provas.",
    about: "O LibrEd extrai, classifica e gera materiais de estudo a partir de PDFs brutos de ementas usando LLMs locais por meio do Ollama. Todo o processamento acontece na sua máquina, sem APIs externas nem dependência de nuvem, e o sistema inteiro roda via Docker Compose.",
  },
  minichain: { description: "Uma blockchain minimalista para educação, pesquisa e inovação." },
  "mind-the-word": {
    description: "Uma extensão de navegador que ajuda você a aprender um novo idioma traduzindo algumas palavras em cada página que você visita.",
    about: "Como apenas algumas palavras de cada página são traduzidas, é fácil deduzir o significado pelo contexto, e assim o vocabulário é assimilado naturalmente enquanto você navega no seu idioma nativo.",
  },
  starcross: { description: "Um aplicativo de astronomia para observar estrelas, planetas e constelações com base na sua localização real." },
  "aossie-scholar": { description: "Uma extensão para Chrome que calcula métricas de desempenho de pesquisadores a partir do perfil no Google Scholar." },
  djed: {
    description: "Um protocolo de stablecoin autônoma, formalmente verificado e lastreado em criptomoedas.",
    about: "O Djed mantém a paridade de uma stablecoin por meio de um modelo com duas moedas: uma StableCoin que acompanha um preço-alvo e uma ReserveCoin que a lastreia e absorve a volatilidade. A Djed Alliance mantém os contratos em Solidity, os painéis web, os contratos de oráculo e o serviço off-chain que publica os preços on-chain.",
  },
  stablepay: {
    description: "Um widget totalmente descentralizado, executado apenas no cliente, para aceitar pagamentos em criptomoedas e stablecoins.",
    about: "Quando incorporado a um site, o widget StablePay se comunica diretamente com os contratos inteligentes, sem servidores intermediários. Os clientes podem pagar na criptomoeda nativa de uma rede ou em stablecoins lastreadas nela, com conversão automática entre as duas. Um painel para lojistas exibe os pagamentos recebidos.",
  },
  gluon: {
    description: "Um protocolo de stablecoin autônoma lastreada em criptomoedas que divide as reservas em tokens estáveis e voláteis.",
    about: "Inspirado na física nuclear, o Gluon divide um ativo de reserva existente em um \"nêutron\" estável e um \"próton\" volátil por fissão e os une novamente por fusão. Há implementações em redes EVM, Ergo e Solana, além de um SDK e de uma formalização no assistente de provas Rocq (Coq).",
  },
  fate: {
    description: "Pools de previsão descentralizados e perpétuos em que os usuários compram e vendem bullCoins e bearCoins.",
    about: "O Fate substitui os livros de ofertas por um modelo com dois cofres, permitindo especular sobre tendências de preço em um mercado sempre ativo e sem vencimento. Funciona em redes EVM, Sui e Solana, com cotações de vários provedores de oráculos.",
  },
  tectonic: { description: "Um protocolo de stablecoin para redes EVM, com interface web para explorar implantações e EquityCoins e acionar resgates." },
  chainvoice: {
    description: "Uma plataforma de faturamento descentralizada para criar, gerenciar e pagar faturas on-chain à prova de adulteração.",
    about: "O Chainvoice usa contratos inteligentes compatíveis com EVM para automatizar o fluxo de pagamento de faturas e reduzir a dependência de intermediários. Os usuários podem criar faturas, gerenciar pagamentos e acompanhar o histórico de transações com transparência.",
  },
  zplit: {
    description: "Um aplicativo móvel focado em privacidade para dividir despesas em grupo, com uso offline e sincronização ponto a ponto.",
    about: "O Zplit cuida do controle de despesas, da gestão de grupos e do cálculo de dívidas sem um servidor central. Os dados ficam no seu dispositivo e são sincronizados ponto a ponto via Wi-Fi Direct, Bluetooth ou NFC.",
  },
  supportusbutton: {
    description: "Um componente \"Apoie-nos\" minimalista e configurável para exibir patrocinadores em qualquer frontend.",
    about: "O SupportUsButton oferece layouts de patrocinadores por níveis, com logotipos e links, vários temas integrados e estilização com Tailwind CSS, facilitando adicionar uma página de apoio profissional a qualquer projeto.",
  },
  "inpact-ai": {
    description: "Uma plataforma com IA que conecta criadores de conteúdo, marcas e agências por meio de insights baseados em dados.",
    about: "O InPactAI usa IA generativa, análise de público e métricas de engajamento para aproximar criadores de patrocínios relevantes, ajudar criadores a encontrar parceiros com públicos complementares e ajudar marcas a medir o retorno de campanhas com influenciadores.",
  },
  "carbon-tracker": {
    description: "Um rastreador de atividades físicas local-first que também mede as emissões de CO₂ que você evita pela forma como se desloca.",
    about: "O CarbonTracker registra atividades, viagens e meios de transporte, calcula emissões e economias e mantém os dados de condicionamento físico, localização e viagens no seu dispositivo. É compatível com Health Connect / HealthKit e Wear OS, e um aplicativo complementar para relógio está em desenvolvimento.",
  },
  "carbon-footprint": {
    description: "Ferramentas que revelam a pegada de carbono das escolhas do dia a dia: uma extensão para mapas, uma API, um aplicativo móvel e assistentes de voz.",
    about: "A família Carbon Footprint começou como uma extensão de navegador que mostra emissões em serviços de mapas e cresceu para incluir uma API universal de emissões, um aplicativo em React Native, uma skill para a Amazon Alexa e uma ação para o Google Assistente.",
  },
  pictopy: {
    description: "Uma galeria de fotos para desktop focada em privacidade, com agrupamento de rostos no próprio dispositivo, detecção de objetos e busca inteligente.",
    about: "O PictoPy traz o gerenciamento moderno de fotos com IA para a sua própria máquina, sem envios para a nuvem. Criado com Tauri, React, Rust e um backend em Python, ele agrupa rostos em toda a sua biblioteca, marca as fotos com os objetos detectados e permite buscar em linguagem simples, totalmente offline.",
  },
  smartnotes: {
    description: "Um aplicativo para desktop focado em privacidade para gestão do conhecimento pessoal, com busca semântica local e RAG.",
    about: "O Smart Notes combina um editor de markdown com busca vetorial local e modelos de linguagem no próprio dispositivo, para que você possa fazer perguntas sobre suas anotações e descobrir conexões entre ideias, offline por padrão.",
  },
  moveyourbody: {
    description: "Um aplicativo de exercícios focado em privacidade, que roda no próprio dispositivo, com microtreinos curtos que se adaptam ao seu feedback.",
    about: "O MoveYourBody agenda duas ou três sessões de 5 a 7 minutos por dia e adapta os exercícios ao seu feedback e às suas condições de saúde usando filtragem baseada em regras e correspondência semântica leve, tudo totalmente offline.",
  },
  babynest: {
    description: "Um planejador de gravidez inteligente que acompanha as consultas de pré-natal e oferece recomendações com IA.",
    about: "O BabyNest mantém os futuros pais organizados com acompanhamento de consultas por trimestre, notificações de saúde específicas de cada país e orientações personalizadas.",
  },
  docpilot: {
    description: "Um aplicativo de prontuário eletrônico que grava, transcreve e analisa conversas entre médico e paciente com IA conversacional.",
    about: "O DocPilot ajuda profissionais de saúde a agilizar a documentação: transcreve as consultas em tempo real e gera resumos das conversas e sugestões de prescrição.",
  },
  neurotrack: {
    description: "Uma plataforma assistida por IA que apoia a triagem e o acompanhamento de condições do neurodesenvolvimento, como TEA e TDAH.",
    about: "O NeuroTrack automatiza avaliações de triagem preliminares e conecta pacientes a terapeutas qualificados por meio de dois aplicativos dedicados, um para pacientes e outro para terapeutas, agilizando a avaliação, as consultas e o acompanhamento da terapia.",
  },
  "ai-keyboard": { description: "Um teclado com IA para dispositivos móveis." },
  "open-verifiable-llm": { description: "LLMs totalmente abertos, com pesos e dados abertos, cujo treinamento pode ser verificado de forma independente e que rodam localmente." },
  "identity-tokens": {
    description: "Tokens de identidade autoemitidos e baseados em NFT que qualquer pessoa pode atestar, formando uma rede de confiança on-chain.",
    about: "Pense nisso como um passaporte que você emite para si mesmo, sem precisar de governo, instituição ou intermediário. Os tokens de identidade podem conter metadados opcionais, e outros portadores de tokens podem atestá-los on-chain.",
  },
  tnt: {
    description: "Trust Network Tokens: um framework ERC-721 intransferível para emitir e revogar credenciais de confiança verificáveis.",
    about: "As organizações implantam seu próprio contrato TNT por meio de uma factory, emitem tokens para os usuários, podem revogá-los se quiserem e mantêm um registro de relações de confiança verificável na blockchain.",
  },
  "agora-blockchain": {
    description: "Eleições à prova de adulteração que levam os algoritmos de votação do Agora para a blockchain.",
    about: "O Agora Blockchain leva algoritmos de apuração de votos como Borda, IRV e Oklahoma para contratos inteligentes, de modo que as cédulas não possam ser alteradas por administradores, atacantes ou qualquer pessoa com acesso ao banco de dados.",
  },
  agora: {
    description: "Uma biblioteca de algoritmos para apuração de votos em eleições, com interfaces web, móvel e para Slack.",
    about: "O Agora implementa dezenas de métodos de apuração de votos em Scala, de variantes de Aprovação, Borda e Condorcet ao sistema STV usado no Território da Capital Australiana, além de uma API REST, um frontend web, aplicativos para Android e iOS e uma integração com o Slack (Slagora).",
  },
  orgexplorer: {
    description: "Um painel intuitivo, que roda apenas no navegador, para explorar grandes organizações do GitHub.",
    about: "O OrgExplorer mapeia as relações entre repositórios, as redes de colaboradores, as tendências de atividade e a distribuição de tecnologias, e sinaliza riscos de bus factor, tudo rodando no navegador com a API REST do GitHub, sem backend.",
  },
  gitcord: {
    description: "Automação local-first entre Discord ↔ GitHub que planeja mudanças de cargos e atribuições de issues de forma determinística.",
    about: "O Gitcord lê a atividade no GitHub e o estado do Discord e produz planos revisáveis para atualizar cargos e atribuições no GitHub. Os modos de simulação e de observação geram relatórios de auditoria sem alterar nada, e um bot do Discord oferece comandos de barra para vincular identidades.",
  },
  "devr-ai": {
    description: "Um assistente de Developer Relations com IA para comunidades de código aberto no Discord e no GitHub.",
    about: "Construído sobre uma arquitetura de agentes com LangGraph, o Devr.AI apoia os colaboradores, simplifica a integração de novos membros e fornece atualizações dos projetos em tempo real, reduzindo a carga dos mantenedores e melhorando a experiência dos colaboradores.",
  },
  skills: {
    description: "Governança de IA local-first para grandes organizações: skills de agentes compartilhadas, um bot de perguntas e respostas no Discord e um painel de análise de merge de PRs.",
    about: "O ecossistema Skills mantém as contribuições feitas com auxílio de IA alinhadas ao contexto de cada repositório. Ele centraliza as skills e regras de agentes de toda a organização, executa o SkillBot para responder a perguntas de colaboradores no Discord usando skills específicas de cada repositório e oferece um painel que agrupa pull requests semanticamente para planejar a ordem de merge e revelar conflitos.",
  },
  "ell-ena": {
    description: "Uma gerente de produto com IA que cuida de tarefas, tickets e atas de reunião por meio de uma interface de chat simples.",
    about: "A Ell-ena cria tickets, registra transcrições de reuniões e mantém todo o contexto dos seus projetos, para que as equipes possam gerenciar o trabalho simplesmente conversando com ela.",
  },
  codingagent: {
    description: "Um agente de programação de código aberto para linha de comando, independente de modelo, com memória persistente e integração com Git e MCP.",
    about: "O CodingAgent funciona com qualquer LLM, na nuvem ou local, trocado com uma única linha de configuração. Ele mantém memória de curto prazo, de longo prazo e por projeto entre sessões e continua leve o suficiente para fluxos reais de engenharia.",
  },
  websift: { description: "Converte páginas web em formatos prontos para serem consumidos por modelos de linguagem." },
  bringyourownkey: {
    description: "Uma biblioteca independente de framework que permite aos usuários fornecer as próprias chaves de API de LLM ao seu aplicativo, sem necessidade de proxy.",
    about: "Um widget no navegador coleta e armazena a chave localmente, e uma função auxiliar no backend a lê dos cabeçalhos da requisição, de modo que a arquitetura atual do seu frontend e backend permanece exatamente como está.",
  },
  autoinitialissues: { description: "Uma GitHub Action que popula novos repositórios com issues iniciais bem definidas, a partir de bancos predefinidos ou geradas por IA." },
  "idb-backup": { description: "Uma biblioteca leve em TypeScript para fazer backup e restaurar bancos de dados IndexedDB como JSON, preservando os tipos." },
  bene: {
    description: "Um protocolo de arrecadação de fundos trustless: os projetos só acessam os recursos se atingirem a meta, e os apoiadores recebem tokens de Proof-of-Funding.",
    about: "Os responsáveis pelo projeto criam um cofre de financiamento com uma taxa de câmbio, uma meta mínima e um prazo. Os apoiadores recebem tokens de prova de financiamento; se a meta não for atingida a tempo, eles podem reaver o dinheiro. O Bene roda em redes EVM e no Ergo, com uma interface executada totalmente no cliente.",
  },
  "orb-oracle": {
    description: "Oráculos descentralizados: navegue por feeds de dados, envie valores e implante oráculos básicos ou compostos on-chain.",
    about: "O Orb Oracle permite que qualquer pessoa lance oráculos básicos com governança própria ou componha novos a partir de feeds existentes, com intervalos de preço ponderados pelo tempo registrados on-chain. O serviço Poster automatiza o envio de valores de fontes como Chainlink, Pyth ou APIs REST, e o protocolo foi formalizado no assistente de provas Rocq.",
  },
  windmill: {
    description: "Uma exchange on-chain baseada em leilões, em que as ordens são casadas por bots keepers ao longo de curvas de preço dinâmicas.",
    about: "Em vez de um livro de ofertas central, o Windmill armazena ordens de compra e venda on-chain e deixa que keepers autônomos as casem conforme as curvas de preço de leilão holandês evoluem. Os keepers recebem recompensas pelo casamento de ordens, e todas as liquidações acontecem de forma atômica on-chain.",
  },
  maelstrom: { description: "Um protocolo de liquidez descentralizado para tokens ERC-20 com curvas de preço de compra e venda personalizáveis." },
  "hammer-auction-house": { description: "Uma plataforma de leilões descentralizada com suporte a leilões inglês, holandês, all-pay e de Vickrey para NFTs e tokens." },
  hodlcoin: {
    description: "Cofres de staking autoestabilizantes cujo preço, comprovadamente do ponto de vista matemático, sempre aumenta.",
    about: "Qualquer pessoa pode criar um cofre de staking hodlCoin para um token ERC-20. As taxas de unstaking recompensam os criadores do cofre e quem mantém o staking a longo prazo, e há implementações para redes EVM e Ergo.",
  },
  karma: { description: "Pools de previsão descentralizados com oráculos internos." },
  fairfund: { description: "Financiamento conduzido pela comunidade: implante cofres, deposite fundos, vote em propostas e distribua recursos com transparência." },
  bountiful: { description: "Financie o desenvolvimento por meio de competição aberta: as recompensas só são liberadas quando um problema é resolvido de forma verificável." },
  raindrop: { description: "Uma plataforma descentralizada de distribuição de tokens para airdrops e resgates de tokens." },
  clowder: { description: "Crie e gerencie Contribution Accounting Tokens (CATs), que registram contribuições de valor dentro de organizações descentralizadas." },
  xops: {
    description: "Um mecanismo de transferência de valor nativo de CI/CD, distribuído como GitHub Action: PRs mesclados se tornam pagamentos assinados on-chain.",
    about: "Um evento no repositório, como a mesclagem de um pull request, gera uma intenção de pagamento; uma pessoa a assina, o workflow a liquida on-chain e publica um comprovante de volta. Roda no seu próprio CI, não precisa de servidor operado pelo projeto e usa por padrão um modo de simulação seguro.",
  },
  walletlink: { description: "Uma forma gratuita e independente de SaaS de conectar frontends a carteiras EVM, e uma substituta direta para stacks baseadas em WalletConnect." },
  vouchme: { description: "Um sistema de depoimentos baseado em blockchain para construir uma reputação transparente e verificável." },
  treee: {
    description: "Documente plantios de árvores, transforme-os em NFTs e explore iniciativas verdes próximas em um mapa.",
    about: "O aplicativo móvel e os contratos em Solidity do Treee oferecem verificação on-chain das árvores plantadas, gestão de organizações e emissão de NFTs, para um acompanhamento de sustentabilidade transparente e auditável.",
  },
  plaza: { description: "Um hub de coordenação on-chain centrado em mapas para criar projetos de impacto vinculados a locais e contribuir com eles." },
  "stable-viewpoints": { description: "Uma publicação independente com artigos bem pesquisados sobre como a tecnologia pode trazer estabilidade ao mundo." },
  scavenger: { description: "Um provador automático de teoremas para lógica de primeira ordem baseado no cálculo de resolução de conflitos." },
  skeptik: { description: "Algoritmos para comprimir provas formais produzidas por solucionadores SAT/SMT e provadores automáticos de teoremas." },
  sensala: { description: "Um framework de semântica dinâmica para processamento de linguagem natural." },
  "computational-philosophy": { description: "Formalizações assistidas por computador de provas ontológicas em Coq, Isabelle e provadores automáticos de teoremas." },
};

export default pt;
