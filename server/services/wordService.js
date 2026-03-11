/**
 * Layer 3: Word Service
 * 500+ Indian words, fuzzy matching, aliases, hints
 */

// ── Word Dictionary ────────────────────────────────────────────────────────────
const WORD_CATEGORIES = {
  food: [
    'samosa','biryani','dosa','idli','vada','pav bhaji','chole bhature',
    'butter chicken','paneer','dal makhani','rajma','kadhi','khichdi',
    'poha','upma','paratha','chapati','naan','puri','bhatura',
    'aloo tikki','gol gappa','pani puri','bhel puri','sev puri',
    'vada pav','misal pav','kachori','jalebi','gulab jamun',
    'rasgulla','ladoo','barfi','halwa','kheer','kulfi',
    'lassi','chai','masala chai','thandai','buttermilk',
    'dhokla','thepla','modak','puran poli','uttapam',
    'appam','rasam','sambhar','tamarind rice','pulao',
    'dum biryani','chicken tikka','seekh kebab','tandoori chicken',
    'mutton curry','egg bhurji','paneer tikka','palak paneer',
    'matar paneer','aloo gobi','baingan bharta','jeera aloo',
    'saag','sarson da saag','makki roti','besan cheela',
    'ras malai','gajar halwa','besan ladoo','ghevar','malpua',
    'soan papdi','murukku','chakli','chivda','papad',
    'achaar','chutney','raita','nimbu pani','aam panna',
    'paan','chaat','papdi chaat','dahi puri','raj kachori',
    'dahi vada','aloo paratha','paneer paratha','gobi paratha',
    'stuffed paratha','bedmi puri','kadi pakora','dal tadka',
    'dal fry','mix veg','shahi paneer','navratan korma',
    'biryani rice','saffron rice','coconut rice','lemon rice',
    'curd rice','tomato rice','fried rice','noodles',
  ],
  bollywood: [
    'sholay','ddlj','lagaan','dil chahta hai','devdas','don',
    'dabangg','bajrangi bhaijaan','pk','3 idiots','dangal',
    'sultan','kabir singh','uri','andhadhun','stree',
    'sooryavanshi','rrr','bahubali','pushpa','kgf',
    'brahmastra','pathaan','jawan','animal','fighter',
    'amitabh bachchan','shahrukh khan','salman khan','aamir khan',
    'hrithik roshan','ranbir kapoor','ranveer singh','varun dhawan',
    'deepika padukone','priyanka chopra','katrina kaif','alia bhatt',
    'kareena kapoor','kajol','madhuri dixit','sridevi','rekha',
    'guru dutt','dilip kumar','raj kapoor','dev anand',
    'lata mangeshkar','kishore kumar','rafi','asha bhosle',
    'arijit singh','shreya ghoshal','sonu nigam','neha kakkar',
    'filmfare','yash raj films','dharma productions',
    'karan johar','rohit shetty','rajkumar hirani',
    'item number','playback singer','choreography',
    'blockbuster','superhit','flop','box office',
  ],
  cricket: [
    'cricket','bat','ball','wicket','stumps','crease',
    'boundary','six','four','maiden over','innings',
    'century','half century','duck','run out','stumped',
    'lbw','no ball','wide ball','yorker','bouncer',
    'googly','doosra','cover drive','pull shot','hook shot',
    'sweep shot','reverse sweep','drs','power play',
    'sachin tendulkar','ms dhoni','virat kohli','rohit sharma',
    'kapil dev','sunil gavaskar','rahul dravid','vvs laxman',
    'anil kumble','harbhajan singh','jasprit bumrah',
    'hardik pandya','shubman gill','rishabh pant',
    'yuvraj singh','sourav ganguly','venugopal rao',
    'ipl','bcci','wankhede','eden gardens','world cup',
    'test match','odi match','t20 match','ranji trophy',
    'wicket keeper','slip catch','fielding','bowling',
    'spin bowling','fast bowling','swing bowling',
  ],
  places: [
    'taj mahal','red fort','india gate','qutub minar',
    'gateway of india','hawa mahal','amber fort','charminar',
    'konark temple','khajuraho','ajanta caves','ellora caves',
    'hampi','mahabalipuram','sanchi stupa','bodh gaya',
    'varanasi','mathura','vrindavan','haridwar','rishikesh',
    'amritsar','golden temple','jallianwala bagh',
    'shimla','manali','dharamshala','leh ladakh',
    'goa beach','kerala backwaters','coorg','ooty','kodaikanal',
    'andaman islands','rann of kutch','sundarbans',
    'jim corbett','kaziranga','ranthambore','gir forest',
    'mumbai','delhi','bangalore','hyderabad','chennai',
    'kolkata','pune','jaipur','ahmedabad','lucknow',
    'agra','jodhpur','udaipur','chandigarh','mount abu',
    'pushkar','ajmer','jaisalmer','gangtok','shillong',
    'guwahati','jammu','srinagar','dehradun','mysore','madurai',
  ],
  household: [
    'charpai','jhoola','angithi','chulha','matka',
    'surahi','thali','katori','lota','kalash',
    'belan','chakla','kadhai','tawa','pressure cooker',
    'jhadu','pochha','bucket','chatai','darri',
    'gadda','razai','almari','sandook','taala',
    'desi ghee','sarso ka tel','haldi','mirchi',
    'dhaniya','jeera','hing','methi','saunf',
    'ajwain','kala namak','amchur','imli','garam masala',
    'mehndi','sindoor','bindi','bangles','mangalsutra',
    'kurta','salwar','dupatta','saree','lehenga',
    'dhoti','lungi','gamcha','juti','kolhapuri',
    'hawai chappal','pagri','diya','agarbatti','dhoop',
    'camphor','pooja thali','aarti','mandir bell','shankh',
    'tulsi plant','kite','patang','charkha',
  ],
  transport: [
    'auto rickshaw','cycle rickshaw','tanga','bullock cart',
    'jugaad vehicle','tempo','ambassador car','metro rail',
    'shatabdi express','rajdhani express','local train',
    'sleeper class','railway platform','state bus','share auto',
    'scooter','hero honda','royal enfield','bajaj chetak',
    'tractor','bicycle','traffic jam','toll booth',
    'petrol pump','dhaba','highway hotel','chaiwala stall',
    'thelewala','rehdi','khomcha','handcart',
  ],
  festivals: [
    'diwali','holi','dussehra','navratri','durga puja',
    'eid','christmas','baisakhi','lohri','makar sankranti',
    'pongal','onam','ugadi','gudi padwa','bihu',
    'raksha bandhan','karva chauth','teej','janmashtami',
    'ganesh chaturthi','ram navami','hanuman jayanti',
    'guru nanak jayanti','gurpurab','bakrid','muharram',
    'rangoli','kolam','alpana',
    'garba dance','dandiya dance','bhangra dance','giddha dance',
    'kathak','bharatnatyam','kuchipudi','odissi',
    'dholak','tabla','harmonium','sitar','sarod',
    'veena','mridangam','shehnai','bansuri','dhol','damru',
    'fireworks','diya lamp','mela','tamasha','ramlila',
  ],
  nature: [
    'elephant','tiger','lion','leopard','rhinoceros',
    'nilgai','blackbuck','monkey','langur','cobra snake',
    'python snake','monitor lizard','gharial','gangetic dolphin',
    'sea turtle','peacock','crane bird','flamingo',
    'hornbill','myna bird','sparrow','crow','parrot','pigeon','koel',
    'eagle','vulture','owl bird',
    'lotus flower','jasmine flower','marigold','rose','hibiscus',
    'bougainvillea','mogra','champa flower',
    'banyan tree','peepal tree','neem tree',
    'mango tree','coconut tree','tamarind tree','bamboo',
    'sugarcane','paddy field','wheat field',
    'monsoon rain','rainbow','lightning','thunderstorm',
    'river ganga','yamuna river','himalaya','western ghats',
    'thar desert','mangrove','coral reef',
  ],
  people: [
    'chaiwala','dhobi','naai','darzi','mochi','kumhar',
    'lohar','sunar','kisan','patwari','pandit','maulvi',
    'sarpanch','neta','mantri','collector','thanedar',
    'constable','doctor','hakim','vaid','nurse',
    'teacher','guru','engineer','architect','lawyer',
    'shopkeeper','bania','courier boy','milkman','sabziwala',
    'watchman','mali','safaiwala','bawarchi','rickshaw driver',
    'truck driver','bus driver','ticket collector','soldier',
    'officer','pilot','cricketer','wrestler','boxer',
    'actor','singer','dancer','director','journalist',
    'scientist','professor','student',
  ],
  modern: [
    'smartphone','selfie','instagram reels','youtube video',
    'whatsapp','facebook','twitter','zoom call',
    'paytm','phonepe','google pay','upi payment',
    'qr code','aadhaar card','pan card','voter id','passport',
    'startup','work from home','online class',
    'food delivery','swiggy','zomato','flipkart','amazon',
    'pubg','free fire','bgmi','ludo king',
    'dream11','fantasy cricket','jio sim','airtel',
    'smart tv','hotstar','netflix','amazon prime',
    'metro card','fastag','electric vehicle','bullet train',
    'digital india','solar panel',
  ],
  education: [
    'iit','iim','nit','aiims','upsc exam','jee exam',
    'neet exam','cat exam','gate exam','board exam',
    'tuition','coaching class','study material',
    'toppers list','merit list','scholarship',
    'blackboard','chalk','duster','marker pen',
    'school bag','water bottle','tiffin box',
    'homework','assignment','science project',
    'science fair','debate competition','quiz competition',
    'library','computer lab','school playground',
    'assembly prayer','national anthem',
    'report card','marks sheet','percentage','grade',
    'graduation ceremony','degree','diploma certificate',
  ],
}

