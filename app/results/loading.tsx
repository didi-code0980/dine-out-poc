import { Sparkles } from "lucide-react"

export default function LoadingResults() {
  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-[oklch(0.70_0.15_85)] animate-pulse flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-[oklch(0.15_0.02_250)]" />
        </div>
        <h2 className="text-xl font-semibold text-white">Finding the best local restaurants near you...</h2>
        <p className="text-white/60">This will only take a moment</p>
      </div>
    </div>
  )
}
