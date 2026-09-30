import type { ProjectText } from "./types";

/** Spanish project text, keyed by project slug. */
const es: Record<string, ProjectText> = {
  resonate: {
    description:
      "Una plataforma social de voz de código abierto e impulsada por la comunidad, al estilo de Clubhouse o Twitter Spaces.",
    about:
      "Resonate sitúa la voz en el centro de la interacción social: salas de audio en directo para debates y eventos, chats aleatorios por parejas y llamadas de voz. La app, desarrollada en Flutter, se apoya en funciones en la nube de Appwrite y en LiveKit para el audio en tiempo real.",
  },
  rein: {
    description:
      "Un controlador de entrada remota multiplataforma basado en la red local, con un cliente web para dispositivos táctiles y no táctiles.",
    about:
      "Rein ejecuta un servidor en el ordenador y permite que cualquier dispositivo de la red local lo controle desde un navegador web, sin necesidad de instalar una app nativa. Admite entrada remota, transmisión de pantalla en tiempo real, transferencia de archivos y varios clientes simultáneos.",
  },
  ogh: {
    description:
      "Una app para Android con enfoque local-first que transmite en directo la cámara o la pantalla a varios destinos RTMP/RTMPS a la vez.",
    about:
      "Ogh captura la pantalla o la cámara, mezcla el audio seleccionado, codifica una sola vez y publica en uno o varios destinos RTMP, con integración para YouTube y Twitch. No tiene anuncios, analíticas, marcas de agua, cuentas ni retransmisión de contenido alojada, y funciona sin Google Play Services. Su nombre procede del sánscrito ogha, que significa corriente o flujo continuo.",
  },
  thrubox: {
    description:
      "Un servidor de retransmisión minimalista y autoalojable que funciona como buzón cifrado, junto con un SDK cliente sin dependencias.",
    about:
      "El servidor de ThruBox almacena y retransmite entre usuarios contenidos cifrados que no puede leer. Nunca ve el texto sin cifrar, ya que todo el cifrado se realiza en el cliente. Se distribuye como un único binario con SQLite integrado, tiempos de vida de los mensajes configurables, limitación de peticiones y autenticación opcional mediante clave de API. El SDK cliente en TypeScript funciona en Node.js y en navegadores.",
  },
  openpeerchat: {
    description:
      "Mensajería entre pares que retransmite los mensajes a través de dispositivos cercanos en lugar de depender de un servidor central.",
    about:
      "OpenPeerChat busca ofrecer una comunicación privada y resistente a la censura que siga funcionando sin conexión a internet, algo muy útil en zonas remotas o afectadas por desastres. Los mensajes saltan de un dispositivo cercano a otro hasta llegar a su destino. Cuenta con implementaciones en Flutter y React Native.",
  },
  perspective: {
    description:
      "Analiza tus noticias o tu feed social y te muestra contranarrativas creíbles procedentes de fuentes fiables.",
    about:
      "Perspective está diseñado para romper las cámaras de eco que crean los algoritmos de contenido personalizado. Muestra puntos de vista alternativos bien argumentados y datos actualizados junto al contenido que lees, para ayudarte a pensar de forma crítica.",
  },
  "social-street-smart": {
    description:
      "Una extensión de navegador que hace internet más seguro señalando lenguaje ofensivo, noticias falsas, clickbait y sitios maliciosos.",
    about:
      "Social Street Smart combina una extensión de Chrome con APIs en Python y modelos preentrenados para detectar clickbait, discursos de odio y noticias falsas, identificar desinformación en imágenes y comprobar la reputación de sitios web.",
  },
  monumento: {
    description:
      "Una app social con realidad aumentada para registrar tus visitas, explorar y compartir los monumentos más emblemáticos del mundo.",
    about:
      "Monumento permite a viajeros y aficionados a la historia registrar sus visitas a monumentos, explorar lugares famosos en realidad aumentada y conectar con personas que comparten su interés por el patrimonio cultural. Desarrollada con Flutter y Appwrite.",
  },
  socialsharebutton: {
    description:
      "Un componente ligero y sin dependencias para compartir en redes sociales, compatible con cualquier framework web.",
    about:
      "SocialShareButton es compatible con WhatsApp, Facebook, X, LinkedIn, Telegram, Reddit, correo electrónico, Pinterest y Discord, detecta automáticamente la URL y el título actuales y funciona con React, Preact, Next.js, Qwik, Vue, Angular o HTML puro.",
  },
  crowdalert: {
    description:
      "Una aplicación colaborativa para informar de incidentes en todo el mundo y consultarlos.",
  },
  eduaid: {
    description:
      "Una herramienta de IA que genera automáticamente cuestionarios breves a partir de cualquier contenido educativo.",
    about:
      "Quienes aprenden por su cuenta con YouTube y MOOC a menudo tienen dificultades para retener lo que ven. EduAid genera cuestionarios de opción múltiple, de verdadero o falso y de respuesta corta a partir de un texto, lo que ayuda al alumnado a repasar y al profesorado a formular preguntas con rapidez. Está disponible como aplicación web, aplicación de escritorio y extensión de navegador.",
  },
  debateai: {
    description:
      "Una plataforma de debate en tiempo real en la que te enfrentas a oponentes humanos o a rivales de IA basados en LLM.",
    about:
      "DebateAI ayuda a mejorar las habilidades de comunicación mediante debates estructurados con rondas de apertura, contrainterrogatorio y cierre. Los usuarios pueden debatir entre sí mediante WebSockets y WebRTC, o practicar contra oponentes de IA que adaptan sus contraargumentos a lo que dices.",
  },
  libred: {
    description:
      "Una plataforma totalmente local, en contenedores y basada en agentes que convierte temarios en PDF en material de preparación de exámenes.",
    about:
      "LibrEd extrae, clasifica y genera material de estudio a partir de temarios en PDF usando LLM locales a través de Ollama. Todo el procesamiento se realiza en tu equipo, sin APIs externas ni dependencias de la nube, y el sistema completo se ejecuta con Docker Compose.",
  },
  minichain: {
    description:
      "Una blockchain minimalista para la educación, la investigación y la innovación.",
  },
  "mind-the-word": {
    description:
      "Una extensión de navegador que te ayuda a aprender un nuevo idioma traduciendo algunas palabras de cada página que visitas.",
    about:
      "Como solo se traducen unas pocas palabras de cada página, su significado se deduce fácilmente por el contexto, de modo que el vocabulario se adquiere de forma natural mientras navegas en tu lengua materna.",
  },
  starcross: {
    description:
      "Una app de astronomía para contemplar estrellas, planetas y constelaciones según tu ubicación real.",
  },
  "aossie-scholar": {
    description:
      "Una extensión de Chrome que calcula métricas de rendimiento de investigadores a partir de su perfil de Google Scholar.",
  },
  djed: {
    description:
      "Un protocolo de stablecoin autónomo, respaldado por criptomonedas y verificado formalmente.",
    about:
      "Djed mantiene la paridad de una stablecoin mediante un diseño de dos monedas: una StableCoin que sigue un precio objetivo y una ReserveCoin que la respalda y absorbe la volatilidad. La Djed Alliance mantiene los contratos en Solidity, los paneles web, y los contratos de oráculo y el publicador off-chain que envían los precios a la cadena.",
  },
  stablepay: {
    description:
      "Un widget totalmente descentralizado, que se ejecuta solo en el cliente, para aceptar pagos en criptomonedas y stablecoins.",
    about:
      "Una vez integrado en un sitio web, el widget de StablePay se comunica directamente con los contratos inteligentes, sin servidores intermediarios. Los clientes pueden pagar con la criptomoneda nativa de una cadena o con stablecoins respaldadas por ella, con conversión automática entre ambas. Un panel para comerciantes muestra los pagos recibidos.",
  },
  gluon: {
    description:
      "Un protocolo de stablecoin autónomo respaldado por criptomonedas que divide las reservas en tokens estables y volátiles.",
    about:
      "Inspirado en la física nuclear, Gluon divide un activo de reserva existente en un “neutrón” estable y un “protón” volátil mediante fisión, y los vuelve a unir mediante fusión. Tiene implementaciones en cadenas EVM, Ergo y Solana, además de un SDK y una formalización en el asistente de demostración Rocq (Coq).",
  },
  fate: {
    description:
      "Pools de predicción descentralizados y perpetuos en los que los usuarios compran y venden bullCoins y bearCoins.",
    about:
      "Fate sustituye los libros de órdenes por un diseño de doble bóveda para que los usuarios puedan especular sobre las tendencias de precios en un mercado siempre activo y sin vencimiento. Funciona en cadenas EVM, Sui y Solana, con fuentes de precios de varios proveedores de oráculos.",
  },
  tectonic: {
    description:
      "Un protocolo de stablecoin para cadenas EVM, con una interfaz web para explorar despliegues y EquityCoins y ejecutar reembolsos.",
  },
  chainvoice: {
    description:
      "Una plataforma de facturación descentralizada para crear, gestionar y pagar facturas on-chain a prueba de manipulaciones.",
    about:
      "Chainvoice utiliza contratos inteligentes compatibles con EVM para automatizar el flujo de pago de las facturas y reducir la dependencia de intermediarios. Los usuarios pueden crear facturas, gestionar pagos y consultar el historial de transacciones de forma transparente.",
  },
  zplit: {
    description:
      "Una app móvil centrada en la privacidad para repartir gastos de grupo, con uso sin conexión y sincronización entre pares.",
    about:
      "Zplit se encarga del registro de gastos, la gestión de grupos y el cálculo de deudas sin un servidor central. Los datos permanecen en tu dispositivo y se sincronizan entre pares mediante Wi-Fi Direct, Bluetooth o NFC.",
  },
  supportusbutton: {
    description:
      "Un componente “Apóyanos” configurable y minimalista para mostrar a los patrocinadores en cualquier frontend.",
    about:
      "SupportUsButton ofrece diseños de patrocinadores por niveles con logotipos y enlaces, varios temas integrados y estilos con Tailwind CSS, lo que facilita añadir una página de apoyo profesional a cualquier proyecto.",
  },
  "inpact-ai": {
    description:
      "Una plataforma impulsada por IA que conecta a creadores de contenido, marcas y agencias mediante información basada en datos.",
    about:
      "InPactAI utiliza IA generativa, analítica de audiencias y métricas de interacción para emparejar a los creadores con patrocinios relevantes, ayudarles a encontrar colaboradores con audiencias complementarias y permitir a las marcas medir el retorno de sus campañas con influencers.",
  },
  "carbon-tracker": {
    description:
      "Un registro de actividad física con enfoque local-first que también calcula las emisiones de CO₂ que ahorras según cómo te desplazas.",
    about:
      "CarbonTracker registra tu actividad, tus trayectos y los medios de transporte, calcula las emisiones y el ahorro, y mantiene en tu dispositivo los datos de actividad física, ubicación y trayectos. Es compatible con Health Connect / HealthKit y Wear OS, y tiene en desarrollo una app complementaria para reloj.",
  },
  "carbon-footprint": {
    description:
      "Herramientas que muestran la huella de carbono de las decisiones cotidianas: una extensión para mapas, una API, una app móvil y asistentes de voz.",
    about:
      "La familia Carbon Footprint nació como una extensión de navegador que muestra las emisiones en servicios de mapas y creció hasta incluir una API universal de emisiones, una app en React Native, una skill para Amazon Alexa y una acción para Google Assistant.",
  },
  pictopy: {
    description:
      "Una galería de fotos de escritorio centrada en la privacidad, con agrupación de caras en el dispositivo, detección de objetos y búsqueda inteligente.",
    about:
      "PictoPy lleva la gestión moderna de fotos con IA a tu propio equipo, sin subir nada a la nube. Desarrollado con Tauri, React, Rust y un backend en Python, agrupa las caras de toda tu biblioteca, etiqueta las fotos con los objetos detectados y te permite buscar con palabras corrientes, totalmente sin conexión.",
  },
  smartnotes: {
    description:
      "Una app de escritorio centrada en la privacidad para la gestión del conocimiento personal, con búsqueda semántica local y RAG.",
    about:
      "Smart Notes combina un editor de Markdown con búsqueda vectorial local y modelos de lenguaje que se ejecutan en el dispositivo, para que puedas hacer preguntas sobre tus notas y descubrir conexiones entre ideas, sin conexión de forma predeterminada.",
  },
  moveyourbody: {
    description:
      "Una app de ejercicio centrada en la privacidad y que funciona en el dispositivo, con microentrenamientos breves que se adaptan a tus comentarios.",
    about:
      "MoveYourBody programa dos o tres sesiones de 5 a 7 minutos al día y adapta los ejercicios a tus comentarios y a tu estado de salud mediante filtrado basado en reglas y una comparación semántica ligera, todo ello totalmente sin conexión.",
  },
  babynest: {
    description:
      "Un planificador inteligente del embarazo que registra las citas prenatales y ofrece recomendaciones basadas en IA.",
    about:
      "BabyNest ayuda a los futuros padres a organizarse con un seguimiento de citas por trimestre, avisos sanitarios específicos de cada país y orientación personalizada.",
  },
  docpilot: {
    description:
      "Una app de historia clínica electrónica que graba, transcribe y analiza las conversaciones entre médico y paciente con IA conversacional.",
    about:
      "DocPilot ayuda a los profesionales sanitarios a agilizar la documentación: transcribe las consultas en tiempo real y genera resúmenes de la conversación y sugerencias de prescripción.",
  },
  neurotrack: {
    description:
      "Una plataforma asistida por IA que apoya la detección y el seguimiento de trastornos del neurodesarrollo como el TEA y el TDAH.",
    about:
      "NeuroTrack automatiza las evaluaciones de cribado preliminares y pone en contacto a los pacientes con terapeutas cualificados a través de dos apps dedicadas, una para pacientes y otra para terapeutas, lo que agiliza la evaluación, las consultas y la gestión de la terapia.",
  },
  "ai-keyboard": {
    description: "Un teclado impulsado por IA para dispositivos móviles.",
  },
  "open-verifiable-llm": {
    description:
      "LLM totalmente abiertos, con pesos y datos abiertos, cuyo entrenamiento puede verificarse de forma independiente y que se ejecutan localmente.",
  },
  "identity-tokens": {
    description:
      "Tokens de identidad autoemitidos basados en NFT que cualquiera puede avalar, para construir una red de confianza on-chain.",
    about:
      "Piensa en ellos como un pasaporte que te emites a ti mismo, sin necesidad de gobiernos, instituciones ni intermediarios. Los tokens de identidad pueden incluir metadatos opcionales, y otros titulares de tokens pueden avalarlos on-chain.",
  },
  tnt: {
    description:
      "Trust Network Tokens: un framework ERC-721 de tokens intransferibles para emitir y revocar credenciales de confianza verificables.",
    about:
      "Las organizaciones despliegan su propio contrato TNT a través de una fábrica, emiten tokens a los usuarios, pueden revocarlos si lo desean y mantienen un registro de relaciones de confianza verificable en la cadena.",
  },
  "agora-blockchain": {
    description:
      "Elecciones a prueba de manipulaciones que llevan a la cadena los algoritmos de votación de Agora.",
    about:
      "Agora Blockchain traslada a contratos inteligentes algoritmos de recuento de votos como Borda, IRV y Oklahoma, de modo que las papeletas no puedan ser alteradas por administradores, atacantes ni nadie con acceso a la base de datos.",
  },
  agora: {
    description:
      "Una biblioteca de algoritmos para el recuento de votos en elecciones, con interfaces web, móviles y para Slack.",
    about:
      "Agora implementa decenas de métodos de recuento de votos en Scala, desde variantes de Aprobación, Borda y Condorcet hasta el sistema STV que se utiliza en el Territorio de la Capital Australiana, junto con una API REST, un frontend web, apps para Android e iOS y una integración con Slack (Slagora).",
  },
  orgexplorer: {
    description:
      "Un panel intuitivo, que funciona solo en el navegador, para explorar grandes organizaciones de GitHub.",
    about:
      "OrgExplorer representa las relaciones entre repositorios, las redes de colaboradores, las tendencias de actividad y la distribución de tecnologías, y señala los riesgos de bus factor. Se ejecuta íntegramente en el navegador sobre la API REST de GitHub, sin backend.",
  },
  gitcord: {
    description:
      "Automatización Discord ↔ GitHub con enfoque local-first que planifica de forma determinista los cambios de roles y las asignaciones de issues.",
    about:
      "Gitcord lee la actividad de GitHub y el estado de Discord y genera planes revisables para actualizar roles y asignaciones en GitHub. Los modos de simulación y de observación generan informes de auditoría sin modificar nada, y un bot de Discord ofrece comandos de barra para vincular identidades.",
  },
  "devr-ai": {
    description:
      "Un asistente de Developer Relations impulsado por IA para comunidades de código abierto en Discord y GitHub.",
    about:
      "Basado en una arquitectura de agentes con LangGraph, Devr.AI apoya a los colaboradores, agiliza su incorporación y ofrece actualizaciones del proyecto en tiempo real, lo que reduce la carga de trabajo de los mantenedores y mejora la experiencia de los colaboradores.",
  },
  skills: {
    description:
      "Gobernanza de IA con enfoque local-first para grandes organizaciones: skills de agentes compartidas, un bot de preguntas y respuestas en Discord y un panel de análisis de fusión de PR.",
    about:
      "El ecosistema Skills mantiene las contribuciones asistidas por IA ancladas al contexto de cada repositorio. Centraliza las skills y reglas de agentes de toda la organización, ejecuta SkillBot para responder en Discord a las preguntas de los colaboradores usando skills específicas de cada repositorio, y ofrece un panel que agrupa semánticamente los pull requests para planificar el orden de fusión y detectar conflictos.",
  },
  "ell-ena": {
    description:
      "Una product manager con IA que gestiona tareas, tickets y notas de reuniones a través de una sencilla interfaz de chat.",
    about:
      "Ell-ena crea tickets, recoge las transcripciones de las reuniones y conserva todo el contexto de tus proyectos, para que los equipos puedan gestionar su trabajo simplemente hablando con ella.",
  },
  codingagent: {
    description:
      "Un agente de programación de línea de comandos, de código abierto e independiente del modelo, con memoria persistente e integración con Git y MCP.",
    about:
      "CodingAgent funciona con cualquier LLM, en la nube o local, que se cambia con una sola línea de configuración. Conserva memoria a corto plazo, a largo plazo y por proyecto entre sesiones, y es lo bastante ligero para flujos de trabajo de ingeniería reales.",
  },
  websift: {
    description:
      "Convierte páginas web a formatos listos para que los procesen los modelos de lenguaje.",
  },
  bringyourownkey: {
    description:
      "Una biblioteca independiente del framework que permite a los usuarios aportar sus propias claves de API de LLM a tu app, sin necesidad de proxy.",
    about:
      "Un widget en el navegador recoge la clave y la guarda localmente, y una función auxiliar en el backend la lee de las cabeceras de la petición, de modo que la arquitectura actual de tu frontend y tu backend se mantiene exactamente igual.",
  },
  autoinitialissues: {
    description:
      "Una GitHub Action que crea en los repositorios nuevos issues iniciales bien definidas, a partir de bancos predefinidos o generadas con IA.",
  },
  "idb-backup": {
    description:
      "Una biblioteca ligera en TypeScript para hacer copias de seguridad de bases de datos IndexedDB y restaurarlas como JSON que conserva los tipos.",
  },
  bene: {
    description:
      "Un protocolo de recaudación de fondos sin necesidad de confianza: los proyectos solo acceden a los fondos si alcanzan su objetivo, y quienes financian reciben tokens de Proof-of-Funding.",
    about:
      "Los responsables del proyecto crean una bóveda de financiación con un tipo de cambio, un objetivo mínimo de financiación y una fecha límite. Quienes aportan fondos reciben tokens de prueba de financiación; si el objetivo no se alcanza a tiempo, pueden recuperar su dinero. Bene funciona en cadenas EVM y en Ergo, con una interfaz que se ejecuta completamente en el cliente.",
  },
  "orb-oracle": {
    description:
      "Oráculos descentralizados: explora fuentes de datos, envía valores y despliega oráculos base o compuestos on-chain.",
    about:
      "Orb Oracle permite a cualquiera lanzar oráculos base respaldados por gobernanza o componer otros nuevos a partir de fuentes existentes, con intervalos de precios ponderados por tiempo registrados en la cadena. El servicio Poster automatiza el envío de valores desde fuentes como Chainlink, Pyth o APIs REST, y el protocolo se ha formalizado en el asistente de demostración Rocq.",
  },
  windmill: {
    description:
      "Una plataforma de intercambio on-chain basada en subastas, en la que bots keeper emparejan las órdenes siguiendo curvas de precios dinámicas.",
    about:
      "En lugar de un libro central de órdenes limitadas, Windmill almacena las órdenes de compra y venta en la cadena y deja que keepers autónomos las emparejen a medida que evolucionan las curvas de precios de subasta holandesa. Los keepers obtienen recompensas por emparejar órdenes y todas las liquidaciones se realizan de forma atómica en la cadena.",
  },
  maelstrom: {
    description:
      "Un protocolo de liquidez descentralizado para tokens ERC-20 con curvas de precios de compra y venta personalizables.",
  },
  "hammer-auction-house": {
    description:
      "Una plataforma de subastas descentralizada que admite subastas inglesas, holandesas, de pago total y de Vickrey para NFT y tokens.",
  },
  hodlcoin: {
    description:
      "Bóvedas de staking autoestabilizadoras cuyo precio, según está demostrado matemáticamente, siempre aumenta.",
    about:
      "Cualquiera puede crear una bóveda de staking de hodlCoin para un token ERC-20. Las comisiones por retirar el staking recompensan a los creadores de la bóveda y a quienes mantienen su staking a largo plazo, y hay implementaciones para cadenas EVM y Ergo.",
  },
  karma: {
    description:
      "Pools de predicción descentralizados con oráculos internos.",
  },
  fairfund: {
    description:
      "Financiación impulsada por la comunidad: despliega bóvedas, deposita fondos, vota propuestas y distribuye los fondos de forma transparente.",
  },
  bountiful: {
    description:
      "Financia el desarrollo mediante la competición abierta: las recompensas solo se liberan cuando un problema se resuelve de forma verificable.",
  },
  raindrop: {
    description:
      "Una plataforma descentralizada de distribución de tokens para airdrops y reclamaciones de tokens.",
  },
  clowder: {
    description:
      "Crea y gestiona Contribution Accounting Tokens (CAT) que registran las aportaciones de valor dentro de organizaciones descentralizadas.",
  },
  xops: {
    description:
      "Un motor de transferencia de valor nativo de CI/CD, distribuido como GitHub Action: los PR fusionados se convierten en pagos firmados on-chain.",
    about:
      "Un evento del repositorio, como la fusión de un pull request, genera una intención de pago; una persona la firma, el flujo de trabajo la liquida en la cadena y publica el recibo. Se ejecuta en tu propia CI, no necesita ningún servidor gestionado por el proyecto y, por defecto, funciona en un modo de simulación seguro.",
  },
  walletlink: {
    description:
      "Una forma gratuita e independiente de servicios SaaS de conectar frontends a carteras EVM, y un sustituto directo de las soluciones basadas en WalletConnect.",
  },
  vouchme: {
    description:
      "Un sistema de testimonios basado en blockchain para construir una reputación transparente y verificable.",
  },
  treee: {
    description:
      "Documenta plantaciones de árboles, acúñalas como NFT y explora en un mapa las iniciativas verdes cercanas.",
    about:
      "La app móvil y los contratos en Solidity de Treee ofrecen verificación on-chain de los árboles plantados, gestión de organizaciones y emisión de NFT, para un seguimiento de la sostenibilidad transparente y auditable.",
  },
  plaza: {
    description:
      "Un centro de coordinación on-chain basado en mapas para crear proyectos de impacto vinculados a una ubicación y contribuir a ellos.",
  },
  "stable-viewpoints": {
    description:
      "Una publicación independiente con artículos bien documentados sobre cómo la tecnología puede aportar estabilidad al mundo.",
  },
  scavenger: {
    description:
      "Un demostrador automático de teoremas para lógica de primer orden basado en el cálculo de resolución de conflictos.",
  },
  skeptik: {
    description:
      "Algoritmos para comprimir demostraciones formales generadas por solucionadores SAT/SMT y demostradores automáticos de teoremas.",
  },
  sensala: {
    description:
      "Un framework de semántica dinámica para el procesamiento del lenguaje natural.",
  },
  "computational-philosophy": {
    description:
      "Formalizaciones asistidas por ordenador de pruebas ontológicas en Coq, Isabelle y demostradores automáticos de teoremas.",
  },
};

export default es;
