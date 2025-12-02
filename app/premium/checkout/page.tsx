"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export default function PremiumCheckoutPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] py-12 px-6">
      <div className="container mx-auto max-w-3xl space-y-6">
        <Button variant="ghost" size="sm" asChild className="text-white/70 hover:text-white hover:bg-white/10">
          <Link href="/premium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Plans
          </Link>
        </Button>

        <Card className="border-white/10 bg-white/5 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-[oklch(0.70_0.15_85)] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-[oklch(0.15_0.02_250)]" />
            </div>
            <CardTitle className="text-white text-2xl">Demo Mode</CardTitle>
            <CardDescription className="text-white/60 text-lg mt-2">
              Payment integration is available in production
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-white/70">In this demo, you can explore all premium features without payment.</p>
            <Button
              asChild
              className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
            >
              <Link href="/home">Continue to App</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
