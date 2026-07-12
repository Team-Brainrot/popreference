export type Meme = {
  id: string
  term: string
  meaning: string
  image: string
  creator: string
  bookmarks: number
  tags: string[]
}

export function getMemeById(id: string): Meme | undefined {
  return hotMemes.find((m) => m.id === id)
}

export function getSimilarMemes(meme: Meme, limit = 6): Meme[] {
  const scored = hotMemes
    .filter((m) => m.id !== meme.id)
    .map((m) => ({
      meme: m,
      score: m.tags.filter((t) => meme.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || b.meme.bookmarks - a.meme.bookmarks)

  return scored.slice(0, limit).map((s) => s.meme)
}

export const hotMemes: Meme[] = [
  {
    id: "doge",
    term: "Doge",
    meaning: "A Shiba Inu paired with broken-English inner-monologue captions like 'much wow' and 'so scare'.",
    image: "/memes/kym-doge.jpg",
    creator: "knowyourmeme",
    bookmarks: 45210,
    tags: ["classic", "animals", "viral"],
  },
  {
    id: "navy-seal",
    term: "Navy Seal Copypasta",
    meaning: "An over-the-top threatening rant copypasta parodying tough-guy internet arguments.",
    image: "/memes/kym-navyseal.jpg",
    creator: "knowyourmeme",
    bookmarks: 41290,
    tags: ["classic", "copypasta", "viral"],
  },
  {
    id: "slender-man",
    term: "Slender Man",
    meaning: "A faceless, tall paranormal figure born from a creepypasta forum contest.",
    image: "/memes/kym-slenderman.jpg",
    creator: "knowyourmeme",
    bookmarks: 33760,
    tags: ["classic", "horror", "creepypasta"],
  },
  {
    id: "lenny-face",
    term: "Lenny Face",
    meaning: "The ( ͡° ͜ʖ ͡°) emoticon used to imply innuendo, mischief, or knowing smugness.",
    image: "/memes/kym-lennyface.jpg",
    creator: "knowyourmeme",
    bookmarks: 29540,
    tags: ["classic", "emoticon", "viral"],
  },
  {
    id: "forever-alone",
    term: "Forever Alone",
    meaning: "A rage-comic face expressing loneliness and disappointment, often self-deprecating.",
    image: "/memes/kym-foreveralone.jpg",
    creator: "knowyourmeme",
    bookmarks: 27180,
    tags: ["classic", "rage", "relatable"],
  },
  {
    id: "gyatt",
    term: "Gyatt",
    meaning: "An exclamation of surprise or admiration, usually reacting to something impressive.",
    image: "/memes/meme-gyatt.png",
    creator: "memelord_99",
    bookmarks: 12483,
    tags: ["reaction", "hype", "genz"],
  },
  {
    id: "rizz",
    term: "Rizz",
    meaning: "Charisma or charm, especially the skill of attracting a romantic interest.",
    image: "/memes/meme-2.png",
    creator: "smoothtalker",
    bookmarks: 20194,
    tags: ["charm", "dating", "viral"],
  },
  {
    id: "ohio",
    term: "Down in Ohio",
    meaning: "Used to describe something weird, chaotic, or absurd happening.",
    image: "/memes/meme-3.png",
    creator: "onlyinohio",
    bookmarks: 8721,
    tags: ["chaos", "absurd", "meme"],
  },
  {
    id: "sigma",
    term: "Sigma",
    meaning: "A self-reliant, lone-wolf personality that plays by its own rules.",
    image: "/memes/meme-4.png",
    creator: "lonewolf",
    bookmarks: 15320,
    tags: ["mindset", "grind", "genz"],
  },
  {
    id: "skibidi",
    term: "Skibidi",
    meaning: "Nonsense slang from a viral series; can mean cool, bad, or dumb depending on context.",
    image: "/memes/meme-skibidi.png",
    creator: "toiletcore",
    bookmarks: 31005,
    tags: ["viral", "absurd", "brainrot"],
  },
  {
    id: "fanum",
    term: "Fanum Tax",
    meaning: "Jokingly stealing a bite of a friend's food.",
    image: "/memes/meme-5.png",
    creator: "snackthief",
    bookmarks: 9640,
    tags: ["food", "friends", "meme"],
  },
  {
    id: "delulu",
    term: "Delulu",
    meaning: "Short for delusional — believing in something unrealistic, often as a joke.",
    image: "/memes/meme-delulu.png",
    creator: "dreamgirl",
    bookmarks: 17812,
    tags: ["mood", "funny", "genz"],
  },
  {
    id: "mewing",
    term: "Mewing",
    meaning: "Pressing your tongue to the roof of your mouth to define your jawline.",
    image: "/memes/meme-mewing.png",
    creator: "jawlineking",
    bookmarks: 6455,
    tags: ["looksmax", "trend", "gym"],
  },
  {
    id: "npc",
    term: "NPC",
    meaning: "Someone seen as acting without independent thought, like a background game character.",
    image: "/memes/meme-npc.png",
    creator: "gamerbrain",
    bookmarks: 11290,
    tags: ["gaming", "roast", "meme"],
  },
  {
    id: "cooked",
    term: "Cooked",
    meaning: "Being in serious trouble or completely exhausted.",
    image: "/memes/meme-cooked.png",
    creator: "welldone",
    bookmarks: 8033,
    tags: ["mood", "relatable", "genz"],
  },
  {
    id: "glaze",
    term: "Glazing",
    meaning: "Excessively praising or hyping someone up.",
    image: "/memes/meme-glaze.png",
    creator: "hypebeast",
    bookmarks: 7418,
    tags: ["hype", "roast", "meme"],
  },
  {
    id: "aura",
    term: "Aura Points",
    meaning: "Imaginary score for how cool or impressive your actions are.",
    image: "/memes/meme-aura.png",
    creator: "vibecheck",
    bookmarks: 13977,
    tags: ["vibes", "cool", "genz"],
  },
]
