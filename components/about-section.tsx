"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, GraduationCap, Trophy, Award, Calendar, MapPin } from "lucide-react"
import Image from "next/image"

const timeline = [
  {
    year: "2026",
    title: "B.Tech CSE (Data Science)",
    organization: "ABES Institute of Technology, Ghaziabad",
    type: "education",
    status: "ongoing",
    description: "Specializing in Data Science with focus on modern web technologies and real-time systems.",
  },
  {
    year: "2025",
    title: "Smart India Hackathon",
    organization: "Government of India",
    type: "achievement",
    status: "completed",
    description: "Led team to Top 10 ranking from college. Participated twice, showcasing problem-solving skills.",
  },
  {
    year: "2025",
    title: "Freelance Developer",
    organization: "Independent",
    type: "work",
    status: "ongoing",
    description: "Delivered photographer portfolio with 98 Lighthouse score and 35% increase in client inquiries.",
  },
  {
    year: "2025",
    title: "Hacknovate Winner",
    organization: "College Hackathon",
    type: "achievement",
    status: "completed",
    description: "Demonstrated exceptional problem-solving and teamwork in competitive programming environment.",
  },
  {
    year: "2020",
    title: "High School & Intermediate",
    organization: "Bhagirath Public School, Ghaziabad",
    type: "education",
    status: "completed",
    description: "CBSE curriculum with strong foundation in mathematics and computer science.",
  },
]

const certifications = [
  "Machine Learning A-Z (Udemy, 2025)",
  "React & Next.js (Udemy)",
  "freeCodeCamp: Frontend Development",
  "freeCodeCamp: Responsive Web Design",
  "freeCodeCamp: JavaScript DS&A",
  "freeCodeCamp: Python",
  "Hacktoberfest Open Source Badges",
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

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const downloadResume = () => {
    // TODO: Add actual resume PDF
    window.open("https://drive.google.com/drive/folders/1qmkeRCaictFgYioj-uFQ1y8JxKKNmWVf?usp=drive_link", "_blank")
  }

  return (
    <section id="about" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">About Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From curiosity to building to shipping — my journey in creating digital experiences that matter
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Story & Info */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Profile Photo */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start mb-8">
              <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
                  <Image
                    src="/images/himanshu-profile.jpg"
                    alt="Himanshu Rana - Professional Photo"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 -z-10"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(var(--primary), 0.2), rgba(var(--accent), 0.2))",
                      "linear-gradient(225deg, rgba(var(--accent), 0.2), rgba(var(--primary), 0.2))",
                      "linear-gradient(45deg, rgba(var(--primary), 0.2), rgba(var(--accent), 0.2))",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            </motion.div>

            {/* Personal Story */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold">The Journey</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm Himanshu, a full-stack developer who loves turning complex ideas into smooth, interactive web
                  apps. My journey started with curiosity about how things work on the web, evolved into building
                  solutions for real problems, and now focuses on shipping products that feel alive.
                </p>
                <p>
                  I specialize in real-time experiences, modern stacks, and clean, maintainable code. When I'm not
                  shipping features, I'm exploring new animations, refining UX, or competing in hackathons where I've
                  consistently ranked in the top performers.
                </p>
                <p>
                  Currently pursuing B.Tech in Computer Science with Data Science specialization while actively
                  freelancing and building innovative projects that push the boundaries of web development.
                </p>
              </div>
            </motion.div>

            {/* Location & Availability */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Ghaziabad, India</span>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-700 border-green-500/30 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
              >
                Available for freelance
              </Badge>
            </motion.div>

            {/* Certifications */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-bold">Certifications & Courses</h3>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Award className="w-3 h-3 text-accent" />
                    {cert}
                  </motion.div>
                ))}
              </div>
              <Button variant="outline" onClick={downloadResume} className="mt-4 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                View Certificates
              </Button>
            </motion.div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold">
              Timeline
            </motion.h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20" />

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={`${item.year}-${item.title}`}
                    variants={itemVariants}
                    className="relative flex gap-6"
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10">
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          item.status === "ongoing"
                            ? "bg-gradient-to-r from-primary to-accent"
                            : "bg-gradient-to-r from-accent/20 to-primary/20 border border-primary/30"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.type === "education" && <GraduationCap className="w-5 h-5 text-white" />}
                        {item.type === "achievement" && <Trophy className="w-5 h-5 text-white" />}
                        {item.type === "work" && <Calendar className="w-5 h-5 text-white" />}
                      </motion.div>
                    </div>

                    {/* Timeline Content */}
                    <Card className="flex-1 border-0 bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-primary">{item.year}</span>
                            {item.status === "ongoing" && (
                              <Badge variant="secondary" className="text-xs">
                                Ongoing
                              </Badge>
                            )}
                          </div>
                          <h4 className="font-bold text-lg">{item.title}</h4>
                          <p className="text-sm text-accent font-medium">{item.organization}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
