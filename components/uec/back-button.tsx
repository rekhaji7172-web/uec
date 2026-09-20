"use client"

import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  const goBack = () => {
    if (window.history.length > 1) router.back()
    else router.push("/")
  }

  return (
    <button type="button" className="back-button" onClick={goBack} aria-label="Go back to the previous page">
      <span aria-hidden="true">←</span>
      <span>Back</span>
    </button>
  )
}
