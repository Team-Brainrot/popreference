"use client"

import { useState } from "react"
import { Check, Flame, Sparkles, Trophy, X, Zap } from "lucide-react"
import {
  pickNextQuestion,
  computeAffinity,
  QUIZ_LENGTH,
  POOL_MAX_NICHE,
  type QuizQuestion,
  type QuizResult,
} from "@/lib/quiz"
import { nicheLevelFor } from "@/lib/niche"

type MemeQuizProps = {
  onClose: () => void
  onComplete: (result: QuizResult) => void
}

type Phase = "playing" | "result"

const POINTS_PER_CORRECT = 100
const STREAK_BONUS = 25

export function MemeQuiz({ onClose, onComplete }: MemeQuizProps) {
  // Adaptive run state. The first question is drawn at the lowest difficulty.
  const [question, setQuestion] = useState<QuizQuestion>(() => pickNextQuestion(new Set(), 1)!)
  const [used, setUsed] = useState<Set<string>>(() => new Set([question.id]))
  const [answered, setAnswered] = useState(0)
  const [targetNiche, setTargetNiche] = useState(1)
  const [selected, setSelected] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [maxCorrectNiche, setMaxCorrectNiche] = useState(0)
  const [streak, setStreak] = useState(0)
  const [points, setPoints] = useState(0)
  const [finalAffinity, setFinalAffinity] = useState(0)
  const [phase, setPhase] = useState<Phase>("playing")

  const total = QUIZ_LENGTH
  const progress = phase === "result" ? 100 : (answered / total) * 100

  function handleAnswer(optionIndex: number) {
    if (locked) return
    setSelected(optionIndex)
    setLocked(true)

    const isCorrect = optionIndex === question.correctIndex
    let nextStreak = streak
    let nextCorrect = correctCount
    let nextMaxNiche = maxCorrectNiche
    // Correct -> ramp difficulty up. Wrong -> hold at the current niche.
    let nextTarget = targetNiche

    if (isCorrect) {
      nextStreak = streak + 1
      nextCorrect = correctCount + 1
      nextMaxNiche = Math.max(maxCorrectNiche, question.niche)
      nextTarget = Math.min(POOL_MAX_NICHE, targetNiche + 1)
      setCorrectCount(nextCorrect)
      setStreak(nextStreak)
      setMaxCorrectNiche(nextMaxNiche)
      setPoints((p) => p + POINTS_PER_CORRECT + (nextStreak - 1) * STREAK_BONUS)
    } else {
      nextStreak = 0
      setStreak(0)
    }
    setTargetNiche(nextTarget)

    const answeredNow = answered + 1
    setAnswered(answeredNow)

    window.setTimeout(() => {
      const next = answeredNow < total ? pickNextQuestion(used, nextTarget) : null
      if (next) {
        setUsed((prev) => new Set(prev).add(next.id))
        setQuestion(next)
        setSelected(null)
        setLocked(false)
      } else {
        const affinity = computeAffinity(nextMaxNiche, nextCorrect, answeredNow)
        setFinalAffinity(affinity)
        setPhase("result")
        onComplete({ correct: nextCorrect, total: answeredNow, takenAt: Date.now(), affinity })
      }
    }, 900)
  }

  const level = nicheLevelFor(finalAffinity)

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="flex min-h-dvh w-full max-w-md flex-col bg-background">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Sparkles className="h-5 w-5 text-flame" aria-hidden="true" />
            Meme IQ Quiz
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quiz"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface/70 text-foreground ring-1 ring-border transition-transform active:scale-90"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-5 pt-2">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface/70 ring-1 ring-border">
            <div
              className="h-full rounded-full bg-flame transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {phase === "playing" ? (
          <PlayingView
            key={question.id}
            question={question}
            index={answered}
            total={total}
            selected={selected}
            locked={locked}
            points={points}
            streak={streak}
            onAnswer={handleAnswer}
          />
        ) : (
          <ResultView
            correct={correctCount}
            total={answered}
            points={points}
            levelLabel={level.label}
            levelBlurb={level.blurb}
            affinity={finalAffinity}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  )
}

type PlayingViewProps = {
  question: QuizQuestion
  index: number
  total: number
  selected: number | null
  locked: boolean
  points: number
  streak: number
  onAnswer: (optionIndex: number) => void
}

