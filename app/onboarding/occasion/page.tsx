"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Heart, Coffee, Wine, Cake, Users, Utensils, ArrowLeft } from "lucide-react"
import Link from "next/link"

const occasions = [
  { id: "date-night", label: "Date Night", icon: Heart },
  { id: "drinks", label: "Drinks", icon: Wine },
  { id: "casual", label: "Casual", icon: Utensils },
  { id: "anniversary", label: "Anniversary", icon: Cake },
  { id: "coffee", label: "Coffee Meet-up", icon: Coffee },
  { id: "family", label: "Family Outing", icon: Users },
]

export default function OccasionPage() {
  const [selected, setSelected] = useState<string>("")
  const router = useRouter()

  const handleContinue = () => {
    if (selected) {
      sessionStorage.setItem("occasion", selected)
      router.push("/onboarding/party-size")
    }
  }

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex flex-col items-center justify-center p-6">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="mb-6 text-white/70 hover:text-white hover:bg-white/10 absolute top-6 left-6"
      >
        <Link href="/home">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </Button>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">What's the occasion?</h1>
          <p className="text-white/60 text-sm">Step 1 of 3</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {occasions.map((occasion) => {
            const Icon = occasion.icon
            return (
              <button
                key={occasion.id}
                onClick={() => setSelected(occasion.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selected === occasion.id
                    ? "border-[oklch(0.70_0.15_85)] bg-[oklch(0.70_0.15_85)]/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <Icon
                  className={`w-8 h-8 mb-3 mx-auto ${
                    selected === occasion.id ? "text-[oklch(0.70_0.15_85)]" : "text-white/70"
                  }`}
                />
                <p className={`text-sm font-medium ${selected === occasion.id ? "text-white" : "text-white/80"}`}>
                  {occasion.label}
                </p>
              </button>
            )
          })}
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selected}
          className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
