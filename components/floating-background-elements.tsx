"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingElement {
  id: string
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: "cloud" | "particle" | "star"
}

export function FloatingBackgroundElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const newElements: FloatingElement[] = []

    for (let i = 0; i < 5; i++) {
      newElements.push({
        id: `cloud-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 60 + Math.random() * 40,
        duration: 20 + Math.random() * 10,
        delay: Math.random() * 5,
        type: "cloud",
      })
    }

    for (let i = 0; i < 15; i++) {
      newElements.push({
        id: `particle-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 8,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 3,
        type: "particle",
      })
    }

    for (let i = 0; i < 8; i++) {
      newElements.push({
        id: `star-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 12 + Math.random() * 8,
        duration: 8 + Math.random() * 4,
        delay: Math.random() * 2,
        type: "star",
      })
    }

    setElements(newElements)
  }, [])

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMounted])

  const CloudShape = ({ size }: { size: number }) => (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" className="opacity-20">
      <path
        d="M20,40 Q10,20 30,20 Q40,10 60,20 Q80,15 85,35 Q90,50 70,50 L25,50 Q10,50 20,40 Z"
        fill="currentColor"
        className="text-muted-foreground"
      />
    </svg>
  )

  const StarShape = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className="opacity-40">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="currentColor"
        className="text-accent"
      />
    </svg>
  )

  if (!isMounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {elements.map((element) => {
        const parallaxX = (mousePosition.x - 50) * 0.02
        const parallaxY = (mousePosition.y - 50) * 0.02

        return (
          <motion.div
            key={element.id}
            className="absolute"
            initial={{
              x: `${element.x}vw`,
              y: `${element.y}vh`,
              opacity: 0,
            }}
            animate={{
              x: [`${element.x}vw`, `${element.x + 20}vw`, `${element.x}vw`],
              y: [`${element.y}vh`, `${element.y - 10}vh`, `${element.y}vh`],
              opacity: [0, 1, 0],
              rotate: element.type === "star" ? [0, 360] : 0,
            }}
            transition={{
              duration: element.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: element.delay,
              ease: "easeInOut",
            }}
            style={{
              transform: `translate(${parallaxX}px, ${parallaxY}px)`,
            }}
          >
            {element.type === "cloud" && <CloudShape size={element.size} />}
            {element.type === "particle" && (
              <motion.div
                className="rounded-full bg-gradient-to-r from-primary/30 to-accent/30"
                style={{
                  width: element.size,
                  height: element.size,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: element.delay,
                }}
              />
            )}
            {element.type === "star" && <StarShape size={element.size} />}
          </motion.div>
        )
      })}

      <motion.div
        className="absolute w-4 h-4 rounded-full bg-primary/20"
        animate={{
          x: `${mousePosition.x}vw`,
          y: `${mousePosition.y}vh`,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 10,
        }}
      />

      <motion.div
        className="absolute w-2 h-2 rounded-full bg-accent/30"
        animate={{
          x: `${mousePosition.x + 5}vw`,
          y: `${mousePosition.y + 3}vh`,
        }}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 8,
          delay: 0.1,
        }}
      />
    </div>
  )
}
