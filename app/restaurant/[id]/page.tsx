"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Star, Clock, DollarSign, CheckCircle2 } from "lucide-react"
import { mockRestaurants } from "@/lib/mock-data"

export default function RestaurantDetailPage() {
  const params = useParams()
  const router = useRouter()
  const restaurant = mockRestaurants.find((r) => r.id === params.id)

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex items-center justify-center">
        <p className="text-white">Restaurant not found</p>
      </div>
    )
  }

  const mockHours = [
    { day: "Monday", hours: "11:00 AM - 10:00 PM" },
    { day: "Tuesday", hours: "11:00 AM - 10:00 PM" },
    { day: "Wednesday", hours: "11:00 AM - 10:00 PM" },
    { day: "Thursday", hours: "11:00 AM - 10:00 PM" },
    { day: "Friday", hours: "11:00 AM - 11:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 9:00 PM" },
  ]

  const mockReviews = [
    {
      author: "Sarah M.",
      rating: 5,
      text: "Absolutely amazing! The food was incredible and service was top-notch.",
      date: "2 days ago",
    },
    { author: "John D.", rating: 5, text: "Best restaurant in the area. Highly recommend!", date: "1 week ago" },
    {
      author: "Emily R.",
      rating: 4,
      text: "Great atmosphere and delicious food. Will definitely come back.",
      date: "2 weeks ago",
    },
  ]

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[oklch(0.15_0.02_250)]/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold text-white">Restaurant Details</h1>
          <div className="w-0" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Hero Image */}
        <div className="w-full h-64 rounded-xl overflow-hidden bg-white/10">
          <img
            src={`../${restaurant.image_url}`}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Restaurant Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
              <p className="text-lg text-white/70 mb-3">{restaurant.tagline}</p>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="bg-white/10 text-white border-0">
                  {restaurant.cuisine_type}
                </Badge>
                {restaurant.is_verified && (
                  <Badge variant="outline" className="border-blue-400/50 text-blue-400">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-[oklch(0.70_0.15_85)] mx-auto mb-2 fill-current" />
                <div className="text-2xl font-bold text-white">{restaurant.star_rating}</div>
                <div className="text-xs text-white/60">{restaurant.review_count} reviews</div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-4 text-center">
                <DollarSign className="w-6 h-6 text-[oklch(0.70_0.15_85)] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{restaurant.price_tier}</div>
                <div className="text-xs text-white/60">Price range</div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-4 text-center">
                <MapPin className="w-6 h-6 text-[oklch(0.70_0.15_85)] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{restaurant.distance_miles}</div>
                <div className="text-xs text-white/60">miles away</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Info */}
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[oklch(0.70_0.15_85)] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white/90">{restaurant.address}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[oklch(0.70_0.15_85)] flex-shrink-0" />
                <a href={`tel:${restaurant.phone}`} className="text-white/90 hover:text-white">
                  {restaurant.phone}
                </a>
              </div>
            </div>
            <div className="pt-4 flex gap-2">
              <Button
                className="flex-1 bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
                onClick={() =>
                  router.push(
                    `/directions?name=${encodeURIComponent(restaurant.name)}&address=${encodeURIComponent(restaurant.address)}`,
                  )
                }
              >
                <MapPin className="w-4 h-4 mr-2" />
                Direction
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-white/20 bg-white/5 hover:bg-white/10 text-white"
                onClick={() => window.open(`tel:${restaurant.phone}`, "_blank")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hours */}
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[oklch(0.70_0.15_85)]" />
              <h2 className="text-xl font-bold text-white">Hours</h2>
            </div>
            <div className="space-y-2">
              {mockHours.map((item) => (
                <div key={item.day} className="flex justify-between text-sm">
                  <span className="text-white/70">{item.day}</span>
                  <span className="text-white/90 font-medium">{item.hours}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Reviews</h2>
            <div className="space-y-4">
              {mockReviews.map((review, index) => (
                <div key={index} className="space-y-2 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{review.author}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[oklch(0.70_0.15_85)] fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">{review.text}</p>
                  <span className="text-white/50 text-xs">{review.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
