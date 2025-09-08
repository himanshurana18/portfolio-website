"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

interface AnimatedTechEmojiProps {
  tech: string
  x: number
  y: number
  delay: number
  index: number
}

// Cartoon emoji mapping for technologies
const techEmojis: Record<string, string> = {
  React: "⚛️",
  "Next.js": "🔺",
  TypeScript: "📘",
  "Node.js": "🟢",
  "Socket.IO": "🔌",
  Prisma: "🔷",
  MongoDB: "🍃",
  PostgreSQL: "🐘",
  Tailwind: "🎨",
  "Framer Motion": "🎭",
  JavaScript: "💛",
  Python: "🐍",
  Java: "☕",
  C: "⚙️",
  R: "📊",
  HTML: "🌐",
  CSS: "🎨",
  "Express.js": "🚂",
  WebSocket: "🔗",
  WebRTC: "📹",
  Firebase: "🔥",
  SQLite: "💾",
  MySQL: "🐬",
  "GitHub Actions": "🤖",
  "GitLab CI/CD": "🦊",
  Docker: "🐳",
  Vercel: "▲",
  Render: "🎯",
  Netlify: "🌊",
  AWS: "☁️",
  Jest: "🃏",
  Postman: "📮",
  Figma: "🎨",
}

export function AnimatedTechEmoji({ tech, x, y, delay, index }: AnimatedTechEmojiProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring animations for smooth cursor following
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  // Transform mouse position to subtle movement
  const moveX = useTransform(springX, [-300, 300], [-8, 8])
  const moveY = useTransform(springY, [-300, 300], [-8, 8])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById(`tech-${index}`)?.getBoundingClientRect()
      if (rect) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
      }
    }

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isHovered, mouseX, mouseY, index, isMounted])

  const emoji = techEmojis[tech] || "💻"

  if (!isMounted) return null

  return (
    <motion.div
      id={`tech-${index}`}
      className="absolute cursor-pointer select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        x: moveX,
        y: moveY,
      }}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -12, 0],
          rotate: isHovered ? [0, 10, -10, 0] : [0, 3, -3, 0],
        }}
        transition={{
          duration: isHovered ? 0.6 : 4 + index * 0.3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.3,
          rotate: [0, 15, -15, 0],
          transition: { duration: 0.3 },
        }}
        whileTap={{
          scale: 0.9,
          rotate: 360,
          transition: { duration: 0.5 },
        }}
      >
        {/* Glowing background effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-md opacity-30"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
            opacity: isHovered ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            background: `radial-gradient(circle, hsl(${index * 40}, 70%, 60%) 0%, transparent 70%)`,
          }}
        />

        {/* Main emoji */}
        <motion.div
          className="relative text-4xl md:text-5xl filter drop-shadow-lg"
          animate={{
            filter: isHovered
              ? [
                  "drop-shadow(0 0 8px rgba(255,255,255,0.5))",
                  "drop-shadow(0 0 16px rgba(255,255,255,0.8))",
                  "drop-shadow(0 0 8px rgba(255,255,255,0.5))",
                ]
              : "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
          }}
          transition={{ duration: 1, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
        >
          {emoji}
        </motion.div>

        {/* Sparkle effects on hover */}
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400 text-xs pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}

        {/* Tech name tooltip */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.2 }}
        >
          {tech}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
