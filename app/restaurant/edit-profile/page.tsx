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
import Link from "next/link"

export default function EditProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "The Golden Fork",
    cuisine_type: "Italian",
    price_tier: "$$",
    phone: "(555) 123-4567",
    address: "123 Main St, San Francisco, CA 94102",
    tagline: "Authentic Italian cuisine in the heart of the city",
    hours: "Mon-Fri: 11am-10pm, Sat-Sun: 10am-11pm",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem("restaurant_profile", JSON.stringify(formData))
      router.push("/restaurant/dashboard")
    } catch (err) {
      console.error("Failed to update profile", err)
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
            <CardTitle className="text-white">Edit Restaurant Profile</CardTitle>
            <CardDescription className="text-white/60">Update your public listing information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Restaurant Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/90">
                  Restaurant Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your restaurant name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              {/* Cuisine Type */}
              <div className="space-y-2">
                <Label htmlFor="cuisine" className="text-white/90">
                  Cuisine Type
                </Label>
                <Select
                  value={formData.cuisine_type}
                  onValueChange={(v) => setFormData({ ...formData, cuisine_type: v })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Mexican">Mexican</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="American">American</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Indian">Indian</SelectItem>
                    <SelectItem value="Thai">Thai</SelectItem>
                    <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Tier */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-white/90">
                  Price Tier
                </Label>
                <Select value={formData.price_tier} onValueChange={(v) => setFormData({ ...formData, price_tier: v })}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$">$ (Under $15)</SelectItem>
                    <SelectItem value="$$">$$ ($15-$30)</SelectItem>
                    <SelectItem value="$$$">$$$ ($30-$60)</SelectItem>
                    <SelectItem value="$$$$">$$$$ ($60+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white/90">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-white/90">
                  Address
                </Label>
                <Input
                  id="address"
                  placeholder="123 Main St, City, State ZIP"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              {/* Operating Hours */}
              <div className="space-y-2">
                <Label htmlFor="hours" className="text-white/90">
                  Operating Hours
                </Label>
                <Textarea
                  id="hours"
                  placeholder="e.g., Mon-Fri: 11am-10pm, Sat-Sun: 10am-11pm"
                  rows={2}
                  required
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none"
                />
              </div>

              {/* Tagline */}
              <div className="space-y-2">
                <Label htmlFor="tagline" className="text-white/90">
                  Tagline (max 100 characters)
                </Label>
                <Textarea
                  id="tagline"
                  placeholder="A brief description of your restaurant"
                  maxLength={100}
                  rows={2}
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none"
                />
                <p className="text-xs text-white/40">{formData.tagline.length}/100 characters</p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
                  onClick={() => router.push("/restaurant/dashboard")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
