import type { ProjectText } from "./types";

/** Simplified Chinese project text, keyed by project slug. */
const zh: Record<string, ProjectText> = {
  resonate: {
    description: "一个开源、社区驱动的社交语音平台，类似 Clubhouse 或 Twitter Spaces。",
    about: "Resonate 以语音为社交互动的核心：提供用于讨论和活动的实时语音房间、随机配对聊天以及语音通话。其 Flutter 应用由 Appwrite 云函数提供后端支持，并借助 LiveKit 实现实时音频。",
  },
  rein: {
    description: "一款跨平台、基于局域网的远程输入控制器，配有适用于触屏和非触屏设备的浏览器客户端。",
    about: "Rein 在桌面端运行服务器，局域网内的任何设备都可以通过网页浏览器对其进行控制，无需安装原生客户端。它支持远程输入、实时屏幕串流、文件传输以及多个客户端同时连接。",
  },
  ogh: {
    description: "一款本地优先的 Android 应用，可将摄像头或屏幕画面同时直播到多个 RTMP/RTMPS 目标地址。",
    about: "Ogh 采集屏幕或摄像头画面，混合所选音频，只需编码一次即可推流到一个或多个 RTMP 目标地址，并集成了 YouTube 和 Twitch。它没有广告、数据分析、水印、账户或托管的媒体中继，也无需 Google Play 服务即可运行。名称源自梵语 ogha，意为“水流”或“连绵不断的流动”。",
  },
  thrubox: {
    description: "一个极简、可自托管的中继服务器，充当加密信箱，并附带零依赖的客户端 SDK。",
    about: "ThruBox 服务器在用户之间存储和中继不透明的加密数据。由于所有加密都在客户端完成，服务器永远看不到明文。它以单个二进制文件发布，内嵌 SQLite，支持可配置的消息 TTL、速率限制以及可选的 API 密钥认证。TypeScript 客户端 SDK 可在 Node.js 和浏览器中使用。",
  },
  openpeerchat: {
    description: "点对点即时通讯，通过附近的设备中继消息，而不依赖中央服务器。",
    about: "OpenPeerChat 致力于实现私密、抗审查的通信，即使没有互联网连接也能正常工作，适用于偏远地区或受灾地区。消息会在附近设备之间逐跳传递，直至送达目的地。项目提供 Flutter 和 React Native 两种实现。",
  },
  perspective: {
    description: "分析您的新闻或社交信息流，并呈现来自可靠来源、可信的不同观点。",
    about: "Perspective 旨在打破个性化内容算法造成的信息茧房。它会在您阅读的内容旁边展示论证充分的不同观点和最新事实，帮助您进行批判性思考。",
  },
  "social-street-smart": {
    description: "一款浏览器扩展，通过标记辱骂性语言、假新闻、标题党和恶意网站，让互联网更安全。",
    about: "Social Street Smart 结合了 Chrome 扩展、Python API 以及预训练模型，可检测标题党、仇恨言论和假新闻，识别图片类虚假信息，并检查网站信誉。",
  },
  monumento: {
    description: "一款集成 AR 的社交应用，可打卡、探索和分享世界各地的标志性地标。",
    about: "Monumento 让旅行者和历史爱好者可以在古迹打卡，通过 AR 探索著名景点，并结识同样热爱文化遗产的朋友。基于 Flutter 和 Appwrite 构建。",
  },
  socialsharebutton: {
    description: "一个轻量、零依赖的社交分享组件，适用于任何 Web 框架。",
    about: "SocialShareButton 支持 WhatsApp、Facebook、X、LinkedIn、Telegram、Reddit、电子邮件、Pinterest 和 Discord，能自动识别当前页面的 URL 和标题，并可用于 React、Preact、Next.js、Qwik、Vue、Angular 或纯 HTML。",
  },
  crowdalert: { description: "一款众包应用，用于报告和查看世界各地发生的事件。" },
  eduaid: {
    description: "一款 AI 工具，可根据任意教育内容自动生成简短测验。",
    about: "在 YouTube 和慕课上自学的人常常难以记住所学内容。EduAid 能根据输入的文本生成选择题、判断题和简答题，帮助学生复习，也帮助教师快速出题。它提供网页应用、桌面应用和浏览器扩展三种形式。",
  },
  debateai: {
    description: "一个实时辩论平台，您可以与真人对手或由大语言模型驱动的 AI 对手展开较量。",
    about: "DebateAI 通过包含开篇陈词、质询和总结陈词环节的结构化辩论，帮助人们提升沟通能力。用户可以通过 WebSockets 和 WebRTC 相互辩论，也可以与 AI 对手练习，AI 会根据您的发言调整反驳论点。",
  },
  libred: {
    description: "一个完全本地运行、容器化、由智能体驱动的平台，可将教学大纲 PDF 转化为备考资料。",
    about: "LibrEd 借助 Ollama 调用本地大语言模型，从原始教学大纲 PDF 中抓取、分类并生成学习资料。所有处理都在您的设备上完成，无需外部 API 或云服务，整个系统通过 Docker Compose 运行。",
  },
  minichain: { description: "一个面向教育、研究与创新的极简区块链。" },
  "mind-the-word": {
    description: "一款浏览器扩展，在您访问的每个网页上翻译少量单词，帮助您学习一门新语言。",
    about: "由于每个页面只翻译少数几个单词，其含义很容易通过上下文推断出来，让您在用母语浏览网页的同时自然而然地积累词汇。",
  },
  starcross: { description: "一款天文应用，可根据您的实际位置观赏恒星、行星和星座。" },
  "aossie-scholar": { description: "一款 Chrome 扩展，可根据研究人员的 Google Scholar 个人资料计算其学术表现指标。" },
  djed: {
    description: "一个经过形式化验证、以加密资产为抵押的自主稳定币协议。",
    about: "Djed 通过双币设计维持稳定币锚定：StableCoin 追踪目标价格，ReserveCoin 为其提供支撑并吸收波动。Djed Alliance 负责维护 Solidity 合约、网页仪表板，以及将价格上链的预言机合约和链下推送服务。",
  },
  stablepay: {
    description: "一个完全去中心化、纯客户端运行的组件，用于接收加密货币和稳定币付款。",
    about: "嵌入网站后，StablePay 组件直接与智能合约交互，无需任何中间服务器。顾客可以使用链上原生加密货币或以其为抵押的稳定币付款，两者之间可自动兑换。商家仪表板会显示已收到的付款。",
  },
  gluon: {
    description: "一个以加密资产为抵押的自主稳定币协议，将储备资产拆分为稳定代币和波动代币。",
    about: "Gluon 的设计灵感源自核物理：通过“裂变”将现有储备资产拆分为稳定的“中子”和波动的“质子”，再通过“聚变”将二者重新合并。它在 EVM 链、Ergo 和 Solana 上均有实现，并提供 SDK 以及在 Rocq（Coq）证明器中的形式化。",
  },
  fate: {
    description: "去中心化的永续预测池，用户可在其中买卖 bullCoin 和 bearCoin。",
    about: "Fate 以双金库设计取代订单簿，让用户在永不到期、全天候运行的市场中押注价格走势。它运行于 EVM 链、Sui 和 Solana，价格数据来自多个预言机提供方。",
  },
  tectonic: { description: "一个面向 EVM 链的稳定币协议，配有网页界面，可浏览部署情况、EquityCoin 并发起赎回。" },
  chainvoice: {
    description: "一个去中心化的开票平台，可在链上创建、管理和支付防篡改的发票。",
    about: "Chainvoice 利用兼容 EVM 的智能合约自动化发票付款流程，减少对中介机构的依赖。用户可以创建发票、管理付款，并透明地追踪交易记录。",
  },
  zplit: {
    description: "一款隐私优先的移动应用，用于分摊群组开销，支持离线使用和点对点同步。",
    about: "Zplit 无需中央服务器即可完成开销记录、群组管理和债务计算。数据保存在您的设备上，并通过 Wi-Fi Direct、蓝牙或 NFC 进行点对点同步。",
  },
  supportusbutton: {
    description: "一个可配置的极简“支持我们”组件，可在任何前端展示赞助方。",
    about: "SupportUsButton 提供按赞助等级划分、带有标志和链接的赞助方布局，内置多种主题并采用 Tailwind CSS 样式，让您轻松为任何项目添加专业的支持页面。",
  },
  "inpact-ai": {
    description: "一个 AI 驱动的平台，通过数据洞察连接内容创作者、品牌和代理机构。",
    about: "InPactAI 利用生成式 AI、受众分析和互动指标，为创作者匹配相关赞助，帮助创作者找到受众互补的合作伙伴，并帮助品牌衡量网红营销活动的回报。",
  },
  "carbon-tracker": {
    description: "一款本地优先的健身追踪应用，还能记录您通过出行方式减少的二氧化碳排放。",
    about: "CarbonTracker 记录运动、行程和交通方式，计算碳排放及减排量，并将健身、位置和行程数据保存在您的设备上。它支持 Health Connect / HealthKit 和 Wear OS，配套的手表应用正在开发中。",
  },
  "carbon-footprint": {
    description: "一系列揭示日常选择碳足迹的工具：地图扩展、API、移动应用和语音助手。",
    about: "Carbon Footprint 系列最初是一款在地图服务中显示碳排放的浏览器扩展，后来逐步发展出通用碳排放 API、React Native 应用、Amazon Alexa 技能以及 Google Assistant 动作。",
  },
  pictopy: {
    description: "一款隐私优先的桌面相册应用，支持本地人脸聚类、物体检测和智能搜索。",
    about: "PictoPy 将现代 AI 照片管理带到您自己的电脑上，无需上传到云端。它基于 Tauri、React、Rust 和 Python 后端构建，可在整个图库中对人脸进行分组，用检测到的物体为照片打标签，并支持用日常语言搜索，全程离线。",
  },
  smartnotes: {
    description: "一款注重隐私的个人知识管理桌面应用，支持本地语义搜索和 RAG。",
    about: "Smart Notes 将 Markdown 编辑器与本地向量搜索和端侧语言模型相结合，让您可以就自己的笔记提问，发现不同想法之间的联系，默认离线运行。",
  },
  moveyourbody: {
    description: "一款隐私优先、在设备端运行的健身应用，提供可根据您的反馈调整的简短微锻炼。",
    about: "MoveYourBody 每天安排两到三次 5 到 7 分钟的锻炼，并通过基于规则的筛选和轻量级语义匹配，根据您的反馈和健康状况调整动作，全程离线。",
  },
  babynest: {
    description: "一款智能孕期规划应用，可追踪产检预约并提供 AI 驱动的建议。",
    about: "BabyNest 通过按孕期阶段划分的预约追踪、针对不同国家的医疗提醒和个性化指导，帮助准父母把一切安排得井井有条。",
  },
  docpilot: {
    description: "一款电子病历应用，借助对话式 AI 记录、转写和分析医患对话。",
    about: "DocPilot 帮助医疗服务提供者简化文书工作：它能实时转写问诊内容，并生成对话摘要和处方建议。",
  },
  neurotrack: {
    description: "一个 AI 辅助平台，支持自闭症谱系障碍（ASD）和注意缺陷多动障碍（ADHD）等神经发育疾病的筛查与管理。",
    about: "NeuroTrack 可自动完成初步筛查评估，并通过两款专用应用（分别面向患者和治疗师）将患者与合格的治疗师联系起来，简化评估、问诊和治疗管理流程。",
  },
  "ai-keyboard": { description: "一款面向移动设备的 AI 驱动键盘。" },
  "open-verifiable-llm": { description: "完全开放、开放权重、开放数据的大语言模型，其训练过程可被独立验证，并可在本地运行。" },
  "identity-tokens": {
    description: "基于 NFT、自行签发的身份代币，任何人都可以为其背书，从而在链上构建信任网络。",
    about: "可以把它看作一本由您自己签发的护照，无需政府、机构或中间人参与。身份代币可以携带可选的元数据，其他代币持有者可以在链上为其担保。",
  },
  tnt: {
    description: "Trust Network Tokens：一个不可转让的 ERC-721 框架，用于签发和撤销可验证的信任凭证。",
    about: "各组织通过工厂合约部署自己的 TNT 合约，向用户签发代币，并可选择撤销，同时维护一份可在链上验证的信任关系登记册。",
  },
  "agora-blockchain": {
    description: "防篡改的选举系统，将 Agora 的投票算法搬到链上。",
    about: "Agora Blockchain 将 Borda、IRV 和 Oklahoma 等计票算法部署到智能合约上，使选票无法被管理员、攻击者或任何能访问数据库的人篡改。",
  },
  agora: {
    description: "一个用于选举计票的算法库，提供网页、移动端和 Slack 前端。",
    about: "Agora 用 Scala 实现了数十种计票方法，涵盖 Approval、Borda 和 Condorcet 的各种变体，以及澳大利亚首都领地采用的 STV 制度，并配有 REST API、网页前端、Android 和 iOS 应用以及 Slack 集成（Slagora）。",
  },
  orgexplorer: {
    description: "一个直观、纯浏览器运行的仪表板，用于探索大型 GitHub 组织。",
    about: "OrgExplorer 可呈现仓库之间的关系、贡献者网络、活动趋势和技术分布，并标记巴士因子风险。它完全在浏览器中基于 GitHub REST API 运行，无需后端。",
  },
  gitcord: {
    description: "本地优先的 Discord ↔ GitHub 自动化工具，以确定性的方式规划角色变更和议题分配。",
    about: "Gitcord 读取 GitHub 活动和 Discord 状态，然后生成可供审阅的角色更新和 GitHub 分配计划。试运行模式和观察者模式可以在不做任何更改的情况下生成审计报告，Discord 机器人则提供用于身份关联的斜杠命令。",
  },
  "devr-ai": {
    description: "一款 AI 驱动的开发者关系助手，服务于 Discord 和 GitHub 上的开源社区。",
    about: "Devr.AI 基于 LangGraph 智能体架构构建，为贡献者提供支持，简化新人入门流程，并实时推送项目动态，在减轻维护者工作负担的同时提升贡献者体验。",
  },
  skills: {
    description: "面向大型组织的本地优先 AI 治理方案：共享的智能体技能、Discord 问答机器人和 PR 合并分析仪表板。",
    about: "Skills 生态系统确保 AI 辅助的贡献始终立足于各个仓库的上下文。它集中管理全组织范围的智能体技能和规则，运行 SkillBot 利用特定仓库的技能在 Discord 中解答贡献者的问题，并提供一个按语义对拉取请求进行聚类的仪表板，用于规划合并顺序和发现冲突。",
  },
  "ell-ena": {
    description: "一位 AI 产品经理，通过简单的聊天界面处理任务、工单和会议纪要。",
    about: "Ell-ena 可以创建工单、记录会议转录内容，并掌握项目的完整上下文，团队只需与它对话即可管理工作。",
  },
  codingagent: {
    description: "一款开源、不绑定特定模型的命令行编程智能体，具备持久记忆，并集成 Git 和 MCP。",
    about: "CodingAgent 适用于任何大语言模型，无论是云端还是本地模型，只需修改一行配置即可切换。它可以跨会话保留短期、长期和按项目划分的记忆，同时足够轻量，能够胜任真实的工程工作流。",
  },
  websift: { description: "将网页转换为可直接供语言模型使用的格式。" },
  bringyourownkey: {
    description: "一个与框架无关的库，让用户为您的应用提供自己的大语言模型 API 密钥，无需代理。",
    about: "浏览器端组件负责收集并在本地存储密钥，后端只需一个辅助函数即可从请求头中读取密钥，因此您现有的前后端架构完全无需改动。",
  },
  autoinitialissues: { description: "一个 GitHub Action，可从预设题库或借助 AI 生成，为新仓库自动创建定义清晰的入门议题。" },
  "idb-backup": { description: "一个轻量级 TypeScript 库，可将 IndexedDB 数据库备份和恢复为保留类型信息的 JSON。" },
  bene: {
    description: "一个无需信任的筹款协议：项目只有在达成目标后才能动用资金，出资者会获得 Proof-of-Funding 代币。",
    about: "项目方创建一个筹款金库，设定兑换比率、最低筹款目标和截止日期。出资者会获得出资证明代币；如果未能按时达成目标，他们可以取回资金。Bene 运行于 EVM 链和 Ergo 之上，界面完全在客户端运行。",
  },
  "orb-oracle": {
    description: "去中心化预言机：浏览数据源、提交数据，并在链上部署基础预言机或组合预言机。",
    about: "Orb Oracle 让任何人都可以发布由治理机制支撑的基础预言机，或基于现有数据源组合出新的预言机，并在链上追踪时间加权的价格区间。Poster 服务可自动从 Chainlink、Pyth 或 REST API 等来源提交数据，该协议已在 Rocq 证明器中完成形式化。",
  },
  windmill: {
    description: "一个基于拍卖的链上交易所，由守护机器人沿动态定价曲线撮合订单。",
    about: "Windmill 不使用中心化的限价订单簿，而是将买卖订单存储在链上，随着荷兰式拍卖价格曲线的变化，由自主运行的守护者进行撮合。守护者可获得撮合奖励，所有结算均在链上以原子方式完成。",
  },
  maelstrom: { description: "一个面向 ERC-20 代币的去中心化流动性协议，支持自定义买入和卖出定价曲线。" },
  "hammer-auction-house": { description: "一个去中心化拍卖平台，支持针对 NFT 和代币的英式、荷兰式、全员支付式和维克里拍卖。" },
  hodlcoin: {
    description: "自我稳定的质押金库，其价格经数学证明始终只涨不跌。",
    about: "任何人都可以为 ERC-20 代币创建 hodlCoin 质押金库。解除质押的手续费会奖励给金库创建者和长期质押者，项目在 EVM 链和 Ergo 上均有实现。",
  },
  karma: { description: "内置预言机的去中心化预测池。" },
  fairfund: { description: "社区驱动的资金筹集：部署金库、存入资金、对提案投票，并透明地分配资金。" },
  bountiful: { description: "通过公开竞争资助开发：只有在问题被可验证地解决后，才会发放悬赏奖励。" },
  raindrop: { description: "一个用于空投和代币领取的去中心化代币分发平台。" },
  clowder: { description: "创建和管理贡献记账代币（CAT），用于追踪去中心化组织内部的价值贡献。" },
  xops: {
    description: "一个原生于 CI/CD 的价值转移引擎，以 GitHub Action 形式发布：合并的 PR 会变成经过签名的链上付款。",
    about: "合并拉取请求等仓库事件会生成一个付款意向；由人工签名后，工作流在链上完成结算，并回传一张收据。它在您自己的 CI 中运行，无需项目方运营的服务器，并默认采用安全的试运行模式。",
  },
  walletlink: { description: "一种免费、不依赖 SaaS 的方式，用于将前端连接到 EVM 钱包，可直接替代基于 WalletConnect 的技术栈。" },
  vouchme: { description: "一个基于区块链的推荐评价系统，用于建立透明、可验证的声誉。" },
  treee: {
    description: "记录植树活动，将其铸造为 NFT，并在地图上探索附近的绿色环保行动。",
    about: "Treee 的移动应用和 Solidity 合约提供植树的链上验证、组织管理和 NFT 发行功能，实现透明、可审计的可持续发展追踪。",
  },
  plaza: { description: "一个以地图为核心的链上协作中心，用于创建和参与基于地理位置的公益影响力项目。" },
  "stable-viewpoints": { description: "一份独立刊物，刊载经过深入研究的文章，探讨技术如何为世界带来稳定。" },
  scavenger: { description: "一个基于冲突消解演算的一阶逻辑自动定理证明器。" },
  skeptik: { description: "用于压缩由 SAT/SMT 求解器和自动定理证明器生成的形式化证明的算法。" },
  sensala: { description: "一个用于自然语言处理的动态语义框架。" },
  "computational-philosophy": { description: "借助计算机，在 Coq、Isabelle 和自动定理证明器中对本体论证明进行形式化。" },
};

export default zh;
