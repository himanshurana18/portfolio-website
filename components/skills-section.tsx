"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Code, Palette, Server, Database, Cloud, Wrench, Zap, Filter } from "lucide-react"
import { AnimatedSkillCard } from "./animated-skill-card"

const skillCategories = [
  {
    id: "programming",
    name: "Programming",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Python", level: 85 },
      { name: "Java", level: 80 },
      { name: "C", level: 70 },
      { name: "R", level: 65 },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "shadcn/ui", level: 90 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 85 },
      { name: "Prisma", level: 85 },
      { name: "WebSocket", level: 80 },
      { name: "WebRTC", level: 75 },
      { name: "Firebase", level: 80 },
    ],
  },
  {
    id: "databases",
    name: "Databases",
    icon: Database,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 90 },
      { name: "SQLite", level: 80 },
      { name: "MySQL", level: 75 },
    ],
  },
  {
    id: "devops",
    name: "DevOps",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    skills: [
      { name: "GitHub Actions", level: 80 },
      { name: "GitLab CI/CD", level: 75 },
      { name: "Docker", level: 70 },
    ],
  },
  {
    id: "cloud",
    name: "Cloud",
    icon: Cloud,
    color: "from-indigo-500 to-purple-500",
    skills: [
      { name: "Vercel", level: 95 },
      { name: "Render", level: 85 },
      { name: "Netlify", level: 85 },
      { name: "AWS", level: 70 },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    icon: Wrench,
    color: "from-teal-500 to-blue-500",
    skills: [
      { name: "Jest", level: 80 },
      { name: "Postman", level: 90 },
      { name: "Figma", level: 85 },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <section id="skills" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From frontend polish to backend reliability — technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(null)}
              className="group"
            >
              <Filter className="w-4 h-4 mr-2" />
              All Skills
            </Button>
          </motion.div>
          {skillCategories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Button
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                className="group"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {skillCategories
            .filter((category) => activeCategory === null || category.id === activeCategory)
            .map((category, categoryIndex) => (
              <AnimatedSkillCard
                key={category.id}
                category={category}
                categoryIndex={categoryIndex}
                isInView={isInView}
              />
            ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From React/Next.js to Node/Express, Prisma to Socket.IO, WebSocket/WebRTC to databases across PostgreSQL,
            MongoDB, SQLite, and MySQL. I deploy on Vercel/Render/Netlify and automate with CI/CD.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
