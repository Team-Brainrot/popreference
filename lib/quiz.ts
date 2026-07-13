export type QuizQuestion = {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
  hint: string
  /** Meme niche difficulty, 1 (mainstream) .. 9 (deep-cut). Mirrors the niche scale. */
  niche: number
}

/**
 * Adaptive meme-knowledge question pool. The quiz starts with low-niche
 * (mainstream) questions and escalates as the player answers correctly, so
 * distractors are written to be plausible rather than obvious.
 */
export const quizQuestions: QuizQuestion[] = [
  // ---- Niche 1: mainstream ----
  {
    id: "amogus",
    prompt: "Calling someone “sus” (a.k.a. amogus) is saying they seem…",
    options: ["Hilarious", "Exhausted", "Suspicious", "Talented"],
    correctIndex: 2,
    hint: "The vibe that gets you voted off the ship.",
    niche: 1,
  },
  {
    id: "skibidi",
    prompt: "In the “Skibidi Toilet” series, the antagonists are singing heads that rise out of…",
    options: ["TVs", "Sinks", "Speakers", "Toilets"],
    correctIndex: 3,
    hint: "Check the title of the series.",
    niche: 1,
  },

  // ---- Niche 2: still very mainstream ----
  {
    id: "rizz",
    prompt: "Someone says you have serious “rizz.” What are they praising?",
    options: ["Your charisma and flirting game", "Your gaming skills", "Your fashion sense", "Your savings"],
    correctIndex: 0,
    hint: "It's a clipped form of a longer word.",
    niche: 2,
  },
  {
    id: "bussin",
    prompt: "If a plate of food is “bussin,” it is…",
    options: ["Overpriced", "Absolutely delicious", "Undercooked", "Way too spicy"],
    correctIndex: 1,
    hint: "High praise, usually about a meal.",
    niche: 2,
  },
  {
    id: "doge",
    prompt: "The classic Doge meme features which dog breed?",
    options: ["Akita Inu", "Shiba Inu", "Corgi", "Pomeranian"],
    correctIndex: 1,
    hint: "Often mixed up with its larger cousin.",
    niche: 2,
  },
  {
    id: "mrbeast",
    prompt: "MrBeast built his massive following mainly through…",
    options: ["Big-budget stunts and giveaways", "Makeup tutorials", "Political debates", "Cooking streams"],
    correctIndex: 0,
    hint: "Think huge cash challenges.",
    niche: 2,
  },
  {
    id: "fr",
    prompt: "Typing “fr fr” is a way to stress that you're…",
    options: ["Just kidding", "About to leave", "Being completely serious", "Totally confused"],
    correctIndex: 2,
    hint: "It's an abbreviation of two words.",
    niche: 2,
  },
  {
    id: "cringe",
    prompt: "Labeling something “cringe” marks it as…",
    options: ["Awkward or embarrassing", "Expensive", "Impressive", "Relaxing"],
    correctIndex: 0,
    hint: "It makes you wince.",
    niche: 2,
  },

  // ---- Niche 3 ----
  {
    id: "gyatt",
    prompt: "Yelling “gyatt” is an exaggerated reaction to…",
    options: ["A jump scare", "Someone's curvy figure", "A bad smell", "A clutch win"],
    correctIndex: 1,
    hint: "A hype reaction, often about a physique.",
    niche: 3,
  },
  {
    id: "sigma",
    prompt: "A “sigma male” is stereotyped as…",
    options: ["A team captain", "A lone wolf who plays by his own rules", "A class clown", "A loyal follower"],
    correctIndex: 1,
    hint: "Supposedly outside the usual hierarchy.",
    niche: 3,
  },
  {
    id: "gigachad",
    prompt: "The “Gigachad” image is used to represent…",
    options: ["Total exhaustion", "Being broke", "Peak confidence or being objectively right", "Extreme shyness"],
    correctIndex: 2,
    hint: "A chiseled, unbothered icon.",
    niche: 3,
  },
  {
    id: "ishowspeed",
    prompt: "IShowSpeed first rose to fame as a…",
    options: ["High-energy livestreamer", "Film director", "Pro chef", "News anchor"],
    correctIndex: 0,
    hint: "Known for explosive reactions on camera.",
    niche: 3,
  },
  {
    id: "hitting-the-griddy",
    prompt: "“Hitting the griddy” refers to a…",
    options: ["Card trick", "Dance move", "Game glitch", "Way of sleeping"],
    correctIndex: 1,
    hint: "You'll see it in end zones.",
    niche: 3,
  },
  {
    id: "based",
    prompt: "Calling an opinion “based” means you think it's…",
    options: ["Poorly researched", "Boring", "Admirably true to itself", "Offensive"],
    correctIndex: 2,
    hint: "The opposite of caving to pressure.",
    niche: 3,
  },
  {
    id: "ratio",
    prompt: "On social media, getting “ratio'd” means your post drew…",
    options: ["More replies than likes", "A verification badge", "A pinned comment", "A celebrity share"],
    correctIndex: 0,
    hint: "It's about the reply-to-like balance.",
    niche: 3,
  },
  {
    id: "dj-khaled",
    prompt: "DJ Khaled is famous for shouting which catchphrase?",
    options: ["“Yeet!”", "“Another one!”", "“No cap!”", "“Let's go!”"],
    correctIndex: 1,
    hint: "He keeps adding… more.",
    niche: 3,
  },
  {
    id: "glizzy",
    prompt: "In meme slang, a “glizzy” is a…",
    options: ["Handshake", "Haircut", "Hot dog", "Skateboard"],
    correctIndex: 2,
    hint: "You'd eat it at a cookout.",
    niche: 3,
  },

  // ---- Niche 4 ----
  {
    id: "delulu",
    prompt: "Being “delulu” is short for being…",
    options: ["Delightful", "Delusional (in a hopeful way)", "Deliberate", "Delayed"],
    correctIndex: 1,
    hint: "Usually about unrealistic crushes or dreams.",
    niche: 4,
  },
  {
    id: "ohio",
    prompt: "In brainrot slang, saying something is “only in Ohio” implies it's…",
    options: ["Luxurious", "Bizarre or cursed", "Boring", "Expensive"],
    correctIndex: 1,
    hint: "A state turned into a punchline for weirdness.",
    niche: 4,
  },
  {
    id: "aura",
    prompt: "Gaining “aura points” means you just did something…",
    options: ["Effortlessly cool", "Embarrassing", "Illegal", "Generous"],
    correctIndex: 0,
    hint: "Do something lame and you lose them.",
    niche: 4,
  },
  {
    id: "goofy-ahh",
    prompt: "Tacking “goofy ahh” onto a noun makes it sound…",
    options: ["Silly or ridiculous", "Serious", "Expensive", "Terrifying"],
    correctIndex: 0,
    hint: "A playful intensifier.",
    niche: 4,
  },
  {
    id: "npc",
    prompt: "Calling a person an “NPC” suggests they…",
    options: ["Are very wealthy", "Act without original thought", "Are a pro athlete", "Are a celebrity"],
    correctIndex: 1,
    hint: "Borrowed from background video-game characters.",
    niche: 4,
  },
  {
    id: "cooked",
    prompt: "If you're “cooked,” you are…",
    options: ["Well rested", "In serious trouble", "Suddenly rich", "Getting promoted"],
    correctIndex: 1,
    hint: "Not a good position to be in.",
    niche: 4,
  },
  {
    id: "kai-cenat",
    prompt: "Kai Cenat is best known as a…",
    options: ["Twitch streamer", "Football coach", "Pastry chef", "Senator"],
    correctIndex: 0,
    hint: "Record-breaking subathons.",
    niche: 4,
  },
  {
    id: "smurf-cat",
    prompt: "The viral “Smurf cat” (Shailushai) is usually paired against a…",
    options: ["Strawberry elephant", "Golden retriever", "Purple owl", "Green frog"],
    correctIndex: 0,
    hint: "Its rival mashes a fruit with an animal.",
    niche: 4,
  },
  {
    id: "freddy-fazbear",
    prompt: "Freddy Fazbear is the animatronic mascot of which horror franchise?",
    options: ["Five Nights at Freddy's", "Poppy Playtime", "Bendy and the Ink Machine", "Amnesia"],
    correctIndex: 0,
    hint: "The nights are counted in fives.",
    niche: 4,
  },

  // ---- Niche 5 ----
  {
    id: "fanum",
    prompt: "Your friend bites your food and yells “Fanum tax!” What happened?",
    options: [
      "They paid for your meal",
      "They stole a portion of your food",
      "They gave you extra fries",
      "They started a food fight",
    ],
    correctIndex: 1,
    hint: "Named after the streamer who did it constantly.",
    niche: 5,
  },
  {
    id: "mewing",
    prompt: "The “mewing” trend is all about…",
    options: ["A dance", "Tongue posture to sharpen your jawline", "A cat impression", "A pre-workout"],
    correctIndex: 1,
    hint: "A looksmaxxing technique.",
    niche: 5,
  },
  {
    id: "slender-man",
    prompt: "Slender Man originated from a 2009 contest on which website?",
    options: ["Something Awful", "Reddit", "4chan", "Tumblr"],
    correctIndex: 0,
    hint: "A paranormal-photo editing thread.",
    niche: 5,
  },
  {
    id: "lenny-face",
    prompt: "The “Lenny face” ( ͡° ͜ʖ ͡°) is typically dropped to imply…",
    options: ["Innuendo or mischief", "Deep sadness", "Pure rage", "Total boredom"],
    correctIndex: 0,
    hint: "A knowing, suggestive nudge.",
    niche: 5,
  },
  {
    id: "the-ocky-way",
    prompt: "“The ocky way” comes from a NYC deli clerk building elaborate…",
    options: ["Sandwiches", "Haircuts", "Sneakers", "Tattoos"],
    correctIndex: 0,
    hint: "Made behind a bodega counter.",
    niche: 5,
  },
  {
    id: "lightskin-stare",
    prompt: "The “lightskin stare” meme is an exaggerated…",
    options: ["Half-lidded seductive gaze", "Angry glare", "Crying face", "Wide-eyed shock"],
    correctIndex: 0,
    hint: "A smug, half-closed-eyes look.",
    niche: 5,
  },
  {
    id: "sisyphus",
    prompt: "“One must imagine Sisyphus happy” refers to a man condemned to forever…",
    options: ["Roll a boulder uphill", "Swim an endless ocean", "Count grains of sand", "Climb a bottomless ladder"],
    correctIndex: 0,
    hint: "A Greek myth about a pointless task.",
    niche: 5,
  },
  {
    id: "kevin-james",
    prompt: "The “Kevin James” reaction image is a shrugging still from which sitcom?",
    options: ["The King of Queens", "Friends", "Seinfeld", "Frasier"],
    correctIndex: 0,
    hint: "He played a Queens delivery driver.",
    niche: 5,
  },

  // ---- Niche 6 ----
  {
    id: "huggy-wuggy",
    prompt: "Huggy Wuggy, the toothy blue monster, comes from which game?",
    options: ["Poppy Playtime", "Five Nights at Freddy's", "Garten of Banban", "Roblox Doors"],
    correctIndex: 0,
    hint: "A toy-factory horror title.",
    niche: 6,
  },
  {
    id: "backrooms",
    prompt: "“The Backrooms” depicts endless liminal rooms defined by…",
    options: ["Yellow wallpaper and buzzing lights", "Neon nightclubs", "Snowy pine forests", "Flooded caves"],
    correctIndex: 0,
    hint: "You get there by 'noclipping' out of reality.",
    niche: 6,
  },
  {
    id: "quirked-up-white-boy",
    prompt: "The “quirked-up white boy” copypasta famously describes him doing what?",
    options: ["Busting it down (sexual style)", "The Macarena", "The floss", "A moonwalk"],
    correctIndex: 0,
    hint: "It's part of a longer 'goated with the sauce' rant.",
    niche: 6,
  },
  {
    id: "shadow-wizard-money-gang",
    prompt: "The “Shadow Wizard Money Gang” chant is about a crew that loves…",
    options: ["Casting spells", "Winning the lottery", "Hitting the gym", "Skipping school"],
    correctIndex: 0,
    hint: "“We love casting spells.”",
    niche: 6,
  },
  {
    id: "strawberry-elephant",
    prompt: "In the surreal duet meme, the Smurf cat's opponent is a…",
    options: ["Strawberry elephant", "Banana monkey", "Cherry lion", "Grape whale"],
    correctIndex: 0,
    hint: "A berry fused with a big grey animal.",
    niche: 6,
  },
  {
    id: "garten-of-banban",
    prompt: "“Garten of Banban” is a horror-game series set in a creepy…",
    options: ["Kindergarten", "Hospital", "Prison", "Space station"],
    correctIndex: 0,
    hint: "A place for very young kids.",
    niche: 6,
  },

  // ---- Niche 7 ----
  {
    id: "morbin-time",
    prompt: "“It's Morbin' Time” is an ironic catchphrase mocking which movie?",
    options: ["Morbius", "Venom", "Blade", "Madame Web"],
    correctIndex: 0,
    hint: "A vampire flick that got 'meme-released' twice.",
    niche: 7,
  },
  {
    id: "pluh",
    prompt: "The abrupt “PLUH” sound effect is a signature of which streamer?",
    options: ["IShowSpeed", "xQc", "Ninja", "Pokimane"],
    correctIndex: 0,
    hint: "Same creator behind a lot of 2020s brainrot audio.",
    niche: 7,
  },
  {
    id: "opium-bird",
    prompt: "The eerie “Opium bird” (Cardinal) meme borrows its aesthetic from which rapper's label?",
    options: ["Playboi Carti's Opium", "Drake's OVO", "Kanye's Donda", "Travis Scott's Cactus Jack"],
    correctIndex: 0,
    hint: "Tied to “bro thinks he's Carti.”",
    niche: 7,
  },
  {
    id: "ayo-the-pizza-here",
    prompt: "“Ayo, the pizza here!” is a copypasta that interrupts a scene right before…",
    options: ["Something inappropriate happens", "A boss fight", "A wedding", "A car chase"],
    correctIndex: 0,
    hint: "The delivery conveniently cuts off an NSFW moment.",
    niche: 7,
  },
  {
    id: "ambatukam",
    prompt: "“Ambatukam” (Dreamybull) is an audio meme built from a slurred phrase. It's basically…",
    options: ["A muffled adult phrase said slowly", "A country's national anthem", "A cooking instruction", "A soccer chant"],
    correctIndex: 0,
    hint: "Try sounding it out slowly.",
    niche: 7,
  },
  {
    id: "shmlawg",
    prompt: "The nonsense word “shmlawg” was popularized by which creator?",
    options: ["IShowSpeed", "Dream", "MrBeast", "Jacksepticeye"],
    correctIndex: 0,
    hint: "The same high-energy streamer behind 'PLUH'.",
    niche: 7,
  },

  // ---- Niche 8 ----
  {
    id: "john-pork",
    prompt: "In the surreal meme, “John Pork” is a man with the head of a…",
    options: ["Dog", "Frog", "Pig", "Shark"],
    correctIndex: 2,
    hint: "His surname is a strong clue.",
    niche: 8,
  },
  {
    id: "ugandan-knuckles",
    prompt: "Ugandan Knuckles swarmed which platform asking “do you know da wae?”",
    options: ["VRChat", "Zoom", "Discord", "Twitch"],
    correctIndex: 0,
    hint: "A social VR app full of avatars.",
    niche: 8,
  },

  // ---- Niche 9: deep cut ----
  {
    id: "quandale-dingle",
    prompt: "The “Quandale Dingle” meme kicked off from a photo leaked off of a…",
    options: ["School-issued laptop", "Movie set", "Police database", "Sports broadcast"],
    correctIndex: 0,
    hint: "A student's device started it all.",
    niche: 9,
  },
  {
    id: "pizza-tower",
    prompt: "“Pizza Tower” is a frantic indie platformer starring a chef named…",
    options: ["Peppino", "Giovanni", "Luigi", "Marco"],
    correctIndex: 0,
    hint: "A jittery Italian pizzaiolo.",
    niche: 9,
  },
]

