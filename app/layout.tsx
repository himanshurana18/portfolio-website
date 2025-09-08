import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Himanshu Rana - Full-Stack Developer",
  description:
    "Full-stack developer specializing in real-time applications, Next.js, and modern web technologies. Building TeamEdit, HomeVista, and innovative web experiences.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Real-time Applications",
    "Socket.IO",
    "Himanshu Rana",
    "Web Developer",
    "JavaScript",
    "Node.js",
    "Prisma",
    "MongoDB",
    "PostgreSQL",
  ],
  authors: [{ name: "Himanshu Rana", url: "https://github.com/himanshurana18" }],
  creator: "Himanshu Rana",
  publisher: "Himanshu Rana",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://himanshurana.dev",
    title: "Himanshu Rana - Full-Stack Developer",
    description:
      "Full-stack developer specializing in real-time applications and modern web technologies. Building innovative web experiences with React, Next.js, and Node.js.",
    siteName: "Himanshu Rana Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Himanshu Rana - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Rana - Full-Stack Developer",
    description: "Full-stack developer specializing in real-time applications and modern web technologies.",
    images: ["/og-image.jpg"],
    creator: "@himanshurana18",
  },
  alternates: {
    canonical: "https://himanshurana.dev",
  },
  category: "technology",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#4f46e5" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e1b4b" media="(prefers-color-scheme: dark)" />

        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ErrorBoundary>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </Suspense>
        </ErrorBoundary>
       {/* <Analytics /> */}
{/* <SpeedInsights /> */}

      </body>
    </html>
  )
}
