import React, { useEffect, useRef } from 'react'
import { tsParticles } from '@tsparticles/engine'

interface ScribbleTextProps {
  text: string
  className?: string
  onAnimationStart?: () => void
}

const ScribbleText: React.FC<ScribbleTextProps> = ({ text, className, onAnimationStart }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      tsParticles.load({
        id: `tsparticles-${text}`,
        element: containerRef.current,
        options: {
          fullScreen: {
            enable: false,
            zIndex: 0,
          },
          particles: {
            number: {
              value: 0,
            },
            color: {
              value: '#3b82f6',
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: 1,
            },
            size: {
              value: 2,
            },
            move: {
              enable: true,
              speed: 1,
              direction: 'none',
              random: false,
              straight: false,
              outModes: {
                default: 'destroy',
              },
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: false,
              },
              onClick: {
                enable: false,
              },
            },
          },
          emitters: {
            position: {
              x: 0,
              y: 50,
            },
            rate: {
              quantity: 1,
              delay: 0.1,
            },
            size: {
              width: 0,
              height: 0,
            },
            particles: {
              move: {
                path: {
                  clamp: false,
                  enable: true,
                  delay: {
                    value: 0,
                  },
                  generator: (particle) => {
                    const canvas = document.createElement('canvas')
                    const context = canvas.getContext('2d')
                    if (context) {
                      context.font = 'italic 1.25rem Biro Script'
                      const measures = context.measureText(text)
                      canvas.width = measures.width
                      canvas.height = 30
                      context.font = 'italic 1.25rem Biro Script'
                      context.fillStyle = '#3b82f6'
                      context.fillText(text, 0, 20)

                      const data = context.getImageData(0, 0, canvas.width, canvas.height)
                      const path = []
                      for (let y = 0; y < data.height; y++) {
                        for (let x = 0; x < data.width; x++) {
                          if (data.data[(x + y * data.width) * 4] > 0) {
                            path.push({ x: x / 2, y: y / 2 })
                          }
                        }
                      }
                      return path
                    }
                    return []
                  },
                },
              },
            },
          },
        },
      })

      if (onAnimationStart) {
        onAnimationStart()
      }
    }
  }, [text, onAnimationStart])

  return <div ref={containerRef} className={className} />
}

export default ScribbleText
