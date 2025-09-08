"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Github, Linkedin, Mail, Phone } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedBackground } from "@/components/animated-background"
import { useState, lazy, Suspense } from "react"
import { AnimatedDownloadButton } from "@/components/animated-download-button"
import { TypingAssistant } from "@/components/typing-assistant"
import { FloatingBackgroundElements } from "@/components/floating-background-elements"

const FloatingTechBadges = lazy(() =>
  import("@/components/floating-tech-badges").then((module) => ({ default: module.FloatingTechBadges })),
)
const ProjectShowcase = lazy(() =>
  import("@/components/project-showcase").then((module) => ({ default: module.ProjectShowcase })),
)
const SkillsSection = lazy(() =>
  import("@/components/skills-section").then((module) => ({ default: module.SkillsSection })),
)
const AboutSection = lazy(() =>
  import("@/components/about-section").then((module) => ({ default: module.AboutSection })),
)
const ContactSection = lazy(() =>
  import("@/components/contact-section").then((module) => ({ default: module.ContactSection })),
)
const ContactModal = lazy(() =>
  import("@/components/contact-modal").then((module) => ({ default: module.ContactModal })),
)

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const openContactModal = () => {
    setIsContactModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      <FloatingBackgroundElements />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="text-xl font-bold text-foreground hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:bg-clip-text hover:text-transparent transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            HR
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Work
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
                Skills
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div className="space-y-8" variants={staggerContainer} initial="initial" animate="animate">
            <motion.div variants={fadeInUp} className="space-y-4">
              <motion.h1 className="text-5xl md:text-7xl font-bold leading-tight" variants={fadeInUp}>
                <span className="text-foreground">Himanshu</span>
                <br />
                <span className="text-primary bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent [&:not(:hover)]:text-primary hover:text-transparent">
                  Rana
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-muted-foreground max-w-lg leading-relaxed"
                variants={fadeInUp}
              >
                I build real-time, resilient web apps — from idea to production.
              </motion.p>

              <motion.p className="text-lg text-muted-foreground max-w-lg" variants={fadeInUp}>
                Next.js • TypeScript • Node • Socket.IO • Prisma — shipping products that feel alive.
              </motion.p>
            </motion.div>

            <motion.div className="flex flex-wrap gap-2" variants={fadeInUp}>
              {["React", "Next.js", "TypeScript", "Node.js", "Socket.IO", "Prisma"].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge variant="secondary" className="px-3 py-1 text-sm cursor-pointer">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
              <Button size="lg" onClick={scrollToProjects} className="group relative overflow-hidden">
                <span className="relative z-10">View Work</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>

              <AnimatedDownloadButton />

              <Button
                size="lg"
                variant="outline"
                onClick={openContactModal}
                className="group border-primary/20 hover:border-primary/40 bg-transparent"
              >
                <span>Hire Me</span>
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  →
                </motion.div>
              </Button>
            </motion.div>

            <motion.div className="flex items-center gap-4" variants={fadeInUp}>
              {[
                { href: "https://github.com/himanshurana18", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/himanshu-rana-392b3027b/", icon: Linkedin, label: "LinkedIn" },
                {
                  href: "https://mail.google.com/mail/?view=cm&fs=1&to=himanshu180905@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Himanshu,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.",
                  icon: Mail,
                  label: "Email",
                },
                { href: "https://wa.me/919354896435", icon: Phone, label: "WhatsApp" },
              ].map(({ href, icon: Icon, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-card hover:bg-accent/10 transition-colors relative group"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -10, 10, 0],
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <Icon className="w-5 h-5" />

                  {/* Tooltip */}
                  <motion.div
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap pointer-events-none"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {label}
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Tech Badges */}
          <motion.div
            className="relative h-[600px] hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Suspense fallback={<SectionLoader />}>
              <FloatingTechBadges />
            </Suspense>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.button
            onClick={scrollToProjects}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-6">
        <Suspense fallback={<SectionLoader />}>
          <ProjectShowcase />
        </Suspense>
      </section>

      {/* About Section */}
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>

      {/* Skills Section */}
      <Suspense fallback={<SectionLoader />}>
        <SkillsSection />
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<SectionLoader />}>
        <ContactSection onOpenModal={openContactModal} />
      </Suspense>

      <TypingAssistant />

      {/* Contact Modal */}
      {isContactModalOpen && (
        <Suspense fallback={null}>
          <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </Suspense>
      )}
    </div>
  )
}
