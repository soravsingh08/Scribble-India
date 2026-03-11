// ═══════════════════════════════════════════════════════
//  SCRIBBLE INDIA — Word Dictionary
//  500+ Indian words across 12 categories
// ═══════════════════════════════════════════════════════

export const WORD_CATEGORIES = {

  // ── 🍛 Indian Food & Street Food ──────────────────────
  food: [
    "samosa", "biryani", "dosa", "idli", "vada", "pav bhaji", "chole bhature",
    "butter chicken", "paneer", "dal makhani", "rajma", "kadhi", "khichdi",
    "poha", "upma", "paratha", "chapati", "naan", "puri", "bhatura",
    "aloo tikki", "gol gappa", "pani puri", "bhel puri", "sev puri",
    "vada pav", "misal pav", "dabeli", "kachori", "jalebi", "gulab jamun",
    "rasgulla", "ladoo", "barfi", "halwa", "kheer", "rabri", "kulfi",
    "lassi", "chai", "masala chai", "thandai", "shikanjvi", "buttermilk",
    "mango lassi", "rose sherbet", "sugarcane juice", "coconut water",
    "dhokla", "thepla", "handvo", "undhiyu", "modak", "puran poli",
    "pesarattu", "uttapam", "appam", "puttu", "aviyal", "rasam",
    "sambhar", "tamarind rice", "lemon rice", "pulao", "dum biryani",
    "chicken tikka", "seekh kebab", "tandoori chicken", "mutton curry",
    "fish curry", "prawn masala", "egg bhurji", "paneer tikka",
    "palak paneer", "matar paneer", "shahi paneer", "aloo gobi",
    "baingan bharta", "jeera aloo", "saag", "sarson da saag",
    "makki roti", "bajra roti", "besan cheela", "moong dal chilla",
    "ras malai", "gajar halwa", "besan ladoo", "til ladoo", "churma",
    "ghevar", "malpua", "imarti", "balushahi", "soan papdi",
    "murukku", "chakli", "chivda", "mixture", "farsan", "namkeen",
    "papad", "achaar", "chutney", "raita", "boondi raita",
    "nimbu pani", "aam panna", "jaljeera", "kanji", "sattu",
    "paan", "meetha paan", "supari", "mukhwas", "elaichi",
    "chaat", "papdi chaat", "dahi puri", "raj kachori", "tokri chaat",
  ],

  // ── 🎬 Bollywood & Entertainment ──────────────────────
  bollywood: [
    "sholay", "ddlj", "mughal e azam", "mother india", "lagaan",
    "dil chahta hai", "kaho na pyaar hai", "k3g", "devdas", "don",
    "dabangg", "wanted", "singham", "bajrangi bhaijaan", "pk",
    "3 idiots", "dangal", "sultan", "tiger zinda hai", "war",
    "kabir singh", "uri", "article 15", "andhadhun", "stree",
    "dream girl", "de de pyaar de", "good newwz", "sooryavanshi",
    "amitabh bachchan", "shahrukh khan", "salman khan", "aamir khan",
    "hrithik roshan", "ranbir kapoor", "ranveer singh", "varun dhawan",
    "deepika padukone", "priyanka chopra", "katrina kaif", "alia bhatt",
    "kareena kapoor", "kajol", "madhuri dixit", "sridevi", "rekha",
    "guru dutt", "dilip kumar", "raj kapoor", "dev anand",
    "item number", "interval", "multiplex", "single screen",
    "filmy", "dialogue", "climax", "villain", "heroine", "hero",
    "playback singer", "background score", "choreography", "stunt",
    "lata mangeshkar", "kishore kumar", "rafi", "asha bhosle",
    "arijit singh", "shreya ghoshal", "sonu nigam", "neha kakkar",
    "filmfare", "iifa", "star screen", "national award",
    "yash raj films", "dharma productions", "t series", "eros now",
    "hotstar", "netflix india", "amazon prime",
    "ekta kapoor", "karan johar", "rohit shetty", "rajkumar hirani",
    "anurag kashyap", "imtiaz ali", "zoya akhtar", "vishal bhardwaj",
    "sunidhi chauhan", "himesh reshammiya", "bappi lahiri",
  ],

  // ── 🏏 Cricket & Sports ───────────────────────────────
  cricket: [
    "cricket", "bat", "ball", "wicket", "stumps", "crease",
    "boundary", "six", "four", "maiden", "over", "innings",
    "century", "half century", "duck", "run out", "stumped",
    "lbw", "caught behind", "no ball", "wide", "yorker",
    "bouncer", "googly", "doosra", "carrom ball", "flipper",
    "cover drive", "pull shot", "hook shot", "sweep", "reverse sweep",
    "drs", "third umpire", "power play", "death overs",
    "sachin tendulkar", "ms dhoni", "virat kohli", "rohit sharma",
    "kapil dev", "sunil gavaskar", "rahul dravid", "vvs laxman",
    "anil kumble", "harbhajan singh", "zaheer khan", "ishant sharma",
    "hardik pandya", "jasprit bumrah", "shubman gill", "rishabh pant",
    "ipl", "bcci", "wankhede", "eden gardens", "chepauk",
    "lords", "mcg", "world cup", "champions trophy", "asia cup",
    "test match", "odi", "t20", "ranji trophy", "duleep trophy",
    "kabaddi", "kho kho", "hockey", "badminton", "wrestling",
    "pv sindhu", "saina nehwal", "mary kom", "sushil kumar",
    "bajrang punia", "neeraj chopra", "abhinav bindra",
    "chess", "vishwanathan anand", "carrom", "gilli danda",
  ],

  // ── 🏛️ Indian Places & Monuments ─────────────────────
  places: [
    "taj mahal", "red fort", "india gate", "qutub minar",
    "gateway of india", "hawa mahal", "amber fort", "charminar",
    "konark temple", "khajuraho", "ajanta caves", "ellora caves",
    "hampi", "mahabalipuram", "sanchi stupa", "bodh gaya",
    "varanasi", "mathura", "vrindavan", "haridwar", "rishikesh",
    "amritsar", "golden temple", "jallianwala bagh",
    "shimla", "manali", "dharamshala", "leh", "ladakh",
    "goa beach", "kerala backwaters", "coorg", "ooty", "kodaikanal",
    "andaman", "lakshadweep", "rann of kutch", "sundarbans",
    "jim corbett", "kaziranga", "ranthambore", "gir forest",
    "mumbai", "delhi", "bangalore", "hyderabad", "chennai",
    "kolkata", "pune", "jaipur", "ahmedabad", "surat",
    "lucknow", "kanpur", "agra", "jodhpur", "udaipur",
    "gangtok", "shillong", "guwahati", "imphal", "aizawl",
    "bhopal", "indore", "nagpur", "raipur", "bhubaneswar",
    "visakhapatnam", "vijayawada", "madurai", "coimbatore",
    "thiruvananthapuram", "kochi", "kozhikode", "mysore",
    "chandigarh", "ludhiana", "amritsar", "jalandhar",
    "dehradun", "haridwar", "meerut", "allahabad", "varanasi",
    "patna", "ranchi", "guwahati", "jammu", "srinagar",
    "mount abu", "pushkar", "ajmer", "jaisalmer",
  ],

  // ── 🏠 Desi Household & Everyday Life ────────────────
  household: [
    "charpai", "takhat", "manji", "jhoola", "angithi",
    "chulha", "sigri", "matka", "ghada", "surahi",
    "thali", "katori", "lota", "kalash", "chimta",
    "belan", "chakla", "kadhai", "tawa", "degchi",
    "cooker", "pressure cooker", "mixer", "grinder",
    "jhadu", "pochha", "bucket", "mug", "nalbuti",
    "chatai", "darri", "gadda", "takiya", "razai",
    "almari", "sandook", "taala", "chaabi", "darwaza",
    "deewar", "chhat", "angan", "sehan", "baithak",
    "desi ghee", "sarso ka tel", "nariyal tel", "til oil",
    "haldi", "mirchi", "dhaniya", "jeera", "hing", "methi",
    "saunf", "ajwain", "kala namak", "sendha namak", "amchur",
    "imli", "khatai", "garam masala", "chaat masala",
    "mehndi", "sindoor", "bindi", "bangles", "mangalsutra",
    "kurta", "salwar", "dupatta", "saree", "lehenga",
    "dhoti", "lungi", "gamcha", "angavastram",
    "juti", "kolhapuri", "hawai chappal", "mojdi",
    "pagri", "topi", "dupatta", "odhni",
    "diya", "agarbatti", "dhoop", "camphor", "roli",
    "pooja thali", "aarti", "mandir", "bell", "shankh",
    "tulsi plant", "neem tree", "peepal tree",
    "kite", "patang", "charkha", "spinning wheel",
  ],

  // ── 🚗 Desi Transport & Streets ──────────────────────
  transport: [
    "auto rickshaw", "cycle rickshaw", "tanga", "bullock cart",
    "jugaad", "tempo", "matador", "ambassador car",
    "premier padmini", "bullet train", "metro rail",
    "shatabdi", "rajdhani", "duronto", "jan shatabdi",
    "local train", "sleeper class", "ac coach", "pantry car",
    "platform", "booking window", "waiting room",
    "state bus", "private bus", "mini bus", "volvo bus",
    "share auto", "app cab", "ola", "uber",
    "scooter", "hero honda", "royal enfield", "bajaj",
    "tractor", "thresher", "harvester",
    "cycle", "bicycle", "sidecar",
    "dhow", "country boat", "ferry", "houseboat",
    "traffic jam", "signal", "flyover", "underpass",
    "toll booth", "highway", "expressway", "katcha road",
    "petrol pump", "dhaba", "highway hotel",
    "chaiwala", "thelewala", "rehdi", "khomcha",
  ],

  // ── 🎭 Indian Festivals & Culture ────────────────────
  festivals: [
    "diwali", "holi", "dussehra", "navratri", "durga puja",
    "eid", "christmas", "baisakhi", "lohri", "makar sankranti",
    "pongal", "onam", "ugadi", "gudi padwa", "bihu",
    "raksha bandhan", "karva chauth", "teej", "janmashtami",
    "ganesh chaturthi", "ram navami", "hanuman jayanti",
    "id ul fitr", "eid ul adha", "muharram", "bakrid",
    "guru nanak jayanti", "baisakhi", "gurpurab",
    "christmas crib", "easter", "good friday",
    "republic day", "independence day", "gandhi jayanti",
    "rangoli", "kolam", "alpana", "mandana",
    "garba", "dandiya", "bhangra", "giddha",
    "kathak", "bharatnatyam", "kuchipudi", "odissi",
    "manipuri", "mohiniyattam", "sattriya",
    "dholak", "tabla", "harmonium", "sitar", "sarod",
    "veena", "mridangam", "shehnai", "bansuri",
    "dhol", "nagara", "damru", "ektara",
    "fireworks", "pataakha", "anar", "chakri",
    "lantern", "diya", "candle", "torch",
    "mela", "tamasha", "nautanki", "ramlila",
  ],

  // ── 🦁 Indian Animals & Nature ───────────────────────
  nature: [
    "elephant", "tiger", "lion", "leopard", "cheetah",
    "rhinoceros", "gaur", "nilgai", "blackbuck", "chinkara",
    "barking deer", "mouse deer", "wild boar",
    "monkey", "langur", "macaque", "loris",
    "cobra", "python", "viper", "krait", "monitor lizard",
    "chameleon", "gecko", "tortoise", "crocodile", "mugger",
    "gharial", "gangetic dolphin", "sea turtle",
    "peacock", "crane", "flamingo", "hornbill", "myna",
    "sparrow", "crow", "parrot", "pigeon", "koel",
    "vulture", "eagle", "hawk", "owl", "nightjar",
    "lotus", "jasmine", "marigold", "rose", "hibiscus",
    "bougainvillea", "mogra", "champa", "parijat",
    "banyan tree", "peepal tree", "neem tree",
    "mango tree", "coconut tree", "tamarind tree",
    "bamboo", "sugarcane", "paddy", "wheat field",
    "monsoon", "rainbow", "lightning", "thunder",
    "river ganga", "yamuna", "godavari", "cauvery",
    "himalaya", "western ghats", "deccan plateau",
    "thar desert", "mangrove", "coral reef",
  ],

  // ── 🧑‍💼 Desi Professions & Characters ───────────────
  people: [
    "chaiwala", "dhobi", "naai", "darzi", "mochi",
    "kumhar", "lohar", "sunar", "banjara", "fisherman",
    "kisan", "zamindar", "patwari",
    "pandit", "maulvi", "padre", "granthiji",
    "sarpanch", "neta", "mantri", "collector",
    "thanedar", "constable", "sipahi", "guard",
    "doctor", "hakim", "vaid", "nurse", "compounder",
    "teacher", "master", "guru", "sir", "madam",
    "engineer", "architect", "lawyer", "advocate",
    "shopkeeper", "dukandar", "seths", "bania",
    "courier boy", "delivery man", "milkman", "sabziwala",
    "watchman", "mali", "sweeper", "safaiwala",
    "cook", "bawarchi", "khansama",
    "rickshaw driver", "truck driver", "bus driver",
    "conductor", "ticket collector", "guard",
    "soldier", "officer", "pilot", "sailor",
    "cricketer", "footballer", "wrestler", "boxer",
    "actor", "actress", "singer", "dancer", "director",
    "journalist", "reporter", "anchor", "cameraman",
    "scientist", "researcher", "professor", "student",
  ],

  // ── 📱 Modern India ────────────────────────────────────
  modern: [
    "smartphone", "selfie", "reels", "instagram", "youtube",
    "whatsapp", "facebook", "twitter", "snapchat",
    "ott platform", "binge watch", "streaming",
    "paytm", "phonepe", "google pay", "upi", "qr code",
    "aadhaar", "pan card", "voter id", "passport",
    "startup", "unicorn", "vc funding", "pitch deck",
    "work from home", "zoom call", "online class",
    "food delivery", "swiggy", "zomato", "dunzo",
    "online shopping", "flipkart", "amazon", "meesho",
    "tiktok", "moj", "josh", "sharechat",
    "pubg", "free fire", "bgmi", "ludo king",
    "cricket app", "fantasy league", "dream11",
    "iphone", "samsung", "oneplus", "redmi", "realme",
    "jio", "airtel", "bsnl", "vi", "broadband",
    "smart tv", "dtv", "tata play", "hotstar",
    "metro card", "fastag", "digital wallet",
    "cowin", "vaccination", "health app",
    "solar panel", "electric vehicle", "ev charging",
    "bullet train project", "smart city", "digital india",
  ],

  // ── 🎓 Indian Education & Exams ───────────────────────
  education: [
    "iit", "iim", "nit", "aiims", "upsc",
    "jee", "neet", "cat", "gate", "clat",
    "board exam", "class 10", "class 12",
    "cbse", "icse", "state board",
    "tuition", "coaching", "study material",
    "toppers", "merit list", "rank list",
    "scholarship", "fellowship", "stipend",
    "blackboard", "chalk", "duster", "marker",
    "school bag", "water bottle", "tiffin box",
    "homework", "assignment", "project",
    "science fair", "debate", "quiz competition",
    "library", "computer lab", "playground",
    "assembly", "national anthem", "prayer",
    "monitor", "prefect", "head boy", "head girl",
    "report card", "marks", "percentage", "grade",
    "pass", "fail", "compartment", "reappear",
    "graduation", "convocation", "degree", "diploma",
  ],
}

