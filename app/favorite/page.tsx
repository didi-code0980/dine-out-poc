"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Compass, User, Clock } from "lucide-react"
import { useEffect, useState } from "react"

export default function FavoritePage() {
  const [savedRestaurants, setSavedRestaurants] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("savedRestaurants")
    if (saved) {
      setSavedRestaurants(JSON.parse(saved))
    }
  }, [])

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] pb-20">
      {/* Header */}
      {/* <header className="border-b border-white/10 bg-white/5 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-white text-center">Favorites</h1>
        </div>
      </header> */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[oklch(0.70_0.15_85)] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-[oklch(0.15_0.02_250)]"
              >
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">Dine Out</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-lg font-semibold text-white mt-3 mb-3">Saved List</h2>
        {savedRestaurants.length > 0 ? (
          <div className="space-y-3">
            {savedRestaurants.map((restaurant, idx) => (
              <Link key={idx} href={`/restaurant/${restaurant.id}`}>
                <Card className="py-0 border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-20 h-16 rounded-lg bg-white/10 flex-shrink-0">
                      <img className="w-full h-full object-cover rounded-lg" src={`../${restaurant.image_url}`} alt={restaurant.name} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{restaurant.name}</h4>
                      <p className="text-sm text-white/60">{restaurant.cuisine}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[oklch(0.70_0.15_85)]">★ {restaurant.rating}</span>
                        <span className="text-xs text-white/40">•</span>
                        <span className="text-xs text-white/60">{restaurant.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/60">No saved restaurants yet</p>
              <Button
                asChild
                className="mt-4 bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
              >
                <Link href="/onboarding/occasion">Discover Restaurants</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[oklch(0.12_0.02_250)] border-t border-white/10 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-around max-w-2xl">
          <Link href="/home" className="flex flex-col items-center gap-1 text-white/60 hover:text-white">
            <Compass className="w-5 h-5" />
            <span className="text-base font-medium">Home</span>
          </Link>
          <Link href="/favorite" className="flex flex-col items-center gap-1 text-[oklch(0.70_0.15_85)]">
            <Heart className="w-5 h-5" />
            <span className="text-base font-medium">Favorite</span>
          </Link>
          <Link href="/history" className="flex flex-col items-center gap-1 text-white/60 hover:text-white">
            <Clock className="w-5 h-5" />
            <span className="text-base font-medium">History</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-white/60 hover:text-white">
            <User className="w-5 h-5" />
            <span className="text-base font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
