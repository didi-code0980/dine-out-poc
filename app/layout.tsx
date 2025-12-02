import type React from "react"
import type { Metadata } from "next"
import { Geist, Dancing_Script } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script",
})

export const metadata: Metadata = {
  title: "Dine Out - Discover Local Restaurants",
  description: "Dine Out with Ease - Curated restaurant discovery platform",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} ${dancingScript.variable} antialiased`}>{children}</body>
    </html>
  )
}