const WORDS = Object.values(WORD_CATEGORIES).flat()

// ── Aliases for fuzzy matching ─────────────────────────────────────────────────
const ALIASES = {
  'gol gappa':         ['golgappa','pani puri','panipuri','paani puri','puchka','gupchup'],
  'pani puri':         ['golgappa','panipuri','gol gappa','pani poori','paani puri','puchka','gupchup'],
  'vada pav':          ['vada pao','wada pav','wada pao','vadapav','batata vada'],
  'pav bhaji':         ['pavbhaji','pao bhaji','paav bhaji'],
  'chole bhature':     ['chhole bhature','chola bhatura','chole batura','choley bhature'],
  'butter chicken':    ['murg makhani','murgh makhani','butter murgh','makhanwala'],
  'dal makhani':       ['daal makhani','dal makhni','daal makhni'],
  'aloo tikki':        ['alu tikki','aalu tikki','potato tikki'],
  'masala chai':       ['masala tea','chai','cutting chai','kadak chai'],
  'gulab jamun':       ['gulabjamun','gulab jaman','gulab jaman'],
  'gajar halwa':       ['carrot halwa','gajrela','gajar ka halwa'],
  'sarson da saag':    ['sarson ka saag','sarso ka saag','sarson saag'],
  'makki roti':        ['makke di roti','makki ki roti'],
  'taj mahal':         ['tajmahal','taj'],
  'red fort':          ['lal qila','lal kila','red fort agra'],
  'india gate':        ['indiagate','india gait'],
  'qutub minar':       ['qutab minar','kutub minar','qutb minar'],
  'golden temple':     ['harmandir sahib','darbar sahib'],
  'sachin tendulkar':  ['sachin','tendulkar','master blaster','little master'],
  'ms dhoni':          ['dhoni','msd','captain cool','mahi','mahendra singh dhoni'],
  'virat kohli':       ['kohli','virat','king kohli','run machine'],
  'rohit sharma':      ['rohit','hitman','rohit hitman'],
  'auto rickshaw':     ['auto','autorickshaw','tuk tuk','three wheeler'],
  'royal enfield':     ['bullet','enfield','bullet bike'],
  'raksha bandhan':    ['rakhi','rakshabandhan'],
  'ganesh chaturthi':  ['ganesh puja','vinayak chaturthi','ganeshotsav'],
  'makar sankranti':   ['sankranti','makar sankrant','uttarayan'],
  '3 idiots':          ['three idiots','3idiots'],
  'ddlj':              ['dilwale dulhania le jayenge'],
  'google pay':        ['gpay','googlepay','g pay'],
  'rhinoceros':        ['rhino','gainda','rhinoceros'],
  'upi payment':       ['upi','unified payment interface'],
  'neet exam':         ['neet','national eligibility test'],
  'jee exam':          ['jee','joint entrance exam','iit jee'],
  'upsc exam':         ['upsc','ias exam','civil services'],
  'leh ladakh':        ['leh','ladakh','ladhak'],
}

