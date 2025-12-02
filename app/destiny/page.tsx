"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Sparkles, Dice1, Fingerprint, PhoneCall, Zap, Timer } from "lucide-react"

const modes = [
  {
    id: "mystery",
    name: "Mystery Reveal",
    description: "Reveal at GPS arrival",
    icon: Sparkles,
    color: "text-[oklch(0.70_0.15_85)]",
    blindBox: true,
  },
  {
    id: "spin",
    name: "Spin the Bottle",
    description: "Animated spinner decides",
    icon: Zap,
    color: "text-blue-400",
    blindBox: false,
  },
  {
    id: "fingerprint",
    name: "Fingerprint Fate",
    description: "Press to reveal destiny",
    icon: Fingerprint,
    color: "text-purple-400",
    blindBox: false,
  },
  {
    id: "dice",
    name: "Dice Toss",
    description: "Roll for your meal",
    icon: Dice1,
    color: "text-green-400",
    blindBox: false,
  },
  {
    id: "elimination",
    name: "5-Second Elimination",
    description: "Countdown reveals winner",
    icon: Timer,
    color: "text-orange-400",
    blindBox: false,
  },
  {
    id: "random_dialer",
    name: "Random Phone Dialer",
    description: "Call reveals location",
    icon: PhoneCall,
    color: "text-pink-400",
    blindBox: true,
  },
]

export default function DestinyPage() {
  const router = useRouter()

  const handleModeSelect = (modeId: string) => {
    router.push(`/destiny/selection?mode=${modeId}`)
  }

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl space-y-4 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br from-[oklch(0.70_0.15_85)] to-purple-500 flex items-center justify-center shadow-2xl">
            <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">Date With Destiny</h1>
          <p className="text-white/70 text-sm sm:text-lg max-w-md mx-auto">
            Let fate choose your next meal adventure. Pick your reveal method and embrace the unknown.
          </p>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {modes.map((mode) => {
            const Icon = mode.icon
            return (
              <Card
                key={mode.id}
                onClick={() => handleModeSelect(mode.id)}
                className={`border-white/10 backdrop-blur transition-all cursor-pointer group ${
                  mode.blindBox
                    ? "bg-gradient-to-br from-[#cbac4d]/20 to-purple-500/20 border-2 border-[#cbac4d]/50 shadow-lg shadow-[#cbac4d]/20 hover:shadow-xl hover:shadow-[#cbac4d]/30"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <CardContent className="py-2 sm:py-3 px-4 sm:px-6 relative">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {mode.blindBox && (
                      <div className="absolute top-2 right-2 bg-[#cbac4d] text-[#0D1527] text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                        BLIND BOX
                      </div>
                    )}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: mode.color.replace("text-", "") }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{mode.name}</h3>
                      <p className="text-xs sm:text-sm text-white/60">{mode.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  )
}
