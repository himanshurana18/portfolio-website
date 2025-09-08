"use server"

import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormData = z.infer<typeof contactSchema>

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Validate the data
    const validatedData = contactSchema.parse(data)

    const subject = `Portfolio Contact: ${validatedData.projectType} - ${validatedData.name}`
    const body = `
Name: ${validatedData.name}
Email: ${validatedData.email}
Company: ${validatedData.company || "Not specified"}
Project Type: ${validatedData.projectType}
Budget: ${validatedData.budget || "Not specified"}
Timeline: ${validatedData.timeline || "Not specified"}

Message:
${validatedData.message}
    `.trim()

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=himanshu180905@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    return {
      success: false,
      message: "Opening Gmail with your message",
      gmailUrl,
    }
  } catch (error) {
    console.error("Email processing error:", error)

    const subject = `Portfolio Contact: ${data.projectType} - ${data.name}`
    const body = `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "Not specified"}
Project Type: ${data.projectType}
Budget: ${data.budget || "Not specified"}
Timeline: ${data.timeline || "Not specified"}

Message:
${data.message}
    `.trim()

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=himanshu180905@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    return {
      success: false,
      message: "Opening Gmail with your message",
      gmailUrl,
    }
  }
}
