"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface AnimatedSkillCardProps {
  category: {
    id: string
    name: string
    icon: LucideIcon
    color: string
    skills: Array<{ name: string; level: number }>
  }
  categoryIndex: number
  isInView: boolean
}

// Emoji mapping for skill categories
const categoryEmojis: Record<string, string> = {
  programming: "👨‍💻",
  frontend: "🎨",
  backend: "⚙️",
  databases: "🗄️",
  devops: "🚀",
  cloud: "☁️",
  tools: "🔧",
}

export function AnimatedSkillCard({ category, categoryIndex, isInView }: AnimatedSkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      className="group"
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={cardInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: -15 }}
      transition={{
        delay: categoryIndex * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 50,
      }}
    >
      <Card className="h-full border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-20"
              style={{
                background: `linear-gradient(45deg, ${category.color.split(" ")[1]}, ${category.color.split(" ")[3]})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: isHovered ? [0, -20, 0] : [0, -10, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: isHovered ? [1, 1.5, 1] : [1, 1.2, 1],
                opacity: isHovered ? [0.2, 0.6, 0.2] : [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <CardContent className="p-6 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className={`p-3 rounded-xl bg-gradient-to-r ${category.color} relative overflow-hidden`}
              animate={{
                rotate: isHovered ? [0, 10, -10, 0] : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  y: isHovered ? [0, -3, 0] : 0,
                }}
                transition={{
                  duration: 0.6,
                  repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                }}
              >
                <category.icon className="w-6 h-6 text-white relative z-10" />
              </motion.div>

              {/* Animated emoji overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-2xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isHovered ? 0.8 : 0,
                  scale: isHovered ? 1 : 0,
                  rotate: isHovered ? [0, 360] : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {categoryEmojis[category.id] || "💻"}
              </motion.div>
            </motion.div>

            <div>
              <motion.h3
                className="text-xl font-bold"
                animate={{
                  color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                }}
              >
                {category.name}
              </motion.h3>
              <p className="text-sm text-muted-foreground">{category.skills.length} technologies</p>
            </div>
          </div>

          <div className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skill.name}
                className="space-y-2"
                initial={{ opacity: 0, x: -30 }}
                animate={cardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{
                  delay: 0.3 + skillIndex * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ x: 5 }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <motion.span
                    className="text-xs text-muted-foreground"
                    animate={{
                      scale: isHovered ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden relative">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${category.color} rounded-full relative`}
                    initial={{ width: 0 }}
                    animate={cardInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: 0.5 + skillIndex * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/30 rounded-full"
                      animate={{
                        x: isHovered ? ["0%", "100%", "0%"] : "0%",
                        opacity: isHovered ? [0, 0.6, 0] : 0,
                      }}
                      transition={{
                        duration: 2,
                        repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                        delay: skillIndex * 0.1,
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex flex-wrap gap-2 mt-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate={cardInView ? "visible" : "hidden"}
          >
            {category.skills.slice(0, 3).map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="secondary"
                  className="text-xs bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 cursor-pointer"
                >
                  {skill.name}
                </Badge>
              </motion.div>
            ))}
            {category.skills.length > 3 && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge variant="outline" className="text-xs">
                  +{category.skills.length - 3} more
                </Badge>
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
