"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function RestaurantDashboardPage() {
  const router = useRouter()
  const [restaurant, setRestaurant] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurantData = async () => {
      setIsLoading(true)

      const mockRestaurant = {
        id: "demo-restaurant-1",
        name: "The Golden Fork",
        cuisine_type: "Italian",
        price_tier: "$$",
        phone: "(555) 123-4567",
        address: "123 Main St, San Francisco, CA 94102",
        hours: "Mon-Fri: 11am-10pm, Sat-Sun: 10am-11pm",
        tagline: "Authentic Italian cuisine in the heart of the city",
        is_verified: true,
        is_pioneer: true,
        subscription_status: "active",
        ranking_position: "#3",
        google_rating: "4.8",
        review_count: 247,
        promotion_status: "3 Active",
      }

      setRestaurant(mockRestaurant)

      const storedPosts = JSON.parse(localStorage.getItem("restaurant_posts") || "[]")
      setPosts(storedPosts)

      setIsLoading(false)
    }

    fetchRestaurantData()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-[oklch(0.70_0.15_85)] animate-pulse" />
          <p className="mt-4 text-white/60">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex items-center justify-center p-6">
        <Card className="border-white/10 bg-white/5 backdrop-blur max-w-md">
          <CardHeader>
            <CardTitle className="text-white">No Restaurant Found</CardTitle>
            <CardDescription className="text-white/60">
              You need to verify your restaurant with Google Business Profile first.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
              onClick={() => router.push("/restaurant/verify")}
            >
              Verify Restaurant
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const activePosts = posts.filter((p) => p.status === "active")
  const expiredPosts = posts.filter((p) => p.status === "expired")

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[oklch(0.15_0.02_250)]/95 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[oklch(0.70_0.15_85)] flex items-center justify-center text-2xl">
                🍽️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-white">{restaurant.name}</h1>
                  {restaurant.is_verified && <span className="text-blue-400 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#009b02" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-check-icon lucide-badge-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
                  </span>}
                </div>
                <p className="text-sm text-white/60">{restaurant.cuisine_type}</p>
              </div>
            </div>
            {/* <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => router.push("/home")}
            >
              Exit Dashboard
            </Button> */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger
              value="profile"
              className="text-white data-[state=active]:bg-[oklch(0.70_0.15_85)] data-[state=active]:text-[oklch(0.15_0.02_250)]"
            >
              <span className="mr-2">🏪</span>
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="newsfeed"
              className="text-white data-[state=active]:bg-[oklch(0.70_0.15_85)] data-[state=active]:text-[oklch(0.15_0.02_250)]"
            >
              <span className="mr-2">📢</span>
              Newsfeed
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Performance Metrics */}
            <Card className="border-white/10 bg-white/5 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Performance Metrics</CardTitle>
                <CardDescription className="text-white/60">Read-only statistics (auto-updated)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => router.push("/restaurant/reviews")}
                    className="text-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >                    <p className="text-2xl font-bold text-[oklch(0.70_0.15_85)]">{restaurant.google_rating}⭐</p>
                    <p className="text-sm text-white/60 mt-1">Avg Star Rating</p>
                  </button>
                  <button
                    onClick={() => router.push("/restaurant/reviews")}
                    className="text-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <p className="text-2xl font-bold text-[oklch(0.70_0.15_85)]">{restaurant.review_count}</p>
                    <p className="text-sm text-white/60 mt-1">Total Reviews</p>
                  </button>
                  <div className="text-center p-4 rounded-lg bg-white/5">
                    <p className="text-2xl font-bold text-[oklch(0.70_0.15_85)]">{restaurant.ranking_position}</p>
                    <p className="text-sm text-white/60 mt-1">Ranking Position</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/5">
                    <p className="text-2xl font-bold text-[oklch(0.70_0.15_85)]">{restaurant.promotion_status}</p>
                    <p className="text-sm text-white/60 mt-1">Promotion Status</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Restaurant Profile</CardTitle>
                <CardDescription className="text-white/60">Manage your public listing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white/70">Name</label>
                    <p className="text-white mt-1">{restaurant.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white/70">Cuisine Type</label>
                    <p className="text-white mt-1">{restaurant.cuisine_type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white/70">Price Tier</label>
                    <p className="text-white mt-1">{restaurant.price_tier}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white/70">Phone</label>
                    <p className="text-white mt-1">{restaurant.phone || "Not set"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-white/70">Address</label>
                    <p className="text-white mt-1">{restaurant.address}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-white/70">Operating Hours</label>
                    <p className="text-white mt-1">{restaurant.hours || "Not set"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-white/70">Tagline</label>
                    <p className="text-white mt-1">{restaurant.tagline || "No tagline set"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4">
                  {restaurant.is_verified && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-0">
                      <span className="mr-1">✓</span>
                      Verified
                    </Badge>
                  )}
                  {restaurant.is_pioneer && (
                    <Badge className="bg-[oklch(0.70_0.15_85)]/20 text-[oklch(0.70_0.15_85)] border-0">
                      🏆 Pioneer
                    </Badge>
                  )}
                  <Badge
                    className={`border-0 ${
                      restaurant.subscription_status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {restaurant.subscription_status === "active" ? "Active Subscription" : "Inactive"}
                  </Badge>
                </div>

                <Button
                  className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
                  onClick={() => router.push("/restaurant/edit-profile")}
                >
                  <span className="mr-2">⚙️</span>
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Newsfeed Tab */}
          <TabsContent value="newsfeed" className="space-y-6">
            <Card className="border-white/10 bg-white/5 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Create Promotion</CardTitle>
                <CardDescription className="text-white/60">
                  Post time-sensitive deals to attract customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
                  onClick={() => router.push("/restaurant/create-post")}
                >
                  <span className="mr-2">➕</span>
                  Create New Post
                </Button>
              </CardContent>
            </Card>

            {/* Active Posts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Active Promotions</h3>
              {activePosts.length > 0 ? (
                activePosts.map((post) => (
                  <Card key={post.id} className="border-white/10 bg-white/5 backdrop-blur">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {post.image_url && (
                          <div className="w-24 h-24 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                            <img
                              src={post.image_url || "/placeholder.svg"}
                              alt={post.headline}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-white">{post.headline}</h4>
                            <Badge className="bg-green-500/20 text-green-400 border-0 flex-shrink-0">Active</Badge>
                          </div>
                          <p className="text-sm text-white/70 line-clamp-2">{post.description}</p>
                          <div className="flex items-center gap-4 text-xs text-white/50">
                            <span>Duration: {post.duration_hours}h</span>
                            {post.push_enabled && <span>Push: {post.push_radius_miles} miles</span>}
                            <span>Expires: {new Date(post.expires_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-white/10 bg-white/5 backdrop-blur">
                  <CardContent className="p-8 text-center">
                    <p className="text-white/60">No active promotions. Create your first post to reach customers!</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Past Posts */}
            {expiredPosts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Past Promotions</h3>
                {expiredPosts.slice(0, 3).map((post) => (
                  <Card key={post.id} className="border-white/10 bg-white/5 backdrop-blur opacity-60">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {post.image_url && (
                          <div className="w-24 h-24 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                            <img
                              src={post.image_url || "/placeholder.svg"}
                              alt={post.headline}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-white">{post.headline}</h4>
                            <Badge className="bg-white/10 text-white/60 border-0 flex-shrink-0">Expired</Badge>
                          </div>
                          <p className="text-sm text-white/70 line-clamp-2">{post.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="w-full border-red-600 text-red-600 hover:bg-red-600/10 hover:text-red-600 bg-transparent"
          >
            Logout
          </Button>

      </main>
    </div>
  )
}
