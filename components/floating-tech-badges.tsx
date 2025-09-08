"use client"

import { motion } from "framer-motion"
import { AnimatedTechEmoji } from "./animated-tech-emoji"

const techStack = [
  { name: "React", x: 20, y: 10, delay: 0 },
  { name: "Next.js", x: 70, y: 20, delay: 0.2 },
  { name: "TypeScript", x: 10, y: 40, delay: 0.4 },
  { name: "Node.js", x: 80, y: 50, delay: 0.6 },
  { name: "Socket.IO", x: 30, y: 70, delay: 0.8 },
  { name: "Prisma", x: 60, y: 80, delay: 1.0 },
  { name: "MongoDB", x: 15, y: 85, delay: 1.2 },
  { name: "PostgreSQL", x: 75, y: 10, delay: 1.4 },
  { name: "Tailwind", x: 45, y: 30, delay: 1.6 },
  { name: "Framer Motion", x: 85, y: 75, delay: 1.8 },
]

export function FloatingTechBadges() {
  return (
    <div className="relative w-full h-full">
      {techStack.map((tech, index) => (
        <AnimatedTechEmoji key={tech.name} tech={tech.name} x={tech.x} y={tech.y} delay={tech.delay} index={index} />
      ))}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}