// ── Flat word list for the game ────────────────────────
export const WORDS = Object.values(WORD_CATEGORIES).flat()

// ── Aliases for fuzzy matching (Hinglish variations) ───
const ALIASES = {
  // Food aliases
  "gol gappa":       ["golgappa","pani puri","panipuri","paani puri","gol gappa","puchka","pakodi"],
  "pani puri":       ["golgappa","panipuri","gol gappa","pani poori","paani puri","puchka"],
  "panipuri":        ["gol gappa","pani puri","puchka","paani puri"],
  "vada pav":        ["vada pao","wada pav","wada pao","vadapav","batata vada"],
  "pav bhaji":       ["pavbhaji","pao bhaji","paav bhaji"],
  "chole bhature":   ["chhole bhature","chola bhatura","chole batura"],
  "butter chicken":  ["murg makhani","murgh makhani","butter murgh"],
  "dal makhani":     ["daal makhani","dal makhni"],
  "aloo tikki":      ["alu tikki","aalu tikki","potato tikki"],
  "bhel puri":       ["bhelpuri","bhel poori"],
  "sev puri":        ["sevpuri","sev poori"],
  "masala chai":     ["masala tea","chai","cutting chai"],
  "gulab jamun":     ["gulabjamun","gulab jaman"],
  "jalebi":          ["jilapi","jelabi"],
  "gajar halwa":     ["carrot halwa","gajrela"],
  "sarson da saag":  ["sarson ka saag","sarso ka saag"],
  "makki roti":      ["makke di roti","makki ki roti"],
  // Places
  "taj mahal":       ["tajmahal","taj"],
  "red fort":        ["lal qila","lal kila"],
  "india gate":      ["indiagate"],
  "qutub minar":     ["qutab minar","kutub minar","qutb minar"],
  "gateway of india":["gateway"],
  "hawa mahal":      ["hawamahal","palace of winds"],
  "golden temple":   ["harmandir sahib","darbar sahib"],
  "bodh gaya":       ["bodhgaya","buddha gaya"],
  // Cricket
  "sachin tendulkar":["sachin","tendulkar","master blaster","god of cricket"],
  "ms dhoni":        ["dhoni","msd","captain cool","mahi"],
  "virat kohli":     ["kohli","virat","king kohli","chashma"],
  "rohit sharma":    ["rohit","hitman"],
  "kapil dev":       ["kapil","haryana hurricane"],
  // Transport
  "auto rickshaw":   ["auto","autorickshaw","tuk tuk"],
  "cycle rickshaw":  ["rickshaw","cycle-rickshaw"],
  "royal enfield":   ["bullet","enfield","re","royal"],
  // Festivals
  "raksha bandhan":  ["rakhi","rakshabandhan"],
  "karva chauth":    ["karvachauth","karva choth"],
  "ganesh chaturthi":["ganesh puja","vinayak chaturthi","ganeshotsav"],
  "makar sankranti": ["sankranti","makar sankrant","uttarayan"],
  // Bollywood
  "3 idiots":        ["three idiots","3idiots"],
  "ddlj":            ["dilwale dulhania le jayenge","dilwale dulhaniya"],
  "k3g":             ["kabhi khushi kabhie gham","k3g"],
  "pk":              ["peekay","pee kay"],
  // People
  "chaiwala":        ["chai wala","tea stall","chaiwalah"],
  "sabziwala":       ["sabji wala","vegetable vendor","sabzee wala"],
  // Modern
  "google pay":      ["gpay","googlepay"],
  "phonepe":         ["phone pe","phonepe"],
  // Animals
  "rhinoceros":      ["rhino","rhinoceros","gainda"],
  "peacock":         ["mor","peahen"],
  // General
  "icecream":        ["ice cream","ice-cream"],
  "hotdog":          ["hot dog","hot-dog"],
  "watermelon":      ["water melon"],
  "sunflower":       ["sun flower"],
  "skateboard":      ["skate board"],
}

