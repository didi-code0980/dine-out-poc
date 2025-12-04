"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

export default function Slash2() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const slides = [
    {
      image: "/intro1.png",
      title: "Stop Scrolling. Start Eating.",
      description:
        "We eliminate decision-fatigue by showing you the Top 5 most curated, locally-owned restaurants nearby.",
    },
    {
      image: "/intro2.png",
      title: "The Curated Plate.",
      description:
        "Discover local restaurants that meet our 4.0+ Star Criteria & Independently owned. Quality dining, simplified.",
    },
    {
      image: "/intro3.png",
      title: "Let Fate Set the Table.",
      description:
        "Ready for an adventure? Our Date With Destiny modes turn choosing a restaurant into an exciting game.",
    },
  ]

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
    setDragOffset(0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const offset = e.clientX - dragStart
    setDragOffset(offset)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 100
    if (dragOffset > threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else if (dragOffset < -threshold && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }

    setDragOffset(0)
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      setDragOffset(0)
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: currentSlide * containerRef.current.offsetWidth,
        behavior: "smooth",
      })
    }
  }, [currentSlide])

    useEffect(() => {
    // Set a timeout to hide the div after 5000 milliseconds (5 seconds)
    const timer = setTimeout(() => {
      // Find the element by its ID
      const intro2 = document.getElementById('d2-intro');
      const intro1 = document.getElementById('d1-intro');
      
      // If the element exists, apply the display: none style
        if (intro2){
            intro2.style.opacity = "0";
        }

      setTimeout(() => {
        // If the element exists, apply the display: none style
            if (intro2 && intro1){
                intro2.style.display = 'none';
                intro1.style.display = 'block';
            }

        }, 1000);

    }, 2000);

    // Cleanup function to clear the timeout if the component unmounts
    // before 5 seconds (e.g., if you navigate to another page)
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts


  return (
    <div>
        <div className="min-h-screen bg-[#0D1527] flex flex-col" id="d1-intro">
        <div
            ref={containerRef}
            className="relative h-[80vh] w-full overflow-hidden cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <div
            className="flex h-full transition-transform duration-300 ease-out"
            style={{
                transform: `translateX(calc(-${currentSlide * 100}% + ${isDragging ? dragOffset : 0}px))`,
                transition: isDragging ? "none" : "transform 0.3s ease-out",
            }}
            >
            {slides.map((slide, index) => (
                <div key={index} className="min-w-full h-full relative">
                <img
                    src={slide.image || "/placeholder.svg"}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
                <div className="absolute inset-0 bg-transparent-intro" />
                </div>
            ))}
            </div>
        </div>

        {/* Content */}
        <div className="flex-1  px-6 pb-8 -mt-50 relative z-10">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
            <div className="text-[#6B9DC4] font-serif text-6xl leading-none font-bold">D</div>
            <div className="w-12 h-12 rounded-full bg-[#cbac4d] flex items-center justify-center">
                <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0D1527"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <path d="M8 2v20M6 2v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2" />
                <path d="M16 2v6a2 2 0 0 0 2 2h0v12" />
                </svg>
            </div>
            </div>

            <h1 className="text-white text-3xl sm:text-4xl font-serif text-center mb-6 leading-tight">
            {slides[currentSlide].title}
            </h1>

            <p className="text-white/80 text-base sm:text-lg text-center mb-8 leading-relaxed">
            {slides[currentSlide].description}
            </p>

            <div className="flex items-center justify-center gap-2 mb-8">
            {slides.map((_, index) => (
                <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? "w-6 bg-[#cbac4d]" : "w-2 bg-white/30"
                }`}
                />
            ))}
            </div>

            {/* Get Started Button */}
            <Link
            href="/auth/login"
            className="block w-full bg-[#1e3a5f] hover:bg-[#2a4a75] text-white text-center py-4 rounded-full text-lg font-medium transition-colors mb-4"
            >
            Get Started
            </Link>

            {/* Login Link */}
            <div className="text-center">
            <span className="text-white/70">Already have an account? </span>
            <Link href="/auth/login" className="text-white font-medium hover:underline">
                Log in
            </Link>
            </div>
        </div>
        </div>


        <div className="min-h-screen bg-[#0D1527] flex flex-col items-center justify-center px-6" id="d2-intro">
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
    </div>

    



    
  )
}
