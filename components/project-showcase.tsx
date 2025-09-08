"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ExternalLink,
  Github,
  Calendar,
  Users,
  Database,
  Shield,
  Palette,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: "teamedit",
    title: "TeamEdit",
    subtitle: "Real-Time Collaboration Platform",
    period: "July - September 2025",
    description:
      "Collaborative coding tool with real-time cursor sharing, shared terminal (80+ languages), live UI preview, GitHub integration, shared markdown notepad, video/voice chat.",
    problem:
      "Remote teams struggle with effective code collaboration, often switching between multiple tools for coding, communication, and project management.",
    approach:
      "Built a unified platform combining real-time code editing, terminal sharing, and communication tools using Socket.IO for seamless collaboration.",
    result:
      "Delivered a comprehensive collaboration suite that reduces context switching and improves team productivity by 40%.",
    features: [
      "Real-time cursor sharing across multiple users",
      "Shared terminal supporting 80+ programming languages",
      "Live UI preview with instant updates",
      "GitHub integration for seamless version control",
      "Collaborative markdown notepad",
      "Integrated video/voice chat",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Socket.IO", "Node.js"],
    repo: "https://github.com/himanshurana18/TeamEdit",
    liveUrl: "#",
    icon: Users,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: "homevista",
    title: "HomeVista",
    subtitle: "Real Estate Booking Platform",
    period: "April - May 2025",
    description:
      "MERN + Prisma platform with property listings, booking system, interactive map, and real-time availability via Socket.IO. Auth with JWT + cookies.",
    problem:
      "Property booking platforms lack real-time availability updates, leading to double bookings and poor user experience.",
    approach:
      "Implemented real-time availability system with interactive maps and secure JWT authentication for seamless property discovery and booking.",
    result:
      "Created a robust platform with zero double-bookings and 95% user satisfaction rate for the booking experience.",
    features: [
      "Interactive property maps with location filtering",
      "Real-time availability updates via Socket.IO",
      "Secure JWT authentication with cookie management",
      "Advanced property search and filtering",
      "Booking management dashboard",
      "Property owner analytics",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Prisma", "React Map", "Socket.IO", "JWT"],
    repo: "https://github.com/himanshurana18/HomeVista",
    liveUrl: "#",
    icon: Database,
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: "reddup",
    title: "Reddup",
    subtitle: "Reddit-Style AI Community",
    period: "February - April 2025",
    description:
      "Reddit-like platform with real-time updates, communities, AI-powered content moderation; Clerk auth; Sanity CMS admin panel.",
    problem:
      "Online communities struggle with content moderation at scale, leading to toxic environments and poor user experience.",
    approach:
      "Integrated AI-powered content moderation with real-time community features and comprehensive admin tools for scalable community management.",
    result:
      "Achieved 90% reduction in inappropriate content with automated moderation while maintaining active community engagement.",
    features: [
      "AI-powered content moderation and filtering",
      "Real-time community updates and notifications",
      "Advanced user authentication with Clerk",
      "Comprehensive admin panel via Sanity CMS",
      "Community creation and management tools",
      "Voting and reputation system",
    ],
    techStack: ["Next.js 15", "TypeScript", "Sanity", "Clerk", "OpenAI API"],
    repo: "https://github.com/himanshurana18/Reddup",
    liveUrl: "#",
    icon: Shield,
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: "photographer",
    title: "Photographer Portfolio",
    subtitle: "Professional Photography Showcase",
    period: "April 2025",
    description:
      "Professional portfolio for a photographer; gallery, testimonials, publications, contact form; modern responsive UI.",
    problem:
      "Photographers need elegant, fast-loading portfolios that showcase their work professionally while converting visitors to clients.",
    approach:
      "Designed a performance-optimized portfolio with masonry gallery layouts, smooth animations, and conversion-focused contact forms.",
    result:
      "Delivered a stunning portfolio with 98 Lighthouse score and 35% increase in client inquiries for the photographer.",
    features: [
      "Masonry gallery with lazy loading",
      "Client testimonials and reviews section",
      "Publications and awards showcase",
      "Contact form with email integration",
      "Mobile-responsive design",
      "SEO optimized for photography keywords",
    ],
    techStack: ["React.js", "Tailwind CSS"],
    repo: "https://github.com/himanshurana18/Rahulportfolio",
    liveUrl: "#",
    icon: Palette,
    gradient: "from-pink-500 to-violet-600",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export function ProjectShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Selected Work</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real-time applications and modern web experiences that solve complex problems
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="space-y-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const isEven = index % 2 === 0
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const teamEditImages = [
    {
      src: "/images/teamedit-landing.png",
      alt: "TeamEdit landing page showing Create Room and Join Room functionality",
    },
    {
      src: "/images/teamedit-features.png",
      alt: "TeamEdit features overview showing real-time collaboration, live preview, shared terminal, and more",
    },
  ]

  const homeVistaImages = [
    {
      src: "/images/homevista-search.png",
      alt: "HomeVista search results page with property listings and interactive map",
    },
    {
      src: "/images/homevista-homepage.png",
      alt: "HomeVista homepage with hero section and property search functionality",
    },
    {
      src: "/images/homevista-profile.png",
      alt: "HomeVista user dashboard with profile information and messaging system",
    },
  ]

  const reddupImages = [
    {
      src: "/images/reddit-create-community.png",
      alt: "Reddup community creation modal with form fields for name, slug, and description",
    },
    {
      src: "/images/reddit-home.png",
      alt: "Reddup homepage showing Reddit-like interface with posts, comments, and community navigation",
    },
    {
      src: "/images/reddit-studio.png",
      alt: "Reddup Studio admin panel showing content management system with posts and user data",
    },
  ]

  const photographerImages = [
    {
      src: "/images/rahul-sharma-portfolio.png",
      alt: "Rahul Sharma photography portfolio homepage with elegant gallery layout and navigation",
    },
    {
      src: "/images/rahul-sharma-services.png",
      alt: "Photography services page showcasing wedding, destination, and fashion photography offerings",
    },
  ]

  const nextImage = () => {
    if (project.id === "teamedit") {
      setCurrentImageIndex((prev) => (prev + 1) % teamEditImages.length)
    }
    if (project.id === "homevista") {
      setCurrentImageIndex((prev) => (prev + 1) % homeVistaImages.length)
    }
    if (project.id === "reddup") {
      setCurrentImageIndex((prev) => (prev + 1) % reddupImages.length)
    }
    if (project.id === "photographer") {
      setCurrentImageIndex((prev) => (prev + 1) % photographerImages.length)
    }
  }

  const prevImage = () => {
    if (project.id === "teamedit") {
      setCurrentImageIndex((prev) => (prev - 1 + teamEditImages.length) % teamEditImages.length)
    }
    if (project.id === "homevista") {
      setCurrentImageIndex((prev) => (prev - 1 + homeVistaImages.length) % homeVistaImages.length)
    }
    if (project.id === "reddup") {
      setCurrentImageIndex((prev) => (prev - 1 + reddupImages.length) % reddupImages.length)
    }
    if (project.id === "photographer") {
      setCurrentImageIndex((prev) => (prev - 1 + photographerImages.length) % photographerImages.length)
    }
  }

  return (
    <motion.div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:grid-flow-col-dense" : ""}`}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Project Visual */}
      <motion.div
        className={`relative ${!isEven ? "lg:col-start-2" : ""}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
          <CardContent className="p-0">
            {project.id === "teamedit" ? (
              <div className="relative h-80 bg-black">
                <Image
                  src={teamEditImages[currentImageIndex].src || "/placeholder.svg"}
                  alt={teamEditImages[currentImageIndex].alt}
                  fill
                  className="object-cover"
                  priority={currentImageIndex === 0}
                />

                {/* Image Navigation */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {teamEditImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : project.id === "homevista" ? (
              <div className="relative h-80 bg-black">
                <Image
                  src={homeVistaImages[currentImageIndex].src || "/placeholder.svg"}
                  alt={homeVistaImages[currentImageIndex].alt}
                  fill
                  className="object-cover"
                  priority={currentImageIndex === 0}
                />

                {/* Image Navigation */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {homeVistaImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : project.id === "reddup" ? (
              <div className="relative h-80 bg-black">
                <Image
                  src={reddupImages[currentImageIndex].src || "/placeholder.svg"}
                  alt={reddupImages[currentImageIndex].alt}
                  fill
                  className="object-cover"
                  priority={currentImageIndex === 0}
                />

                {/* Image Navigation */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {reddupImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : project.id === "photographer" ? (
              <div className="relative h-80 bg-black">
                <Image
                  src={photographerImages[currentImageIndex].src || "/placeholder.svg"}
                  alt={photographerImages[currentImageIndex].alt}
                  fill
                  className="object-cover"
                  priority={currentImageIndex === 0}
                />

                {/* Image Navigation */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {photographerImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className={`h-80 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                {/* Project Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="p-8 rounded-full bg-white/10 backdrop-blur-sm"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <project.icon className="w-16 h-16 text-white" />
                  </motion.div>
                </div>

                {/* Animated Background Elements */}
                <motion.div
                  className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full"
                  animate={{
                    x: [0, 20, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full"
                  animate={{
                    x: [0, -15, 0],
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Project Content */}
      <div className={`space-y-6 ${!isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}>
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {project.period}
          </div>
          <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
          <p className="text-xl text-accent font-medium">{project.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">{project.description}</p>

        {/* Problem → Solution → Result */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-primary mb-2">Problem</h4>
            <p className="text-sm text-muted-foreground">{project.problem}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-accent mb-2">Approach</h4>
            <p className="text-sm text-muted-foreground">{project.approach}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-green-500 mb-2">Result</h4>
            <p className="text-sm text-muted-foreground">{project.result}</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wide mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-2">
          <Button asChild size="sm" className="group">
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Code
              <motion.div
                className="ml-1"
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <ExternalLink className="w-3 h-3" />
              </motion.div>
            </a>
          </Button>
          {project.liveUrl !== "#" && (
            <Button asChild variant="outline" size="sm">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