// ── Get 3 random word choices (one per category) ───────
export function getWordChoices() {
  const cats = Object.keys(WORD_CATEGORIES)
  const shuffledCats = [...cats].sort(() => Math.random() - 0.5).slice(0, 3)
  return shuffledCats.map(cat => {
    const words = WORD_CATEGORIES[cat]
    const picked = words[Math.floor(Math.random() * words.length)]
    // always return a string
    return typeof picked === 'string' ? picked : String(picked ?? 'samosa')
  })
}

// ── Get category label for a word ─────────────────────
export function getWordCategory(word) {
  if (!word || typeof word !== 'string') return 'general'
  const w = word.toLowerCase().trim()
  for (const [cat, wordList] of Object.entries(WORD_CATEGORIES)) {
    if (wordList.includes(w)) return cat
  }
  return 'general'
}

// ── Build masked word ──────────────────────────────────
// "samosa" → "_ _ _ _ _ _"
export function getMaskedWord(word, revealedIndices = []) {
  return word
    .split("")
    .map((ch, i) => {
      if (ch === " ") return "  "
      if (revealedIndices.includes(i)) return ch.toUpperCase()
      return "_"
    })
    .join(" ")
}

// ── Levenshtein distance ───────────────────────────────
function levenshtein(a, b) {
  const m = a.length, n = b.length
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}

