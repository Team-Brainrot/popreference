"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import {
  getLikedMemes,
  likeMeme as localLike,
  unlikeMeme as localUnlike,
  type LikeRecord,
} from "@/lib/liked-memes"
import {
  getQuizResult as localGetQuiz,
  saveQuizResult as localSaveQuiz,
  type QuizResult,
} from "@/lib/quiz"

const LIKES_KEY = "popref:liked-memes"
const QUIZ_KEY = "popref:quiz-result"

export type Purchase = {
  id: string
  productId: string
  label: string
  amountCents: number
  createdAt: number
}

type UserDataContextValue = {
  user: User | null
  authReady: boolean
  dataReady: boolean
  likes: LikeRecord[]
  likedIds: Set<string>
  isLiked: (id: string) => boolean
  toggleLike: (id: string) => Promise<boolean>
  quizResult: QuizResult | null
  saveQuizResult: (result: QuizResult) => Promise<void>
  purchases: Purchase[]
  addPurchase: (input: { productId: string; label: string; amountCents: number }) => Promise<void>
  signOut: () => Promise<void>
}

const UserDataContext = createContext<UserDataContextValue | null>(null)

function clearLocal() {
  try {
    window.localStorage.removeItem(LIKES_KEY)
    window.localStorage.removeItem(QUIZ_KEY)
  } catch {
    // ignore
  }
}

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), [])
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [dataReady, setDataReady] = useState(false)
  const [likes, setLikes] = useState<LikeRecord[]>([])
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [purchases, setPurchases] = useState<Purchase[]>([])
  // Tracks the user id we've already loaded/migrated for, to avoid re-running.
  // Uses a sentinel initial value (not null) so the first guest load (uid=null)
  // is not mistaken for an already-loaded state.
  const loadedForRef = useRef<string | null | undefined>(undefined)

  // Load the current user's data from Supabase, migrating any local data on
  // first sign-in.
  const loadFromCloud = useCallback(
    async (uid: string) => {
      // 1. Migrate local likes + quiz result into the account (first login).
      const localLikes = getLikedMemes()
      if (localLikes.length > 0) {
        await supabase.from("user_likes").upsert(
          localLikes.map((l) => ({
            user_id: uid,
            meme_id: l.id,
            liked_at: new Date(l.likedAt).toISOString(),
          })),
          { onConflict: "user_id,meme_id", ignoreDuplicates: true },
        )
      }
      const localQuiz = localGetQuiz()
      if (localQuiz) {
        await supabase.from("user_quiz_results").upsert(
          {
            user_id: uid,
            correct: localQuiz.correct,
            total: localQuiz.total,
            affinity: localQuiz.affinity ?? null,
            taken_at: new Date(localQuiz.takenAt).toISOString(),
          },
          { onConflict: "user_id" },
        )
      }
      // Local data now lives in the account; clear it so it won't leak into
      // another account on this device.
      clearLocal()

      // 2. Read the canonical account data back.
      const [likesRes, quizRes, purchasesRes] = await Promise.all([
        supabase.from("user_likes").select("meme_id, liked_at").order("liked_at", { ascending: false }),
        supabase.from("user_quiz_results").select("correct, total, affinity, taken_at").maybeSingle(),
        supabase
          .from("user_purchases")
          .select("id, product_id, label, amount_cents, created_at")
          .order("created_at", { ascending: false }),
      ])

      setLikes(
        ((likesRes.data ?? []) as Record<string, unknown>[]).map((r) => ({
          id: r.meme_id as string,
          likedAt: new Date(r.liked_at as string).getTime(),
        })),
      )
      setQuizResult(
        quizRes.data
          ? {
              correct: quizRes.data.correct as number,
              total: quizRes.data.total as number,
              affinity: (quizRes.data.affinity as number | null) ?? undefined,
              takenAt: new Date(quizRes.data.taken_at as string).getTime(),
            }
          : null,
      )
      setPurchases(
        ((purchasesRes.data ?? []) as Record<string, unknown>[]).map((r) => ({
          id: r.id as string,
          productId: r.product_id as string,
          label: r.label as string,
          amountCents: r.amount_cents as number,
          createdAt: new Date(r.created_at as string).getTime(),
        })),
      )
      setDataReady(true)
    },
    [supabase],
  )

  const loadFromLocal = useCallback(() => {
    setLikes(getLikedMemes())
    setQuizResult(localGetQuiz())
    setPurchases([])
    setDataReady(true)
  }, [])

  // Subscribe to auth state and (re)load the right data source.
  useEffect(() => {
    let active = true

    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      if (!active) return
      setUser(data.user ?? null)
      setAuthReady(true)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: { user: User } | null) => {
      if (!active) return
      setUser(session?.user ?? null)
      setAuthReady(true)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [supabase])

  // Whenever the resolved user changes, load from the correct backend.
  useEffect(() => {
    if (!authReady) return
    const uid = user?.id ?? null
    if (loadedForRef.current === uid) return
    loadedForRef.current = uid
    setDataReady(false)
    if (uid) {
      void loadFromCloud(uid)
    } else {
      loadFromLocal()
    }
  }, [authReady, user, loadFromCloud, loadFromLocal])

  const likedIds = useMemo(() => new Set(likes.map((l) => l.id)), [likes])

  const isLiked = useCallback((id: string) => likedIds.has(id), [likedIds])

  const toggleLike = useCallback(
    async (id: string) => {
      const currentlyLiked = likedIds.has(id)
      const nextLiked = !currentlyLiked

      // Optimistic UI update.
      setLikes((prev) =>
        nextLiked
          ? [{ id, likedAt: Date.now() }, ...prev.filter((l) => l.id !== id)]
          : prev.filter((l) => l.id !== id),
      )

      if (user) {
        if (nextLiked) {
          await supabase
            .from("user_likes")
            .upsert({ user_id: user.id, meme_id: id }, { onConflict: "user_id,meme_id" })
        } else {
          await supabase.from("user_likes").delete().eq("user_id", user.id).eq("meme_id", id)
        }
      } else if (nextLiked) {
        localLike(id)
      } else {
        localUnlike(id)
      }

      return nextLiked
    },
    [likedIds, supabase, user],
  )

  const saveQuizResult = useCallback(
    async (result: QuizResult) => {
      setQuizResult(result)
      if (user) {
        await supabase.from("user_quiz_results").upsert(
          {
            user_id: user.id,
            correct: result.correct,
            total: result.total,
            affinity: result.affinity ?? null,
            taken_at: new Date(result.takenAt).toISOString(),
          },
          { onConflict: "user_id" },
        )
      } else {
        localSaveQuiz(result)
      }
    },
    [supabase, user],
  )

  const addPurchase = useCallback(
    async (input: { productId: string; label: string; amountCents: number }) => {
      if (!user) return
      const { data } = await supabase
        .from("user_purchases")
        .insert({
          user_id: user.id,
          product_id: input.productId,
          label: input.label,
          amount_cents: input.amountCents,
        })
        .select("id, product_id, label, amount_cents, created_at")
        .single()
      if (data) {
        setPurchases((prev) => [
          {
            id: data.id as string,
            productId: data.product_id as string,
            label: data.label as string,
            amountCents: data.amount_cents as number,
            createdAt: new Date(data.created_at as string).getTime(),
          },
          ...prev,
        ])
      }
    },
    [supabase, user],
  )

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    loadedForRef.current = null
  }, [supabase])

  const value = useMemo<UserDataContextValue>(
    () => ({
      user,
      authReady,
      dataReady,
      likes,
      likedIds,
      isLiked,
      toggleLike,
      quizResult,
      saveQuizResult,
      purchases,
      addPurchase,
      signOut,
    }),
    [
      user,
      authReady,
      dataReady,
      likes,
      likedIds,
      isLiked,
      toggleLike,
      quizResult,
      saveQuizResult,
      purchases,
      addPurchase,
      signOut,
    ],
  )

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
}

export function useUserData() {
  const ctx = useContext(UserDataContext)
  if (!ctx) {
    throw new Error("useUserData must be used within a UserDataProvider")
  }
  return ctx
}
