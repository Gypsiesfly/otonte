"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Maximize2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const projectName = params.project as string

  const allProjects = [
    "serendpt",
    "harpar",
    "gramtickets",
    "ngballerz",
    "sa4interiors",
    "ecollonhomes",
    "legalx",
    "blackco-op",
  ]

  const currentIndex = allProjects.indexOf(projectName.toLowerCase())
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1]
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0]

  // Format project name for display (e.g., "serendpt" -> "Serendpt")
  const displayName = projectName.charAt(0).toUpperCase() + projectName.slice(1)

  // Placeholder images for the gallery
  const projectImages = [
    `/placeholder.svg?height=300&width=400&query=${projectName} project image 1`,
    `/placeholder.svg?height=300&width=400&query=${projectName} project image 2`,
    `/placeholder.svg?height=300&width=400&query=${projectName} project image 3`,
    `/placeholder.svg?height=300&width=400&query=${projectName} project image 4`,
    `/placeholder.svg?height=300&width=400&query=${projectName} project image 5`,
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity mb-8 md:mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base md:text-lg">Back</span>
        </button>

        <div className="flex justify-between items-start mb-8 md:mb-12">
          <h1 className="font-serif text-4xl md:text-6xl">{displayName}</h1>

          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/portfolio/${nextProject}`)}
              className="px-4 py-3 bg-black rounded-r-none rounded-l-full flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <Image src="/images/prev-project-icon.svg" alt="Next" width={24} height={24} className="w-6 h-6" />
            </button>
            <button
              onClick={() => router.push(`/portfolio/${prevProject}`)}
              className="px-4 py-3 bg-black rounded-l-none rounded-r-full flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <Image src="/images/next-project-icon.svg" alt="Previous" width={24} height={24} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Image gallery */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 mb-8 md:mb-12 scrollbar-hide">
          {projectImages.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-48 h-48 md:w-64 md:h-64 bg-gray-200 rounded-lg group cursor-pointer"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${displayName} image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-black" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[#3b82f6] text-lg md:text-2xl handwriting mb-8 md:mb-12 max-w-4xl mx-auto text-center">
          Lorem ipsum dolor sit amet consectetur. Ut sagittis mattis vel odio felis gravida diam odio a. Suspendisse
          interdum aliquet rhoncus a a. Tempor commodo sed.
        </p>

        {/* View live project button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="border border-black hover:bg-black hover:text-white transition-colors bg-transparent px-8 md:px-12 py-4 md:py-6 text-base md:text-lg"
          >
            View live project
          </Button>
        </div>
      </div>
    </div>
  )
}
