import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Card className="border-white/10 bg-white/5 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[oklch(0.70_0.15_85)] flex items-center justify-center">
              <Mail className="w-8 h-8 text-[oklch(0.15_0.02_250)]" />
            </div>
            <CardTitle className="text-2xl text-white">Check Your Email</CardTitle>
            <CardDescription className="text-white/60">We've sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-white/70 text-center leading-relaxed">
              Please check your email and click the confirmation link to activate your account. Once confirmed, you can
              sign in and start discovering amazing local restaurants.
            </p>
            <Button
              asChild
              className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold"
            >
              <Link href="/auth/login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
