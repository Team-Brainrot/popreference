"use client"

const NSFW_KEY = "popref:show-nsfw"

/** Custom event fired when the NSFW preference changes within the same tab. */
export const NSFW_CHANGE_EVENT = "popref:nsfw-change"

/**
 * Whether mature/NSFW memes should be shown. Defaults to false so brand-new
 * users never see adult content until they explicitly opt in.
 */
export function getShowNsfw(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.localStorage.getItem(NSFW_KEY) === "true"
  } catch {
    return false
  }
}

export function setShowNsfw(value: boolean): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(NSFW_KEY, value ? "true" : "false")
    // Notify listeners in the same tab (the `storage` event only fires
    // across tabs, so we dispatch our own event for in-tab reactivity).
    window.dispatchEvent(new CustomEvent(NSFW_CHANGE_EVENT, { detail: value }))
  } catch {
    // Ignore storage errors (e.g. private mode / quota).
  }
}
