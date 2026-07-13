export type Meme = {
  id: string
  term: string
  meaning: string
  image: string
  creator: string
  bookmarks: number
  tags: string[]
  /** How the image should fill the square card. Defaults to "cover". */
  fit?: "cover" | "contain"
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
    fit: "contain",
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
    image: "/memes/kym-gyatt.jpg",
    creator: "knowyourmeme",
    bookmarks: 12483,
    tags: ["reaction", "hype", "genz"],
    fit: "contain",
  },
  {
    id: "rizz",
    term: "Rizz",
    meaning: "Charisma or charm, especially the skill of attracting a romantic interest.",
    image: "/memes/kym-rizz.jpg",
    creator: "knowyourmeme",
    bookmarks: 20194,
    tags: ["charm", "dating", "viral"],
    fit: "contain",
  },
  {
    id: "ohio",
    term: "Down in Ohio",
    meaning: "Used to describe something weird, chaotic, or absurd happening.",
    image: "/memes/kym-ohio.jpg",
    creator: "knowyourmeme",
    bookmarks: 8721,
    tags: ["chaos", "absurd", "meme"],
  },
  {
    id: "sigma",
    term: "Sigma",
    meaning: "A self-reliant, lone-wolf personality that plays by its own rules.",
    image: "/memes/kym-sigma.jpg",
    creator: "knowyourmeme",
    bookmarks: 15320,
    tags: ["mindset", "grind", "genz"],
  },
  {
    id: "skibidi",
    term: "Skibidi",
    meaning: "Nonsense slang from a viral series; can mean cool, bad, or dumb depending on context.",
    image: "/memes/kym-skibidi.jpg",
    creator: "knowyourmeme",
    bookmarks: 31005,
    tags: ["viral", "absurd", "brainrot"],
  },
  {
    id: "fanum",
    term: "Fanum Tax",
    meaning: "Jokingly stealing a bite of a friend's food.",
    image: "/memes/kym-fanum.jpg",
    creator: "knowyourmeme",
    bookmarks: 9640,
    tags: ["food", "friends", "meme"],
    fit: "contain",
  },
  {
    id: "delulu",
    term: "Delulu",
    meaning: "Short for delusional — believing in something unrealistic, often as a joke.",
    image: "/memes/kym-delulu.jpg",
    creator: "knowyourmeme",
    bookmarks: 17812,
    tags: ["mood", "funny", "genz"],
    fit: "contain",
  },
  {
    id: "mewing",
    term: "Mewing",
    meaning: "Pressing your tongue to the roof of your mouth to define your jawline.",
    image: "/memes/kym-mewing.jpg",
    creator: "knowyourmeme",
    bookmarks: 6455,
    tags: ["looksmax", "trend", "gym"],
    fit: "contain",
  },
  {
    id: "npc",
    term: "NPC",
    meaning: "Someone seen as acting without independent thought, like a background game character.",
    image: "/memes/kym-npc.jpg",
    creator: "knowyourmeme",
    bookmarks: 11290,
    tags: ["gaming", "roast", "meme"],
  },
  {
    id: "cooked",
    term: "Cooked",
    meaning: "Being in serious trouble or completely exhausted.",
    image: "/memes/kym-cooked.png",
    creator: "knowyourmeme",
    bookmarks: 8033,
    tags: ["mood", "relatable", "genz"],
  },
  {
    id: "glaze",
    term: "Glazing",
    meaning: "Excessively praising or hyping someone up.",
    image: "/memes/kym-glaze.jpg",
    creator: "knowyourmeme",
    bookmarks: 7418,
    tags: ["hype", "roast", "meme"],
  },
  {
    id: "aura",
    term: "Aura Points",
    meaning: "Imaginary score for how cool or impressive your actions are.",
    image: "/memes/kym-aura.jpg",
    creator: "knowyourmeme",
    bookmarks: 13977,
    tags: ["vibes", "cool", "genz"],
  },
  {
    id: "gigachad",
    term: "Gigachad",
    meaning:
      "An idealized, hyper-masculine man used to represent peak confidence or being objectively correct.",
    image: "/memes/kym-gigachad.jpg",
    creator: "knowyourmeme",
    bookmarks: 38210,
    tags: ["reaction", "based", "viral"],
  },
  {
    id: "kai-cenat",
    term: "Kai Cenat",
    meaning:
      "Twitch megastar whose high-energy streams and reactions fuel countless clips and Gen-Z slang.",
    image: "/memes/kym-kai-cenat.jpg",
    creator: "knowyourmeme",
    bookmarks: 26540,
    tags: ["streamer", "reaction", "genz"],
  },
  {
    id: "ishowspeed",
    term: "IShowSpeed",
    meaning:
      "Explosive streamer famous for over-the-top reactions, screaming, and viral livestream moments.",
    image: "/memes/kym-ishowspeed.jpg",
    creator: "knowyourmeme",
    bookmarks: 29880,
    tags: ["streamer", "reaction", "viral"],
  },
  {
    id: "john-pork",
    term: "John Pork",
    meaning:
      "A surreal pig-headed man in a suit who 'calls' you — an absurdist edit that became a running gag.",
    image: "/memes/kym-john-pork.jpg",
    creator: "knowyourmeme",
    bookmarks: 15720,
    tags: ["absurd", "surreal", "brainrot"],
  },
  {
    id: "quandale-dingle",
    term: "Quandale Dingle",
    meaning:
      "A surreal name-and-face meme from a leaked school photo, spawning chaotic 'Quandale Dingle here' skits.",
    image: "/memes/kym-quandale-dingle.jpg",
    creator: "knowyourmeme",
    bookmarks: 18930,
    tags: ["absurd", "brainrot", "viral"],
  },
  {
    id: "amogus",
    term: "Amogus",
    meaning:
      "A deliberately misspelled Among Us crewmate, shorthand for calling something or someone 'sus'.",
    image: "/memes/kym-amogus.jpg",
    creator: "knowyourmeme",
    bookmarks: 42110,
    tags: ["gaming", "absurd", "viral"],
  },
  {
    id: "huggy-wuggy",
    term: "Huggy Wuggy",
    meaning: "The toothy blue monster from Poppy Playtime that became a horror-meme mascot.",
    image: "/memes/kym-huggy-wuggy.jpg",
    creator: "knowyourmeme",
    bookmarks: 12440,
    tags: ["horror", "gaming", "meme"],
    fit: "contain",
  },
  {
    id: "big-chungus",
    term: "Big Chungus",
    meaning: "A chonky Bugs Bunny image used as the ultimate 'absolute unit' reaction meme.",
    image: "/memes/kym-big-chungus.jpg",
    creator: "knowyourmeme",
    bookmarks: 33110,
    tags: ["reaction", "classic", "viral"],
  },
  {
    id: "pizza-tower",
    term: "Pizza Tower",
    meaning:
      "The frantic indie game whose Peppino animations and soundtrack fueled a wave of hyperactive edits.",
    image: "/memes/kym-pizza-tower.jpg",
    creator: "knowyourmeme",
    bookmarks: 14260,
    tags: ["gaming", "brainrot", "meme"],
    fit: "contain",
  },
  {
    id: "backrooms",
    term: "The Backrooms",
    meaning:
      "Endless liminal yellow office rooms from a creepypasta about 'noclipping' out of reality.",
    image: "/memes/kym-backrooms.jpg",
    creator: "knowyourmeme",
    bookmarks: 27650,
    tags: ["horror", "creepypasta", "viral"],
  },
  {
    id: "goofy-ahh",
    term: "Goofy Ahh",
    meaning: "An intensifier tacked onto anything to make it sound silly, like 'goofy ahh haircut'.",
    image: "/memes/kym-goofy-ahh.jpg",
    creator: "knowyourmeme",
    bookmarks: 16980,
    tags: ["genz", "funny", "brainrot"],
    fit: "contain",
  },
  {
    id: "morbin-time",
    term: "Morbin Time",
    meaning: "Ironic hype catchphrase ('It's Morbin Time') born from mocking the movie Morbius.",
    image: "/memes/kym-morbin-time.jpg",
    creator: "knowyourmeme",
    bookmarks: 21030,
    tags: ["ironic", "viral", "meme"],
  },
  {
    id: "ugandan-knuckles",
    term: "Ugandan Knuckles",
    meaning: "A crude Knuckles model swarming VRChat while asking 'do you know da wae?'",
    image: "/memes/kym-ugandan-knuckles.jpg",
    creator: "knowyourmeme",
    bookmarks: 19470,
    tags: ["gaming", "classic", "viral"],
  },
]
