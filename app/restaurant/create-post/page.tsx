"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

export default function CreatePostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    image_url: "",
    headline: "",
    description: "",
    duration_hours: "24",
    push_enabled: false,
    push_radius_miles: "15",
  })

  const handleImageUpload = () => {
    const mockImageUrl = `/placeholder.svg?height=630&width=1200&query=restaurant promotion`
    setFormData({ ...formData, image_url: mockImageUrl })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const posts = JSON.parse(localStorage.getItem("restaurant_posts") || "[]")
      const newPost = {
        id: Date.now(),
        ...formData,
        status: "active",
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + Number.parseInt(formData.duration_hours) * 60 * 60 * 1000).toISOString(),
      }
      posts.push(newPost)
      localStorage.setItem("restaurant_posts", JSON.stringify(posts))

      router.push("/restaurant/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] p-6">
      <div className="container mx-auto max-w-2xl space-y-6">
        <Button variant="ghost" size="sm" asChild className="text-white/70 hover:text-white hover:bg-white/10">
          <Link href="/restaurant/dashboard">
            <span className="mr-2">←</span>
            Back to Dashboard
          </Link>
        </Button>

        <Card className="border-white/10 bg-white/5 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">Create Promotion</CardTitle>
            <CardDescription className="text-white/60">
              Share a time-sensitive deal with nearby customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload (placeholder) */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-white/90">
                  Image (Optional)
                </Label>
                {formData.image_url ? (
                  <div className="relative">
                    <img
                      src={formData.image_url || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image_url: "" })}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="w-full border-2 border-dashed border-white/20 rounded-lg p-8 text-center bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-sm text-white/60">Click to upload an image</p>
                    <p className="text-xs text-white/40 mt-1">Recommended: 1200x630px (server-compressed)</p>
                  </button>
                )}
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <Label htmlFor="headline" className="text-white/90">
                  Headline (max 60 characters)
                </Label>
                <Input
                  id="headline"
                  placeholder="e.g., 50% Off Lunch Special Today!"
                  maxLength={60}
                  required
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
                <p className="text-xs text-white/40">{formData.headline.length}/60 characters</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white/90">
                  Description (max 280 characters)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your offer in detail..."
                  maxLength={280}
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none"
                />
                <p className="text-xs text-white/40">{formData.description.length}/280 characters</p>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-white/90">
                  Duration
                </Label>
                <Select
                  value={formData.duration_hours}
                  onValueChange={(v) => setFormData({ ...formData, duration_hours: v })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="48">48 hours</SelectItem>
                    <SelectItem value="72">72 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Push Notification */}
              <div className="space-y-4 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="push" className="text-white/90">
                      Send Push Notification
                    </Label>
                    <p className="text-xs text-white/60">Alert users within selected radius about this promotion</p>
                  </div>
                  <Switch
                    id="push"
                    checked={formData.push_enabled}
                    onCheckedChange={(checked) => setFormData({ ...formData, push_enabled: checked })}
                  />
                </div>

                {formData.push_enabled && (
                  <div className="space-y-2">
                    <Label htmlFor="radius" className="text-white/90">
                      Geo-Radius (15-50 miles)
                    </Label>
                    <Select
                      value={formData.push_radius_miles}
                      onValueChange={(v) => setFormData({ ...formData, push_radius_miles: v })}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 miles</SelectItem>
                        <SelectItem value="20">20 miles</SelectItem>
                        <SelectItem value="25">25 miles</SelectItem>
                        <SelectItem value="30">30 miles</SelectItem>
                        <SelectItem value="35">35 miles</SelectItem>
                        <SelectItem value="40">40 miles</SelectItem>
                        <SelectItem value="45">45 miles</SelectItem>
                        <SelectItem value="50">50 miles</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-white/50">Users within this radius will receive a push notification</p>
                  </div>
                )}
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold"
              >
                {isLoading ? "Creating..." : "Publish Promotion"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
