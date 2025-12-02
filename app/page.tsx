import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#0D1527] flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-[#cbac4d] flex items-center justify-center shadow-2xl">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-12 h-12 text-[#0D1527]"
            >
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-white tracking-tight">Dine Out</h1>
          <p className="font-script text-2xl text-[#cbac4d]">"Dine Out with Ease"</p>
        </div>

        <div className="w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#cbac4d] rounded-full w-3/4 animate-pulse" />
        </div>

        <Link
          href="/auth/login"
          className="w-full bg-[#cbac4d] hover:bg-[#b89a43] text-[#0D1527] font-semibold py-3 px-6 rounded-lg text-center transition-colors"
        >
          Get Started
        </Link>

        <p className="text-white/50 text-xs text-center mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>

        <Link href="/about" className="text-white/60 hover:text-white/80 text-sm underline transition-colors">
          About Dine Out
        </Link>
      </div>
    </div>
  )
}
