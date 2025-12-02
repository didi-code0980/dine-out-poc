"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, MapPin, Navigation } from "lucide-react"
import { useEffect, useState } from "react"

export default function DirectionsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const restaurantName = searchParams.get("name") || "Restaurant"
  const restaurantAddress = searchParams.get("address") || ""
  const isSecret = searchParams.get("secret") === "true"
  const [currentLocation, setCurrentLocation] = useState<string>("Getting your location...")

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
        },
        (error) => {
          console.error("[v0] Geolocation error:", error)
          setCurrentLocation("Location access denied")
        },
      )
    } else {
      setCurrentLocation("Geolocation not supported")
    }
  }, [])

  const openInGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurantAddress)}`
    window.open(mapsUrl, "_blank")
  }

  const openInAppleMaps = () => {
    const appleMapsUrl = `http://maps.apple.com/?daddr=${encodeURIComponent(restaurantAddress)}`
    window.open(appleMapsUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-[#0D1527]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0D1527]/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold text-white">Directions</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Destination Card */}
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#cbac4d] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-2">
                  {isSecret ? "Mystery Destination" : restaurantName}
                </h2>
                <p className="text-white/70 text-sm">{restaurantAddress}</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-[#cbac4d] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-white/70 text-sm font-medium mb-1">From your location</p>
                  <p className="text-white/50 text-xs">{currentLocation}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map Embed */}
        <Card className="border-white/10 bg-white/5 overflow-hidden">
          <CardContent className="p-0">
            <div className="w-full h-96 bg-white/5 relative">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={
                  isSecret
                    ? // Secret mode: simplified map with no POIs
                      `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=current+location&destination=${encodeURIComponent(restaurantAddress)}&mode=driving&maptype=roadmap`
                    : // Normal mode: full map with all features
                      `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=current+location&destination=${encodeURIComponent(restaurantAddress)}&mode=driving`
                }
                className="rounded-lg"
              />
            </div>
          </CardContent>
        </Card>

        {!isSecret && (
          <>
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-[#cbac4d] hover:bg-[#b89a43] text-[#0D1527] font-semibold"
                onClick={openInGoogleMaps}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Open in Google Maps
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white"
                onClick={openInAppleMaps}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Open in Apple Maps
              </Button>
            </div>

            {/* Info Notice */}
            <Card className="border-[#cbac4d]/20 bg-[#cbac4d]/5">
              <CardContent className="p-4">
                <p className="text-sm text-white/70">
                  <span className="font-semibold text-[#cbac4d]">Tip:</span> For turn-by-turn navigation, open the
                  directions in your preferred maps app above.
                </p>
              </CardContent>
            </Card>
          </>
        )}

        {isSecret && (
          <Card className="border-purple-400/20 bg-purple-500/5">
            <CardContent className="p-4">
              <p className="text-sm text-white/70">
                <span className="font-semibold text-purple-400">Mystery Mode:</span> Follow the route to discover your
                destination. Restaurant details will be revealed upon arrival.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
