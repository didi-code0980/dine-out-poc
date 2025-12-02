"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RestaurantReviewsPage() {
  const router = useRouter()

  // Mock reviews data
  const reviews = [
    {
      id: "1",
      userName: "Sarah Johnson",
      userAvatar: "👩",
      rating: 5,
      date: "2024-01-15",
      review:
        "Absolutely amazing experience! The pasta was perfectly cooked and the service was exceptional. Will definitely be coming back!",
      source: "Dine Out",
    },
    {
      id: "2",
      userName: "Michael Chen",
      userAvatar: "👨",
      rating: 4,
      date: "2024-01-12",
      review:
        "Great food and atmosphere. The tiramisu was to die for. Only complaint is it was a bit noisy during peak hours.",
      source: "Google",
    },
    {
      id: "3",
      userName: "Emily Rodriguez",
      userAvatar: "👩",
      rating: 5,
      date: "2024-01-10",
      review:
        "Best Italian restaurant in the city! The owner personally came to our table to ensure everything was perfect. Highly recommend!",
      source: "Dine Out",
    },
    {
      id: "4",
      userName: "David Kim",
      userAvatar: "👨",
      rating: 4,
      date: "2024-01-08",
      review:
        "Solid Italian fare with generous portions. The carbonara was authentic and delicious. Service was friendly and attentive.",
      source: "Google",
    },
    {
      id: "5",
      userName: "Jessica Miller",
      userAvatar: "👩",
      rating: 5,
      date: "2024-01-05",
      review:
        "Found this gem through Date With Destiny! What a pleasant surprise. Everything from appetizers to dessert was perfection.",
      source: "Dine Out",
    },
    {
      id: "6",
      userName: "Robert Taylor",
      userAvatar: "👨",
      rating: 3,
      date: "2024-01-03",
      review:
        "Food was good but service was a bit slow. Would give it another try though as the quality of the dishes was excellent.",
      source: "Google",
    },
    {
      id: "7",
      userName: "Amanda Wilson",
      userAvatar: "👩",
      rating: 5,
      date: "2023-12-28",
      review:
        "Celebrated our anniversary here and it was perfect! The ambiance, food, and service all exceeded our expectations.",
      source: "Dine Out",
    },
    {
      id: "8",
      userName: "James Brown",
      userAvatar: "👨",
      rating: 4,
      date: "2023-12-25",
      review: "Great Christmas dinner here! The special menu was outstanding. Definitely worth the price.",
      source: "Google",
    },
  ]

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percentage: (reviews.filter((r) => r.rating === star).length / reviews.length) * 100,
  }))

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[oklch(0.15_0.02_250)]/95 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/restaurant/dashboard")}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              <h1 className="text-2xl sm:text-4xl font-bold text-white w-full text-center">All Reviews</h1>
              <div className="w-10"></div>
            </div>
            {/* <div className="text-right">
              <p className="text-sm text-white/60">Total Reviews</p>
              <p className="text-lg font-bold text-[#cbac4d]">{reviews.length}</p>
            </div> */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl pb-24">
        {/* Rating Summary */}
        <Card className="border-white/10 bg-white/5 backdrop-blur mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Average Rating */}
              <div className="text-center md:text-left">
                <div className="text-5xl font-bold text-[#cbac4d] mb-2">{averageRating}</div>
                <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= Math.round(Number.parseFloat(averageRating)) ? "text-[#cbac4d]" : "text-white/20"
                      }
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-sm text-white/60">{reviews.length} reviews</p>
              </div>

              {/* Rating Distribution */}
              <div className="flex-1 space-y-2">
                {ratingDistribution.map(({ star, count, percentage }) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm text-white/70 w-8">{star}⭐</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#cbac4d]" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="text-sm text-white/60 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="border-white/10 bg-white/5 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {/* User Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#cbac4d]/20 flex items-center justify-center flex-shrink-0 text-xl">
                    {review.userAvatar}
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-white">{review.userName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-sm ${star <= review.rating ? "text-[#cbac4d]" : "text-white/20"}`}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-white/50">•</span>
                          <span className="text-xs text-white/50">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={`text-xs flex-shrink-0 ${
                          review.source === "Dine Out"
                            ? "bg-[#cbac4d]/20 text-[#cbac4d] border-0"
                            : "bg-white/10 text-white/60 border-0"
                        }`}
                      >
                        {review.source}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">{review.review}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
