"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Compass, User, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] pb-20">
      {/* Header */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/onboarding/occasion">
            <Card className="border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.70_0.15_85)]/20 flex items-center justify-center">
                  <Compass className="w-6 h-6 text-[oklch(0.70_0.15_85)]" />
                </div>
                <div className="text-center">
                  <span className="text-white font-medium block mb-1 text-[22px]">Discover</span>
                  <p className="text-base text-white/60">Find your perfect dining spot</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/destiny">
            <Card className="border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.70_0.15_85)]/20 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-[oklch(0.70_0.15_85)]"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <div className="text-center">
                  <span className="text-white font-medium block mb-1 text-[22px]">Destiny</span>
                  <p className="text-base text-white/60">Let fate choose for you</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Featured Deals</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {/* Restaurant Ad 1 */}
            <Link href="/restaurant/1" className="flex-shrink-0 w-72">
              <Card className="border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[oklch(0.70_0.15_85)]/20 to-[oklch(0.50_0.15_85)]/20">
                  <img src="/elegant-italian-restaurant.png" alt="Restaurant" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    20% OFF
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-1">Bella Italia</h3>
                  <p className="text-xs text-white/60 mb-2">Italian • $$$ • 4.8⭐</p>
                  <p className="text-sm text-[oklch(0.70_0.15_85)]">Happy Hour Special: 4-6PM</p>
                </CardContent>
              </Card>
            </Link>

            {/* Restaurant Ad 2 */}
            <Link href="/restaurant/2" className="flex-shrink-0 w-72">
              <Card className="border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[oklch(0.70_0.15_85)]/20 to-[oklch(0.50_0.15_85)]/20">
                  <img src="/modern-sushi-restaurant.png" alt="Restaurant" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-[oklch(0.70_0.15_85)] text-[oklch(0.15_0.02_250)] text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-1">Sakura Sushi</h3>
                  <p className="text-xs text-white/60 mb-2">Japanese • $$$$ • 4.9⭐</p>
                  <p className="text-sm text-[oklch(0.70_0.15_85)]">Grand Opening: Free Appetizer</p>
                </CardContent>
              </Card>
            </Link>

            {/* Restaurant Ad 3 */}
            <Link href="/restaurant/3" className="flex-shrink-0 w-72">
              <Card className="border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[oklch(0.70_0.15_85)]/20 to-[oklch(0.50_0.15_85)]/20">
                  <img src="/cozy-french-bistro.png" alt="Restaurant" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                    LIMITED
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-1">Le Petit Café</h3>
                  <p className="text-xs text-white/60 mb-2">French • $$ • 4.7⭐</p>
                  <p className="text-sm text-[oklch(0.70_0.15_85)]">Weekend Brunch Special</p>
                </CardContent>
              </Card>
            </Link>

            {/* Restaurant Ad 4 */}
            <Link href="/restaurant/4" className="flex-shrink-0 w-72">
              <Card className="border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[oklch(0.70_0.15_85)]/20 to-[oklch(0.50_0.15_85)]/20">
                  <img src="/steakhouse-restaurant.png" alt="Restaurant" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
                    HOT
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-1">Prime Steakhouse</h3>
                  <p className="text-xs text-white/60 mb-2">Steakhouse • $$$$ • 4.9⭐</p>
                  <p className="text-sm text-[oklch(0.70_0.15_85)]">Chef's Tasting Menu Tonight</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[oklch(0.12_0.02_250)] border-t border-white/10 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-around max-w-2xl">
          <Link href="/home" className="flex flex-col items-center gap-1 text-[oklch(0.70_0.15_85)]">
            <Compass className="w-5 h-5" />
            <span className="text-base font-medium">Home</span>
          </Link>
          <Link href="/favorite" className="flex flex-col items-center gap-1 text-white/60 hover:text-white">
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