/** Number of questions asked in a single adaptive run. */
export const QUIZ_LENGTH = 10

/** Highest niche value present in the pool (used to normalize affinity). */
export const POOL_MAX_NICHE = quizQuestions.reduce((max, q) => Math.max(max, q.niche), 1)

/**
 * Pick the next question for an adaptive run: choose an unused question whose
 * niche is closest to the current target difficulty, randomizing among ties so
 * repeat runs feel fresh.
 */
export function pickNextQuestion(
  usedIds: Set<string>,
  targetNiche: number,
): QuizQuestion | null {
  const available = quizQuestions.filter((q) => !usedIds.has(q.id))
  if (available.length === 0) return null

  const minDistance = available.reduce(
    (min, q) => Math.min(min, Math.abs(q.niche - targetNiche)),
    Number.POSITIVE_INFINITY,
  )
  const closest = available.filter((q) => Math.abs(q.niche - targetNiche) === minDistance)
  return closest[Math.floor(Math.random() * closest.length)]
}

/**
 * Convert a run into a 0..1 affinity. Weighted mostly toward the highest niche
 * the player actually proved they knew, with a smaller nod to raw accuracy.
 */
export function computeAffinity(maxCorrectNiche: number, correct: number, answered: number): number {
  if (answered === 0) return 0
  const reached = maxCorrectNiche / POOL_MAX_NICHE
  const accuracy = correct / answered
  const blended = 0.75 * reached + 0.25 * accuracy
  return Math.max(0, Math.min(1, blended))
}

const STORAGE_KEY = "popref:quiz-result"

export type QuizResult = {
  correct: number
  total: number
  takenAt: number
  /** Precomputed niche affinity (0..1) from the adaptive run. */
  affinity?: number
}

export function getQuizResult(): QuizResult | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      parsed &&
      typeof parsed.correct === "number" &&
      typeof parsed.total === "number" &&
      typeof parsed.takenAt === "number"
    ) {
      return parsed as QuizResult
    }
    return null
  } catch {
    return null
  }
}

export function saveQuizResult(result: QuizResult): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result))
  } catch {
    // Ignore storage errors (private mode / quota).
  }
}
