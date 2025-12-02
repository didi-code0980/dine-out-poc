"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

const cards = ["A", "B", "C", "D", "E"]

export default function DestinySelectionPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const mode = searchParams.get("mode") || "mystery"
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinResult, setSpinResult] = useState<string | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [diceResult, setDiceResult] = useState<number | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [eliminatedCards, setEliminatedCards] = useState<string[]>([])
  const [fingerPressed, setFingerPressed] = useState(false)
  const [dialingNumber, setDialingNumber] = useState("")

  // Spin the Bottle Mode
  const handleSpin = () => {
    setIsSpinning(true)
    const randomCard = cards[Math.floor(Math.random() * cards.length)]
    setTimeout(() => {
      setIsSpinning(false)
      setSpinResult(randomCard)
      setTimeout(() => {
        router.push(`/destiny/reveal?mode=${mode}&card=${randomCard}`)
      }, 1000)
    }, 3000)
  }

  // Dice Toss Mode
  const handleDiceRoll = () => {
    setIsRolling(true)
    let rolls = 0
    const rollInterval = setInterval(() => {
      setDiceResult(Math.floor(Math.random() * 5) + 1)
      rolls++
      if (rolls > 15) {
        clearInterval(rollInterval)
        const finalResult = Math.floor(Math.random() * 5) + 1
        setDiceResult(finalResult)
        setIsRolling(false)
        const selectedCard = cards[finalResult - 1]
        setTimeout(() => {
          router.push(`/destiny/reveal?mode=${mode}&card=${selectedCard}`)
        }, 1500)
      }
    }, 100)
  }

  // 5-Second Elimination Mode
  const handleElimination = () => {
    setCountdown(5)
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5)

    const eliminationInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(eliminationInterval)
          return null
        }
        return prev - 1
      })
    }, 1000)

    shuffledCards.forEach((card, index) => {
      setTimeout(
        () => {
          if (index < shuffledCards.length - 1) {
            setEliminatedCards((prev) => [...prev, card])
          } else {
            setTimeout(() => {
              router.push(`/destiny/reveal?mode=${mode}&card=${card}`)
            }, 1000)
          }
        },
        (index + 1) * 1000,
      )
    })
  }

  // Fingerprint Fate Mode
  const handleFingerpress = (card: string) => {
    setFingerPressed(true)
    setSelectedCard(card)
    setTimeout(() => {
      router.push(`/destiny/reveal?mode=${mode}&card=${card}`)
    }, 2000)
  }

  // Random Phone Dialer Mode
  const handleDialing = () => {
    const digits = "0123456789"
    let currentNumber = ""

    const dialInterval = setInterval(() => {
      if (currentNumber.length < 10) {
        currentNumber += digits[Math.floor(Math.random() * digits.length)]
        setDialingNumber(currentNumber)
      } else {
        clearInterval(dialInterval)
        const randomCard = cards[Math.floor(Math.random() * cards.length)]
        setTimeout(() => {
          router.push(`/destiny/reveal?mode=${mode}&card=${randomCard}`)
        }, 1000)
      }
    }, 200)
  }

  const handleCardSelect = (card: string) => {
    if (mode === "fingerprint") {
      handleFingerpress(card)
      return
    }
    setSelectedCard(card)
    setTimeout(() => {
      router.push(`/destiny/reveal?mode=${mode}&card=${card}`)
    }, 800)
  }

  // Render different UI based on mode
  const renderModeContent = () => {
    switch (mode) {
      case "spin":
        return (
          <div className="space-y-8">
            <motion.div
              animate={isSpinning ? { rotate: 360 * 10 } : {}}
              transition={{ duration: 3, ease: "easeOut" }}
              className="w-64 h-64 mx-auto relative"
            >
              <div className="absolute inset-0 rounded-full border-4 border-[oklch(0.70_0.15_85)] bg-white/5 flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-[oklch(0.70_0.15_85)]" />
              </div>
              <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-[oklch(0.70_0.15_85)]" />
            </motion.div>

            {!isSpinning && !spinResult && (
              <Button
                size="lg"
                className="w-full max-w-md mx-auto block bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
                onClick={handleSpin}
              >
                Spin the Wheel
              </Button>
            )}

            {spinResult && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
                <div className="text-6xl font-bold text-[oklch(0.70_0.15_85)]">{spinResult}</div>
              </motion.div>
            )}
          </div>
        )

      case "dice":
        return (
          <div className="space-y-8">
            <motion.div
              animate={isRolling ? { rotateX: 360, rotateY: 360 } : {}}
              transition={{ duration: 0.1, repeat: isRolling ? Number.POSITIVE_INFINITY : 0 }}
              className="w-32 h-32 mx-auto bg-white rounded-2xl shadow-2xl flex items-center justify-center"
            >
              <span className="text-6xl font-bold text-[oklch(0.15_0.02_250)]">{diceResult || "?"}</span>
            </motion.div>

            {!isRolling && !diceResult && (
              <Button
                size="lg"
                className="w-full max-w-md mx-auto block bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
                onClick={handleDiceRoll}
              >
                Roll the Dice
              </Button>
            )}
          </div>
        )

      case "elimination":
        return (
          <div className="space-y-8">
            {countdown !== null && (
              <motion.div
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-9xl font-bold text-[oklch(0.70_0.15_85)] text-center"
              >
                {countdown}
              </motion.div>
            )}

            <div className="grid grid-cols-5 gap-4">
              {cards.map((card, index) => (
                <motion.div
                  key={card}
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: eliminatedCards.includes(card) ? 0.2 : 1,
                    scale: eliminatedCards.includes(card) ? 0.9 : 1,
                  }}
                >
                  <Card
                    className={`aspect-[3/4] border-2 relative overflow-hidden ${
                      eliminatedCards.includes(card)
                        ? "border-red-500/50 bg-red-500/10"
                        : "border-[oklch(0.70_0.15_85)] bg-white/5"
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">{card}</span>
                    </div>
                    {eliminatedCards.includes(card) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="text-6xl">✕</span>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>

            {countdown === null && eliminatedCards.length === 0 && (
              <Button
                size="lg"
                className="w-full max-w-md mx-auto block bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)]"
                onClick={handleElimination}
              >
                Start Elimination
              </Button>
            )}
          </div>
        )

      case "fingerprint":
        return (
          <div className="flex flex-col items-center justify-center space-y-8 min-h-[500px]">
            <p className="text-center text-white/70 text-lg">Press and hold to scan your fingerprint</p>

            <motion.div
              onMouseDown={() => {
                setFingerPressed(true)
                const randomCard = cards[Math.floor(Math.random() * cards.length)]
                setSelectedCard(randomCard)
                setTimeout(() => {
                  router.push(`/destiny/reveal?mode=${mode}&card=${randomCard}`)
                }, 2000)
              }}
              onTouchStart={() => {
                setFingerPressed(true)
                const randomCard = cards[Math.floor(Math.random() * cards.length)]
                setSelectedCard(randomCard)
                setTimeout(() => {
                  router.push(`/destiny/reveal?mode=${mode}&card=${randomCard}`)
                }, 2000)
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-64 h-64 rounded-full cursor-pointer transition-all relative ${
                fingerPressed
                  ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-4 border-purple-400"
                  : "bg-white/5 border-4 border-white/20 hover:border-purple-400/50"
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className={`w-32 h-32 transition-all ${fingerPressed ? "text-purple-400" : "text-white/40"}`}
                  fill="currentColor"
                >
                  <path d="M50 10 C30 10 20 20 20 40 C20 60 30 80 50 90 C70 80 80 60 80 40 C80 20 70 10 50 10 Z M50 20 C60 20 70 25 70 40 C70 55 62 70 50 80 C38 70 30 55 30 40 C30 25 40 20 50 20 Z M50 30 C45 30 40 33 40 40 C40 47 45 55 50 60 C55 55 60 47 60 40 C60 33 55 30 50 30 Z" />
                </svg>
              </div>

              {fingerPressed && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 1.2], opacity: [0, 1, 0.8] }}
                  transition={{ duration: 2 }}
                  className="absolute inset-0 rounded-full border-4 border-purple-400"
                >
                  <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-pulse" />
                </motion.div>
              )}
            </motion.div>

            {fingerPressed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-purple-400 text-lg font-medium"
              >
                Scanning fingerprint...
              </motion.p>
            )}
          </div>
        )

      case "random_dialer":
        return (
          <div className="space-y-8">
            <div className="max-w-md mx-auto space-y-4">
              <div className="bg-white/10 rounded-2xl p-8 text-center">
                <div className="text-4xl font-mono text-white tracking-wider mb-4">{dialingNumber || "---"}</div>
                <p className="text-white/60 text-sm">Dialing random number...</p>
              </div>

              {!dialingNumber && (
                <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white" onClick={handleDialing}>
                  📞 Start Dialing
                </Button>
              )}
            </div>
          </div>
        )

      default:
        // Mystery Reveal - default card selection
        return (
          <div className="grid grid-cols-5 gap-4">
            {cards.map((card, index) => (
              <motion.div
                key={card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  onClick={() => handleCardSelect(card)}
                  onMouseEnter={() => setHoveredCard(card)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`aspect-[3/4] border-2 cursor-pointer transition-all relative overflow-hidden ${
                    selectedCard === card
                      ? "border-[oklch(0.70_0.15_85)] bg-[oklch(0.70_0.15_85)]/20 scale-105"
                      : hoveredCard === card
                        ? "border-[oklch(0.70_0.15_85)]/50 bg-white/10 scale-105"
                        : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`text-6xl font-bold ${
                        selectedCard === card || hoveredCard === card ? "text-[oklch(0.70_0.15_85)]" : "text-white/30"
                      }`}
                    >
                      {card}
                    </span>
                  </div>
                  {(hoveredCard === card || selectedCard === card) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-[oklch(0.70_0.15_85)]/10 shadow-[0_0_30px_rgba(200,160,70,0.3)]"
                    />
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">
            {mode === "spin" && "Spin the Bottle"}
            {mode === "dice" && "Dice Toss"}
            {mode === "elimination" && "5-Second Elimination"}
            {mode === "fingerprint" && "Fingerprint Fate"}
            {mode === "random_dialer" && "Random Phone Dialer"}
            {mode === "mystery" && "Choose Your Destiny"}
          </h1>
          <p className="text-white/60">
            {mode === "spin" && "Watch the spinner decide your fate"}
            {mode === "dice" && "Roll the dice to reveal your restaurant"}
            {mode === "elimination" && "One card eliminated every second"}
            {mode === "fingerprint" && "Long-press to scan and reveal"}
            {mode === "random_dialer" && "Dial a random number to discover your destination"}
            {mode === "mystery" && "Select a card to reveal your restaurant"}
          </p>
        </div>

        {renderModeContent()}
      </div>
    </div>
  )
}
