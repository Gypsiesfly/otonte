"use client"

import { useState, useEffect } from 'react'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'

interface SoundTogglePopupProps {
  onToggle: (enabled: boolean) => void
}

export default function SoundTogglePopup({ onToggle }: SoundTogglePopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)

  useEffect(() => {
    // Show popup every time user enters the site
    setIsOpen(true)
  }, [])

  const handleToggle = (enabled: boolean) => {
    setSoundEnabled(enabled)
    onToggle(enabled)
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white border border-black p-8 max-w-md w-full mx-4">
        <h2 className="font-serif text-2xl mb-4 text-center">Sound Experience</h2>
        <p className="text-center mb-6 text-gray-700">
          Would you like to enable sound effects for a more immersive experience?
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleToggle(true)}
            className="px-6 py-3 bg-black text-white border border-black hover:bg-gray-800 flex items-center gap-2"
          >
            <HiVolumeUp className="w-5 h-5" />
            Enable Sound
          </button>
          <button
            onClick={() => handleToggle(false)}
            className="px-6 py-3 bg-white text-black border border-black hover:bg-gray-100 flex items-center gap-2"
          >
            <HiVolumeOff className="w-5 h-5" />
            No Thanks
          </button>
        </div>
      </div>
    </div>
  )
}
