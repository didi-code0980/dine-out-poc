"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loginType, setLoginType] = useState<"user" | "restaurant">("user")
  const router = useRouter()

  const handleSocialLogin = (provider: "apple" | "google" | "facebook" | "tiktok") => {
    setIsLoading(true)
    localStorage.setItem("userEmail", `demo@${provider}.com`)
    localStorage.setItem("loginType", "user")

    setTimeout(() => {
      router.push("/home")
      setIsLoading(false)
    }, 500)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("userEmail", email)
        localStorage.setItem("loginType", loginType)

        if (loginType === "restaurant") {
          router.push("/restaurant/verify")
        } else {
          router.push("/home")
        }
      }
      setIsLoading(false)
    }, 500)
  }

  const handleQuickLogin = (type: "user" | "restaurant") => {
    setIsLoading(true)
    localStorage.setItem("userEmail", type === "user" ? "demo@dineout.com" : "owner@restaurant.com")
    localStorage.setItem("loginType", type)

    setTimeout(() => {
      if (type === "restaurant") {
        router.push("/restaurant/dashboard")
      } else {
        router.push("/home")
      }
      setIsLoading(false)
    }, 500)
  }

  const handleGoogleBusinessAuth = () => {
    setIsLoading(true)
    // Simulate OAuth flow
    setTimeout(() => {
      localStorage.setItem("userEmail", "owner@restaurant.com")
      localStorage.setItem("loginType", "restaurant")
      localStorage.setItem("restaurantVerified", "true")
      localStorage.setItem("pioneerBadge", "true")
      router.push("/restaurant/dashboard")
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Button variant="ghost" size="sm" asChild className="mb-6 text-white/70 hover:text-white hover:bg-white/10">
          <Link href="/">← Back</Link>
        </Button>

        <Card className="border-white/10 bg-white/5 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Welcome to Dine Out</CardTitle>
            <CardDescription className="text-white/60">Choose your login type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setLoginType("user")}
                className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                  loginType === "user"
                    ? "border-[oklch(0.70_0.15_85)] bg-[oklch(0.70_0.15_85)]/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <svg
                  className={`w-12 h-12 ${loginType === "user" ? "stroke-[oklch(0.70_0.15_85)]" : "stroke-white/60"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <span
                  className={`text-sm font-medium ${loginType === "user" ? "text-[oklch(0.70_0.15_85)]" : "text-white/60"}`}
                >
                  I'm a Diner
                </span>
              </button>

              <button
                type="button"
                onClick={() => setLoginType("restaurant")}
                className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                  loginType === "restaurant"
                    ? "border-[oklch(0.70_0.15_85)] bg-[oklch(0.70_0.15_85)]/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <svg
                  className={`w-12 h-12 ${
                    loginType === "restaurant" ? "stroke-[oklch(0.70_0.15_85)]" : "stroke-white/60"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                  />
                </svg>
                <span
                  className={`text-sm font-medium ${loginType === "restaurant" ? "text-[oklch(0.70_0.15_85)]" : "text-white/60"}`}
                >
                  I'm a Restaurant
                </span>
              </button>
            </div>

            {loginType === "restaurant" ? (
              <div className="space-y-4">
                <div className="bg-[oklch(0.70_0.15_85)]/10 border border-[oklch(0.70_0.15_85)]/30 rounded-lg p-4 mb-4">
                  <p className="text-sm text-white/80 text-center">
                    Restaurant owners must verify via Google Business Profile
                  </p>
                </div>

                <button
                  onClick={handleGoogleBusinessAuth}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border-2 border-gray-200"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="font-bold">Sign in with Google Business Profile</div>
                    <div className="text-xs text-gray-600">Verify restaurant ownership</div>
                  </div>
                </button>

                <div className="text-center text-xs text-white/50 mt-4">
                  <p>Upon verification you'll receive:</p>
                  <ul className="mt-2 space-y-1 text-white/70">
                    <li>✓ Verified Restaurant Status</li>
                    <li>✓ Blue Check Badge</li>
                    <li>✓ Pioneer Badge (Beta participants)</li>
                    <li>✓ Dashboard Access</li>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-sm text-white/60 text-center mb-3">Login with</p>
                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin("apple")}
                      disabled={isLoading}
                      className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors disabled:opacity-50"
                      title="Sign in with Apple"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin("google")}
                      disabled={isLoading}
                      className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors disabled:opacity-50"
                      title="Sign in with Google"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin("facebook")}
                      disabled={isLoading}
                      className="w-12 h-12 rounded-full bg-[#1877F2] hover:bg-[#166FE5] flex items-center justify-center transition-colors disabled:opacity-50"
                      title="Sign in with Facebook"
                    >
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin("tiktok")}
                      disabled={isLoading}
                      className="w-12 h-12 rounded-full bg-black hover:bg-gray-900 flex items-center justify-center transition-colors disabled:opacity-50"
                      title="Sign in with TikTok"
                    >
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </button>
                  </div>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-[oklch(0.15_0.02_250)] px-2 text-white/50">Or continue with email</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-white/90">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={loginType === "user" ? "diner@example.com" : "owner@restaurant.com"}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password" className="text-white/90">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : `Login as ${loginType === "user" ? "Diner" : "Restaurant"}`}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[oklch(0.15_0.02_250)] px-2 text-white/50">Quick Demo</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => handleQuickLogin(loginType)}
                      variant="outline"
                      className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white/80 gap-2"
                      disabled={isLoading}
                    >
                      {loginType === "user" ? (
                        <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                          />
                        </svg>
                      )}
                      <span>Try as {loginType === "user" ? "Diner" : "Restaurant"}</span>
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    <span className="text-white/60">Don't have an account? </span>
                    <Link
                      href="/auth/sign-up"
                      className="text-[oklch(0.70_0.15_85)] hover:underline underline-offset-4 font-medium"
                    >
                      Sign up
                    </Link>
                  </div>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
