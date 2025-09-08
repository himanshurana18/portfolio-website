"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Send, Loader2, CheckCircle, AlertCircle, Phone, Mail } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

const projectTypes = [
  "Web Application",
  "Real-time Platform",
  "E-commerce Site",
  "Portfolio/Landing Page",
  "API Development",
  "Database Design",
  "Other",
]

const budgetRanges = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000+",
  "Let's discuss",
]

const timelines = ["ASAP", "Within 1 month", "1-3 months", "3-6 months", "6+ months", "Flexible"]

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(contactSchema),
  })

  const watchedProjectType = watch("projectType")
  const watchedBudget = watch("budget")
  const watchedTimeline = watch("timeline")

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        setSubmitMessage("Your message has been sent successfully! I'll get back to you within 2-4 hours.")
        reset()
      } else {
        const subject = `Portfolio Contact: ${data.projectType} - ${data.name}`
        const body = `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "Not specified"}\nProject Type: ${data.projectType}\nBudget: ${data.budget || "Not specified"}\nTimeline: ${data.timeline || "Not specified"}\n\nMessage:\n${data.message}`

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=himanshu180905@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.open(gmailUrl, "_blank")

        setSubmitStatus("success")
        setSubmitMessage("Gmail has been opened with your pre-filled message. I'll respond within 2-4 hours.")
        reset()
      }
    } catch (error) {
      setSubmitStatus("error")
      setSubmitMessage("Failed to send message. Please try again or contact me directly at himanshu180905@gmail.com")
      console.error("Contact form error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      setSubmitStatus("idle")
      reset()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Let's Work Together
          </DialogTitle>
          <DialogDescription>Tell me about your project and I'll get back to you within 2-4 hours.</DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {submitStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8 space-y-4"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-xl font-bold">Message Sent!</h3>
              <p className="text-muted-foreground">{submitMessage}</p>
              <div className="flex justify-center gap-3">
                <Button onClick={handleClose}>Close</Button>
                <Button asChild variant="outline">
                  <a
                    href="https://wa.me/919354896435?text=Hi%20Himanshu,%20I%20just%20sent%20you%20a%20message%20through%20your%20portfolio!"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp Me
                  </a>
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your full name"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your@email.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <Input id="company" {...register("company")} placeholder="Your company name" />
              </div>

              {/* Project Type */}
              <div className="space-y-3">
                <Label>Project Type *</Label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={watchedProjectType === type ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => setValue("projectType", type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
                {errors.projectType && <p className="text-sm text-destructive">{errors.projectType.message}</p>}
              </div>

              {/* Budget & Timeline */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>Budget Range</Label>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map((budget) => (
                      <Badge
                        key={budget}
                        variant={watchedBudget === budget ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/10 text-xs"
                        onClick={() => setValue("budget", budget)}
                      >
                        {budget}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Timeline</Label>
                  <div className="flex flex-wrap gap-2">
                    {timelines.map((timeline) => (
                      <Badge
                        key={timeline}
                        variant={watchedTimeline === timeline ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/10 text-xs"
                        onClick={() => setValue("timeline", timeline)}
                      >
                        {timeline}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Project Details *</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Tell me about your project, goals, and any specific requirements..."
                  rows={5}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
              </div>

              {/* Submit */}
              <div className="flex justify-between items-center pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>Sends directly to himanshu180905@gmail.com</span>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <span>{submitMessage}</span>
                </div>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
