
export default function Slash1() {
  return (
    <div className="min-h-screen bg-[#0D1527] flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        {/* D letter */}
        <div className="text-[#6B9DC4] font-serif text-[120px] leading-none font-bold">D</div>
        {/* O with icon */}
        <div className="relative">
          <div className="w-[100px] h-[100px] rounded-full bg-[#cbac4d] flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0D1527"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Fork */}
              <path d="M8 2v20M6 2v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2" />
              {/* Knife */}
              <path d="M16 2v6a2 2 0 0 0 2 2h0v12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="text-center">
        <h1 className="text-white text-4xl font-serif mb-2">"Dine Out</h1>
        <p className="text-[#6B9DC4] text-2xl font-serif">with Ease"</p>
      </div>
    </div>
  )
}
