export type Meme = {
  id: string
  term: string
  meaning: string
  image?: string
}

export const hotMemes: Meme[] = [
  {
    id: "gyatt",
    term: "Gyatt",
    meaning: "An exclamation of surprise or admiration, usually reacting to something impressive.",
    image: "/memes/meme-1.png",
  },
  {
    id: "rizz",
    term: "Rizz",
    meaning: "Charisma or charm, especially the skill of attracting a romantic interest.",
    image: "/memes/meme-2.png",
  },
  {
    id: "ohio",
    term: "Down in Ohio",
    meaning: "Used to describe something weird, chaotic, or absurd happening.",
    image: "/memes/meme-3.png",
  },
  {
    id: "sigma",
    term: "Sigma",
    meaning: "A self-reliant, lone-wolf personality that plays by its own rules.",
    image: "/memes/meme-4.png",
  },
  { id: "skibidi", term: "Skibidi", meaning: "Nonsense slang from a viral series; can mean cool, bad, or dumb depending on context." },
  {
    id: "fanum",
    term: "Fanum Tax",
    meaning: "Jokingly stealing a bite of a friend's food.",
    image: "/memes/meme-5.png",
  },
  { id: "delulu", term: "Delulu", meaning: "Short for delusional — believing in something unrealistic, often as a joke." },
  { id: "mewing", term: "Mewing", meaning: "Pressing your tongue to the roof of your mouth to define your jawline." },
  { id: "npc", term: "NPC", meaning: "Someone seen as acting without independent thought, like a background game character." },
  { id: "cooked", term: "Cooked", meaning: "Being in serious trouble or completely exhausted." },
  { id: "glaze", term: "Glazing", meaning: "Excessively praising or hyping someone up." },
  { id: "aura", term: "Aura Points", meaning: "Imaginary score for how cool or impressive your actions are." },
]
