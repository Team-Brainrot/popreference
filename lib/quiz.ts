export type QuizQuestion = {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
  hint: string
}

/** Five meme-knowledge questions used by the gamified onboarding quiz. */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "rizz",
    prompt: "Someone says you have serious “rizz.” What are they praising?",
    options: ["Your charisma and flirting game", "Your gaming skills", "Your fashion sense", "Your bank account"],
    correctIndex: 0,
    hint: "Short for charisma.",
  },
  {
    id: "fanum",
    prompt: "Your friend takes a bite of your food and yells “Fanum tax!” What just happened?",
    options: [
      "They paid for your meal",
      "They stole a portion of your food",
      "They gave you extra fries",
      "They started a food fight",
    ],
    correctIndex: 1,
    hint: "It's a tax… on your snacks.",
  },
  {
    id: "amogus",
    prompt: "Calling someone “sus” (a.k.a. amogus) means they seem…",
    options: ["Hilarious", "Tired", "Suspicious", "Talented"],
    correctIndex: 2,
    hint: "Straight out of Among Us.",
  },
  {
    id: "mewing",
    prompt: "The “mewing” trend is all about…",
    options: [
      "A dance move",
      "Tongue posture to sharpen your jawline",
      "A cat impression",
      "A workout supplement",
    ],
    correctIndex: 1,
    hint: "Looksmaxxing your jaw.",
  },
  {
    id: "john-pork",
    prompt: "In the surreal meme, “John Pork” is a man with the head of a…",
    options: ["Dog", "Frog", "Pig", "Shark"],
    correctIndex: 2,
    hint: "Check the name again.",
  },
]

const STORAGE_KEY = "popref:quiz-result"

export type QuizResult = {
  correct: number
  total: number
  takenAt: number
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
