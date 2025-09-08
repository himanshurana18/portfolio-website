import { type NextRequest, NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const result = await sendContactEmail(data)

    return NextResponse.json({
      success: false,
      message: result.message,
      gmailUrl: result.gmailUrl,
    })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
