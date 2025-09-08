"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, User, Bot } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

const botResponses = {
  greeting: [
    "Hi there! 👋 I'm Himanshu's AI assistant. Ask me anything about his skills, projects, or experience!",
    "Hello! I'm here to tell you all about Himanshu. What would you like to know?",
    "Hey! I'm Himanshu's virtual assistant. Feel free to ask about his work, skills, or background!",
  ],
  skills: [
    "Himanshu is a full-stack developer specializing in React, Next.js, TypeScript, Node.js, Socket.IO, and Prisma. He builds real-time, resilient web applications from idea to production!",
    "His tech stack includes modern frameworks like Next.js and React, with backend expertise in Node.js and real-time features using Socket.IO. He's also skilled in database management with Prisma!",
  ],
  projects: [
    "Himanshu has worked on various exciting projects including real-time chat applications, e-commerce platforms, and interactive web experiences. Check out his portfolio section to see them in action!",
    "He's built everything from real-time collaborative tools to modern web applications. His projects showcase his ability to create engaging, user-friendly interfaces with robust backend systems.",
  ],
  experience: [
    "Himanshu is passionate about creating web applications that feel alive and responsive. He focuses on building products that users love to interact with, combining technical excellence with great UX.",
    "He has experience in full-stack development, specializing in creating seamless user experiences with modern web technologies. His work emphasizes performance, scalability, and user engagement.",
  ],
  contact: [
    "You can reach Himanshu through email at himanshu180905@gmail.com, connect on LinkedIn, or check out his GitHub. He's always open to discussing new opportunities and exciting projects!",
    "Feel free to contact him via the contact form on this site, or reach out directly through his social media links. He loves connecting with fellow developers and potential collaborators!",
  ],
  default: [
    "That's an interesting question! While I focus on Himanshu's professional background, feel free to ask about his skills, projects, experience, or how to get in touch with him.",
    "I'm here to help you learn about Himanshu's work and expertise. Try asking about his technical skills, recent projects, or professional experience!",
    "Great question! I specialize in sharing information about Himanshu's development skills and projects. What specific aspect would you like to know more about?",
  ],
}

function getRandomResponse(category: keyof typeof botResponses): string {
  const responses = botResponses[category]
  return responses[Math.floor(Math.random() * responses.length)]
}

function categorizeMessage(message: string): keyof typeof botResponses {
  const lowerMessage = message.toLowerCase()

  if (
    lowerMessage.includes("skill") ||
    lowerMessage.includes("tech") ||
    lowerMessage.includes("technology") ||
    lowerMessage.includes("stack")
  ) {
    return "skills"
  }
  if (
    lowerMessage.includes("project") ||
    lowerMessage.includes("work") ||
    lowerMessage.includes("portfolio") ||
    lowerMessage.includes("build")
  ) {
    return "projects"
  }
  if (
    lowerMessage.includes("experience") ||
    lowerMessage.includes("background") ||
    lowerMessage.includes("career") ||
    lowerMessage.includes("about")
  ) {
    return "experience"
  }
  if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("reach") ||
    lowerMessage.includes("email") ||
    lowerMessage.includes("hire")
  ) {
    return "contact"
  }
  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey") ||
    lowerMessage.includes("start")
  ) {
    return "greeting"
  }

  return "default"
}

export function TypingAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(getRandomResponse("greeting"))
      }, 500)
    }
  }, [isOpen, messages.length, isMounted])

  const addBotMessage = (text: string) => {
    setIsTyping(true)
    setTimeout(
      () => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text,
            isBot: true,
            timestamp: new Date(),
          },
        ])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    const category = categorizeMessage(inputValue)
    const response = getRandomResponse(category)

    setInputValue("")
    addBotMessage(response)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isMounted) return null

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 2 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-primary to-accent hover:shadow-xl relative overflow-hidden group"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>

            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </Button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-end p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="relative w-full max-w-md h-[500px] bg-card border rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 to-accent/10">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Bot className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold">Himanshu's Assistant</h3>
                    <p className="text-xs text-muted-foreground">Ask me anything!</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="rounded-full">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[340px]">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      className={`flex gap-2 ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      {message.isBot && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.isBot ? "bg-muted text-foreground" : "bg-primary text-primary-foreground ml-auto"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      {!message.isBot && (
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-2 justify-start"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-muted p-3 rounded-2xl">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Himanshu's skills, projects..."
                    className="flex-1 px-3 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="rounded-full px-3"
                    disabled={!inputValue.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
