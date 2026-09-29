import type { ProjectText } from "./types";

/** Te reo Māori project text, keyed by project slug. */
const mi: Record<string, ProjectText> = {
  resonate: {
    description: "He papa reo pāpori pūmanawa tuwhera, nā te hapori e ārahi, pērā i a Clubhouse, i a Twitter Spaces rānei.",
    about: "Ka noho te reo ki te pūtake o te taunekeneke pāpori i a Resonate: ngā rūma ororongo mataora mō ngā matapakinga me ngā hui, ngā kōrero tokorua matapōkere, me ngā waea reo. Ko te taupānga Flutter e tautokohia ana e ngā taumahi kapua Appwrite me LiveKit mō te ororongo mataora.",
  },
  rein: {
    description: "He pūrere whakahaere tāuru mamao e whakamahi ana i te LAN, e rere ana i ngā pūhara maha, me tētahi kiritaki pūtirotiro mō ngā pūrere pā, pā-kore hoki.",
    about: "Ka whakahaerehia e Rein tētahi tūmau i te rorohiko papamahi, ā, ka taea e tētahi pūrere i te whatunga ā-rohe te whakahaere mā te pūtirotiro tukutuku, kāore he taupānga kiritaki taketake e hiahiatia ana. Ka tautokohia te tāuru mamao, te rere mataora o te mata, te tuku kōnae me ngā kiritaki maha i te wā kotahi.",
  },
  ogh: {
    description: "He taupānga Android e aro tuatahi ana ki te pūrere ake, hei pāho mataora i te kāmera, i te mata rānei ki ngā ūnga RTMP/RTMPS maha i te wā kotahi.",
    about: "Ka hopu a Ogh i te mata, i te kāmera rānei, ka whakaranu i te ororongo kua kōwhiria, ka whakawaehere kotahi, ka whakaputa ki tētahi, ki ētahi ūnga RTMP rānei, me te hono ki a YouTube me Twitch. Kāore he pānui hokohoko, he tātari raraunga, he tohu wai, he pūkete, he tūmau pāpāho rānei, ā, ka rere me te kore o Google Play Services. I ahu mai te ingoa i te kupu Sanskrit ogha, arā, he awa, he rerenga haere tonu rānei.",
  },
  thrubox: {
    description: "He tūmau tuku iti, ka taea te manaaki e koe anō, e mahi ana hei pouaka mēra kua whakamunatia, me tētahi SDK kiritaki kāore he whakawhirinakitanga.",
    about: "Ka penapena, ka tuku hoki te tūmau ThruBox i ngā uta kua whakamunatia i waenga i ngā kaiwhakamahi. Kāore rawa ia e kite i te kuputuhi mārama, nā te mea ka whakamunatia katoatia i te taha kiritaki. Ka tukuna hei kōnae rūnā kotahi me te SQLite kei roto, ngā TTL karere ka taea te whirihora, te whakatiki reiti, me te motuhēhē kī-API kōwhiringa. Ka mahi te SDK kiritaki TypeScript i Node.js me ngā pūtirotiro.",
  },
  openpeerchat: {
    description: "He karere hoa-ki-te-hoa e tuku ana i ngā karere mā ngā pūrere tata, kaua mā tētahi tūmau matua.",
    about: "Ko te whāinga o OpenPeerChat he whakawhitiwhiti kōrero matatapu, ātete ki te aukati kōrero, ka mahi tonu ahakoa kāore he ipurangi. He whai hua tēnei i ngā wāhi tawhiti, i ngā wāhi kua pāngia e te aituā rānei. Ka peke ngā karere i waenga i ngā pūrere tata kia tae rā anō ki tō rātou ūnga. He whakatinanatanga Flutter, React Native hoki ōna.",
  },
  perspective: {
    description: "Ka tātari i tō whāngai rongo kōrero, pāpori rānei, ka whakaatu i ngā kōrero whakaaro kē e whakaponotia ana, nō ngā puna pono.",
    about: "I hoahoatia a Perspective hei wāwāhi i ngā rūma pāorooro ka hangaia e ngā hātepe ihirangi whaiaro. Ka whakaputa ake i ngā tirohanga kē kua āta whakaarohia me ngā meka hou i te taha o ngā ihirangi e pānuitia ana e koe, hei āwhina i a koe ki te whakaaro arohaehae.",
  },
  "social-street-smart": {
    description: "He toronga pūtirotiro e whakahaumaru ana i te ipurangi mā te tohu i te reo tūkino, ngā rongo teka, ngā mounu pāwhiri me ngā pae kino.",
    about: "Ka honoa e Social Street Smart tētahi toronga Chrome ki ngā API Python me ngā tauira kua whakangungua kētia mō te kite i ngā mounu pāwhiri, te reo mauāhara me ngā rongo teka, te kite i ngā pikitia whakapōauau, me te arotake i te ingoa pai o ngā paetukutuku.",
  },
  monumento: {
    description: "He taupānga pāpori me te AR hei tomo, hei tūhura, hei tiri hoki i ngā tohu whenua rongonui o te ao.",
    about: "Ka āhei ngā kaihaereere me te hunga ngākau nui ki te hītori ki te tomo ki ngā tohu whakamaumahara, ki te tūhura i ngā wāhi rongonui i te AR, ki te hono hoki ki ngā tāngata e ngākau nui ana ki ngā taonga tuku iho. I hangaia ki a Flutter me Appwrite.",
  },
  socialsharebutton: {
    description: "He wāhanga tiri pāpori māmā, kāore he whakawhirinakitanga, ka mahi ki tētahi anga tukutuku.",
    about: "Ka tautokohia e SocialShareButton a WhatsApp, Facebook, X, LinkedIn, Telegram, Reddit, Īmēra, Pinterest me Discord, ka kite aunoa i te URL me te taitara o nāianei, ā, ka mahi ki a React, Preact, Next.js, Qwik, Vue, Angular, ki te HTML noa rānei.",
  },
  crowdalert: {
    description: "He taupānga nā te marea hei pūrongo, hei mātakitaki hoki i ngā aituā me ngā ohotata puta noa i te ao.",
  },
  eduaid: {
    description: "He taputapu atamai hangahanga e hanga aunoa ana i ngā pātaitai poto mai i ngā ihirangi mātauranga katoa.",
    about: "He uaua ki te hunga ako takitahi i YouTube me ngā MOOC te mau i ā rātou e mātakitaki ai. Ka hanga a EduAid i ngā pātaitai kōwhiringa-maha, pono/hē, whakautu-poto hoki mai i te kuputuhi tāuru, hei āwhina i ngā ākonga ki te arotake, i ngā kaiako hoki ki te hanga pātai tere. E wātea ana hei taupānga tukutuku, hei taupānga papamahi, hei toronga pūtirotiro hoki.",
  },
  debateai: {
    description: "He papa tautohe mataora e taupatupatu ai koe ki ngā hoa tautohe tangata, ki ngā kaiwero atamai hangahanga e whakakahangia ana e te LLM rānei.",
    about: "Ka āwhina a DebateAI i te tangata ki te whakakoi i ō rātou pūkenga whakawhitiwhiti kōrero mā ngā tautohetohe hanganga, me ngā rauna whakatuwhera, uiui whakawhiti, whakakapi hoki. Ka taea e ngā kaiwhakamahi te tautohe ki a rātou anō mā WebSockets me WebRTC, te whakaharatau rānei ki ngā hoa tautohe atamai hangahanga e urutau ana i ā rātou whakahē ki āu kōrero.",
  },
  libred: {
    description: "He papa ā-kaihoko, ā-ipu, e rere katoa ana i tōu ake pūrere, e huri ana i ngā PDF marautanga hei rauemi whakareri whakamātautau.",
    about: "Ka hauhake, ka whakarōpū, ka hanga hoki a LibrEd i ngā rauemi ako mai i ngā PDF marautanga mata, mā ngā LLM ā-rohe e rere ana mā Ollama. Ka tukatukahia katoatia i tō mīhini, kāore he API o waho, kāore he whakawhirinaki ki te kapua, ā, ka rere te pūnaha katoa mā Docker Compose.",
  },
  minichain: {
    description: "He blockchain iti mō te mātauranga, te rangahau me te auahatanga.",
  },
  "mind-the-word": {
    description: "He toronga pūtirotiro e āwhina ana i a koe ki te ako i tētahi reo hou mā te whakamāori i ētahi kupu ruarua i ia whārangi ka torona e koe.",
    about: "I te mea he ruarua noa ngā kupu ka whakamāoritia i ia whārangi, he māmā te mārama ki ō rātou tikanga mai i te horopaki, nō reira ka mau māori ngā kupu hou i a koe e tirotiro ana i tō reo taketake.",
  },
  starcross: {
    description: "He taupānga tātai arorangi hei mātaki i ngā whetū, ngā aorangi me ngā kāhui whetū, e ai ki tōu tino wāhi e tū ana.",
  },
  "aossie-scholar": {
    description: "He toronga Chrome e tātai ana i ngā ine whakatutukitanga mō ngā kairangahau mai i tō rātou kōtaha Google Scholar.",
  },
  djed: {
    description: "He kawa stablecoin motuhake, kua manatokohia ōkawatia, e tautokohia ana e te moni crypto.",
    about: "Ka mau a Djed i te uara o tētahi stablecoin mā te hoahoa moni-rua: he StableCoin e whai ana i tētahi utu whāinga, me tētahi ReserveCoin e tautoko ana, e ngongo ana hoki i te hurihuri o te utu. Ka tiakina e te Djed Alliance ngā kirimana Solidity, ngā papatohu tukutuku, me ngā kirimana oracle me te kaituku i waho i te mekameka e whāngai ana i ngā utu ki runga i te mekameka.",
  },
  stablepay: {
    description: "He widget tukuiho katoa, e rere ana i te taha kiritaki anake, hei whakaae i ngā utunga moni crypto me te stablecoin.",
    about: "Ina whakauruhia ki tētahi paetukutuku, ka kōrero tōtika te widget StablePay ki ngā kirimana atamai, kāore he tūmau takawaenga. Ka taea e ngā kiritaki te utu ki te moni crypto taketake o tētahi mekameka, ki ngā stablecoin rānei e tautokohia ana e taua moni, me te huri aunoa i waenga i ngā mea e rua. Ka whakaatu tētahi papatohu kaihokohoko i ngā utunga kua tae mai.",
  },
  gluon: {
    description: "He kawa stablecoin motuhake e tautokohia ana e te moni crypto, e wehe ana i ngā rawa rahui hei tohu pūmau, hei tohu hurihuri hoki.",
    about: "I whakaaweawehia e te ahupūngao karihi, ka wehea e Gluon tētahi rawa rahui o nāianei hei “neutron” pūmau me tētahi “proton” hurihuri mā te whakawehe karihi, ā, ka hanumi anō mā te whakakotahi karihi. He whakatinanatanga ōna i ngā mekameka EVM, i Ergo, i Solana hoki, me tētahi SDK me tētahi whakaōkawatanga i te kaiwhakamatau Rocq (Coq).",
  },
  fate: {
    description: "Ngā puna matapae tukuiho, mutunga-kore, e hoko ai, e hoko atu ai ngā kaiwhakamahi i ngā bullCoin me ngā bearCoin.",
    about: "Ka whakakapia e Fate ngā pukapuka tono ki tētahi hoahoa pātaka-rua, kia taea ai e ngā kaiwhakamahi te matapae i ngā ia utu i tētahi mākete e tuwhera tonu ana, kāore he rā pau. Ka rere i ngā mekameka EVM, i Sui, i Solana hoki, me ngā whāngai utu nō ngā kaiwhakarato oracle maha.",
  },
  tectonic: {
    description: "He kawa stablecoin mō ngā mekameka EVM, me tētahi atanga tukutuku hei tūhura i ngā whakatakotoranga, i ngā EquityCoin, hei whakaoho hoki i ngā hokonga anō.",
  },
  chainvoice: {
    description: "He papa nama tukuiho hei hanga, hei whakahaere, hei utu hoki i ngā nama kāore e taea te raweke, i runga i te mekameka.",
    about: "Ka whakamahi a Chainvoice i ngā kirimana atamai e hāngai ana ki te EVM hei whakaaunoa i ngā rerenga utu nama, hei whakaiti hoki i te whakawhirinaki ki ngā takawaenga. Ka taea e ngā kaiwhakamahi te hanga nama, te whakahaere utunga me te aroturuki i te hītori tauwhitinga i runga i te mārama.",
  },
  zplit: {
    description: "He taupānga pūkoro matatapu-tuatahi hei tohatoha i ngā whakapaunga a te rōpū, ka mahi tuimotu-kore, ā, ka tukutahi hoa-ki-te-hoa.",
    about: "Ka whakahaerehia e Zplit te aroturuki whakapaunga, te whakahaere rōpū me te tātai nama, kāore he tūmau matua. Ka noho ngā raraunga ki tō pūrere, ā, ka tukutahi hoa-ki-te-hoa mā Wi-Fi Direct, Bluetooth, NFC rānei.",
  },
  supportusbutton: {
    description: "He wāhanga “Tautokohia Mātou” māmā, ka taea te whirihora, hei whakaatu i ngā kaitautoko pūtea i tētahi atanga mua.",
    about: "Ka tukuna e SupportUsButton ngā tahora kaitautoko pūtea ā-taumata me ngā waitohu me ngā hononga, ētahi kaupapa āhua kei roto kē, me te whakahuahua Tailwind CSS, kia māmā ai te tāpiri i tētahi whārangi tautoko ngaio ki tētahi kaupapa.",
  },
  "inpact-ai": {
    description: "He papa e whakakahangia ana e te atamai hangahanga, e hono ana i ngā kaihanga ihirangi, ngā waitohu me ngā umanga mā ngā māramatanga i ahu mai i ngā raraunga.",
    about: "Ka whakamahi a InPactAI i te atamai hangahanga whakaputa, i te tātari minenga me ngā ine whakauru hei hono i ngā kaihanga ki ngā tautoko pūtea hāngai, hei āwhina i ngā kaihanga ki te kimi hoa mahi he minenga tāpiri ō rātou, ā, hei āwhina i ngā waitohu ki te ine i te hua o ngā whakatairanga kaiaweawe.",
  },
  "carbon-tracker": {
    description: "He pūaroturuki hauora e aro tuatahi ana ki te pūrere ake, e aroturuki ana hoki i ngā tukunga CO₂ ka ārai koe mā tōu āhua haere.",
    about: "Ka aroturukihia e CarbonTracker ngā mahi korikori, ngā haerenga me ngā momo waka, ka tātai i ngā tukunga me ngā penapenatanga, ā, ka pupuri i ngā raraunga hauora, wāhi, haerenga hoki ki tō pūrere. Ka tautokohia a Health Connect / HealthKit me Wear OS, ā, kei te whakawhanakehia tētahi taupānga wati hoa.",
  },
  "carbon-footprint": {
    description: "Ngā taputapu e whakaatu ana i te tapuwae waro o ngā kōwhiringa o ia rā: he toronga mahere, he API, he taupānga pūkoro me ngā kaiāwhina reo.",
    about: "I tīmata te whānau Carbon Footprint hei toronga pūtirotiro e whakaatu ana i ngā tukunga i ngā ratonga mahere, ā, i tipu hei API tukunga whānui, he taupānga React Native, he pūkenga Amazon Alexa me tētahi mahi Google Assistant.",
  },
  pictopy: {
    description: "He puna whakaahua papamahi matatapu-tuatahi, me te whakarōpū kanohi, te kite ahanoa me te rapu atamai, i runga i te pūrere ake.",
    about: "Ka kawea mai e PictoPy te whakahaere whakaahua atamai hangahanga hou ki tōu ake mīhini, kāore he tukuake ki te kapua. I hangaia ki a Tauri, React, Rust me tētahi tuara Python; ka whakarōpū i ngā kanohi puta noa i tō puna, ka tūtohu i ngā whakaahua ki ngā ahanoa kua kitea, ā, ka āhei koe ki te rapu ki ngā kupu noa, tuimotu-kore katoa.",
  },
  smartnotes: {
    description: "He taupānga papamahi e aro ana ki te matatapu, mō te whakahaere mātauranga whaiaro, me te rapu tikanga ā-rohe me te RAG.",
    about: "Ka honoa e Smart Notes tētahi ētita markdown ki te rapu pūwāhi ā-rohe me ngā tauira reo i runga i te pūrere, kia taea ai e koe te pātai mō āu tuhipoka, te kite hoki i ngā hononga i waenga i ngā whakaaro, tuimotu-kore hei tautuhinga taunoa.",
  },
  moveyourbody: {
    description: "He taupānga hauora matatapu-tuatahi, i runga i te pūrere, me ngā mahi korikori poto e urutau ana ki āu urupare.",
    about: "Ka whakaritea e MoveYourBody kia rua, kia toru rānei ngā wāhanga 5 ki te 7 meneti ia rā, ā, ka urutau i ngā mahi korikori ki āu urupare me ōu āhuatanga hauora mā te tātari ā-ture me te whakahāngai tikanga māmā, tuimotu-kore katoa.",
  },
  babynest: {
    description: "He kaiwhakamahere hapūtanga atamai e aroturuki ana i ngā hui i mua i te whānautanga, e tuku ana hoki i ngā tūtohu nā te atamai hangahanga.",
    about: "Ka āwhina a BabyNest i ngā mātua e hapū ana kia noho whakaritea, mā te aroturuki hui ā-toru-marama, ngā pānui hauora e hāngai ana ki ia whenua, me ngā aratohu whaiaro.",
  },
  docpilot: {
    description: "He taupānga EMR e hopu ana, e tuhi ana, e tātari ana hoki i ngā kōrero i waenga i te tākuta me te tūroro, mā te atamai hangahanga kōrero.",
    about: "Ka āwhina a DocPilot i ngā kaiwhakarato hauora ki te whakangāwari i ngā mahi tuhinga: ka tuhia ngā hui tūroro i te wā tonu, ā, ka hanga whakarāpopototanga kōrero me ngā tūtohu rongoā.",
  },
  neurotrack: {
    description: "He papa e āwhinatia ana e te atamai hangahanga, e tautoko ana i te tātari me te whakahaere i ngā āhuatanga whanaketanga roro pērā i te ASD me te ADHD.",
    about: "Ka whakaaunoatia e NeuroTrack ngā aromatawai tātari tōmua, ā, ka hono i ngā tūroro ki ngā kaihaumanu tohunga mā ngā taupānga motuhake e rua, tētahi mō ngā tūroro, tētahi mō ngā kaihaumanu, hei whakangāwari i te aromatawai, te hui me te whakahaere haumanu.",
  },
  "ai-keyboard": {
    description: "He papapātuhi e whakakahangia ana e te atamai hangahanga mō ngā pūrere pūkoro.",
  },
  "open-verifiable-llm": {
    description: "Ngā LLM tuwhera katoa, he tuwhera ngā taumaha me ngā raraunga, ka taea te manatoko motuhake tō rātou whakangungu, ā, ka rere ā-rohe.",
  },
  "identity-tokens": {
    description: "Ngā tohu tuakiri ā-NFT, nāu anō i tuku, ka taea e te tangata te whakaū, e hanga ana i tētahi tukutuku whakawhirinaki i runga i te mekameka.",
    about: "Whakaarohia he uruwhenua nāu anō i tuku ki a koe, kāore he kāwanatanga, he whare, he takawaenga rānei e hiahiatia ana. Ka taea e ngā tohu tuakiri te kawe raraunga-meta kōwhiringa, ā, ka taea e ētahi atu kaipupuri tohu te whakamana i runga i te mekameka.",
  },
  tnt: {
    description: "Trust Network Tokens: he anga ERC-721 kāore e taea te whakawhiti, hei tuku, hei tango hoki i ngā tohu whakawhirinaki ka taea te manatoko.",
    about: "Ka whakatakoto ngā whakahaere i tō rātou ake kirimana TNT mā tētahi wheketere, ka tuku tohu ki ngā kaiwhakamahi, ka tango pea, ā, ka pupuri i tētahi rēhita o ngā hononga whakawhirinaki ka taea te manatoko i runga i te mekameka.",
  },
  "agora-blockchain": {
    description: "Ngā pōtitanga kāore e taea te raweke, e kawe ana i ngā hātepe pōti a Agora ki runga i te mekameka.",
    about: "Ka kawea e Agora Blockchain ngā hātepe tatau pōti pērā i a Borda, IRV me Oklahoma ki ngā kirimana atamai, kia kore ai e taea e ngā kaiwhakahaere, e ngā kaiwhakaeke, e te tangata rānei whai urunga ki te pātengi raraunga te whakarerekē i ngā pepa pōti.",
  },
  agora: {
    description: "He puna hātepe mō te tatau pōti i ngā pōtitanga, me ngā atanga tukutuku, pūkoro, Slack hoki.",
    about: "Ka whakatinanahia e Agora ngā tikanga tatau pōti maha i te Scala, mai i ngā momo Approval, Borda me Condorcet tae atu ki te pūnaha STV e whakamahia ana i te Australian Capital Territory, me tētahi REST API, tētahi atanga tukutuku, ngā taupānga Android me iOS, me tētahi hononga Slack (Slagora).",
  },
  orgexplorer: {
    description: "He papatohu māmā ki te whakamahi, e rere ana i te pūtirotiro anake, hei tūhura i ngā whakahaere GitHub nunui.",
    about: "Ka whakamaherehia e OrgExplorer ngā hononga pūranga, ngā whatunga kaiwhai wāhi, ngā ia mahi me te tohatoha hangarau, ā, ka tohu i ngā mōrearea bus-factor, e rere katoa ana i te pūtirotiro i runga i te REST API a GitHub, kāore he tuara.",
  },
  gitcord: {
    description: "He whakaaunoatanga Discord ↔ GitHub e aro tuatahi ana ki te pūrere ake, e whakamahere tūturu ana i ngā panoni tūranga me ngā tautapanga take.",
    about: "Ka pānui a Gitcord i ngā mahi GitHub me te āhua o Discord, kātahi ka whakaputa i ngā mahere ka taea te arotake mō ngā whakahōunga tūranga me ngā tautapanga GitHub. Ka hanga ngā aratau whakamātau-anake me te kaimātaki i ngā pūrongo arotake me te kore e whakarerekē i tētahi mea, ā, ka tukuna e tētahi bot Discord ngā tono slash hei hono tuakiri.",
  },
  "devr-ai": {
    description: "He kaiāwhina Developer Relations e whakakahangia ana e te atamai hangahanga, mō ngā hapori pūmanawa tuwhera i Discord me GitHub.",
    about: "I hangaia i runga i te hoahoanga kaihoko LangGraph, ka tautoko a Devr.AI i ngā kaiwhai wāhi, ka whakangāwari i te whakauru, ka tuku hoki i ngā whakahōunga kaupapa i te wā tonu, hei whakaiti i te taumaha mahi o ngā kaitiaki me te whakapai ake i te wheako o ngā kaiwhai wāhi.",
  },
  skills: {
    description: "He mana whakahaere atamai hangahanga e aro tuatahi ana ki te pūrere ake, mō ngā whakahaere nunui: ngā pūkenga kaihoko tiritahi, he bot pātai-whakautu Discord me tētahi papatohu tātari hanumi PR.",
    about: "Ka mau te pūnaha Skills i ngā koha e āwhinatia ana e te atamai hangahanga ki te horopaki o ia pūranga. Ka whakaemi i ngā pūkenga kaihoko me ngā ture o te whakahaere katoa ki te wāhi kotahi, ka whakahaere i a SkillBot hei whakautu i ngā pātai a ngā kaiwhai wāhi i Discord mā ngā pūkenga e hāngai ana ki ia pūranga, ā, ka tuku i tētahi papatohu e whakarōpū ana i ngā pull request mā te tikanga, hei whakamahere i te raupapa hanumi me te whakaatu i ngā taupatupatu.",
  },
  "ell-ena": {
    description: "He kaiwhakahaere hua atamai hangahanga e whakahaere ana i ngā mahi, ngā tīkiti me ngā tuhipoka hui mā tētahi atanga kōrerorero māmā.",
    about: "Ka hanga a Ell-ena i ngā tīkiti, ka hopu i ngā tuhinga o ngā hui, ā, ka pupuri i te horopaki katoa o ō kaupapa, kia taea ai e ngā kapa te whakahaere mahi mā te kōrero noa ki a ia.",
  },
  codingagent: {
    description: "He kaihoko waehere CLI pūmanawa tuwhera, ka mahi ki tētahi tauira, me te mahara pūmau, me te hono ki Git me MCP.",
    about: "Ka mahi a CodingAgent ki tētahi LLM, ā-kapua, ā-rohe rānei, ka whakawhitia mā te rārangi whirihora kotahi. Ka pupuri i te mahara wā-poto, wā-roa, ā-kaupapa hoki puta noa i ngā wāhanga, ā, ka noho māmā tonu mō ngā rerenga mahi pūkaha tūturu.",
  },
  websift: {
    description: "Ka huri i ngā whārangi tukutuku hei hōputu kua rite mō ngā tauira reo.",
  },
  bringyourownkey: {
    description: "He puna pūmanawa ka mahi ki tētahi anga, e āhei ai ngā kaiwhakamahi ki te tuku i ō rātou ake kī API LLM ki tō taupānga, kāore he takawaenga e hiahiatia ana.",
    about: "Ka kohia, ka penapenatia ā-rohe te kī e tētahi widget i te taha pūtirotiro, ā, ka pānuitia e tētahi kaiāwhina tuara taumahi-kotahi mai i ngā pane tono, nō reira ka noho tonu tō hoahoanga atanga mua me te tuara ki tōna āhua tonu.",
  },
  autoinitialissues: {
    description: "He GitHub Action e whakatō ana i ngā pūranga hou ki ngā take tīmatanga kua āta tautuhia, mai i ngā pātaka kua whakaritea kētia, mai i te atamai hangahanga rānei.",
  },
  "idb-backup": {
    description: "He puna pūmanawa TypeScript māmā hei tārua, hei whakahoki hoki i ngā pātengi raraunga IndexedDB hei JSON e pupuri ana i ngā momo.",
  },
  bene: {
    description: "He kawa kohi pūtea kāore e hiahiatia te whakawhirinaki: ka whiwhi noa ngā kaupapa i ngā pūtea mēnā ka tutuki tō rātou whāinga, ā, ka whiwhi ngā kaituku pūtea i ngā tohu Proof-of-Funding.",
    about: "Ka hanga ngā kaipupuri kaupapa i tētahi pātaka pūtea me tētahi reiti whakawhiti, tētahi whāinga pūtea iti rawa me tētahi rā mutunga. Ka whiwhi ngā kaituku pūtea i ngā tohu proof-of-funding; ki te kore e tutuki te whāinga i te wā, ka taea e rātou te tiki anō i ō rātou moni. Ka rere a Bene i ngā mekameka EVM, i Ergo hoki, me tētahi atanga e rere katoa ana i te taha kiritaki.",
  },
  "orb-oracle": {
    description: "Ngā oracle tukuiho: tirotirohia ngā whāngai raraunga, tukuna he uara, whakatakotoria hoki ngā oracle taketake, hanumi rānei i runga i te mekameka.",
    about: "Ka āhei a Orb Oracle i te tangata ki te whakarewa i ngā oracle taketake e tautokohia ana e te mana whakahaere, ki te hanga rānei i ētahi hou mai i ngā whāngai o nāianei, me ngā wāhanga utu kua whakataumahatia ki te wā, e aroturukitia ana i runga i te mekameka. Ka whakaaunoatia e te ratonga Poster te tuku uara mai i ngā puna pērā i a Chainlink, Pyth, ngā REST API rānei, ā, kua whakaōkawatia te kawa i te kaiwhakamatau Rocq.",
  },
  windmill: {
    description: "He whakawhitinga ā-mākete hokohoko i runga i te mekameka, e whakahāngaitia ai ngā tono e ngā bot kaitiaki i runga i ngā ānau utu hurihuri.",
    about: "Kāore he pukapuka tono matua, engari ka penapenatia e Windmill ngā tono hoko me ngā tono hoko atu i runga i te mekameka, ā, ka tukua ngā kaitiaki motuhake ki te whakahāngai i a rātou i te wā e huri ana ngā ānau utu Dutch-auction. Ka whiwhi ngā kaitiaki i ngā utu whakahāngai, ā, ka oti ā-ngota katoa ngā whakataunga i runga i te mekameka.",
  },
  maelstrom: {
    description: "He kawa liquidity tukuiho mō ngā tohu ERC-20, me ngā ānau utu hoko, hoko atu hoki ka taea te whakarite.",
  },
  "hammer-auction-house": {
    description: "He papa mākete hokohoko tukuiho e tautoko ana i ngā mākete English, Dutch, all-pay me Vickrey mō ngā NFT me ngā tohu.",
  },
  hodlcoin: {
    description: "Ngā pātaka staking whakapūmau-ā-whaiaro, kua whakamatauria ā-pāngarau ka piki tonu tō rātou utu.",
    about: "Ka taea e te tangata te hanga i tētahi pātaka staking hodlCoin mō tētahi tohu ERC-20. Ka whakawhiwhia e ngā utu unstaking ngā kaihanga pātaka me ngā kaistaking wā-roa, ā, he whakatinanatanga mō ngā mekameka EVM me Ergo.",
  },
  karma: {
    description: "Ngā puna matapae tukuiho me ngā oracle ā-roto.",
  },
  fairfund: {
    description: "He tuku pūtea nā te hapori e ārahi: whakatakotoria he pātaka, whakatakotoria he pūtea, pōti ki ngā tono, ā, tohatohaina ngā pūtea i runga i te mārama.",
  },
  bountiful: {
    description: "Tukuna he pūtea ki te whakawhanaketanga mā te whakataetae tuwhera: ka tukuna noa ngā utu paremata ina ka taea te manatoko kua ea tētahi raru.",
  },
  raindrop: {
    description: "He papa tohatoha tohu tukuiho mō ngā airdrop me ngā kerēme tohu.",
  },
  clowder: {
    description: "Hangaia, whakahaeretia hoki ngā Contribution Accounting Tokens (CAT) e aroturuki ana i ngā koha uara i roto i ngā whakahaere tukuiho.",
  },
  xops: {
    description: "He pūkaha whakawhiti uara taketake ki te CI/CD, ka tukuna hei GitHub Action: ka huri ngā PR kua hanumitia hei utunga kua hainatia, i runga i te mekameka.",
    about: "Ka whakaputa tētahi takahanga pūranga, pērā i tētahi pull request kua hanumitia, i tētahi whakaaro utu; ka hainatia e tētahi tangata, ka whakataua e te rerenga mahi i runga i te mekameka, ā, ka whakairia he rīhiti. Ka rere i tōu ake CI, kāore he tūmau e whakahaerehia ana e te kaupapa, ā, ko te aratau whakamātau-anake haumaru te taunoa.",
  },
  walletlink: {
    description: "He huarahi kore utu, motuhake i te SaaS, hei hono i ngā atanga mua ki ngā pūkoro moni EVM, hei whakakapi tōtika hoki mō ngā tūāpapa e whakamahi ana i a WalletConnect.",
  },
  vouchme: {
    description: "He pūnaha taunakitanga i runga i te blockchain hei hanga ingoa pai mārama, ka taea te manatoko.",
  },
  treee: {
    description: "Tuhia ngā whakatōnga rākau, hangaia hei NFT, ā, tūhuratia ngā kaupapa kākāriki tata i runga i te mahere.",
    about: "Ka tukuna e te taupānga pūkoro me ngā kirimana Solidity a Treee te manatoko i runga i te mekameka o ngā rākau kua whakatōngia, te whakahaere whakahaere me te tuku NFT, mō te aroturuki toitūtanga mārama, ka taea te arotake.",
  },
  plaza: {
    description: "He pokapū ruruku i runga i te mekameka, ko te mahere te tuatahi, hei hanga, hei whai wāhi hoki ki ngā kaupapa pānga kua herea ki tētahi wāhi.",
  },
  "stable-viewpoints": {
    description: "He whakaputanga motuhake me ngā tuhinga kua āta rangahaua mō te āhua e taea ai e te hangarau te kawe pūmautanga ki te ao.",
  },
  scavenger: {
    description: "He kaiwhakamatau ariā aunoa mō te arorau raupapa-tuatahi, e ahu mai ana i te tātai whakatau taupatupatu (conflict resolution calculus).",
  },
  skeptik: {
    description: "Ngā hātepe hei kōpeke i ngā whakamatautanga ōkawa ka whakaputaina e ngā kaiwhakaoti SAT/SMT me ngā kaiwhakamatau ariā aunoa.",
  },
  sensala: {
    description: "He anga tikanga hihiri mō te tukatuka reo tūturu.",
  },
  "computational-philosophy": {
    description: "Ngā whakaōkawatanga, nā te rorohiko i āwhina, o ngā whakamatautanga ontological i Coq, Isabelle me ngā kaiwhakamatau ariā aunoa.",
  },
};

export default mi;
