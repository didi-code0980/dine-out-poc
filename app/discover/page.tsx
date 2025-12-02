"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Heart, Coffee, Users, Cake, Wine } from "lucide-react"
import Link from "next/link"

const occasions = [
  { id: "date-night", label: "Date Night", icon: Heart },
  { id: "drinks", label: "Drinks", icon: Wine },
  { id: "casual", label: "Casual", icon: Coffee },
  { id: "anniversary", label: "Anniversary", icon: Cake },
  { id: "coffee", label: "Coffee Meet-up", icon: Coffee },
  { id: "family", label: "Family Outing", icon: Users },
]

const cuisineTypes = [
  "Any",
  "Italian",
  "Mexican",
  "Japanese",
  "Chinese",
  "Thai",
  "Indian",
  "American",
  "French",
  "Mediterranean",
  "Korean",
  "Vietnamese",
]

export default function DiscoverPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [occasion, setOccasion] = useState("")
  const [partySize, setPartySize] = useState("")
  const [cuisineType, setCuisineType] = useState("Any")
  const [priceRange, setPriceRange] = useState("")
  const [distance, setDistance] = useState("")

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleSubmit = () => {
    // Store preferences and navigate to results
    const params = new URLSearchParams({
      occasion,
      partySize,
      cuisineType,
      priceRange,
      distance,
    })
    router.push(`/results?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="text-white/70 hover:text-white hover:bg-white/10">
            <Link href="/home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <div className="text-white/60 text-sm">Step {step} of 4</div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 h-1">
        <div
          className="h-full bg-[oklch(0.70_0.15_85)] transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl flex flex-col">
        {step === 1 && (
          <div className="flex-1 flex flex-col">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">What's the occasion?</h2>
            <p className="text-white/60 mb-8 text-center">This helps us find the perfect restaurant for you</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {occasions.map((occ) => {
                const Icon = occ.icon
                return (
                  <Card
                    key={occ.id}
                    onClick={() => setOccasion(occ.id)}
                    className={`cursor-pointer border-2 transition-all ${
                      occasion === occ.id
                        ? "border-[oklch(0.70_0.15_85)] bg-[oklch(0.70_0.15_85)]/20"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    } backdrop-blur`}
                  >
                    <CardContent className="p-6 flex flex-col items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          occasion === occ.id ? "bg-[oklch(0.70_0.15_85)]" : "bg-white/10"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${occasion === occ.id ? "text-[oklch(0.15_0.02_250)]" : "text-white"}`}
                        />
                      </div>
                      <span className="text-white font-medium text-center">{occ.label}</span>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Button
              onClick={handleNext}
              disabled={!occasion}
              size="lg"
              className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="flex-1 flex flex-col">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">How many people?</h2>
            <p className="text-white/60 mb-8 text-center">Select your party size</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {["1", "2", "3", "4", "5+"].map((size) => (
                <Card
                  key={size}
                  onClick={() => setPartySize(size)}
                  className={`cursor-pointer border-2 transition-all ${
                    partySize === size
                      ? "border-[oklch(0.70_0.15_85)] bg-[oklch(0.70_0.15_85)]/20"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  } backdrop-blur`}
                >
                  <CardContent className="p-8 flex items-center justify-center">
                    <span
                      className={`text-3xl font-bold ${
                        partySize === size ? "text-[oklch(0.70_0.15_85)]" : "text-white"
                      }`}
                    >
                      {size}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-4 mt-auto">
              <Button
                onClick={() => setStep(step - 1)}
                variant="outline"
                size="lg"
                className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!partySize}
                size="lg"
                className="flex-1 bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold disabled:opacity-50"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex-1 flex flex-col">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">What type of cuisine?</h2>
            <p className="text-white/60 mb-8 text-center">Choose your preferred cuisine type</p>

            <Card className="border-white/10 bg-white/5 backdrop-blur mb-8">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cuisine" className="text-white/90">
                    Cuisine Type
                  </Label>
                  <Select value={cuisineType} onValueChange={setCuisineType}>
                    <SelectTrigger id="cuisine" className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cuisineTypes.map((cuisine) => (
                        <SelectItem key={cuisine} value={cuisine}>
                          {cuisine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 mt-auto">
              <Button
                onClick={() => setStep(step - 1)}
                variant="outline"
                size="lg"
                className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                size="lg"
                className="flex-1 bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex-1 flex flex-col">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Final preferences</h2>
            <p className="text-white/60 mb-8 text-center">Set your price range and distance</p>

            <Card className="border-white/10 bg-white/5 backdrop-blur mb-8">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <Label className="text-white/90">Price Range</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {["$", "$$", "$$$", "$$$$"].map((price) => (
                      <Card
                        key={price}
                        onClick={() => setPriceRange(price)}
                        className={`cursor-pointer border-2 transition-all ${
                          priceRange === price
                            ? "border-[oklch(0.70_0.15_85)] bg-[oklch(0.70_0.15_85)]/20"
                            : "border-white/10 bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        <CardContent className="p-4 flex items-center justify-center">
                          <span
                            className={`text-xl font-bold ${
                              priceRange === price ? "text-[oklch(0.70_0.15_85)]" : "text-white"
                            }`}
                          >
                            {price}
                          </span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-white/90">Distance</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {["5", "10", "15", "20+"].map((dist) => (
                      <Card
                        key={dist}
                        onClick={() => setDistance(dist)}
                        className={`cursor-pointer border-2 transition-all ${
                          distance === dist
                            ? "border-[oklch(0.70_0.15_85)] bg-[oklch(0.70_0.15_85)]/20"
                            : "border-white/10 bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        <CardContent className="p-4 flex flex-col items-center justify-center">
                          <span
                            className={`text-lg font-bold ${
                              distance === dist ? "text-[oklch(0.70_0.15_85)]" : "text-white"
                            }`}
                          >
                            {dist}
                          </span>
                          <span className="text-xs text-white/60">miles</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 mt-auto">
              <Button
                onClick={() => setStep(step - 1)}
                variant="outline"
                size="lg"
                className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!priceRange || !distance}
                size="lg"
                className="flex-1 bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold disabled:opacity-50"
              >
                Show My Picks
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