// ── Main fuzzy match function ──────────────────────────
export function isCorrectGuess(guess, word) {
  const g = guess.toLowerCase().trim()
  const w = word.toLowerCase().trim()

  if (!g || g.length < 2) return false
  if (g === w) return true

  // Check direct aliases
  const aliases = ALIASES[w] || []
  if (aliases.some(a => a === g)) return true

  // Check reverse aliases (is 'g' an alias that points to 'w')
  for (const [canonical, aliasList] of Object.entries(ALIASES)) {
    if (aliasList.includes(w) && (aliasList.includes(g) || g === canonical)) return true
    if (canonical === w && aliasList.some(a => a === g)) return true
  }

  // Remove spaces and compare (panipuri vs pani puri)
  if (g.replace(/\s+/g, "") === w.replace(/\s+/g, "")) return true

  // Levenshtein fuzzy: 1 typo for ≤5 chars, 2 for ≤10, 3 for longer
  const maxDist = w.replace(/\s/g, "").length <= 5 ? 1
    : w.replace(/\s/g, "").length <= 10 ? 2 : 3
  if (levenshtein(g, w) <= maxDist) return true

  // Also fuzzy check against aliases
  if (aliases.some(a => levenshtein(g, a) <= 1)) return true

  return false
}

// ── Close guess (1-2 chars off, show hint "close!") ───
export function isCloseGuess(guess, word) {
  if (isCorrectGuess(guess, word)) return false
  const g = guess.toLowerCase().trim()
  const w = word.toLowerCase().trim()
  if (g.length < 2) return false
  return levenshtein(g, w) <= 2
}
