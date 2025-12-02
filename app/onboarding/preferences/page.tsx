"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const cuisineTypes = [
  "American",
  "Italian",
  "Mexican",
  "Asian",
  "Mediterranean",
  "French",
  "Indian",
  "Japanese",
  "Thai",
  "Steakhouse",
  "Seafood",
  "Any",
]

const priceRanges = [
  { value: "1", label: "$", description: "Budget-friendly" },
  { value: "2", label: "$$", description: "Moderate" },
  { value: "3", label: "$$$", description: "Upscale" },
  { value: "4", label: "$$$$", description: "Fine dining" },
]

const distances = [
  { value: 5, label: "5 miles" },
  { value: 10, label: "10 miles" },
  { value: 15, label: "15 miles" },
  { value: 20, label: "20+ miles" },
]

export default function PreferencesPage() {
  const [cuisine, setCuisine] = useState<string>("")
  const [priceRange, setPriceRange] = useState<string>("")
  const [distance, setDistance] = useState<number | null>(null)
  const router = useRouter()

  const handleSubmit = () => {
    if (cuisine && priceRange && distance) {
      sessionStorage.setItem("cuisine", cuisine)
      sessionStorage.setItem("priceRange", priceRange)
      sessionStorage.setItem("distance", distance.toString())
      router.push("/onboarding/searching")
    }
  }

  const isComplete = cuisine && priceRange && distance

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-6 text-white/70 hover:text-white hover:bg-white/10 absolute top-6 left-6"
        >
          <Link href="/onboarding/party-size">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Your Preferences</h1>
          <p className="text-white/60 text-sm">Step 3 of 3</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cuisine" className="text-white/90">
              Cuisine Type
            </Label>
            <Select value={cuisine} onValueChange={setCuisine}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white h-12">
                <SelectValue placeholder="Select cuisine type" />
              </SelectTrigger>
              <SelectContent>
                {cuisineTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white/90">Price Range</Label>
            <div className="grid grid-cols-4 gap-3">
              {priceRanges.map((price) => (
                <button
                  key={price.value}
                  onClick={() => setPriceRange(price.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    priceRange === price.value
                      ? "border-[oklch(0.70_0.15_85)] bg-[oklch(0.70_0.15_85)]/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <p
                    className={`text-lg font-bold ${priceRange === price.value ? "text-[oklch(0.70_0.15_85)]" : "text-white/80"}`}
                  >
                    {price.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white/90">Distance</Label>
            <div className="grid grid-cols-2 gap-3">
              {distances.map((dist) => (
                <button
                  key={dist.value}
                  onClick={() => setDistance(dist.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    distance === dist.value
                      ? "border-[oklch(0.70_0.15_85)] bg-[oklch(0.70_0.15_85)]/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${distance === dist.value ? "text-[oklch(0.70_0.15_85)]" : "text-white/80"}`}
                  >
                    {dist.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isComplete}
          className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold disabled:opacity-50"
        >
          Show My Picks
        </Button>
      </div>
    </div>
  )
}