// ── Levenshtein distance ───────────────────────────────────────────────────────
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

// ── Check if guess is correct ──────────────────────────────────────────────────
function isCorrect(guess, word) {
  const g = guess.toLowerCase().trim()
  const w = word.toLowerCase().trim()
  if (!g || g.length < 2) return false
  if (g === w) return true

  // Direct alias check
  const wordAliases = ALIASES[w] || []
  if (wordAliases.includes(g)) return true

  // Reverse alias — check if both g and w share an alias group
  for (const [canonical, aliasList] of Object.entries(ALIASES)) {
    const allForms = [canonical, ...aliasList]
    if (allForms.includes(w) && allForms.includes(g)) return true
  }

  // No-space compare (panipuri vs pani puri)
  if (g.replace(/\s+/g, '') === w.replace(/\s+/g, '')) return true

  // Levenshtein fuzzy (1-3 chars tolerance based on length)
  const cleanLen = w.replace(/\s/g, '').length
  const maxDist = cleanLen <= 4 ? 1 : cleanLen <= 8 ? 2 : 3
  if (levenshtein(g, w) <= maxDist) return true

  // Fuzzy against aliases
  if (wordAliases.some(a => levenshtein(g, a) <= 1)) return true

  return false
}

// ── Check if guess is close (warm!) ────────────────────────────────────────────
function isClose(guess, word) {
  if (isCorrect(guess, word)) return false
  const g = guess.toLowerCase().trim()
  const w = word.toLowerCase().trim()
  if (g.length < 2) return false
  return levenshtein(g, w) <= 2 || g.includes(w.slice(0, 3))
}

// ── Get 3 word choices (1 from 3 diff categories) — returns plain strings ──────
function getWordChoices() {
  const cats = Object.keys(WORD_CATEGORIES)
  const shuffled = [...cats].sort(() => Math.random() - 0.5).slice(0, 3)
  return shuffled.map(cat => {
    const words = WORD_CATEGORIES[cat]
    return words[Math.floor(Math.random() * words.length)] // plain string!
  })
}

// ── Mask word (e.g. "samosa" → "_ _ _ _ _ _") ─────────────────────────────────
function getMaskedWord(word, revealedIndices = []) {
  return word.split('').map((ch, i) => {
    if (ch === ' ') return ' '
    return revealedIndices.includes(i) ? ch : '_'
  }).join(' ')
}

// ── Get category of a word ─────────────────────────────────────────────────────
function getCategoryOf(word) {
  for (const [cat, words] of Object.entries(WORD_CATEGORIES)) {
    if (words.includes(word.toLowerCase())) return cat
  }
  return 'general'
}

module.exports = {
  WORD_CATEGORIES,
  WORDS,
  ALIASES,
  isCorrect,
  isClose,
  getWordChoices,
  getMaskedWord,
  getCategoryOf,
}
