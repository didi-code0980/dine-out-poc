"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Star, Sparkles, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { mockRestaurants } from "@/lib/mock-data"

export default function ResultsPage() {
  const router = useRouter()
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "price">("rating")

  const sortedRestaurants = [...mockRestaurants].sort((a, b) => {
    if (sortBy === "rating") return b.star_rating - a.star_rating
    if (sortBy === "price") return a.price_tier.length - b.price_tier.length
    if (sortBy === "distance") return a.distance_miles - b.distance_miles
    return 0
  })

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[oklch(0.15_0.02_250)]/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="text-white/70 hover:text-white hover:bg-white/10">
            <Link href="/onboarding/preferences">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <h1 className="text-lg font-semibold text-white">Top 5 Picks</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Sort Controls */}
        <Card className="border-white/10 bg-white/5 backdrop-blur py-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/70">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-medium">Sort by:</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "rating" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy("rating")}
                  className={
                    sortBy === "rating"
                      ? "bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                >
                  Rating
                </Button>
                <Button
                  variant={sortBy === "distance" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy("distance")}
                  className={
                    sortBy === "distance"
                      ? "bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                >
                  Distance
                </Button>
                <Button
                  variant={sortBy === "price" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy("price")}
                  className={
                    sortBy === "price"
                      ? "bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                >
                  Price
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Restaurant Cards */}
        <div className="space-y-4">
          {sortedRestaurants.map((restaurant, index) => (
            <Card
              key={restaurant.id}
              onClick={() => router.push(`/restaurant/${restaurant.id}`)}
              className="border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-all overflow-hidden group cursor-pointer pb-0 pt-2"
            >
              <CardContent className="p-0">
                <div className="flex gap-4 p-4">
                  {/* Restaurant Image */}
                  <div className="w-24 h-24 rounded-lg bg-white/10 flex-shrink-0 overflow-hidden">
                    <img
                      src={restaurant.image_url}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>

                  {/* Restaurant Info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate">{restaurant.name}</h3>
                        <p className="text-sm text-white/60">{restaurant.cuisine_type}</p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-[oklch(0.70_0.15_85)]/20 text-[oklch(0.70_0.15_85)] border-0 flex-shrink-0"
                      >
                        #{index + 1}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 text-[oklch(0.70_0.15_85)]">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium">{restaurant.star_rating.toFixed(1)}</span>
                        <span className="text-white/40">({restaurant.review_count})</span>
                      </div>
                      <span className="text-white/60">{restaurant.price_tier}</span>
                      <div className="flex items-center gap-1 text-white/60">
                        <MapPin className="w-3 h-3" />
                        <span>{restaurant.distance_miles} mi</span>
                      </div>
                    </div>

                    {restaurant.is_verified && (
                      <Badge variant="outline" className="border-blue-400/50 text-blue-400 text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-white/10 p-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(
                        `/directions?name=${encodeURIComponent(restaurant.name)}&address=${encodeURIComponent(restaurant.address)}`,
                      )
                    }}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`tel:${restaurant.phone}`, "_blank")
                    }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Date With Destiny Prompt */}
        <Card className="border-[oklch(0.70_0.15_85)]/30 bg-gradient-to-br from-[oklch(0.70_0.15_85)]/10 to-purple-500/10 backdrop-blur">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[oklch(0.70_0.15_85)]/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[oklch(0.70_0.15_85)]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Still unsure?</h3>
              <p className="text-white/70 text-sm">Let fate choose your next meal adventure with Date With Destiny</p>
            </div>
            <Button
              size="lg"
              className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold"
              onClick={() => router.push("/destiny")}
            >
              Try Date With Destiny
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
