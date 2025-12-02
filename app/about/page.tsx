"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Mail, FileText, HelpCircle, Scale, Shield, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)]">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[oklch(0.15_0.02_250)]/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="text-white/70 hover:text-white hover:bg-white/10">
            <Link href="/profile">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <h1 className="text-lg font-semibold text-white">About Dine Out</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Mission Statement */}
        <Card className="border-white/10 bg-white/5 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[oklch(0.70_0.15_85)] flex items-center justify-center">
                <FileText className="w-6 h-6 text-[oklch(0.15_0.02_250)]" />
              </div>
              <div>
                <CardTitle className="text-white">Our Mission</CardTitle>
                <CardDescription className="text-white/60">Why we built Dine Out</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Dine Out was created to eliminate decision fatigue and help you discover amazing local restaurants with
              ease. We believe that supporting small, independently-owned restaurants strengthens communities and
              preserves culinary diversity.
            </p>
            <p>
              Instead of overwhelming you with endless options, we curate only the Top 5 highest-rated local restaurants
              within your chosen radius. This focused approach makes dining decisions simple and enjoyable.
            </p>
            <p>
              Our innovative "Date With Destiny" feature adds an element of spontaneity and adventure to your dining
              experience, helping you step outside your comfort zone and try something new.
            </p>
          </CardContent>
        </Card>

        {/* Terms & Privacy */}
        <Card className="border-white/10 bg-white/5 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[oklch(0.70_0.15_85)] flex items-center justify-center">
                <Scale className="w-6 h-6 text-[oklch(0.15_0.02_250)]" />
              </div>
              <div>
                <CardTitle className="text-white">Legal</CardTitle>
                <CardDescription className="text-white/60">Terms of Service and Privacy Policy</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-between text-white hover:bg-white/10 h-auto py-4"
              onClick={() => router.push("/terms")}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[oklch(0.70_0.15_85)]" />
                <div className="text-left">
                  <p className="font-medium">Terms of Service</p>
                  <p className="text-sm text-white/60">Review our terms and conditions</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between text-white hover:bg-white/10 h-auto py-4"
              onClick={() => router.push("/privacy")}
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[oklch(0.70_0.15_85)]" />
                <div className="text-left">
                  <p className="font-medium">Privacy Policy</p>
                  <p className="text-sm text-white/60">How we protect and use your data</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </Button>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="border-white/10 bg-white/5 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[oklch(0.70_0.15_85)] flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-[oklch(0.15_0.02_250)]" />
              </div>
              <div>
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
                <CardDescription className="text-white/60">Common questions about Dine Out</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-2">What makes a restaurant eligible for Dine Out?</h3>
              <p className="text-white/70 text-sm">
                Restaurants must be independently owned (not a chain exceeding 30 U.S. locations), have a 4.0+ Google
                Star rating, and not be fast-food, cafeteria-style, or commissary-style concepts.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">How does Date With Destiny work?</h3>
              <p className="text-white/70 text-sm">
                Date With Destiny randomly selects a restaurant from your Top 5 matches using various fun interaction
                modes. You won't know which restaurant is selected until you commit to your choice, adding an element of
                surprise and adventure to your dining experience.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">What's included in Premium membership?</h3>
              <p className="text-white/70 text-sm">
                Premium members get unlimited Date With Destiny uses, early access to new features, exclusive deals from
                partner restaurants, and ad-free browsing. Regular users have limited DWD uses per month.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">How can my restaurant join Dine Out?</h3>
              <p className="text-white/70 text-sm">
                Restaurant owners can verify their business through Google Business Profile and subscribe to our
                Restaurant Ad License ($250/month per location) to post promotions and send push notifications to nearby
                users.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Can I save my favorite restaurants?</h3>
              <p className="text-white/70 text-sm">
                Yes! Both free and Premium users can save restaurants to their profile for quick access later. Your
                saved spots are synced across all your devices.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">How do you determine the Top 5 restaurants?</h3>
              <p className="text-white/70 text-sm">
                We use a combination of Google Star ratings, review count, distance from your location, and user
                preferences (cuisine type, price range) to curate the best 5 options for your specific search.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="border-white/10 bg-white/5 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[oklch(0.70_0.15_85)] flex items-center justify-center">
                <Mail className="w-6 h-6 text-[oklch(0.15_0.02_250)]" />
              </div>
              <div>
                <CardTitle className="text-white">Contact Support</CardTitle>
                <CardDescription className="text-white/60">Need help? We're here for you</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white/70 text-sm">
              Have questions, feedback, or need assistance? Our support team is ready to help you.
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">Email Support</p>
                <a href="mailto:support@dineout.app" className="text-[oklch(0.70_0.15_85)] hover:underline text-sm">
                  support@dineout.app
                </a>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">Business Inquiries</p>
                <a href="mailto:business@dineout.app" className="text-[oklch(0.70_0.15_85)] hover:underline text-sm">
                  business@dineout.app
                </a>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">Response Time</p>
                <p className="text-white/70 text-sm">We typically respond within 24 hours</p>
              </div>
            </div>

            <Button
              className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
              onClick={() => (window.location.href = "mailto:support@dineout.app")}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </CardContent>
        </Card>

        <div className="text-center py-8">
          <p className="text-white/40 text-sm">© 2025 Dine Out LLC. All rights reserved.</p>
          <p className="text-white/40 text-xs mt-2">Version 1.0.0 (Beta)</p>
        </div>
      </main>
    </div>
  )
}
