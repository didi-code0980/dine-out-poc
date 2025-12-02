"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const partySizes = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5+" },
]

export default function PartySizePage() {
  const [selected, setSelected] = useState<number | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selected !== null) {
      sessionStorage.setItem("partySize", selected.toString())
      router.push("/onboarding/preferences")
    }
  }

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-6 text-white/70 hover:text-white hover:bg-white/10 absolute top-6 left-6"
        >
          <Link href="/onboarding/occasion">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">How many people?</h1>
          <p className="text-white/60 text-sm">Step 2 of 3</p>
        </div>

        <div className="flex gap-4 justify-center">
          {partySizes.map((size) => (
            <button
              key={size.value}
              onClick={() => setSelected(size.value)}
              className={`w-20 h-20 rounded-xl border-2 transition-all flex items-center justify-center ${
                selected === size.value
                  ? "border-[oklch(0.70_0.15_85)] bg-[oklch(0.70_0.15_85)]/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <span
                className={`text-2xl font-bold ${selected === size.value ? "text-[oklch(0.70_0.15_85)]" : "text-white/80"}`}
              >
                {size.label}
              </span>
            </button>
          ))}
        </div>

        <Button
          onClick={handleContinue}
          disabled={selected === null}
          className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
