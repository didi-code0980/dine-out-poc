"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SearchingPage() {
  const router = useRouter()

  useEffect(() => {
    // Simulate searching for 3 seconds
    const timer = setTimeout(() => {
      router.push("/results")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-[oklch(0.70_0.15_85)]/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[oklch(0.70_0.15_85)] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-[oklch(0.70_0.15_85)]"
            >
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Finding the best local restaurants near you...</h1>
          <p className="text-white/60">This will only take a moment</p>
        </div>
      </div>
    </div>
  )
}
