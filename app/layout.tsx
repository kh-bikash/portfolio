import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GlobalUIWrapper } from "@/components/GlobalUIWrapper"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "CORTEX | Bikash - AI Engineer & Creative Developer",
  description: "Digital cortex of Bikash. Specializing in Generative AI, Computer Vision, and Interactive 3D Web Experiences. Explore the neural network of projects and experiments.",
  keywords: ["AI Engineer", "Creative Developer", "Three.js", "React", "Next.js", "Machine Learning", "WebGL", "Portfolio", "Generative AI"],
  authors: [{ name: "Bikash" }],
  openGraph: {
    title: "CORTEX | Bikash",
    description: "Interactive 3D Portion of an AI Engineer.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg", // We should ensure this exists or use a generic one
        width: 1200,
        height: 630,
        alt: "CORTEX System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CORTEX | Bikash",
    description: "Interactive 3D Portfolio.",
    creator: "@bikash",
  },
  other: {
    "ai-agent": "See /ai.txt for full agent profile.",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <GlobalUIWrapper>
          {children}
        </GlobalUIWrapper>
        <Analytics />
      </body>
    </html>
  )
}
