import type { ProjectText } from "./types";

/** Hausa project text, keyed by project slug. */
const ha: Record<string, ProjectText> = {
  resonate: {
    description: "Dandalin sada zumunta ta murya mai buɗaɗɗen tushe wanda alʼumma ke tafiyarwa, kamar Clubhouse ko Twitter Spaces.",
    about: "Resonate yana sanya murya a tsakiyar muʼamalar jamaʼa: ɗakunan sauti kai tsaye don tattaunawa da taruka, hira tsakanin mutum biyu da aka haɗa bazata, da kiran murya. Manhajar Flutter tana aiki ne da Appwrite cloud functions da LiveKit don isar da sauti kai tsaye.",
  },
  rein: {
    description: "Manhajar sarrafa naʼura daga nesa ta hanyar LAN, mai aiki a tsarin aiki daban-daban, tare da manhajar burauza don naʼurorin taɓawa da waɗanda ba na taɓawa ba.",
    about: "Rein yana gudanar da sabar a kan kwamfuta, kuma yana ba kowace naʼura da ke kan hanyar sadarwa ta gida damar sarrafa ta daga burauza, ba tare da buƙatar wata manhaja ta musamman ba. Yana tallafa wa shigar da umarni daga nesa, yaɗa allon kwamfuta kai tsaye, tura fayiloli, da haɗa naʼurori da dama a lokaci guda.",
  },
  ogh: {
    description: "Manhajar Android mai fifita aiki a cikin naʼura (local-first) don yaɗa kyamara ko allon waya kai tsaye zuwa wurare da dama na RTMP/RTMPS a lokaci guda.",
    about: "Ogh yana ɗaukar allo ko kyamara, yana haɗa sautin da aka zaɓa, yana encoding sau ɗaya, sannan yana wallafawa zuwa wuri ɗaya ko fiye na RTMP, tare da haɗin YouTube da Twitch. Ba shi da tallace-tallace, bin diddigin masu amfani, alamar ruwa (watermark), asusu ko sabar tura bidiyo, kuma yana aiki ba tare da Google Play Services ba. Sunan ya samo asali ne daga kalmar Sanskrit ogha, maʼana rafi ko kwarara mai ci gaba.",
  },
  thrubox: {
    description: "Ƙaramar sabar isar da saƙo da za ka iya ɗaukar nauyinta da kanka, mai aiki kamar akwatin saƙo mai ɓoye bayanai (encrypted), tare da SDK na abokin aiki (client) mara dogaro da wasu ɗakunan karatu.",
    about: "Sabar ThruBox tana adanawa da isar da bayanai masu ɓoye (encrypted) tsakanin masu amfani. Ba ta taɓa ganin ainihin rubutun ba, domin dukkan ɓoye bayanai ana yin sa ne a ɓangaren mai amfani. Tana zuwa a matsayin fayil guda ɗaya mai ɗauke da SQLite, tare da damar saita tsawon rayuwar saƙonni (TTL), iyakance yawan buƙatu, da tantancewa ta API key idan ana so. SDK ɗin TypeScript yana aiki a Node.js da kuma a burauza.",
  },
  openpeerchat: {
    description: "Aika saƙo tsakanin naʼura da naʼura (peer-to-peer) wanda ke isar da saƙonni ta naʼurorin da ke kusa maimakon dogaro da sabar ta tsakiya.",
    about: "OpenPeerChat na da burin samar da sadarwa ta sirri wadda ba za a iya takurawa ba, kuma take ci gaba da aiki ko babu intanet, abin da ke da amfani a yankunan karkara ko waɗanda balaʼi ya shafa. Saƙonni suna tsallakawa daga wata naʼura zuwa wata da ke kusa har sai sun isa inda aka nufa. Yana da nauʼoʼin Flutter da React Native.",
  },
  perspective: {
    description: "Yana nazarin labarai ko shafukan sada zumuntarka, kuma yana gabatar da wasu raʼayoyi masu inganci daga majiyoyi amintattu.",
    about: "An tsara Perspective ne don karya ɗakunan amo (echo chambers) da algorithms masu keɓance abun ciki ke haifarwa. Yana nuna raʼayoyi daban-daban masu hujja da sahihan bayanai na zamani tare da abin da kake karantawa, domin taimaka maka yin tunani mai zurfi.",
  },
  "social-street-smart": {
    description: "Ƙarin burauza (browser extension) da ke sa intanet ya fi aminci ta hanyar gano kalaman cin zarafi, labaran ƙarya, clickbait da shafukan yanar gizo masu cutarwa.",
    about: "Social Street Smart ya haɗa ƙarin burauzar Chrome da APIs na Python da kuma samfuran AI da aka riga aka horar don gano clickbait, kalaman ƙiyayya da labaran ƙarya, da gano hotunan yaɗa bayanan ƙarya, da kuma duba sahihancin shafukan yanar gizo.",
  },
  monumento: {
    description: "Manhajar sada zumunta mai amfani da AR don ziyarta, bincika da raba shahararrun wurare na tarihi a duniya.",
    about: "Monumento yana ba matafiya da masu shaʼawar tarihi damar yin rajistar ziyara a wuraren tarihi, bincika shahararrun wurare ta AR, da haɗuwa da mutanen da ke da shaʼawa iri ɗaya a kan alʼadun gargajiya. An gina shi da Flutter da Appwrite.",
  },
  socialsharebutton: {
    description: "Ƙaramin maɓallin rabawa a kafofin sada zumunta, mara dogaro da wasu ɗakunan karatu, wanda ke aiki da kowane framework na yanar gizo.",
    about: "SocialShareButton yana tallafa wa WhatsApp, Facebook, X, LinkedIn, Telegram, Reddit, Imel, Pinterest da Discord, yana gano adireshin (URL) da taken shafin kai tsaye, kuma yana aiki da React, Preact, Next.js, Qwik, Vue, Angular ko HTML kawai.",
  },
  crowdalert: { description: "Manhaja da jamaʼa ke tafiyarwa don bayar da rahoto da duba abubuwan da ke faruwa a faɗin duniya." },
  eduaid: {
    description: "Kayan aikin AI da ke samar da gajerun tambayoyin gwaji kai tsaye daga kowane abun ciki na ilimi.",
    about: "Masu koyo da kansu a YouTube da MOOCs kan sha wahalar riƙe abin da suka kalla. EduAid yana samar da tambayoyi na zaɓi daga amsoshi, gaskiya ko ƙarya, da gajerun amsoshi daga rubutun da aka shigar, yana taimaka wa ɗalibai yin bita, malamai kuma su tsara tambayoyi cikin sauri. Ana samun sa a matsayin manhajar yanar gizo, manhajar kwamfuta da ƙarin burauza.",
  },
  debateai: {
    description: "Dandalin muhawara kai tsaye inda za ka fafata da abokan hamayya mutane ko abokan hamayya na AI masu amfani da LLM.",
    about: "DebateAI yana taimaka wa mutane su ƙara ƙwarewar sadarwa ta hanyar muhawarori masu tsari da suka ƙunshi zagayen buɗewa, tambayoyin juna da rufewa. Masu amfani za su iya yin muhawara da junansu ta WebSockets da WebRTC, ko su yi atisaye da abokan hamayya na AI waɗanda ke daidaita martaninsu da abin da ka faɗa.",
  },
  libred: {
    description: "Dandali mai aiki gaba ɗaya a cikin naʼurarka, cikin containers, wanda AI agents ke tafiyarwa, kuma yake mayar da PDF ɗin manhajar karatu (syllabus) zuwa kayan shirin jarrabawa.",
    about: "LibrEd yana ɗauko, rarrabawa da samar da kayan karatu daga PDF ɗin syllabus ta amfani da LLMs na cikin naʼura ta hanyar Ollama. Dukkan aiki yana gudana a kan kwamfutarka ba tare da APIs na waje ko dogaro da cloud ba, kuma dukkan tsarin yana aiki ta Docker Compose.",
  },
  minichain: { description: "Ƙaramin blockchain don ilimi, bincike da ƙirƙira." },
  "mind-the-word": {
    description: "Ƙarin burauza da ke taimaka maka koyon sabon harshe ta hanyar fassara ʼyan kalmomi a kowane shafin da ka ziyarta.",
    about: "Saboda ʼyan kalmomi kaɗan ne kawai ake fassarawa a kowane shafi, yana da sauƙi a gane maʼanarsu daga mahallin da suke, ta haka ake koyon sababbin kalmomi cikin sauƙi yayin da kake lilo a harshenka na asali.",
  },
  starcross: { description: "Manhajar ilimin taurari don kallon taurari, duniyoyi da ƙungiyoyin taurari bisa ainihin wurin da kake." },
  "aossie-scholar": { description: "Ƙarin burauzar Chrome da ke lissafa maʼaunan ƙwazon masu bincike daga bayanansu na Google Scholar." },
  djed: {
    description: "Ƙaʼidar stablecoin mai cin gashin kanta, wadda kuɗin crypto ke mara wa baya, kuma aka tabbatar da ingancinta ta hanyar lissafi.",
    about: "Djed yana riƙe darajar stablecoin ta hanyar tsarin kuɗi biyu: StableCoin da ke bin farashin da aka sa gaba, da ReserveCoin da ke mara masa baya tare da ɗaukar sauye-sauyen farashi. Djed Alliance ce ke kula da kwangilolin Solidity, dashboards na yanar gizo, da kwangilolin oracle da kuma sabis ɗin da ke wajen blockchain mai tura farashi zuwa kan blockchain.",
  },
  stablepay: {
    description: "Widget ɗin karɓar kuɗin crypto da stablecoin, gaba ɗaya mara cibiya, wanda ke aiki a ɓangaren mai amfani kaɗai.",
    about: "Idan aka saka widget ɗin StablePay a shafin yanar gizo, yana magana kai tsaye da smart contracts, ba tare da sabar masu shiga tsakani ba. Kwastomomi za su iya biya da kuɗin crypto na asali na blockchain ɗin ko da stablecoins da ke dogara da shi, tare da canjin kai tsaye tsakanin su biyun. Dashboard na ʼyan kasuwa yana nuna kuɗaɗen da aka karɓa.",
  },
  gluon: {
    description: "Ƙaʼidar stablecoin mai cin gashin kanta, wadda crypto ke mara wa baya, kuma take raba ajiya zuwa tokens masu tsayayyen farashi da masu sauyin farashi.",
    about: "Bisa wahayi daga kimiyyar nukiliya, Gluon yana raba wata kadara ta ajiya zuwa “neutron” mai tsayayyen farashi da “proton” mai sauyin farashi ta hanyar fission, sannan ya sake haɗa su ta hanyar fusion. Yana da nauʼoʼi a kan EVM chains, Ergo da Solana, tare da SDK da kuma tabbatarwa ta lissafi a cikin Rocq (Coq) prover.",
  },
  fate: {
    description: "Wuraren hasashe mara cibiya kuma marasa ƙarewa, inda masu amfani ke saye da sayar da bullCoins da bearCoins.",
    about: "Fate yana maye gurbin littattafan oda da tsarin taskoki biyu, domin masu amfani su yi hasashe kan yanayin farashi a kasuwa da ke buɗe koyaushe ba tare da waʼadin ƙarewa ba. Yana aiki a kan EVM chains, Sui da Solana, tare da bayanan farashi daga masu samar da oracle daban-daban.",
  },
  tectonic: { description: "Ƙaʼidar stablecoin don EVM chains, tare da shafin yanar gizo don bincika ayyukan da aka ƙaddamar, EquityCoins da kuma fara fanso (redemption)." },
  chainvoice: {
    description: "Dandalin rasit mara cibiya don ƙirƙira, sarrafawa da biyan rasit a kan blockchain ba tare da yiwuwar a yi musu kutse ba.",
    about: "Chainvoice yana amfani da smart contracts masu dacewa da EVM don sarrafa biyan rasit kai tsaye da rage dogaro da masu shiga tsakani. Masu amfani za su iya ƙirƙirar rasit, sarrafa biya da bin diddigin tarihin cinikayya a fili.",
  },
  zplit: {
    description: "Manhajar wayar hannu mai fifita sirri don raba kuɗaɗen kashewa na rukuni, mai aiki ba tare da intanet ba, da daidaita bayanai tsakanin naʼurori kai tsaye.",
    about: "Zplit yana bin diddigin kashe kuɗi, sarrafa rukuni da lissafin bashi ba tare da sabar ta tsakiya ba. Bayananka suna nan a kan naʼurarka, kuma ana daidaita su tsakanin naʼurori kai tsaye ta Wi-Fi Direct, Bluetooth ko NFC.",
  },
  supportusbutton: {
    description: "Ƙaramin maɓallin “Support Us” mai sauƙin saitawa don nuna masu ɗaukar nauyi a kowane frontend.",
    about: "SupportUsButton yana samar da tsare-tsaren nuna masu ɗaukar nauyi bisa matakai, tare da tambari da hanyoyin haɗi, jigogi da dama da aka gina a ciki, da salon Tailwind CSS, yana sauƙaƙa ƙara shafin tallafi na ƙwararru a kowane aiki.",
  },
  "inpact-ai": {
    description: "Dandali mai amfani da AI da ke haɗa masu ƙirƙirar abun ciki, kamfanoni da hukumomin talla ta hanyar fahimta da aka samo daga bayanai.",
    about: "InPactAI yana amfani da generative AI, nazarin masu kallo da maʼaunan muʼamala don haɗa masu ƙirƙirar abun ciki da tallafin da ya dace da su, taimaka musu nemo abokan aiki masu masu kallo da suka dace da nasu, da kuma taimaka wa kamfanoni auna ribar kamfen ɗin masu tasiri (influencers).",
  },
  "carbon-tracker": {
    description: "Manhajar bin diddigin motsa jiki mai fifita aiki a cikin naʼura, wadda kuma ke lissafa hayaƙin CO₂ da kake kaucewa ta hanyar yadda kake tafiya.",
    about: "CarbonTracker yana bin diddigin motsa jiki, tafiye-tafiye da hanyoyin sufuri, yana lissafa hayaƙi da abin da aka kaucewa, kuma yana ajiye bayanan lafiya, wuri da tafiye-tafiye a kan naʼurarka. Yana tallafa wa Health Connect / HealthKit da Wear OS, kuma ana haɓaka manhajar agogo mai rakiya.",
  },
  "carbon-footprint": {
    description: "Kayan aikin da ke nuna tasirin carbon na zaɓuɓɓukan yau da kullum: ƙarin burauza don taswira, API, manhajar wayar hannu da mataimakan murya.",
    about: "Iyalan Carbon Footprint sun fara ne a matsayin ƙarin burauza da ke nuna yawan hayaƙi a cikin ayyukan taswira, sannan suka bunƙasa zuwa API na hayaƙi na gama-gari, manhajar React Native, Amazon Alexa skill, da Google Assistant action.",
  },
  pictopy: {
    description: "Maʼajiyar hotuna ta kwamfuta mai fifita sirri, mai tara fuskoki, gano abubuwa da bincike mai wayo, duka a cikin naʼura.",
    about: "PictoPy yana kawo tsarin sarrafa hotuna na zamani mai amfani da AI zuwa kwamfutarka ba tare da loda hotuna zuwa cloud ba. An gina shi da Tauri, React, Rust da backend na Python, yana tara fuskoki a cikin dukkan hotunanka, yana yi wa hotuna alama da abubuwan da aka gano a cikinsu, kuma yana ba ka damar bincike da kalmomi na yau da kullum, gaba ɗaya ba tare da intanet ba.",
  },
  smartnotes: {
    description: "Manhajar kwamfuta mai kare sirri don sarrafa ilimin kai, tare da bincike bisa maʼana (semantic search) da RAG a cikin naʼura.",
    about: "Smart Notes ya haɗa editan markdown da binciken vector na cikin naʼura da samfuran harshe da ke aiki a kan naʼurarka, domin ka iya yin tambayoyi game da bayananka da gano alaƙa tsakanin raʼayoyi, ba tare da intanet ba a asali.",
  },
  moveyourbody: {
    description: "Manhajar motsa jiki mai fifita sirri mai aiki a cikin naʼura, tare da gajerun atisaye da ke daidaita kansu da raʼayinka.",
    about: "MoveYourBody yana tsara zama biyu ko uku na minti 5 zuwa 7 a kowace rana, kuma yana daidaita atisaye da raʼayinka da yanayin lafiyarka ta amfani da tacewa bisa dokoki da ƙaramin tsarin gano maʼana, duka ba tare da intanet ba.",
  },
  babynest: {
    description: "Mai tsara ciki mai hikima da ke bin diddigin ganin likita na lokacin ciki, kuma yake bayar da shawarwari masu amfani da AI.",
    about: "BabyNest yana taimaka wa iyaye masu jiran haihuwa su kasance cikin tsari, tare da bin diddigin ganin likita bisa watanni uku-uku na ciki, sanarwar kiwon lafiya ta musamman ga kowace ƙasa, da jagora na musamman.",
  },
  docpilot: {
    description: "Manhajar EMR (bayanan lafiya na lantarki) da ke naɗa, rubutawa da nazarin tattaunawar likita da mara lafiya ta amfani da AI mai tattaunawa.",
    about: "DocPilot yana taimaka wa maʼaikatan lafiya sauƙaƙa rubuce-rubucensu: yana rubuta tattaunawar ganin likita kai tsaye, kuma yana samar da taƙaitaccen bayanin tattaunawar da shawarwarin magunguna.",
  },
  neurotrack: {
    description: "Dandali mai taimakon AI da ke tallafa wa gwaji da kula da yanayin ci gaban ƙwaƙwalwa kamar ASD da ADHD.",
    about: "NeuroTrack yana sarrafa gwaje-gwajen farko kai tsaye, kuma yana haɗa marasa lafiya da ƙwararrun masu jinya ta hanyar manhajoji biyu na musamman, ɗaya don marasa lafiya ɗaya kuma don masu jinya, yana sauƙaƙa gwaji, tuntuɓa da kula da jinya.",
  },
  "ai-keyboard": { description: "Madannin rubutu mai amfani da AI don naʼurorin hannu." },
  "open-verifiable-llm": { description: "LLMs buɗaɗɗu gaba ɗaya, masu buɗaɗɗun weights da buɗaɗɗun bayanai, waɗanda za a iya tabbatar da horonsu da kansu, kuma suke aiki a cikin naʼura." },
  "identity-tokens": {
    description: "Tokens na shaidar mutum bisa NFT da mutum ke bayarwa da kansa, waɗanda kowa zai iya tabbatarwa, don gina tsarin amana a kan blockchain.",
    about: "Ka ɗauke shi kamar fasfo da kake bai wa kanka, ba tare da buƙatar gwamnati, cibiya ko mai shiga tsakani ba. Tokens na shaida za su iya ɗaukar ƙarin bayanai idan ana so, kuma sauran masu tokens za su iya tabbatar da su a kan blockchain.",
  },
  tnt: {
    description: "Trust Network Tokens: tsarin ERC-721 da ba a iya mikawa ga wani, don bayarwa da soke takardun shaidar amana da za a iya tabbatarwa.",
    about: "Ƙungiyoyi suna ƙaddamar da kwangilar TNT tasu ta hanyar factory, suna bai wa masu amfani tokens, suna iya soke su idan suka so, kuma suna riƙe rajistar alaƙar amana da za a iya tabbatarwa a kan blockchain.",
  },
  "agora-blockchain": {
    description: "Zaɓuɓɓuka da ba za a iya yi musu maguɗi ba, masu kawo algorithms na ƙidayar ƙuriʼa na Agora kan blockchain.",
    about: "Agora Blockchain yana ɗora algorithms na ƙidayar ƙuriʼa kamar Borda, IRV da Oklahoma a kan smart contracts, domin kada masu gudanarwa, maharan intanet ko duk wanda ke da damar shiga rumbun bayanai su iya sauya ƙuriʼu.",
  },
  agora: {
    description: "Ɗakin karatu na algorithms don ƙidayar ƙuriʼu a zaɓe, tare da manhajojin yanar gizo, wayar hannu da Slack.",
    about: "Agora yana aiwatar da hanyoyin ƙidayar ƙuriʼa masu yawa a Scala, tun daga nauʼoʼin Approval, Borda da Condorcet har zuwa tsarin STV da ake amfani da shi a Australian Capital Territory, tare da REST API, frontend na yanar gizo, manhajojin Android da iOS, da haɗin Slack (Slagora).",
  },
  orgexplorer: {
    description: "Dashboard mai sauƙin fahimta, mai aiki a burauza kaɗai, don bincika manyan ƙungiyoyin GitHub.",
    about: "OrgExplorer yana zana alaƙar maʼajiyoyi, hanyoyin sadarwar masu bayar da gudummawa, yanayin ayyuka da rarrabuwar fasahohi, kuma yana nuna haɗarin bus factor (dogaro da mutane ƙalilan), duka a cikin burauza ta amfani da REST API na GitHub ba tare da backend ba.",
  },
  gitcord: {
    description: "Sarrafa aiki kai tsaye tsakanin Discord ↔ GitHub mai fifita aiki a cikin naʼura, wanda ke tsara sauye-sauyen matsayi da rabon issues bisa tsayayyiyar hanya.",
    about: "Gitcord yana karanta ayyukan GitHub da yanayin Discord, sannan ya samar da tsare-tsaren sabunta matsayi da rabon ayyuka a GitHub waɗanda za a iya dubawa. Hanyoyin gwaji (dry-run) da na lura suna samar da rahotannin bincike ba tare da canza komai ba, kuma bot na Discord yana samar da slash commands don haɗa shaidar mutum.",
  },
  "devr-ai": {
    description: "Mataimakin Developer Relations mai amfani da AI ga alʼummomin buɗaɗɗen tushe a Discord da GitHub.",
    about: "An gina Devr.AI bisa tsarin agent na LangGraph, yana tallafa wa masu bayar da gudummawa, sauƙaƙa karɓar sababbin mambobi, da isar da sabbin bayanai kan ayyuka kai tsaye, yana rage wa masu kula da ayyuka nauyi tare da inganta ƙwarewar masu bayar da gudummawa.",
  },
  skills: {
    description: "Tsarin sarrafa AI mai fifita aiki a cikin naʼura ga manyan ƙungiyoyi: skills na agents da ake rabawa, bot na tambaya da amsa a Discord, da dashboard na nazarin haɗa PRs.",
    about: "Tsarin Skills yana tabbatar da cewa gudummawar da aka yi da taimakon AI ta dogara da mahallin kowace maʼajiya. Yana tattara skills da dokokin agents na dukkan ƙungiya wuri ɗaya, yana gudanar da SkillBot don amsa tambayoyin masu bayar da gudummawa a Discord ta amfani da skills na kowace maʼajiya, kuma yana samar da dashboard da ke rukunta pull requests bisa maʼana don tsara tsarin haɗa su da gano rikice-rikice.",
  },
  "ell-ena": {
    description: "Manajan samfur na AI da ke sarrafa ayyuka, tikiti da bayanan taro ta hanyar tattaunawa mai sauƙi.",
    about: "Ell-ena yana ƙirƙirar tikiti, yana ɗaukar rubutun taruka, kuma yana riƙe cikakken mahallin ayyukanku, domin tawaga su iya sarrafa aiki ta hanyar yin magana da shi kawai.",
  },
  codingagent: {
    description: "CLI coding agent mai buɗaɗɗen tushe, wanda baya dogara da takamaiman samfurin AI, tare da ƙwaƙwalwa mai ɗorewa da haɗin Git da MCP.",
    about: "CodingAgent yana aiki da kowane LLM, na cloud ko na cikin naʼura, wanda ake sauyawa da layi ɗaya na saiti. Yana riƙe ƙwaƙwalwa ta gajeren lokaci, ta dogon lokaci da ta kowane aiki a tsakanin zama, kuma yana da sauƙi sosai har ya dace da ayyukan injiniyanci na gaske.",
  },
  websift: { description: "Yana mayar da shafukan yanar gizo zuwa tsarin da samfuran harshe (LLMs) za su iya amfani da shi kai tsaye." },
  bringyourownkey: {
    description: "Ɗakin karatu da baya dogara da takamaiman framework, wanda ke ba masu amfani damar samar da nasu API keys na LLM ga manhajarka, ba tare da buƙatar proxy ba.",
    about: "Widget na ɓangaren burauza yana karɓa da adana key ɗin a cikin naʼura, kuma wani ɗan taimako na backend mai aiki ɗaya yana karanta shi daga headers na buƙata, ta haka tsarin frontend da backend ɗinka zai ci gaba da kasancewa yadda yake.",
  },
  autoinitialissues: { description: "GitHub Action da ke cika sababbin maʼajiyoyi da issues na farawa masu kyakkyawan bayani, daga tarin da aka riga aka shirya ko ta hanyar AI." },
  "idb-backup": { description: "Ƙaramin ɗakin karatu na TypeScript don yin ajiyar kwafi da dawo da rumbunan bayanai na IndexedDB a matsayin JSON mai kiyaye nauʼin bayanai." },
  bene: {
    description: "Ƙaʼidar tara kuɗi wadda ba ta buƙatar amana: ayyuka suna samun kuɗin ne kawai idan sun cimma burinsu, kuma masu bayar da kuɗi suna samun tokens na Proof-of-Funding.",
    about: "Masu ayyuka suna ƙirƙirar taskar tara kuɗi tare da farashin musaya, mafi ƙarancin burin kuɗi da waʼadi. Masu bayar da kuɗi suna samun tokens na shaidar bayar da kuɗi; idan ba a cimma burin cikin lokaci ba, za su iya karɓar kuɗinsu. Bene yana aiki a kan EVM chains da Ergo, tare da shafin mai amfani da ke aiki gaba ɗaya a ɓangaren mai amfani.",
  },
  "orb-oracle": {
    description: "Oracles mara cibiya: bincika hanyoyin bayanai, shigar da ƙima, da ƙaddamar da oracles na asali ko na haɗe a kan blockchain.",
    about: "Orb Oracle yana ba kowa damar ƙaddamar da oracles na asali da tsarin shugabanci ke mara wa baya, ko haɗa sababbi daga hanyoyin bayanai da ake da su, tare da bin diddigin tazarar farashi mai laʼakari da lokaci a kan blockchain. Sabis ɗin Poster yana shigar da ƙima kai tsaye daga majiyoyi kamar Chainlink, Pyth ko REST APIs, kuma an tabbatar da ƙaʼidar ta hanyar lissafi a cikin Rocq prover.",
  },
  windmill: {
    description: "Kasuwar musaya a kan blockchain bisa gwanjo, inda keeper bots ke daidaita oda bisa lanƙwasar farashi mai sauyawa.",
    about: "Maimakon littafin oda na tsakiya, Windmill yana adana odar saye da sayarwa a kan blockchain, kuma yana barin keepers masu cin gashin kansu su daidaita su yayin da lanƙwasar farashin gwanjon Dutch ke sauyawa. Keepers suna samun lada kan daidaitawa, kuma dukkan biyan kuɗi yana faruwa a kan blockchain a lokaci guda ba tare da rabuwa ba.",
  },
  maelstrom: { description: "Ƙaʼidar samar da kuɗi (liquidity) mara cibiya ga tokens na ERC-20, tare da lanƙwasar farashin saye da sayarwa da za a iya daidaitawa." },
  "hammer-auction-house": { description: "Dandalin gwanjo mara cibiya mai tallafa wa gwanjon English, Dutch, all-pay da Vickrey don NFTs da tokens." },
  hodlcoin: {
    description: "Taskokin staking masu daidaita kansu, waɗanda aka tabbatar ta hanyar lissafi cewa farashinsu koyaushe yana hauhawa.",
    about: "Kowa zai iya ƙirƙirar taskar staking ta hodlCoin don token na ERC-20. Kuɗaɗen fitar da staking suna ba da lada ga waɗanda suka ƙirƙiri taskar da masu staking na dogon lokaci, kuma akwai nauʼoʼi na EVM chains da Ergo.",
  },
  karma: { description: "Wuraren hasashe mara cibiya tare da oracles na cikin gida." },
  fairfund: { description: "Tallafin kuɗi da alʼumma ke tafiyarwa: ƙaddamar da taskoki, saka kuɗi, jefa ƙuriʼa kan shawarwari, da rarraba kuɗi a fili." },
  bountiful: { description: "Tallafa wa haɓaka manhaja ta hanyar gasa a fili: ana sakin ladan bounty ne kawai idan aka warware matsala ta hanyar da za a iya tabbatarwa." },
  raindrop: { description: "Dandalin rarraba tokens mara cibiya don airdrops da karɓar tokens." },
  clowder: { description: "Ƙirƙira da sarrafa Contribution Accounting Tokens (CATs) da ke bin diddigin gudummawar da aka bayar a cikin ƙungiyoyi mara cibiya." },
  xops: {
    description: "Injin tura daraja da aka gina cikin CI/CD, wanda ke zuwa a matsayin GitHub Action: PRs da aka haɗa suna zama biyan kuɗi da aka sanya wa hannu a kan blockchain.",
    about: "Wani abu da ya faru a maʼajiya, kamar haɗa pull request, yana samar da niyyar biyan kuɗi; mutum ya sanya mata hannu, workflow ɗin ya kammala ta a kan blockchain, sannan ya mayar da rasit. Yana aiki a cikin CI ɗinka, baya buƙatar sabar da aikin ke gudanarwa, kuma a asali yana aiki a yanayin gwaji mai aminci (dry-run).",
  },
  walletlink: { description: "Hanya kyauta, mara dogaro da SaaS, don haɗa frontends da walat na EVM, kuma madadin kai tsaye ga tsarin da ke amfani da WalletConnect." },
  vouchme: { description: "Tsarin shaidar yabo bisa blockchain don gina suna a fili wanda za a iya tabbatarwa." },
  treee: {
    description: "Rubuta bayanan dashen bishiyoyi, mayar da su NFTs, da bincika shirye-shiryen kore da ke kusa a kan taswira.",
    about: "Manhajar wayar hannu ta Treee da kwangilolin Solidity suna samar da tabbatar da bishiyoyin da aka dasa a kan blockchain, sarrafa ƙungiyoyi da bayar da NFTs, domin bin diddigin kiyaye muhalli a fili kuma cikin tsari da za a iya bincika.",
  },
  plaza: { description: "Cibiyar haɗin kai a kan blockchain wadda taswira ce ginshiƙinta, don ƙirƙira da bayar da gudummawa ga ayyukan tasiri da aka danganta da wurare." },
  "stable-viewpoints": { description: "Wallafa mai zaman kanta mai ɗauke da makaloli masu zurfin bincike kan yadda fasaha za ta iya kawo daidaito a duniya." },
  scavenger: { description: "Automated theorem prover na first-order logic bisa conflict resolution calculus." },
  skeptik: { description: "Algorithms don matsa hujjojin lissafi (formal proofs) da SAT/SMT solvers da automated theorem provers ke samarwa." },
  sensala: { description: "Tsarin dynamic semantics don sarrafa harshen ɗan adam ta kwamfuta (NLP)." },
  "computational-philosophy": { description: "Tabbatar da hujjojin ontology ta hanyar lissafi da taimakon kwamfuta a cikin Coq, Isabelle da automated theorem provers." },
};

export default ha;
