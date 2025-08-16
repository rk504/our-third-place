import type React from "react"
import type { Metadata } from "next"
import { Josefin_Sans } from "next/font/google"
import "./globals.css"

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-josefin",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Our Third Place - Supercharge Your Network with Friendship",
  description:
    "An exclusive members-only community where authentic friendships become powerful professional networks. Join media and finance professionals in meaningful connections.",
  keywords:
    "networking, professional community, media professionals, finance professionals, career growth, business relationships",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={josefinSans.variable}>
      <body className={`${josefinSans.className} antialiased`}>{children}</body>
    </html>
  )
}
