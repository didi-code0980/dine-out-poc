import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Store, ArrowRight, CheckCircle2, TrendingUp, Users, Megaphone } from "lucide-react"

export default function BusinessPortalPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)]">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[oklch(0.70_0.15_85)] flex items-center justify-center">
              <Store className="w-5 h-5 text-[oklch(0.15_0.02_250)]" />
            </div>
            <h1 className="text-xl font-bold text-white">Dine Out Business</h1>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
            <Link href="/">Back to App</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <div className="inline-block p-3 rounded-full bg-[oklch(0.70_0.15_85)]/20 mb-6">
          <Store className="w-12 h-12 text-[oklch(0.70_0.15_85)]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome to Dine Out
          <br />
          <span className="text-[oklch(0.70_0.15_85)]">Business Portal</span>
        </h1>
        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
          Grow your locally-owned restaurant with our curated discovery platform and promotional tools
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold"
          >
            <Link href="/restaurant/dashboard">
              Access Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            <Link href="/restaurant/subscribe">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Everything You Need to Reach Local Diners</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="inline-block p-3 rounded-full bg-[oklch(0.70_0.15_85)]/20 mb-4">
                <CheckCircle2 className="w-8 h-8 text-[oklch(0.70_0.15_85)]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Verification Badge</h3>
              <p className="text-white/70">
                Get the blue checkmark that builds trust and credibility with potential customers
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="inline-block p-3 rounded-full bg-[oklch(0.70_0.15_85)]/20 mb-4">
                <Megaphone className="w-8 h-8 text-[oklch(0.70_0.15_85)]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Push Promotions</h3>
              <p className="text-white/70">
                Send time-sensitive deals to users within a 15-50 mile radius with geo-targeted notifications
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="inline-block p-3 rounded-full bg-[oklch(0.70_0.15_85)]/20 mb-4">
                <TrendingUp className="w-8 h-8 text-[oklch(0.70_0.15_85)]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Top Rankings</h3>
              <p className="text-white/70">Get featured in the curated Top 5 results for your cuisine and area</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Simple, Transparent Pricing</h2>
          <p className="text-white/70">One plan, all features included</p>
        </div>
        <Card className="border-[oklch(0.70_0.15_85)]/30 bg-white/5 backdrop-blur max-w-lg mx-auto">
          <CardContent className="p-8 text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-[oklch(0.70_0.15_85)]/20 text-[oklch(0.70_0.15_85)] text-sm font-semibold mb-6">
              RESTAURANT LICENSE
            </div>
            <div className="mb-6">
              <div className="text-5xl font-bold text-white mb-2">
                $250
                <span className="text-2xl text-white/60">/mo</span>
              </div>
              <p className="text-white/70">per location</p>
            </div>
            <ul className="space-y-3 mb-8 text-left">
              <li className="flex items-center gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[oklch(0.70_0.15_85)] flex-shrink-0" />
                Verified business badge
              </li>
              <li className="flex items-center gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[oklch(0.70_0.15_85)] flex-shrink-0" />
                Unlimited promotional posts
              </li>
              <li className="flex items-center gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[oklch(0.70_0.15_85)] flex-shrink-0" />
                Geo-radius push notifications
              </li>
              <li className="flex items-center gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[oklch(0.70_0.15_85)] flex-shrink-0" />
                Profile management dashboard
              </li>
              <li className="flex items-center gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[oklch(0.70_0.15_85)] flex-shrink-0" />
                Analytics and insights
              </li>
            </ul>
            <Button
              asChild
              size="lg"
              className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold"
            >
              <Link href="/restaurant/subscribe">Get Started</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <Card className="border-white/10 bg-white/5 backdrop-blur">
          <CardContent className="p-12">
            <Users className="w-16 h-16 text-[oklch(0.70_0.15_85)] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Grow Your Restaurant?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join other locally-owned restaurants using Dine Out to reach more customers
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold"
            >
              <Link href="/restaurant/dashboard">
                Access Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
