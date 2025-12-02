"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Star, Sparkles, Lock, RefreshCw, Home } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock restaurant data for demo
const mockRestaurants = [
  {
    id: "1",
    name: "La Bella Vita",
    cuisine_type: "Italian",
    address: "123 Main St, City, State 12345",
    phone: "(555) 123-4567",
    star_rating: 4.8,
    review_count: 234,
    price_tier: "$$$",
    image: "/italian-restaurant-interior.png",
  },
  {
    id: "2",
    name: "Sakura Sushi House",
    cuisine_type: "Japanese",
    address: "456 Oak Ave, City, State 12345",
    phone: "(555) 234-5678",
    star_rating: 4.9,
    review_count: 189,
    price_tier: "$$",
    image: "/japanese-sushi-restaurant.png",
  },
  {
    id: "3",
    name: "The Rustic Table",
    cuisine_type: "American",
    address: "789 Elm St, City, State 12345",
    phone: "(555) 345-6789",
    star_rating: 4.6,
    review_count: 312,
    price_tier: "$$",
    image: "/rustic-american-restaurant.jpg",
  },
  {
    id: "4",
    name: "Spice Garden",
    cuisine_type: "Indian",
    address: "321 Pine Rd, City, State 12345",
    phone: "(555) 456-7890",
    star_rating: 4.7,
    review_count: 167,
    price_tier: "$",
    image: "/colorful-indian-restaurant.png",
  },
  {
    id: "5",
    name: "Le Petit Bistro",
    cuisine_type: "French",
    address: "654 Maple Dr, City, State 12345",
    phone: "(555) 567-8901",
    star_rating: 4.9,
    review_count: 278,
    price_tier: "$$$$",
    image: "/french-bistro-elegant.jpg",
  },
]

export default function DestinyRevealPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const mode = searchParams.get("mode")
  const card = searchParams.get("card")
  const [isRevealing, setIsRevealing] = useState(true)
  const [restaurant] = useState(() => {
    // Select restaurant based on card
    const cardIndex = ["A", "B", "C", "D", "E"].indexOf(card || "A")
    return mockRestaurants[cardIndex] || mockRestaurants[0]
  })

  const isArrivalMode = mode === "mystery" || mode === "random_dialer"

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealing(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isRevealing) {
    return (
      <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[oklch(0.70_0.15_85)] to-purple-500 flex items-center justify-center shadow-2xl"
          >
            <Sparkles className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white">Revealing Your Destiny...</h2>
        </motion.div>
      </div>
    )
  }

  if (isArrivalMode) {
    return (
      <div className="min-h-screen bg-[oklch(0.15_0.02_250)] pb-20">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Locked Header */}
            <div className="text-center space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center"
              >
                <Lock className="w-8 h-8 text-purple-400" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white">Your Destiny is Set!</h1>
              <p className="text-white/60">Restaurant details will be revealed when you arrive</p>
            </div>

            {/* Partial Info Card */}
            <Card className="border-white/10 bg-white/5 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-400/50 flex items-center justify-center">
                    <span className="text-4xl">🎲</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Mystery Restaurant</h2>
                  <p className="text-white/60">Name and details hidden until arrival</p>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-4">
                  {mode === "random_dialer" ? (
                    <>
                      <div className="flex items-center gap-2 text-white/70">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-mono">{restaurant.phone}</span>
                      </div>
                      <p className="text-sm text-white/50">Call this number when you're ready to head there!</p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-2 text-white/70">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span className="text-sm">{restaurant.address}</span>
                      </div>
                      <p className="text-sm text-white/50">Head to this location to reveal your restaurant!</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold"
                onClick={() =>
                  router.push(
                    `/directions?name=${encodeURIComponent(restaurant.name)}&address=${encodeURIComponent(restaurant.address)}&secret=true`,
                  )
                }
              >
                <MapPin className="w-5 h-5 mr-2" />
                Direction
              </Button>
              {mode === "random_dialer" && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white"
                  onClick={() => window.open(`tel:${restaurant.phone}`, "_blank")}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Restaurant
                </Button>
              )}
            </div>

            {/* Demo Mode Override */}
            <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-4 space-y-2">
              <p className="text-sm text-purple-300 font-medium">Demo Mode</p>
              <p className="text-xs text-white/60">
                In the real app, restaurant details would only appear when GPS confirms arrival. For this demo, click
                below to reveal:
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-purple-400/50 text-purple-300 hover:bg-purple-500/20 bg-transparent"
                onClick={() => router.push(`/restaurant/${restaurant.id}`)}
              >
                Simulate Arrival - Reveal Restaurant
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-3">
              <Button
                variant="ghost"
                className="flex-1 text-white/60 hover:text-white hover:bg-white/10"
                onClick={() => router.push("/destiny")}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button
                variant="ghost"
                className="flex-1 text-white/60 hover:text-white hover:bg-white/10"
                onClick={() => router.push("/home")}
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] pb-20">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Success Header */}
          <div className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 mx-auto rounded-full bg-[oklch(0.70_0.15_85)] flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-[oklch(0.15_0.02_250)]" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white">Your Destiny Awaits!</h1>
            <p className="text-white/60">Fate has chosen the perfect spot for you</p>
          </div>

          <Link href={`/restaurant/${restaurant.id}`}>
            <Card className="border-white/10 bg-white/5 backdrop-blur overflow-hidden hover:bg-white/10 transition-all cursor-pointer group">
              <CardContent className="p-0">
                {/* Restaurant Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.02_250)] to-transparent" />
                  <div className="absolute top-4 right-4 bg-[oklch(0.70_0.15_85)] text-[oklch(0.15_0.02_250)] px-3 py-1 rounded-full text-xs font-medium">
                    Click for details
                  </div>
                </div>

                {/* Restaurant Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[oklch(0.70_0.15_85)] transition-colors">
                      {restaurant.name}
                    </h2>
                    <p className="text-white/70">{restaurant.cuisine_type}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-[oklch(0.70_0.15_85)]">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">{restaurant.star_rating.toFixed(1)}</span>
                      <span className="text-white/40">({restaurant.review_count})</span>
                    </div>
                    <span className="text-white/60">{restaurant.price_tier}</span>
                  </div>

                  <div className="flex items-start gap-2 text-white/70">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-sm">{restaurant.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/70">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{restaurant.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full mt-4 bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold"
              onClick={() =>
                router.push(
                  `/directions?name=${encodeURIComponent(restaurant.name)}&address=${encodeURIComponent(restaurant.address)}`,
                )
              }
            >
              <MapPin className="w-5 h-5 mr-2" />
              Direction
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white"
              onClick={() => window.open(`tel:${restaurant.phone}`, "_blank")}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Restaurant
            </Button>
          </div>

          {/* Secondary Actions */}
          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="flex-1 text-white/60 hover:text-white hover:bg-white/10"
              onClick={() => router.push("/destiny")}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              variant="ghost"
              className="flex-1 text-white/60 hover:text-white hover:bg-white/10"
              onClick={() => router.push("/home")}
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
