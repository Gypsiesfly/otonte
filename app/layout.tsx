import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], variable: "--font-serif" })
const caveat = Caveat({ subsets: ["latin"], variable: "--font-handwriting" })

export const metadata: Metadata = {
  title: "Otonte - Product Designer",
  description: "Portfolio of Otonte, a product designer with five years of design experience",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${caveat.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
