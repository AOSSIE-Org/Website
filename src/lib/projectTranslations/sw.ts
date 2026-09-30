import type { ProjectText } from "./types";

/** Swahili project text, keyed by project slug. */
const sw: Record<string, ProjectText> = {
  resonate: {
    description: "Jukwaa huria la kijamii la sauti linaloendeshwa na jumuiya, sawa na Clubhouse au Twitter Spaces.",
    about: "Resonate inaiweka sauti katikati ya mawasiliano ya kijamii: vyumba vya sauti mubashara kwa mijadala na matukio, mazungumzo ya wawili wawili ya nasibu, na simu za sauti. Programu ya Flutter inaendeshwa na cloud functions za Appwrite na LiveKit kwa sauti ya wakati halisi.",
  },
  rein: {
    description: "Kidhibiti cha kuingiza amri kwa mbali kinachofanya kazi kwenye mifumo yote kupitia LAN, chenye kiteja cha kivinjari kwa vifaa vya kugusa na visivyo vya kugusa.",
    about: "Rein huendesha seva kwenye kompyuta ya mezani na kuruhusu kifaa chochote kwenye mtandao wa ndani kuidhibiti kupitia kivinjari, bila kuhitaji programu maalum ya kiteja. Inawezesha kuingiza amri kwa mbali, kutiririsha skrini kwa wakati halisi, kuhamisha faili na viteja vingi kwa wakati mmoja.",
  },
  ogh: {
    description: "Programu ya Android inayofanya kazi kwanza kwenye kifaa, kwa kutiririsha mubashara kamera au skrini kwenda maeneo mengi ya RTMP/RTMPS kwa wakati mmoja.",
    about: "Ogh hunasa skrini au kamera, huchanganya sauti iliyochaguliwa, husimba mara moja na kuchapisha kwenda eneo moja au zaidi la RTMP, pamoja na muunganiko wa YouTube na Twitch. Haina matangazo, uchanganuzi wa matumizi, alama za maji, akaunti wala seva ya kupitisha maudhui, na inafanya kazi bila Google Play Services. Jina lake linatokana na neno la Kisanskrit ogha, lenye maana ya mkondo au mtiririko usiokatika.",
  },
  thrubox: {
    description: "Seva ndogo ya kupitisha ujumbe inayoweza kujiendeshea mwenyewe, inayofanya kazi kama sanduku la barua lililosimbwa, pamoja na SDK ya kiteja isiyo na utegemezi wowote.",
    about: "Seva ya ThruBox huhifadhi na kupitisha data iliyosimbwa kati ya watumiaji bila kujua yaliyomo. Haioni kamwe maandishi halisi, kwa kuwa usimbaji wote hufanyika upande wa kiteja. Inakuja kama faili moja inayotekelezeka yenye SQLite ndani yake, muda wa kuishi wa ujumbe unaoweza kurekebishwa, udhibiti wa kiwango cha maombi na uthibitishaji wa hiari kwa API key. SDK ya kiteja ya TypeScript inafanya kazi kwenye Node.js na vivinjari.",
  },
  openpeerchat: {
    description: "Ujumbe wa rika kwa rika unaopitishwa kupitia vifaa vilivyo karibu badala ya kutegemea seva kuu.",
    about: "OpenPeerChat inalenga mawasiliano ya faragha yasiyoweza kudhibitiwa na udhibiti wa taarifa, yanayoendelea kufanya kazi bila intaneti, jambo lenye manufaa katika maeneo ya mbali au yaliyokumbwa na maafa. Ujumbe huruka kutoka kifaa kimoja hadi kingine kilicho karibu hadi ufike unakokwenda. Ina matoleo ya Flutter na React Native.",
  },
  perspective: {
    description: "Huchambua habari au mipasho yako ya mitandao ya kijamii na kukuonyesha mitazamo mbadala inayoaminika kutoka vyanzo vya kuaminika.",
    about: "Perspective imeundwa kuvunja \"vyumba vya mwangwi\" vinavyotengenezwa na algorithm za maudhui yanayolengwa kwa mtu binafsi. Huleta mitazamo mbadala yenye hoja nzuri na ukweli wa hivi karibuni sambamba na maudhui unayosoma, ikikusaidia kufikiri kwa kina.",
  },
  "social-street-smart": {
    description: "Kiendelezi cha kivinjari kinachoifanya intaneti kuwa salama zaidi kwa kutambua lugha ya matusi, habari za uongo, clickbait na tovuti hatari.",
    about: "Social Street Smart inaunganisha kiendelezi cha Chrome na API za Python pamoja na miundo iliyofunzwa awali ya kutambua clickbait, matamshi ya chuki na habari za uongo, kutambua upotoshaji kupitia picha na kukagua sifa ya tovuti.",
  },
  monumento: {
    description: "Programu ya kijamii yenye AR ya kujisajili ulipofika, kuchunguza na kushiriki alama maarufu za dunia.",
    about: "Monumento huwawezesha wasafiri na wapenzi wa historia kujisajili kwenye makumbusho, kuchunguza maeneo maarufu kupitia AR na kuungana na watu wanaopenda urithi wa kitamaduni kama wao. Imejengwa kwa Flutter na Appwrite.",
  },
  socialsharebutton: {
    description: "Kijenzi chepesi cha kushiriki kwenye mitandao ya kijamii kisicho na utegemezi wowote, kinachofanya kazi na fremu yoyote ya wavuti.",
    about: "SocialShareButton inasaidia WhatsApp, Facebook, X, LinkedIn, Telegram, Reddit, Email, Pinterest na Discord, hutambua yenyewe URL na kichwa cha ukurasa uliopo, na inafanya kazi na React, Preact, Next.js, Qwik, Vue, Angular au HTML ya kawaida.",
  },
  crowdalert: {
    description: "Programu inayotegemea michango ya umma kwa kuripoti na kutazama matukio kote duniani.",
  },
  eduaid: {
    description: "Zana ya AI inayotengeneza yenyewe majaribio mafupi kutoka maudhui yoyote ya kielimu.",
    about: "Wanaojifunza wenyewe kupitia YouTube na MOOC mara nyingi hupata shida kukumbuka wanachotazama. EduAid hutengeneza maswali ya kuchagua jibu, ya kweli au si kweli, na ya majibu mafupi kutoka maandishi uliyoweka, ikiwasaidia wanafunzi kujirudia na walimu kuandaa maswali haraka. Inapatikana kama programu ya wavuti, programu ya kompyuta ya mezani na kiendelezi cha kivinjari.",
  },
  debateai: {
    description: "Jukwaa la mijadala ya wakati halisi ambapo unakabiliana na wapinzani binadamu au wapinzani wa AI wanaoendeshwa na LLM.",
    about: "DebateAI huwasaidia watu kunoa ujuzi wao wa mawasiliano kupitia mijadala iliyopangwa yenye awamu za ufunguzi, maswali ya kuhoji na hitimisho. Watumiaji wanaweza kujadiliana wao kwa wao kupitia WebSockets na WebRTC, au kujizoeza dhidi ya wapinzani wa AI wanaorekebisha hoja zao kulingana na unachosema.",
  },
  libred: {
    description: "Jukwaa linalofanya kazi kikamilifu kwenye kifaa chako, ndani ya kontena na linaloendeshwa na mawakala wa AI, linalogeuza PDF za mitaala kuwa nyenzo za kujiandaa na mitihani.",
    about: "LibrEd huchota, huainisha na kutengeneza nyenzo za kujifunzia kutoka PDF ghafi za mitaala kwa kutumia LLM za ndani kupitia Ollama. Uchakataji wote hufanyika kwenye kompyuta yako bila API za nje wala kutegemea wingu, na mfumo mzima huendeshwa kupitia Docker Compose.",
  },
  minichain: {
    description: "Blockchain ndogo kwa ajili ya elimu, utafiti na ubunifu.",
  },
  "mind-the-word": {
    description: "Kiendelezi cha kivinjari kinachokusaidia kujifunza lugha mpya kwa kutafsiri maneno machache kwenye kila ukurasa unaotembelea.",
    about: "Kwa kuwa ni maneno machache tu yanayotafsiriwa kwenye kila ukurasa, maana yake ni rahisi kuikisia kutokana na muktadha, hivyo msamiati hujifunzwa kwa kawaida unapovinjari kwa lugha yako ya asili.",
  },
  starcross: {
    description: "Programu ya elimu ya anga ya kutazama nyota, sayari na makundi ya nyota kulingana na mahali ulipo hasa.",
  },
  "aossie-scholar": {
    description: "Kiendelezi cha Chrome kinachokokotoa vipimo vya utendaji wa watafiti kutoka wasifu wao wa Google Scholar.",
  },
  djed: {
    description: "Itifaki ya stablecoin inayojiendesha yenyewe, inayodhaminiwa na sarafu za kidijitali na iliyothibitishwa kihisabati.",
    about: "Djed hudumisha thamani ya stablecoin kupitia muundo wa sarafu mbili: StableCoin inayofuata bei lengwa na ReserveCoin inayoidhamini na kubeba mabadiliko ya bei. Djed Alliance hutunza mikataba ya Solidity, dashibodi za wavuti, pamoja na mikataba ya oracle na huduma ya nje ya mnyororo inayoweka bei kwenye mnyororo.",
  },
  stablepay: {
    description: "Wijeti iliyogatuliwa kikamilifu, inayofanya kazi upande wa kiteja pekee, kwa kupokea malipo ya sarafu za kidijitali na stablecoin.",
    about: "Ikiwekwa kwenye tovuti, wijeti ya StablePay huwasiliana moja kwa moja na smart contract, bila seva za kati. Wateja wanaweza kulipa kwa sarafu asilia ya mnyororo au kwa stablecoin zinazodhaminiwa nayo, huku ubadilishaji kati ya hizo mbili ukifanyika wenyewe. Dashibodi ya mfanyabiashara huonyesha malipo yaliyopokelewa.",
  },
  gluon: {
    description: "Itifaki ya stablecoin inayojiendesha yenyewe na kudhaminiwa na sarafu za kidijitali, inayogawa akiba kuwa tokeni thabiti na tokeni zinazobadilika bei.",
    about: "Ikichochewa na fizikia ya nyuklia, Gluon hugawa rasilimali ya akiba iliyopo kuwa “neutron” thabiti na “proton” inayobadilika bei kupitia mgawanyiko (fission), na kuziunganisha tena kupitia muungano (fusion). Ina matoleo kwenye minyororo ya EVM, Ergo na Solana, pamoja na SDK na uthibitisho rasmi katika Rocq (Coq) prover.",
  },
  fate: {
    description: "Makundi ya utabiri yaliyogatuliwa na yasiyo na kikomo cha muda, ambapo watumiaji hununua na kuuza bullCoin na bearCoin.",
    about: "Fate inachukua nafasi ya vitabu vya oda kwa muundo wa vault mbili, ili watumiaji waweze kubashiri mwelekeo wa bei katika soko lililo wazi wakati wote bila tarehe ya mwisho. Inafanya kazi kwenye minyororo ya EVM, Sui na Solana, na hupata bei kutoka kwa watoa huduma wengi wa oracle.",
  },
  tectonic: {
    description: "Itifaki ya stablecoin kwa minyororo ya EVM, yenye kiolesura cha wavuti cha kuchunguza usambazaji, EquityCoin na kuanzisha ukombozi.",
  },
  chainvoice: {
    description: "Jukwaa la ankara lililogatuliwa kwa kuunda, kusimamia na kulipa ankara kwenye mnyororo bila uwezekano wa kughushi.",
    about: "Chainvoice hutumia smart contract zinazooana na EVM ili kuendesha kiotomatiki mtiririko wa malipo ya ankara na kupunguza utegemezi kwa wakala wa kati. Watumiaji wanaweza kuunda ankara, kusimamia malipo na kufuatilia historia ya miamala kwa uwazi.",
  },
  zplit: {
    description: "Programu ya simu inayotanguliza faragha kwa kugawana gharama za kikundi, inayofanya kazi bila mtandao na kusawazisha data rika kwa rika.",
    about: "Zplit hushughulikia ufuatiliaji wa gharama, usimamizi wa vikundi na ukokotoaji wa madeni bila seva kuu. Data hubaki kwenye kifaa chako na husawazishwa rika kwa rika kupitia Wi-Fi Direct, Bluetooth au NFC.",
  },
  supportusbutton: {
    description: "Kijenzi rahisi cha “Support Us” kinachoweza kusanidiwa, kwa kuwaonyesha wafadhili katika frontend yoyote.",
    about: "SupportUsButton hutoa mipangilio ya wafadhili kwa ngazi, yenye nembo na viungo, mandhari kadhaa zilizojengwa ndani na mitindo ya Tailwind CSS, hivyo kurahisisha kuongeza ukurasa wa kitaalamu wa kuunga mkono kwenye mradi wowote.",
  },
  "inpact-ai": {
    description: "Jukwaa linaloendeshwa na AI linalounganisha watengenezaji maudhui, chapa na mawakala kupitia maarifa yanayotokana na data.",
    about: "InPactAI hutumia AI zalishi, uchanganuzi wa hadhira na vipimo vya ushiriki ili kuwaunganisha watengenezaji maudhui na ufadhili unaowafaa, kuwasaidia kupata washirika wenye hadhira zinazokamilishana, na kuzisaidia chapa kupima faida ya kampeni za washawishi.",
  },
  "carbon-tracker": {
    description: "Kifuatiliaji cha mazoezi kinachofanya kazi kwanza kwenye kifaa, ambacho pia hufuatilia kiasi cha CO₂ unachookoa kutokana na jinsi unavyosafiri.",
    about: "CarbonTracker hufuatilia shughuli, safari na njia za usafiri, hukokotoa uzalishaji wa hewa chafu na kiasi kilichookolewa, na huhifadhi data ya mazoezi, mahali na safari kwenye kifaa chako. Inasaidia Health Connect / HealthKit na Wear OS, huku programu shirikishi ya saa ikiendelea kuundwa.",
  },
  "carbon-footprint": {
    description: "Zana zinazoonyesha athari ya kaboni ya maamuzi ya kila siku: kiendelezi cha ramani, API, programu ya simu na wasaidizi wa sauti.",
    about: "Familia ya Carbon Footprint ilianza kama kiendelezi cha kivinjari kinachoonyesha uzalishaji wa hewa chafu kwenye huduma za ramani, na ikakua kuwa API ya jumla ya uzalishaji wa hewa chafu, programu ya React Native, skill ya Amazon Alexa na action ya Google Assistant.",
  },
  pictopy: {
    description: "Matunzio ya picha ya kompyuta ya mezani yanayotanguliza faragha, yenye upangaji wa nyuso, utambuzi wa vitu na utafutaji mahiri, vyote kwenye kifaa.",
    about: "PictoPy inaleta usimamizi wa kisasa wa picha kwa AI kwenye kompyuta yako mwenyewe bila kupakia chochote kwenye wingu. Imejengwa kwa Tauri, React, Rust na backend ya Python, hupanga nyuso katika mkusanyiko wako wote, huweka lebo kwenye picha kulingana na vitu vilivyotambuliwa na hukuruhusu kutafuta kwa maneno ya kawaida, bila intaneti kabisa.",
  },
  smartnotes: {
    description: "Programu ya kompyuta ya mezani inayojali faragha kwa usimamizi wa maarifa binafsi, yenye utafutaji wa kimaana na RAG kwenye kifaa.",
    about: "Smart Notes inaunganisha kihariri cha markdown na utafutaji wa vekta wa ndani pamoja na miundo ya lugha inayofanya kazi kwenye kifaa, ili uweze kuuliza maswali kuhusu madokezo yako na kugundua uhusiano kati ya mawazo, bila intaneti kwa chaguo-msingi.",
  },
  moveyourbody: {
    description: "Programu ya mazoezi inayotanguliza faragha na kufanya kazi kwenye kifaa, yenye mazoezi mafupi yanayobadilika kulingana na maoni yako.",
    about: "MoveYourBody hupanga vipindi viwili au vitatu vya dakika 5 hadi 7 kwa siku na hurekebisha mazoezi kulingana na maoni yako na hali yako ya afya kwa kutumia uchujaji wa kanuni na ulinganishaji mwepesi wa kimaana, vyote bila intaneti kabisa.",
  },
  babynest: {
    description: "Mpangaji mahiri wa ujauzito unaofuatilia miadi ya kliniki ya wajawazito na kutoa mapendekezo yanayoendeshwa na AI.",
    about: "BabyNest huwasaidia wazazi watarajiwa kujipanga kwa ufuatiliaji wa miadi kulingana na kila kipindi cha miezi mitatu ya ujauzito, arifa za huduma za afya kulingana na nchi, na mwongozo unaomfaa kila mmoja.",
  },
  docpilot: {
    description: "Programu ya EMR inayorekodi, kunukuu na kuchambua mazungumzo kati ya daktari na mgonjwa kwa kutumia AI ya mazungumzo.",
    about: "DocPilot huwasaidia watoa huduma za afya kurahisisha uandishi wa kumbukumbu: hunukuu mashauriano kwa wakati halisi na kutoa muhtasari wa mazungumzo pamoja na mapendekezo ya dawa.",
  },
  neurotrack: {
    description: "Jukwaa linalosaidiwa na AI linalosaidia uchunguzi na usimamizi wa hali za ukuaji wa mfumo wa neva kama vile ASD na ADHD.",
    about: "NeuroTrack huendesha kiotomatiki tathmini za awali za uchunguzi na kuwaunganisha wagonjwa na wataalamu wa tiba waliohitimu kupitia programu mbili maalum, moja kwa wagonjwa na nyingine kwa wataalamu wa tiba, ikirahisisha tathmini, mashauriano na usimamizi wa tiba.",
  },
  "ai-keyboard": {
    description: "Kibodi inayoendeshwa na AI kwa vifaa vya mkononi.",
  },
  "open-verifiable-llm": {
    description: "LLM zilizo wazi kikamilifu, zenye weights na data huria, ambazo mafunzo yake yanaweza kuthibitishwa kwa kujitegemea na zinazoweza kuendeshwa kwenye kifaa chako.",
  },
  "identity-tokens": {
    description: "Tokeni za utambulisho zinazojitolewa na mtu mwenyewe, zinazotegemea NFT, ambazo mtu yeyote anaweza kuzithibitisha, zikijenga mtandao wa uaminifu kwenye mnyororo.",
    about: "Ichukulie kama pasipoti unayojitolea mwenyewe, bila kuhitaji serikali, taasisi wala mtu wa kati. Tokeni za utambulisho zinaweza kubeba metadata ya hiari, na wamiliki wengine wa tokeni wanaweza kuzithibitisha kwenye mnyororo.",
  },
  tnt: {
    description: "Trust Network Tokens: mfumo wa ERC-721 wa tokeni zisizohamishika kwa kutoa na kubatilisha vyeti vya uaminifu vinavyoweza kuthibitishwa.",
    about: "Mashirika husambaza mkataba wao wa TNT kupitia factory, hutoa tokeni kwa watumiaji, huzibatilisha inapohitajika, na hutunza rejista ya mahusiano ya uaminifu inayoweza kuthibitishwa kwenye mnyororo.",
  },
  "agora-blockchain": {
    description: "Chaguzi zisizoweza kuchezewa zinazohamisha algorithm za upigaji kura za Agora kwenye mnyororo.",
    about: "Agora Blockchain huhamishia algorithm za kuhesabu kura kama Borda, IRV na Oklahoma kwenye smart contract ili kura zisiweze kubadilishwa na wasimamizi, washambulizi au mtu yeyote mwenye ufikiaji wa hifadhidata.",
  },
  agora: {
    description: "Maktaba ya algorithm za kuhesabu kura katika chaguzi, yenye violesura vya wavuti, simu na Slack.",
    about: "Agora hutekeleza mbinu nyingi za kuhesabu kura kwa Scala, kuanzia aina za Approval, Borda na Condorcet hadi mfumo wa STV unaotumika katika Australian Capital Territory, pamoja na REST API, kiolesura cha wavuti, programu za Android na iOS, na muunganiko wa Slack (Slagora).",
  },
  orgexplorer: {
    description: "Dashibodi rahisi kutumia inayofanya kazi ndani ya kivinjari pekee, kwa kuchunguza mashirika makubwa ya GitHub.",
    about: "OrgExplorer huchora mahusiano ya hazina, mitandao ya wachangiaji, mwenendo wa shughuli na mgawanyiko wa teknolojia, na hutambua hatari za bus factor (kutegemea watu wachache mno), ikifanya kazi yote ndani ya kivinjari kupitia REST API ya GitHub bila backend.",
  },
  gitcord: {
    description: "Uendeshaji otomatiki wa Discord ↔ GitHub unaofanya kazi kwanza kwenye kifaa, unaopanga mabadiliko ya majukumu na ugawaji wa issues kwa njia inayotabirika.",
    about: "Gitcord husoma shughuli za GitHub na hali ya Discord, kisha hutoa mipango inayoweza kukaguliwa ya kusasisha majukumu na ugawaji kwenye GitHub. Hali za dry-run na observer hutoa ripoti za ukaguzi bila kubadilisha chochote, na bot ya Discord hutoa slash commands za kuunganisha utambulisho.",
  },
  "devr-ai": {
    description: "Msaidizi wa Developer Relations unaoendeshwa na AI kwa jumuiya za programu huria kwenye Discord na GitHub.",
    about: "Ikiwa imejengwa juu ya usanifu wa mawakala wa LangGraph, Devr.AI huwasaidia wachangiaji, hurahisisha mchakato wa kuwapokea wapya na hutoa taarifa za mradi kwa wakati halisi, ikipunguza mzigo wa watunzaji huku ikiboresha uzoefu wa wachangiaji.",
  },
  skills: {
    description: "Usimamizi wa AI unaofanya kazi kwanza ndani ya shirika kwa mashirika makubwa: agent skills za pamoja, bot ya maswali na majibu ya Discord, na dashibodi ya kuchambua uunganishaji wa PR.",
    about: "Mfumo wa Skills huhakikisha michango inayosaidiwa na AI inazingatia muktadha wa kila hazina. Huweka pamoja agent skills na kanuni za shirika zima, huendesha SkillBot kujibu maswali ya wachangiaji kwenye Discord kwa kutumia skills maalum za kila hazina, na hutoa dashibodi inayopanga pull request kwa maana ili kupanga mpangilio wa uunganishaji na kubaini migongano.",
  },
  "ell-ena": {
    description: "Meneja wa bidhaa wa AI anayeshughulikia kazi, tiketi na kumbukumbu za mikutano kupitia kiolesura rahisi cha mazungumzo.",
    about: "Ell-ena huunda tiketi, huhifadhi manukuu ya mikutano na hutunza muktadha kamili wa miradi yako, ili timu ziweze kusimamia kazi kwa kuzungumza naye tu.",
  },
  codingagent: {
    description: "Wakala huria wa kuandika msimbo kwenye CLI, asiyefungamana na modeli yoyote, mwenye kumbukumbu ya kudumu na muunganiko wa Git na MCP.",
    about: "CodingAgent hufanya kazi na LLM yoyote, ya wingu au ya ndani, inayobadilishwa kwa mstari mmoja tu wa usanidi. Hutunza kumbukumbu ya muda mfupi, ya muda mrefu na ya kila mradi katika vipindi vyote, na hubaki mwepesi vya kutosha kwa mtiririko halisi wa kazi za uhandisi.",
  },
  websift: {
    description: "Hubadilisha kurasa za wavuti kuwa miundo iliyo tayari kutumiwa na miundo ya lugha.",
  },
  bringyourownkey: {
    description: "Maktaba isiyofungamana na fremu yoyote inayowaruhusu watumiaji kuweka API key zao za LLM kwenye programu yako, bila kuhitaji proxy.",
    about: "Wijeti ya upande wa kivinjari hupokea na kuhifadhi key kwenye kifaa, na kisaidizi cha backend chenye function moja huisoma kutoka kwenye request headers, hivyo usanifu wako wa frontend na backend uliopo unabaki vilevile.",
  },
  autoinitialissues: {
    description: "GitHub Action inayoweka kwenye hazina mpya issues za mwanzo zilizofafanuliwa vizuri, kutoka hifadhi zilizoandaliwa au zinazotengenezwa na AI.",
  },
  "idb-backup": {
    description: "Maktaba nyepesi ya TypeScript ya kuhifadhi nakala na kurejesha hifadhidata za IndexedDB kama JSON inayohifadhi aina za data.",
  },
  bene: {
    description: "Itifaki ya kuchangisha fedha isiyohitaji kuaminiana: miradi hupata fedha tu ikifikia lengo lake, na wachangiaji hupokea tokeni za Proof-of-Funding.",
    about: "Wamiliki wa miradi huunda vault ya ufadhili yenye kiwango cha ubadilishaji, lengo la chini la ufadhili na tarehe ya mwisho. Wachangiaji hupokea tokeni za proof-of-funding; lengo lisipofikiwa kwa wakati, wanaweza kurejeshewa fedha zao. Bene inafanya kazi kwenye minyororo ya EVM na Ergo, ikiwa na kiolesura kinachofanya kazi kikamilifu upande wa kiteja.",
  },
  "orb-oracle": {
    description: "Oracle zilizogatuliwa: vinjari vyanzo vya data, wasilisha thamani, na usambaze oracle za msingi au zilizounganishwa kwenye mnyororo.",
    about: "Orb Oracle humruhusu mtu yeyote kuzindua oracle za msingi zinazoungwa mkono na utawala au kuunda mpya kutokana na vyanzo vilivyopo, huku vipindi vya bei vilivyopimwa kwa muda vikifuatiliwa kwenye mnyororo. Huduma ya Poster huendesha kiotomatiki uwasilishaji wa thamani kutoka vyanzo kama Chainlink, Pyth au REST API, na itifaki hii imethibitishwa rasmi katika Rocq prover.",
  },
  windmill: {
    description: "Soko la kubadilishana kwenye mnyororo linalotegemea mnada, ambapo oda hulinganishwa na keeper bots kufuatana na mikondo ya bei inayobadilika.",
    about: "Badala ya kitabu kikuu cha oda, Windmill huhifadhi oda za kununua na kuuza kwenye mnyororo na kuwaruhusu keepers wanaojiendesha wenyewe kuzilinganisha kadiri mikondo ya bei ya mnada wa Kiholanzi inavyobadilika. Keepers hupata zawadi kwa kulinganisha oda, na malipo yote hukamilika kwa pamoja kwenye mnyororo.",
  },
  maelstrom: {
    description: "Itifaki ya ukwasi iliyogatuliwa kwa tokeni za ERC-20, yenye mikondo ya bei ya kununua na kuuza inayoweza kurekebishwa.",
  },
  "hammer-auction-house": {
    description: "Jukwaa la minada lililogatuliwa linalosaidia minada ya Kiingereza, ya Kiholanzi, ya kila mtu kulipa (all-pay) na ya Vickrey kwa NFT na tokeni.",
  },
  hodlcoin: {
    description: "Vault za staking zinazojiimarisha zenyewe, ambazo bei yake imethibitishwa kihisabati kuwa hupanda daima.",
    about: "Mtu yeyote anaweza kuunda vault ya staking ya hodlCoin kwa tokeni ya ERC-20. Ada za kutoa staking huwazawadia waundaji wa vault na wanaoweka staking kwa muda mrefu, na kuna matoleo kwa minyororo ya EVM na Ergo.",
  },
  karma: {
    description: "Makundi ya utabiri yaliyogatuliwa yenye oracle za ndani.",
  },
  fairfund: {
    description: "Ufadhili unaoendeshwa na jumuiya: sambaza vault, weka fedha, piga kura kuhusu mapendekezo na gawa fedha kwa uwazi.",
  },
  bountiful: {
    description: "Fadhili uundaji kupitia ushindani wa wazi: zawadi hutolewa tu tatizo linapotatuliwa kwa njia inayoweza kuthibitishwa.",
  },
  raindrop: {
    description: "Jukwaa lililogatuliwa la kusambaza tokeni kwa airdrop na madai ya tokeni.",
  },
  clowder: {
    description: "Unda na simamia Contribution Accounting Tokens (CATs) zinazofuatilia michango ya thamani ndani ya mashirika yaliyogatuliwa.",
  },
  xops: {
    description: "Injini ya kuhamisha thamani iliyojengwa kwa CI/CD, inayotolewa kama GitHub Action: PR zilizounganishwa hugeuka kuwa malipo yaliyotiwa sahihi kwenye mnyororo.",
    about: "Tukio la hazina kama pull request iliyounganishwa huzalisha nia ya malipo; binadamu huitia sahihi, workflow huikamilisha kwenye mnyororo na kurudisha stakabadhi. Inaendeshwa ndani ya CI yako mwenyewe, haihitaji seva inayoendeshwa na mradi, na kwa chaguo-msingi hutumia hali salama ya dry-run.",
  },
  walletlink: {
    description: "Njia ya bure isiyotegemea SaaS ya kuunganisha frontend na pochi za EVM, na mbadala wa moja kwa moja wa mifumo inayotegemea WalletConnect.",
  },
  vouchme: {
    description: "Mfumo wa ushuhuda unaotegemea blockchain kwa ajili ya kujenga sifa iliyo wazi na inayoweza kuthibitishwa.",
  },
  treee: {
    description: "Rekodi upandaji wa miti, itengeneze kama NFT na uchunguze juhudi za kijani zilizo karibu nawe kwenye ramani.",
    about: "Programu ya simu ya Treee na mikataba yake ya Solidity hutoa uthibitisho wa miti iliyopandwa kwenye mnyororo, usimamizi wa mashirika na utoaji wa NFT, kwa ufuatiliaji wa uendelevu ulio wazi na unaoweza kukaguliwa.",
  },
  plaza: {
    description: "Kitovu cha uratibu kwenye mnyororo kinachoanzia na ramani, kwa kuunda na kuchangia miradi ya maendeleo inayohusishwa na maeneo mahususi.",
  },
  "stable-viewpoints": {
    description: "Chapisho huru lenye makala zilizofanyiwa utafiti wa kina kuhusu jinsi teknolojia inavyoweza kuleta uthabiti duniani.",
  },
  scavenger: {
    description: "Kithibitishaji cha teoremu kiotomatiki kwa mantiki ya daraja la kwanza, kinachotegemea conflict resolution calculus.",
  },
  skeptik: {
    description: "Algorithm za kubana uthibitisho rasmi unaozalishwa na SAT/SMT solvers na vithibitishaji vya teoremu kiotomatiki.",
  },
  sensala: {
    description: "Mfumo wa semantiki badilifu kwa uchakataji wa lugha asilia.",
  },
  "computational-philosophy": {
    description: "Uthibitisho rasmi wa hoja za kiontolojia kwa msaada wa kompyuta, katika Coq, Isabelle na vithibitishaji vya teoremu kiotomatiki.",
  },
};

export default sw;
