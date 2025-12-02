"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Star } from "lucide-react"
import type { Restaurant } from "@/lib/types"

interface RestaurantCardProps {
  restaurant: Restaurant
  index: number
  onDirections?: () => void
  onCall?: () => void
}

export function RestaurantCard({ restaurant, index, onDirections, onCall }: RestaurantCardProps) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-all overflow-hidden group cursor-pointer">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          {/* Restaurant Image */}
          <div className="w-24 h-24 rounded-lg bg-white/10 flex-shrink-0 overflow-hidden">
            <img
              src={`/.jpg?height=96&width=96&query=${encodeURIComponent(restaurant.name + " restaurant")}`}
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
                <span>2.3 mi</span>
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
            onClick={onDirections}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Directions
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white"
            onClick={onCall}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
