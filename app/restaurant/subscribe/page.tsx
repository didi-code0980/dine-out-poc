"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Store, Megaphone, BarChart3, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

const restaurantProduct = {
  id: "restaurant-license",
  name: "Restaurant Ad License",
  description: "Reach customers with promotions and push notifications",
  priceInCents: 25000,
  type: "restaurant_subscription",
  features: [
    "Unlimited promotional posts",
    "24, 48, or 72-hour duration options",
    "Geo-targeted push notifications (15-50 miles)",
    "Priority listing in search results",
    "Verified business badge",
    "Analytics and engagement tracking",
    "Post scheduling and management",
  ],
}

export default function RestaurantSubscribePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] py-12 px-6">
      <div className="container mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[oklch(0.70_0.15_85)] to-orange-500 flex items-center justify-center shadow-2xl">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Restaurant Ad License</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Reach hungry customers in your area with time-sensitive promotions and geo-targeted push notifications
          </p>
        </div>

        {/* Pricing Card */}
        <Card className="border-2 border-[oklch(0.70_0.15_85)] bg-gradient-to-br from-[oklch(0.70_0.15_85)]/10 to-orange-500/10 backdrop-blur">
          <CardHeader className="text-center">
            <Badge className="bg-[oklch(0.70_0.15_85)] text-[oklch(0.15_0.02_250)] border-0 w-fit mx-auto mb-4">
              Per Location
            </Badge>
            <CardTitle className="text-3xl text-white">{restaurantProduct.name}</CardTitle>
            <CardDescription className="text-white/60 text-lg">{restaurantProduct.description}</CardDescription>
            <div className="pt-6">
              <span className="text-5xl font-bold text-[oklch(0.70_0.15_85)]">
                ${(restaurantProduct.priceInCents / 100).toFixed(0)}
              </span>
              <span className="text-white/60 text-xl">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <ul className="space-y-4">
              {restaurantProduct.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/90">
                  <Check className="w-6 h-6 text-[oklch(0.70_0.15_85)] flex-shrink-0 mt-0.5" />
                  <span className="text-base">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold text-lg"
              onClick={() => router.push(`/restaurant/checkout?product=${restaurantProduct.id}`)}
            >
              Start Advertising
            </Button>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[oklch(0.70_0.15_85)]/20 flex items-center justify-center">
                <Megaphone className="w-6 h-6 text-[oklch(0.70_0.15_85)]" />
              </div>
              <h3 className="font-semibold text-white text-lg">Unlimited Posts</h3>
              <p className="text-white/60">Create as many promotions as you want with 24-72 hour durations</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Bell className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white text-lg">Push Notifications</h3>
              <p className="text-white/60">Alert customers within 15-50 mile radius about your deals</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white text-lg">Analytics Dashboard</h3>
              <p className="text-white/60">Track engagement, views, and performance of your promotions</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white text-lg">Verified Badge</h3>
              <p className="text-white/60">Stand out with a blue checkmark showing you're a trusted business</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/restaurant/dashboard")}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