function PlayingView({
  question,
  index,
  total,
  selected,
  locked,
  points,
  streak,
  onAnswer,
}: PlayingViewProps) {
  return (
    <div className="flex flex-1 animate-[fadeSlide_0.35s_ease-out] flex-col px-5 pt-4">
      {/* Stats row */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">
          Question {index + 1} of {total}
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-sm font-bold text-foreground">
            <Zap className="h-4 w-4 text-flame" fill="currentColor" aria-hidden="true" />
            {points}
          </span>
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold transition-colors ${
              streak > 1 ? "bg-flame/15 text-flame" : "text-muted-foreground"
            }`}
          >
            <Flame className="h-4 w-4" fill={streak > 1 ? "currentColor" : "none"} aria-hidden="true" />
            {streak} streak
          </span>
        </div>
      </div>

      <h3 className="text-balance pt-6 text-2xl font-extrabold leading-snug tracking-tight text-foreground">
        {question.prompt}
      </h3>

      <div className="mt-6 flex flex-col gap-3">
        {question.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex
          const isCorrect = optionIndex === question.correctIndex
          const showState = locked && (isSelected || isCorrect)

          let stateClasses =
            "bg-surface text-surface-foreground ring-1 ring-border hover:bg-surface/80"
          if (showState && isCorrect) {
            stateClasses = "bg-emerald-500 text-white ring-2 ring-emerald-500"
          } else if (showState && isSelected && !isCorrect) {
            stateClasses = "bg-rose-500 text-white ring-2 ring-rose-500"
          } else if (locked) {
            stateClasses = "bg-surface/60 text-muted-foreground ring-1 ring-border opacity-70"
          }

          return (
            <button
              key={option}
              type="button"
              disabled={locked}
              onClick={() => onAnswer(optionIndex)}
              className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-4 text-left text-base font-semibold transition-all active:scale-[0.98] ${stateClasses}`}
            >
              <span className="text-pretty">{option}</span>
              {showState && isCorrect ? (
                <Check className="h-5 w-5 shrink-0" aria-hidden="true" />
              ) : showState && isSelected && !isCorrect ? (
                <X className="h-5 w-5 shrink-0" aria-hidden="true" />
              ) : null}
            </button>
          )
        })}
      </div>

      {/* Hint appears after answering */}
      <p
        className={`pt-5 text-center text-sm font-medium text-muted-foreground transition-opacity duration-300 ${
          locked ? "opacity-100" : "opacity-0"
        }`}
      >
        {question.hint}
      </p>
    </div>
  )
}

type ResultViewProps = {
  correct: number
  total: number
  points: number
  levelLabel: string
  levelBlurb: string
  affinity: number
  onClose: () => void
}

function ResultView({
  correct,
  total,
  points,
  levelLabel,
  levelBlurb,
  affinity,
  onClose,
}: ResultViewProps) {
  return (
    <div className="flex flex-1 animate-[fadeSlide_0.4s_ease-out] flex-col items-center px-6 pt-10 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-flame/15">
        <Trophy className="h-10 w-10 text-flame" aria-hidden="true" />
      </div>

      <h3 className="pt-6 text-3xl font-extrabold tracking-tight text-foreground">
        {correct} / {total} correct
      </h3>
      <p className="pt-1 text-sm font-semibold text-flame">{points} points</p>

      <div className="mt-8 w-full rounded-3xl bg-surface p-6 shadow-[var(--shadow-card)] ring-1 ring-border">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Your meme profile
        </p>
        <p className="pt-1 text-2xl font-extrabold tracking-tight text-surface-foreground">
          {levelLabel}
        </p>
        <p className="pt-2 text-sm leading-relaxed text-muted-foreground">{levelBlurb}</p>

        {/* Mainstream -> Niche meter */}
        <div className="mt-5">
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
              style={{ width: `${Math.max(6, affinity * 100)}%` }}
            />
          </div>
          <div className="flex justify-between pt-1.5 text-[11px] font-semibold text-muted-foreground">
            <span>Mainstream</span>
            <span>Niche</span>
          </div>
        </div>
      </div>

      <p className="px-2 pt-6 text-sm leading-relaxed text-muted-foreground">
        Your FOR YOU feed has been retuned to match.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="mt-4 w-full rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-sm transition-transform active:scale-[0.98]"
      >
        See my For You feed
      </button>
    </div>
  )
}
