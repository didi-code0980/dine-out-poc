"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Crown, Star, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

const premiumProducts = [
  {
    id: "premium-regular",
    name: "Premium Regular",
    description: "For everyone who wants unlimited dining adventures",
    priceInCents: 699,
    type: "user_premium",
    features: [
      "Unlimited Date With Destiny",
      "Save favorite restaurants",
      "Priority customer support",
      "Ad-free experience",
      "Early access to new features",
    ],
  },
  {
    id: "premium-discounted",
    name: "Premium Discounted",
    description: "Special pricing for students, teachers, and military",
    priceInCents: 399,
    type: "user_premium",
    features: [
      "All Premium Regular features",
      "40% discount with verification",
      "Student/Teacher/Military pricing",
      "Verified via SheerID",
      "Cancel anytime",
    ],
  },
]

export default function PremiumPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] py-12 px-6">
      <div className="container mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[oklch(0.70_0.15_85)] to-purple-500 flex items-center justify-center shadow-2xl">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Upgrade to Premium</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Unlock unlimited Date With Destiny and exclusive features to enhance your dining experience
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {premiumProducts.map((product) => (
            <Card
              key={product.id}
              className={`border-2 ${
                product.id === "premium-regular"
                  ? "border-[oklch(0.70_0.15_85)] bg-gradient-to-br from-[oklch(0.70_0.15_85)]/10 to-purple-500/10"
                  : "border-white/10 bg-white/5"
              } backdrop-blur relative overflow-hidden`}
            >
              {product.id === "premium-regular" && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[oklch(0.70_0.15_85)] text-[oklch(0.15_0.02_250)] border-0">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-white">{product.name}</CardTitle>
                <CardDescription className="text-white/60">{product.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold text-[oklch(0.70_0.15_85)]">
                    ${(product.priceInCents / 100).toFixed(2)}
                  </span>
                  <span className="text-white/60">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/80">
                      <Check className="w-5 h-5 text-[oklch(0.70_0.15_85)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  className={`w-full font-semibold ${
                    product.id === "premium-regular"
                      ? "bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                  onClick={() => router.push(`/premium/checkout?product=${product.id}`)}
                >
                  {product.id === "premium-discounted" ? "Verify & Subscribe" : "Get Started"}
                </Button>
                {product.id === "premium-discounted" && (
                  <p className="text-xs text-white/50 text-center">
                    <Shield className="w-3 h-3 inline mr-1" />
                    Verification required via SheerID
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <Card className="border-white/10 bg-white/5 backdrop-blur max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-center">What's Included</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-[oklch(0.70_0.15_85)]/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[oklch(0.70_0.15_85)]" />
                </div>
                <h3 className="font-semibold text-white">Unlimited Destiny</h3>
                <p className="text-sm text-white/60">Use Date With Destiny as many times as you want</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white">Priority Support</h3>
                <p className="text-sm text-white/60">Get help faster with dedicated support</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white">Ad-Free</h3>
                <p className="text-sm text-white/60">Enjoy a clean, distraction-free experience</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/home")}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  )
}
