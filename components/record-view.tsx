"use client"

import { useEffect } from "react"
import { recordView } from "@/lib/viewing-history"

export function RecordView({ id }: { id: string }) {
  useEffect(() => {
    recordView(id)
  }, [id])

  return null
}
