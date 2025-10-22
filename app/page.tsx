"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Folder, Twitter } from "lucide-react"
import Image from "next/image"

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("tech")
  const [stripeColor, setStripeColor] = useState("#3B82F6")
  const [buttonsVisible, setButtonsVisible] = useState(false)
  const buttonsRef = useRef<HTMLDivElement>(null)

  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [folderIconColor, setFolderIconColor] = useState("#000000")
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = Math.min(scrollPosition / maxScroll, 1)

      let r, g, b

      if (scrollPercentage < 0.5) {
        const localProgress = scrollPercentage * 2
        r = Math.round(59 + (246 - 59) * localProgress)
        g = Math.round(130 + (59 - 130) * localProgress)
        b = Math.round(246 + (246 - 246) * localProgress)
      } else {
        const localProgress = (scrollPercentage - 0.5) * 2
        r = Math.round(246 + (255 - 246) * localProgress)
        g = Math.round(59 + (192 - 59) * localProgress)
        b = Math.round(59 + (58 - 59) * localProgress)
      }

      setStripeColor(`rgb(${r}, ${g}, ${b})`)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setButtonsVisible(true)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (buttonsRef.current) {
      observer.observe(buttonsRef.current)
    }

    return () => {
      if (buttonsRef.current) {
        observer.unobserve(buttonsRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!hoveredFolder) return

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3) // Cycle through 3 placeholder images
    }, 1000) // Change image every 1 second

    return () => clearInterval(imageInterval)
  }, [hoveredFolder])

  useEffect(() => {
    if (hoveredFolder) {
      // Small delay before showing overlay for smooth entrance
      const timer = setTimeout(() => setOverlayVisible(true), 10)
      return () => clearTimeout(timer)
    } else {
      setOverlayVisible(false)
    }
  }, [hoveredFolder])

  useEffect(() => {
    if (!hoveredFolder) {
      setFolderIconColor("#000000")
      return
    }

    let progress = 0
    const colorInterval = setInterval(() => {
      progress = (progress + 0.02) % 1 // Cycle from 0 to 1

      let r, g, b

      if (progress < 0.33) {
        // Blue to Red
        const localProgress = progress / 0.33
        r = Math.round(59 + (246 - 59) * localProgress)
        g = Math.round(130 + (59 - 130) * localProgress)
        b = Math.round(246 + (246 - 246) * localProgress)
      } else if (progress < 0.66) {
        // Red to Yellow
        const localProgress = (progress - 0.33) / 0.33
        r = Math.round(246 + (255 - 246) * localProgress)
        g = Math.round(59 + (192 - 59) * localProgress)
        b = Math.round(59 + (58 - 59) * localProgress)
      } else {
        // Yellow to Blue
        const localProgress = (progress - 0.66) / 0.34
        r = Math.round(255 + (59 - 255) * localProgress)
        g = Math.round(192 + (130 - 192) * localProgress)
        b = Math.round(58 + (246 - 58) * localProgress)
      }

      setFolderIconColor(`rgb(${r}, ${g}, ${b})`)
    }, 50) // Update color every 50ms for smooth transition

    return () => clearInterval(colorInterval)
  }, [hoveredFolder])

  const tabs = [
    { id: "tech", number: "1", label: "tech", href: "/", color: "bg-white text-black" },
    { id: "music", number: "2", label: "music", href: "/music", color: "bg-[#3B82F6] text-white" },
    { id: "film", number: "3", label: "film", href: "/film", color: "bg-[#FFC03A] text-black" },
  ]

  const stackLogos = [
    { name: "Figma", src: "/images/figma-color-icon.svg" },
    { name: "v0", src: "/images/v0-logo.svg" },
    { name: "Webflow", src: "/images/webflow-full-logo.svg" },
    { name: "Bubble", src: "/images/bubble-icon.svg" },
    { name: "WordPress", src: "/images/wordpress-icon.svg" },
    { name: "Elementor", src: "/images/elementor-icon.svg" },
    { name: "Canva", src: "/images/canva-logo.svg" },
  ]

  const portfolioItems = [
    { name: "Serendpt", folder: true },
    { name: "Harpar", folder: true },
    { name: "Gramtickets", folder: true },
    { name: "Ngballerz", folder: true },
    { name: "SA4interiors", folder: true },
    { name: "Ecollonhomes", folder: true },
    { name: "LegalX", folder: true },
    { name: "BlackCo-op", folder: true },
  ]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-4 md:pt-8">
        <div className="flex gap-1 md:gap-2 items-end relative ml-4 md:ml-12 overflow-x-auto">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`px-3 md:px-6 py-2 md:py-3 font-mono text-xs md:text-sm border border-black rounded-tl-xl rounded-tr-xl ${
                tab.color
              } relative ${activeTab === tab.id ? "z-30 border-b-0" : "z-10"} transition-colors whitespace-nowrap`}
            >
              <span className="font-bold">{tab.number}</span>
              <span className="ml-2 md:ml-4">{tab.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <section className="relative">
        <div className="max-w-7xl mx-auto pl-4 md:pl-8 pr-4 md:pr-8 lg:pr-0 relative z-20">
          <div className="border border-black p-6 md:p-12 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center md:items-center lg:items-center -mt-[1px] border-r lg:border-r-0">
            <div className="flex items-center justify-center md:justify-center lg:justify-start">
              <Image
                src="/images/ascii-portrait.png"
                alt="ASCII Art Portrait"
                width={400}
                height={600}
                className="w-full max-w-[200px] md:max-w-xs h-auto"
              />
            </div>

            <div className="space-y-4 md:space-y-6 text-center md:text-center lg:text-left">
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-balance">
                Hi, I'm Otonte, and i'm passionate about creation.
              </h1>
              <p className="text-[#3b82f6] text-lg md:text-xl handwriting">
                I am a Product designer with five years of design experience , wordpress and web development
              </p>
              <div className="flex justify-center md:justify-center lg:justify-start">
                <Button
                  variant="outline"
                  className="border border-black hover:bg-black hover:text-white transition-colors bg-transparent"
                >
                  View my resume
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-3 transition-colors duration-300 ease-out"
          style={{ backgroundColor: stripeColor }}
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <h2 className="font-serif text-3xl md:text-5xl text-center mb-3 md:mb-4">My stack</h2>
        <p className="text-[#3b82f6] text-lg md:text-xl text-center handwriting mb-8 md:mb-12">
          These are languages or applications i am very familiar with
        </p>

        <div className="flex justify-center items-center gap-6 md:gap-12 flex-wrap mb-8 md:mb-12">
          {stackLogos.map((logo) => (
            <div key={logo.name} className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={logo.name}
                width={80}
                height={80}
                className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        <div ref={buttonsRef} className="flex justify-center gap-3 md:gap-4 flex-wrap">
          <button
            className={`px-4 md:px-6 py-2 md:py-3 bg-[#f63b3b] text-white rounded-full flex items-center gap-2 hover:opacity-90 text-sm md:text-base ${
              buttonsVisible ? "w-auto opacity-100" : "w-0 opacity-0 overflow-hidden px-0"
            }`}
            style={{
              transition: buttonsVisible
                ? "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), padding 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
                : "none",
            }}
          >
            <Image
              src="/images/web-design-icon.svg"
              alt="Web Design"
              width={24}
              height={24}
              className="w-5 h-5 md:w-6 md:h-6"
            />
            <span className={buttonsVisible ? "inline" : "hidden"}>Web Design</span>
          </button>
          <button
            className={`px-4 md:px-6 py-2 md:py-3 bg-[#3b82f6] text-white rounded-full flex items-center gap-2 hover:opacity-90 text-sm md:text-base ${
              buttonsVisible ? "w-auto opacity-100" : "w-0 opacity-0 overflow-hidden px-0"
            }`}
            style={{
              transition: buttonsVisible
                ? "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s, opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s, padding 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s"
                : "none",
            }}
          >
            <Image
              src="/images/uiux-design-icon.svg"
              alt="UI/UX Design"
              width={24}
              height={24}
              className="w-5 h-5 md:w-6 md:h-6"
            />
            <span className={buttonsVisible ? "inline" : "hidden"}>UI/UX Design</span>
          </button>
          <button
            className={`px-4 md:px-6 py-2 md:py-3 bg-[#ffc03a] text-black rounded-full flex items-center gap-2 hover:opacity-90 text-sm md:text-base ${
              buttonsVisible ? "w-auto opacity-100" : "w-0 opacity-0 overflow-hidden px-0"
            }`}
            style={{
              transition: buttonsVisible
                ? "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s, opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s, padding 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s"
                : "none",
            }}
          >
            <Image
              src="/images/brand-design-icon.svg"
              alt="Brand Design"
              width={24}
              height={24}
              className="w-5 h-5 md:w-6 md:h-6"
            />
            <span className={buttonsVisible ? "inline" : "hidden"}>Brand Design</span>
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <h2 className="font-serif text-3xl md:text-5xl text-center mb-3 md:mb-4">My portfolio</h2>
        <p className="text-[#3b82f6] text-lg md:text-xl text-center handwriting mb-8 md:mb-12">
          Some jobs finished by me
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {portfolioItems.map((item) => (
            <Link
              key={item.name}
              href={`/portfolio/${item.name.toLowerCase()}`}
              className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer relative"
              onMouseEnter={() => {
                setHoveredFolder(item.name)
                setCurrentImageIndex(0)
              }}
              onMouseLeave={() => setHoveredFolder(null)}
              onMouseMove={handleMouseMove}
            >
              {hoveredFolder === item.name && (
                <div
                  className="absolute z-10 pointer-events-none transition-all duration-500 ease-out"
                  style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    transform: "translate(-50%, -50%)",
                    opacity: overlayVisible ? 1 : 0,
                    scale: overlayVisible ? "1" : "0.95",
                  }}
                >
                  <div className="relative w-32 h-32 md:w-48 md:h-48 bg-black/10 backdrop-blur-sm rounded-lg border border-black/20 overflow-hidden transition-transform duration-100 ease-out">
                    <Image
                      src={`/portfolio-project.png?key=u7o9z&height=200&width=200&query=portfolio project ${currentImageIndex + 1}`}
                      alt={`${item.name} preview ${currentImageIndex + 1}`}
                      fill
                      className="object-cover transition-opacity duration-300"
                    />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                      {[0, 1, 2].map((index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            currentImageIndex === index ? "bg-white w-4" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Folder
                className="w-12 h-12 md:w-16 md:h-16 transition-colors duration-100"
                strokeWidth={1.5}
                style={{ color: hoveredFolder === item.name ? folderIconColor : "#000000" }}
              />
              <span className="font-mono text-xs md:text-sm text-center">{item.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-black text-white py-8 md:py-16 mt-8 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-serif text-3xl md:text-5xl text-center text-[#ffc03a] mb-8 md:mb-12">My socials</h2>
          <div className="flex justify-center items-center gap-6 md:gap-8">
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300"
              aria-label="Behance"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 md:w-8 md:h-8"
              >
                <path d="M6.5 4.5h3.8c1.7 0 3 1.3 3 3 0 1-.5 1.9-1.3 2.4.9.5 1.5 1.5 1.5 2.6 0 1.7-1.3 3-3 3H6.5V4.5zm2 4.5h1.8c.6 0 1-.4 1-1s-.4-1-1-1H8.5v2zm0 4.5h1.8c.6 0 1-.4 1-1s-.4-1-1-1H8.5v2zm6.5-7h5v1.5h-5V6.5zm1.5 4c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5c1.5 0 2.8-.9 3.3-2.2h-2.1c-.3.4-.8.7-1.2.7-.8 0-1.5-.6-1.6-1.5h5.1c0-.2.1-.5.1-.8 0-1.9-1.6-3.2-3.6-3.2zm-1.5 2.5c.2-.8.9-1.5 1.5-1.5s1.3.7 1.5 1.5h-3z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6 md:w-8 md:h-8" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
