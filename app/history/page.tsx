"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, MapPin, User, Heart, Clock } from "lucide-react"
import { useEffect, useState } from "react"

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    const hist = localStorage.getItem("visitHistory")
    if (hist) {
      setHistory(JSON.parse(hist))
    }
  }, [])

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] pb-20">
      {/* Header */}
      {/* <header className="border-b border-white/10 bg-white/5 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-white text-center">History</h1>
        </div>
      </header> */}

      <header className="border-b border-white/10 bg-white/5 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[oklch(0.70_0.15_85)] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-[oklch(0.15_0.02_250)]"
              >
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">Dine Out</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-lg font-semibold text-white mt-3 mb-3">Activity Logs</h2>
        {history.length > 0 ? (
          <div className="space-y-3 ">
            {history.map((visit: any, idx: number) => (
              <Card key={idx} className="border-white/10 bg-white/5 backdrop-blur">
                <CardContent className="p-4 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[oklch(0.70_0.15_85)] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{visit.restaurantName}</h4>
                    <div className="flex items-center gap-2 text-xs text-white/60 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{visit.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-8 text-center">
              <Clock className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/60">No activity yet</p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[oklch(0.12_0.02_250)] border-t border-white/10 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-around max-w-2xl">
          <Link href="/home" className="flex flex-col items-center gap-1 text-white/60 hover:text-white">
            <Compass className="w-5 h-5" />
            <span className="text-base font-medium">Home</span>
          </Link>
          <Link href="/favorite" className="flex flex-col items-center gap-1 text-white/60 hover:text-white">
            <Heart className="w-5 h-5" />
            <span className="text-base font-medium">Favorite</span>
          </Link>
          <Link href="/history" className="flex flex-col items-center gap-1 text-[oklch(0.70_0.15_85)]">
            <Clock className="w-5 h-5" />
            <span className="text-base font-medium">History</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-white/60 hover:text-white">
            <User className="w-5 h-5" />
            <span className="text-base font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
