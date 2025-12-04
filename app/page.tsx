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
                
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="24" fill="#DCAF23"/>
                <rect x="8" y="8" width="32" height="32" rx="16" stroke="#775800" stroke-width="2"/>
                <path d="M18.375 14C16.3038 14 14.625 15.9588 14.625 18.375C14.625 20.4437 15.8563 22.1775 17.51 22.6325L16.8888 32.7525C16.877 32.9131 16.8987 33.0744 16.9525 33.2262C17.0063 33.378 17.0911 33.5169 17.2015 33.6342C17.3118 33.7515 17.4453 33.8446 17.5936 33.9075C17.7418 33.9705 17.9015 34.002 18.0625 34H18.6875C19.375 34 19.9025 33.4387 19.8613 32.7525L19.24 22.6325C20.8937 22.1763 22.125 20.4437 22.125 18.375C22.125 15.9588 20.4462 14 18.375 14ZM30.9788 14L29.9375 20.25H29.1562L28.635 14H28.1138L27.5925 20.25H26.8112L25.77 14H25.2487V22.125C25.2487 22.2908 25.3146 22.4497 25.4318 22.5669C25.549 22.6842 25.708 22.75 25.8737 22.75H27.5012L26.8875 32.7525C26.8757 32.9131 26.8974 33.0744 26.9513 33.2262C27.0051 33.378 27.0899 33.5169 27.2002 33.6342C27.3106 33.7515 27.4441 33.8446 27.5923 33.9075C27.7405 33.9705 27.9002 34.002 28.0612 34H28.6862C29.3737 34 29.9012 33.4387 29.86 32.7525L29.2462 22.75H30.8737C31.0395 22.75 31.1985 22.6842 31.3157 22.5669C31.4329 22.4497 31.4987 22.2908 31.4987 22.125V14H30.9775H30.9788Z" fill="#2B2B2B"/>
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

                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="50" fill="#DCAF23"/>
                <rect x="15.5833" y="15.5833" width="68.8333" height="68.8333" rx="34.4167" stroke="#775800" stroke-width="2"/>
                <path d="M38.2812 29.1666C33.9661 29.1666 30.4687 33.2474 30.4687 38.2812C30.4687 42.5911 33.0339 46.2031 36.4792 47.151L35.1849 68.2343C35.1603 68.5689 35.2056 68.905 35.3177 69.2212C35.4299 69.5374 35.6065 69.8269 35.8364 70.0712C36.0663 70.3155 36.3445 70.5095 36.6533 70.6407C36.9621 70.7718 37.2947 70.8374 37.6302 70.8333H38.9323C40.3646 70.8333 41.4635 69.664 41.3776 68.2343L40.0833 47.151C43.5286 46.2005 46.0938 42.5911 46.0938 38.2812C46.0938 33.2474 42.5964 29.1666 38.2812 29.1666ZM64.5391 29.1666L62.3698 42.1875H60.7422L59.6563 29.1666H58.5703L57.4844 42.1875H55.8568L53.6875 29.1666H52.6016V46.0937C52.6016 46.439 52.7387 46.7702 52.9829 47.0144C53.2271 47.2586 53.5583 47.3958 53.9036 47.3958H57.2943L56.0156 68.2343C55.9911 68.5689 56.0363 68.905 56.1485 69.2212C56.2606 69.5374 56.4372 69.8269 56.6671 70.0712C56.897 70.3155 57.1752 70.5095 57.484 70.6407C57.7928 70.7718 58.1255 70.8374 58.4609 70.8333H59.763C61.1953 70.8333 62.2943 69.664 62.2083 68.2343L60.9297 47.3958H64.3203C64.6656 47.3958 64.9968 47.2586 65.241 47.0144C65.4852 46.7702 65.6224 46.439 65.6224 46.0937V29.1666H64.5365H64.5391Z" fill="#2B2B2B"/>
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
