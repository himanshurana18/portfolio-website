"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle, Send, Clock } from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "himanshu180905@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=himanshu180905@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Himanshu,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.",
    description: "Best for detailed project discussions",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+91 9354896435",
    href: "https://wa.me/919354896435?text=Hi%20Himanshu,%20I%20saw%20your%20portfolio.",
    description: "Quick questions and instant communication",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "himanshu-rana-392b3027b",
    href: "https://www.linkedin.com/in/himanshu-rana-392b3027b/",
    description: "Professional networking and opportunities",
    color: "from-blue-600 to-blue-700",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "himanshurana18",
    href: "https://github.com/himanshurana18",
    description: "Code collaboration and open source",
    color: "from-gray-700 to-gray-900",
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

interface ContactSectionProps {
  onOpenModal: () => void
}

export function ContactSection({ onOpenModal }: ContactSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="py-24 px-6 relative" ref={ref}>
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
              Let's Build Something Great
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have an idea or a role in mind? I'm always excited to discuss new projects and opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Availability Status */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Available for new projects
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Ghaziabad, India (UTC+5:30)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Usually responds within 2-4 hours</span>
              </div>
            </motion.div>

            {/* Contact Methods */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold">Get In Touch</h3>
              <div className="grid gap-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color}`}>
                            <method.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{method.label}</h4>
                              <Button asChild variant="ghost" size="sm">
                                <a href={method.href} target="_blank" rel="noopener noreferrer">
                                  <Send className="w-4 h-4" />
                                </a>
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground font-mono">{method.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-bold">Quick Actions</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={onOpenModal} className="group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Send Message
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
                <Button asChild variant="outline" className="bg-transparent">
                  <a
                    href="https://wa.me/919354896435?text=Hi%20Himanshu,%20I%20saw%20your%20portfolio."
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form Preview */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold">Ready to Start?</h3>
                      <p className="text-muted-foreground">
                        Click below to open the contact form and tell me about your project
                      </p>
                    </div>

                    {/* Form Preview */}
                    <div className="space-y-4 opacity-60">
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-20" />
                        <div className="h-10 bg-muted rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-16" />
                        <div className="h-10 bg-muted rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-24" />
                        <div className="h-24 bg-muted rounded" />
                      </div>
                    </div>

                    <Button onClick={onOpenModal} className="w-full" size="lg">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Open Contact Form
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Response Time */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Average response time: 2-4 hours</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
